<p align="center">
  <h1 align="center">🎯 AI PM Sandbox</h1>
  <p align="center"><strong>用分支剧情练 AI 产品决策：先做选择，再看后果，最后复盘。</strong></p>
</p>

<p align="center">
  <a href="#当前进展"><strong>当前进展</strong></a> ·
  <a href="#功能"><strong>功能</strong></a> ·
  <a href="#快速开始"><strong>快速开始</strong></a> ·
  <a href="#公开访问"><strong>公开访问</strong></a> ·
  <a href="#界面一览"><strong>界面一览</strong></a> ·
  <a href="#微信飞书个人刷题配置"><strong>微信/飞书刷题</strong></a> ·
  <a href="#项目结构"><strong>结构</strong></a> ·
  <a href="#开发与贡献"><strong>贡献</strong></a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-%3E=18-green?style=flat-square&logo=node.js" alt="Node.js">
  <img src="https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square" alt="License">
  <img src="https://img.shields.io/badge/Zero%20Dependencies-✅-brightgreen?style=flat-square" alt="零依赖">
  <img src="https://img.shields.io/badge/剧情关卡-3%C2%B710幕-ff9500?style=flat-square" alt="剧情关卡">
</p>

---

## 当前进展

- 3 条可完整通关的剧情，共 10 幕、8 次决策、24 个方案。
- 每幕按「局面 → 选择 → 可选补充 → 确认 → 后果 → 下一幕」展开；确认后锁定本幕，不能先看完所有结局再改答案。
- 地图与技术栈共用一条成长路径，完成关卡后会点亮相关能力节点。
- 进度、分幕答案和已完成关卡保存在浏览器；可以回看，也可以单独重新挑战。
- 成绩卡会带上决策路径、实际后果和个人复盘，可复制或下载 PNG；作品集可导出 Markdown / HTML。
- 桌面和手机端已经适配。当前评分使用本地规则，不调用外部模型。

## 功能

### 剧情关卡

目前有 **3 段职场剧情、10 幕、8 次关键决策、24 个方案**。每一幕都会接住上一幕的决定，并给出对应后果：

- 🕵️ **RAG 疑案**（4 幕 · 180 XP · 职场悬疑）：立项决策会 → 上线 24 小时爆炸 → CCO 办公室反击 → 终局复盘
- ⚔️ **Agent 风暴**（3 幕 · 160 XP · 职场博弈）：需求评审权限画界 → 上线 6 小时邮件误发 → 法务 12 条合规权衡
- 🌀 **幻觉迷局**（3 幕 · 170 XP · 职场伦理）：内测收益率翻车 → 客户会议室 10 秒危机 → 营业部全员会终局

三个方案不会标出推荐项。它们解决的是不同问题，也各自带着代价；只有确认决定后，页面才会揭晓这一分支的结果。

### 关卡复盘

关卡结束后会给出：

1. 剧情角色的追问；
2. 本关使用的 5 条评审标准；
3. 每幕选择的分数与理由；
4. 已经做对的部分、暴露的风险和下一次可执行的改法；
5. 只基于真实作答的总结。没有补充文字时，不会替用户编写答案。

### 微信 / 飞书刷题

题目可以推送到自己的群或 Bot 对话中，支持企业微信、飞书 / Lark、Telegram、通用 Webhook 和 Microsoft Teams。没有配置 Webhook 时，可以先用 Demo 模式检查消息内容，不会真正发送。

### 作品集

- 保存每幕决定、对应后果、最终复盘与得分；
- 导出 Markdown / HTML；
- 进度保存在浏览器 LocalStorage，刷新后可以继续；
- XP 与关卡进度用于展示成长路径。

### 技术栈地图

关卡与能力点在同一条路径上。完成剧情后，可以直接回看本关涉及的技术模块：

模型能力边界 · Prompt 任务设计 · RAG 知识库 · Evals 评测体系 · Agent 工具调用 · 隐私安全 · 成本延迟优化 · 上线运营闭环 · IM 协作场景

### 深色模式与快捷键

- 切换浅色/深色主题（`D`）
- 剧情模式：`A / B / C` 或 `1 / 2 / 3` 快速暂选方案，`Enter` 确认选择 / 进入下一幕
- `Ctrl+Enter` 提交批改，`N / P` 切换剧情关卡，`?` 查完整快捷键，`E` 导出作品集

