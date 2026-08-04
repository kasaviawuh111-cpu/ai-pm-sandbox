#!/usr/bin/env node

import crypto from "node:crypto";
import http from "node:http";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.join(__dirname, "public");

const port = Number(process.env.PORT || 4173);
const host = process.env.HOST || "127.0.0.1";

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".ico": "image/x-icon"
};

function sendJson(res, statusCode, body) {
  const payload = JSON.stringify(body, null, 2);
  res.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "Content-Length": Buffer.byteLength(payload)
  });
  res.end(payload);
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function readRequestBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
      if (body.length > 1024 * 1024) {
        reject(new Error("Request body is too large"));
        req.destroy();
      }
    });
    req.on("end", () => resolve(body));
    req.on("error", reject);
  });
}

function normalizeHost(hostname) {
  return String(hostname || "").toLowerCase().replace(/\.$/, "");
}

function isPrivateIp(hostname) {
  const host = normalizeHost(hostname);
  if (host === "localhost" || host.endsWith(".local")) return true;
  if (/^127\./.test(host) || /^10\./.test(host) || /^0\./.test(host)) return true;
  if (/^169\.254\./.test(host)) return true;
  if (/^192\.168\./.test(host)) return true;
  if (/^172\.(1[6-9]|2\d|3[0-1])\./.test(host)) return true;
  if (host === "::1" || host.startsWith("fc") || host.startsWith("fd")) return true;
  return false;
}

function parseSafeUrl(rawUrl, channel) {
  if (!rawUrl) {
    throw new Error("Missing webhook URL");
  }

  let url;
  try {
    url = new URL(rawUrl);
  } catch {
    throw new Error("Webhook URL is invalid");
  }

  if (url.protocol !== "https:") {
    throw new Error("Webhook URL must use HTTPS");
  }

  const host = normalizeHost(url.hostname);
  if (isPrivateIp(host)) {
    throw new Error("Webhook URL cannot target localhost or private network addresses");
  }

  if (channel === "wecom" && host !== "qyapi.weixin.qq.com") {
    throw new Error("Enterprise WeChat webhooks must use qyapi.weixin.qq.com");
  }

  if (channel === "feishu" && host !== "open.feishu.cn" && host !== "open.larksuite.com") {
    throw new Error("Feishu/Lark webhooks must use open.feishu.cn or open.larksuite.com");
  }

  return url;
}

function sanitizeText(value, fallback = "") {
  return String(value || fallback).replace(/\r\n/g, "\n").trim().slice(0, 3800);
}

function normalizeScenario(scenario) {
  if (!scenario) return scenario;
  if (Array.isArray(scenario.stages) && scenario.stages.length > 0) {
    const s0 = scenario.stages[0];
    return {
      ...scenario,
      question: scenario.question || s0.question || "",
      context: scenario.context || s0.context || "",
      constraints: scenario.constraints || s0.constraints || [],
      choices: scenario.choices || s0.choices || []
    };
  }
  return scenario;
}

