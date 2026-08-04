<p align="center">
  <h1 align="center">🎯 AI PM Sandbox</h1>
  <p align="center"><strong>AI 产品经理判断力训练场 — 闯关练决策，把题目发到团队群里讨论</strong></p>
</p>

<p align="center">
  <a href="#-特性"><strong>特性</strong></a> ·
  <a href="#-快速开始"><strong>快速开始</strong></a> ·
  <a href="#-功能截图"><strong>截图</strong></a> ·
  <a href="#-im-配置"><strong>IM 配置</strong></a> ·
  <a href="#-项目结构"><strong>结构</strong></a> ·
  <a href="#-贡献指南"><strong>贡献</strong></a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-%3E=18-green?style=flat-square&logo=node.js" alt="Node.js">
  <img src="https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square" alt="License">
  <img src="https://img.shields.io/badge/Zero%20Dependencies-✅-brightgreen?style=flat-square" alt="零依赖">
</p>

---

## ✨ 特性

### 🎮 游戏化闯关训练
- **5+ 真实 AI PM 场景关卡**：从 RAG 客服上线、Agent 权限设计，到模型成本失控、评测体系建设、数据飞轮搭建
- **三选一决策框架**：每道题给三个典型方案（激进 / 稳健 / 保守），帮你建立 PM 决策直觉
- **五维评分模型**：问题定义 · AI 可行性 · 数据评测 · 风险安全 · 落地实验
- **教练提示按钮**：卡住了？一键填入「AI 边界」「评测口径」「实验方案」等思维脚手架
- **XP 经验值 + 等级系统**：完成关卡获得 XP，解锁徽章和作品集

### 🤝 团队 IM 协作
把题目一键发到团队群，从「个人做练习」变成「团队开评审会」：
- ✅ **企业微信 / 微信群机器人**（Markdown 消息）
- ✅ **飞书 / Lark 自定义机器人**（支持签名校验）
- ✅ **Telegram Bot**
- ✅ **通用 Webhook / Microsoft Teams Adaptive Card**
- ✅ **Dry-Run 预览**：发送前先看消息内容和请求体

### 📚 AI PM 技术栈地图
9 大模块知识图谱，帮你和工程师聊到同个频道：
- 模型能力边界 · Prompt 任务设计 · RAG 知识库
- Evals 评测体系 · Agent 工具调用 · 隐私安全
- 成本延迟优化 · 上线运营闭环 · IM 协作场景

### 💼 作品集沉淀
- 每次闯关自动保存答案、分数和改进方向
- **一键导出 Markdown**：打印出来面试前看，或者整理成 Blog
- 进度自动存在浏览器 LocalStorage，刷新不丢

### 🌙 深色模式 & ⌨️ 快捷键
- 一键切换浅色/深色主题
- 键盘流操作：`Ctrl+Enter` 提交、`1-3` 选选项、`N/P` 切换关卡

---

## 🚀 快速开始

### 方式一：Node.js（推荐，最简单）

要求 Node.js >= 18，**零外部依赖**，用的全是内置模块。

```bash
# 1. 进入项目
cd ai-pm-sandbox

# 2. （可选）配置环境变量
cp .env.example .env
# 然后编辑 .env 填入你的 IM Webhook（不配也能用 demo 模式）

# 3. 启动！
npm start
```

打开浏览器访问：**http://localhost:4173**

### 方式二：Docker

```bash
# 构建 & 运行
docker compose up -d

# 或者手动
docker build -t ai-pm-sandbox .
docker run -p 4173:4173 --env-file .env ai-pm-sandbox
```

同样访问 **http://localhost:4173**

---

## 🖼️ 功能截图

