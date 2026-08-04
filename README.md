<p align="center">
  <h1 align="center">🎯 AI PM Sandbox</h1>
  <p align="center"><strong>游戏化 AI 产品经理判断力训练场 — 3 段职场剧情闯关 + 结构化批改 + 可导出面试作品集</strong></p>
</p>

<p align="center">
  <a href="#-特性"><strong>特性</strong></a> ·
  <a href="#-快速开始"><strong>快速开始</strong></a> ·
  <a href="#-想分享给朋友玩不用-clone-公网部署"><strong>分享给朋友玩</strong></a> ·
  <a href="#-界面一览"><strong>界面一览</strong></a> ·
  <a href="#-微信飞书-个人刷题配置"><strong>微信/飞书刷题</strong></a> ·
  <a href="#-项目结构"><strong>结构</strong></a> ·
  <a href="#-贡献指南"><strong>贡献</strong></a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-%3E=18-green?style=flat-square&logo=node.js" alt="Node.js">
  <img src="https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square" alt="License">
  <img src="https://img.shields.io/badge/Zero%20Dependencies-✅-brightgreen?style=flat-square" alt="零依赖">
  <img src="https://img.shields.io/badge/剧情关卡-3%C2%B710幕-ff9500?style=flat-square" alt="剧情关卡">
</p>

---

## ✨ 特性

### 🎬 剧情化闯关（v0.2 核心升级）
像短剧 + 探案一样练 AI PM 决策：**3 段大型真实职场剧情 · 10 幕递进 · 30+ 分叉选择**，你的每次选择都会影响后续剧情走向和人物关系：
- 🕵️ **RAG 疑案**（4 幕 · 180 XP · 职场悬疑）：立项决策会 → 上线 24 小时爆炸 → CCO 办公室反击 → 终局复盘
- ⚔️ **Agent 风暴**（3 幕 · 160 XP · 职场博弈）：需求评审权限画界 → 上线 6 小时邮件误发 → 法务 12 条合规权衡
- 🌀 **幻觉迷局**（3 幕 · 170 XP · 职场伦理）：内测收益率翻车 → 客户会议室 10 秒危机 → 营业部全员会终局

每一个选择都有 **100~150 字剧情 consequence（剧情结果）+ whyThisScore（为什么拿这个分数）**，从单题问答升级成真正的「决策体验」。

### 🧠 结构化批改（对标真实面试评审）
完成剧情后一次性给出 5 层结构化深度反馈（不是一句话评语）：
1. **🎙️ 角色反击卡**：CCO / 法务 VP / 合规主管当场追问（职场式温和追问，绝不攻击）
2. **📋 5 条专家编号评审标准**：风险可控 · 客户信任 · 跨部门协同 · 长期可迭代 · 合规伦理
3. **🔍 每幕选择分解释**：按幕告诉你每一步 A/B/C 为什么拿这个分数，加权平均看总分
4. **三栏复盘卡**：✅ 亮点 / ⚠️ 差距 / 🎯 下一步行动（可直接套进作品集）
5. **4 档口吻总结**：≥88 超棒 / ≥72 不错 / ≥55 基础分 / <55 鼓励，绝对不拍桌子

### 📱 微信 / 飞书个人刷题（不是发同事讨论）
把题目推到你**自己的群/机器人**里随时刷，不打扰任何人：
- ✅ **企业微信群机器人**（Markdown 消息）
- ✅ **飞书 / Lark 自定义机器人**（支持签名校验）
- ✅ **Telegram Bot**
- ✅ **通用 Webhook / Microsoft Teams Adaptive Card**
- ✅ **Dry-Run 预览**：不配 Webhook 也能看完整消息格式（demo 模式）

### 💼 作品集沉淀
- 每次闯关自动保存答案、分数和改进方向
- **一键导出 Markdown / HTML**：打印面试前看，整理成 Blog，或者发作品集链接
- 进度自动存在浏览器 LocalStorage，刷新不丢
- XP 经验值 + 等级系统，解锁成就徽章

