const scenarios = [
  {
    id: "rag-mystery",
    level: "Level 1 · 四幕剧",
    xp: 180,
    title: "RAG 疑案：AI 客服上线 72 小时",
    summary: "从立项、上线异常到客户分层，连续判断 AI 何时可以直接面对客户。",
    genre: "职场悬疑 · 客户信任危机",
    totalStages: 4,
    evaluationCriteria: [
      "1️⃣ 范围与边界：是否明确区分「AI 可独立处理」与「必须转人」的场景",
      "2️⃣ 可追溯与引用：答案是否标注来源，出错能否定位到具体知识条目",
      "3️⃣ 人工兜底策略：高价值客户、投诉、情绪激烈时是否有强制转人机制",
      "4️⃣ 评测门槛：上线前是否有黄金样例 + 准确率/拒答率/引用正确率三条红线",
      "5️⃣ 灰度与回滚：从 5%→50% 是否有阶段监控，异常能否秒级切回人工"
    ],
    criticCharacter: "首席客户官林姐 · 12 年客户成功经验",
    criticQuestion: "如果一次误答导致年付 80 万的客户不续约，你会怎样控制损失并避免再次发生？",
    scenarioPositiveSignals: [
      "边界", "范围", "不可答", "转人工", "人工接管", "引用", "来源", "追溯",
      "黄金集", "评测", "准确率", "拒答", "灰度", "试点", "接管率", "满意度",
      "高价值", "客户分层", "置信度", "兜底", "回滚", "熔断", "Copilot", "辅助"
    ],
    scenarioNegativeSignals: [
      "全量", "全部接", "100%自动", "不转人工", "直接上线", "AI 不会错",
      "不用监控", "不用兜底", "不需要评测", "FAQ 够用了"
    ],
    stages: [
      {
        index: 0,
        actLabel: "第一幕 · 立项决策会",
        timeMarker: "周一上午 10:00",
        stageTitle: "CEO 拍板：两周内必须上线 AI 客服",
        context:
          "会议室里，CEO 把手机往桌上一扔——竞品上周官宣了 AI 客服，降本 60% 的海报刷遍了他的朋友圈。\n\n「我们 3200 张每周工单里 42% 是重复问题，客服团队 18 个人，一年工资 300 万。两周，我要看到 AI 客服上线。」\n\nCCO 林姐皱着眉没说话，你知道她上周刚处理完 3 个客户因 FAQ 答案过期被误导的投诉。知识库 1280 篇文档里，最后更新时间超过 90 天的占 38%。工程团队说 RAG 两周能跑通 demo，但质量……「看数据情况」。",
        question: "立项第一拍：AI 客服第一版的定位是什么？",
        constraints: ["两周必须上线（CEO 死线）", "不能改 CRM 系统（IT 排期满了）", "18 个客服里只有 2 个愿意参与试点"],
        choices: [
          {
            id: "s1a-all",
            title: "效率优先的自动回复",
            text: "先开放高频重复问题自动回复，低置信度转人工；上线后每天抽检，再依据异常率逐步扩大覆盖。",
            score: 56,
            stageEffect: "ceoHappy: +2, ccoTrust: -3, riskLevel: high",
            consequence: "CEO 当场夸你「有执行力」。林姐冷笑一声，在笔记本上写了五个字：「出了事找你」。两周后，AI 如约上线。",
            whyThisScore: "方案有范围和人工队列，但把质量验证放到了上线之后。知识库 38% 过期时，即使只开放高频问题，也应先用真实工单做离线评测并排除高价值客户；否则第一批错误会直接消耗客户信任。"
          },
          {
            id: "s1a-copilot",
            title: "客服审核的 AI 草稿",
            text: "AI 只给客服写答案草稿 + 找知识来源，最终发出什么由客服人来确认。对外完全不暴露 AI。",
            score: 90,
            stageEffect: "ceoHappy: 0, ccoTrust: +2, riskLevel: low",
            consequence: "CEO 有点失望「看不到直接降本数字」，但林姐抬起头说「这个方案我愿意配合」。试点的 2 个客服开始用 AI 打草稿。",
            whyThisScore: "这个方案在两周期限里优先保护客户，同时保留真实落地价值。客户接触到的依然是人工确认后的答案，客服效率被 AI 提起来；人工接受或拒绝草稿的记录，也会成为后续扩大自动化范围的可靠数据。"
          },
          {
            id: "s1a-faq",
            title: "先治理知识再自动化",
            text: "AI 风险太大，先把 1280 篇文档人工整理成 200 条标准 FAQ，走关键词匹配流程。",
            score: 64,
            stageEffect: "ceoHappy: -1, ccoTrust: +1, riskLevel: low",
            consequence: "CEO 说「这跟之前有什么区别？」但没反对。两个客服花了整整两周，删删改改凑出 186 条 FAQ。上线第一天，FAQ 覆盖率 28%。",
            whyThisScore: "稳但低效。FAQ 只能覆盖明确定义过的问题，但客户每周的问法都在变——FAQ 写死的问题，一个月后覆盖率就会掉到 15% 以下。本质只是把「AI 风险」换成了「人工维护 FAQ 的成本黑洞」。"
          }
        ]
      },
      {
        index: 1,
        actLabel: "第二幕 · 上线第 24 小时",
        timeMarker: "周三下午 15:20",
        stageTitle: "钉钉群 99+ 消息炸了",
        contextBranch: {
          "s1a-all":
            "你选了高频问题自动回复。上线第一天，AI 处理了 812 个问题，低置信度队列也正常转给客服。\n\n但下午抽检发现，系统把「退款期限」和「合同解除」都判成了高频标准问题：旧知识文档被高置信召回，已经有客户收到错误规则。更麻烦的是，一个 VIP 客户被错误归进普通队列，拿到了一份过期 API 文档。\n\n范围和转人工都做了，却挡不住「高置信地引用旧知识」。林姐的电话打进来：「现在你先修哪一层？」",
          "s1a-copilot":
            "你选了 Copilot 模式。两个试点客服的平均响应时长从 18 分钟降到 7 分钟，AI 初稿的采纳率 72%。\n\n但下午 3 点，一个客服在内部群发了截图：AI 给的草稿里引用了一篇 2023 年 3 月的旧版 SLA，那篇文档的版本已经在 9 月更新过，知识库里两篇并存。幸好她人工检查了，没发出去。\n\n半小时后，另一个客服反馈：遇到客户情绪激烈说要投诉，AI 草稿还在机械地道歉+给解决方案，完全不会识别情绪转主管。",
          "s1a-faq":
            "你选了人工 FAQ。上线 24 小时，FAQ 覆盖率只有 28%。也就是说，72% 的工单依然需要人工从零写。\n\n两个参与试点的客服说「省下来的时间都用来加 FAQ 条目了」。更糟的是，有客户反馈：同一个问题换了三种问法，FAQ 只命中了一次，另外两次返回了不相关的答案。\n\nCEO 中午路过工位，看了一眼覆盖率看板，没说话，但你看到他的表情。"
        },
        question: "面对第一波危机信号，你的第二步动作是？",
        constraints: ["没有新的开发资源", "CEO 周五要数据汇报", "林姐在等你的态度"],
        choices: [
          {
            id: "s2a-patch",
            title: "建立错误模式黑名单",
            text: "先把已知错误做成规则黑名单并转人工；周五汇报已拦截数量，完整风险清单等根因确认后再补。",
            score: 38,
            stageEffect: "shortTermFix: 1, longTermRisk: +4, trust: -2",
            consequence: "黑名单加了 37 条，但第 38 条总会冒出来。林姐看了你的汇报材料，什么都没说，把自己的那页客户流失预警抽走了。",
            whyThisScore: "黑名单能快速挡住已知表达，却追不上新的错误方式；只汇报拦截数量、延后完整风险清单，也会让管理层误判风险已经受控。它适合作为临时补丁，不能代替边界和评测。"
          },
          {
            id: "s2a-eval",
            title: "先建立离线评测基线",
            text: "暂停扩量，从过去一周真实工单抽 50 条做黄金集；每天复跑准确率、引用正确率与拒答率。",
            score: 74,
            stageEffect: "shortTermFix: 1, longTermRisk: -1, trust: +1",
            consequence: "你和两个客服加班到 9 点，标了 50 条黄金样本。第一次跑：正确率 58%，引用准确率 41%，拒答率只有 8%。数字难看，但你终于有了「差多少」的量化基线。",
            whyThisScore: "评测能把问题量化，但线上风险已经出现，只做基线无法立即止血。更稳妥的组合是先限制高风险边界，同时启动评测诊断，再依据结果优化知识和召回。"
          },
          {
            id: "s2a-boundary",
            title: "按风险类型设置回答边界",
            text: "先和客服划出合同、退款、投诉、VIP 等高风险边界，命中就强制转人；其余问题保持当前覆盖。",
            score: 88,
            stageEffect: "shortTermFix: 2, longTermRisk: -2, trust: +2",
            consequence: "你拉上林姐一起列了 7 类红线问题：合同条款、退款金额、投诉升级、VIP 客户、涉及数据安全、法律相关、竞品对比。AI 覆盖率掉了 14%，但人工接管成功率从 62% 升到 94%。林姐同意先按这七类问题转人工，并要求第二天补上评测和重开条件。",
            whyThisScore: "线上已经出现风险时，先把不可答边界和强制转人做成止血机制，顺序正确。它仍不是终点：下一步还要用评测找到知识与召回问题，并用客户分层决定哪些场景可以重新开放。"
          }
        ]
      },
      {
        index: 2,
        actLabel: "第三幕 · CCO 办公室",
        timeMarker: "周四下午 16:00",
        stageTitle: "林姐把一叠打印纸拍在你桌上",
        contextBranch: {
          "s2a-patch": "黑名单上线后拦住了 37 个已知表达，但换一种问法就会漏掉。林姐把新增的 12 个案例推到你面前：其中 4 个来自高价值客户，问题不在关键词，而在客户等级、情绪和知识版本都没有进入决策。\n\n「你可以继续追第 38 条规则，」她说，「也可以现在告诉我，怎样让系统从机制上知道哪些客户不能拿来试错。」",
          "s2a-eval": "黄金集跑出了难看的基线：正确率 58%，引用正确率 41%，拒答率 8%。林姐认可你把问题量化了，却把 4 个高价值客户的真实案例放到桌上。\n\n「评测告诉我们哪里差，线上客户还在承担差距。」她问你：「明天 CEO 汇报前，哪些客户先保护起来，哪些流量还能继续验证？」",
          "s2a-boundary": "七类红线已经止住新增误答，VIP 和投诉也都转回人工。但覆盖率下降后，CEO 开始追问降本目标；客服则发现普通客户里仍会引用旧知识。\n\n林姐把一张客户分层表推给你：「边界先救了火。现在别把所有客户放进同一个桶里，告诉我下一阶段怎么既守住续费，又保留验证价值。」"
        },
        question: "面对客户成功负责人的正面反击，你的最终决策方案是？",
        constraints: ["明天 CEO 要最终汇报", "VIP 客户续费率是公司季度 OKR 红线", "工程团队下周才能排到 RAG 优化"],
        choices: [
          {
            id: "s3a-layered",
            title: "按客户风险分层运行",
            text: "VIP 与投诉保持人工确认；普通问题带引用和转人工入口继续灰度，并给值班人员配置一键熔断。",
            score: 94,
            stageEffect: "riskZero: 1, loss: 0, credit: +3",
            consequence: "林姐听完说「这个方案，我愿意在 CEO 面前和你一起扛」。周五汇报，CEO 问「降本多少？」你说「短期看是 VIP 没降，但非 VIP 客服人均工单处理量 +45%，而且我们多了熔断、分层、引用三条机制——下个月可以稳步扩大范围」。CEO 拍了板：「就这么干」。",
            whyThisScore: "VIP 保留人工确认，普通流量继续验证效率，异常时可以及时熔断。三层控制把客户风险和学习速度拆开处理，使项目能够继续迭代，而不是把关键客户当成试验样本。"
          },
          {
            id: "s3a-rollback",
            title: "退回人工确认模式",
            text: "暂停所有对外自动回复，但保留客服内部草稿；两周内补知识治理和评测，再从小流量重新开放。",
            score: 72,
            stageEffect: "riskZero: 1, loss: -2, credit: -1",
            consequence: "林姐认可先保护客户，但 CEO 对自动化目标延期明显不满。两个试点客服仍保留草稿能力，效率没有完全归零；你争取到两周整改窗口，却必须拿出明确的重开门槛。",
            whyThisScore: "先退回人工确认是可控的止损方案，而且保留了已验证有效的草稿能力。代价是验证速度与管理层信心下降；如果没有明确的评测门槛和重开时间，它很容易变成永久搁置。"
          },
          {
            id: "s3a-promise",
            title: "用准确率目标换取继续试点",
            text: "以一周为观察窗口，承诺把准确率提升到 90% 后再复盘是否扩大范围，先争取保留当前试点。",
            score: 44,
            stageEffect: "riskZero: 0, loss: -3, credit: -3",
            consequence: "你说出口的瞬间就后悔了。工程排期你都没确认过。果然，第二天你就收到了工程主管的钉钉消息：「你答应的 90% 准确率，你来负责上线哈，我这边排期要下下周。」",
            whyThisScore: "问题不在 90% 这个数字本身，而在目标依赖尚未确认的工程排期，也没有基线和重开条件，因此承诺缺少可执行性。"
          }
        ]
      },
      {
        index: 3,
        type: "reflection",
        actLabel: "第四幕 · 终局复盘",
        timeMarker: "周五晚 19:30",
        stageTitle: "你的产品判断，打多少分？",
        context:
          "一周结束，项目可能继续推进，也可能进入整改，或者暂时停下。现在回看三次决定：你依据了什么信号，接受了什么代价，又在什么条件下改变了做法？",
        contextBranch: {
          "s3a-layered": "一个月后，VIP 和投诉仍由人工确认，普通客户流量按评测结果逐步扩大。非 VIP 客服人均处理量提升了 45%，期间两次异常都被值班人员及时熔断。\n\n林姐和 CEO 都认可项目继续推进，但她提醒你：「这次不是选中了一个完美答案，是你让风险和收益都变得可管理。」现在请复盘三次决定背后的共同逻辑。",
          "s3a-rollback": "两周整改期结束，知识版本治理和黄金评测集已经补齐，草稿模式保持了部分效率。CEO 仍追问何时恢复自动回复，林姐则要求先说清每一档客户的重开门槛。\n\n你保住了客户，也失去了一些验证速度。现在请复盘：什么信号出现时应该止损，满足什么证据后才能重新开放？",
          "s3a-promise": "一周观察窗口结束，准确率从 58% 提到 73%，远没到你承诺的 90%。工程主管拒绝为未经评估的目标背书，林姐也开始质疑你的汇报可信度。\n\n项目没有立刻下线，但你必须在复盘会上承认：一个产品承诺应该建立在可控动作和验证计划上，而不是一个漂亮数字。"
        },
        question: "用一句话总结：下一次遇到类似项目，你会依据什么条件决定开放、暂停或转人？",
        constraints: ["写一条以后仍会沿用的判断条件即可"],
        choices: [
          {
            id: "s4a-philosophy",
            title: "写下判断条件",
            text: "回看三次决定，并写下你以后会沿用的判断条件。",
            isFinal: true
          }
        ]
      }
    ],
    rubric: ["范围边界定义", "引用可追溯性", "客户分层+人工兜底", "离线评测基线", "灰度熔断与回滚"]
  },
  {
    id: "agent-storm",
    level: "Level 2 · 三幕剧",
    xp: 160,
    title: "Agent 风暴：销售邮件误发 72 小时",
    summary: "围绕不可逆动作的权限设计、事故处置与合规落地，决定 Agent 可以替人做到哪一步。",
    genre: "职场博弈 · 权限与合规",
    totalStages: 3,
    evaluationCriteria: [
      "1️⃣ 动作风险分级：哪些动作 AI 能自己做，哪些必须人确认，分得清不清楚",
      "2️⃣ 权限边界设计：谁能让 Agent 干什么，最小权限原则，有没有过度授权",
      "3️⃣ 人工确认闸门：对外发信、改金额这些高风险动作，是否必须人审",
      "4️⃣ 审计与可追溯：每一步动作的日志、回放、撤回、出了事能不能翻出来",
      "5️⃣ 异常与幂等：接口超时了、客户收到两封、失败了怎么恢复，有没有预案"
    ],
    criticCharacter: "经手过 3 次合规事故的总法律顾问老周",
    criticQuestion: "如果 Agent 发给 5000 个客户的邮件里，把 「年化 3.5%」写成了「年化 8.5%」，你的第一分钟、第一小时、第一天分别做什么？",
    scenarioPositiveSignals: [
      "分级", "风险分级", "动作分级", "低风险自动", "高风险确认",
      "权限", "边界", "最小权限", "谁能做什么",
      "确认", "审批", "人审", "人工确认", "最后一步人点",
      "审计", "日志", "追溯", "回放", "撤回", "回滚",
      "幂等", "重试", "超时", "失败恢复", "客户分层", "邮件", "CRM", "脱敏"
    ],
    scenarioNegativeSignals: [
      "全自动", "全部自动", "不用确认", "不需要审批", "一键端到端",
      "直接发", "直接改CRM", "不用日志", "不会出错", "AI 不会骗人"
    ],
    stages: [
      {
        index: 0,
        actLabel: "第一幕 · 产品需求评审会",
        timeMarker: "周二下午 14:00",
        stageTitle: "销售总监拍桌：「Agent 能不能帮我点那个发送键？」",
        context:
          "销售运营团队每周要花 3 个人天整理客户线索、更新 CRM 字段、写个性化跟进邮件。\n\n销售总监 Tony 把一张截图甩在评审会白板上：「竞品上了 AI Agent，销售一天能跟进 200 个客户，我们现在一天 30 个。」\n\n工程说技术上完全能做——工具调用封装好了，发邮件、改 CRM、爬 LinkedIn 都能闭环。你发现坐在角落的法务老周没说话，但他把笔盖拔开又合上了三次。\n\n散会前，Tony 盯着你：「下周能不能上？能上我就给你争取一个季度的 AI 专项奖金。不能上，销售的效率问题你跟 CEO 去解释。」",
        question: "需求评审第一拍：Agent 的权限边界画在哪？",
        constraints: ["Tony 要求下周上线", "发邮件工具 API 昨天刚接好", "CRM API 有速率限制，超额会被封", "老周说了一句「邮件发出去就收不回」"],
        optionOrder: ["a1-full", "a1-suggest", "a1-gates"],
        choices: [
          {
            id: "a1-full",
            title: "自动化优先的完整闭环",
            text: "在已通过数据校验的客户白名单内自动查 CRM、生成并发送；销售看每日抽检报告，不逐封确认。",
            score: 44,
            stageEffect: "tonyHappy: +3, zhouTrust: -4, blastRadius: 5/5",
            consequence: "Tony 当场拍你肩膀：「兄弟够意思」。老周在评审会最后留了 30 秒，说「方案我保留意见，邮件出了事法务部不背」。",
            whyThisScore: "白名单和抽检缩小了范围，却仍把不可逆的发送动作交给新接入的工具链。抽检只能事后发现，无法阻止错客户、错金额或重复邮件到达；在没有逐封或风险分级确认前，爆炸半径依然偏大。"
          },
          {
            id: "a1-gates",
            title: "按动作风险设置确认",
            text: "读取、整理和写草稿自动完成；对外发送、改金额和删客户必须由销售查看关键信息后确认。",
            score: 92,
            stageEffect: "tonyHappy: +1, zhouTrust: +2, blastRadius: 1/5",
            consequence: "Tony 有点不爽「还要人点一下啊？」老周第一次在评审会上主动说话了：「这个方案，我签字。」你成功把 80% 的机械工作自动化了，又把最后那道对外的闸门留给人。",
            whyThisScore: "Agent 真能动手，因此动作风险等级必须先于自动化率。读数据出错可以重试，发错邮件可能丢客户，改错金额可能触发合规问题。用动作风险决定人工确认，而不是用模型看起来多聪明来决定。"
          },
          {
            id: "a1-suggest",
            title: "保留人工执行的智能助手",
            text: "Agent 整理客户信息并生成待办与草稿，销售在原系统里执行发送和修改；先验证建议采纳率。",
            score: 64,
            stageEffect: "tonyHappy: -1, zhouTrust: +3, blastRadius: 0/5",
            consequence: "老周完全没问题。Tony 沉默了 10 秒，说：「这跟我现在 Excel 有什么区别？如果只是列待办，我不需要 AI。」",
            whyThisScore: "安全且能验证建议质量，但没有减少执行链路。它适合早期学习，不适合作为长期形态；下一步需要从低风险动作开始自动化，而不是永远停在高级待办清单。"
          }
        ]
      },
      {
        index: 1,
        actLabel: "第二幕 · 上线第 6 小时",
        timeMarker: "周四下午 17:50",
        stageTitle: "钉钉群 @你的第 47 条消息",
        contextBranch: {
          "a1-full":
            "你选了白名单自动发送。上线 6 小时，Agent 已经自动发了 3842 封邮件。\n\n17:48 销售小李在群里说「@产品 我有个客户说收到了两封一模一样的跟进邮件」。\n17:49 小王：「@产品 有客户回复了，说邮件里写的产品名根本不是我们卖的那个」。\n17:50 Tony 给你打了电话，声音是冷的：「我今天去拜访的一个大客户，转发了一封 Agent 发的邮件给我——邮件里写的合同编号是另一家客户的。现在他问我，我们是不是把他的数据和别人的弄混了。你说我怎么回？」\n\n老周的邮件在 17:52 发到了你的邮箱，只有标题：「紧急：请立刻停掉 Agent 邮件发送功能，并保留日志。」",
          "a1-gates":
            "你选了分级确认。Agent 上线 6 小时，生成 1204 份草稿，销售确认后发送 892 份，平均每人节省 40 分钟。\n\n17:45，一个销售发现草稿把客户公司名匹配成同名企业。你查日志后发现 1.3% 草稿有类似问题；更糟的是，三名销售批量勾选 50 封后直接确认，其中 4 封错误草稿已经发出。\n\n闸门存在，但批量交互让人工确认退化成形式。老周看着日志问：「现在你先控制哪一层？」",
          "a1-suggest":
            "你选了只给建议。上线 6 小时，Agent 生成 410 条待办，销售手动执行 98 条，团队已经抱怨复制粘贴没有省下多少时间。\n\n同时，日志显示 6 条建议重复触达同一客户，2 条把同名公司的信息匹配错了；因为仍由销售手动操作，错误被及时发现，没有真正发出。\n\nTony 要求下周开放自动执行，老周则提醒：「这正是扩大权限前最后一次低成本发现问题的机会。」你现在怎么处理这些信号？"
        },
        question: "第二波决策：针对暴露出来的问题，你现在最紧急的三步是？",
        constraints: ["周五 CEO 要项目周报", "客户数据和邮件日志都在后台能查", "工程下周开始要去做另一个项目了"],
        optionOrder: ["a2-triple", "a2-ignore", "a2-blame"],
        choices: [
          {
            id: "a2-ignore",
            title: "先内部修复，再统一复盘",
            text: "先停掉最严重的触发场景，周末完成根因确认和修复验证，周一拿着完整结论统一同步，避免半成品信息引发恐慌。",
            score: 48,
            stageEffect: "shortTerm: -2, longTerm: -4, trust: -3",
            consequence: "团队开始查根因，但正式同步被排到周一。周五下午，一封客户问询先到了 CEO 邮箱。CEO 把你、老周和 Tony 叫进会议室：「修复可以等结论，风险为什么也要等到周一我才知道？」",
            whyThisScore: "先查清再汇报能减少误判，但外部动作风险已经出现时，等待完整结论会让关键干系人失去处置窗口。更合适的是先同步已知事实与临时控制，再滚动补充根因。"
          },
          {
            id: "a2-triple",
            title: "冻结风险动作并主动同步",
            text: "停高风险发送和待发队列，保全日志并圈定影响范围；一小时内同步初步情况，再补去重与批量确认闸门。",
            score: 94,
            stageEffect: "shortTerm: -1, longTerm: +3, trust: +4",
            consequence: "CEO 看完初步通报只说：「以后第一时间同步。」老周帮你梳理客户风险措辞，Tony 带销售核对可能受影响的客户。风险范围当天被圈清，团队也把问题变成去重、实体校验和批量确认三条加固任务。",
            whyThisScore: "风险信号出现时，正确顺序是控制影响、保全事实、主动同步，再做系统加固。它不会让短期数据好看，却能避免技术问题升级为管理与信任问题。"
          },
          {
            id: "a2-blame",
            title: "按责任模块分别推进修复",
            text: "按模块推进：数据团队处理公司名，工程补幂等，销售加强复核；产品统一跟踪进度，等各方结论齐全后汇总汇报。",
            score: 42,
            stageEffect: "shortTerm: 0, longTerm: -5, trust: -5",
            consequence: "数据、工程和销售各自提交了修复进度，却没人先给出统一的客户影响范围。汇报会上三方围绕优先级争了二十分钟，CEO 最后问你：「谁在对整体结果负责？」你手里只有三张互不相连的任务表。",
            whyThisScore: "按模块推进没有错，问题是缺少统一的风险 owner、停损顺序和同步节奏。若产品只收集各方进度，事故会被拆成互不负责的任务，客户影响与管理责任反而没人收口。"
          }
        ]
      },
      {
        index: 2,
        actLabel: "第三幕 · 法务部办公室",
        timeMarker: "周五下午 16:00",
        stageTitle: "老周给你看了三页纸的合规要求",
        context:
          "经过第二幕的事故处理，项目活下来了。但周五下午，老周把一份三页纸的《AI Agent 对外动作合规规范》放在你桌上，说：「你下周要继续推，这 12 条必须满足。不满足，我就去跟 CEO 说这个项目下线。」\n\n你扫了一眼：完整审计日志（保留 180 天）、幂等机制（客户最多 24 小时内收到 1 封同类邮件）、发送前取消窗口（进入发送队列后 60 秒内可撤销）、人工确认强制停留（确认按钮要 5 秒后才能点，逼销售看一眼）、权限分级（新入职销售 2 周内只能发自己的客户，不能批量）……\n\nTony 得知后第一个跳起来：「5 秒确认？那批量发 100 封要我等 8 分钟？用户体验太差了！」",
        contextBranch: {
          "a2-triple": "你们当天圈清了风险范围，也主动完成了同步。周五下午，老周把三页《AI Agent 对外动作规范》放到桌上：「项目可以继续，但必须把这次靠人扛住的事变成系统能力。」\n\n要求包括 180 天审计日志、24 小时幂等、发送前 60 秒取消窗口、批量确认停留和最小权限。Tony 看完皱眉：「规则我认，但每批都等 5 秒，销售会弃用。」",
          "a2-ignore": "周一的完整报告最终查清了根因，但 CEO 对延迟同步很不满意。老周因此拿出一版更严格的《AI Agent 对外动作规范》：「信息来得晚，系统闸门就必须更硬。」\n\n180 天日志、24 小时幂等、发送前取消窗口、批量确认停留和最小权限都被列为上线条件。Tony 反驳：「全部一刀切，销售根本用不起来。」",
          "a2-blame": "各模块修复陆续完成，团队之间的信任却明显下降。老周把三页规范放到桌上：「既然责任靠会议分不清，就让系统留下日志、权限和确认记录。」\n\n他要求 180 天审计、幂等、发送前取消窗口、批量确认停留和最小权限。Tony 担心操作成本，工程只剩三天；你必须重新把分裂的要求收成一个可上线方案。"
        },
        question: "合规要求 vs 业务效率，你的最终设计方案是？",
        constraints: ["CEO 下周二要拍板这个项目的继续/停止", "工程可以抽 3 天做加固，之后就撤了", "Tony 明确说体验太差他会反对"],
        choices: [
          {
            id: "a3-zhou",
            title: "先满足完整合规清单",
            text: "十二条要求首期统一启用，批量与单封采用相同确认停留；先确保合规签字，再通过培训适应流程。",
            score: 58,
            stageEffect: "zhouOK: +2, tonyOK: -3, shipOK: -1",
            consequence: "合规全过了。但周二汇报时 Tony 真的反对了——他把屏幕共享开到了销售的操作录屏：「你们自己看，点 10 封邮件，被强制等 50 秒。这东西我团队不会用。」CEO 皱着眉说「再调调」，项目继续被压着一周。",
            whyThisScore: "全听法务的不出事，但业务也做不起来。法务的要求是「极端最坏情况下不要出事」，但业务的目标是「正常情况下跑得够快」。产品经理的价值不是「选一个部门的话照做」，而是找到两条曲线的交点——既不出大事，又能跑起来。"
          },
          {
            id: "a3-balance",
            title: "按风险分级落实合规",
            text: "日志、幂等、账号生命周期和最小权限作为红线；确认停留按批量规模与客户风险分级，低风险单封保持顺畅。",
            score: 95,
            stageEffect: "zhouOK: +2, tonyOK: +2, shipOK: +2",
            consequence: "你拉老周和 Tony 坐下来谈了一个小时。老周确认红线控制没有削弱，Tony 也接受 10 封以下不强制等待。周二汇报后，CEO 批准方案继续排期。",
            whyThisScore: "最小权限、账号生命周期、日志和幂等关系到底线，不能为了体验推迟；确认交互则可以按动作风险调整。把不可协商的控制与可优化的体验分开，才能同时拿到法务签字和业务采用。"
          },
          {
            id: "a3-tony",
            title: "优先保留效率体验",
            text: "首期完成日志、幂等和基础权限，批量发送保持快速确认；更细的客户风险校验与强停留放到下一迭代。",
            score: 46,
            stageEffect: "zhouOK: -4, tonyOK: +3, shipOK: +1",
            consequence: "Tony 认可操作效率，项目按时恢复。但两周后，一批面向高价值客户的折扣邮件被快速确认，金额字段没有触发二次校验。虽然日志完整、影响可追踪，老周仍要求暂停批量通道：被推迟的风险闸门，正好落在最昂贵的动作上。",
            whyThisScore: "基础控制让风险可追踪，却没有阻止高影响动作发生。真实使用数据适合优化阈值，不适合替代上线前的高风险闸门；对金额、批量和高价值客户，应先建立确认机制再校准体验。"
          }
        ]
      }
    ],
    rubric: ["动作风险分级", "权限最小化边界", "高风险人工确认", "180天审计日志", "幂等/撤回/异常恢复"]
  },
  {
    id: "hallucination-maze",
    level: "Level 3 · 三幕剧",
    xp: 170,
    title: "幻觉迷局：会议室沉默的那 10 秒",
    summary: "在高可信场景里处理来源、拒答和转人：模型说得像真的，不代表能直接给客户用。",
    genre: "职场伦理 · 信任与可信度",
    totalStages: 3,
    evaluationCriteria: [
      "1️⃣ 引用溯源：每个关键数字/结论是否有来源，翻原文能不能对上",
      "2️⃣ 置信度校准：不确定的话，AI 有没有说「不确定」，而不是硬编",
      "3️⃣ 拒答与转人链：超范围的、涉及具体投资建议的，有没有引导转专家",
      "4️⃣ 用户心智教育：产品有没有反复告诉用户「AI 是辅助不是结论」",
      "5️⃣ 审计与追溯：每条回答的模型版本/引用片段/时间戳能不能翻"
    ],
    criticCharacter: "营业部总经理陈姐 · 8 年理财顾问团队经验",
    criticQuestion: "顾问引用了没有来源的数字，随后被客户当场质疑。产品侧第一步应该控制什么？",
    scenarioPositiveSignals: [
      "引用", "来源", "出处", "页码", "原文", "报告", "数据来源", "追溯",
      "置信度", "不确定", "可能", "大概", "参考", "不夸大", "不肯定",
      "拒答", "不知道", "超出范围", "转人工", "后台", "分析师", "专家",
      "心智", "教育", "辅助", "参考不是结论", "提示风险",
      "日志", "审计", "模型版本", "Prompt版本", "时间戳", "合规"
    ],
    scenarioNegativeSignals: [
      "换更大模型", "加参数", "更长上下文", "模型更强就没问题",
      "底部加个免责声明就行", "不用引用", "不用标来源",
      "AI 说不知道不专业", "要显得很懂", "顾问自己会判断"
    ],
    stages: [
      {
        index: 0,
        actLabel: "第一幕 · 内测复盘会",
        timeMarker: "周一上午 10:30",
        stageTitle: "「AI 太好用了！我这周少查了 8 小时资料」",
        context:
          "面向理财顾问的 AI 问答助手内测了 3 周。内测复盘会上，三个顾问的反馈让团队喜出望外——\n\n「查基金历史数据真快，以前要翻三份报告，现在直接问就行」\n「写客户资产配置建议书省一半时间」\n「有一次我问它一个很偏的债券代码，它居然都答出来了，还挺专业的」\n\n产品、工程、算法三个人已经在心里算上线后的 DAU 了。\n\n但坐在会议桌最里面的营业部总经理陈姐一直没说话。等大家都说完了，她把 iPad 投到大屏上——是同一只基金的「AI 给出的收益率」和「Wind 终端里真实的收益率」两张截图：\n\nAI 说：近一年 6.84%\nWind 显示：近一年 4.82%\n\n「我今天早上 10 个顾问里随机抽了 3 个，3 个人都在用这个数字给客户做方案。」陈姐看着你，「你告诉我，如果我客户按 6.84% 做了预期，年底只拿到 4.82%，他会来找我还是来找你们产品部？」",
        question: "内测第一拍：AI 给出的数据和真实值有差，产品设计层面第一刀砍在哪？",
        constraints: ["三周后要给总行做上线汇报", "算法团队坚持「换更大的模型就好了」，下周就能测", "顾问们已经习惯直接用 AI 的数据了，改动太大他们会反弹"],
        optionOrder: ["h1-model", "h1-disclaimer", "h1-grounded"],
        choices: [
          {
            id: "h1-model",
            title: "升级模型降低事实误差",
            text: "先升级模型并拉长上下文，把完整报告纳入输入；用同一批基金问题复测误差，再决定是否开放。",
            score: 48,
            stageEffect: "engHappy: +2, chenTrust: -3, riskLevel: 5/5",
            consequence: "算法团队很开心你站他们。一周后新模型上线，同样的问题，数字变成了 5.73%——更接近了，但还是错的。而且陈姐发现：新模型说话的语气更肯定了，顾问反而更容易信。",
            whyThisScore: "换模型和复测可能降低部分错误，却不能保证消除幻觉，也不能替代产品防护。金融数字仍需要来源、拒答门槛和人工转接，否则更流畅的回答反而可能放大用户信任。"
          },
          {
            id: "h1-grounded",
            title: "增加引用与置信度提示",
            text: "数字没有原文引用就拒答；有引用时展示来源和更新时间，并用评测集校准后的高、中、低可信等级决定是否转人。",
            score: 93,
            stageEffect: "engHappy: -1, chenTrust: +3, riskLevel: 1/5",
            consequence: "算法有点不开心「加了这些会有更多问题答不上来」。但陈姐看完原型直接说：「这个东西我敢让我的人用。」上线后，覆盖率从 92% 降到 68%，每条回答都带来源和可信等级；顾问开始先看依据，再决定是否对客户引用。",
            whyThisScore: "高可信领域里，答不出来可以转人，答错却像真的才危险。来源让顾问能回到原文核验，经过评测校准的可信等级决定展示、警告或拒答；牺牲 24 个百分点覆盖率换来可验证的信任底线，是合理取舍。"
          },
          {
            id: "h1-disclaimer",
            title: "强化风险声明与使用规范",
            text: "保留当前回答能力，在关键数字旁展示醒目风险声明；顾问勾选「已核验」后才能复制到客户方案。",
            score: 42,
            stageEffect: "engHappy: +1, chenTrust: -2, riskLevel: 4/5",
            consequence: "法务认可新增确认记录，顾问也完成了培训。但抽查发现，不少人为了赶时间直接勾选「已核验」；错误数字仍然能够以醒目的形式出现。陈姐说：「你记录了谁点过按钮，却没有阻止错误答案到达他面前。」",
            whyThisScore: "声明和确认记录能改善责任追踪，却不能验证数字本身。用户会习惯性跳过提示；如果产品仍把无来源数字正常展示，核验动作很容易退化成打勾流程。"
          }
        ]
      },
      {
        index: 1,
        actLabel: "第二幕 · 客户会议室",
        timeMarker: "周三下午 14:40",
        stageTitle: "「你们的 AI，连自己不知道的事，都敢说知道。」",
        contextBranch: {
          "h1-model":
            "你选了换大模型。上线第二周，陈姐带一个最资深的顾问去见一个高净值客户——资产 1200 万，打算转过来做家族理财。\n\n聊到 40 分钟，客户问了一个很细的问题：「你们去年帮同类型客户做的医疗行业组合，平均的最大回撤是多少？」\n\n顾问当场打开 AI 查。AI 秒回：「平均最大回撤 7.2%，优于行业平均 11.6%」，语气非常肯定。顾问照念了。\n\n客户沉默了几秒，然后掏出自己的手机，翻出一份公开数据：「我怎么看到你们公开的组合数据是 10.1%？7.2% 这个数，你们内部的真实产品我没见过啊？」\n\n会议室安静了整整 10 秒。陈姐后来告诉你，那 10 秒是她 12 年职业生涯里最难熬的 10 秒。\n\n「这单黄了是小事。」陈姐跟你说，「但他圈子里有 30 多个同量级的客户，以后谁敢来？」",
          "h1-grounded":
            "你选了强制引用和校准可信等级。上线第二周，陈姐带顾问见一个 800 万高净值客户。客户问：「你们有配置过稀土行业的 QDII 产品吗？历史业绩怎么样？」\n\nAI 检索后显示：「低可信 · 未找到贵司产品库中的稀土 QDII 数据，建议转后台分析师。」并列出两条仅供市场背景参考的公开来源。\n\n顾问没有照念，直接告诉客户会请研究部整理专项报告。客户反而点头：「挺好的，不瞎编。」这单没有当场签成，但陈姐说：「至少我的人不会用一个漂亮数字换一次信任事故。」",
          "h1-disclaimer":
            "你选了免责声明。第二周还是出事了——一个新人顾问在给一对退休老夫妻做养老规划时，AI 给出了一个偏保守的养老目标基金预期收益率 5.2%，他直接按 5% 跟客户讲了（还留了 0.2% 的安全垫）。\n\n结果那只基金真实的长期收益是 3.8%。年底客户对账单来了，老夫妻找到营业部，老太太当场哭了：「我这 30 万是我跟老头子的棺材本啊，你们说的 5%，现在只有 3.8%，你们是不是骗子？」\n\n视频发到了内部大群，总行合规部的人当天就飞过来了。陈姐被点名批评，你写的事故报告改了 6 版。最后一句你写的是：「免责声明保护了公司，但保护不了客户，也保护不了一线的顾问。」"
        },
        question: "第二幕之后，最终的产品设计补全方案是？",
        constraints: ["总行合规要求两周内必须定稿", "还要再加一项：具体投资建议不能 AI 给，必须转人", "顾问需要有「快速转后台分析师」的通道"],
        optionOrder: ["h2-systematic", "h2-minimal", "h2-overcorrect"],
        choices: [
          {
            id: "h2-minimal",
            title: "扩充高风险案例规则库",
            text: "把本次事故和相似偏门领域沉淀成高风险案例库，持续扩充拒答规则，并用每周抽检补齐新出现的边界。",
            score: 52,
            stageEffect: "compliance: -2, team: -1, user: -2",
            consequence: "你改了稀土的 case，又加了 50 条类似的拒答词。合规说「太零散了，不成体系，我们过不了。」果然，一周后 AI 在另一个偏门领域又编了新的数字。治标不治本。",
            whyThisScore: "案例规则只能拦住已经见过的问题，无法覆盖新的领域和问法。合规需要看到可重复执行的来源、拒答、转人和审计机制，而不是不断扩充黑名单。"
          },
          {
            id: "h2-systematic",
            title: "补全可信交互闭环",
            text: "先补来源与校准可信等级，再接上拒答转分析师、使用提示、审计日志和一键反馈，形成可追溯闭环。",
            score: 96,
            stageEffect: "compliance: +3, team: +2, user: +3",
            consequence: "合规部门没有打回方案，只补充了两条日志要求。陈姐安排 2 名分析师承接第一批转人工队列，营业部也同意参与验证流程。",
            whyThisScore: "这套设计把高可信产品需要的四层机制连起来：引用和可信等级帮助核验，拒答与转人控制未知问题，使用提示校准用户预期，日志与反馈支持持续改进。任何一层缺失，剩余机制都会更容易被绕过。"
          },
          {
            id: "h2-overcorrect",
            title: "收缩到低风险能力范围",
            text: "首期只开放检索和文字总结，数字与具体建议统一转人工；等评测稳定后，再按领域逐步开放高价值能力。",
            score: 66,
            stageEffect: "compliance: +3, team: -3, user: -2",
            consequence: "合规 100% 过了。但一周后，顾问的使用率从每天人均 12 次掉到了 1 次。「不能查数字，我用它干嘛？我自己 Wind 查得比它快。」产品成了摆设。",
            whyThisScore: "收缩范围能快速控制风险，也适合作为短期过渡；问题是如果没有分领域评测和逐步重开计划，高价值能力会长期停摆。安全不是把产品做空，而是让能力按证据逐级开放。"
          }
        ]
      },
      {
        index: 2,
        type: "reflection",
        actLabel: "第三幕 · 终局复盘",
        timeMarker: "一个月后 · 营业部全员会",
        stageTitle: "一个月后，陈姐请你复盘这次产品选择",
        context:
          "经过两轮迭代，AI 助手稳定运行了一个月。总行合规通过了，营业部使用率稳定在人均每天 8-10 次，「转分析师」通道每周消化 40-50 个复杂问题。\n\n今天是月度全员会，陈姐最后一个上台。她没说业绩，没说 KPI，打开了一个 PPT——\n\n上面只有三行字：\n\n第一行：以前，我们查一个数字要 10 分钟；现在 10 秒。\n\n第二行：以前，我们不确定的时候会硬答；现在，AI 会说不知道，我们也敢说不知道。\n\n第三行：今天下午有个客户跟我说——「你们不会不懂装懂，这点我很认可。」\n\n她转向你：「产品同学，你这个东西最大的价值，不是省了多少时间。是让我的团队，终于敢在客户面前说实话了。」",
        contextBranch: {
          "h2-minimal": "一个月过去，高风险案例库已经加到 180 条，却仍不断出现新边界。总行合规没有批准对客全面开放，产品只保留内部试用。\n\n复盘会上，陈姐说：「团队确实更警觉了，但我们一直在追昨天的错误。你需要告诉大家，下次遇到高可信场景，怎样从补案例升级成建机制。」",
          "h2-systematic": "一个月后，总行合规通过了方案，营业部使用率稳定在人均每天 8-10 次，转分析师通道每周处理 40-50 个复杂问题。\n\n陈姐在全员会上说：「以前不确定时我们会硬答；现在 AI 会说不知道，我们也敢说不知道。它最大的价值，是让团队在客户面前更诚实。」她请你把这次做对的机制总结出来。",
          "h2-overcorrect": "一个月后，产品没有再发生数字误导，顾问使用率却从每天 12 次降到 1 次。陈姐没有要求恢复全部能力，而是请团队列出最常见、最有依据的三类数字问题。\n\n「安全不是终点，没人用也不是答案。」她说，「你要复盘的是：怎样用评测证据逐步重开，而不是在全能和全禁之间来回摆。」"
        },
        question: "用一句话总结：下一次遇到高可信场景，你会用什么条件决定回答、拒答或转人？",
        constraints: ["写一条下次可以直接使用的判断条件即可。"],
        choices: [
          {
            id: "h3-final",
            title: "写下判断条件",
            text: "回看两次决定，并写下你以后会沿用的判断条件。",
            isFinal: true
          }
        ]
      }
    ],
    rubric: ["引用溯源机制", "置信度语气校准", "拒答转人链路", "用户心智教育", "审计追溯闭环"]
  }
];