### 🏠 闯关主界面
| 关卡选择 | 答题面板 |
|:---:|:---:|
| ![关卡选择](https://via.placeholder.com/600x400?text=Mission+List+Screenshot) | ![答题面板](https://via.placeholder.com/600x400?text=Answer+Panel+Screenshot) |

### 📊 评分反馈 & 作品集
| 五维评分 | 作品集导出 |
|:---:|:---:|
| ![评分](https://via.placeholder.com/600x400?text=Score+Breakdown) | ![作品集](https://via.placeholder.com/600x400?text=Portfolio) |

### 🛰️ IM 发送 & 🌙 深色模式
| IM 配置 | 深色模式 |
|:---:|:---:|
| ![IM](https://via.placeholder.com/600x400?text=IM+Dispatch) | ![Dark](https://via.placeholder.com/600x400?text=Dark+Mode) |

> 💡 **小提示**：截图占位符可以换成你自己的真实截图，放到 `docs/screenshots/` 目录下再改路径即可。

---

## 📡 IM 配置

### 企业微信
1. 群聊 → 右上角「···」→ 「群机器人」→「添加机器人」
2. 复制 Webhook URL 填入 `WECOM_WEBHOOK_URL`

### 飞书 / Lark
1. 群设置 → 群机器人 → 自定义机器人 → 添加
2. 复制 Webhook 到 `FEISHU_WEBHOOK_URL`
3. 如果开了「签名校验」，把密钥填到 `FEISHU_BOT_SECRET`

### Telegram Bot
1. 在 Telegram 找到 `@BotFather`，发送 `/newbot` 创建 Bot，拿到 Token
2. 把 Bot 拉进目标群，随便发一条消息
3. 访问 `https://api.telegram.org/bot<你的token>/getUpdates`，在返回 JSON 里找 `chat.id`
4. 分别填入 `TELEGRAM_BOT_TOKEN` 和 `TELEGRAM_CHAT_ID`

### Demo 模式
没有配置 Webhook 也没关系！点击「预览请求」就能看到即将发送的完整内容和格式，完美用于演示和截图。

---

## 🗂️ 项目结构

```
ai-pm-sandbox/
├── public/                  # 前端静态文件
│   ├── index.html          # 主页面骨架（侧边栏 + 四大视图）
│   ├── app.js              # 核心逻辑：关卡数据、评分算法、UI 渲染
│   └── styles.css          # 主题样式（浅色/深色双主题）
├── server.js               # 后端：静态服务 + IM 发送 API
├── package.json            # 项目元信息
├── .env.example            # 环境变量模板
├── .gitignore
├── Dockerfile              # Docker 镜像
├── docker-compose.yml      # Docker Compose 编排
├── LICENSE                 # MIT 开源协议
└── README.md               # 你现在正在看的文件
```

**技术选型说明**：
- **后端**：纯 Node.js 内置模块（http/fs/crypto），零依赖，方便部署
- **前端**：原生 HTML/CSS/JS（ES Modules），无构建步骤，打开即用
- **存储**：浏览器 LocalStorage，无需数据库
- 刻意保持简单，方便二次开发和教学

---

## 🎮 关卡列表

| # | 关卡名 | 等级 | XP | 核心决策点 |
|---|--------|:---:|:---:|-----------|
| 1 | AI 客服是否应该接入 RAG | Lv.1 | 120 | 范围控制 + 人工兜底策略 |
| 2 | Agent 自动执行还是半自动确认 | Lv.2 | 140 | 动作分级 + 权限边界 + 审计 |
| 3 | 模型成本突然失控 | Lv.3 | 150 | 模型路由 + 缓存 + 套餐策略 |
| 4 | 没有评测集能不能上线 | Lv.4 | 170 | 黄金集 + 拒答 + 试点范围 |
| 5 | 从功能到数据飞轮 | Lv.5 | 190 | 隐式反馈 + 版本追踪 + 质量看板 |
| 6 | Prompt 设计从「玄学」到「工程」 | Lv.6 | 180 | 提示词版本 + AB 实验 + 回归集 |
| 7 | 多模态产品上线前的安全护栏 | Lv.7 | 200 | 输入过滤 + 输出审核 + 红队测试 |
| 8 | 幻觉治理：当 AI 一本正经胡说八道 | Lv.8 | 210 | 可追溯引用 + 置信度 + 拒答策略 |

---

## ⌨️ 键盘快捷键

| 按键 | 功能 |
|:-----|------|
| `1` / `2` / `3` | 快速选择第 N 个方案 |
| `N` | 下一关 |
| `P` | 上一关 |
| `Ctrl/Cmd + Enter` | 获取反馈 / 提交评分 |
| `E` | 导出作品集（在作品集视图） |
| `D` | 切换深色 / 浅色模式 |
| `?` | 显示快捷键帮助 |

---

## 🛠️ 开发 & 贡献

欢迎 Issue 和 PR！任何形式的贡献都很珍贵：

### 想加新关卡？
编辑 `public/app.js` 里的 `scenarios` 数组，照猫画虎加一个对象即可，字段说明：
```javascript
{
  id: "unique-id",           // 唯一英文 ID
  level: "Level 6",          // 关卡等级
  xp: 180,                   // 通关奖励 XP
  title: "关卡标题",
  summary: "一句话简介（会显示在关卡卡片上）",
  context: "业务背景故事...",
  question: "作为 AI PM，你会怎么做？",
  constraints: ["约束1", "约束2"],
  choices: [                 // 三个选项，分数从低到高
    { id: "a", title: "激进方案", text: "说明...", score: 30 },
    { id: "b", title: "推荐方案", text: "说明...", score: 90 },
    { id: "c", title: "保守方案", text: "说明...", score: 55 }
  ],
  rubric: ["评审维度1", "评审维度2", ...]
}
```

### 本地开发
```bash
git clone <你的 fork 地址>
cd ai-pm-sandbox
npm run dev
# http://localhost:4173 改代码刷新即生效
```

### 贡献者友好的 TODO
- [ ] 更多行业场景关卡（教育 AI、医疗 AI、自动驾驶、AI 硬件...）
- [ ] 接 AI 模型做智能评审（替换本地关键词评分）
- [ ] 多语言：英文 / 日文界面
- [ ] PWA 支持：离线可用，装到手机桌面
- [ ] 答案生成长图分享卡片

---

## 📄 License

MIT © susu — 详见 [LICENSE](./LICENSE) 文件。

---

<p align="center">
  <strong>如果这个项目对你有帮助，记得点个 ⭐️ Star 支持一下！</strong>
</p>
