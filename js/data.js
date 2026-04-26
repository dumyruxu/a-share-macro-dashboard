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
    periodLabel: "2026年第17周",
    dataAsOf: "2026-04-26",
    nextUpdateDue: "2026-05-03",
    frequency: "周更",
    methodology: [
      "本周核心叙事：关税战持续但市场情绪明显修复——VIX从4月7日峰值~52回落至18.7，美股大幅反弹；黄金创历史新高（$4,741）；布伦特仍高位（$99），美伊停火谈判持续推进但尚未最终达成。",
      "A股宏观月频数据（PMI/CPI/PPI/社融）沿用3月最新读数；4月PMI将于4月30日发布，是本周最重要的验证节点——关税冲击首份官方数据。",
      "市场数据（指数/VIX/DXY/原油/黄金）来源：yfinance实时抓取，截至2026年4月24日收盘。中国A股指数来源同为yfinance。",
      "信号颜色规则：PMI>50→绿；VIX<20→黄（回落正常区间）；VIX>25→红；DXY<100且持续弱→黄；黄金新高→风险偏好有分歧信号。",
      "北向资金与全A成交额「分位」需自建日频序列或查东财数据中心；自动脚本暂无此数据源。",
    ],
  },
  summary: {
    marketTheme:
      "情绪修复 · 双线悬而未决：①关税战——中美145%/125%关税对峙格局未变，但市场已从4月初的极度恐慌（VIX~52）中修复（VIX18.7），反映部分博弈对称预期；②地缘——美伊停火谈判持续但仍未最终达成，布伦特维持$99高位，黄金创历史新高$4,741（避险+去美元化双驱动）。A股相对平稳，本周上证微跌0.3%。4月30日PMI是验证关税冲击的首个硬数据，市场将密切关注新出口订单分项。",
    riskAppetite: "中性偏谨慎",
    riskAppetiteNote: "VIX已回落至18.7（正常区间），但结构性不确定性犹存；黄金与油价均处高位",
    aShareView: "区间震荡",
    aShareViewNote: "上证周度微跌0.3%，等待4月30日PMI数据验证；内需板块仍相对抗跌",
    usView:
      "标普500 7,165（本周+0.8%），纳指100 27,304（+1.9%），美股显著从4月初低点反弹；黄金$4,741新高；布伦特$99仍受伊朗局势支撑；美联储5月6-7日FOMC是下一关键事件。",
  },
  kpis: [
    {
      dim: "增长",
      name: "制造业 PMI",
      value: "50.4%",
      delta:
        "2026年3月（最新）；环比 +1.4pct（较2月49.0%回升）。⚠️ 4月PMI将于4月30日发布——这是关税升级后的首份制造业数据，新出口订单分项是关键验证节点。",
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
        "2026年3月；较2月+1.3%回落0.3pct，节后季节性回落。核心CPI同比+1.1%。关税背景下输入性通胀压力有限（人民币贬值温和）。",
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
        "2026年3月；较2月-0.9%转正（+1.4pct）。布伦特仍高位$99，油价对PPI构成一定支撑；但需求端关税冲击压力仍存，4月PPI方向待验证。",
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
        "3月月加权待央行《金融市场运行情况》更新；外部冲击背景下央行维持宽松立场，降准降息预期持续升温。",
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
        "避险需求与宽松预期推动长端小幅下行；1.78%–1.84%区间震荡。具体读数请查中国货币网或中债。",
      signal: "yellow",
      updatedAt: "2026-04-24",
      source: "https://zh.tradingeconomics.com/china/government-bond-yield",
      sourceLabel: "中债·综合汇总",
    },
    {
      dim: "汇率",
      name: "USD/CNY",
      value: "约 7.22",
      delta:
        "人民币汇率在7.20–7.25区间；央行通过中间价管控贬值节奏，非自由落体。美元整体偏弱（DXY 98.5）对人民币构成一定支撑。",
      signal: "yellow",
      updatedAt: "2026-04-24",
      source: "https://www.safe.gov.cn",
      sourceLabel: "外汇交易中心",
    },
    {
      dim: "市场",
      name: "北向资金（周累计）",
      value: "请手填当周合计",
      delta:
        "自动脚本暂无北向数据源；请查东财「沪深港通历史数据」当周各日净买额加总后填入。",
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
        "截至3月27日；关税冲击后杠杆情绪有所回落，较年初高点收缩。4月最新数据请查上交所/深交所或东财数据中心。",
      signal: "yellow",
      updatedAt: "2026-03-27",
      source: "https://data.eastmoney.com/rzrq/total.html",
      sourceLabel: "东方财富·两融",
    },
    {
      dim: "市场",
      name: "全A成交额",
      value: "约 1.2–1.8 万亿/日",
      delta:
        "4月中旬成交额较4月初高点（2.45万亿）收缩；市场处于等待方向阶段，4月30日PMI数据前情绪偏观望。",
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
        "本周美债趋于稳定；4月7日关税冲击后短暂急升至4.6%（疑似外国机构减持）后回落；当前4.3%左右。FRED实时数据请查原始序列。",
      signal: "yellow",
      updatedAt: "2026-04-24",
      source: "https://fred.stlouisfed.org/series/DGS10",
      sourceLabel: "FRED·DGS10",
    },
    {
      dim: "海外",
      name: "VIX",
      value: "18.71",
      delta:
        "✅ 显著回落至正常区间（4月7日曾触及~52极度恐慌）。VIX<20说明市场短期对冲需求已大幅下降；但结构性贸易风险仍在，未回到<15的平静状态。",
      signal: "yellow",
      updatedAt: "2026-04-24",
      source: "https://fred.stlouisfed.org/series/VIXCLS",
      sourceLabel: "yfinance实时 · ^VIX",
    },
    {
      dim: "海外",
      name: "美元指数 DXY",
      value: "98.51",
      delta:
        "DXY持续低于100；美元弱势反映市场对美国资产信心下降与多元化配置趋势；对黄金（$4,741）和人民币形成支撑。",
      signal: "yellow",
      updatedAt: "2026-04-24",
      source: "https://finance.yahoo.com/quote/DX-Y.NYB/",
      sourceLabel: "yfinance实时 · DX-Y.NYB",
    },
  ],
  framework: {
    growth: {
      title: "增长 Growth",
      metrics: ["制造业 PMI 50.4%（3月，扩张区间）", "⚠️ 4月PMI 4月30日发布（关键验证）", "出口数据4月起受145%关税影响"],
      note: "3月PMI稳住，但4月30日数据才是关税冲击后的首个硬指标。新出口订单分项若跌破49，则外需承压信号明确。内需板块（消费、基建、医疗）相对隔离。",
    },
    inflation: {
      title: "通胀 Inflation",
      metrics: ["CPI 同比 +1.0%（3月）", "PPI 同比 +0.5%（3月，转正）", "布伦特 $99.13（高位，伊朗局势支撑）"],
      note: "PPI已转正；布伦特维持$99高位（美伊停火谈判尚未最终达成，供给预期未充分释放）。油价对上游工业品价格构成支撑，4月PPI能否守住正区间的不确定性有所下降，但需求侧关税冲击仍是压力。",
    },
    liquidity: {
      title: "流动性 Liquidity",
      metrics: ["DR007 月加权 1.49%（2月）", "10Y 国债约 1.80%", "降准降息预期强烈"],
      note: "外部冲击下央行宽松立场进一步明确；年内降准预期充分。长端因避险需求与宽松预期双重支撑，国债收益率处低位。这是四象限中目前最稳定的正面因素。",
    },
    risk: {
      title: "风险偏好 Risk",
      metrics: ["VIX 18.71（从~52高位大幅回落）", "黄金 $4,741（历史新高）", "布伦特 $99（伊朗局势支撑）", "美伊停火谈判持续推进中", "北向（周度手填）"],
      note: "VIX回落至正常区间是本周最重要的市场信号——极度恐慌已消退。但黄金创历史新高和油价高位说明结构性不安全感仍在（避险+去美元化双驱动）。4月30日PMI和5月6-7日FOMC是下两个关键风险节点。",
    },
  },
  aShare: {
    sectorsTop: [
      { name: "内需消费", note: "关税隔离效应 + 政策刺激受益，本周相对抗跌" },
      { name: "黄金/贵金属", note: "金价$4,741历史新高持续驱动，板块强势" },
      { name: "军工/自主可控", note: "科技脱钩叙事强化，国产替代逻辑持续" },
    ],
    sectorsBottom: [
      { name: "出口依赖制造业", note: "纺织/家电/机械等直接受145%关税冲击" },
      { name: "地产链", note: "基本面修复缓慢，政策预期已部分定价" },
      { name: "港股互联网（部分）", note: "外资持仓调整 + 关税科技博弈" },
    ],
    flows: [
      {
        label: "北向净流入（周）",
        valueText: "手动查东财后填入",
        bar: 35,
      },
      {
        label: "融资余额",
        valueText: "1.3万亿（3月底）",
        bar: 45,
      },
      {
        label: "宽基 ETF 申赎",
        valueText: "国家队ETF或有托底申购",
        bar: 55,
      },
      {
        label: "成交额 vs 近60日均",
        valueText: "较4月初高点收缩，观望为主",
        bar: 48,
      },
    ],
  },
  usMarket: [
    { label: "联邦基金目标区间", value: "3.50%–3.75%（3月FOMC维持；5月6-7日FOMC是下一决策点）" },
    {
      label: "核心 PCE 同比",
      value: "约 3.1%（1月）；关税或推升后续读数，美联储两难加剧",
    },
    { label: "10Y 名义利率 DGS10", value: "约 4.33%（从4月冲击峰值4.6%回落，趋于稳定）" },
    { label: "10Y TIPS（实际利率）", value: "约 2.0%（FRED: DFII10）" },
    { label: "标普500 SPX", value: "7,165（+0.8% 本周，从4月低点大幅反弹）" },
    {
      label: "纳斯达克 IXIC / NDX",
      value: "24,837 / 27,304（周度 +1.6% / +1.9%，AI叙事支撑纳指相对强势）",
    },
    { label: "布伦特原油 Brent", value: "$99.13/桶（美伊停火谈判持续但未达成，供给仍紧）" },
    { label: "黄金 XAU/USD", value: "$4,740.9/盎司（历史新高，避险+去美元化双驱动，DXY 98.5）" },
  ],
  scenarios: [
    {
      name: "基准",
      probability: "45%",
      text: "关税战僵局持续，4月PMI温和走弱但不崩塌；中美无重大谈判突破，A股维持结构行情，内需板块相对领跑，宽基指数区间震荡。美联储5月维持利率不变。",
    },
    {
      name: "乐观",
      probability: "30%",
      text: "中美关税出现阶段性降级信号（部分豁免或谈判接触），美联储5月措辞偏鸽；全球风险偏好快速修复，北向回流，A股出口链和港股弹性最大。",
    },
    {
      name: "悲观",
      probability: "25%",
      text: "4月PMI新出口订单大幅跌破49 + 美伊停火破裂（油价重返高位）：滞胀压力上升，美联储被迫维持紧缩；VIX重返30+，全球资产重定价，A股防御板块相对抗跌。",
    },
  ],
  watchlist: [
    {
      title: "⚠️ 4月制造业 PMI（4月30日）",
      condition: "PMI 跌破 49，尤其新出口订单分项，反映关税冲击首次传导",
      action: "下调出口链配置；关注政策对冲力度；若>50则市场信心大幅提振",
      source: "国家统计局（4月30日前后发布）",
    },
    {
      title: "⚠️ 美联储 FOMC（5月6-7日）",
      condition: "鲍威尔措辞偏鸽（暗示降息路径前移）或偏鹰（维持紧缩应对通胀）",
      action: "全球利率预期重定价；偏鸽→美元走弱、风险资产受益；偏鹰→新兴市场压力",
      source: "federalreserve.gov",
    },
    {
      title: "美伊停火谈判结果",
      condition: "停火协议正式达成 vs 谈判破裂冲突升级",
      action: "达成→油价回落，PPI通胀压力缓解；破裂→油价急涨，能源股/黄金受益",
      source: "路透社/财联社地缘频道",
    },
    {
      title: "关税谈判信号",
      condition: "中美任何官方层面接触，或部分商品关税豁免公告",
      action: "关键市场反转触发器；出口链与港股弹性最大，但需辨别实质vs噪音",
      source: "商务部/USTR官网，财联社",
    },
    {
      title: "美债异常波动",
      condition: "10Y 美债一周内再次上行 >20bp（疑似外国机构减持）",
      action: "美元信用风险信号升温；黄金、人民币汇率联动；关注去美元化进程",
      source: "FRED DGS10",
    },
    {
      title: "VIX 重回高位",
      condition: "VIX > 25 再次出现（当前 18.7，若回升说明新风险冲击）",
      action: "风险资产全面减仓信号；关注 A 股北向加速流出",
      source: "yfinance ^VIX / FRED VIXCLS",
    },
    {
      title: "北向资金持续流出",
      condition: "5日累计净流出创历史高分位",
      action: "外资重仓股（消费/医疗龙头）定价压力，核心资产估值承压",
      source: "东方财富沪深港通",
    },
    {
      title: "PPI 二次转负",
      condition: "4月 PPI 同比重回负区间（5月中旬公布）",
      action: "再通胀交易逻辑被证伪；中上游利润预期下修，周期类仓位评估",
      source: "国家统计局（5月中旬）",
    },
    {
      title: "央行政策对冲落地",
      condition: "降准或非对称降息正式宣布",
      action: "流动性宽松预期兑现；债市直接受益，信用扩张预期提振成长类股票",
      source: "人民银行",
    },
    {
      title: "汇率破位",
      condition: "USD/CNY 突破 7.35（或 CFETS 指数快速下跌）",
      action: "资本流出压力信号；外债成本上升；关注央行是否加强管控",
      source: "中国外汇交易中心",
    },
    {
      title: "美国 4月 CPI（5月12日）",
      condition: "CPI 超预期上行（关税通胀传导），核心 PCE 维持高位",
      action: "降息路径进一步推迟；美元走强，新兴市场承压；黄金短期波动",
      source: "BLS / FRED CPIAUCSL（5月12日）",
    },
  ],
};