const stackItems = [
  {
    key: "model-boundary",
    title: "模型与能力边界",
    text: "理解通用模型、专用模型、多模态、上下文长度、工具调用的差异。",
    learn: ["会问：这个任务需要推理、检索还是结构化抽取？", "会判断：质量、速度、成本哪个最敏感？"]
  },
  {
    key: "prompt-design",
    title: "Prompt 与任务设计",
    text: "把模糊需求变成可评测的输入输出合同，而不只是写漂亮提示词。",
    learn: ["定义角色、约束、样例、拒答条件", "把提示词版本纳入实验管理"]
  },
  {
    key: "rag",
    title: "RAG 与知识库",
    text: "知道切分、召回、重排、引用、更新频率如何影响答案可信度。",
    learn: ["设计可追溯答案", "区分知识缺失和模型幻觉"]
  },
  {
    key: "evals",
    title: "Evals 评测体系",
    text: "用黄金集、线上反馈和人工复核决定是否能上线，而不是凭 demo 感觉。",
    learn: ["准确率、召回率、引用正确率", "红队测试和回归测试"]
  },
  {
    key: "agent-tools",
    title: "Agent 与工具调用",
    text: "把 AI 动作分成建议、草稿、确认、自动执行，明确权限和回滚。",
    learn: ["动作风险分级", "审计日志、重试、超时和幂等"]
  },
  {
    key: "data-safety",
    title: "数据、隐私与安全",
    text: "理解训练数据、用户数据、日志、脱敏、权限、合规边界。",
    learn: ["最小化采集", "敏感信息过滤和访问控制"]
  },
  {
    key: "cost-latency",
    title: "成本与延迟",
    text: "能和工程一起讨论缓存、模型路由、限额、流式输出和容量预估。",
    learn: ["单位经济模型", "按任务难度选择模型"]
  },
  {
    key: "operations",
    title: "上线与运营闭环",
    text: "把 AI 功能做成可监控、可回滚、可迭代的系统。",
    learn: ["灰度、监控、告警", "用户反馈到数据飞轮"]
  },
  {
    key: "im-collaboration",
    title: "IM 协作场景",
    text: "把问题、方案和复盘推到团队群，让产品判断从个人作业变成团队讨论。",
    learn: ["群机器人 webhook", "消息模板、@ 人、审批确认"]
  }
];