### 语音输入

支持浏览器原生 Web Speech API（`zh-CN`）。语音只用于可选的文字补充，不影响方案选择。

---

## 快速开始

### 从 GitHub 直接运行
Node.js >= 18，复制下面这一行启动，零外部依赖：

```bash
npx --yes github:kasaviawuh111-cpu/ai-pm-sandbox
```

终端出现 `AI PM Sandbox running at ...` 后，在浏览器打开：

👉 在运行命令的电脑上打开 `http://localhost:4173`

> 这个命令只启动本地服务，不会自动打开浏览器。`localhost` 只能在运行命令的这台电脑上访问；要分享给朋友，请看下方「公网部署」。

---

### Clone 到本地运行
要求 Node.js >= 18，**零外部依赖**，用的全是内置模块。

```bash
# 1. 拉代码
git clone https://github.com/kasaviawuh111-cpu/ai-pm-sandbox.git
cd ai-pm-sandbox

# 2. （可选）配置环境变量 — 填你自己的 IM Webhook
cp .env.example .env
# 编辑 .env 填入 WeCom / Feishu / Telegram webhook（不配也能用 demo 模式预览）

# 3. 启动！
npm start
```

在运行项目的电脑上打开：`http://localhost:4173`

---

### 方式二：Docker
```bash
# 方式 A：docker compose
docker compose up -d

# 方式 B：手动构建
docker build -t ai-pm-sandbox .
docker run -p 4173:4173 --env-file .env ai-pm-sandbox
```

同样只在运行 Docker 的电脑上打开：`http://localhost:4173`

---

## 公开访问

`localhost` 只能在启动服务的电脑上访问。要把链接发给其他人，需要把项目部署到公网服务器，再分享公网 IP 或域名。

### 托管平台

在 Render、Railway、Fly.io 等平台新建服务并关联本仓库。启动命令为 `npm start`，服务默认监听 `4173`；具体端口映射以平台设置为准。

### VPS（Linux + Node >= 18）

```bash
# 服务器上
git clone https://github.com/kasaviawuh111-cpu/ai-pm-sandbox.git
cd ai-pm-sandbox

# 用 pm2 常驻后台（避免断开 shell 就停）
npm i -g pm2   # 如果没装 pm2
pm2 start server.js --name ai-pm-sandbox
pm2 save && pm2 startup

# 防火墙/安全组放行 4173 端口
# （腾讯云/阿里云要去管理后台面板的「安全组」里加 TCP 4173 入站规则）
```

部署成功后访问 `http://你的服务器公网IP:4173`，也可以绑定自己的域名。

### Cloudflare Tunnel

没有公网 IP 时，可以用 Cloudflare Tunnel 暂时暴露本地服务：
```bash
# 1. 先本地跑起来（npm start）
# 2. 装 cloudflared，把本地 4173 暴露到公网
cloudflared tunnel --url http://localhost:4173
```
命令会返回一个临时 HTTPS 地址。该地址由 Cloudflare 提供，使用前请确认自己的网络与数据安全要求。

---

## 界面一览

> 本地启动项目（`npm start`，再在同一台电脑打开 `http://localhost:4173`）即可体验完整界面。下面是文字版功能地图：

### 🏠 闯关主界面（4 个主要视图）
| 视图 | 你会看到什么 |
|:---:|:---|
| **成长路径** | 关卡与技术模块按学习顺序排列，显示当前关、完成状态和 XP |
| **答题面板** | 当前局面和问题在前，方案与可选文字补充在后；确认选择后才显示剧情后果与下一幕 |
| **关卡复盘** | 显示总分、每幕选择理由、评审标准、风险和下一步动作 |
| **作品集导出** | Markdown / HTML 两种格式，包含每幕决定、后果、决策路径和个人复盘 |

### 🛰️ 其他视图
| 视图 | 说明 |
|:---:|:---|
| **微信/飞书刷题** | 配置自己的 Webhook 后推送题目；不配置时可用 Demo 模式预览消息 |
| **技术栈地图** | 9 大 AI PM 模块知识图谱（模型边界 / Prompt / RAG / Evals / Agent / 隐私安全 / 成本延迟 / 运营闭环 / IM） |
| **深色模式** | 使用顶部按钮或 `D` 快捷键切换，颜色由 CSS 变量统一管理 |
| **语音输入** | textarea 右侧 🎤 按钮，中文 zh-CN 语音转文字自动填入答案框（浏览器降级时有提示） |