function buildQuestionMessage({ scenario, user, includeRubric, note }) {
  const s = normalizeScenario(scenario);
  const title = sanitizeText(s?.title, "AI PM Sandbox 练习题");
  const level = sanitizeText(s?.level, "AI 产品经理");
  const question = sanitizeText(s?.question, "请围绕这个 AI 产品问题给出你的判断。");
  const context = sanitizeText(s?.context, "");
  const constraints = Array.isArray(s?.constraints) ? s.constraints : [];
  const rubric = Array.isArray(s?.rubric) ? s.rubric : [];
  const choices = Array.isArray(s?.choices) ? s.choices.filter((choice) => !choice?.isFinal) : [];
  const sender = sanitizeText(user?.name, "AI PM Sandbox");
  const extraNote = sanitizeText(note, "");

  const lines = [
    `【AI PM Sandbox】${title}`,
    `发送人：${sender}`,
    `关卡：${level}`,
    "",
    "题目：",
    question
  ];

  if (context) {
    lines.push("", "背景：", context);
  }

  if (constraints.length) {
    lines.push("", "约束：", ...constraints.map((item) => `- ${sanitizeText(item)}`));
  }

  if (choices.length) {
    lines.push("", "可选方案：", ...choices.slice(0, 3).map((choice, index) => {
      const label = String.fromCharCode(65 + index);
      const title = sanitizeText(choice?.title, `方案 ${label}`);
      const detail = sanitizeText(choice?.text, "");
      return `${label}. ${title}${detail ? `：${detail}` : ""}`;
    }));
  }

  if (includeRubric && rubric.length) {
    lines.push("", "评审维度：", ...rubric.map((item) => `- ${sanitizeText(item)}`));
  }

  if (extraNote) {
    lines.push("", "补充说明：", extraNote);
  }

  lines.push("", choices.length
    ? "先选一个方案；如有需要，再补充你的主要取舍或调整条件。"
    : "文字补充可选；写清主要取舍或调整条件即可。");
  return lines.join("\n");
}

function feishuSign(secret) {
  const timestamp = String(Math.floor(Date.now() / 1000));
  const stringToSign = `${timestamp}\n${secret}`;
  const sign = crypto.createHmac("sha256", stringToSign).update("").digest("base64");
  return { timestamp, sign };
}

function buildPayload(channel, config, text) {
  if (channel === "wecom") {
    return {
      url: parseSafeUrl(config.webhookUrl || process.env.WECOM_WEBHOOK_URL, "wecom"),
      body: {
        msgtype: "markdown",
        markdown: {
          content: text
        }
      }
    };
  }

  if (channel === "feishu") {
    const secret = config.secret || process.env.FEISHU_BOT_SECRET || "";
    return {
      url: parseSafeUrl(config.webhookUrl || process.env.FEISHU_WEBHOOK_URL, "feishu"),
      body: {
        ...(secret ? feishuSign(secret) : {}),
        msg_type: "text",
        content: {
          text
        }
      }
    };
  }

  if (channel === "telegram") {
    const token = config.botToken || process.env.TELEGRAM_BOT_TOKEN;
    const chatId = config.chatId || process.env.TELEGRAM_CHAT_ID;
    if (!token || !chatId) {
      throw new Error("Telegram requires bot token and chat ID");
    }

    return {
      url: parseSafeUrl(`https://api.telegram.org/bot${token}/sendMessage`, "telegram"),
      body: {
        chat_id: chatId,
        text,
        disable_web_page_preview: true
      }
    };
  }

  if (channel === "tf") {
    const mode = config.mode || process.env.TF_WEBHOOK_MODE || "generic";
    const url = parseSafeUrl(config.webhookUrl || process.env.TF_WEBHOOK_URL, "tf");

    if (mode === "teams") {
      return {
        url,
        body: {
          type: "message",
          attachments: [
            {
              contentType: "application/vnd.microsoft.card.adaptive",
              contentUrl: null,
              content: {
                $schema: "http://adaptivecards.io/schemas/adaptive-card.json",
                type: "AdaptiveCard",
                version: "1.2",
                body: [
                  {
                    type: "TextBlock",
                    text: "AI PM Sandbox 练习题",
                    weight: "Bolder",
                    size: "Medium"
                  },
                  {
                    type: "TextBlock",
                    text,
                    wrap: true
                  }
                ]
              }
            }
          ]
        }
      };
    }

    return {
      url,
      body: {
        source: "ai-pm-sandbox",
        text
      }
    };
  }

  throw new Error(`Unsupported channel: ${channel}`);
}

async function postWebhook(url, body) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "User-Agent": "ai-pm-sandbox/0.1"
    },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(12000)
  });

  const responseText = await response.text();
  let responseBody = responseText;
  try {
    responseBody = JSON.parse(responseText);
  } catch {
    // Keep plain text responses plain.
  }

  if (!response.ok) {
    throw new Error(`Webhook returned HTTP ${response.status}`);
  }

  return {
    status: response.status,
    body: responseBody
  };
}