const scenarioStackMap = {
  "rag-mystery": ["model-boundary", "rag", "evals", "operations"],
  "agent-storm": ["model-boundary", "agent-tools", "data-safety", "operations"],
  "hallucination-maze": ["model-boundary", "rag", "evals", "data-safety"]
};

const savedJourney = loadJson("ai-pm-sandbox-journey", {});
const rawSavedProgress = loadJson("ai-pm-sandbox-progress", {});
const savedProgress = normalizeSavedProgress(rawSavedProgress);
const legacySavedProgress = Object.fromEntries(
  Object.entries(rawSavedProgress || {}).filter(([scenarioId]) => !savedProgress[scenarioId])
);
const legacyProgressCount = Object.keys(legacySavedProgress).length;
const previousLegacyProgress = loadJson("ai-pm-sandbox-progress-legacy", {});
const preservedLegacyProgress = { ...previousLegacyProgress, ...legacySavedProgress };
if (legacyProgressCount) saveJson("ai-pm-sandbox-progress-legacy", preservedLegacyProgress);

const state = {
  selectedScenarioId: scenarios.some((scenario) => scenario.id === savedJourney.selectedScenarioId)
    ? savedJourney.selectedScenarioId
    : scenarios[0].id,
  selectedChoiceId: null,
  currentStageIndex: savedJourney.currentStageIndex || 0,
  stageChoices: savedJourney.stageChoices || {},
  stageAnswers: savedJourney.stageAnswers || {},
  stageHistory: savedJourney.stageHistory || [],
  scenarioSessions: savedJourney.scenarioSessions || {},
  currentStageConsequenceShown: Boolean(savedJourney.currentStageConsequenceShown),
  selectedStackKey: null,
  replayScenarioId: savedJourney.replayScenarioId || null,
  draftAnswers: {},
  progress: savedProgress,
  legacyProgress: preservedLegacyProgress,
  config: loadJson("ai-pm-sandbox-config", {}),
  theme: loadJson("ai-pm-sandbox-theme", "light")
};

const els = {};

function initEls() {
  const ids = [
    "viewTitle", "missionList", "missionLevel", "missionTitle",
    "stageIndicator", "stageActLabel", "stageTimeMarker", "stageTitle",
    "prevStageSummary", "missionContext", "missionQuestion", "missionStatus",
    "constraints", "answerArea", "answerLabel", "answerHelper", "answerInput", "answerCount", "selectionStatus",
    "coachButtons", "choiceGrid", "confirmChoiceButton", "consequenceBox", "nextStageButton",
    "scorePanel", "scoreHeadline", "scoreValue",
    "scoreBreakdown", "feedbackText", "xpLabel", "xpBar", "xpProgress", "rankLabel", "rankHint",
    "stackGrid", "stackScenarioTitle", "stackScenarioContext", "backToMissionButton",
    "scenarioStackLink", "portfolioList", "dispatchForm", "senderName", "channelSelect",
    "webhookFields", "dispatchNote", "includeRubric", "rememberConfig",
    "previewDialog", "previewContent", "toast", "themeToggle", "helpButton",
    "helpDialog", "closeHelpButton", "closePreviewButton", "resetButton",
    "scoreButton", "shareCardButton",
    "shareScoreCardButton", "viewPortfolioButton", "replayScenarioButton", "dryRunButton", "prevMission", "nextMission",
    "exportMdButton", "exportHtmlButton", "shareDialog", "shareDialogTitle",
    "shareCardContainer", "closeShareButton", "downloadShareCard", "copyShareImage",
    "demoMode", "voiceButton", "projectBrief",
    "scenarioGenre", "scenarioMeta"
  ];
  ids.forEach((id) => {
    els[id] = document.getElementById(id);
  });
}

function loadJson(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key)) || fallback;
  } catch {
    return fallback;
  }
}