### 📚 AI PM 技术栈地图
9 大模块知识图谱，帮你和工程师聊到同个频道：
模型能力边界 · Prompt 任务设计 · RAG 知识库 · Evals 评测体系 · Agent 工具调用 · 隐私安全 · 成本延迟优化 · 上线运营闭环 · IM 协作场景

### 🌙 深色模式 & ⌨️ 全键盘快捷键
- 一键切换浅色/深色主题（`D`）
- 剧情模式：`A / B / C` 或 `1 / 2 / 3` 快速选方案，`Enter` 进下一幕
- `Ctrl+Enter` 提交批改，`N / P` 切换剧情关卡，`?` 查完整快捷键，`E` 导出作品集

### 🎤 语音输入（中文 zh-CN）
不想打字？点 🎤 按钮，浏览器原生 Web Speech API 自动中文转文字，答案写好再提交。

---

## 🚀 快速开始

### 方式零：npx 直接运行（不用 git clone，最快）
Node.js >= 18，一行命令启动，零外部依赖：

```bash
npx ai-pm-sandbox
# 如果上面找不到（尚未发布 npm），用这一行也行：
npx --yes github:kasaviawuh111-cpu/ai-pm-sandbox
```

启动后手动访问：**http://localhost:4173**

> ℹ️ 你自己电脑上运行，就是访问你自己的 localhost；朋友要一起玩请用下方「公网部署」。

---

### 方式一：Git Clone + Node.js（推荐，可改代码）
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

打开浏览器访问：**http://localhost:4173**

---

### 方式二：Docker
```bash
# 方式 A：docker compose 一键起（推荐）
docker compose up -d

# 方式 B：手动构建
docker build -t ai-pm-sandbox .
docker run -p 4173:4173 --env-file .env ai-pm-sandbox
```

同样在自己电脑打开：**http://localhost:4173**

---

## 🌐 想分享给朋友玩？（不用 Clone · 公网部署）
> ❌ 朋友不能访问你电脑上的 `localhost`——localhost 只在运行服务的那台机器生效。
> ✅ 想要分享链接，**部署到任意公网服务器**就行，然后把 `http://你的服务器IP:4173` 或绑定的域名发给朋友。

### 一键部署 1：Vercel / Railway / Render 按钮（最简单）
暂未托管，手动点下面平台新建 → 选这个仓库自动部署即可（项目零依赖，启动命令 `npm start`，监听端口 `4173`，在平台控制台把内部端口映射到公网就行）：

| 平台 | 免费额度 | 说明 |
|------|---------|------|
| **Render** (Web Service) | 每月 750 小时免费 | 最省事，GitHub 仓库一选就部署，给个 `onrender.com` 子域名 |
| **Railway** | $5 每月免费额度 | 1 键 import，端口填 4173 自动映射 |
| **Fly.io** | 3 个共享 CPU 实例免费 | `fly launch` 就行，给 `fly.dev` 子域名 |
| 自己的 VPS（腾讯云/阿里云/UCloud 等） | — | 下面给了 shell 步骤 |

### 一键部署 2：自己有 VPS（Linux + Node >= 18）
比如腾讯云 2C2G 轻量服务器就行：

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

部署成功后，朋友直接打开：
👉 **http://你的服务器公网IP:4173**
（或者你绑个域名 `aipm.你的域名.com` 更优雅）

### 一键部署 3：想更简单 + HTTPS？
用 **Cloudflare Tunnel**（不需要公网 IP，家里的电脑也能公网访问）：
```bash
# 1. 先本地跑起来（npm start）
# 2. 装 cloudflared，把本地 4173 暴露到公网
cloudflared tunnel --url http://localhost:4173
```
Cloudflare 会给一个临时 `trycloudflare.com` 的 HTTPS 域名，发给朋友就能直接玩，免费零配置。

---

## 🖼️ 界面一览

> ⚠️ 真实截图像素太多，正在整理中。你本地启动项目（`npm start` 然后打开 `http://localhost:4173`）就能看到完整的 UI 啦，下面是文字版功能地图：