async function handleSendQuestion(req, res) {
  try {
    const rawBody = await readRequestBody(req);
    const payload = rawBody ? JSON.parse(rawBody) : {};
    const channel = sanitizeText(payload.channel);
    const text = buildQuestionMessage(payload);
    const isPreview = !!payload.dryRun || !!payload.demoMode;

    let url, body;
    try {
      ({ url, body } = buildPayload(channel, payload.config || {}, text));
    } catch (buildError) {
      if (isPreview) {
        url = new URL("https://demo-mode.ai-pm-sandbox.local/placeholder");
        body = {
          source: "ai-pm-sandbox-demo",
          channel,
          note: "🎮 预览模式下生成的占位 payload",
          text
        };
      } else {
        throw buildError;
      }
    }

    if (isPreview) {
      return sendJson(res, 200, {
        ok: true,
        dryRun: true,
        demoMode: !!payload.demoMode,
        channel,
        targetHost: url.hostname,
        message: text,
        requestBody: body,
        note: payload.demoMode
          ? "Demo 模式只生成了消息预览，没有真正发送。关闭 Demo 模式后才会调用 Webhook。"
          : null
      });
    }

    const result = await postWebhook(url, body);
    return sendJson(res, 200, {
      ok: true,
      channel,
      targetHost: url.hostname,
      result
    });
  } catch (error) {
    return sendJson(res, 400, {
      ok: false,
      error: error.message || "Failed to send question"
    });
  }
}

function buildPortfolioMarkdown(portfolio) {
  const items = Array.isArray(portfolio) ? portfolio : [];
  const totalXp = items.reduce((sum, item) => sum + (item.xp || 0), 0);
  const avgScore = items.length
    ? Math.round(items.reduce((sum, item) => sum + (item.score || 0), 0) / items.length)
    : 0;

  const lines = [
    "# AI PM Sandbox · 决策复盘",
    "",
    `> 生成时间：${new Date().toLocaleString("zh-CN", { timeZone: "Asia/Shanghai" })}`,
    `> 完成关卡：${items.length} 关 · 累计 XP：${totalXp} · 平均得分：${avgScore}`,
    "",
    "---",
    ""
  ];

  if (!items.length) {
    lines.push("还没有完成任何关卡。");
    return lines.join("\n");
  }

  items.forEach((item, index) => {
    const scenario = item.scenario || {};
    const review = item.review || {};
    const dimensions = review.dimensions || [];
    const history = Array.isArray(item.stageHistory) ? item.stageHistory : [];

    lines.push(`## ${index + 1}. ${scenario.title || item.scenarioId || "关卡"}`);
    lines.push("");
    lines.push(`- **等级**：${scenario.level || "-"}`);
    lines.push(`- **关键决定**：${item.decisionTitle || item.choiceTitle || "-"}`);
    lines.push(`- **得分**：${item.score || 0} / 100 · **奖励 XP**：${item.xp || 0}`);
    lines.push(`- **完成时间**：${item.finishedAt ? new Date(item.finishedAt).toLocaleString("zh-CN") : "-"}`);
    lines.push("");

    if (dimensions.length) {
      lines.push("### 维度评分");
      lines.push("");
      lines.push("| 维度 | 得分 |");
      lines.push("|:-----|-----:|");
      dimensions.forEach((d) => {
        lines.push(`| ${d.name || "-"} | ${d.value || 0} / 20 |`);
      });
      lines.push("");
    }

    if (history.length) {
      lines.push("### 决策路径");
      lines.push("");
      history.forEach((step, stepIndex) => {
        lines.push(`#### 第 ${stepIndex + 1} 幕 · ${step.choiceTitle || "未命名决定"}`);
        lines.push("");
        if (step.answer) lines.push(`- **当时的判断**：${step.answer}`);
        if (step.consequence) lines.push(`- **剧情结果**：${step.consequence}`);
        lines.push("");
      });
    }

    lines.push("### 最终复盘");
    lines.push("");
    const hasStageAnswer = history.some((step) => step.answer);
    lines.push(item.finalAnswer || item.answer || (hasStageAnswer
      ? "（最终复盘未填写；各幕补充判断已保留在上方决策路径中。）"
      : "（本次只完成了方案选择，没有补充文字。）"));
    lines.push("");

    if (review.feedback) {
      lines.push("### 复盘结论");
      lines.push("");
      lines.push(`> ${review.feedback}`);
      lines.push("");
    }

    lines.push("---");
    lines.push("");
  });

  lines.push("");
  lines.push("---");
  lines.push("");
  lines.push("_由 AI PM Sandbox 导出。_");

  return lines.join("\n");
}