function saveJson(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function normalizeSavedProgress(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};
  return Object.fromEntries(Object.entries(value).filter(([scenarioId, item]) => {
    const scenario = scenarios.find((candidate) => candidate.id === scenarioId);
    if (!scenario || !item || typeof item !== "object") return false;
    const score = Number(item.score ?? item.review?.score);
    if (!Number.isFinite(score) || !item.review || typeof item.review !== "object") return false;
    if (!isStoryScenario(scenario)) return true;
    const stageChoices = item.stageChoices;
    const history = item.stageHistory;
    if (!stageChoices || typeof stageChoices !== "object" || !Array.isArray(history)) return false;
    return scenario.stages
      .filter((stage) => !stage.choices?.every((choice) => choice.isFinal))
      .every((stage) => stage.choices.some((choice) => stageChoices[getStageStateKey(scenarioId, stage.index)] === choice.id));
  }));
}

function persistJourneyState() {
  saveJson("ai-pm-sandbox-journey", {
    selectedScenarioId: state.selectedScenarioId,
    currentStageIndex: state.currentStageIndex,
    stageChoices: state.stageChoices,
    stageAnswers: state.stageAnswers,
    stageHistory: state.stageHistory,
    scenarioSessions: state.scenarioSessions,
    currentStageConsequenceShown: state.currentStageConsequenceShown,
    replayScenarioId: state.replayScenarioId
  });
}

function applyTheme(theme) {
  const isDark = theme === "dark";
  document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light");
  if (els.themeToggle) {
    els.themeToggle.textContent = isDark ? "☀️" : "🌙";
    els.themeToggle.title = isDark ? "切换到浅色模式 (D)" : "切换到深色模式 (D)";
  }
}

function toggleTheme() {
  state.theme = state.theme === "dark" ? "light" : "dark";
  saveJson("ai-pm-sandbox-theme", state.theme);
  applyTheme(state.theme);
  showToast(state.theme === "dark" ? "🌙 已切换到深色模式" : "☀️ 已切换到浅色模式");
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function summarizeForShare(value, maxLength = 96) {
  const text = String(value || "").replace(/\s+/g, " ").trim();
  if (text.length <= maxLength) return text;
  const clipped = text.slice(0, maxLength);
  const sentenceEnd = Math.max(
    clipped.lastIndexOf("。"),
    clipped.lastIndexOf("！"),
    clipped.lastIndexOf("？"),
    clipped.lastIndexOf("；")
  );
  if (sentenceEnd >= Math.floor(maxLength * 0.58)) {
    return clipped.slice(0, sentenceEnd + 1);
  }
  return `${clipped.replace(/[，、：；\s]+$/u, "")}…`;
}

function summarizeOutcomeForShare(value, maxLength = 136) {
  const text = String(value || "").replace(/\s+/g, " ").trim();
  if (text.length <= maxLength) return text;
  const sentences = text.match(/[^。！？]+[。！？]?/gu)?.map((item) => item.trim()).filter(Boolean) || [];
  if (sentences.length >= 2) {
    const firstAndLast = `${sentences[0]} … ${sentences[sentences.length - 1]}`;
    if (firstAndLast.length <= maxLength) return firstAndLast;
    const last = sentences[sentences.length - 1];
    if (last.length <= maxLength) return last;
  }
  return summarizeForShare(text, maxLength);
}

function saveProgress() {
  saveJson("ai-pm-sandbox-progress", state.progress);
}

function getScenario() {
  return scenarios.find((scenario) => scenario.id === state.selectedScenarioId) || scenarios[0];
}

function getScenarioIndex() {
  return scenarios.findIndex((s) => s.id === state.selectedScenarioId);
}

function getStageStateKey(scenarioId, stageIndex) {
  return `${scenarioId}-s${stageIndex}`;
}

function saveCurrentScenarioSession() {
  const scenario = getScenario();
  if (!scenario || state.progress[scenario.id] && state.replayScenarioId !== scenario.id) return;
  state.scenarioSessions[scenario.id] = {
    stageIndex: state.currentStageIndex,
    stageHistory: state.stageHistory.map((item) => ({ ...item })),
    consequenceShown: state.currentStageConsequenceShown,
    isReplay: state.replayScenarioId === scenario.id
  };
  persistJourneyState();
}

function clearScenarioState(scenarioId, { clearAnswers = false } = {}) {
  Object.keys(state.stageChoices).forEach((key) => {
    if (key.startsWith(`${scenarioId}-s`)) delete state.stageChoices[key];
  });
  if (clearAnswers) {
    Object.keys(state.stageAnswers).forEach((key) => {
      if (key.startsWith(`${scenarioId}-s`)) delete state.stageAnswers[key];
    });
    delete state.draftAnswers[scenarioId];
  }
  delete state.scenarioSessions[scenarioId];
}

function restoreCompletedScenarioState(scenario, completed) {
  clearScenarioState(scenario.id, { clearAnswers: true });
  Object.assign(state.stageChoices, completed.stageChoices || {});
  Object.assign(state.stageAnswers, completed.stageAnswers || {});
  state.stageHistory = (completed.stageHistory || []).map((item) => ({ ...item }));
  state.currentStageIndex = Math.max(0, scenario.stages.length - 1);
  const lastStage = scenario.stages[state.currentStageIndex];
  const lastChoiceId = completed.stageChoices?.[getStageStateKey(scenario.id, state.currentStageIndex)];
  const lastChoice = lastStage?.choices?.find((choice) => choice.id === lastChoiceId);
  const isReflectionEnding = lastStage?.choices?.every((choice) => choice.isFinal);
  state.currentStageConsequenceShown = Boolean(lastChoice?.consequence && !isReflectionEnding);
  if (completed.schemaVersion !== 2) {
    const savedReasoning = completed.reasoning || Object.values(completed.stageAnswers || {}).filter(Boolean).join("\n\n");
    const refreshedCopy = scoreText(savedReasoning, scenario);
    completed.review = {
      ...refreshedCopy,
      score: completed.score,
      dimensions: completed.review?.dimensions || refreshedCopy.dimensions
    };
    completed.schemaVersion = 2;
    saveProgress();
  }
}

function centerCurrentPathNode() {
  if (!window.matchMedia("(max-width: 760px)").matches || !els.missionList) return;
  const currentNode = els.missionList.querySelector('.path-node[aria-current="step"]');
  if (!currentNode) return;
  const listRect = els.missionList.getBoundingClientRect();
  const nodeRect = currentNode.getBoundingClientRect();
  const centeredLeft = els.missionList.scrollLeft + nodeRect.left - listRect.left - (listRect.width - nodeRect.width) / 2;
  els.missionList.scrollTo({ left: Math.max(0, centeredLeft), behavior: "smooth" });
}

function enterScenario(scenarioId, { replay = false } = {}) {
  saveCurrentScenarioSession();
  state.selectedScenarioId = scenarioId;
  state.selectedStackKey = null;
  const scenario = getScenario();
  const completed = state.progress[scenarioId];

  if (replay) {
    clearScenarioState(scenarioId, { clearAnswers: true });
    state.replayScenarioId = scenarioId;
    state.currentStageIndex = 0;
    state.stageHistory = [];
    state.currentStageConsequenceShown = false;
  } else if (state.scenarioSessions[scenarioId]?.isReplay) {
    const session = state.scenarioSessions[scenarioId];
    state.replayScenarioId = scenarioId;
    state.currentStageIndex = session.stageIndex || 0;
    state.stageHistory = (session.stageHistory || []).map((item) => ({ ...item }));
    state.currentStageConsequenceShown = Boolean(session.consequenceShown);
  } else if (completed && isStoryScenario(scenario)) {
    state.replayScenarioId = null;
    restoreCompletedScenarioState(scenario, completed);
  } else {
    state.replayScenarioId = null;
    const session = state.scenarioSessions[scenarioId];
    state.currentStageIndex = session?.stageIndex || 0;
    state.stageHistory = (session?.stageHistory || []).map((item) => ({ ...item }));
    state.currentStageConsequenceShown = Boolean(session?.consequenceShown);
  }

  renderScenario();
  persistJourneyState();
  requestAnimationFrame(centerCurrentPathNode);
}

function gotoScenario(delta) {
  const idx = getScenarioIndex();
  const nextIdx = (idx + delta + scenarios.length) % scenarios.length;
  enterScenario(scenarios[nextIdx].id);
  showToast(`${delta > 0 ? "下一关" : "上一关"}：${scenarios[nextIdx].title}`);
}

function getCompleted() {
  return Object.values(state.progress).filter(Boolean);
}

function getPortfolioRecords() {
  const current = getCompleted();
  const legacy = Object.entries(state.legacyProgress || {})
    .filter(([scenarioId]) => !state.progress[scenarioId])
    .map(([scenarioId, item]) => ({
      ...item,
      scenarioId: item?.scenarioId || scenarioId,
      isLegacy: true
    }));
  return [...current, ...legacy];
}

function getXp() {
  return getPortfolioRecords().reduce((sum, item) => sum + (item.xp || 0), 0);
}

function showToast(message) {
  els.toast.textContent = message;
  els.toast.classList.add("is-visible");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => els.toast.classList.remove("is-visible"), 3200);
}

function updateAnswerCount() {
  const length = els.answerInput.value.trim().length;
  els.answerCount.textContent = length === 0 ? "0 字 · 文字可选" : `已写 ${length} 字 · 文字可选`;
  els.answerCount.classList.toggle("is-ready", length > 0);
}

function isStoryScenario(scenario = getScenario()) {
  return Array.isArray(scenario.stages) && scenario.stages.length > 0;
}

function getCurrentStage(scenario = getScenario()) {
  if (!isStoryScenario(scenario)) return null;
  return scenario.stages[Math.min(state.currentStageIndex, scenario.stages.length - 1)] || null;
}

function getTotalStages(scenario = getScenario()) {
  return scenario.totalStages || (scenario.stages ? scenario.stages.length : 1);
}

function getSelectedChoiceForStage(stage) {
  if (!stage) return null;
  const cid = state.stageChoices[`${state.selectedScenarioId}-s${stage.index}`];
  return stage.choices.find((c) => c.id === cid) || null;
}

function getVisibleStageChoices(stage) {
  if (!stage?.optionOrder?.length) return stage?.choices || [];
  const byId = new Map(stage.choices.map((choice) => [choice.id, choice]));
  return stage.optionOrder.map((id) => byId.get(id)).filter(Boolean);
}

function getSelectedChoice(scenario = getScenario()) {
  if (!scenario) return null;
  if (isStoryScenario(scenario)) {
    return getSelectedChoiceForStage(getCurrentStage(scenario));
  }
  const c = scenario.choices && scenario.choices.find((item) => item.id === state.selectedChoiceId);
  return c || (scenario.choices && scenario.choices[0]);
}

function getContextForStage(scenario, stage) {
  if (!stage) return scenario.context || "";
  if (stage.contextBranch && stage.index > 0) {
    const prevStage = scenario.stages[stage.index - 1];
    const prevChoiceId = state.stageChoices[`${scenario.id}-s${prevStage.index}`];
    if (prevChoiceId && stage.contextBranch[prevChoiceId]) {
      return stage.contextBranch[prevChoiceId];
    }
  }
  return stage.context || scenario.context || "";
}

function getCoachPrompts(scenario) {
  const stage = getCurrentStage(scenario);
  const choice = stage ? getSelectedChoiceForStage(stage) : getSelectedChoice(scenario);
  const choiceTitle = choice ? choice.title : "当前方案";
  return [
    {
      label: "说明主要取舍",
      text: `我选择「${choiceTitle}」，主要因为____；我愿意接受的代价是____。`
    },
    {
      label: "写调整条件",
      text: "如果出现____，我会暂停或调整当前方案。"
    },
    {
      label: "写验证办法",
      text: "我会根据____判断这个方案是否有效。"
    },
    {
      label: "写责任分工",
      text: "____负责执行，____负责复核，最终由____确认。"
    }
  ];
}

function insertAnswerText(text) {
  const current = els.answerInput.value.trim();
  els.answerInput.value = current ? `${current}\n${text}` : text;
  els.answerInput.focus();
  saveCurrentAnswerDraft();
  persistJourneyState();
  updateAnswerCount();
}

function saveCurrentAnswerDraft() {
  const scenario = getScenario();
  if (isStoryScenario(scenario)) {
    const stage = getCurrentStage(scenario);
    if (stage) state.stageAnswers[getStageStateKey(scenario.id, stage.index)] = els.answerInput.value;
  } else {
    state.draftAnswers[scenario.id] = els.answerInput.value;
  }
}

function renderProgress() {
  const xp = getXp();
  const level = Math.max(1, Math.floor(xp / 220) + 1);
  const pct = Math.min(100, Math.round(((xp % 220) / 220) * 100));
  els.xpLabel.textContent = `${xp} XP`;
  els.rankLabel.textContent = `Level ${level}`;
  els.xpBar.style.width = `${pct}%`;
  els.xpProgress?.setAttribute("aria-valuenow", String(xp % 220));
  els.rankHint.textContent = getPortfolioRecords().some((item) => item.isLegacy)
    ? "旧版成绩已保留在作品集；重新挑战后会生成新的决策路径。"
    : getCompleted().length === scenarios.length
      ? "3 个关卡已完成，可以在作品集中回看全部路径。"
      : "完成关卡后会增加 XP，并点亮相关技术模块。";
}

function renderMissionList() {
  els.missionList.innerHTML = `
    <div class="learning-path" aria-label="AI PM 能力成长路径">
      <div class="path-intro">
        <span>能力地图</span>
        <strong>${getCompleted().length} / ${scenarios.length} 个单元完成</strong>
      </div>
      ${scenarios.map((scenario, unitIndex) => {
      const done = state.progress[scenario.id];
      const isSelected = scenario.id === state.selectedScenarioId;
      const selected = isSelected ? " is-selected" : "";
      const stackKeys = (scenarioStackMap[scenario.id] || []).slice(0, 2);
      const side = unitIndex % 2 === 0 ? " is-left" : " is-right";
      return `
        <section class="path-unit">
          <div class="path-unit-label">单元 ${unitIndex + 1}</div>
          <button class="path-node mission-node${selected}${done ? " is-complete" : ""}${side}" data-scenario-id="${scenario.id}"${isSelected ? ' aria-current="step"' : ""}>
            <span class="path-node-icon">${done ? "✓" : unitIndex + 1}</span>
            <span class="path-node-copy">
              <strong>${escapeHtml(scenario.title)}</strong>
              <small>${done ? `已完成 · ${escapeHtml(done.score)} 分` : `${scenario.totalStages || 1} 幕 · ${scenario.xp} XP`}</small>
            </span>
          </button>
          <div class="path-skill-row">
            ${stackKeys.map((key, skillIndex) => {
              const item = stackItems.find((candidate) => candidate.key === key);
              if (!item) return "";
              return `<button class="path-skill${skillIndex % 2 ? " is-right" : " is-left"}${done ? " is-complete" : ""}" type="button" data-path-stack-key="${key}" data-path-scenario-id="${scenario.id}" aria-label="查看「${escapeHtml(scenario.title)}」关联能力：${escapeHtml(item.title)}">
                <span aria-hidden="true">◆</span>${escapeHtml(item.title)}
              </button>`;
            }).join("")}
          </div>
        </section>
      `;
    }).join("")}
    </div>`;
}

function renderScenario() {
  const scenario = getScenario();
  const savedCompletion = state.progress[scenario.id];
  const completed = state.replayScenarioId === scenario.id ? null : savedCompletion;
  const isStory = isStoryScenario(scenario);

  els.missionLevel.textContent = scenario.level;
  els.missionTitle.textContent = scenario.title;
  els.missionStatus.textContent = completed
    ? `已完成 ${completed.score}`
    : state.replayScenarioId === scenario.id
      ? "重新挑战中"
      : "待挑战";

  if (els.scenarioGenre) {
    els.scenarioGenre.textContent = scenario.genre ? scenario.genre : "经典决策题";
  }
  if (els.scenarioMeta) {
    els.scenarioMeta.textContent = isStory
      ? `${getTotalStages(scenario)} 幕剧情 · ${scenario.xp} XP`
      : `经典模式 · ${scenario.xp} XP`;
  }

  if (isStory) {
    renderStoryStage(scenario, completed);
  } else {
    renderClassicScenario(scenario, completed);
  }

  renderMissionList();
}

