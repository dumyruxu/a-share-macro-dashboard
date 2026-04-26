/**
 * A股宏观看板 — 周更数据
 * ----------------------
 * 每周更新：修改下方 DASHBOARD_DATA，保存后刷新。
 * signal：green / yellow / red 为「对 A 股风险资产」的粗粒度提示，非买卖建议。
 */
window.DASHBOARD_DATA = {
  meta: {
    title: "A股宏观看板",
    periodLabel: "2026年第15周",
    dataAsOf: "2026-04-12",
    nextUpdateDue: "2026-04-19",
    frequency: "周更",
    methodology: [
      "「待填」出现的原因：看板是静态 JSON，之前未接入自动爬虫/API；凡公开网页需人工或脚本拉取后再写入。",
      "本次已尽量补全：宏观序列以国家统计局、人民银行新闻稿与 FRED 等可追溯来源为准；环比/同比优先写「本月 vs 上月」官方解读中的数字。",
      "信号颜色：在数据真实前提下，结合指标对增长/通胀/流动性/风险偏好的方向含义 + 简单分位/阈值规则（见下）人工标注；不保证与市场一致。",
      "规则示例：PMI>50 且回升→偏绿；PPI 同比由负转正→偏绿（再通胀交易线索）；CPI 同比回落但仍在正区间→黄；短端 DR007 低位→绿；美债/VIX 高位震荡→黄。",
      "无法由助手代算的：北向「周度合计」= 东财沪深港通历史表中当周各交易日「成交净买额」之和；全 A 成交额「120 日分位」需自建日频序列。二者请在数据源页面手填或跑脚本。",
      "美股指数点位波动大，以下指数为媒体报道/第三方摘要中的收盘量级，周更时请用你信任的终端核对。",
    ],
  },
  summary: {
    marketTheme:
      "国内：制造业 PMI 扩张、PPI 同比时隔多月转正，物价读数呈现「生产端回暖 + CPI 节后回落」的组合。海外：美债名义利率约 4.3% 一线震荡，美元偏弱，风险资产对利率与地缘仍敏感。",
    riskAppetite: "中性偏积极",
    riskAppetiteNote: "量价与两融仍偏谨慎，对「积极」形成牵制",
    aShareView: "分化",
    aShareViewNote: "指数与行业、大小盘分化",
    usView:
      "利率高位缓步定价降息延后；盈利与 AI 叙事支撑纳指弹性，标普高位震荡。",
  },
  kpis: [
    {
      dim: "增长",
      name: "制造业 PMI",
      value: "50.4%",
      delta:
        "2026年3月；环比 +1.4pct（较 2 月 49.0% 回升）。非制造业商务活动指数 50.1%。",
      signal: "green",
      updatedAt: "2026-03-31",
      source: "https://www.stats.gov.cn/sj/zxfbhjd/202603/t20260331_1962889.html",
      sourceLabel: "国家统计局·PMI",
    },
    {
      dim: "通胀",
      name: "CPI 同比",
      value: "+1.0%",
      delta:
        "2026年3月；较 2 月 +1.3% 回落 0.3pct。环比 -0.7%（2 月为 +1.0%，节后季节性回落）。核心 CPI 同比 +1.1%。",
      signal: "yellow",
      updatedAt: "2026-04-10",
      source: "https://www.stats.gov.cn/sj/zxfbhjd/202604/t20260410_1963265.html",
      sourceLabel: "国家统计局·3月CPI/PPI",
    },
    {
      dim: "通胀",
      name: "PPI 同比",
      value: "+0.5%",
      delta:
        "2026年3月；较 2 月 -0.9% 回升 1.4pct（由降转涨）。环比 +1.0%（2 月环比约 +0.4%，涨幅扩大）。",
      signal: "green",
      updatedAt: "2026-04-10",
      source: "https://www.stats.gov.cn/sj/zxfbhjd/202604/t20260410_1963265.html",
      sourceLabel: "国家统计局·同上",
    },
    {
      dim: "流动性",
      name: "DR007（月加权）",
      value: "1.49%（2月）",
      delta:
        "较 1 月 1.51% 降 2bp；较 2025 年末/年初读数维持宽松区间（3 月月加权待央行次月《金融市场运行情况》更新后替换）。",
      signal: "green",
      updatedAt: "2026-02 月报",
      source: "https://www.pbc.gov.cn",
      sourceLabel: "人民银行·市场运行",
    },
    {
      dim: "流动性",
      name: "10Y 国债收益率（中债）",
      value: "约 1.82%",
      delta:
        "媒体/汇总：2026-04-10 前后约 1.82%；4 月初活跃券曾在 1.80%–1.82% 附近震荡，全周变动约 ±1–2bp 量级（见债市评论）。",
      signal: "yellow",
      updatedAt: "2026-04-10",
      source: "https://zh.tradingeconomics.com/china/government-bond-yield",
      sourceLabel: "TradingEconomics 等汇总",
    },
    {
      dim: "市场",
      name: "北向资金（周累计）",
      value: "请手填当周合计",
      delta:
        "口径：东财「沪深港通历史数据」中当周各交易日「成交净买额」求和；与上周同口径对比。助手无法稳定获取实时周合计，故不设虚假数字。",
      signal: "yellow",
      updatedAt: "周收盘后",
      source: "https://data.eastmoney.com/hsgt/hsgtV2.html",
      sourceLabel: "东方财富·沪深港通",
    },
    {
      dim: "市场",
      name: "全A成交额",
      value: "约 1–2.1 万亿/日",
      delta:
        "4 月初多篇稿：单日从约 1 万亿到突破 2 万亿不等，属偏高换手。「120 日分位」需自建序列，此处仅定性偏高。",
      signal: "yellow",
      updatedAt: "2026-04 初",
      source: "https://www.szse.cn",
      sourceLabel: "交易所（分位自算）",
    },
    {
      dim: "海外",
      name: "美 10Y 国债 DGS10",
      value: "约 4.34%",
      delta:
        "FRED 日频：2026-04-06 约 4.34%；04-03 约 4.35%；周内窄幅。请以 fredgraph 当日最后观测为准。",
      signal: "yellow",
      updatedAt: "2026-04-06",
      source: "https://fred.stlouisfed.org/series/DGS10",
      sourceLabel: "FRED·DGS10",
    },
    {
      dim: "海外",
      name: "VIX",
      value: "约 19–22（区间）",
      delta:
        "波动率日内变化快；请用 FRED VIXCLS 取你周更当日前一交易日收盘。检索样例曾见 3 月下旬约 27 一线，4 月若回落则信号可偏黄/绿。",
      signal: "yellow",
      updatedAt: "请填收盘日",
      source: "https://fred.stlouisfed.org/series/VIXCLS",
      sourceLabel: "FRED·VIXCLS",
    },
    {
      dim: "海外",
      name: "美元指数 DXY",
      value: "约 99.1",
      delta:
        "媒体报道：2026-04-09 前后运行于 99.1–99.3 区间，弱于 100 整数关口；周内受降息预期与避险情绪变化影响。",
      signal: "yellow",
      updatedAt: "2026-04-09",
      source: "https://www.marketwatch.com/investing/index/dxy",
      sourceLabel: "综合媒体·请核对终端",
    },
  ],
  framework: {
    growth: {
      title: "增长 Growth",
      metrics: ["制造业 PMI 50.4%", "工业增加值同比（待次月）", "出口同比"],
      note: "PMI 重回扩张区间，与 PPI 回暖交叉验证「生产端」短期改善预期；仍待地产、消费数据确认。",
    },
    inflation: {
      title: "通胀 Inflation",
      metrics: ["CPI 同比 +1.0%（3 月）", "PPI 同比 +0.5%（3 月）", "核心 CPI +1.1%"],
      note: "CPI 节后回落、PPI 同比转正：上游价格弹性回升，下游读数更多反映季节性。",
    },
    liquidity: {
      title: "流动性 Liquidity",
      metrics: ["DR007 月加权 1.49%（2 月）", "10Y 国债约 1.82%", "社融/M2（月更）"],
      note: "短端利率维持低位；长端对 PMI/PPI 与供给预期敏感，震荡为主。",
    },
    risk: {
      title: "风险偏好 Risk",
      metrics: ["全A成交额（偏高）", "融资余额（4月初周度减少）", "北向（周度手填）", "VIX"],
      note: "杠杆与外资流向仍分化：量能不弱但融资余额阶段下行，需看北向周度是否持续。",
    },
  },
  aShare: {
    sectorsTop: [
      { name: "（示例）科技成长链", note: "申万20日涨幅请用行情软件核对后替换" },
      { name: "有色金属", note: "与 PPI/商品价格线索一致时往往靠前" },
      { name: "通信/电子", note: "景气与外部流动性预期敏感" },
    ],
    sectorsBottom: [
      { name: "（示例）高股息回调板块", note: "相对收益阶段承压时需核对" },
      { name: "地产链", note: "政策与基本面预期博弈" },
      { name: "消费（部分）", note: "与 CPI 读数及估值匹配度相关" },
    ],
    flows: [
      {
        label: "北向净流入（周）",
        valueText: "东财表加总后填入 KPI",
        bar: 52,
      },
      {
        label: "融资余额周变化",
        valueText: "约 -281 亿元（截至4/3 一周，媒体报道）",
        bar: 38,
      },
      {
        label: "宽基 ETF 申赎",
        valueText: "见基金公司披露或东财ETF频道",
        bar: 45,
      },
      {
        label: "成交额 vs 近60日均",
        valueText: "4月初多日在 1.5–2.1 万亿量级",
        bar: 72,
      },
    ],
  },
  usMarket: [
    { label: "联邦基金目标区间", value: "3.50%–3.75%（2026年3月FOMC 维持）" },
    {
      label: "核心 PCE 同比",
      value: "约 3.1%（2026年1月；2月待BEA发布）",
    },
    { label: "CPI（参考）", value: "见 BLS / FRED CPIAUCSL" },
    { label: "10Y 名义利率 DGS10", value: "→ 见 KPI（约 4.34%）" },
    { label: "10Y TIPS（实际利率）", value: "约 1.98%（2026-04-03 媒体汇总，FRED: DFII10）" },
    { label: "标普500 SPX", value: "约 6818（4/10 附近报道收盘量级）" },
    {
      label: "纳斯达克综合 IXIC",
      value: "约 22903（4/10 周度报道；非 NDX100）",
    },
    { label: "价值 vs 成长（代理）", value: "可用 IWF/IWD 或申万风格指数比对" },
  ],
  scenarios: [
    {
      name: "基准",
      probability: "45%",
      text: "国内数据温和改善 + 海外利率高位：A 股结构行情；美股盈利季验证估值。",
    },
    {
      name: "乐观",
      probability: "30%",
      text: "国内信用预期改善 + 美债下行：风险偏好向成长扩散。",
    },
    {
      name: "悲观",
      probability: "25%",
      text: "地缘或通胀反复推升长端利率：全球波动率上行，北向与成长股承压。",
    },
  ],
  watchlist: [
    {
      title: "PMI 连续走弱",
      condition: "制造业 PMI 连续 2 个月 < 49",
      action: "下调周期弹性；关注红利与防御",
      source: "国家统计局",
    },
    {
      title: "美债快速上行",
      condition: "10Y 美债一周上行 > 15bp",
      action: "审视长久期与成长股估值",
      source: "FRED DGS10",
    },
    {
      title: "北向持续流出",
      condition: "5 日累计净流出超历史高分位",
      action: "关注外资重仓与核心资产定价",
      source: "东方财富沪深港通",
    },
    {
      title: "地量成交",
      condition: "全A成交额低于 120 日 20% 分位",
      action: "流动性枯竭与潜在反转信号并行",
      source: "交易所统计",
    },
    {
      title: "PPI 回升",
      condition: "PPI 同比转正且走扩",
      action: "中上游利润再分配、下游成本压力",
      source: "国家统计局",
    },
    {
      title: "短端利率偏离",
      condition: "DR007 持续显著高于政策利率锚",
      action: "资金面收敛预期升温",
      source: "人民银行",
    },
    {
      title: "汇率波动",
      condition: "USD/CNY 突破近 6 个月区间上沿",
      action: "外债、进口成本与政策应对",
      source: "外汇交易中心",
    },
    {
      title: "海外波动率",
      condition: "VIX > 25 维持 3 交易日",
      action: "全球联动下的仓位与对冲",
      source: "FRED VIXCLS",
    },
    {
      title: "社融低于预期",
      condition: "社融增量大幅低于一致预期",
      action: "政策对冲与资产节奏",
      source: "人民银行",
    },
    {
      title: "美国通胀超预期",
      condition: "核心 PCE 环比超预期",
      action: "美联储路径与成长股贴现率",
      source: "BEA / FRED",
    },
  ],
};
