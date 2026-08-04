const MIN_ANSWER_LENGTH = 0;
const RECOMMENDED_ANSWER_LENGTH = 20;

const scenarios = [
  {
    id: "rag-mystery",
    level: "Level 1 · 四幕剧",
    xp: 180,
    title: "RAG 疑案：AI 客服上线 72 小时",
    summary: "立项 → 上线爆雷 → CCO 反击 → 复盘。一次关于「AI 何时能直接面对客户」的完整职场过山车。",
    genre: "职场悬疑 · 客户信任危机",
    totalStages: 4,
    evaluationCriteria: [
      "1️⃣ 范围与边界：是否明确区分「AI 可独立处理」与「必须转人」的场景",
      "2️⃣ 可追溯与引用：答案是否标注来源，出错能否定位到具体知识条目",
      "3️⃣ 人工兜底策略：高价值客户、投诉、情绪激烈时是否有强制转人机制",
      "4️⃣ 评测门槛：上线前是否有黄金样例 + 准确率/拒答率/引用正确率三条红线",
      "5️⃣ 灰度与回滚：从 5%→50% 是否有阶段监控，异常能否秒级切回人工"
    ],
    criticCharacter: "深耕客户成功 12 年的 CCO（首席客户官）林姐",
    criticQuestion: "如果一个年付 80 万的客户被 AI 误答了一次，他不续约了，你拿什么赔给公司？",
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
            title: "A. 全量 AI 自动回复",
            text: "直接把所有重复问题切给 AI，客户看不到人工入口。先降本再说，出了问题客服补。",
            score: 22,
            stageEffect: "ceoHappy: +2, ccoTrust: -3, riskLevel: high",
            consequence: "CEO 当场夸你「有执行力」。林姐冷笑一声，在笔记本上写了四个字：「出了事找你」。两周后，AI 如约上线。",
            whyThisScore: "这不是产品决策，是赌运气。知识库质量参差、没有评测、没有边界——只要 AI 把一个高价值客户的续费问题答错一次，省下来的 300 万工资，一个客户流失就赔光了。"
          },
          {
            id: "s1a-copilot",
            title: "B. 客服 Copilot 模式（推荐）",
            text: "AI 只给客服写答案草稿 + 找知识来源，最终发出什么由客服人来确认。对外完全不暴露 AI。",
            score: 90,
            stageEffect: "ceoHappy: 0, ccoTrust: +2, riskLevel: low",
            consequence: "CEO 有点失望「看不到直接降本数字」，但林姐抬起头说「这个方案我愿意配合」。试点的 2 个客服开始用 AI 打草稿。",
            whyThisScore: "这是唯一在两周内风险可控、又能真正落地的方案。客户接触到的依然是人工答案，但人工的效率被 AI 提起来了。更重要的是——你积累了「人工接受/拒绝 AI 建议」的真实标注数据，这才是之后能做全量自动化的燃料。"
          },
          {
            id: "s1a-faq",
            title: "C. 只做静态 FAQ 整理",
            text: "AI 风险太大，先把 1280 篇文档人工整理成 200 条标准 FAQ，走关键词匹配流程。",
            score: 52,
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
            "你选了全量自动回复。AI 上线第一天就回答了 812 个问题，响应率 100%。你正准备向 CEO 汇报数据，钉钉群红点开始疯狂跳——\n\n「@产品 客户说 AI 告诉他合同可以单方面解除，现在要找我们法务对峙」\n「@产品 客户问退款流程，AI 说 7 天无理由，我们明明是 3 天」\n「VIP3 客户，AI 给错了 API 文档，现在他们线上服务挂了」\n\n林姐的电话打进来，只有一句话：「现在你打算怎么办？」",
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
            title: "A. 补丁式修复",
            text: "把出错的案例收集成黑名单，关键词命中就转人工。周五汇报只报好的数据。",
            score: 18,
            stageEffect: "shortTermFix: 1, longTermRisk: +4, trust: -2",
            consequence: "黑名单加了 37 条，但第 38 条总会冒出来。林姐看了你的汇报材料，什么都没说，把自己的那页客户流失预警抽走了。",
            whyThisScore: "这是典型的「按下葫芦浮起瓢」。黑名单策略永远追不上新的出错方式，更糟的是，隐瞒问题会让你失去 CCO 的信任——下次真出大事，她不会再提前提醒你了。"
          },
          {
            id: "s2a-boundary",
            title: "B. 重新画边界",
            text: "立刻盘点：哪些类型的问题 AI 目前不能碰？明确「禁止 AI 回答」的清单，上线强制转人。",
            score: 86,
            stageEffect: "shortTermFix: 2, longTermRisk: -2, trust: +2",
            consequence: "你拉上林姐一起列了 7 类红线问题：合同条款、退款金额、投诉升级、VIP 客户、涉及数据安全、法律相关、竞品对比。AI 覆盖率掉了 14%，但人工接管的成功率从 62% 升到 94%。林姐说「这才是做事的样子」。",
            whyThisScore: "AI 产品经理最核心的能力不是「让 AI 答更多题」，而是「知道 AI 在哪道题上应该闭嘴」。明确不可答边界 + 强制转人 = 用 14% 的覆盖率换来了客户信任不崩盘，这笔账怎么算都值。"
          },
          {
            id: "s2a-eval",
            title: "C. 紧急建评测集",
            text: "暂停新功能，用过去一周的真实工单抽出 50 条做黄金评测集，每天晚上跑一次 AI 的准确率。",
            score: 74,
            stageEffect: "shortTermFix: 1, longTermRisk: -1, trust: +1",
            consequence: "你和两个客服加班到 9 点，标了 50 条黄金样本。第一次跑：正确率 58%，引用准确率 41%，拒答率只有 8%。数字难看，但你终于有了「差多少」的量化基线。",
            whyThisScore: "方向对，但节奏有问题。线上已经在烧了，先建评测是「长期正确、短期不救急」。正确的顺序应该是：先止血（画边界）→ 再诊断（评测基线）→ 再治疗（优化模型）。"
          }
        ]
      },
      {
        index: 2,
        actLabel: "第三幕 · CCO 办公室",
        timeMarker: "周四下午 16:00",
        stageTitle: "林姐把一叠打印纸拍在你桌上",
        context:
          "「12 个高价值客户，昨天到今天，AI 误答了 4 个。有一个明确说「你们如果用 AI 糊弄我，明年就换供应商」。\n\n她把客户成功团队的周报推到你面前，上面用红笔圈出了三处：\n\n1. AI 不区分客户等级，对年付 80 万的 VIP 和免费用户用同一套话术\n2. 客户明确说「我要投诉」，AI 还在机械解释产品功能\n3. 知识库里两篇同主题旧版文档，AI 随机召回了过期的那篇\n\n「我不是反对 AI，」林姐说，「我是反对你用我的客户信任来当你的试错成本。现在你告诉我，第三拍怎么打？」",
        question: "面对客户成功负责人的正面反击，你的最终决策方案是？",
        constraints: ["明天 CEO 要最终汇报", "VIP 客户续费率是公司季度 OKR 红线", "工程团队下周才能排到 RAG 优化"],
        choices: [
          {
            id: "s3a-rollback",
            title: "A. 直接回滚，全量切回人工",
            text: "认栽，AI 先下了。下个月准备好了再上。",
            score: 58,
            stageEffect: "riskZero: 1, loss: -2, credit: -1",
            consequence: "林姐点点头。CEO 听完只说了一句「准备了两周就这？」。两个试点客服说「其实 AI 写草稿挺好用的，突然没了有点不习惯」。你攒了两周的 momentum 归零了。",
            whyThisScore: "安全是安全了，但「直接全量回滚」等于把之前所有的尝试都否定了——包括那些真正好用、被客服接受了的部分。更好的做法是「切回可控范围」，而不是把孩子和洗澡水一起倒掉。"
          },
          {
            id: "s3a-layered",
            title: "B. 分层策略 + 熔断开关（推荐）",
            text: "VIP 客户 100% 人工 + AI 辅助草稿；非 VIP 非投诉 AI 可答但每一条都带引用来源 + 「不对找人工」悬浮按钮；加一个你手机上的秒级熔断总开关。",
            score: 94,
            stageEffect: "riskZero: 1, loss: 0, credit: +3",
            consequence: "林姐听完说「这个方案，我愿意在 CEO 面前和你一起扛」。周五汇报，CEO 问「降本多少？」你说「短期看是 VIP 没降，但非 VIP 客服人均工单处理量 +45%，而且我们多了熔断、分层、引用三条机制——下个月可以稳步扩大范围」。CEO 拍了板：「就这么干」。",
            whyThisScore: "这是 AI PM 真正的价值所在：不是找到一个「完美方案」，而是在每一个选择都是 trade-off 的情况下，设计出「风险有边界、收益能累加」的分层机制。VIP 保住客户信任（底线），非 VIP 验证效率（上线），熔断开关保你觉能睡着觉——三层设计，把一场职场危机变成了 CEO 眼里「有章法的产品人」的背书。"
          },
          {
            id: "s3a-promise",
            title: "C. 承诺下周全修好",
            text: "给林姐和 CEO 画大饼：工程下周就优化 RAG，到时候准确率肯定上 90%，再坚持一周。",
            score: 26,
            stageEffect: "riskZero: 0, loss: -3, credit: -3",
            consequence: "你说出口的瞬间就后悔了。工程排期你都没确认过。果然，第二天你就收到了工程主管的钉钉消息：「你答应的 90% 准确率，你来负责上线哈，我这边排期要下下周。」",
            whyThisScore: "职场大忌：拿你控制不了的事来承诺。工程优化有不确定性，RAG 准确率不是拍脑袋就能上 90% 的——你拍胸脯的那一刻，就是在透支「产品经理的可信度」这个最值钱的资产。"
          }
        ]
      },
      {
        index: 3,
        actLabel: "第四幕 · 复盘批改",
        timeMarker: "周五晚 19:30",
        stageTitle: "你的产品判断，打多少分？",
        context:
          "一周结束，所有结果落定。无论结果是 CEO 拍板通过，还是客户投诉，还是 momentum 归零——现在是你作为 AI 产品经理，复盘自己三次决策的时候了。\n\n三次选择，每一次都像在走钢丝：向左是 CEO 要的效率数字，向右是 CCO 要的客户信任，中间是你自己对「AI 产品是什么」的判断。",
        question: "把三次选择的逻辑串成一句话：你对 AI 第一版的产品哲学是什么？",
        constraints: ["作为复盘总结，写下来的东西就是你自己的方法论雏形"],
        choices: [
          {
            id: "s4a-philosophy",
            title: "开始写复盘总结",
            text: "进入批改模式，把你三次选择背后的逻辑写出来吧。",
            score: 80,
            whyThisScore: "好的 AI PM 不是从不犯错，而是能从每一次「被迫 trade-off」里提炼出可复用的原则。你这次在「上线压力 vs 客户信任」的钢丝上走了一圈，现在把逻辑写出来，下次遇到类似的剧本——你就不是在赌博，而是在调用自己的方法论。",
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
    summary: "产品需求评审 → 灰度上线误发 → 法务逼宫。关于「AI 能不能替你点发送按钮」的信任闯关。",
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
        choices: [
          {
            id: "a1-full",
            title: "A. 端到端全自动闭环",
            text: "Agent 自动读线索 → 自动查 CRM → 自动写邮件 → 一键全发。销售只看结果。",
            score: 28,
            stageEffect: "tonyHappy: +3, zhouTrust: -4, blastRadius: 5/5",
            consequence: "Tony 当场拍你肩膀：「兄弟够意思」。老周在评审会最后留了 30 秒，说「方案我保留意见，邮件出了事法务部不背」。",
            whyThisScore: "这是把「产品经理的可信度」全押在「AI + 工具链 100% 不犯错」上。CRM 字段错了能改，邮件发出去就收不回。只要有一次——哪怕 0.1% 的概率——把金额、客户名、产品名写错了，品牌和合规事故就炸了。客户收到错邮件的那一刻，Tony 的奖金不会替你挡子弹。"
          },
          {
            id: "a1-gates",
            title: "B. 动作分级 + 高风险确认（推荐）",
            text: "分层：读数据/整理/写草稿这些 100% 自动；发邮件/改成交金额/删客户这些必须人确认。",
            score: 92,
            stageEffect: "tonyHappy: +1, zhouTrust: +2, blastRadius: 1/5",
            consequence: "Tony 有点不爽「还要人点一下啊？」老周第一次在评审会上主动说话了：「这个方案，我签字。」你成功把 80% 的机械工作自动化了，又把最后那道对外的闸门留给人。",
            whyThisScore: "AI Agent 的黄金原则：最后一公里的决策权要留给人。内部整理、查资料、写草稿，这些错了可以重来——可以全自动。但对外发信、改金额、删数据，这些一旦错了就不可逆——必须人点确认。既给了销售想要的效率，又在法务那里拿了通关文牒。这才是能走长远的设计。"
          },
          {
            id: "a1-suggest",
            title: "C. Agent 只给建议，所有动作人工做",
            text: "保守方案：Agent 生成一个待办清单，销售一条条手动执行。完全不碰发送和修改。",
            score: 64,
            stageEffect: "tonyHappy: -1, zhouTrust: +3, blastRadius: 0/5",
            consequence: "老周完全没问题。Tony 沉默了 10 秒，说：「这跟我现在 Excel 有什么区别？如果只是列待办，我不需要 AI。」",
            whyThisScore: "零风险，但 AI 的价值几乎没释放。销售团队用了一个月就会抱怨「每一步都要点一下」「跟没上差不多」，最后产品没人用。正确的方式不是「全放」或「全禁」，而是「低风险先放，高风险留确认」——分级，分级，分级。"
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
            "你选了全自动。上线 6 小时，Agent 已经自动发了 3842 封邮件。\n\n17:48 销售小李在群里说「@产品 我有个客户说收到了两封一模一样的跟进邮件」。\n17:49 小王：「@产品 有客户回复了，说邮件里写的产品名根本不是我们卖的那个」。\n17:50 Tony 给你打了电话，声音是冷的：「我今天去拜访的一个大客户，转发了一封 Agent 发的邮件给我——邮件里写的合同编号是另一家客户的。现在他问我，我们是不是把他的数据和别人的弄混了。你说我怎么回？」\n\n老周的邮件在 17:52 发到了你的邮箱，只有标题：「紧急：请立刻停掉 Agent 邮件发送功能，并保留日志。」",
          "a1-gates":
            "你选了分级确认。Agent 上线 6 小时，生成了 1204 份邮件草稿，销售确认后发送了 892 份，平均每个销售节省了 40 分钟的写邮件时间。整体节奏顺利。\n\n但 17:45，一个销售在内部群反馈：Agent 给的一份草稿里，把客户公司名写成了另一家同名不同字的公司。幸好她人工检查了，点了「重新生成」没直接发。\n\n17:50，你去查日志，发现这不是个例——有 1.3% 的草稿里公司名有问题。更糟的是，有 3 个销售嫌「每封都要点一下太麻烦」，把 50 封草稿批量勾选了全选然后一键确认，根本没看正文。\n\n17:52，老周路过你工位，停下来看了一眼群里的消息：「我之前说过什么来着？」",
          "a1-suggest":
            "你选了只给建议。上线 6 小时，Agent 生成了 410 条待办建议，销售手动执行了 98 条。销售群里已经在吐槽：「每封邮件都要我自己复制粘贴改一遍，我图啥？」\n\nTony 17:30 就来找你了，倒也没生气，但语气很沉：「兄弟，你这方案太保守了，销售这边用不起来。下周一我给你一周时间，你调一下，要么让效率真的提上去，要么这个项目先停。」\n\n好消息是：老周在走廊里遇见你，跟你点了点头——至少合规那边你是安全的。"
        },
        question: "第二波决策：针对暴露出来的问题，你现在最紧急的三步是？",
        constraints: ["周五 CEO 要项目周报", "客户数据和邮件日志都在后台能查", "工程下周开始要去做另一个项目了"],
        choices: [
          {
            id: "a2-ignore",
            title: "A. 先压下来，周末再修",
            text: "先停掉最严重的那几个触发场景，周报只报正面数据，周末加班改好周一上线。",
            score: 22,
            stageEffect: "shortTerm: -2, longTerm: -4, trust: -3",
            consequence: "你把群消息设为免打扰，写了一版很漂亮的周报。周五下午，Tony 转发了一封客户邮件到 CEO 那里，标题是「关于贵司近期邮件服务异常的正式问询函」。CEO 把你、老周、Tony 喊到会议室，第一句是：「你们谁能告诉我，为什么我是最后一个知道的？」",
            whyThisScore: "22 分：瞒报风险极高。只要有一个客户把错邮件转发出来——哪怕只是小小的错误——你藏了它的那一刻，问题就从「产品 bug」升级成「管理问题 + 信任危机」。主动暴露问题最多被复盘，藏问题被发现——你的可信度会被严重损害，后续修复成本远高于现在诚实同步。"
          },
          {
            id: "a2-triple",
            title: "B. 立刻止血 + 主动通报 + 加固闸门（推荐）",
            text: "三步并行：① 停掉高风险通道 + 批量撤回能撤回的 ② 1 小时内写一份「事故初步通报」同步给老周/Tony/CEO，不甩锅 ③ 紧急加固：加「同客户 X 小时内去重」「批量发送必须过目关键信息」。",
            score: 94,
            stageEffect: "shortTerm: -1, longTerm: +3, trust: +4",
            consequence: "CEO 看完通报没骂人，只说：「以后第一时间同步。」老周帮你改了通报里的客户风险措辞，Tony 主动提出销售团队一起打电话给受影响的 17 个客户道歉。更奇怪的是——经过这件事，你、Tony、老周三个人反而形成了一种「一起扛过事」的默契。",
            whyThisScore: "出事故不可怕，可怕的是应对事故的方式不对。这套三步法的核心是：①客户伤害最小化（止血）②建立「出了事我第一时间扛」的人设（通报）③把一次性的问题变成系统性的加固（闸门）。短期难看，但长期你多了三条团队内的信任资产——CEO 知道你不瞒，老周知道你懂分寸，Tony 知道你愿意一起扛。"
          },
          {
            id: "a2-blame",
            title: "C. 甩锅：工程/数据/销售的问题",
            text: "公司名写错是数据清洗的锅，批量不看是销售的锅，邮件接口重发是工程的锅，我只是产品经理。",
            score: 14,
            stageEffect: "shortTerm: 0, longTerm: -5, trust: -5",
            consequence: "在汇报会上你把责任拆得清清楚楚，工程主管、数据主管、Tony 三个人轮番瞪你。会议结束后，你收到一条老周发来的私信：「产品经理是最终负责人，不是传声筒。你这个做事方式，我不认可。」",
            whyThisScore: "产品经理的核心不是「写 PRD」，而是「为结果负责」。跨职能的项目出了问题，所有人都可以甩锅——只有你不能。一旦你在事故面前选择甩锅，下一次需要跨部门配合的时候，没人会真心站你这边。"
          }
        ]
      },
      {
        index: 2,
        actLabel: "第三幕 · 法务部办公室",
        timeMarker: "周五下午 16:00",
        stageTitle: "老周给你看了三页纸的合规要求",
        context:
          "经过第二幕的事故处理，项目活下来了。但周五下午，老周把一份三页纸的《AI Agent 对外动作合规规范》放在你桌上，说：「你下周要继续推，这 12 条必须满足。不满足，我就去跟 CEO 说这个项目下线。」\n\n你扫了一眼：完整审计日志（保留 180 天）、幂等机制（客户最多 24 小时内收到 1 封同类邮件）、撤回窗口（发送后 60 秒内可一键撤回）、人工确认强制停留（确认按钮要 5 秒后才能点，逼销售看一眼）、权限分级（新入职销售 2 周内只能发自己的客户，不能批量）……\n\nTony 得知后第一个跳起来：「5 秒确认？那批量发 100 封要我等 8 分钟？用户体验太差了！」",
        question: "合规要求 vs 业务效率，你的最终设计方案是？",
        constraints: ["CEO 下周二要拍板这个项目的继续/停止", "工程可以抽 3 天做加固，之后就撤了", "Tony 明确说体验太差他会反对"],
        choices: [
          {
            id: "a3-zhou",
            title: "A. 全按老周说的做",
            text: "法务要求是红线，12 条全部硬上，Tony 那边解释一下。",
            score: 58,
            stageEffect: "zhouOK: +2, tonyOK: -3, shipOK: -1",
            consequence: "合规全过了。但周二汇报时 Tony 真的反对了——他把屏幕共享开到了销售的操作录屏：「你们自己看，点 10 封邮件，被强制等 50 秒。这东西我团队不会用。」CEO 皱着眉说「再调调」，项目继续被压着一周。",
            whyThisScore: "全听法务的不出事，但业务也做不起来。法务的要求是「极端最坏情况下不要出事」，但业务的目标是「正常情况下跑得够快」。产品经理的价值不是「选一个部门的话照做」，而是找到两条曲线的交点——既不出大事，又能跑起来。"
          },
          {
            id: "a3-balance",
            title: "B. 分级合规模型（推荐）",
            text: "把 12 条拆成「红线（必须做）+ 黄线（根据动作风险调整）+ 绿线（可协商）」。比如：红线=日志/撤回/幂等（不管什么动作必须有）；黄线=5秒确认只对批量>10封或金额>X万的场景启用；绿线=新销售权限，Tony 说可以的可以缩短到 1 周。",
            score: 95,
            stageEffect: "zhouOK: +2, tonyOK: +2, shipOK: +2",
            consequence: "你拉老周和 Tony 坐下来谈了一个小时。老周看到红线部分一条没动，松了口。Tony 看到 10 封以下不用强制等待，也不反对了。周二汇报 CEO 听完只说了一句：「这才是产品经理该做的事——不是和稀泥，是把规则翻译成大家都能接受的方案。」项目通过，继续排期。",
            whyThisScore: "这是教科书级别的「跨职能权衡」。法务不是敌人，Tony 也不是——他们只是站在自己的 KPI 上说话。产品经理要做的不是「二选一」，而是「重新画一条让两边都能接受的线」。把合规要求拆解成「绝对不能动的底线」和「可以根据场景调整的余量」，你就同时拿到了法务的签字和业务的支持。"
          },
          {
            id: "a3-tony",
            title: "C. 听 Tony 的，和法务打太极",
            text: "上线先把合规做薄，等用户量起来了再慢慢补。出事了我扛。",
            score: 32,
            stageEffect: "zhouOK: -4, tonyOK: +3, shipOK: +1",
            consequence: "Tony 非常开心，项目按时推进。但三周后出了一个更大的事——一个离职的前员工用 Agent 批量导出了 2000 条客户数据发了私人邮箱。老周查日志的时候发现「权限分级」根本没做。CEO 的会开了两个小时，你从会议室出来的时候，知道自己在这家公司的晋升窗口已经关了。",
            whyThisScore: "「先跑再补合规」这句话，说出来很性感，出了事就是产品经理一个人背锅。合规不是锦上添花，是产品的「地基」——你可以不造豪华的房子，但地基没打，房子一定会塌。更糟的是，你用「我扛」换来了业务的短暂支持，但真扛事的时候，你会发现没有任何人站在你身后。"
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
    title: "幻觉迷局：理财顾问会议室的那 10 分钟",
    summary: "内测惊艳 → 客户会议室翻车 → 终局设计。关于「AI 看起来很真 vs 实际可信」的终极拷问。",
    genre: "职场伦理 · 信任与可信度",
    totalStages: 3,
    evaluationCriteria: [
      "1️⃣ 引用溯源：每个关键数字/结论是否有来源，翻原文能不能对上",
      "2️⃣ 置信度校准：不确定的话，AI 有没有说「不确定」，而不是硬编",
      "3️⃣ 拒答与转人链：超范围的、涉及具体投资建议的，有没有引导转专家",
      "4️⃣ 用户心智教育：产品有没有反复告诉用户「AI 是辅助不是结论」",
      "5️⃣ 审计与追溯：每条回答的模型版本/引用片段/时间戳能不能翻"
    ],
    criticCharacter: "带团队打了 8 年理财顾问硬仗的营业部总经理陈姐",
    criticQuestion: "我客户问「这个基金近 5 年年化多少」，AI 报了个数字，你没标来源。我念了，客户当场翻出另一个数字拍我脸上。我下不了台，你下得了台吗？",
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
        choices: [
          {
            id: "h1-model",
            title: "A. 加预算换更强的模型 + 更长上下文",
            text: "幻觉是模型能力问题，把模型从 X 换成 Y，拉长上下文把整份年报喂进去，应该就准了。",
            score: 34,
            stageEffect: "engHappy: +2, chenTrust: -3, riskLevel: 5/5",
            consequence: "算法团队很开心你站他们。一周后新模型上线，同样的问题，数字变成了 5.73%——更接近了，但还是错的。而且陈姐发现：新模型说话的语气更肯定了，顾问反而更容易信。",
            whyThisScore: "这是 AI PM 最经典的坑——把「产品设计问题」误判成「模型能力问题」。更大的模型只会让幻觉「更像真的」，语气更自信，数字更像模像样，反而更容易骗过一线顾问。真正的问题根本不是模型不够强，是产品层面没加「引用」「置信度」「拒答」这三道墙。没加这三道墙，你换啥模型都是往里填钱。"
          },
          {
            id: "h1-grounded",
            title: "B. 强制引用 + 置信度标签（推荐）",
            text: "没有找到原文引用的数字一律不给；有引用的显示「来自 XX 报告第 X 页」；并在数字旁边加上 95% / 70% / 40% 的置信标。",
            score: 93,
            stageEffect: "engHappy: -1, chenTrust: +3, riskLevel: 1/5",
            consequence: "算法有点不开心「加了这些会有更多问题答不上来」。但陈姐看完原型直接说：「这个东西我敢让我的人用。」上线后，覆盖率从 92% 掉到了 68%——但每一条答出来的都带了引用和置信度，顾问反而养成了「先看引用来源，再看数字」的习惯。",
            whyThisScore: "高可信领域的 AI 产品，「答不出来」从来不是问题，「答错了却像真的」才是。强制引用=在顾问会议室里，他能直接翻原文念给客户听；置信度标签=告诉顾问「这条是稳的，那条是猜的，你自己掂量」。你用 24% 的覆盖率，换来了「产品说出来的每一句话都能站得住脚」的信任底线。这个 trade-off，值。"
          },
          {
            id: "h1-disclaimer",
            title: "C. 底部加个大的免责声明",
            text: "每条回答下面放一句「不构成投资建议，数据仅供参考」。法律上免责就够了。",
            score: 42,
            stageEffect: "engHappy: +1, chenTrust: -2, riskLevel: 4/5",
            consequence: "法务说「声明我可以帮你们写得更严一点」。一周后陈姐直接把声明截图发你：「我客户说——你们自己都知道数据不准，还给我看？」免责声明写得越重，客户越觉得「你们产品自己都不信，凭什么让我信」。",
            whyThisScore: "这是法务层面的免责，不是产品层面的防护。产品的职责不是「把锅甩给用户」，而是「让错误的结论根本到不了用户屏幕上」。你在底部写了「数据仅供参考」，但产品 UI 上把那个数字用 22 号大字加粗显示——你说用户会看哪个？免责声明是最后一道保险，绝不能是唯一一道。"
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
            "你选了强制引用+置信度。上线第二周，同样的剧本——陈姐带顾问见一个 800 万高净值客户。客户问了一个很偏的问题：「你们有配置过稀土行业的 QDII 产品吗？历史业绩怎么样？」\n\n顾问打开 AI。AI 转了 3 秒，跳出一条：「⚠️ 置信度 38% · 未找到贵司公开产品库中的稀土 QDII 数据。以下为公开市场参考数据（非我司产品）……」并附带了 2 条引用。\n\n顾问没有照念。他合起电脑对客户说：「这个领域我们确实做得不多，我回去让研究部专门给您整理一份报告，明天发给您。」\n\n客户反而点点头：「挺好的，不瞎编。说实话比说漂亮话重要。」\n\n——这单最后没签成，但陈姐说：「这个结果我反而能接受。因为我知道下次再遇到类似的，我的人不会瞎承诺。」",
          "h1-disclaimer":
            "你选了免责声明。第二周还是出事了——一个新人顾问在给一对退休老夫妻做养老规划时，AI 给出了一个偏保守的养老目标基金预期收益率 5.2%，他直接按 5% 跟客户讲了（还留了 0.2% 的安全垫）。\n\n结果那只基金真实的长期收益是 3.8%。年底客户对账单来了，老夫妻找到营业部，老太太当场哭了：「我这 30 万是我跟老头子的棺材本啊，你们说的 5%，现在只有 3.8%，你们是不是骗子？」\n\n视频发到了内部大群，总行合规部的人当天就飞过来了。陈姐被点名批评，你写的事故报告改了 6 版。最后一句你写的是：「免责声明保护了公司，但保护不了客户，也保护不了一线的顾问。」"
        },
        question: "第二幕之后，最终的产品设计补全方案是？",
        constraints: ["总行合规要求两周内必须定稿", "还要再加一项：具体投资建议不能 AI 给，必须转人", "顾问需要有「快速转后台分析师」的通道"],
        choices: [
          {
            id: "h2-minimal",
            title: "A. 最小改动：出事的地方修一下就行",
            text: "稀土那类不知道的问题让 AI 说不知道，其他不变。",
            score: 46,
            stageEffect: "compliance: -2, team: -1, user: -2",
            consequence: "你改了稀土的 case，又加了 50 条类似的拒答词。合规说「太零散了，不成体系，我们过不了。」果然，一周后 AI 在另一个偏门领域又编了新的数字。治标不治本。",
            whyThisScore: "补丁式修复在高可信领域等于没修。你堵了今天的洞，明天会从另一个地方冒出来。真正要做的是「系统性的机制」，不是「零散的黑名单」。合规要看的从来不是「这次有没有修」，而是「下次会不会再犯同类型的错」。"
          },
          {
            id: "h2-systematic",
            title: "B. 系统性四件套（推荐）",
            text: "在引用+置信度基础上，再加：①拒答链（具体推荐/超范围→引导转后台分析师+一键打电话）②心智教育（产品每屏反复提示「AI 是辅助不是结论」）③审计日志（每一条回答的模型版本+引用+时间戳存 180 天）④一键反馈（顾问点「这条不准」，自动进入优化队列）。",
            score: 96,
            stageEffect: "compliance: +3, team: +2, user: +3",
            consequence: "合规部门看完方案，第一次没打回——反而加了两条建议，都是怎么把日志做得更完整。陈姐说「转分析师的按钮是救命设计」，甚至主动提出营业部可以出 2 个人做第一批后台分析师。你发现——当你把「保护一线」而不是「方便产品部」放在第一位时，业务部门反而愿意配合。",
            whyThisScore: "这才是高可信领域 AI 产品的「完整形态」：①引用+置信度=让对的能被证明；②拒答+转人=让错的不会硬编；③心智教育=不让用户盲信；④日志+反馈=让每一次出错都变成下次不会错的燃料。这四件套不是加法，是乘法——缺了任何一块，可信度都会塌掉一半。"
          },
          {
            id: "h2-overcorrect",
            title: "C. 过度防御：AI 只能做总结不能给数字",
            text: "数字型问题全部拒绝，只给纯文字总结。把所有可能出错的地方都封死。",
            score: 58,
            stageEffect: "compliance: +3, team: -3, user: -2",
            consequence: "合规 100% 过了。但一周后，顾问的使用率从每天人均 12 次掉到了 1 次。「不能查数字，我用它干嘛？我自己 Wind 查得比它快。」产品成了摆设。",
            whyThisScore: "把能力砍掉 80% 换来 100% 不出事——合规安全了，但产品也死了。AI 产品的价值从来不是「完全不出错」，而是「出错的成本远小于创造的价值」。系统性机制（方案B）能把出错率压到 0.1% 以下，同时保留 70% 以上的价值。过度防御，是在用「产品的命」换「我不挨骂」。不应该。"
          }
        ]
      },
      {
        index: 2,
        actLabel: "第三幕 · 终局复盘",
        timeMarker: "一个月后 · 营业部全员会",
        stageTitle: "陈姐在 30 个理财顾问面前，用 3 分钟定义了你的产品",
        context:
          "经过两轮迭代，AI 助手稳定运行了一个月。总行合规通过了，营业部使用率稳定在人均每天 8-10 次，「转分析师」通道每周消化 40-50 个复杂问题。\n\n今天是月度全员会，陈姐最后一个上台。她没说业绩，没说 KPI，打开了一个 PPT——\n\n上面只有三行字：\n\n第一行：以前，我们查一个数字要 10 分钟；现在 10 秒。\n\n第二行：以前，我们不确定的时候会硬答；现在，AI 会说不知道，我们也敢说不知道。\n\n第三行：今天下午有个客户跟我说——「你们不会不懂装懂，这点我很认可。」\n\n她转向你：「产品同学，你这个东西最大的价值，不是省了多少时间。是让我的团队，终于敢在客户面前说实话了。」",
        question: "作为 AI 产品经理，写下你从这个项目里提炼的一条方法论。",
        constraints: ["作为你自己的职业复盘，你写下来的东西，下次会用得上。"],
        choices: [
          {
            id: "h3-final",
            title: "开始写方法论总结",
            text: "把三次决策串成一句话，进入最终批改模式。",
            score: 82,
            whyThisScore: "方法论不是写在 PPT 里的空话，是摔过三次跤后，刻在你骨子里的判断。你今天学到的「可信比全能重要、机制比模型重要、保护一线比好看的数字重要」——这三条，下次你去做医疗 AI、法律 AI、教育 AI，每一个高可信领域，都会用得上。",
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

const state = {
  selectedScenarioId: scenarios[0].id,
  selectedChoiceId: null,
  currentStageIndex: 0,
  stageChoices: {},
  stageHistory: [],
  currentStageConsequenceShown: false,
  draftAnswers: {},
  progress: loadJson("ai-pm-sandbox-progress", {}),
  config: loadJson("ai-pm-sandbox-config", {}),
  theme: loadJson("ai-pm-sandbox-theme", "light")
};

const els = {};

function initEls() {
  const ids = [
    "viewTitle", "missionList", "missionLevel", "missionTitle",
    "stageIndicator", "stageActLabel", "stageTimeMarker", "stageTitle",
    "prevStageSummary", "missionContext", "missionQuestion", "missionStatus",
    "constraints", "answerInput", "answerCount",
    "coachButtons", "choiceGrid", "confirmChoiceButton", "consequenceBox", "nextStageButton",
    "scorePanel", "scoreHeadline", "scoreValue",
    "scoreBreakdown", "feedbackText", "xpLabel", "xpBar", "rankLabel", "rankHint",
    "stackGrid", "stackScenarioTitle", "stackScenarioContext", "backToMissionButton",
    "scenarioStackLink", "portfolioList", "dispatchForm", "senderName", "channelSelect",
    "webhookFields", "dispatchNote", "includeRubric", "rememberConfig",
    "previewDialog", "previewContent", "toast", "themeToggle", "helpButton",
    "helpDialog", "closeHelpButton", "closePreviewButton", "resetButton",
    "scoreButton", "shareCardButton",
    "shareScoreCardButton", "dryRunButton", "prevMission", "nextMission",
    "exportMdButton", "exportHtmlButton", "shareDialog", "shareDialogTitle",
    "shareCardContainer", "closeShareButton", "downloadShareCard", "copyShareHtml",
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

function saveProgress() {
  saveJson("ai-pm-sandbox-progress", state.progress);
}

function getScenario() {
  return scenarios.find((scenario) => scenario.id === state.selectedScenarioId) || scenarios[0];
}

function getScenarioIndex() {
  return scenarios.findIndex((s) => s.id === state.selectedScenarioId);
}

function gotoScenario(delta) {
  const idx = getScenarioIndex();
  const nextIdx = (idx + delta + scenarios.length) % scenarios.length;
  state.selectedScenarioId = scenarios[nextIdx].id;
  resetStageProgress();
  renderScenario();
  renderMissionList();
  showToast(`${delta > 0 ? "下一关" : "上一关"}：${scenarios[nextIdx].title}`);
}

function getCompleted() {
  return Object.values(state.progress).filter(Boolean);
}

function getXp() {
  return getCompleted().reduce((sum, item) => sum + (item.xp || 0), 0);
}

function showToast(message) {
  els.toast.textContent = message;
  els.toast.classList.add("is-visible");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => els.toast.classList.remove("is-visible"), 3200);
}

function updateAnswerCount() {
  const length = els.answerInput.value.trim().length;
  if (RECOMMENDED_ANSWER_LENGTH > 0) {
    els.answerCount.textContent = `${length} / ${RECOMMENDED_ANSWER_LENGTH} 字${length === 0 ? "（可选，只选方案也可以）" : ""}`;
    els.answerCount.classList.toggle("is-ready", length >= RECOMMENDED_ANSWER_LENGTH);
  } else {
    els.answerCount.textContent = `${length} 字（文字可选）`;
    els.answerCount.classList.toggle("is-ready", false);
  }
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
  const choiceTitle = choice ? choice.title : "推荐方案";
  return [
    {
      label: "一句话理由",
      text: `我会选「${choiceTitle}」，因为它能先控制风险范围又能推动事情落地。我最担心的风险是：`
    },
    {
      label: "补边界和兜底",
      text: "我会先画清楚 AI / 人的分工边界——哪些是 AI 独立做的，哪些必须人确认；出了问题第一时间有兜底熔断方案。"
    },
    {
      label: "补评测指标",
      text: "上线前先拿 30-50 条真实场景跑黄金评测集，核心维度（准确率/引用正确率/拒答率/接管率）过了红线再放。"
    },
    {
      label: "补灰度和复盘",
      text: "先 5% 灰度跑一周，每天盯核心指标，出问题秒级回滚；每周沉淀失败案例库，下次上线不再犯同样的错。"
    }
  ];
}

function insertAnswerText(text) {
  const current = els.answerInput.value.trim();
  els.answerInput.value = current ? `${current}\n${text}` : text;
  els.answerInput.focus();
  updateAnswerCount();
}

function renderProgress() {
  const xp = getXp();
  const level = Math.max(1, Math.floor(xp / 220) + 1);
  const pct = Math.min(100, Math.round(((xp % 220) / 220) * 100));
  els.xpLabel.textContent = `${xp} XP`;
  els.rankLabel.textContent = `Level ${level}`;
  els.xpBar.style.width = `${pct}%`;
  els.rankHint.textContent =
    xp >= 600 ? "你已经有一套像样的 AI PM 作品集骨架。" : "完成关卡会增加 XP，并生成复盘卡片。";
}

function renderMissionList() {
  els.missionList.innerHTML = scenarios
    .map((scenario) => {
      const done = state.progress[scenario.id];
      const selected = scenario.id === state.selectedScenarioId ? " is-selected" : "";
      const genre = scenario.genre ? `<span class="mission-genre">${escapeHtml(scenario.genre)}</span>` : "";
      return `
        <button class="mission-card${selected}" data-scenario-id="${scenario.id}">
          <p class="eyebrow">${escapeHtml(scenario.level)}</p>
          <h3>${escapeHtml(scenario.title)}</h3>
          <p>${escapeHtml(scenario.summary)}</p>
          ${genre}
          <div class="card-meta">
            <span>${scenario.xp} XP</span>
            <span>${done ? `已完成 ${escapeHtml(done.score)}` : scenario.totalStages ? `${scenario.totalStages} 幕剧情` : "待挑战"}</span>
          </div>
        </button>
      `;
    })
    .join("");
}

function renderScenario() {
  const scenario = getScenario();
  const completed = state.progress[scenario.id];
  const isStory = isStoryScenario(scenario);

  els.missionLevel.textContent = scenario.level;
  els.missionTitle.textContent = scenario.title;
  els.missionStatus.textContent = completed ? `已完成 ${completed.score}` : "待挑战";

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
  const consequenceShown = state.currentStageConsequenceShown && choice;
  const isLastStage = stage.index >= scenario.stages.length - 1;
  const isFinalChoice = choice && choice.isFinal;

  if (els.stageIndicator) {
    const dots = Array.from({ length: total }, (_, i) => {
      const status = i < state.currentStageIndex ? "done" : i === state.currentStageIndex ? "active" : "todo";
      return `<span class="stage-dot is-${status}"></span>`;
    }).join("");
    els.stageIndicator.innerHTML = `${dots}<span class="stage-text">第 ${stage.index + 1} / ${total} 幕</span>`;
  }
  if (els.stageActLabel) els.stageActLabel.textContent = stage.actLabel || "";
  if (els.stageTimeMarker) els.stageTimeMarker.textContent = stage.timeMarker || "";
  if (els.stageTitle) els.stageTitle.textContent = stage.stageTitle || scenario.title;

  if (els.prevStageSummary) {
    const prevSummary = state.stageHistory.length > 0 ? state.stageHistory[state.stageHistory.length - 1]?.consequence : "";
    if (prevSummary) {
      els.prevStageSummary.hidden = false;
      els.prevStageSummary.textContent = `⏪ 上一幕结果：${prevSummary}`;
    } else {
      els.prevStageSummary.hidden = true;
    }
  }

  const contextText = getContextForStage(scenario, stage);
  els.missionContext.textContent = contextText;
  els.missionQuestion.textContent = stage.question || scenario.question;
  els.constraints.innerHTML = (stage.constraints || scenario.constraints || [])
    .map((item) => `<span class="constraint">${escapeHtml(item)}</span>`).join("");

  els.answerInput.value = completed?.answer ?? state.draftAnswers[scenario.id] ?? "";
  updateAnswerCount();
  els.coachButtons.innerHTML = getCoachPrompts(scenario)
    .map(
      (prompt, index) => `
        <button class="coach-button" type="button" data-coach-index="${index}">
          ${escapeHtml(prompt.label)}
        </button>
      `
    )
    .join("");

  els.choiceGrid.innerHTML = stage.choices
    .map((c, idx) => {
      const selected = choice && c.id === choice.id ? " is-selected" : "";
      const letter = String.fromCharCode(65 + idx);
      return `
        <button class="choice-card${selected}" data-choice-id="${c.id}" data-choice-index="${idx}" data-stage-index="${stage.index}">
          <div class="choice-number">${letter}</div>
          <strong>${escapeHtml(c.title)}</strong>
          <span>${escapeHtml(c.text)}</span>
        </button>
      `;
    })
    .join("");

  if (els.consequenceBox) {
    if (consequenceShown && choice && choice.consequence) {
      els.consequenceBox.hidden = false;
      els.consequenceBox.innerHTML = `
        <div class="consequence-head">📜 剧情分支结果</div>
        <div class="consequence-body">${escapeHtml(choice.consequence)}</div>
      `;
    } else {
      els.consequenceBox.hidden = true;
      els.consequenceBox.innerHTML = "";
    }
  }

  if (els.nextStageButton) {
    if (consequenceShown && !isLastStage) {
      els.nextStageButton.hidden = false;
      els.nextStageButton.textContent = `进入下一幕 →  ${stage.index + 2 < total ? scenario.stages[stage.index + 1].actLabel.split(" · ")[1] || "" : ""}`;
    } else if (consequenceShown && (isLastStage || isFinalChoice)) {
      els.nextStageButton.hidden = false;
      els.nextStageButton.textContent = "📝 写复盘总结 · 拿最终批改";
    } else {
      els.nextStageButton.hidden = true;
    }
  }

  if (els.confirmChoiceButton) {
    const choiceIndex = choice ? stage.choices.findIndex((item) => item.id === choice.id) : -1;
    els.confirmChoiceButton.hidden = !choice || consequenceShown;
    els.confirmChoiceButton.textContent = choiceIndex >= 0
      ? `确认选择 ${String.fromCharCode(65 + choiceIndex)} · 看剧情结果`
      : "确认这个决定";
  }

  const showScoreButton = (isLastStage || isFinalChoice) && consequenceShown;
  if (els.scoreButton) {
    els.scoreButton.hidden = !showScoreButton;
  }
  if (els.shareCardButton) {
    els.shareCardButton.hidden = !consequenceShown || showScoreButton;
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
    showToast("📝 最后一步：写下你的复盘总结，就能拿到完整批改啦～");
    return;
  }

  state.currentStageIndex = Math.min(scenario.stages.length - 1, state.currentStageIndex + 1);
  state.currentStageConsequenceShown = false;
  renderScenario();
  showToast(`🎬 ${scenario.stages[state.currentStageIndex].actLabel}`);
}

function handleStageChoiceSelect(stageIndex, choiceId) {
  const scenario = getScenario();
  const stage = scenario.stages[stageIndex];
  if (!stage) return;
  const choice = stage.choices.find((c) => c.id === choiceId);
  if (!choice) return;

  state.stageChoices[`${scenario.id}-s${stageIndex}`] = choiceId;
  state.currentStageConsequenceShown = false;

  state.stageHistory = state.stageHistory.filter((h) => h.stageIndex !== stageIndex);

  renderScenario();
}

function confirmStageChoice() {
  const scenario = getScenario();
  const stage = getCurrentStage(scenario);
  const choice = getSelectedChoiceForStage(stage);
  if (!stage || !choice) {
    showToast("请先选择一个方案");
    return;
  }

  state.currentStageConsequenceShown = true;
  state.stageHistory = state.stageHistory.filter((h) => h.stageIndex !== stage.index);
  state.stageHistory.push({
    stageIndex: stage.index,
    choiceId: choice.id,
    choiceTitle: choice.title,
    consequence: choice.consequence || ""
  });

  renderScenario();
}

function getAverageChoiceScore(scenario = getScenario()) {
  if (!isStoryScenario(scenario)) {
    const c = getSelectedChoice(scenario);
    return c ? c.score : 50;
  }
  const scores = scenario.stages
    .map((s) => getSelectedChoiceForStage(s)?.score || 50)
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
      if (!c || !c.whyThisScore) return null;
      return { act: s.actLabel, title: c.title, why: c.whyThisScore };
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
        const relatedScenarios = scenarios.filter((scenario) =>
          (scenarioStackMap[scenario.id] || []).includes(item.key)
        );
        return `
      <article class="stack-card${isRelated ? " is-related" : ""}" data-stack-key="${item.key}">
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
  const completed = getCompleted();
  if (!completed.length) {
    els.portfolioList.innerHTML = `
      <article class="portfolio-card empty">
        <div class="empty-emoji">🎯</div>
        <h4>还没有作品</h4>
        <p>完成任意关卡后，这里会出现你的 AI PM 判断记录、分数和可改进方向。</p>
        <p class="empty-hint">小提示：点击顶部「关卡」视图开始闯关，或按 <kbd>Alt</kbd>+<kbd>1</kbd> 切换。</p>
      </article>
    `;
    return;
  }

  els.portfolioList.innerHTML = completed
    .map((item) => {
      const scenario = scenarios.find((entry) => entry.id === item.scenarioId);
      const review = item.review || {};
      const dimensions = review.dimensions || [];
      return `
        <article class="portfolio-card">
          <div class="portfolio-card-header">
            <div>
              <p class="eyebrow">${escapeHtml(scenario?.level || "Mission")}</p>
              <h4>${escapeHtml(scenario?.title || "AI PM Challenge")}</h4>
            </div>
            <div class="portfolio-score-badge">${escapeHtml(item.score)}<span>/100</span></div>
          </div>
          <p>${escapeHtml(item.answer.slice(0, 260))}${item.answer.length > 260 ? "..." : ""}</p>
          ${
            dimensions.length
              ? `<div class="portfolio-dimensions">${dimensions
                  .map(
                    (d) =>
                      `<span class="dim-tag" style="--v:${Math.min(100, (d.value / 20) * 100)}%">${d.name} ${d.value}</span>`
                  )
                  .join("")}</div>`
              : ""
          }
          <div class="portfolio-meta">
            <span>${escapeHtml(item.xp)} XP</span>
            <span>${escapeHtml(item.choiceTitle) || "剧情闯关"}</span>
          </div>
        </article>
      `;
    })
    .join("");
}

function scoreText(answer, scenario = getScenario()) {
  const normalized = answer.toLowerCase();
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

  const dimensionScores = dimensions.map((dimension) => {
    const genericHits = dimension.keywords.filter((word) => normalized.includes(word)).length;
    const scenarioBonus = posSignals.filter((w) => dimension.keywords.some((k) => w.includes(k) || k.includes(w))).length;
    const hits = genericHits + scenarioBonus;
    const penalty = negSignals.length > 0 && genericHits === 0 ? -3 : 0;
    return {
      name: dimension.name,
      value: Math.max(2, Math.min(20, 6 + hits * 4 + (answerLength >= 80 ? 2 : 0) + penalty))
    };
  });

  const rubricTotal = dimensionScores.reduce((sum, item) => sum + item.value, 0) / dimensions.length;
  const avgChoiceScore = getAverageChoiceScore(scenario);
  const choiceWeight = avgChoiceScore * 0.44;
  const textWeight = rubricTotal * 2;
  const signalBonus = Math.min(8, posSignals.length * 0.5);
  const finalScore = Math.max(10, Math.min(100, Math.round(choiceWeight + textWeight + lengthScore + signalBonus - negSignals.length * 2)));

  const highlights = [];
  const gaps = [];
  const nextActions = [];

  if (posSignals.length > 0) {
    const picked = posSignals.slice(0, 4);
    highlights.push(`✅ 你的答案覆盖了这些关键信号词：${picked.map((s) => `「${s}」`).join("、")}，这是非常好的 AI PM 意识。`);
  }
  dimensionScores.forEach((d) => {
    if (d.value >= 17) highlights.push(`✅ 「${d.name}」维度拿到 ${d.value}/20，框架感不错。`);
    if (d.value < 14) gaps.push(`⚠️ 「${d.name}」维度只有 ${d.value}/20，明显需要补强。`);
  });
  if (negSignals.length > 0) {
    gaps.push(`⚠️ 出现了几个值得警觉的措辞：${negSignals.map((s) => `「${s}」`).join("、")}，实际工作中这往往意味着风险边界没画清楚。`);
  }
  if (answerLength < 40) {
    gaps.push("⚠️ 答案写得比较短，下一次试试把「为什么做这个 trade-off」展开写一两句——不用长，但要有逻辑链。");
  }

  const weakDim = dimensionScores.slice().sort((a, b) => a.value - b.value)[0];
  if (weakDim) nextActions.push(`🎯 第一步：先把「${weakDim.name}」这一维提到 15/20。给你一个写作提示：下次写答案先把这一维的关键词（比如「${dimensions.find((d) => d.name === weakDim.name)?.keywords[0] || ""}」）融入方案开头。`);
  if (posSignals.length < 3) {
    nextActions.push("🎯 第二步：用评审标准卡你的答案。上面的「专家观点 5 条」就是最好的 checklist——每写完一条答案，对着 5 条过一遍，缺哪条补一句，哪条写得具体就再多展开半句。");
  }
  if (avgChoiceScore < 70) {
    nextActions.push("🎯 剧本选择偏保守 / 偏激进可以再调整。下一关注意：凡是没有边界、没有兜底、没有人工确认的方案，通常都是高风险——现实职场里，稳的方案比炫的方案走得远。");
  }
  while (nextActions.length > 3) nextActions.pop();

  const choiceExplanations = getAllChoiceExplanations(scenario);

  let summary;
  if (finalScore >= 88) {
    summary = "非常棒的判断！你在「要不要上、怎么上、上了出事怎么办」三个层面都有了结构化思考。如果把这套方法论记录下来，下次遇到类似的 AI 产品立项，你就不是拍脑袋——而是在调用自己的决策模型。";
  } else if (finalScore >= 72) {
    summary = "方向正确，有核心判断。再打磨打磨：每次写完答案，多问自己两句「出了最坏的情况我怎么兜底？」「这个方案我能拿出什么数据证明它真的 work？」——分数立刻就上来了。";
  } else if (finalScore >= 55) {
    summary = "已经拿到基础分啦，说明核心方向没歪。你现在差的不是「选对方案」，而是「把方案为什么对、哪里有风险、出了事怎么办」这三件套写完整。再补 2-3 句，就是一份合格的 AI PM 判断。";
  } else {
    summary = "这次先拿 warm-up 分，不要灰心～ 新手期最容易踩的坑，是把「AI 很强」当成默认前提。你试试下次先从「AI 这件事一定会出错，出了错我怎么兜」开始倒推设计方案，视角就会立刻不一样。";
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
    feedback: summary
  };
}

function showScore(review, animate = true) {
  els.scorePanel.hidden = false;
  els.scoreHeadline.textContent = review.score >= 85 ? "判断力很强" : review.score >= 70 ? "方向正确" : review.score >= 55 ? "继续打磨" : "先拿基础分";
  els.scoreValue.textContent = review.score;
  els.feedbackText.textContent = review.feedback;
  els.scoreBreakdown.innerHTML = review.dimensions
    .map(
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
    .join("");

  const structuredHtml = `
    ${review.character ? `<div class="critic-card"><div class="critic-avatar">🎙️</div><div class="critic-body"><div class="critic-name">${escapeHtml(review.character)}</div><div class="critic-question">${escapeHtml(review.criticQuestion)}</div></div></div>` : ""}
    ${
      review.evaluationCriteria && review.evaluationCriteria.length
        ? `<div class="expert-criteria-box"><div class="expert-title">🔍 专家观点 · 评审 5 条标准</div>${review.evaluationCriteria
            .map((c) => `<div class="expert-line">${escapeHtml(c)}</div>`)
            .join("")}</div>`
        : ""
    }
    ${
      review.choiceExplanations && review.choiceExplanations.length
        ? `<div class="choice-explanation-wrapper"><div class="choice-explanation-title">📖 为什么你选的方案拿这个分？</div>${review.choiceExplanations
            .map(
              (e) => `<div class="choice-explanation-item"><div class="choice-explanation-head">${
                e.act ? `<span class="choice-explanation-act">${escapeHtml(e.act)}</span>` : ""
              }<span>${escapeHtml(e.title)}</span></div><div class="choice-explanation-body">${escapeHtml(e.why)}</div></div>`
            )
            .join("")}</div>`
        : ""
    }
    <div class="highlights-gaps-next">
      ${
        review.highlights && review.highlights.length
          ? `<div class="hg-column highlights">
              <div class="hg-title">✅ 已经做到的亮点</div>
              ${review.highlights.map((h) => `<div class="hg-item">${escapeHtml(h).replace(/^✅\s*/, "")}</div>`).join("")}
            </div>`
          : ""
      }
      ${
        review.gaps && review.gaps.length
          ? `<div class="hg-column gaps">
              <div class="hg-title">⚠️ 还暴露的差距</div>
              ${review.gaps.map((g) => `<div class="hg-item">${escapeHtml(g).replace(/^⚠️\s*/, "")}</div>`).join("")}
            </div>`
          : ""
      }
      ${
        review.nextActions && review.nextActions.length
          ? `<div class="hg-column next-actions">
              <div class="hg-title">🎯 具体下一步提升建议</div>
              ${review.nextActions.map((n) => `<div class="hg-item">${escapeHtml(n).replace(/^🎯\s*/, "")}</div>`).join("")}
            </div>`
          : ""
      }
    </div>
  `;

  const existingStructured = els.scorePanel.querySelector(".structured-review");
  if (existingStructured) existingStructured.remove();
  const feedbackBox = els.scorePanel.querySelector(".feedback-box");
  if (feedbackBox) {
    const wrapper = document.createElement("div");
    wrapper.className = "structured-review";
    wrapper.innerHTML = structuredHtml;
    feedbackBox.parentNode.insertBefore(wrapper, feedbackBox.nextSibling);
  }

  if (animate) {
    els.scorePanel.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }
}

function submitScore() {
  const scenario = getScenario();
  if (isStoryScenario(scenario)) {
    const stage = getCurrentStage(scenario);
    const choice = getSelectedChoiceForStage(stage);
    const canSubmit = choice && state.currentStageConsequenceShown &&
      (stage.index >= scenario.stages.length - 1 || choice.isFinal);
    if (!canSubmit) {
      showToast("请先完成当前剧情选择，走到终局后再拿完整批改～");
      return;
    }
  }
  let answer = els.answerInput.value.trim();
  const finalChoiceTitle = isStoryScenario(scenario)
    ? `剧情闯关：${getTotalStages(scenario)} 幕完成`
    : getSelectedChoice(scenario).title;

  if (answer.length < RECOMMENDED_ANSWER_LENGTH) {
    if (answer.length === 0) {
      answer = `（剧情闯关总结）走完了 ${getTotalStages(scenario)} 幕剧本，核心 trade-off 是在「上线效率」和「风险/信任」之间找平衡。`;
      showToast(`💡 没写复盘总结也可以～先拿基础分，下次写点自己的方法论会更精准哦`);
    } else {
      showToast(`💡 再写多一点（推荐 ${RECOMMENDED_ANSWER_LENGTH} 字），评分会更准哦`);
    }
  }

  const review = scoreText(answer, scenario);
  const xp = review.score >= 85 ? scenario.xp : review.score >= 70 ? Math.round(scenario.xp * 0.8) : Math.round(scenario.xp * 0.6);

  state.progress[scenario.id] = {
    scenarioId: scenario.id,
    scenario: { title: scenario.title, level: scenario.level },
    answer,
    choiceId: state.selectedChoiceId,
    choiceTitle: finalChoiceTitle,
    score: review.score,
    xp,
    review,
    finishedAt: new Date().toISOString()
  };

  saveProgress();
  delete state.draftAnswers[scenario.id];
  renderProgress();
  renderMissionList();
  renderPortfolio();
  showScore(review);
  showToast(`🎉 已获得 ${xp} XP！${review.score >= 85 ? "优秀！" : review.score >= 70 ? "不错～" : review.score >= 55 ? "加油打磨～" : "下次会更好～"}`);
}

function resetStageProgress() {
  const scenario = getScenario();
  Object.keys(state.stageChoices).forEach((k) => {
    if (k.startsWith(`${scenario.id}-s`)) delete state.stageChoices[k];
  });
  state.stageHistory = [];
  state.currentStageIndex = 0;
  state.currentStageConsequenceShown = false;
  state.selectedChoiceId = null;
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
    showToast("当前浏览器不支持语音输入，试试 Chrome 或 Edge 浏览器吧");
    return;
  }

  if (isListening) {
    speechRecognition.stop();
    return;
  }

  speechRecognition.start();
  isListening = true;
  button.classList.add("is-listening");
  showToast("🎤 正在聆听... 说话吧，说完会自动停止");

  speechRecognition.onresult = (event) => {
    let transcript = "";
    for (let i = event.resultIndex; i < event.results.length; i++) {
      transcript += event.results[i][0].transcript;
    }
    if (transcript) {
      const current = els.answerInput.value;
      els.answerInput.value = current ? `${current}\n${transcript}` : transcript;
      updateAnswerCount();
    }
  };

  speechRecognition.onerror = (event) => {
    isListening = false;
    button.classList.remove("is-listening");
    if (event.error === "not-allowed") {
      showToast("🎤 麦克风权限被拒绝了，请在浏览器里允许麦克风访问");
    } else if (event.error !== "no-speech") {
      showToast(`🎤 语音识别出错：${event.error}`);
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
  });
  document.querySelectorAll(".view").forEach((section) => {
    section.classList.toggle("is-visible", section.id === `${view}View`);
  });

  const titles = {
    missions: "从真实 AI 产品判断题开始",
    stack: "AI 产品经理需要听懂的技术栈",
    dispatch: "把题目推到你自己的微信 / 飞书刷题",
    portfolio: "你的 AI PM 作品集"
  };
  els.viewTitle.textContent = titles[view] || titles.missions;
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
    scenario
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

function buildShareCardHtml({ type, scenario, choice, answer, review, xp }) {
  const bg = type === "score"
    ? "linear-gradient(135deg,#0f172a 0%,#1e3a5f 50%,#1f7a5c 100%)"
    : "linear-gradient(135deg,#18211f 0%,#1f7a5c 50%,#2f6f9f 100%)";
  const score = review?.score || 0;
  const headline = score >= 85 ? "判断力很强" : score >= 70 ? "方向正确" : "持续练习";
  const dimensions = review?.dimensions || [];

  const isDark = state.theme === "dark";
  const cardBg = isDark ? "#1a1a2e" : "#fffdf8";
  const textColor = isDark ? "#fffdf8" : "#18211f";
  const subTextColor = isDark ? "#a0a8b3" : "#65716d";

  return `
<div style="width:480px;padding:36px;background:${cardBg};color:${textColor};font-family:-apple-system,'PingFang SC',sans-serif;box-sizing:border-box;border-radius:20px;box-shadow:0 30px 80px rgba(0,0,0,.25);">
  <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:28px;">
    <div style="display:flex;align-items:center;gap:12px;">
      <div style="width:44px;height:44px;border-radius:12px;background:${bg};display:flex;align-items:center;justify-content:center;color:#fff;font-weight:900;">AI</div>
      <div>
        <div style="font-size:11px;font-weight:800;color:#1f7a5c;letter-spacing:1px;text-transform:uppercase;">AI PM Sandbox</div>
        <div style="font-size:18px;font-weight:900;">${type === "score" ? "闯关成绩单" : "我的产品判断"}</div>
      </div>
    </div>
    ${type === "score" ? `<div style="text-align:right;"><div style="font-size:56px;font-weight:900;line-height:1;color:#1f7a5c;">${score}</div><div style="font-size:12px;color:${subTextColor};">/ 100 分 · ${xp || 0} XP</div></div>` : ""}
  </div>
  <div style="padding:18px;border-radius:12px;background:rgba(31,122,92,0.08);border:1px solid rgba(31,122,92,0.2);margin-bottom:20px;">
    <div style="font-size:11px;color:#1f7a5c;font-weight:800;margin-bottom:6px;">${scenario?.level || ""} · 决策场景</div>
    <div style="font-size:20px;font-weight:900;line-height:1.4;margin-bottom:8px;">${scenario?.title || ""}</div>
    <div style="font-size:13px;color:${subTextColor};line-height:1.6;">${scenario?.question || ""}</div>
  </div>
  ${choice ? `<div style="display:inline-block;padding:8px 14px;border-radius:999px;background:rgba(47,111,159,0.12);color:#2f6f9f;font-size:13px;font-weight:800;margin-bottom:16px;">✓ 我的方案：${choice}</div>` : ""}
  ${answer ? `<div style="font-size:14px;line-height:1.75;color:${textColor};opacity:.9;margin-bottom:18px;white-space:pre-wrap;display:-webkit-box;-webkit-line-clamp:6;-webkit-box-orient:vertical;overflow:hidden;">${escapeHtml(answer)}</div>` : ""}
  ${
    type === "score" && dimensions.length
      ? `<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:16px;">
        ${dimensions
          .slice(0, 4)
          .map(
            (d) => `<div style="padding:8px 12px;border-radius:8px;background:rgba(0,0,0,0.04);display:flex;justify-content:space-between;align-items:center;">
              <span style="font-size:12px;color:${subTextColor};">${d.name}</span>
              <strong style="font-size:13px;color:#1f7a5c;">${d.value}${"/20"}</strong>
            </div>`
          )
          .join("")}
      </div>
      <div style="padding:12px 16px;border-radius:10px;background:linear-gradient(90deg,rgba(31,122,92,0.12),rgba(47,111,159,0.12));border-left:3px solid #c9992d;">
        <div style="font-size:11px;font-weight:800;color:#7a5b14;margin-bottom:4px;">💡 评价 · ${headline}</div>
        <div style="font-size:13px;line-height:1.6;color:${textColor};opacity:.85;">${review?.feedback || ""}</div>
      </div>`
      : ""
  }
  <div style="margin-top:24px;padding-top:18px;border-top:1px dashed rgba(0,0,0,0.1);display:flex;justify-content:space-between;align-items:center;">
    <div style="font-size:11px;color:${subTextColor};">@ 判断力训练场 · ai-pm-sandbox</div>
  </div>
</div>`;
}

async function exportPortfolio(format = "markdown") {
  const completed = getCompleted().map((item) => {
    const scenario = scenarios.find((s) => s.id === item.scenarioId);
    return { ...item, scenario };
  });

  if (!completed.length) {
    showToast("还没有作品哦，先去闯关吧～");
    return;
  }

  showToast(`⏳ 正在生成 ${format.toUpperCase()} 作品集...`);

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
    showToast(`✅ 作品集已导出：${result.filename}`);
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
      showToast("先获取评分，才能生成分数卡片哦～");
      return;
    }
    html = buildShareCardHtml({
      type: "score",
      scenario: cardScenario,
      choice: choice?.title || completed.choiceTitle,
      answer: completed.answer,
      review: completed.review,
      xp: completed.xp
    });
  } else {
    html = buildShareCardHtml({
      type: "decision",
      scenario: cardScenario,
      choice: choice?.title || "",
      answer: els.answerInput.value.trim() || "(还没写答案呢，先写一句判断吧～)"
    });
  }

  els.shareDialogTitle.textContent = mode === "score" ? "📸 分数分享卡片" : "📸 方案分享卡片";
  els.shareCardContainer.innerHTML = html;
  els.shareCardContainer._rawHtml = html;
  els.shareDialog.showModal();
}

async function downloadShareCard() {
  const container = els.shareCardContainer.querySelector("div");
  if (!container) return;

  showToast("⏳ 正在生成图片...");

  const { width, height } = container.getBoundingClientRect();
  const scale = 2;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width * scale}" height="${height * scale}" viewBox="0 0 ${width} ${height}">
    <foreignObject width="100%" height="100%">
      <div xmlns="http://www.w3.org/1999/xhtml">${container.outerHTML}</div>
    </foreignObject>
  </svg>`;

  const img = new Image();
  const blob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
  const url = URL.createObjectURL(blob);

  img.onload = () => {
    const canvas = document.createElement("canvas");
    canvas.width = width * scale;
    canvas.height = height * scale;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = state.theme === "dark" ? "#1a1a2e" : "#fffdf8";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.scale(scale, scale);
    ctx.drawImage(img, 0, 0);
    URL.revokeObjectURL(url);

    canvas.toBlob((b) => {
      if (!b) {
        showToast("浏览器不支持 Canvas 导出，请使用「复制 HTML」功能");
        return;
      }
      const dl = document.createElement("a");
      dl.href = URL.createObjectURL(b);
      dl.download = `ai-pm-sandbox-${Date.now()}.png`;
      dl.click();
      URL.revokeObjectURL(dl.href);
      showToast("✅ 图片已下载");
    }, "image/png");
  };

  img.onerror = () => {
    URL.revokeObjectURL(url);
    showToast("生成失败，可以试试「复制 HTML」保存源码");
  };

  img.src = url;
}

function copyShareHtml() {
  const raw = els.shareCardContainer._rawHtml || els.shareCardContainer.innerHTML;
  const wrapper = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>AI PM Sandbox 分享卡片</title><body style="background:#f5f2eb;display:flex;justify-content:center;padding:40px 0;">${raw}</body></html>`;
  navigator.clipboard.writeText(wrapper).then(
    () => showToast("✅ HTML 已复制，粘贴到任意 .html 文件打开即可"),
    () => showToast("复制失败，可能是剪贴板权限问题")
  );
}

function bindKeyboard() {
  document.addEventListener("keydown", (e) => {
    if (e.target.matches("input, textarea, select")) {
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        e.preventDefault();
        submitScore();
      }
      return;
    }

    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      e.preventDefault();
      submitScore();
      return;
    }

    if (e.key === "?" || (e.shiftKey && e.key === "/")) {
      e.preventDefault();
      if (els.helpDialog.open) els.helpDialog.close();
      else els.helpDialog.showModal();
      return;
    }

    if (e.key.toLowerCase() === "d" && !e.ctrlKey && !e.metaKey) {
      e.preventDefault();
      toggleTheme();
      return;
    }

    if (e.key.toLowerCase() === "n") {
      e.preventDefault();
      gotoScenario(1);
      return;
    }
    if (e.key.toLowerCase() === "p") {
      e.preventDefault();
      gotoScenario(-1);
      return;
    }

    if (e.key.toLowerCase() === "e" && getCurrentView() === "portfolio") {
      e.preventDefault();
      exportPortfolio("markdown");
      return;
    }

    if (["1", "2", "3", "A", "B", "C", "a", "b", "c"].includes(e.key)) {
      e.preventDefault();
      const scenario = getScenario();
      if (isStoryScenario(scenario)) {
        const stage = getCurrentStage(scenario);
        if (!stage) return;
        let idx;
        if (["1","2","3"].includes(e.key)) idx = Number(e.key) - 1;
        else idx = e.key.toLowerCase().charCodeAt(0) - 97;
        const choice = stage.choices[idx];
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
    const card = event.target.closest("[data-scenario-id]");
    if (!card) return;
    state.selectedScenarioId = card.dataset.scenarioId;
    resetStageProgress();
    renderScenario();
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
    state.draftAnswers[state.selectedScenarioId] = els.answerInput.value;
    updateAnswerCount();
  });

  els.voiceButton?.addEventListener("click", toggleVoiceInput);

  els.scoreButton.addEventListener("click", submitScore);
  els.resetButton.addEventListener("click", () => {
    if (!confirm("确定重置所有闯关进度和 XP 吗？这个操作不能撤销哦。")) return;
    state.progress = {};
    saveProgress();
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
        showToast(result.note || "🎮 Demo 模式：已生成预览（未真正发送）");
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
    state.selectedScenarioId = button.dataset.stackScenarioId;
    resetStageProgress();
    renderScenario();
    renderStack();
    setView("missions");
    showToast(`已切换到关联关卡：${getScenario().title}`);
  });

  els.exportMdButton.addEventListener("click", () => exportPortfolio("markdown"));
  els.exportHtmlButton.addEventListener("click", () => exportPortfolio("html"));

  els.shareCardButton.addEventListener("click", () => openShareDialog("decision"));
  els.shareScoreCardButton.addEventListener("click", () => openShareDialog("score"));
  els.closeShareButton.addEventListener("click", () => els.shareDialog.close());
  els.downloadShareCard.addEventListener("click", downloadShareCard);
  els.copyShareHtml.addEventListener("click", copyShareHtml);
}

function init() {
  initEls();
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
  renderProgress();
  renderMissionList();
  renderScenario();
  renderStack();
  renderPortfolio();
  renderDispatchFields();
  bindEvents();
  bindKeyboard();
}

init();