function renderStoryStage(scenario, completed) {
  const stage = getCurrentStage(scenario);
  if (!stage) return;

  const total = getTotalStages(scenario);
  const choice = getSelectedChoiceForStage(stage);
  const isLastStage = stage.index >= scenario.stages.length - 1;
  const isFinalChoice = choice && choice.isFinal;
  const isReflectionStage = isLastStage && stage.choices.length === 1 && stage.choices[0].isFinal;

  if (isReflectionStage && !choice) {
    state.stageChoices[getStageStateKey(scenario.id, stage.index)] = stage.choices[0].id;
  }
  const activeChoice = getSelectedChoiceForStage(stage);
  const consequenceShown = Boolean(state.currentStageConsequenceShown && activeChoice);
  const stageKey = getStageStateKey(scenario.id, stage.index);
  const isLocked = Boolean(consequenceShown || completed);

  if (els.stageIndicator) {
    const dots = Array.from({ length: total }, (_, i) => {
      const status = completed || i < state.currentStageIndex ? "done" : i === state.currentStageIndex ? "active" : "todo";
      return `<span class="stage-dot is-${status}"></span>`;
    }).join("");
    els.stageIndicator.innerHTML = `${dots}<span class="stage-text">第 ${stage.index + 1} / ${total} 幕</span>`;
  }
  if (els.stageActLabel) els.stageActLabel.textContent = stage.actLabel || "";
  if (els.stageTimeMarker) els.stageTimeMarker.textContent = stage.timeMarker || "";
  if (els.stageTitle) els.stageTitle.textContent = stage.stageTitle || scenario.title;
  if (els.stageTitle) els.stageTitle.setAttribute("tabindex", "-1");

  if (els.prevStageSummary) {
    const previousDecision = [...state.stageHistory].reverse().find((item) => item.stageIndex < stage.index);
    if (previousDecision?.choiceTitle) {
      els.prevStageSummary.hidden = false;
      els.prevStageSummary.textContent = `上一幕决定：${previousDecision.choiceTitle}`;
    } else {
      els.prevStageSummary.hidden = true;
    }
  }

  const contextText = getContextForStage(scenario, stage);
  els.missionContext.textContent = contextText;
  els.missionQuestion.textContent = stage.question || scenario.question;
  els.constraints.innerHTML = (stage.constraints || scenario.constraints || [])
    .map((item) => `<span class="constraint">${escapeHtml(item)}</span>`).join("");

  const currentAnswer = completed && isReflectionStage
    ? completed.finalAnswer ?? completed.answer ?? ""
    : state.stageAnswers[stageKey] ?? "";
  els.answerArea.hidden = !activeChoice && !isReflectionStage;
  els.answerLabel.textContent = isReflectionStage ? "写下以后会沿用的判断条件" : "补充你的判断";
  els.answerHelper.textContent = completed
    ? "这是你上次提交的复盘；重新挑战本关后可以修改。"
    : isReflectionStage
      ? "可选；不填写也会按前面真实选择评分，填写后会额外分析你的表达。"
      : "想说明取舍或风险时再写；不填写也能继续。";
  els.answerInput.value = currentAnswer;
  els.answerInput.disabled = isLocked;
  els.voiceButton.disabled = isLocked;
  updateAnswerCount();
  els.coachButtons.innerHTML = getCoachPrompts(scenario)
    .map(
      (prompt, index) => `
        <button class="coach-button" type="button" data-coach-index="${index}"${isLocked ? " disabled" : ""}>
          ${escapeHtml(prompt.label)}
        </button>
      `
    )
    .join("");

  els.choiceGrid.hidden = isReflectionStage;
  const visibleChoices = getVisibleStageChoices(stage);
  els.choiceGrid.innerHTML = visibleChoices
    .map((c, idx) => {
      const selected = activeChoice && c.id === activeChoice.id ? " is-selected" : "";
      const letter = String.fromCharCode(65 + idx);
      return `
        <button class="choice-card${selected}" data-choice-id="${c.id}" data-choice-index="${idx}" data-stage-index="${stage.index}" aria-pressed="${Boolean(selected)}"${isLocked ? " disabled" : ""}>
          <div class="choice-number">${letter}</div>
          <strong>${escapeHtml(c.title)}</strong>
          <span>${escapeHtml(c.text)}</span>
        </button>
      `;
    })
    .join("");

  if (els.selectionStatus) {
    els.selectionStatus.hidden = !activeChoice && !isReflectionStage;
    els.selectionStatus.classList.toggle("is-confirmed", consequenceShown || Boolean(completed));
    els.selectionStatus.textContent = isReflectionStage
      ? completed
        ? "本关已完成 · 下方是你上次提交的复盘与评分"
        : "终局复盘 · 可以直接查看评分，也可以先写一句判断条件"
      : consequenceShown || completed
        ? `决定已确认：${activeChoice?.title || ""}`
        : `已暂选：${activeChoice?.title || ""} · 确认前还可以改选`;
  }

  if (els.consequenceBox) {
    if (consequenceShown && activeChoice && activeChoice.consequence) {
      els.consequenceBox.hidden = false;
      els.consequenceBox.innerHTML = `
        <div class="consequence-head">📜 剧情分支结果</div>
        <div class="consequence-body">${escapeHtml(activeChoice.consequence)}</div>
      `;
    } else {
      els.consequenceBox.hidden = true;
      els.consequenceBox.innerHTML = "";
    }
  }

  if (els.nextStageButton) {
    if (consequenceShown && !isLastStage) {
      const nextStage = scenario.stages[stage.index + 1];
      const nextLabel = nextStage?.stageTitle || nextStage?.actLabel || `第 ${stage.index + 2} 幕`;
      els.nextStageButton.hidden = false;
      els.nextStageButton.textContent = `进入下一幕 → ${nextLabel}`;
    } else {
      els.nextStageButton.hidden = true;
    }
  }

  if (els.confirmChoiceButton) {
    const choiceIndex = activeChoice ? visibleChoices.findIndex((item) => item.id === activeChoice.id) : -1;
    els.confirmChoiceButton.hidden = isReflectionStage || !activeChoice || consequenceShown || Boolean(completed);
    els.confirmChoiceButton.textContent = choiceIndex >= 0
      ? `确认选择 ${String.fromCharCode(65 + choiceIndex)} · 看剧情结果`
      : "确认这个决定";
  }

  const showScoreButton = !completed && (isReflectionStage || ((isLastStage || isFinalChoice) && consequenceShown));
  if (els.scoreButton) {
    els.scoreButton.hidden = !showScoreButton;
  }
  if (els.shareCardButton) {
    els.shareCardButton.hidden = Boolean(completed) || !consequenceShown || showScoreButton;
  }

  if (completed) {
    showScore(completed.review, false);
  } else {
    els.scorePanel.hidden = true;
  }
}

function renderClassicScenario(scenario, completed) {
  const hasSelectedChoice = scenario.choices.some((choice) => choice.id === state.selectedChoiceId);
  state.selectedChoiceId = completed?.choiceId || (hasSelectedChoice ? state.selectedChoiceId : scenario.choices[1].id);

  if (els.stageIndicator) els.stageIndicator.innerHTML = `<span class="stage-text">经典单场景模式</span>`;
  if (els.stageActLabel) els.stageActLabel.textContent = "";
  if (els.stageTimeMarker) els.stageTimeMarker.textContent = "";
  if (els.stageTitle) els.stageTitle.textContent = scenario.title;
  if (els.prevStageSummary) els.prevStageSummary.hidden = true;
  if (els.consequenceBox) els.consequenceBox.hidden = true;
  if (els.nextStageButton) els.nextStageButton.hidden = true;
  if (els.confirmChoiceButton) els.confirmChoiceButton.hidden = true;
  els.choiceGrid.hidden = false;
  els.answerArea.hidden = false;
  els.selectionStatus.hidden = true;
  els.answerLabel.textContent = "补充你的判断";
  els.answerHelper.textContent = completed ? "这是你上次提交的判断；重新挑战后可以修改。" : "可选；不填写也会按方案选择评分。";
  els.answerInput.disabled = Boolean(completed);
  els.voiceButton.disabled = Boolean(completed);

  els.missionContext.textContent = scenario.context;
  els.missionQuestion.textContent = scenario.question;
  els.answerInput.value = completed?.answer ?? state.draftAnswers[scenario.id] ?? "";
  updateAnswerCount();
  els.constraints.innerHTML = scenario.constraints.map((item) => `<span class="constraint">${escapeHtml(item)}</span>`).join("");
  els.coachButtons.innerHTML = getCoachPrompts(scenario)
    .map(
      (prompt, index) => `
        <button class="coach-button" type="button" data-coach-index="${index}">
          ${escapeHtml(prompt.label)}
        </button>
      `
    )
    .join("");
  els.choiceGrid.innerHTML = scenario.choices
    .map((choice, idx) => {
      const selected = choice.id === state.selectedChoiceId ? " is-selected" : "";
      return `
        <button class="choice-card${selected}" data-choice-id="${choice.id}" data-choice-index="${idx}">
          <div class="choice-number">${idx + 1}</div>
          <strong>${escapeHtml(choice.title)}</strong>
          <span>${escapeHtml(choice.text)}</span>
        </button>
      `;
    })
    .join("");

  if (els.scoreButton) els.scoreButton.hidden = false;
  if (els.shareCardButton) els.shareCardButton.hidden = false;

  if (completed) {
    showScore(completed.review, false);
  } else {
    els.scorePanel.hidden = true;
  }
}

function goToNextStage() {
  const scenario = getScenario();
  if (!isStoryScenario(scenario)) return;
  const stage = getCurrentStage(scenario);
  const choice = getSelectedChoiceForStage(stage);
  if (!stage || !choice) return;

  const isLast = stage.index >= scenario.stages.length - 1;
  if (isLast || choice.isFinal) {
    state.currentStageConsequenceShown = false;
    showToast("已进入终局复盘。文字可选，提交后查看评分。");
    return;
  }

  state.currentStageIndex = Math.min(scenario.stages.length - 1, state.currentStageIndex + 1);
  state.currentStageConsequenceShown = false;
  saveCurrentScenarioSession();
  persistJourneyState();
  renderScenario();
  requestAnimationFrame(() => {
    els.stageTitle?.scrollIntoView({ behavior: "smooth", block: "start" });
    els.stageTitle?.focus({ preventScroll: true });
  });
  showToast(scenario.stages[state.currentStageIndex].actLabel);
}

function handleStageChoiceSelect(stageIndex, choiceId) {
  const scenario = getScenario();
  if (state.progress[scenario.id] && state.replayScenarioId !== scenario.id) return;
  if (state.currentStageConsequenceShown) {
    showToast("决定已经确认，进入下一幕后继续作答");
    return;
  }
  const stage = scenario.stages[stageIndex];
  if (!stage) return;
  const choice = stage.choices.find((c) => c.id === choiceId);
  if (!choice) return;

  state.stageChoices[`${scenario.id}-s${stageIndex}`] = choiceId;
  state.currentStageConsequenceShown = false;

  state.stageHistory = state.stageHistory.filter((h) => h.stageIndex !== stageIndex);

  saveCurrentScenarioSession();
  persistJourneyState();
  renderScenario();
  requestAnimationFrame(() => document.querySelector(`.choice-card[data-choice-id="${choiceId}"]`)?.focus());
}

function confirmStageChoice() {
  const scenario = getScenario();
  const stage = getCurrentStage(scenario);
  const choice = getSelectedChoiceForStage(stage);
  if (!stage || !choice) {
    showToast("请先选择一个方案");
    return;
  }

  saveCurrentAnswerDraft();

  state.currentStageConsequenceShown = true;
  state.stageHistory = state.stageHistory.filter((h) => h.stageIndex !== stage.index);
  state.stageHistory.push({
    stageIndex: stage.index,
    choiceId: choice.id,
    choiceTitle: choice.title,
    consequence: choice.consequence || "",
    answer: state.stageAnswers[getStageStateKey(scenario.id, stage.index)] || ""
  });

  saveCurrentScenarioSession();
  persistJourneyState();
  renderScenario();
  requestAnimationFrame(() => {
    els.consequenceBox?.setAttribute("tabindex", "-1");
    els.consequenceBox?.scrollIntoView({ behavior: "smooth", block: "center" });
    els.consequenceBox?.focus({ preventScroll: true });
  });
}

function getAverageChoiceScore(scenario = getScenario()) {
  if (!isStoryScenario(scenario)) {
    const c = getSelectedChoice(scenario);
    return c ? c.score : 50;
  }
  const scores = scenario.stages
    .filter((stage) => !stage.choices?.every((choice) => choice.isFinal))
    .map((s) => getSelectedChoiceForStage(s)?.score)
    .filter((v) => typeof v === "number");
  if (!scores.length) return 50;
  return Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
}

function getAllChoiceExplanations(scenario = getScenario()) {
  if (!isStoryScenario(scenario)) {
    const c = getSelectedChoice(scenario);
    return c ? [{ title: c.title, why: c.whyThisScore }] : [];
  }
  return scenario.stages
    .map((s, i) => {
      const c = getSelectedChoiceForStage(s);
      if (!c || c.isFinal || !c.whyThisScore) return null;
      return { act: s.actLabel, title: c.title, score: c.score, why: c.whyThisScore };
    })
    .filter(Boolean);
}

function renderStack() {
  const currentScenario = getScenario();
  const currentKeys = scenarioStackMap[currentScenario.id] || [];
  els.stackScenarioTitle.textContent = currentScenario.title;
  els.stackScenarioContext.textContent = `本关重点训练 ${currentKeys.length} 项能力。高亮卡片就是当前剧情里的关键知识点。`;
  els.stackGrid.innerHTML = stackItems
    .map(
      (item) => {
        const isRelated = currentKeys.includes(item.key);
        const isFocused = state.selectedStackKey === item.key;
        const relatedScenarios = scenarios.filter((scenario) =>
          (scenarioStackMap[scenario.id] || []).includes(item.key)
        );
        return `
      <article class="stack-card${isRelated ? " is-related" : ""}${isFocused ? " is-focused" : ""}" data-stack-key="${item.key}">
        ${isRelated ? '<span class="stack-current-badge">当前关卡重点</span>' : ""}
        <h4>${escapeHtml(item.title)}</h4>
        <p>${escapeHtml(item.text)}</p>
        <ul>
          ${item.learn.map((line) => `<li>${escapeHtml(line)}</li>`).join("")}
        </ul>
        <div class="stack-missions">
          <span>关联关卡</span>
          ${relatedScenarios.map((scenario) => `<button type="button" data-stack-scenario-id="${scenario.id}"${scenario.id === currentScenario.id ? ' class="is-current"' : ""}>${escapeHtml(scenario.title.split("：")[0])}</button>`).join("")}
        </div>
      </article>
    `;
      }
    )
    .join("");
}

function renderPortfolio() {
  const completed = getPortfolioRecords();
  if (!completed.length) {
    els.portfolioList.innerHTML = `
      <article class="portfolio-card empty">
        <div class="empty-emoji">🎯</div>
        <h4>还没有复盘记录</h4>
        <p>完成任意关卡后，这里会保存每幕决定、对应后果和最终评分。</p>
        <button type="button" class="primary-action" data-start-first-mission>开始第一关</button>
      </article>
    `;
    return;
  }

  els.portfolioList.innerHTML = completed
    .map((item) => {
      const scenario = scenarios.find((entry) => entry.id === item.scenarioId);
      const review = item.review || {};
      const dimensions = review.dimensions || [];
      const history = item.stageHistory || [];
      const recordedAnswers = history.map((step) => step.answer).filter(Boolean);
      const finalReflection = item.finalAnswer || item.answer || recordedAnswers.at(-1) || "";
      const reflectionLabel = item.finalAnswer || item.answer ? "最终复盘" : recordedAnswers.length ? "最近一次补充" : "文字补充";
      const finishedAt = item.finishedAt ? new Date(item.finishedAt) : null;
      const finishedDate = finishedAt && !Number.isNaN(finishedAt.getTime())
        ? finishedAt.toLocaleDateString("zh-CN")
        : "完成时间未记录";
      if (item.isLegacy) {
        const legacyAnswer = item.finalAnswer || item.answer || "";
        return `
          <article class="portfolio-card is-legacy">
            <div class="portfolio-card-header">
              <div>
                <p class="eyebrow">旧版成绩</p>
                <h4>${escapeHtml(scenario?.title || item.scenario?.title || item.scenarioId || "历史关卡")}</h4>
              </div>
              <div class="portfolio-score-badge">${escapeHtml(item.score ?? "-")}<span>/100</span></div>
            </div>
            <div class="portfolio-outcome">
              <span>记录说明</span>
              <strong>成绩和文字已保留</strong>
              <p>这条记录来自旧版本，缺少逐幕决策路径。重新挑战后会按新流程保存每次选择和对应后果。</p>
            </div>
            <div class="portfolio-reflection${legacyAnswer ? "" : " is-empty"}">
              <span>原有文字</span>
              <p>${legacyAnswer ? escapeHtml(legacyAnswer) : "旧记录没有保存文字补充。"}</p>
            </div>
            <div class="portfolio-meta"><span>${escapeHtml(item.xp || 0)} XP</span><span>${escapeHtml(finishedDate)}</span></div>
            <div class="portfolio-actions">
              <button type="button" class="primary-action" data-legacy-replay="${escapeHtml(item.scenarioId)}">重新挑战并生成完整路径</button>
            </div>
          </article>
        `;
      }
      return `
        <article class="portfolio-card">
          <div class="portfolio-card-header">
            <div>
              <p class="eyebrow">${escapeHtml(scenario?.level || "Mission")}</p>
              <h4>${escapeHtml(scenario?.title || "AI PM Challenge")}</h4>
            </div>
            <div class="portfolio-score-badge">${escapeHtml(item.score)}<span>/100</span></div>
          </div>
          <div class="portfolio-outcome">
            <span>关键决定</span>
            <strong>${escapeHtml(item.decisionTitle || history.at(-1)?.choiceTitle || "已完成剧情决策")}</strong>
            ${item.consequence ? `<p>${escapeHtml(item.consequence)}</p>` : ""}
          </div>
          <div class="portfolio-reflection${finalReflection ? "" : " is-empty"}">
            <span>${reflectionLabel}</span>
            <p>${finalReflection ? `${escapeHtml(finalReflection.slice(0, 220))}${finalReflection.length > 220 ? "…" : ""}` : "本次只完成了方案选择，没有补充文字。"}</p>
          </div>
          ${history.length ? `<details class="portfolio-path"><summary>查看 ${history.length} 幕决策路径</summary>${history.map((step) => `<div class="portfolio-step"><strong>${escapeHtml(scenario?.stages?.[step.stageIndex]?.actLabel || `第 ${step.stageIndex + 1} 幕`)}</strong><span>${escapeHtml(step.choiceTitle)}</span>${step.answer ? `<p><b>补充判断：</b>${escapeHtml(step.answer)}</p>` : ""}<p><b>剧情结果：</b>${escapeHtml(step.consequence)}</p></div>`).join("")}</details>` : ""}
          ${dimensions.length ? `<div class="portfolio-dimensions">${dimensions.map((d) => `<span class="dim-tag" style="--v:${Math.min(100, (d.value / 20) * 100)}%">${escapeHtml(d.name)} ${escapeHtml(d.value)}</span>`).join("")}</div>` : ""}
          <div class="portfolio-meta">
            <span>${escapeHtml(item.xp)} XP</span>
            <span>${escapeHtml(finishedDate)}</span>
          </div>
          <div class="portfolio-actions">
            <button type="button" class="secondary-action" data-portfolio-review="${escapeHtml(item.scenarioId)}">回看完整复盘</button>
            <button type="button" class="secondary-action ghost" data-portfolio-share="${escapeHtml(item.scenarioId)}">分享本关结果</button>
          </div>
        </article>
      `;
    })
    .join("");
}