---

## 微信/飞书个人刷题配置
> 💡 都是发到你自己的群 / 自己的机器人，**自己用手机随时刷，不打扰同事**——如果想团队讨论再改成团队群 webhook 即可。

### 企业微信
1. 打开「文件传输助手」旁边的小群（或自己建一个「AI PM 刷题」小群，只拉自己）
2. 右上角「···」→「群机器人」→「添加机器人」，随便起个名字
3. 复制 Webhook URL 填入 `.env` 里的 `WECOM_WEBHOOK_URL`

### 飞书 / Lark
1. 飞书里建一个「AI PM 刷题」个人话题群，只拉自己
2. 群设置 → 群机器人 → 自定义机器人 → 添加
3. 复制 Webhook 到 `FEISHU_WEBHOOK_URL`
4. 如果开了「签名校验」，把密钥填到 `FEISHU_BOT_SECRET`

### Telegram Bot
1. Telegram 找到 `@BotFather` → 发 `/newbot` 起个名字，拿到 Bot Token
2. 打开你自己的 Bot 对话，随便发一条消息
3. 浏览器访问 `https://api.telegram.org/bot<你的token>/getUpdates`，找 JSON 里的 `chat.id`
4. 填 `.env`：`TELEGRAM_BOT_TOKEN` 和 `TELEGRAM_CHAT_ID`

### Demo 模式（什么都不配也行）
直接在 dispatch 视图点「预览请求」，能看到完整要发的消息格式和 JSON body，做演示/截图完全 OK。

---

## 项目结构

```
ai-pm-sandbox/
├── public/                  # 前端静态文件
│   ├── index.html          # 页面骨架（侧边栏 Brief + 关卡视图 + Dispatch + 作品集 + 技术栈）
│   ├── app.js              # 核心逻辑：3 段剧情关卡数据 + 结构化批改算法 + 渲染
│   └── styles.css          # 双主题样式 + 剧情阶段UI + 批改卡片样式
├── server.js               # 后端：静态文件服务 + IM 4 渠道发送 API + 作品集导出
├── package.json            # 元信息 + npm start
├── .env.example            # IM webhook 环境变量模板
├── .gitignore              # 已忽略 .env / 凭据目录 / 导出作品集
├── Dockerfile              # node:20-alpine + healthcheck
├── docker-compose.yml      # Docker Compose 一键起
├── LICENSE                 # MIT 开源协议
└── README.md               # 你现在正在看的文件
```

**技术选型说明**：
- **后端**：纯 Node.js 内置模块（http/fs/path/crypto），**零依赖**，任何 VPS/Docker 直接跑
- **前端**：原生 HTML/CSS/JS（ES Modules），**无打包**，部署快打开快
- **存储**：浏览器 LocalStorage，**不用装数据库**
- 刻意保持简单，方便二次开发 / 教学 / 做自己的剧情关卡

---

## 🎮 剧情关卡列表（v0.2）

| # | 剧情名 | 类型 | 幕数 | XP | 核心训练点 |
|---|--------|:---:|:---:|:---:|-----------|
| 1 | 🕵️ RAG 疑案：AI 客服上线 72 小时 | 职场悬疑 · 客户信任 | 4 幕 | 180 | 范围控制 + 人工兜底策略 + 危机公关协同 |
| 2 | ⚔️ Agent 风暴：销售邮件误发 72 小时 | 职场博弈 · 权限合规 | 3 幕 | 160 | 动作分级 + 权限边界 + 审计追踪 + 合规分级 |
| 3 | 🌀 幻觉迷局：会议室沉默的那 10 秒 | 职场伦理 · 可信度 | 3 幕 | 170 | 可追溯引用 + 置信度展示 + 拒答策略 + 合规红线 |

---

## ⌨️ 键盘快捷键

| 按键 | 功能 |
|:-----|------|
| `A` / `B` / `C` 或 `1` / `2` / `3` | 剧情模式下快速选择方案（对应 A/B/C） |
| `Enter` | 剧情模式：看完 consequence → 直接进入下一幕 |
| `N` | 下一个剧情关卡（RAG→Agent→幻觉） |
| `P` | 上一个剧情关卡 |
| `Ctrl/Cmd + Enter` | 获取完整结构化批改 / 提交评分 |
| `E` | 导出作品集（需在作品集视图） |
| `D` | 切换深色 / 浅色主题 |
| `?` | 显示快捷键帮助 |