### 🏠 闯关主界面（4 个主要视图）
| 视图 | 你会看到什么 |
|:---:|:---|
| **剧情关卡列表** | 3 段大型剧情卡片，显示类型标签（职场悬疑/博弈/伦理）+ 幕数 + XP + 当前进度百分比 |
| **答题面板** | 顶部阶段进度指示器（dots 脉冲动画 · 第 n/m 幕） + 上一幕结果回顾卡 + 当前局面/问题/约束条 + A/B/C 三选一（带 consequence 弹出动画） |
| **结构化批改** | 🎙️ CCO/法务角色反击卡（紫色渐变） → 📋 5 条专家编号标准 → 🔍 每幕 A/B/C 为什么拿这个分数 → ✅亮点/⚠️差距/🎯下一步 三栏卡片 → 五维分条 + 4 档温柔总结 |
| **作品集导出** | Markdown / HTML 两种一键下载，包含每关的方案、分数、改进方向，可以直接面试前看 |

### 🛰️ 其他视图
| 视图 | 说明 |
|:---:|:---|
| **微信/飞书刷题** | 填你自己的 Webhook（支持企业微信/飞书签名/Telegram/Teams）→ 预览完整 JSON → 一键推到自己的机器人；不配 webhook 也有 demo 预览 |
| **技术栈地图** | 9 大 AI PM 模块知识图谱（模型边界 / Prompt / RAG / Evals / Agent / 隐私安全 / 成本延迟 / 运营闭环 / IM） |
| **深色模式** | 顶部 `D` 快捷键或面板按钮一键切换浅色/深色双主题，所有颜色走 CSS 变量 |
| **语音输入** | textarea 右侧 🎤 按钮，中文 zh-CN 语音转文字自动填入答案框（浏览器降级时有提示） |

---

## 📱 微信/飞书 个人刷题配置
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

## 🗂️ 项目结构

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
| 3 | 🌀 幻觉迷局：理财顾问会议室那 10 分钟 | 职场伦理 · 可信度 | 3 幕 | 170 | 可追溯引用 + 置信度展示 + 拒答策略 + 合规红线 |

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

## 🛠️ 开发 & 贡献

欢迎 Issue 和 PR！任何形式的贡献都很珍贵：

### 想加新剧情？太棒了！
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
  criticCharacter: { name: "法务VP老周", avatar: "⚖️", title: "首席合规官" },
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
          id: "s1-a", title: "A · 全自动", text: "100% 自动执行邮件，不设人工兜底",
          score: 25, stageEffect: "full-auto",
          consequence: "你选了全自动。6 小时后出大事了——7200 封邮件带错报价发给客户…",
          whyThisScore: "25 分：完全不分级权限的方案在真实职场里风险非常高——Agent 一定会犯错，如果连「紧急暂停按钮」和人工审批都不设，损失会直接传导到客户。"
        },
        // choice B / C ...
      ]
    },
    {
      index: 1,
      // ⚠️ 第 2 幕开始，按上一幕的 stageEffect 动态分支！
      contextBranch: {
        "full-auto":  "上一幕你选了全自动，7200 封错邮件已发送，法务在群里 @ 所有人…",
        "confirm":    "上一幕你选了分级确认，错邮件被拦截在审批队列里，但销售抱怨审批太慢…",
        "suggestion": "上一幕你选了仅建议模式，销售觉得 AI 太鸡肋 3 天用了 1 次…"
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

### 贡献者友好的 TODO（来挑一个做吧！）
- [ ] 补真实截图到 `docs/screenshots/` 替换 README 占位图
- [ ] 4-8 段更多行业剧情：教育 AI / 医疗 AI / 自动驾驶 / AI 硬件 / 法律 AI
- [ ] 接入真实 LLM（OpenAI / Claude / 豆包 / 通义）做智能批改，替换本地关键词评分
- [ ] 多语言：英文 / 日文界面（`i18n.js`）
- [ ] PWA 支持：离线可用，装到手机桌面当 App
- [ ] 分享卡片 PNG 优化（已在前端做了 SVG→Canvas→PNG，还可以加微信分享签名）
- [ ] 多人协作：排行榜 / 团队剧情 PK（要加后端数据库了）

---

## 📄 License

MIT © susu — 详见 [LICENSE](./LICENSE) 文件。

---

<p align="center">
  <strong>如果这个项目对你有帮助，记得点个 ⭐️ Star 支持一下！</strong>
</p>