function scoreText(answer, scenario = getScenario()) {
  const normalized = answer.toLowerCase();
  const reasoningProvided = answer.trim().length > 0;
  const dimensions = [
    {
      name: "问题定义",
      keywords: ["用户", "场景", "目标", "痛点", "范围", "边界", "job", "persona"]
    },
    {
      name: "AI 可行性",
      keywords: ["模型", "rag", "agent", "召回", "工具", "上下文", "延迟", "成本", "能力"]
    },
    {
      name: "数据评测",
      keywords: ["指标", "评测", "黄金集", "实验", "ab", "准确率", "召回率", "留存", "转化"]
    },
    {
      name: "风险安全",
      keywords: ["风险", "隐私", "合规", "兜底", "审核", "拒答", "权限", "审计", "幻觉", "熔断", "客户信任"]
    },
    {
      name: "落地实验",
      keywords: ["灰度", "试点", "上线", "迭代", "监控", "回滚", "里程碑", "人工", "复盘", "机制"]
    }
  ];

  const answerLength = answer.trim().length;
  const lengthScore = Math.min(18, Math.floor(answerLength / 18));
  const posSignals = (scenario.scenarioPositiveSignals || []).filter((w) => normalized.includes(w));
  const negSignals = (scenario.scenarioNegativeSignals || []).filter((w) => normalized.includes(w));

  const dimensionScores = reasoningProvided ? dimensions.map((dimension) => {
    const genericHits = dimension.keywords.filter((word) => normalized.includes(word)).length;
    const scenarioBonus = posSignals.filter((w) => dimension.keywords.some((k) => w.includes(k) || k.includes(w))).length;
    const hits = genericHits + scenarioBonus;
    const penalty = negSignals.length > 0 && genericHits === 0 ? -3 : 0;
    return {
      name: dimension.name,
      value: Math.max(2, Math.min(20, 6 + hits * 4 + (answerLength >= 80 ? 2 : 0) + penalty))
    };
  }) : [];

  const avgChoiceScore = getAverageChoiceScore(scenario);
  const rubricScore = reasoningProvided
    ? (dimensionScores.reduce((sum, item) => sum + item.value, 0) / dimensions.length) * 5
    : avgChoiceScore;
  const signalBonus = reasoningProvided ? Math.min(5, posSignals.length * 0.4) : 0;
  const finalScore = Math.max(10, Math.min(100, Math.round(
    reasoningProvided
      ? avgChoiceScore * 0.74 + rubricScore * 0.26 + Math.min(3, lengthScore / 6) + signalBonus - negSignals.length * 1.5
      : avgChoiceScore
  )));

  const highlights = [];
  const gaps = [];
  const nextActions = [];

  if (!reasoningProvided) {
    if (avgChoiceScore >= 80) highlights.push("多幕选择基本守住了主要风险，也保留了继续验证的空间。");
    if (avgChoiceScore < 70) gaps.push("这条路径把部分风险留到了事后处置；逐幕得分会标出具体位置。");
    nextActions.push("本次没有补充文字，评分只基于真实选择。重新挑战时，可以挑一幕写清主要取舍和调整条件。");
  } else if (posSignals.length > 0) {
    const picked = posSignals.slice(0, 4);
    highlights.push(`你的补充里提到了 ${picked.map((s) => `「${s}」`).join("、")}；这些内容已经纳入表达维度。`);
  }
  dimensionScores.forEach((d) => {
    if (d.value >= 17) highlights.push(`「${d.name}」${d.value}/20：相关信息写得比较完整。`);
    if (d.value < 14) gaps.push(`「${d.name}」${d.value}/20：目前缺少具体依据或执行条件。`);
  });
  if (negSignals.length > 0) {
    gaps.push(`补充文字中出现了 ${negSignals.map((s) => `「${s}」`).join("、")}；这些表述没有说明适用范围或出错后的处理方式。`);
  }
  if (reasoningProvided && answerLength < 40) {
    gaps.push("补充文字较短，目前只能识别结论，无法判断完整的取舍依据。");
  }

  const weakDim = dimensionScores.slice().sort((a, b) => a.value - b.value)[0];
  if (weakDim) nextActions.push(`先补「${weakDim.name}」：写清一项依据、一个具体动作，以及什么信号会让你调整方案。`);
  if (reasoningProvided && posSignals.length < 3) {
    nextActions.push("对照本关评审标准，找出证据最少的一项，再补一条可验证的事实或条件。");
  }
  if (avgChoiceScore < 70) {
    nextActions.push("打开逐幕得分，先复盘最低分的一幕：当时影响了谁、风险何时暴露、还有没有更早的控制点。");
  }
  while (nextActions.length > 3) nextActions.pop();

  const choiceExplanations = getAllChoiceExplanations(scenario);

  let summary;
  if (finalScore >= 88) {
    summary = "这条路径覆盖了主要风险，关键节点也保留了验证和调整空间。下一步可以把门槛、负责人和观察周期写得更具体。";
  } else if (finalScore >= 72) {
    summary = "整体路径可行，但至少一幕仍依赖事后补救或模糊条件。逐幕回看时，优先补齐调整门槛和验证证据。";
  } else if (finalScore >= 55) {
    summary = "部分选择控制了眼前问题，但长期机制仍不完整。请先查看最低分的一幕，再判断风险是否能在影响客户前被发现。";
  } else {
    summary = "当前路径把较多风险留到了事后。先从最低分的一幕复盘影响范围、停止条件和责任分工，再重新挑战。";
  }

  return {
    score: finalScore,
    dimensions: dimensionScores,
    character: scenario.criticCharacter,
    criticQuestion: scenario.criticQuestion,
    evaluationCriteria: scenario.evaluationCriteria || [],
    highlights,
    gaps,
    nextActions,
    choiceExplanations,
    feedback: summary,
    reasoningProvided
  };
}

function showScore(review, animate = true) {
  const dimensions = Array.isArray(review?.dimensions) ? review.dimensions : [];
  els.scorePanel.hidden = false;
  els.scoreHeadline.textContent = review.score >= 85 ? "风险控制较完整" : review.score >= 70 ? "关键判断基本成立" : review.score >= 55 ? "仍有明显缺口" : "高风险决策较多";
  els.scoreValue.textContent = review.score;
  els.feedbackText.textContent = review.feedback;
  els.scoreBreakdown.innerHTML = dimensions.length
    ? dimensions.map(
        (dimension) => `
        <div class="metric-row">
          <span>${escapeHtml(dimension.name)}</span>
          <div class="metric-bar">
            <div class="metric-fill" style="width: ${dimension.value * 5}%"></div>
          </div>
          <strong>${dimension.value}</strong>
        </div>
      `
      )
      .join("")
    : `<div class="reasoning-omitted">本次未补充文字，以上总分只根据你在各幕做出的真实选择计算。</div>`;

  const structuredHtml = `
    ${review.character ? `<div class="critic-card"><div class="critic-avatar" aria-hidden="true">问</div><div class="critic-body"><div class="critic-name">${escapeHtml(review.character)}</div><div class="critic-question">${escapeHtml(review.criticQuestion)}</div></div></div>` : ""}
    ${
      review.evaluationCriteria && review.evaluationCriteria.length
        ? `<div class="expert-criteria-box"><div class="expert-title">本关评审标准</div>${review.evaluationCriteria
            .map((c, index) => `<div class="expert-line"><strong>${index + 1}</strong> ${escapeHtml(c.replace(/^[1-5][^\s]*\s*/, ""))}</div>`)
            .join("")}</div>`
        : ""
    }
    ${
      review.choiceExplanations && review.choiceExplanations.length
        ? `<div class="choice-explanation-wrapper"><div class="choice-explanation-title">逐幕得分</div>${review.choiceExplanations
            .map(
              (e) => `<div class="choice-explanation-item"><div class="choice-explanation-head">${
                e.act ? `<span class="choice-explanation-act">${escapeHtml(e.act)}</span>` : ""
              }<span>${escapeHtml(e.title)}</span><strong>${escapeHtml(e.score)} 分</strong></div><div class="choice-explanation-body">${escapeHtml(e.why)}</div></div>`
            )
            .join("")}</div>`
        : ""
    }
    <div class="highlights-gaps-next">
      ${
        review.highlights && review.highlights.length
          ? `<div class="hg-column highlights">
              <div class="hg-title">已经覆盖</div>
              ${review.highlights.map((h) => `<div class="hg-item">${escapeHtml(h).replace(/^✅\s*/, "")}</div>`).join("")}
            </div>`
          : ""
      }
      ${
        review.gaps && review.gaps.length
          ? `<div class="hg-column gaps">
              <div class="hg-title">仍缺什么</div>
              ${review.gaps.map((g) => `<div class="hg-item">${escapeHtml(g).replace(/^⚠️\s*/, "")}</div>`).join("")}
            </div>`
          : ""
      }
      ${
        review.nextActions && review.nextActions.length
          ? `<div class="hg-column next-actions">
              <div class="hg-title">下一步</div>
              ${review.nextActions.map((n) => `<div class="hg-item">${escapeHtml(n).replace(/^🎯\s*/, "")}</div>`).join("")}
            </div>`
          : ""
      }
    </div>
  `;

  const existingStructured = els.scorePanel.querySelector(".structured-review");
  if (existingStructured) existingStructured.remove();
  if (structuredHtml.trim()) {
    const wrapper = document.createElement("details");
    wrapper.className = "structured-review";
    wrapper.innerHTML = `<summary>查看逐幕得分与评审依据</summary><div class="structured-review-body">${structuredHtml}</div>`;
    els.scorePanel.appendChild(wrapper);
  }

  if (animate) {
    els.scorePanel.scrollIntoView({ behavior: "smooth", block: "nearest" });
    els.scoreHeadline.setAttribute("tabindex", "-1");
    els.scoreHeadline.focus({ preventScroll: true });
  }
}

function submitScore() {
  const scenario = getScenario();
  if (state.progress[scenario.id] && state.replayScenarioId !== scenario.id) {
    showToast("本关已经完成；要修改答案，请先点「重新挑战本关」");
    return;
  }
  if (isStoryScenario(scenario)) {
    const stage = getCurrentStage(scenario);
    const choice = getSelectedChoiceForStage(stage);
    const isReflectionStage = stage.index >= scenario.stages.length - 1 && stage.choices.length === 1 && stage.choices[0].isFinal;
    const canSubmit = choice && (isReflectionStage || state.currentStageConsequenceShown) &&
      (stage.index >= scenario.stages.length - 1 || choice.isFinal);
    if (!canSubmit) {
      showToast("请先完成当前决策并进入终局");
      return;
    }
  }
  saveCurrentAnswerDraft();
  const finalAnswer = els.answerInput.value.trim();
  const reasoning = isStoryScenario(scenario)
    ? scenario.stages
        .map((stage) => (state.stageAnswers[getStageStateKey(scenario.id, stage.index)] || "").trim())
        .filter(Boolean)
        .join("\n\n")
    : finalAnswer;
  if (!reasoning) {
    showToast("未补充文字，本次只按真实决策路径评分");
  }

  const review = scoreText(reasoning, scenario);
  const xp = review.score >= 85 ? scenario.xp : review.score >= 70 ? Math.round(scenario.xp * 0.8) : Math.round(scenario.xp * 0.6);
  const latestOutcome = [...state.stageHistory].reverse().find((item) => item?.consequence);
  const stageChoices = Object.fromEntries(
    Object.entries(state.stageChoices).filter(([key]) => key.startsWith(`${scenario.id}-s`))
  );
  const stageAnswers = Object.fromEntries(
    Object.entries(state.stageAnswers).filter(([key]) => key.startsWith(`${scenario.id}-s`))
  );

  state.progress[scenario.id] = {
    schemaVersion: 2,
    scenarioId: scenario.id,
    scenario: { title: scenario.title, level: scenario.level },
    answer: finalAnswer,
    finalAnswer,
    reasoning,
    choiceId: state.selectedChoiceId,
    choiceTitle: latestOutcome?.choiceTitle || `${scenario.stages.filter((stage) => !stage.choices?.every((choice) => choice.isFinal)).length} 次决策完成`,
    decisionTitle: latestOutcome?.choiceTitle || "",
    consequence: latestOutcome?.consequence || "",
    score: review.score,
    xp,
    review,
    stageChoices,
    stageAnswers,
    stageHistory: state.stageHistory.map((item) => ({ ...item })),
    finishedAt: new Date().toISOString()
  };

  state.replayScenarioId = null;
  delete state.scenarioSessions[scenario.id];
  saveProgress();
  persistJourneyState();
  renderProgress();
  renderScenario();
  renderPortfolio();
  showScore(review, true);
  showToast(`本关完成：${review.score} 分，获得 ${xp} XP`);
}

function resetStageProgress({ clearAnswers = true } = {}) {
  const scenario = getScenario();
  clearScenarioState(scenario.id, { clearAnswers });
  state.stageHistory = [];
  state.currentStageIndex = 0;
  state.currentStageConsequenceShown = false;
  state.selectedChoiceId = null;
  persistJourneyState();
}

let speechRecognition = null;
let isListening = false;

function initSpeechRecognition() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    return null;
  }

  try {
    const recognition = new SpeechRecognition();
    recognition.lang = "zh-CN";
    recognition.continuous = false;
    recognition.interimResults = true;
    return recognition;
  } catch (e) {
    return null;
  }
}

function toggleVoiceInput() {
  const button = els.voiceButton;
  if (!speechRecognition) {
    showToast("当前浏览器不支持语音输入。请使用最新版 Chrome 或 Edge。");
    return;
  }

  if (isListening) {
    speechRecognition.stop();
    return;
  }

  speechRecognition.start();
  isListening = true;
  button.classList.add("is-listening");
  showToast("正在听取语音，停止说话后自动结束");

  speechRecognition.onresult = (event) => {
    let transcript = "";
    for (let i = event.resultIndex; i < event.results.length; i++) {
      transcript += event.results[i][0].transcript;
    }
    if (transcript) {
      const current = els.answerInput.value;
      els.answerInput.value = current ? `${current}\n${transcript}` : transcript;
      saveCurrentAnswerDraft();
      persistJourneyState();
      updateAnswerCount();
    }
  };

  speechRecognition.onerror = (event) => {
    isListening = false;
    button.classList.remove("is-listening");
    if (event.error === "not-allowed") {
      showToast("麦克风权限被拒绝，请在浏览器设置中允许访问");
    } else if (event.error !== "no-speech") {
      showToast(`语音识别失败：${event.error}`);
    }
  };

  speechRecognition.onend = () => {
    isListening = false;
    button.classList.remove("is-listening");
  };
}

function setView(view) {
  document.querySelectorAll(".nav-button").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.view === view);
    button.setAttribute("aria-current", button.dataset.view === view ? "page" : "false");
  });
  document.querySelectorAll(".view").forEach((section) => {
    section.classList.toggle("is-visible", section.id === `${view}View`);
  });

  const titles = {
    missions: "选一关，看看决定会把局面带到哪里",
    stack: "关卡里会用到哪些技术能力",
    dispatch: "把当前题目发到自己的 IM",
    portfolio: "决定、后果和复盘"
  };
  els.viewTitle.textContent = titles[view] || titles.missions;
  els.viewTitle.setAttribute("tabindex", "-1");
  requestAnimationFrame(() => {
    if (window.matchMedia("(max-width: 760px)").matches) window.scrollTo({ top: 0, behavior: "auto" });
    els.viewTitle.focus({ preventScroll: true });
  });
}