---

## 开发与贡献

欢迎 Issue 和 PR！任何形式的贡献都很珍贵：

### 添加新剧情
编辑 `public/app.js` 里的 `scenarios` 数组，照现有剧情照猫画虎即可。每段剧情的最小骨架：

```javascript
{
  id: "your-story",              // 唯一英文 ID
  title: "你的剧情名",
  summary: "一句话简介（关卡卡片上显示）",
  genre: "职场博弈",              // 类型标签：职场悬疑/职场博弈/职场伦理
  level: "Lv.2",
  xp: 160,
  totalStages: 3,                // 总幕数
  // 每段剧情独有的「批改角色」和「评审标准」
  criticCharacter: "总法律顾问老周",
  criticQuestion: "你当时拍板说「权限没问题」，现在客户投诉到监管了，你怎么交代？",
  evaluationCriteria: [
    "1. 风险可控：有没有分级权限和回滚按钮？",
    "2. 客户信任：出事后第一时间怎么补救？",
    "3. 跨部门协同：法务/销售/客服谁先接棒？",
    "4. 长期可迭代：下次怎么避免同坑？",
    "5. 合规伦理：触碰红线的边界在哪里？"
  ],
  stages: [
    {
      index: 0,
      actLabel: "第 1 幕 · 立项评审",
      timeMarker: "T + 0 天 · 周一 10:00",
      stageTitle: "产品评审会上，销售总监拍桌要 100% 全自动 Agent",
      context: "故事背景……第一幕不需要 contextBranch（没有上一幕）",
      question: "作为 AI PM，你选哪个方案？",
      constraints: ["本季度必须上线", "法务审核不超过 3 天", "客户 SLA 响应 15 分钟内"],
      choices: [
        {
          id: "s1-a", title: "自动化优先", text: "在小范围客户中自动执行，销售每天抽检结果",
          score: 52,
          consequence: "上线 6 小时后，重复发送和客户信息串线同时出现……",
          whyThisScore: "范围有所控制，但不可逆动作仍缺少发送前确认，抽检只能事后发现问题。"
        },
        // choice B / C ...
      ]
    },
    {
      index: 1,
      // 第 2 幕开始，直接按上一幕的 choice id 进入对应剧情分支
      contextBranch: {
        "s1-a": "上一幕你选了自动化优先，错误邮件已经发出，法务要求立刻保全日志……",
        "s1-b": "上一幕你选了分级确认，错误被拦住，但销售抱怨批量确认流于形式……",
        "s1-c": "上一幕你保留人工执行，错误没有外发，但团队开始质疑效率收益……"
      },
      actLabel: "第 2 幕 · 邮件误发当天",
      timeMarker: "T + 6 小时 · 周二 16:00",
      stageTitle: "CTO 群里 @ 你：给我一个 15 分钟可执行的方案",
      // 剩下字段同上
    }
    // 第 3 幕（终局，不需要 contextBranch 里的分支再多，保持 1-2 条即可）
  ]
}
```

### 本地开发（改代码即时生效）
```bash
git clone git@github.com:<你的用户名>/ai-pm-sandbox.git
cd ai-pm-sandbox
npm start
# http://localhost:4173 刷新即生效（后端改 server.js 需要手动重启一下）
```

### TODO
- [ ] 补真实截图到 `docs/screenshots/` 替换 README 占位图
- [ ] 4-8 段更多行业剧情：教育 AI / 医疗 AI / 自动驾驶 / AI 硬件 / 法律 AI
- [ ] 接入真实 LLM（OpenAI / Claude / 豆包 / 通义）做智能批改，替换本地关键词评分
- [ ] 多语言：英文 / 日文界面（`i18n.js`）
- [ ] PWA 支持：离线可用，装到手机桌面当 App
- [ ] 分享卡片主题与更多导出尺寸
- [ ] 多人协作：排行榜 / 团队剧情 PK（要加后端数据库了）

---

## 📄 License

MIT © susu — 详见 [LICENSE](./LICENSE) 文件。

---

<p align="center">欢迎提交 Issue 或 PR。</p>
