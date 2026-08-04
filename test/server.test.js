import assert from "node:assert/strict";
import { after, before, test } from "node:test";

import { server } from "../server.js";

let baseUrl;

before(async () => {
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  baseUrl = `http://127.0.0.1:${server.address().port}`;
});

after(async () => {
  server.closeIdleConnections();
  await new Promise((resolve, reject) => {
    server.close((error) => (error ? reject(error) : resolve()));
  });
});

test("health endpoint accepts query parameters", async () => {
  const response = await fetch(`${baseUrl}/api/health?check=1`);
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type"), /application\/json/);
  assert.deepEqual(await response.json(), {
    ok: true,
    name: "ai-pm-sandbox",
    version: "0.2.0"
  });
});

test("dispatch preview uses the selected stage and includes its choices", async () => {
  const response = await fetch(`${baseUrl}/api/send-question`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      dryRun: true,
      channel: "wecom",
      config: {},
      user: { name: "我" },
      scenario: {
        title: "测试关卡 · 第二幕",
        level: "Level 1",
        question: "第二幕现在要决定什么？",
        context: "第二幕的局面",
        constraints: ["只能选一次"],
        choices: [
          { title: "先缩小范围", text: "只处理一部分流量" },
          { title: "先补评测", text: "用真实样本建立基线" }
        ],
        stages: [{ question: "不应该发送的第一幕" }]
      }
    })
  });

  assert.equal(response.status, 200);
  const result = await response.json();
  assert.match(result.message, /第二幕现在要决定什么/);
  assert.match(result.message, /A\. 先缩小范围/);
  assert.doesNotMatch(result.message, /不应该发送的第一幕/);
});

test("HTML portfolio export escapes user-provided markup", async () => {
  const response = await fetch(`${baseUrl}/api/export-portfolio`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      format: "html",
      portfolio: [{
        scenarioId: "test",
        scenario: { title: "Test", level: "L1" },
        answer: '<img src=x onerror="alert(1)">',
        score: 80,
        xp: 10,
        stageHistory: [{
          choiceTitle: "先小范围验证",
          answer: "先确认影响范围",
          consequence: "风险被控制在试点内。"
        }],
        review: {
          dimensions: [{ name: "风险安全", value: 16 }],
          feedback: "继续补充验证条件。"
        }
      }]
    })
  });

  assert.equal(response.status, 200);
  const result = await response.json();
  assert.equal(result.ok, true);
  assert.doesNotMatch(result.content, /<img src=x/);
  assert.match(result.content, /&lt;img src=x onerror=&quot;alert\(1\)&quot;&gt;/);
  assert.match(result.content, /<h4>第 1 幕 · 先小范围验证<\/h4>/);
  assert.match(result.content, /<table><thead>/);
  assert.match(result.content, /<blockquote>生成时间：/);
  assert.doesNotMatch(result.content, /####|<p><h|<p><table|&gt; 生成时间/);
});

test("static traversal attempts cannot expose repository files", async () => {
  const response = await fetch(`${baseUrl}/..%2Fserver.js`);
  assert.equal(response.status, 403);
  assert.doesNotMatch(await response.text(), /import crypto from "node:crypto"/);
});

test("missing static assets return 404 instead of the HTML app", async () => {
  const response = await fetch(`${baseUrl}/missing.css`);
  assert.equal(response.status, 404);
  assert.match(response.headers.get("content-type"), /text\/plain/);
});