function getCurrentView() {
  const active = document.querySelector(".nav-button.is-active");
  return active ? active.dataset.view : "missions";
}

function renderDispatchFields() {
  const channel = els.channelSelect.value;
  const saved = state.config[channel] || {};
  const commonWebhook = `
    <label>
      Webhook URL
      <input id="webhookUrl" type="password" placeholder="https://..." value="${escapeHtml(saved.webhookUrl || "")}" autocomplete="off" />
    </label>
  `;

  if (channel === "wecom") {
    els.webhookFields.innerHTML = commonWebhook;
  } else if (channel === "feishu") {
    els.webhookFields.innerHTML = `
      ${commonWebhook}
      <label>
        签名密钥（可选）
        <input id="feishuSecret" type="password" placeholder="开启飞书签名校验时填写" value="${escapeHtml(saved.secret || "")}" autocomplete="off" />
      </label>
    `;
  } else if (channel === "telegram") {
    els.webhookFields.innerHTML = `
      <label>
        Bot Token
        <input id="telegramToken" type="password" placeholder="123456:ABC..." value="${escapeHtml(saved.botToken || "")}" autocomplete="off" />
      </label>
      <label>
        Chat ID
        <input id="telegramChatId" type="text" placeholder="-1001234567890 或 @channel" value="${escapeHtml(saved.chatId || "")}" autocomplete="off" />
      </label>
    `;
  } else {
    els.webhookFields.innerHTML = `
      ${commonWebhook}
      <label>
        Payload 模式
        <select id="tfMode">
          <option value="generic" ${saved.mode !== "teams" ? "selected" : ""}>通用 JSON</option>
          <option value="teams" ${saved.mode === "teams" ? "selected" : ""}>Microsoft Teams Adaptive Card</option>
        </select>
      </label>
    `;
  }
}

function collectDispatchConfig() {
  const channel = els.channelSelect.value;
  const config = {};
  if (channel === "telegram") {
    config.botToken = document.querySelector("#telegramToken")?.value.trim();
    config.chatId = document.querySelector("#telegramChatId")?.value.trim();
  } else {
    config.webhookUrl = document.querySelector("#webhookUrl")?.value.trim();
    if (channel === "feishu") {
      config.secret = document.querySelector("#feishuSecret")?.value.trim();
    }
    if (channel === "tf") {
      config.mode = document.querySelector("#tfMode")?.value;
    }
  }
  return config;
}

function buildDispatchPayload(dryRun = false) {
  const scenario = getScenario();
  const stage = getCurrentStage(scenario);
  const dispatchScenario = stage
    ? {
        ...scenario,
        title: `${scenario.title} · ${stage.actLabel}`,
        context: getContextForStage(scenario, stage),
        question: stage.question || scenario.question || "",
        constraints: stage.constraints || scenario.constraints || [],
        choices: getVisibleStageChoices(stage)
      }
    : scenario;
  return {
    dryRun,
    demoMode: els.demoMode?.checked || false,
    channel: els.channelSelect.value,
    config: collectDispatchConfig(),
    user: {
      name: els.senderName.value.trim() || "AI PM Sandbox"
    },
    note: els.dispatchNote.value.trim(),
    includeRubric: els.includeRubric.checked,
    scenario: dispatchScenario
  };
}

async function sendQuestion(dryRun = false) {
  const payload = buildDispatchPayload(dryRun);
  const response = await fetch("/api/send-question", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  const result = await response.json();

  if (!result.ok) {
    throw new Error(result.error || "发送失败");
  }

  if (els.rememberConfig.checked && !dryRun) {
    state.config[payload.channel] = payload.config;
    state.config.senderName = payload.user.name;
    saveJson("ai-pm-sandbox-config", state.config);
  }

  return result;
}

function buildShareCardHtml({ type, scenario, choice, answer, consequence, review, xp, stageIndex, totalStages, decisionPath = [] }) {
  const score = review?.score || 0;
  const headline = type === "score" ? "本关决策复盘" : "本幕决策记录";
  const cleanChoice = choice && !/写.+总结/.test(choice) ? choice : "";
  const safeScenarioTitle = escapeHtml(scenario?.title || "");
  const safeQuestion = escapeHtml(summarizeForShare(scenario?.question || "", 72));
  const safeChoice = escapeHtml(cleanChoice);
  const safeAnswer = escapeHtml(summarizeForShare(answer || "", 84));
  const safeConsequence = escapeHtml(summarizeOutcomeForShare(consequence || "", type === "score" ? 136 : 146));
  const safeFeedback = escapeHtml(summarizeForShare(review?.feedback || "", 88));
  const safePath = decisionPath.filter(Boolean).slice(0, 4).map((item) => escapeHtml(summarizeForShare(item, 20)));
  const progressLabel = type === "score"
    ? `${safePath.length || Math.max(1, (totalStages || 1) - 1)} 次决策 · 关卡完成`
    : stageIndex && totalStages
      ? `第 ${stageIndex} / ${totalStages} 幕`
      : "剧情进行中";
  const lesson = safeAnswer || safeFeedback;

  return `
<div style="width:460px;max-width:100%;padding:22px;background:#fffdf8;color:#18211f;font-family:-apple-system,'PingFang SC',sans-serif;box-sizing:border-box;border-radius:22px;box-shadow:0 24px 60px rgba(24,33,31,.22);">
  <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:16px;margin-bottom:14px;">
    <div><div style="font-size:10px;font-weight:900;color:#1f7a5c;letter-spacing:1.2px;">AI PM SANDBOX</div><div data-share-field="headline" style="font-size:21px;font-weight:950;line-height:1.25;margin-top:4px;">${headline}</div><div data-share-field="progress" style="font-size:10px;color:#65716d;margin-top:6px;">${progressLabel}</div></div>
    ${type === "score" ? `<div style="min-width:82px;padding:10px;border-radius:16px;background:#18211f;color:#fff;text-align:center;"><strong data-share-field="score" style="display:block;font-size:32px;line-height:1;">${score}</strong><span data-share-field="xp" style="font-size:10px;opacity:.72;">${xp || 0} XP</span></div>` : `<div data-share-field="badge" style="padding:7px 10px;border-radius:999px;background:#e8f4ef;color:#176b50;font-size:10px;font-weight:900;white-space:nowrap;">本幕完成</div>`}
  </div>
  <div style="padding:12px 14px;border-radius:16px;background:#f1f5ed;border:1px solid #c7ddd3;margin-bottom:10px;">
    <div data-share-field="scenario" style="font-size:17px;font-weight:900;line-height:1.4;">${safeScenarioTitle}</div>
    ${type === "decision" && safeQuestion ? `<div data-share-field="question" style="font-size:12px;color:#65716d;line-height:1.55;margin-top:5px;">${safeQuestion}</div>` : ""}
  </div>
  ${type === "score" && safePath.length > 1 ? `<div style="margin-bottom:9px;"><div style="font-size:10px;font-weight:900;color:#7b8581;letter-spacing:.8px;margin-bottom:4px;">我的决策路径</div><div data-share-field="path" style="font-size:11px;line-height:1.6;color:#4f5c58;">${safePath.join(" → ")}</div></div>` : ""}
  ${safeChoice ? `<div style="margin-bottom:9px;"><div data-share-field="decision-label" style="font-size:10px;font-weight:900;color:#7b8581;letter-spacing:.8px;margin-bottom:4px;">${type === "score" ? "终局决定" : "我的决定"}</div><div data-share-field="choice" style="padding:9px 12px;border-radius:12px;background:#e7eff5;color:#246b9d;font-size:14px;font-weight:900;">${safeChoice}</div></div>` : ""}
  ${safeConsequence ? `<div style="margin-bottom:9px;"><div style="font-size:10px;font-weight:900;color:#7b8581;letter-spacing:.8px;margin-bottom:4px;">决定带来的后果</div><div data-share-field="consequence" style="padding:10px 12px;border-radius:12px;background:#fff2d7;border-left:4px solid #d39a20;font-size:12px;line-height:1.58;">${safeConsequence}</div></div>` : ""}
  ${safeAnswer && type === "decision" ? `<div style="margin-bottom:9px;"><div data-share-field="lesson-label" style="font-size:10px;font-weight:900;color:#7b8581;letter-spacing:.8px;margin-bottom:4px;">我的补充判断</div><div data-share-field="lesson" style="font-size:12px;line-height:1.55;color:#4f5c58;white-space:pre-wrap;">${safeAnswer}</div></div>` : ""}
  ${
    type === "score" && lesson
      ? `<div style="padding:10px 12px;border-radius:11px;background:#e8f4ef;border-left:4px solid #1f7a5c;">
        <div data-share-field="lesson-label" style="font-size:10px;font-weight:900;color:#176b50;margin-bottom:3px;">${safeAnswer ? "我的复盘" : "本关收获"}</div>
        <div data-share-field="lesson" style="font-size:12px;line-height:1.55;color:#35423e;">${lesson}</div>
      </div>`
      : ""
  }
  <div style="margin-top:10px;padding-top:9px;border-top:1px dashed #d9d5cb;display:flex;justify-content:space-between;align-items:center;color:#87918d;font-size:10px;">
    <span>AI PM 判断力训练</span><span>选择 → 后果 → 复盘</span>
  </div>
</div>`;
}

async function exportPortfolio(format = "markdown") {
  const completed = getPortfolioRecords().map((item) => {
    const scenario = scenarios.find((s) => s.id === item.scenarioId);
    return { ...item, scenario };
  });

  if (!completed.length) {
    showToast("完成至少一个关卡后才能导出作品集");
    return;
  }

  showToast(`正在生成 ${format.toUpperCase()} 作品集…`);

  try {
    const resp = await fetch("/api/export-portfolio", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ portfolio: completed, format })
    });
    const result = await resp.json();
    if (!result.ok) throw new Error(result.error || "导出失败");

    const blob = new Blob([result.content], {
      type: format === "html" ? "text/html;charset=utf-8" : "text/markdown;charset=utf-8"
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = result.filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast(`作品集已导出：${result.filename}`);
  } catch (e) {
    showToast(`导出失败：${e.message}`);
  }
}

function openShareDialog(mode = "score") {
  const scenario = getScenario();
  const completed = state.progress[scenario.id];
  const choice = getSelectedChoice(scenario);
  const currentStage = getCurrentStage(scenario);
  const cardScenario = {
    ...scenario,
    question: currentStage?.question || scenario.question || ""
  };

  let html;
  if (mode === "score") {
    if (!completed) {
      showToast("完成本关后才能分享成绩");
      return;
    }
    html = buildShareCardHtml({
      type: "score",
      scenario: cardScenario,
      choice: completed.decisionTitle || choice?.title || "",
      answer: completed.finalAnswer || completed.answer || completed.reasoning || "",
      review: completed.review,
      xp: completed.xp,
      consequence: completed.consequence || choice?.consequence || "",
      decisionPath: (completed.stageHistory || []).map((item) => item.choiceTitle),
      stageIndex: currentStage?.index + 1,
      totalStages: getTotalStages(scenario)
    });
  } else {
    html = buildShareCardHtml({
      type: "decision",
      scenario: cardScenario,
      choice: choice?.title || "",
      answer: els.answerInput.value.trim(),
      consequence: choice?.consequence || "",
      stageIndex: currentStage?.index + 1,
      totalStages: getTotalStages(scenario)
    });
  }

  els.shareDialogTitle.textContent = mode === "score" ? "成绩分享卡" : "决定分享卡";
  els.shareCardContainer.innerHTML = html;
  els.shareDialog.showModal();
}

function getShareField(container, name) {
  return container.querySelector(`[data-share-field="${name}"]`)?.textContent?.trim() || "";
}

function canvasFont(size, weight = 400) {
  return `${weight} ${size}px -apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", sans-serif`;
}

function wrapCanvasText(ctx, text, maxWidth, font) {
  if (!text) return [];
  ctx.font = font;
  const lines = [];
  let line = "";
  for (const char of Array.from(text)) {
    if (char === "\n") {
      if (line) lines.push(line);
      line = "";
      continue;
    }
    const next = line + char;
    if (line && ctx.measureText(next).width > maxWidth) {
      lines.push(line.trimEnd());
      line = char.trimStart();
    } else {
      line = next;
    }
  }
  if (line) lines.push(line.trimEnd());
  return lines;
}

function roundedCanvasPath(ctx, x, y, width, height, radius) {
  const r = Math.min(radius, width / 2, height / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + width, y, x + width, y + height, r);
  ctx.arcTo(x + width, y + height, x, y + height, r);
  ctx.arcTo(x, y + height, x, y, r);
  ctx.arcTo(x, y, x + width, y, r);
  ctx.closePath();
}

function fillRoundedCanvasRect(ctx, x, y, width, height, radius, fill, stroke = "", lineWidth = 1) {
  roundedCanvasPath(ctx, x, y, width, height, radius);
  ctx.fillStyle = fill;
  ctx.fill();
  if (stroke) {
    ctx.strokeStyle = stroke;
    ctx.lineWidth = lineWidth;
    ctx.stroke();
  }
}

function drawCanvasLines(ctx, lines, x, y, lineHeight, font, color) {
  ctx.font = font;
  ctx.fillStyle = color;
  lines.forEach((line, index) => ctx.fillText(line, x, y + index * lineHeight));
  return lines.length * lineHeight;
}

