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
    periodLabel: "2026年第18周",
    dataAsOf: "2026-05-03",
    nextUpdateDue: "2026-05-10",
    frequency: "周更",
    methodology: [
      "本周核心叙事：①油价急升至$108（布伦特），美伊停火谈判出现逆转迹象，通胀压力重燃；②4月PMI已于4月30日发布（请手动填入实际读数）；③美联储FOMC会议5月6-7日召开，是本周最重要的全球事件；④市场情绪整体仍平稳，VIX进一步回落至17。",
      "A股月频数据：4月PMI已发布（4/30），请查国家统计局官网填入实际数字；CPI/PPI预计5月中旬发布。",
      "市场数据来源：yfinance实时抓取，截至2026年5月3日（A股截至4月30日收盘）。",
      "信号颜色规则：PMI>50→绿；VIX<20→黄；布伦特>$100→红（通胀压力）；DXY<100→黄（对A股偏正面）。",
      "北向资金与全A成交额分位需手动查询东财数据中心。",
    ],
  },
  summary: {
    marketTheme:
      "油价急升·FOMC前夕：布伦特本周突破$108，较上周$99大幅跳升，美伊停火谈判出现逆转信号，通胀压力重燃；与此同时美联储FOMC会议5月6-7日召开，市场在等待鲍威尔措辞——降息路径能否明确是关键。A股相对平稳（上证4,112），VIX进一步下行至17，短期情绪仍稳。",
    riskAppetite: "中性",
    riskAppetiteNote: "VIX 17降至近期低点，短期恐慌极低；但油价急升是新的结构性风险信号",
    aShareView: "平稳观望",
    aShareViewNote: "上证4,112（+0.1%），等待FOMC结果和4月PMI验证",
    usView:
      "标普500 7,230（继续小幅走高），VIX 17，市场平静；但布伦特$108急升是隐患——若通胀预期反弹，美联储将更难降息。5月6-7日FOMC是本周核心事件。",
  },
  kpis: [
    {
      dim: "增长",
      name: "制造业 PMI（4月）",
      value: "待填入",
      delta:
        "⚠️ 4月PMI已于4月30日由国家统计局发布。请前往 stats.gov.cn 查询实际数字并手动填入。重点关注新出口订单分项——这是关税冲击的直接验证。",
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
        "财新4月PMI通常在官方PMI后1-2天发布。请查询后填入，与官方PMI对比判断大小企业分化情况。",
      signal: "yellow",
      updatedAt: "2026年5月初",
      source: "https://www.pmi.caixin.com",
      sourceLabel: "财新PMI",
    },
    {
      dim: "通胀",
      name: "CPI 同比",
      value: "+1.0%",
      delta:
        "2026年3月（最新）；4月CPI预计5月中旬发布。布伦特急升至$108，输入性通胀压力上升，4月CPI值得关注。",
      signal: "yellow",
      updatedAt: "2026-04-10",
      source: "https://www.stats.gov.cn",
      sourceLabel: "国家统计局·3月CPI",
    },
    {
      dim: "通胀",
      name: "PPI 同比",
      value: "+0.5%",
      delta:
        "2026年3月（最新）；油价急升至$108对上游工业品价格构成支撑，4月PPI维持正区间的概率上升；但需求侧关税冲击压力仍存。4月PPI预计5月中旬发布。",
      signal: "yellow",
      updatedAt: "2026-04-10",
      source: "https://www.stats.gov.cn",
      sourceLabel: "国家统计局·3月PPI",
    },
    {
      dim: "流动性",
      name: "DR007（月加权）",
      value: "1.49%（2月）",
      delta:
        "3月月加权待央行更新；央行宽松立场明确，市场预期年内仍有降准空间。",
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
        "低位震荡；宽松预期支撑长端下行。具体读数请查中国货币网。",
      signal: "yellow",
      updatedAt: "2026-05-03",
      source: "https://zh.tradingeconomics.com/china/government-bond-yield",
      sourceLabel: "中债·综合汇总",
    },
    {
      dim: "汇率",
      name: "USD/CNY",
      value: "约 7.22",
      delta:
        "人民币维持在7.20–7.25区间；美元整体偏弱（DXY 98.2）对人民币有支撑，央行管控贬值节奏。",
      signal: "yellow",
      updatedAt: "2026-05-03",
      source: "https://www.safe.gov.cn",
      sourceLabel: "外汇交易中心",
    },
    {
      dim: "市场",
      name: "北向资金（周累计）",
      value: "请手填当周合计",
      delta:
        "请查东财「沪深港通历史数据」当周各日净买额加总后填入。",
      signal: "yellow",
      updatedAt: "周收盘后",
      source: "https://data.eastmoney.com/hsgt/hsgtV2.html",
      sourceLabel: "东方财富·沪深港通",
    },
    {
      dim: "市场",
      name: "融资余额",
      value: "13,028 亿元",
      delta:
        "截至4月3日；较上期小幅回落，杠杆情绪稳定。4月最新数据请查东财数据中心。",
      signal: "yellow",
      updatedAt: "2026-04-03",
      source: "https://data.eastmoney.com/rzrq/total.html",
      sourceLabel: "东方财富·两融",
    },
    {
      dim: "海外",
      name: "美 10Y 国债 DGS10",
      value: "约 4.33%",
      delta:
        "维持在4.3%附近；FOMC会议后可能出现方向性变化。油价急升若推升通胀预期，美债收益率存在上行压力。请查FRED最新数据。",
      signal: "yellow",
      updatedAt: "2026-05-01",
      source: "https://fred.stlouisfed.org/series/DGS10",
      sourceLabel: "FRED·DGS10",
    },
    {
      dim: "海外",
      name: "VIX",
      value: "16.99",
      delta:
        "进一步从上周18.7回落至17，市场短期极度平静。但油价急升是潜在风险，若FOMC偏鹰，VIX可能快速回升。",
      signal: "yellow",
      updatedAt: "2026-05-01",
      source: "https://fred.stlouisfed.org/series/VIXCLS",
      sourceLabel: "yfinance · ^VIX",
    },
    {
      dim: "海外",
      name: "美元指数 DXY",
      value: "98.19",
      delta:
        "美元持续弱势，DXY进一步下行至98.2；对黄金和新兴市场整体偏正面。FOMC若偏鹰，美元可能反弹。",
      signal: "yellow",
      updatedAt: "2026-05-03",
      source: "https://finance.yahoo.com/quote/DX-Y.NYB/",
      sourceLabel: "yfinance · DX-Y.NYB",
    },
  ],
  framework: {
    growth: {
      title: "增长 Growth",
      metrics: ["⚠️ 4月PMI已发布（4/30），请填入实际数字", "财新PMI同步发布，请填入", "出口数据关税冲击验证中"],
      note: "4月PMI是本周最重要的待确认数据。新出口订单分项是关税冲击传导的直接验证。填入实际数字后，本维度信号将更新。",
    },
    inflation: {
      title: "通胀 Inflation",
      metrics: ["CPI 同比 +1.0%（3月）", "PPI 同比 +0.5%（3月）", "⚠️ 布伦特急升至$108（新风险）"],
      note: "油价从$99急升至$108是本周最大的通胀新变量。若美伊停火谈判真正破裂，布伦特可能进一步走高，将直接推升PPI和美国CPI，令美联储更难降息。通胀维度风险较上周明显上升。",
    },
    liquidity: {
      title: "流动性 Liquidity",
      metrics: ["DR007 月加权 1.49%（2月）", "10Y 国债约 1.80%", "DXY 98.2（美元弱势持续）"],
      note: "中国流动性环境仍健康；DXY持续低于100对新兴市场偏正面。关键变量是5月6-7日FOMC——若鲍威尔偏鹰，美元可能反弹，全球流动性预期收紧。",
    },
    risk: {
      title: "风险偏好 Risk",
      metrics: ["VIX 16.99（进一步回落，近期低点）", "布伦特$108（急升，新风险信号）", "黄金$4,615（较上周$4,741小幅回落）", "北向（周度手填）"],
      note: "表面信号（VIX）极度平静，但布伦特急升$108是本周最值得警惕的新信号——油价跳升通常预示地缘风险或供给冲击。黄金小幅回落，短期避险情绪边际降温。整体风险偏好：表面平静，深层隐患。",
    },
  },
  aShare: {
    sectorsTop: [
      { name: "内需消费", note: "关税隔离效应持续，政策刺激受益" },
      { name: "能源/石化", note: "油价$108急升直接利好上游能源板块" },
      { name: "黄金/贵金属", note: "金价$4,615仍处历史高位，板块强势" },
    ],
    sectorsBottom: [
      { name: "出口依赖制造业", note: "145%关税冲击持续，等待PMI验证实际影响" },
      { name: "地产链", note: "基本面修复缓慢，政策预期已部分定价" },
      { name: "航空/交通运输", note: "油价急升推高运营成本，利润承压" },
    ],
    flows: [
      {
        label: "北向净流入（周）",
        valueText: "手动查东财后填入",
        bar: 35,
      },
      {
        label: "融资余额",
        valueText: "1.30万亿（4月初）",
        bar: 45,
      },
      {
        label: "宽基 ETF 申赎",
        valueText: "国家队ETF或有托底申购",
        bar: 55,
      },
      {
        label: "成交额 vs 近60日均",
        valueText: "等待FOMC方向，观望为主",
        bar: 45,
      },
    ],
  },
  usMarket: [
    { label: "联邦基金目标区间", value: "3.50%–3.75%（⚠️ 5月6-7日FOMC决策，本周最重要事件）" },
    {
      label: "核心 PCE 同比",
      value: "约 3.1%（1月）；油价急升将推高后续读数，降息阻力进一步加大",
    },
    { label: "10Y 名义利率 DGS10", value: "约 4.33%；FOMC后可能出现方向性变化" },
    { label: "10Y TIPS（实际利率）", value: "约 2.0%（FRED: DFII10）" },
    { label: "标普500 SPX", value: "7,230（+0.3% 本周，继续小幅走高）" },
    {
      label: "纳斯达克 IXIC / NDX",
      value: "25,114 / 27,710（周度 +0.9% / +0.9%）",
    },
    { label: "布伦特原油 Brent", value: "⚠️ $108.6/桶（较上周$99大幅跳升+9%，美伊局势逆转信号）" },
    { label: "黄金 XAU/USD", value: "$4,615/盎司（较上周$4,741小幅回落-2.7%，短期避险情绪边际降温）" },
  ],
  scenarios: [
    {
      name: "基准",
      probability: "40%",
      text: "FOMC维持利率不变，措辞中性；油价在$100-110区间震荡（美伊局势紧张但未全面恶化）；4月PMI温和走弱但守住50以上；A股维持区间震荡，上证3,900-4,300。",
    },
    {
      name: "乐观",
      probability: "20%",
      text: "FOMC释放鸽派信号（暗示年内降息路径前移）；美伊局势缓和，油价回落至$90以下；关税出现阶段性豁免信号；A股出口链和港股弹性最大，上证冲击4,400+。",
    },
    {
      name: "悲观",
      probability: "40%",
      text: "美伊停火正式破裂，布伦特重返$120+；FOMC偏鹰（通胀压力使降息无望）；4月PMI新出口订单大幅跌破49；滞胀压力全面升温，VIX重回30+，全球资产重定价。",
    },
  ],
  watchlist: [
    {
      title: "⚠️ 美联储 FOMC（5月6-7日）",
      condition: "鲍威尔措辞偏鸽（暗示降息前移）vs 偏鹰（油价通胀使降息无望）",
      action: "偏鸽→美元走弱、风险资产受益；偏鹰→美元反弹、新兴市场承压、VIX可能回升",
      source: "federalreserve.gov（5月7日北京时间凌晨2点）",
    },
    {
      title: "⚠️ 布伦特油价急升（$108）",
      condition: "油价是否继续上涨至$115+（美伊停火破裂确认）",
      action: "若确认破裂：通胀预期反弹→美联储更难降息→悲观情景概率大幅上升；能源股/黄金受益，航空/制造业承压",
      source: "路透社/财联社地缘频道",
    },
    {
      title: "⚠️ 4月PMI实际数字（已发布4/30）",
      condition: "新出口订单分项是否跌破49",
      action: "跌破49→关税冲击确认传导，下调出口链；守住50→制造业韧性超预期，是积极信号",
      source: "国家统计局（已发布，请手动填入）",
    },
    {
      title: "美伊停火谈判结果",
      condition: "停火协议正式破裂 vs 重新谈判",
      action: "破裂→油价$120+、通胀压力、航运/能源受益；恢复谈判→油价回落至$90以下",
      source: "路透社/BBC/财联社地缘频道",
    },
    {
      title: "关税谈判信号",
      condition: "中美任何官方层面接触，或部分商品豁免公告",
      action: "关键市场反转触发器；出口链与港股弹性最大",
      source: "商务部/USTR官网，财联社",
    },
    {
      title: "VIX 重回高位",
      condition: "VIX > 25（当前16.99，若反弹说明新风险冲击）",
      action: "风险资产全面减仓信号；关注A股北向加速流出",
      source: "yfinance ^VIX",
    },
    {
      title: "美国 4月 CPI（5月12日）",
      condition: "CPI是否因关税和油价双重推升超预期上行",
      action: "超预期→降息路径进一步推迟；美元走强；黄金短期波动",
      source: "BLS（5月12日）",
    },
    {
      title: "央行政策对冲",
      condition: "降准或非对称降息正式宣布",
      action: "流动性宽松预期兑现；债市直接受益，成长类估值提振",
      source: "人民银行",
    },
  ],
};
