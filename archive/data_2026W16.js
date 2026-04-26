/**
 * A股宏观看板 — 周更数据
 * ----------------------
 * 每周更新：修改下方 DASHBOARD_DATA，保存后刷新。
 * signal：green / yellow / red 为「对 A 股风险资产」的粗粒度提示，非买卖建议。
 * 存档：历史版本见 archive/ 目录。
 */
window.DASHBOARD_DATA = {
  meta: {
    title: "A股宏观看板",
    periodLabel: "2026年第16周",
    dataAsOf: "2026-04-19",
    nextUpdateDue: "2026-04-26",
    frequency: "周更",
    methodology: [
      "本周核心叙事：美国对华关税升至 145%，中国对美反制至 125%，贸易战全面升级；全球市场剧烈波动后有所企稳。",
      "宏观月频数据（PMI/CPI/PPI/社融）无新发布，沿用3月/4月初读数；下一批月频数据预计4月下旬至5月初陆续公布。",
      "市场数据（指数/VIX/DXY/美债）反映截至4月18日盘后或4月19日早间可得数据，波动大，请以你信任的终端核对。",
      "信号颜色规则：PMI>50→绿；PPI转正→绿；CPI温和正区间→黄；短端低位→绿；长端震荡→黄；VIX>25→红；美债>4.5%→红；DXY弱势→黄（对A股有利有弊）。",
      "北向资金与全A成交额「分位」需自建日频序列或查东财数据中心；助手无法稳定获取实时周合计。",
    ],
  },
  summary: {
    marketTheme:
      "双线冲击主导：①贸易战——美国对华关税升至145%，中国反制125%，全球风险资产剧烈波动；②地缘——美伊战争（2月爆发）冲击初步缓和，停火谈判持续推进，油价从高位回落但走势仍受谈判进展牵引。A股相对海外偏韧性——政策托底预期+内需主线绝缘于直接出口冲击。DXY跌破100，黄金创历史新高。",
    riskAppetite: "谨慎",
    riskAppetiteNote: "关税不确定性持续压制风险溢价，VIX仍高于正常区间",
    aShareView: "防御偏韧性",
    aShareViewNote: "内需/政策受益板块相对抗跌；出口依赖板块承压",
    usView:
      "标普500周内剧烈震荡后部分收复失地；纳指受AI叙事支撑但关税对供应链影响尚未充分定价。美联储两难：关税通胀 vs 增长下行，降息路径不确定性上升。",
  },
  kpis: [
    {
      dim: "增长",
      name: "制造业 PMI",
      value: "50.4%",
      delta:
        "2026年3月（最新）；环比 +1.4pct（较2月49.0%回升）。4月PMI将于4月30日前后发布，贸易战影响或在4月读数中显现。",
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
        "2026年3月；较2月+1.3%回落0.3pct，节后季节性回落。核心CPI同比+1.1%。关税背景下输入性通胀压力有限（人民币贬值幅度温和）。",
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
        "2026年3月；较2月-0.9%转正（+1.4pct）。油价下跌（需求担忧）对4月PPI构成下行压力，能否维持正区间待观察。",
      signal: "yellow",
      updatedAt: "2026-04-10",
      source: "https://www.stats.gov.cn/sj/zxfbhjd/202604/t20260410_1963265.html",
      sourceLabel: "国家统计局·同上",
    },
    {
      dim: "流动性",
      name: "DR007（月加权）",
      value: "1.49%（2月）",
      delta:
        "3月月加权待央行《金融市场运行情况》更新；外部冲击背景下央行维持宽松立场，降准降息预期升温。",
      signal: "green",
      updatedAt: "2026-02 月报",
      source: "https://www.pbc.gov.cn",
      sourceLabel: "人民银行·市场运行",
    },
    {
      dim: "流动性",
      name: "10Y 国债收益率（中债）",
      value: "约 1.80%",
      delta:
        "全球避险情绪推动国债需求，10Y CGB较上周小幅下行约2bp；长端受PMI/PPI韧性与资金宽松双重影响，1.78%–1.84%区间震荡。",
      signal: "yellow",
      updatedAt: "2026-04-18",
      source: "https://zh.tradingeconomics.com/china/government-bond-yield",
      sourceLabel: "中债·综合汇总",
    },
    {
      dim: "市场",
      name: "北向资金（周累计）",
      value: "请手填当周合计",
      delta:
        "关税冲击周外资情绪波动较大；请查东财「沪深港通历史数据」当周各日净买额加总后填入。",
      signal: "yellow",
      updatedAt: "周收盘后",
      source: "https://data.eastmoney.com/hsgt/hsgtV2.html",
      sourceLabel: "东方财富·沪深港通",
    },
    {
      dim: "市场",
      name: "全A成交额",
      value: "约 1.2–1.8 万亿/日",
      delta:
        "关税冲击后成交额有所收缩（情绪降温），较4月初高点回落；具体120日分位请自建序列。",
      signal: "yellow",
      updatedAt: "2026-04 中",
      source: "https://www.szse.cn",
      sourceLabel: "交易所（分位自算）",
    },
    {
      dim: "海外",
      name: "美 10Y 国债 DGS10",
      value: "约 4.33%",
      delta:
        "本周美债经历异常波动：关税冲击初期避险买盘推低收益率，随后外国机构疑似减持美债令长端急升至~4.6%，后回落至~4.3%区间。请以FRED当日最后观测为准。",
      signal: "yellow",
      updatedAt: "2026-04-17",
      source: "https://fred.stlouisfed.org/series/DGS10",
      sourceLabel: "FRED·DGS10",
    },
    {
      dim: "海外",
      name: "VIX",
      value: "约 30–33",
      delta:
        "4月7日盘中一度触及~52（近年新高），本周有所回落但仍显著高于20的「正常」阈值；关税谈判进展是VIX的首要驱动。",
      signal: "red",
      updatedAt: "2026-04-18",
      source: "https://fred.stlouisfed.org/series/VIXCLS",
      sourceLabel: "FRED·VIXCLS",
    },
    {
      dim: "海外",
      name: "美元指数 DXY",
      value: "约 99.3",
      delta:
        "DXY全周维持在99–100区间，跌破100关口；美元弱势反映市场对美国增长前景的担忧以及资产多元化趋势，对黄金/人民币形成支撑。",
      signal: "yellow",
      updatedAt: "2026-04-18",
      source: "https://www.marketwatch.com/investing/index/dxy",
      sourceLabel: "综合媒体·请核对终端",
    },
  ],
  framework: {
    growth: {
      title: "增长 Growth",
      metrics: ["制造业 PMI 50.4%（3月）", "关税冲击或拖累出口端4月数据", "内需政策对冲预期升温"],
      note: "3月PMI扩张区间站稳，但145%关税壁垒对外向型制造业的冲击将在4–5月数据中逐步显现。内需主导的板块（消费、基建）相对绝缘。",
    },
    inflation: {
      title: "通胀 Inflation",
      metrics: ["CPI 同比 +1.0%（3月）", "PPI 同比 +0.5%（3月，转正）", "油价下跌→4月PPI下行压力"],
      note: "PPI转正刚刚实现，但原油价格受双重压力（关税→需求下行 + 美伊停火谈判推进→供给预期恢复），布伦特跌至~65美元/桶，对工业品价格形成压制，4月PPI能否守住正区间存在不确定性。",
    },
    liquidity: {
      title: "流动性 Liquidity",
      metrics: ["DR007 月加权 1.49%（2月）", "10Y 国债约 1.80%", "降准降息预期增强"],
      note: "外部冲击下央行宽松立场更加明确；市场预期年内仍有降准空间。长端因避险需求和宽松预期有所下行。",
    },
    risk: {
      title: "风险偏好 Risk",
      metrics: ["VIX ~30–33（仍高位）", "全A成交额收缩", "黄金创历史新高（~$3,300+）", "美伊停火谈判推进中", "北向（周度手填）"],
      note: "全球风险偏好受关税战与地缘双重压制。美伊停火谈判推进是本周边际缓和因素，油价回落对通胀预期有所缓解；但谈判破裂风险犹存。黄金强势同时反映避险与美元信用担忧。",
    },
  },
  aShare: {
    sectorsTop: [
      { name: "内需消费", note: "关税隔离效应 + 政策刺激受益" },
      { name: "黄金/贵金属", note: "避险需求驱动，与金价新高联动" },
      { name: "军工/自主可控", note: "地缘与科技脱钩叙事强化" },
    ],
    sectorsBottom: [
      { name: "出口依赖制造业", note: "纺织/家电/机械等直接受关税冲击" },
      { name: "地产链", note: "政策预期 vs 基本面持续承压" },
      { name: "港股互联网（部分）", note: "外资持仓减少 + 情绪回撤" },
    ],
    flows: [
      {
        label: "北向净流入（周）",
        valueText: "东财表加总后填入 KPI",
        bar: 35,
      },
      {
        label: "融资余额周变化",
        valueText: "关税冲击周多为减少，待更新",
        bar: 28,
      },
      {
        label: "宽基 ETF 申赎",
        valueText: "国家队ETF或有托底申购",
        bar: 55,
      },
      {
        label: "成交额 vs 近60日均",
        valueText: "本周较4月初高点有所收缩",
        bar: 55,
      },
    ],
  },
  usMarket: [
    { label: "联邦基金目标区间", value: "3.50%–3.75%（3月FOMC维持；降息预期延后）" },
    {
      label: "核心 PCE 同比",
      value: "约 3.1%（1月）；关税或推升后续读数",
    },
    { label: "10Y 名义利率 DGS10", value: "→ 见KPI（约4.33%，本周剧烈波动后回落）" },
    { label: "10Y TIPS（实际利率）", value: "约 2.0%（关税冲击后小幅波动，FRED: DFII10）" },
    { label: "标普500 SPX", value: "约 5,282（4/17收盘附近；较高点累计跌幅约10%）" },
    {
      label: "纳斯达克综合 IXIC",
      value: "约 16,300（周度报道；关税冲击后部分修复）",
    },
    { label: "布伦特原油", value: "约 $65/桶（美伊停火谈判→供给预期回升 + 关税→需求担忧，双重压制）" },
    { label: "黄金 XAU", value: "约 $3,320/盎司（创历史新高，避险+美元走弱）" },
  ],
  scenarios: [
    {
      name: "基准",
      probability: "40%",
      text: "中美谈判取得阶段性进展，关税部分回撤；A股结构行情延续，内需和政策受益板块领涨，出口链阶段反弹。",
    },
    {
      name: "乐观",
      probability: "25%",
      text: "关税快速降级 + 美联储转向宽松：全球风险偏好修复，北向回流，A股宽基指数显著上行。",
    },
    {
      name: "悲观",
      probability: "35%",
      text: "关税长期化 + 美伊停火破裂（油价重返高位）：PPI受油价支撑但需求侧恶化，美联储陷入滞胀两难；VIX维持高位，全球资产重定价。",
    },
  ],
  watchlist: [
    {
      title: "美伊停火谈判破裂",
      condition: "停火协议未达成或冲突重新升级，霍尔木兹海峡受威胁",
      action: "油价急涨→PPI上行→美联储两难加剧；关注能源股、黄金、航运",
      source: "路透社/BBC/财联社地缘频道",
    },
    {
      title: "关税谈判进展",
      condition: "中美任何官方层面接触信号或关税豁免公告",
      action: "关键反转触发器，出口链与港股弹性最大",
      source: "商务部/USTR官网，财联社",
    },
    {
      title: "4月制造业 PMI",
      condition: "PMI 跌破 49，尤其新出口订单分项",
      action: "下调周期弹性，关注政策对冲力度",
      source: "国家统计局（4月30日前后）",
    },
    {
      title: "美债异常波动",
      condition: "10Y 美债一周再次上行 >20bp（疑似外国减持）",
      action: "美元信用风险升温信号；黄金、人民币汇率联动",
      source: "FRED DGS10",
    },
    {
      title: "VIX 持续高位",
      condition: "VIX > 30 维持 5 个交易日",
      action: "风险资产全面缩仓；关注 A 股北向持续流出",
      source: "FRED VIXCLS",
    },
    {
      title: "北向持续流出",
      condition: "5日累计净流出超历史高分位",
      action: "外资重仓与核心资产定价压力",
      source: "东方财富沪深港通",
    },
    {
      title: "PPI 二次转负",
      condition: "4月PPI同比重回负区间",
      action: "再通胀交易逻辑被证伪，中上游利润预期下修",
      source: "国家统计局（5月中旬）",
    },
    {
      title: "央行政策对冲",
      condition: "降准或非对称降息落地",
      action: "流动性宽松预期兑现，债市受益；信用扩张预期提振成长",
      source: "人民银行",
    },
    {
      title: "美联储紧急表态",
      condition: "FOMC紧急会议或鲍威尔讲话暗示降息提前",
      action: "美元快速走弱，全球风险偏好修复",
      source: "Fed.gov",
    },
    {
      title: "汇率突破区间",
      condition: "USD/CNY 突破 7.35 或 CFETS 指数快速贬值",
      action: "资本流出压力与外债成本上升信号",
      source: "外汇交易中心",
    },
    {
      title: "社融低于预期",
      condition: "4月社融增量大幅低于一致预期",
      action: "政策对冲不及预期，调整成长/周期仓位",
      source: "人民银行（5月中旬）",
    },
  ],
};