async function createShareCardPng() {
  const container = els.shareCardContainer.querySelector("div");
  if (!container) throw new Error("没有可生成的卡片");

  const fields = {
    headline: getShareField(container, "headline"),
    progress: getShareField(container, "progress"),
    score: getShareField(container, "score"),
    xp: getShareField(container, "xp"),
    badge: getShareField(container, "badge"),
    scenario: getShareField(container, "scenario"),
    question: getShareField(container, "question"),
    path: getShareField(container, "path"),
    decisionLabel: getShareField(container, "decision-label"),
    choice: getShareField(container, "choice"),
    consequence: getShareField(container, "consequence"),
    lessonLabel: getShareField(container, "lesson-label"),
    lesson: getShareField(container, "lesson")
  };

  const width = 460;
  const padding = 22;
  const contentWidth = width - padding * 2;
  const measure = document.createElement("canvas").getContext("2d");
  const headlineLines = wrapCanvasText(measure, fields.headline, 300, canvasFont(21, 900));
  const scenarioLines = wrapCanvasText(measure, fields.scenario, contentWidth - 28, canvasFont(17, 900));
  const questionLines = wrapCanvasText(measure, fields.question, contentWidth - 28, canvasFont(12, 400));
  const pathLines = wrapCanvasText(measure, fields.path, contentWidth, canvasFont(11, 400));
  const choiceLines = wrapCanvasText(measure, fields.choice, contentWidth - 24, canvasFont(14, 900));
  const consequenceLines = wrapCanvasText(measure, fields.consequence, contentWidth - 28, canvasFont(12, 400));
  const lessonLines = wrapCanvasText(measure, fields.lesson, contentWidth - 28, canvasFont(12, 400));

  const headerHeight = Math.max(76, 18 + headlineLines.length * 26 + 18);
  const scenarioHeight = 24 + scenarioLines.length * 24 + (questionLines.length ? 5 + questionLines.length * 18 : 0);
  const pathHeight = pathLines.length ? 16 + pathLines.length * 17 : 0;
  const choiceHeight = choiceLines.length ? 16 + 18 + choiceLines.length * 20 : 0;
  const consequenceHeight = consequenceLines.length ? 16 + 20 + consequenceLines.length * 19 : 0;
  const lessonHeight = lessonLines.length ? 20 + 16 + lessonLines.length * 18 : 0;
  const gaps = [pathHeight, choiceHeight, consequenceHeight, lessonHeight].filter(Boolean).length * 9;
  const height = padding + headerHeight + 10 + scenarioHeight + pathHeight + choiceHeight + consequenceHeight + lessonHeight + gaps + 42 + padding;

  const scale = 2;
  const canvas = document.createElement("canvas");
  canvas.width = width * scale;
  canvas.height = height * scale;
  const ctx = canvas.getContext("2d");
  ctx.scale(scale, scale);
  ctx.textBaseline = "top";
  roundedCanvasPath(ctx, 0, 0, width, height, 22);
  ctx.clip();
  ctx.fillStyle = "#fffdf8";
  ctx.fillRect(0, 0, width, height);

  ctx.font = canvasFont(10, 900);
  ctx.fillStyle = "#1f7a5c";
  ctx.fillText("AI PM SANDBOX", padding, padding);
  drawCanvasLines(ctx, headlineLines, padding, padding + 18, 26, canvasFont(21, 900), "#18211f");
  ctx.font = canvasFont(10, 400);
  ctx.fillStyle = "#65716d";
  ctx.fillText(fields.progress, padding, padding + headerHeight - 14);

  if (fields.score) {
    fillRoundedCanvasRect(ctx, width - padding - 82, padding, 82, 76, 16, "#18211f");
    ctx.textAlign = "center";
    ctx.font = canvasFont(32, 900);
    ctx.fillStyle = "#ffffff";
    ctx.fillText(fields.score, width - padding - 41, padding + 9);
    ctx.font = canvasFont(10, 400);
    ctx.fillStyle = "rgba(255,255,255,.72)";
    ctx.fillText(fields.xp, width - padding - 41, padding + 53);
    ctx.textAlign = "left";
  } else if (fields.badge) {
    fillRoundedCanvasRect(ctx, width - padding - 58, padding, 58, 28, 14, "#e8f4ef");
    ctx.textAlign = "center";
    ctx.font = canvasFont(10, 900);
    ctx.fillStyle = "#176b50";
    ctx.fillText(fields.badge, width - padding - 29, padding + 8);
    ctx.textAlign = "left";
  }

  let y = padding + headerHeight + 10;
  fillRoundedCanvasRect(ctx, padding, y, contentWidth, scenarioHeight, 16, "#f1f5ed", "#c7ddd3");
  let innerY = y + 12;
  innerY += drawCanvasLines(ctx, scenarioLines, padding + 14, innerY, 24, canvasFont(17, 900), "#18211f");
  if (questionLines.length) {
    innerY += 5;
    drawCanvasLines(ctx, questionLines, padding + 14, innerY, 18, canvasFont(12, 400), "#65716d");
  }
  y += scenarioHeight;

  if (pathLines.length) {
    y += 9;
    ctx.font = canvasFont(10, 900);
    ctx.fillStyle = "#7b8581";
    ctx.fillText("我的决策路径", padding, y);
    drawCanvasLines(ctx, pathLines, padding, y + 16, 17, canvasFont(11, 400), "#4f5c58");
    y += pathHeight;
  }

  if (choiceLines.length) {
    y += 9;
    ctx.font = canvasFont(10, 900);
    ctx.fillStyle = "#7b8581";
    ctx.fillText(fields.decisionLabel || "我的决定", padding, y);
    const boxY = y + 16;
    const boxHeight = 18 + choiceLines.length * 20;
    fillRoundedCanvasRect(ctx, padding, boxY, contentWidth, boxHeight, 12, "#e7eff5");
    drawCanvasLines(ctx, choiceLines, padding + 12, boxY + 9, 20, canvasFont(14, 900), "#246b9d");
    y += choiceHeight;
  }

  if (consequenceLines.length) {
    y += 9;
    ctx.font = canvasFont(10, 900);
    ctx.fillStyle = "#7b8581";
    ctx.fillText("决定带来的后果", padding, y);
    const boxY = y + 16;
    const boxHeight = 20 + consequenceLines.length * 19;
    fillRoundedCanvasRect(ctx, padding, boxY, contentWidth, boxHeight, 12, "#fff2d7");
    ctx.fillStyle = "#d39a20";
    ctx.fillRect(padding, boxY, 4, boxHeight);
    drawCanvasLines(ctx, consequenceLines, padding + 12, boxY + 10, 19, canvasFont(12, 400), "#35423e");
    y += consequenceHeight;
  }

  if (lessonLines.length) {
    y += 9;
    const boxHeight = 20 + 16 + lessonLines.length * 18;
    fillRoundedCanvasRect(ctx, padding, y, contentWidth, boxHeight, 11, "#e8f4ef");
    ctx.fillStyle = "#1f7a5c";
    ctx.fillRect(padding, y, 4, boxHeight);
    ctx.font = canvasFont(10, 900);
    ctx.fillStyle = "#176b50";
    ctx.fillText(fields.lessonLabel || "本关收获", padding + 12, y + 10);
    drawCanvasLines(ctx, lessonLines, padding + 12, y + 26, 18, canvasFont(12, 400), "#35423e");
    y += lessonHeight;
  }

  y += 10;
  ctx.strokeStyle = "#d9d5cb";
  ctx.setLineDash([4, 4]);
  ctx.beginPath();
  ctx.moveTo(padding, y);
  ctx.lineTo(width - padding, y);
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.font = canvasFont(10, 400);
  ctx.fillStyle = "#87918d";
  ctx.fillText("AI PM 判断力训练", padding, y + 10);
  ctx.textAlign = "right";
  ctx.fillText("选择 → 后果 → 复盘", width - padding, y + 10);
  ctx.textAlign = "left";

  return await new Promise((resolve, reject) => {
    canvas.toBlob((blob) => blob ? resolve(blob) : reject(new Error("浏览器无法生成 PNG")), "image/png");
  });
}

function downloadBlob(blob) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `ai-pm-sandbox-${Date.now()}.png`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

async function downloadShareCard() {
  showToast("正在生成图片…");
  try {
    downloadBlob(await createShareCardPng());
    showToast("图片已下载");
  } catch (error) {
    showToast(`生成失败：${error.message}`);
  }
}

async function copyShareCardImage() {
  showToast("正在复制卡片…");
  try {
    const blob = await createShareCardPng();
    if (!navigator.clipboard?.write || !window.ClipboardItem) {
      downloadBlob(blob);
      showToast("当前浏览器不能直接复制图片，已为你下载 PNG");
      return;
    }
    await navigator.clipboard.write([new window.ClipboardItem({ "image/png": blob })]);
    showToast("卡片已复制，可以直接粘贴分享");
  } catch (error) {
    showToast(`复制失败：${error.message}`);
  }
}

function bindKeyboard() {
  document.addEventListener("keydown", (e) => {
    if (e.key === "?" || (e.shiftKey && e.key === "/")) {
      e.preventDefault();
      if (els.helpDialog.open) els.helpDialog.close();
      else if (!document.querySelector("dialog[open]")) els.helpDialog.showModal();
      return;
    }
    if (document.querySelector("dialog[open]")) return;
    const currentView = getCurrentView();
    if (e.target.matches("input, textarea, select")) {
      if (currentView === "missions" && (e.ctrlKey || e.metaKey) && e.key === "Enter") {
        e.preventDefault();
        submitScore();
      }
      return;
    }

    if (currentView === "missions" && (e.ctrlKey || e.metaKey) && e.key === "Enter") {
      e.preventDefault();
      submitScore();
      return;
    }

    if (e.key.toLowerCase() === "d" && !e.altKey && !e.ctrlKey && !e.metaKey) {
      e.preventDefault();
      toggleTheme();
      return;
    }

    if (currentView === "missions" && !e.altKey && !e.ctrlKey && !e.metaKey && e.key.toLowerCase() === "n") {
      e.preventDefault();
      gotoScenario(1);
      return;
    }
    if (currentView === "missions" && !e.altKey && !e.ctrlKey && !e.metaKey && e.key.toLowerCase() === "p") {
      e.preventDefault();
      gotoScenario(-1);
      return;
    }

    if (!e.altKey && !e.ctrlKey && !e.metaKey && e.key.toLowerCase() === "e" && getCurrentView() === "portfolio") {
      e.preventDefault();
      exportPortfolio("markdown");
      return;
    }

    if (currentView === "missions" && !e.altKey && !e.ctrlKey && !e.metaKey && ["1", "2", "3", "A", "B", "C", "a", "b", "c"].includes(e.key)) {
      e.preventDefault();
      const scenario = getScenario();
      if (isStoryScenario(scenario)) {
        const stage = getCurrentStage(scenario);
        if (!stage) return;
        let idx;
        if (["1","2","3"].includes(e.key)) idx = Number(e.key) - 1;
        else idx = e.key.toLowerCase().charCodeAt(0) - 97;
        const choice = getVisibleStageChoices(stage)[idx];
        if (choice) {
          handleStageChoiceSelect(stage.index, choice.id);
          showToast(`已暂选 ${String.fromCharCode(65 + idx)}：${choice.title}，确认前还可以修改`);
        }
      } else {
        const idx = ["1", "2", "3"].includes(e.key)
          ? Number(e.key) - 1
          : e.key.toLowerCase().charCodeAt(0) - 97;
        if (scenario.choices[idx]) {
          state.selectedChoiceId = scenario.choices[idx].id;
          renderScenario();
          showToast(`已选方案 ${e.key}：${scenario.choices[idx].title}`);
        }
      }
      return;
    }
    if (e.key === "Enter" && !e.ctrlKey && !e.metaKey && els.confirmChoiceButton && !els.confirmChoiceButton.hidden) {
      e.preventDefault();
      confirmStageChoice();
      return;
    }
    if (e.key === "Enter" && !e.ctrlKey && !e.metaKey && els.nextStageButton && !els.nextStageButton.hidden) {
      e.preventDefault();
      goToNextStage();
      return;
    }
  });
}

function bindEvents() {
  document.querySelectorAll(".nav-button").forEach((button) => {
    button.addEventListener("click", () => setView(button.dataset.view));
  });

  els.missionList.addEventListener("click", (event) => {
    const skill = event.target.closest("[data-path-stack-key]");
    if (skill) {
      enterScenario(skill.dataset.pathScenarioId);
      state.selectedStackKey = skill.dataset.pathStackKey;
      renderStack();
      setView("stack");
      requestAnimationFrame(() => document.querySelector(".stack-card.is-focused")?.scrollIntoView({ behavior: "smooth", block: "center" }));
      return;
    }
    const card = event.target.closest("[data-scenario-id]");
    if (!card) return;
    enterScenario(card.dataset.scenarioId);
    requestAnimationFrame(() => els.stageTitle?.focus({ preventScroll: true }));
  });

  els.choiceGrid.addEventListener("click", (event) => {
    const card = event.target.closest("[data-choice-id]");
    if (!card) return;
    const stageIndex = card.dataset.stageIndex;
    const choiceId = card.dataset.choiceId;
    const scenario = getScenario();
    if (stageIndex !== undefined && stageIndex !== "" && isStoryScenario(scenario)) {
      handleStageChoiceSelect(Number(stageIndex), choiceId);
      const choice = getSelectedChoiceForStage(getCurrentStage(scenario));
      showToast(`已暂选 ${choice?.title || "方案"}，确认前还可以修改`);
    } else {
      state.selectedChoiceId = choiceId;
      document.querySelectorAll(".choice-card").forEach((item) => {
        item.classList.toggle("is-selected", item.dataset.choiceId === state.selectedChoiceId);
      });
      renderScenario();
    }
  });

  els.nextStageButton?.addEventListener("click", goToNextStage);
  els.confirmChoiceButton?.addEventListener("click", confirmStageChoice);

  els.coachButtons.addEventListener("click", (event) => {
    const button = event.target.closest("[data-coach-index]");
    if (!button) return;
    const scenario = getScenario();
    const prompt = getCoachPrompts(scenario)[Number(button.dataset.coachIndex)];
    if (prompt) {
      insertAnswerText(prompt.text);
    }
  });

  els.answerInput.addEventListener("input", () => {
    saveCurrentAnswerDraft();
    persistJourneyState();
    updateAnswerCount();
  });

  els.voiceButton?.addEventListener("click", toggleVoiceInput);

  els.scoreButton.addEventListener("click", submitScore);
  els.resetButton.addEventListener("click", () => {
    if (!confirm("确定清空所有关卡进度和 XP？此操作不可撤销。")) return;
    state.progress = {};
    state.legacyProgress = {};
    state.stageChoices = {};
    state.stageAnswers = {};
    state.stageHistory = [];
    state.scenarioSessions = {};
    state.currentStageIndex = 0;
    state.currentStageConsequenceShown = false;
    state.replayScenarioId = null;
    state.selectedScenarioId = scenarios[0].id;
    state.draftAnswers = {};
    saveProgress();
    saveJson("ai-pm-sandbox-progress-legacy", {});
    persistJourneyState();
    renderProgress();
    renderScenario();
    renderPortfolio();
    showToast("进度已重置");
  });

  // IM 入口仅保留在「微信/飞书刷题」Tab 中

  els.channelSelect.addEventListener("change", renderDispatchFields);

  els.dispatchForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    try {
      const result = await sendQuestion(false);
      if (result.demoMode || result.dryRun) {
        els.previewContent.textContent = JSON.stringify(result, null, 2);
        els.previewDialog.showModal();
        showToast(result.note || "已生成预览，没有真正发送");
      } else {
        showToast("题目已发送到 IM");
      }
    } catch (error) {
      showToast(error.message);
    }
  });

  els.dryRunButton.addEventListener("click", async () => {
    try {
      const result = await sendQuestion(true);
      els.previewContent.textContent = JSON.stringify(result, null, 2);
      els.previewDialog.showModal();
    } catch (error) {
      showToast(error.message);
    }
  });

  els.closePreviewButton?.addEventListener("click", () => els.previewDialog.close());
  els.helpButton?.addEventListener("click", () => els.helpDialog.showModal());
  els.closeHelpButton?.addEventListener("click", () => els.helpDialog.close());
  els.themeToggle?.addEventListener("click", toggleTheme);

  els.prevMission.addEventListener("click", () => gotoScenario(-1));
  els.nextMission.addEventListener("click", () => gotoScenario(1));

  els.scenarioStackLink.addEventListener("click", () => {
    renderStack();
    setView("stack");
  });
  els.backToMissionButton.addEventListener("click", () => setView("missions"));
  els.stackGrid.addEventListener("click", (event) => {
    const button = event.target.closest("[data-stack-scenario-id]");
    if (!button) return;
    enterScenario(button.dataset.stackScenarioId);
    renderStack();
    setView("missions");
    showToast(`已切换到关联关卡：${getScenario().title}`);
  });

  els.exportMdButton.addEventListener("click", () => exportPortfolio("markdown"));
  els.exportHtmlButton.addEventListener("click", () => exportPortfolio("html"));

  els.shareCardButton.addEventListener("click", () => openShareDialog("decision"));
  els.shareScoreCardButton.addEventListener("click", () => openShareDialog("score"));
  els.viewPortfolioButton.addEventListener("click", () => setView("portfolio"));
  els.replayScenarioButton.addEventListener("click", () => {
    enterScenario(state.selectedScenarioId, { replay: true });
    setView("missions");
    requestAnimationFrame(() => {
      els.stageTitle?.scrollIntoView({ behavior: "smooth", block: "start" });
      els.stageTitle?.focus({ preventScroll: true });
    });
    showToast("已开始重新挑战，本次作答不会覆盖旧成绩，直到你再次提交");
  });
  els.portfolioList.addEventListener("click", (event) => {
    const start = event.target.closest("[data-start-first-mission]");
    if (start) {
      enterScenario(scenarios[0].id);
      setView("missions");
      return;
    }
    const legacyReplay = event.target.closest("[data-legacy-replay]");
    if (legacyReplay) {
      enterScenario(legacyReplay.dataset.legacyReplay, { replay: true });
      setView("missions");
      return;
    }
    const reviewButton = event.target.closest("[data-portfolio-review]");
    if (reviewButton) {
      enterScenario(reviewButton.dataset.portfolioReview);
      setView("missions");
      requestAnimationFrame(() => els.scorePanel?.scrollIntoView({ behavior: "smooth", block: "start" }));
      return;
    }
    const shareButton = event.target.closest("[data-portfolio-share]");
    if (shareButton) {
      enterScenario(shareButton.dataset.portfolioShare);
      openShareDialog("score");
    }
  });
  els.closeShareButton.addEventListener("click", () => els.shareDialog.close());
  els.downloadShareCard.addEventListener("click", downloadShareCard);
  els.copyShareImage.addEventListener("click", copyShareCardImage);
}

function init() {
  initEls();
  saveProgress();
  applyTheme(state.theme);
  els.senderName.value = state.config.senderName || "";
  speechRecognition = initSpeechRecognition();
  if (els.voiceButton && !speechRecognition) {
    els.voiceButton.title = "当前浏览器不支持语音输入，建议使用 Chrome / Edge";
    els.voiceButton.style.opacity = "0.4";
    els.voiceButton.style.cursor = "not-allowed";
  }
  if (els.answerInput) {
    els.answerInput.placeholder = "可选：补充你为什么选择这个方案，以及你会如何控制风险。";
  }
  const initialScenario = getScenario();
  const initialCompletion = state.progress[initialScenario.id];
  if (initialCompletion && state.replayScenarioId !== initialScenario.id && isStoryScenario(initialScenario)) {
    restoreCompletedScenarioState(initialScenario, initialCompletion);
  }
  renderProgress();
  renderMissionList();
  renderScenario();
  renderStack();
  renderPortfolio();
  renderDispatchFields();
  bindEvents();
  bindKeyboard();
  requestAnimationFrame(centerCurrentPathNode);
  if (legacyProgressCount) {
    showToast(`检测到 ${legacyProgressCount} 条旧版成绩，已单独保留；重新挑战后会生成新的决策路径`);
  }
}

init();