function renderInlineMarkdown(value) {
  return escapeHtml(value)
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
}

function markdownToHtml(markdown) {
  const lines = String(markdown || "").split(/\r?\n/);
  const html = [];
  const isSpecialLine = (line) => /^(#{1,4}\s|>\s?|---$|-\s|\|)/.test(line);
  let index = 0;

  while (index < lines.length) {
    const line = lines[index].trim();
    if (!line) {
      index += 1;
      continue;
    }

    const heading = line.match(/^(#{1,4})\s+(.+)$/);
    if (heading) {
      const level = heading[1].length;
      html.push(`<h${level}>${renderInlineMarkdown(heading[2])}</h${level}>`);
      index += 1;
      continue;
    }

    if (line === "---") {
      html.push("<hr />");
      index += 1;
      continue;
    }

    if (line.startsWith(">")) {
      const quote = [];
      while (index < lines.length && lines[index].trim().startsWith(">")) {
        quote.push(renderInlineMarkdown(lines[index].trim().replace(/^>\s?/, "")));
        index += 1;
      }
      html.push(`<blockquote>${quote.join("<br />")}</blockquote>`);
      continue;
    }

    if (line.startsWith("- ")) {
      const items = [];
      while (index < lines.length && lines[index].trim().startsWith("- ")) {
        items.push(`<li>${renderInlineMarkdown(lines[index].trim().slice(2))}</li>`);
        index += 1;
      }
      html.push(`<ul>${items.join("")}</ul>`);
      continue;
    }

    if (line.startsWith("|")) {
      const rows = [];
      while (index < lines.length && lines[index].trim().startsWith("|")) {
        const cells = lines[index].trim().slice(1, -1).split("|").map((cell) => cell.trim());
        if (!cells.every((cell) => /^:?-{3,}:?$/.test(cell))) rows.push(cells);
        index += 1;
      }
      if (rows.length) {
        const [header, ...body] = rows;
        html.push(`<table><thead><tr>${header.map((cell) => `<th>${renderInlineMarkdown(cell)}</th>`).join("")}</tr></thead><tbody>${body.map((row) => `<tr>${row.map((cell) => `<td>${renderInlineMarkdown(cell)}</td>`).join("")}</tr>`).join("")}</tbody></table>`);
      }
      continue;
    }

    if (/^_.+_$/.test(line)) {
      html.push(`<p><em>${renderInlineMarkdown(line.slice(1, -1))}</em></p>`);
      index += 1;
      continue;
    }

    const paragraph = [];
    while (index < lines.length) {
      const candidate = lines[index].trim();
      if (!candidate || isSpecialLine(candidate) || /^_.+_$/.test(candidate)) break;
      paragraph.push(renderInlineMarkdown(candidate));
      index += 1;
    }
    if (paragraph.length) html.push(`<p>${paragraph.join("<br />")}</p>`);
  }

  return html.join("\n");
}

async function handleExportPortfolio(req, res) {
  try {
    const rawBody = await readRequestBody(req);
    const payload = rawBody ? JSON.parse(rawBody) : {};
    const format = sanitizeText(payload.format) === "html" ? "html" : "markdown";
    const markdown = buildPortfolioMarkdown(payload.portfolio || []);

    if (format === "html") {
      const html = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8" />
<title>AI PM Sandbox 作品集</title>
<style>
  body { font-family: -apple-system, BlinkMacSystemFont, "PingFang SC", sans-serif; max-width: 820px; margin: 40px auto; padding: 0 24px; line-height: 1.7; color: #222; }
  h1 { border-bottom: 3px solid #1f7a5c; padding-bottom: 12px; }
  h2 { margin-top: 36px; color: #11533e; border-left: 4px solid #1f7a5c; padding-left: 12px; }
  h3 { color: #2f6f9f; margin-top: 20px; }
  h4 { margin: 20px 0 8px; }
  p, ul { margin: 10px 0; }
  blockquote { background: #f5f2eb; padding: 12px 18px; border-left: 4px solid #c9992d; margin: 12px 0; color: #65716d; }
  table { border-collapse: collapse; width: 100%; margin: 12px 0; }
  th, td { border: 1px solid #d8d1c4; padding: 8px 14px; text-align: left; }
  th { background: #efe9de; }
  code { background: #efe9de; padding: 2px 6px; border-radius: 4px; font-size: 0.9em; }
</style>
</head>
<body>
${markdownToHtml(markdown)}
</body>
</html>`;
      return sendJson(res, 200, { ok: true, format, content: html, filename: `ai-pm-portfolio-${Date.now()}.html` });
    }

    return sendJson(res, 200, {
      ok: true,
      format: "markdown",
      content: markdown,
      filename: `ai-pm-portfolio-${Date.now()}.md`
    });
  } catch (error) {
    return sendJson(res, 400, { ok: false, error: error.message || "Export failed" });
  }
}

async function serveStatic(req, res) {
  const url = new URL(req.url, `http://${req.headers.host || "localhost"}`);
  let pathname;
  try {
    pathname = decodeURIComponent(url.pathname);
  } catch {
    res.writeHead(400, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Bad request");
    return;
  }
  if (pathname === "/") pathname = "/index.html";

  const filePath = path.resolve(publicDir, `.${pathname}`);
  const relativePath = path.relative(publicDir, filePath);
  if (relativePath.startsWith("..") || path.isAbsolute(relativePath)) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }

  try {
    const stat = await fs.stat(filePath);
    if (!stat.isFile()) throw new Error("Not a file");

    const ext = path.extname(filePath);
    const content = await fs.readFile(filePath);
    res.writeHead(200, {
      "Content-Type": mimeTypes[ext] || "application/octet-stream",
      "Cache-Control": "no-store"
    });
    res.end(content);
  } catch {
    res.writeHead(404, {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store"
    });
    res.end("Not found");
  }
}

const server = http.createServer(async (req, res) => {
  const pathname = new URL(req.url, `http://${req.headers.host || "localhost"}`).pathname;

  if (req.method === "GET" && pathname === "/api/health") {
    return sendJson(res, 200, { ok: true, name: "ai-pm-sandbox", version: "0.2.0" });
  }

  if (req.method === "POST" && pathname === "/api/send-question") {
    return handleSendQuestion(req, res);
  }

  if (req.method === "POST" && pathname === "/api/export-portfolio") {
    return handleExportPortfolio(req, res);
  }

  if (req.method === "GET") {
    return serveStatic(req, res);
  }

  sendJson(res, 405, { ok: false, error: "Method not allowed" });
});

if (process.argv[1] && path.resolve(process.argv[1]) === __filename) {
  server.listen(port, host, () => {
    console.log(`AI PM Sandbox running at http://${host}:${server.address().port}`);
  });
}

export { buildPortfolioMarkdown, handleExportPortfolio, server };
