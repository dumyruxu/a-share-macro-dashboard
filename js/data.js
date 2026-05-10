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
    periodLabel: "2026年第19周",
    dataAsOf: "2026-05-10",
    nextUpdateDue: "2026-05-17",
    frequency: "周更",
    methodology: [
      "本周核心叙事：①FOMC 5月6-7日维持利率不变，措辞偏中性，市场解读为鸽派——美股大幅反弹（纳指100单周+5.5%）；②布伦特从$108回落至$101，美伊局势暂时降温；③A股温和跟涨，上证4,180；④美国5月12日CPI发布是本周最重要数据，验证关税通胀传导。",
      "中国月频数据：4月PMI、财新PMI已发布（请手动填入）；4月CPI/PPI预计5月中旬发布，本周或有数据。",
      "市场数据来源：yfinance实时抓取，截至2026年5月8日收盘。",
      "信号颜色规则：PMI>50→绿；VIX<20→黄；布伦特$100附近→黄（从$108回落）；DXY<98→黄偏正面。",
      "北向资金与全A成交额分位需手动查询东财数据中心。",
    ],
  },
  summary: {
    marketTheme:
      "FOMC鸽派解读·美股大涨：美联储5月6-7日维持利率不变，鲍威尔措辞中性偏鸽，市场大幅买入——纳指100单周涨超5%，SPX 7,399创新高；布伦特从$108回落至$101，油价压力阶段性缓解；A股温和上涨（上证4,180+1.6%）；黄金$4,731回归高位。本周三（5月12日）美国4月CPI发布，是验证关税通胀传导的关键数据。",
    riskAppetite: "偏乐观",
    riskAppetiteNote: "FOMC后市场情绪明显改善，纳指强势；但CPI数据将决定情绪能否持续",
    aShareView: "温和跟涨",
    aShareViewNote: "上证4,180（本周+1.6%），受美股带动，内需和科技板块领涨",
    usView:
      "标普500 7,399（创新高），纳指100 29,235（单周+5.5%），FOMC鸽派解读驱动。本周三5月12日CPI是关键——若通胀超预期，本周涨幅可能回吐。",
  },
  kpis: [
    {
      dim: "增长",
      name: "制造业 PMI（4月）",
      value: "待填入",
      delta:
        "⚠️ 4月PMI已于4月30日发布，请前往 stats.gov.cn 查询实际数字填入。重点：新出口订单分项是关税冲击的直接验证。上周未填，本周请补上。",
      signal: "yellow",
      updatedAt: "2026-04-30",
      source: "https://www.stats.gov.cn",
      sourceLabel: "国家统计局·4月PMI",
    },
    {
      dim: "增长",
      name: "财新制造业 PMI（4月）",
      value: "待填入",
      delta:
        "4月财新PMI已发布，请查询后填入。与官方PMI对比，判断大型国企 vs 中小民企的分化。上周未填，本周请补上。",
      signal: "yellow",
      updatedAt: "2026年5月初",
      source: "https://www.pmi.caixin.com",
      sourceLabel: "财新PMI",
    },
    {
      dim: "通胀",
      name: "CPI 同比（4月）",
      value: "待填入",
      delta:
        "4月CPI预计本周发布（5月12日前后）。关税+油价双重因素影响，关注读数是否上行。上周沿用3月+1.0%，本周如有新数据请更新。",
      signal: "yellow",
      updatedAt: "待更新",
      source: "https://www.stats.gov.cn",
      sourceLabel: "国家统计局·4月CPI/PPI",
    },
    {
      dim: "通胀",
      name: "PPI 同比（4月）",
      value: "待填入",
      delta:
        "4月PPI预计本周发布。布伦特从$108回落至$101，对上游工业品价格支撑略有减弱；但仍处$100以上，PPI维持正区间概率较高。",
      signal: "yellow",
      updatedAt: "待更新",
      source: "https://www.stats.gov.cn",
      sourceLabel: "国家统计局·同上",
    },
    {
      dim: "流动性",
      name: "DR007（月加权）",
      value: "1.49%（2月）",
      delta:
        "3月数据待央行更新；央行宽松立场明确，市场预期年内仍有降准空间。",
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
        "低位震荡；宽松预期支撑。具体读数请查中国货币网。",
      signal: "yellow",
      updatedAt: "2026-05-08",
      source: "https://www.chinamoney.com.cn",
      sourceLabel: "中国货币网",
    },
    {
      dim: "汇率",
      name: "USD/CNY",
      value: "约 7.20",
      delta:
        "美元持续走弱（DXY 97.8），人民币受支撑小幅升值；当前约7.20附近，较前期7.22略有升值。",
      signal: "green",
      updatedAt: "2026-05-08",
      source: "https://www.chinamoney.com.cn",
      sourceLabel: "外汇交易中心",
    },
    {
      dim: "市场",
      name: "北向资金（周累计）",
      value: "请手填当周合计",
      delta:
        "请查东财「沪深港通历史数据」本周（5月4日-5月8日）各日净买额加总后填入。上周也未填，请一并补上。",
      signal: "yellow",
      updatedAt: "周收盘后",
      source: "https://data.eastmoney.com/hsgt/hsgtV2.html",
      sourceLabel: "东方财富·沪深港通",
    },
    {
      dim: "市场",
      name: "融资余额",
      value: "13,157 亿元",
      delta:
        "截至4月10日；FOMC鸽派后市场情绪改善，融资余额或有所回升。最新数据请查东财数据中心。",
      signal: "yellow",
      updatedAt: "2026-04-10",
      source: "https://data.eastmoney.com/rzrq/total.html",
      sourceLabel: "东方财富·两融",
    },
    {
      dim: "海外",
      name: "联邦基金利率",
      value: "3.50%–3.75%",
      delta:
        "FOMC 5月6-7日维持利率不变，符合预期。鲍威尔措辞中性偏鸽——未明确排除年内降息，市场解读积极，美股大涨。",
      signal: "yellow",
      updatedAt: "2026-05-07",
      source: "https://www.federalreserve.gov",
      sourceLabel: "美联储·FOMC声明",
    },
    {
      dim: "海外",
      name: "美 10Y 国债 DGS10",
      value: "约 4.25%",
      delta:
        "FOMC后美债收益率小幅下行（市场预期降息路径改善）；当前约4.25%，较此前4.33%有所回落。请查FRED最新数据。",
      signal: "yellow",
      updatedAt: "2026-05-08",
      source: "https://fred.stlouisfed.org/series/DGS10",
      sourceLabel: "FRED·DGS10",
    },
    {
      dim: "海外",
      name: "VIX",
      value: "17.19",
      delta:
        "FOMC后维持平稳，市场情绪良好。本周三CPI数据若超预期，VIX可能出现跳升。",
      signal: "yellow",
      updatedAt: "2026-05-08",
      source: "https://fred.stlouisfed.org/series/VIXCLS",
      sourceLabel: "yfinance · ^VIX",
    },
    {
      dim: "海外",
      name: "美元指数 DXY",
      value: "97.84",
      delta:
        "美元进一步走弱，DXY跌至97.8，创近期新低；对黄金、新兴市场和A股北向资金偏正面。",
      signal: "green",
      updatedAt: "2026-05-08",
      source: "https://finance.yahoo.com/quote/DX-Y.NYB/",
      sourceLabel: "yfinance · DX-Y.NYB",
    },
  ],
  framework: {
    growth: {
      title: "增长 Growth",
      metrics: ["⚠️ 4月PMI待填入（已发布4/30）", "财新PMI待填入", "A股YTD +3.9%，上证站稳4,100+"],
      note: "4月PMI是当前增长维度最重要的待确认数据。填入后信号将更新。从市场表现看，A股温和上涨，市场对增长预期尚可，但关税影响的完整验证仍需数据支撑。",
    },
    inflation: {
      title: "通胀 Inflation",
      metrics: ["CPI/PPI 4月数据待发布（本周）", "布伦特$101（从$108回落）", "⚠️ 美国5月12日CPI是本周关键"],
      note: "布伦特从$108回落至$101，通胀压力阶段性缓解。但美国5月12日CPI是本周最重要的全球数据——若关税通胀传导显现（超过3.5%），市场本周涨幅可能全部回吐，降息预期将再次推迟。",
    },
    liquidity: {
      title: "流动性 Liquidity",
      metrics: ["DR007 1.49%（2月）", "DXY 97.84（美元创近期新低）", "FOMC维持利率，措辞偏鸽"],
      note: "本周流动性信号是四个支柱里最正面的——FOMC鸽派、DXY走弱、中国宽松持续三重利好。美债收益率从4.33%回落至约4.25%，全球流动性环境边际改善明显。",
    },
    risk: {
      title: "风险偏好 Risk",
      metrics: ["VIX 17.19（平稳）", "纳指100 +5.5%（单周）", "黄金$4,731（回归高位）", "布伦特$101（从$108回落）"],
      note: "FOMC后风险偏好明显改善，纳指100单周涨超5%是强烈的risk-on信号。但黄金$4,731仍处历史高位，说明长期结构性不确定性未消——市场在短期乐观和长期谨慎之间保持分裂。本周CPI是情绪能否持续的关键测试。",
    },
  },
  aShare: {
    sectorsTop: [
      { name: "科技/半导体", note: "纳指强势带动，科技脱钩叙事+国产替代" },
      { name: "内需消费", note: "关税隔离+政策刺激，持续抗跌" },
      { name: "黄金/贵金属", note: "金价$4,731回归高位，板块强势" },
    ],
    sectorsBottom: [
      { name: "出口依赖制造业", note: "145%关税冲击持续，等待PMI实际验证" },
      { name: "航空/交通运输", note: "油价虽从$108回落，但$101仍高于年初" },
      { name: "地产链", note: "基本面修复缓慢，政策预期已部分定价" },
    ],
    flows: [
      {
        label: "北向净流入（周）",
        valueText: "手动查东财后填入",
        bar: 40,
      },
      {
        label: "融资余额",
        valueText: "1.32万亿（4月中）",
        bar: 50,
      },
      {
        label: "宽基 ETF 申赎",
        valueText: "FOMC后情绪改善，或有流入",
        bar: 60,
      },
      {
        label: "成交额 vs 近60日均",
        valueText: "本周放量，FOMC后情绪好转",
        bar: 62,
      },
    ],
  },
  usMarket: [
    { label: "联邦基金目标区间", value: "3.50%–3.75%（5月6-7日维持不变，措辞偏鸽，市场积极解读）" },
    {
      label: "核心 PCE 同比",
      value: "约 3.1%（1月）；⚠️ 5月12日美国4月CPI是本周关键验证",
    },
    { label: "10Y 名义利率 DGS10", value: "约 4.25%（FOMC后小幅下行，请查FRED最新）" },
    { label: "10Y TIPS（实际利率）", value: "约 1.9%（FRED: DFII10）" },
    { label: "标普500 SPX", value: "7,399（本周+2.3%，创新高；YTD +7.9%）" },
    {
      label: "纳斯达克 IXIC / NDX",
      value: "26,247 / 29,235（NDX本周+5.5%，YTD纳指+13%，强势领涨）",
    },
    { label: "布伦特原油 Brent", value: "$101.3/桶（从$108回落，美伊局势暂时降温）" },
    { label: "黄金 XAU/USD", value: "$4,730.7/盎司（回归历史高位，DXY走弱驱动）" },
  ],
  scenarios: [
    {
      name: "基准",
      probability: "45%",
      text: "5月12日CPI温和（3.2-3.5%），降息预期维持年内1-2次；关税战僵局持续但市场已适应；A股温和震荡上行，上证4,100-4,400区间。",
    },
    {
      name: "乐观",
      probability: "30%",
      text: "CPI低于预期（<3.2%），降息路径前移；关税出现豁免信号；全球风险偏好持续改善，A股出口链和港股大幅反弹，上证冲击4,500+。",
    },
    {
      name: "悲观",
      probability: "25%",
      text: "CPI超预期上行（>3.8%，关税通胀传导显现）；美联储被迫偏鹰，本周涨幅全部回吐；VIX重回25+，A股受外部压力回调。",
    },
  ],
  watchlist: [
    {
      title: "⚠️ 美国 4月 CPI（5月12日，本周三）",
      condition: "CPI同比是否超预期上行（市场预期约3.4%）",
      action: "低于预期→降息预期进一步前移，美股续涨，A股跟涨；超预期→本周涨幅回吐，VIX跳升，美联储偏鹰",
      source: "BLS（5月12日北京时间20:30）",
    },
    {
      title: "⚠️ 4月PMI新出口订单（已发布，待填入）",
      condition: "新出口订单是否跌破49",
      action: "跌破49→关税冲击确认传导；守住50→制造业韧性超预期",
      source: "国家统计局（已发布4/30，请手动更新）",
    },
    {
      title: "中国 4月 CPI/PPI（本周发布）",
      condition: "CPI是否继续温和；PPI是否守住正区间",
      action: "PPI转负→再通缩压力，中上游利润预期下修；温和正区间→宽松政策空间维持",
      source: "国家统计局（5月12日前后）",
    },
    {
      title: "布伦特油价方向",
      condition: "是否重回$108+（美伊局势再度紧张）或跌破$95",
      action: "重回$108+→通胀压力重燃，FOMC鸽派解读被修正；跌破$95→通胀压力大幅缓解，降息路径前移",
      source: "财经终端 / yfinance",
    },
    {
      title: "关税谈判信号",
      condition: "中美任何官方层面接触，或部分商品豁免公告",
      action: "关键市场反转触发器；出口链与港股弹性最大",
      source: "商务部/USTR官网，财联社",
    },
    {
      title: "VIX 跳升",
      condition: "VIX > 22（当前17.19，若CPI超预期可能触发）",
      action: "风险资产快速回调信号；关注A股北向当日流出",
      source: "yfinance ^VIX",
    },
    {
      title: "央行政策对冲",
      condition: "降准或非对称降息正式宣布",
      action: "流动性宽松兑现；债市直接受益，成长类估值提振",
      source: "人民银行",
    },
  ],
};
