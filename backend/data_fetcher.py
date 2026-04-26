"""
A股宏观看板 — 自动数据抓取器
==============================
从 AKShare（中国数据）、FRED API（美国数据）、yfinance（全球指数）拉取最新数据，
输出 JSON 到 data/latest.json 供前端读取。

用法:
    python backend/data_fetcher.py                  # 一次性拉取
    python backend/data_fetcher.py --fred-key YOUR_KEY  # 指定 FRED API Key

环境变量:
    FRED_API_KEY — FRED API 密钥（免费申请: https://fred.stlouisfed.org/docs/api/api_key.html）
"""

import json
import os
import sys
import argparse
import traceback
from datetime import datetime, timedelta
from pathlib import Path

# ---------------------------------------------------------------------------
# Paths
# ---------------------------------------------------------------------------
ROOT = Path(__file__).resolve().parent.parent
DATA_DIR = ROOT / "data"
DATA_DIR.mkdir(exist_ok=True)
OUTPUT_FILE = DATA_DIR / "latest.json"

# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------
def safe(fn, default=None, label=""):
    """Run fn(), return result or default on error."""
    try:
        return fn()
    except Exception as e:
        print(f"  [WARN] {label}: {e}")
        return default

def fmt_pct(v, decimals=1):
    if v is None:
        return None
    return round(float(v), decimals)

def fmt_num(v, decimals=2):
    if v is None:
        return None
    return round(float(v), decimals)

def ts_to_str(ts):
    """Convert pandas Timestamp or datetime to YYYY-MM-DD string."""
    if ts is None:
        return None
    if hasattr(ts, 'strftime'):
        return ts.strftime('%Y-%m-%d')
    return str(ts)[:10]

# ---------------------------------------------------------------------------
# FRED Data (US Macro)
# ---------------------------------------------------------------------------
def fetch_fred(api_key):
    """Fetch US macro data from FRED."""
    print("[1/3] Fetching FRED data (US macro)...")
    from fredapi import Fred
    fred = Fred(api_key=api_key)

    result = {}

    # Helper to get latest value from a FRED series
    def get_latest(series_id, label=""):
        s = fred.get_series(series_id)
        s = s.dropna()
        if s.empty:
            return None, None
        return fmt_num(s.iloc[-1], 2), ts_to_str(s.index[-1])

    # US 10Y Treasury
    v, d = safe(lambda: get_latest('DGS10'), (None, None), "DGS10")
    result['us_10y'] = {'value': v, 'date': d, 'source': 'FRED DGS10'}

    # US 2Y Treasury
    v, d = safe(lambda: get_latest('DGS2'), (None, None), "DGS2")
    result['us_2y'] = {'value': v, 'date': d, 'source': 'FRED DGS2'}

    # US 10Y TIPS (real yield)
    v, d = safe(lambda: get_latest('DFII10'), (None, None), "DFII10")
    result['us_tips_10y'] = {'value': v, 'date': d, 'source': 'FRED DFII10'}

    # VIX
    v, d = safe(lambda: get_latest('VIXCLS'), (None, None), "VIXCLS")
    result['vix'] = {'value': v, 'date': d, 'source': 'FRED VIXCLS'}

    # Fed Funds Effective Rate
    v, d = safe(lambda: get_latest('DFF'), (None, None), "DFF")
    result['fed_funds'] = {'value': v, 'date': d, 'source': 'FRED DFF'}

    # US CPI YoY
    def calc_cpi_yoy():
        cpi = fred.get_series('CPIAUCSL').dropna()
        if len(cpi) < 13:
            return None, None
        latest = cpi.iloc[-1]
        year_ago = cpi.iloc[-13]  # ~12 months ago
        yoy = (latest / year_ago - 1) * 100
        return fmt_pct(yoy), ts_to_str(cpi.index[-1])
    v, d = safe(lambda: calc_cpi_yoy(), (None, None), "CPI YoY")
    result['us_cpi_yoy'] = {'value': v, 'date': d, 'source': 'FRED CPIAUCSL'}

    # Core PCE YoY
    def calc_pce_yoy():
        pce = fred.get_series('PCEPILFE').dropna()
        if len(pce) < 13:
            return None, None
        latest = pce.iloc[-1]
        year_ago = pce.iloc[-13]
        yoy = (latest / year_ago - 1) * 100
        return fmt_pct(yoy), ts_to_str(pce.index[-1])
    v, d = safe(lambda: calc_pce_yoy(), (None, None), "Core PCE")
    result['us_core_pce_yoy'] = {'value': v, 'date': d, 'source': 'FRED PCEPILFE'}

    # HY Credit Spread
    v, d = safe(lambda: get_latest('BAMLH0A0HYM2'), (None, None), "HY Spread")
    result['us_hy_spread'] = {'value': v, 'date': d, 'source': 'FRED BAMLH0A0HYM2'}

    # IG Credit Spread
    v, d = safe(lambda: get_latest('BAMLC0A0CM'), (None, None), "IG Spread")
    result['us_ig_spread'] = {'value': v, 'date': d, 'source': 'FRED BAMLC0A0CM'}

    # DXY (not directly on FRED, use DTWEXBGS as proxy)
    v, d = safe(lambda: get_latest('DTWEXBGS'), (None, None), "DXY proxy")
    result['dxy_proxy'] = {'value': v, 'date': d, 'source': 'FRED DTWEXBGS (Broad Dollar)'}

    # US ISM Manufacturing PMI
    v, d = safe(lambda: get_latest('MANEMP'), (None, None), "ISM Mfg")
    # NAPM is the actual ISM PMI on FRED
    v2, d2 = safe(lambda: get_latest('NAPM'), (None, None), "NAPM")
    if v2 is not None:
        result['us_ism_mfg'] = {'value': v2, 'date': d2, 'source': 'FRED NAPM'}
    else:
        result['us_ism_mfg'] = {'value': None, 'date': None, 'source': 'FRED NAPM'}

    # Nonfarm Payrolls (month-over-month change)
    def calc_nfp():
        nfp = fred.get_series('PAYEMS').dropna()
        if len(nfp) < 2:
            return None, None
        change = int(nfp.iloc[-1] - nfp.iloc[-2])  # thousands
        return change, ts_to_str(nfp.index[-1])
    v, d = safe(lambda: calc_nfp(), (None, None), "NFP")
    result['us_nfp_change'] = {'value': v, 'date': d, 'source': 'FRED PAYEMS'}

    # Unemployment Rate
    v, d = safe(lambda: get_latest('UNRATE'), (None, None), "UNRATE")
    result['us_unemployment'] = {'value': v, 'date': d, 'source': 'FRED UNRATE'}

    print(f"  FRED: fetched {len(result)} series")
    return result


# ---------------------------------------------------------------------------
# AKShare Data (China Macro + A-Share Market)
# ---------------------------------------------------------------------------
def fetch_akshare():
    """Fetch China macro + A-share market data from AKShare."""
    print("[2/3] Fetching AKShare data (China macro + market)...")
    import akshare as ak
    import pandas as pd

    result = {}

    # --- Macro ---

    # China PMI
    def get_pmi():
        df = ak.macro_china_pmi()
        if df is not None and not df.empty:
            latest = df.iloc[-1]
            return {
                'manufacturing': safe(lambda: fmt_pct(latest.get('制造业', latest.iloc[1] if len(latest) > 1 else None)), label="PMI mfg"),
                'date': safe(lambda: str(latest.iloc[0])[:10] if len(latest) > 0 else None, label="PMI date"),
                'source': 'AKShare macro_china_pmi'
            }
        return None
    result['cn_pmi'] = safe(lambda: get_pmi(), label="CN PMI")

    # China CPI
    def get_cpi():
        df = ak.macro_china_cpi_monthly()
        if df is not None and not df.empty:
            latest = df.iloc[-1]
            return {
                'yoy': safe(lambda: fmt_pct(latest.iloc[1]) if len(latest) > 1 else None, label="CPI val"),
                'date': safe(lambda: str(latest.iloc[0])[:10], label="CPI date"),
                'source': 'AKShare macro_china_cpi_monthly'
            }
        return None
    result['cn_cpi'] = safe(lambda: get_cpi(), label="CN CPI")

    # China PPI
    def get_ppi():
        df = ak.macro_china_ppi_monthly()
        if df is not None and not df.empty:
            latest = df.iloc[-1]
            return {
                'yoy': safe(lambda: fmt_pct(latest.iloc[1]) if len(latest) > 1 else None, label="PPI val"),
                'date': safe(lambda: str(latest.iloc[0])[:10], label="PPI date"),
                'source': 'AKShare macro_china_ppi_monthly'
            }
        return None
    result['cn_ppi'] = safe(lambda: get_ppi(), label="CN PPI")

    # Social Financing
    def get_social_financing():
        df = ak.macro_china_shrzgm()
        if df is not None and not df.empty:
            latest = df.iloc[-1]
            return {
                'value': safe(lambda: fmt_num(latest.iloc[1]) if len(latest) > 1 else None, label="SF val"),
                'date': safe(lambda: str(latest.iloc[0])[:10], label="SF date"),
                'source': 'AKShare macro_china_shrzgm'
            }
        return None
    result['cn_social_financing'] = safe(lambda: get_social_financing(), label="CN Social Financing")

    # Money Supply M2
    def get_m2():
        df = ak.macro_china_money_supply()
        if df is not None and not df.empty:
            latest = df.iloc[-1]
            return {
                'm2_yoy': safe(lambda: fmt_pct(latest.get('M2-同比增长', latest.iloc[2] if len(latest) > 2 else None)), label="M2"),
                'm1_yoy': safe(lambda: fmt_pct(latest.get('M1-同比增长', latest.iloc[4] if len(latest) > 4 else None)), label="M1"),
                'date': safe(lambda: str(latest.iloc[0])[:10], label="M date"),
                'source': 'AKShare macro_china_money_supply'
            }
        return None
    result['cn_money_supply'] = safe(lambda: get_m2(), label="CN Money Supply")

    # --- Market Data ---

    # Northbound flow (Stock Connect)
    def get_northbound():
        df = ak.stock_hsgt_north_net_flow_in_em(symbol="沪深港通")
        if df is not None and not df.empty:
            recent = df.tail(5)
            flows = []
            for _, row in recent.iterrows():
                flows.append({
                    'date': safe(lambda r=row: str(r.iloc[0])[:10], label="NB date"),
                    'net_flow': safe(lambda r=row: fmt_num(r.iloc[1], 2) if len(r) > 1 else None, label="NB flow"),
                })
            return {'recent_days': flows, 'source': 'AKShare stock_hsgt_north_net_flow_in_em'}
        return None
    result['cn_northbound'] = safe(lambda: get_northbound(), label="Northbound")

    # Margin Trading (两融)
    def get_margin():
        df = ak.stock_margin_sse(start_date=(datetime.now() - timedelta(days=30)).strftime('%Y%m%d'),
                                  end_date=datetime.now().strftime('%Y%m%d'))
        if df is not None and not df.empty:
            latest = df.iloc[-1]
            return {
                'balance': safe(lambda: fmt_num(latest.iloc[1] / 1e8, 0) if len(latest) > 1 else None, label="Margin bal"),
                'date': safe(lambda: str(latest.iloc[0])[:10], label="Margin date"),
                'unit': '亿元',
                'source': 'AKShare stock_margin_sse'
            }
        return None
    result['cn_margin'] = safe(lambda: get_margin(), label="Margin Trading")

    # China bond yield (10Y)
    def get_cn_bond():
        df = ak.bond_china_yield(start_date=(datetime.now() - timedelta(days=30)).strftime('%Y%m%d'),
                                  end_date=datetime.now().strftime('%Y%m%d'))
        if df is not None and not df.empty:
            # Filter for 10Y
            df_10y = df[df.iloc[:, 1].astype(str).str.contains('10')]
            if not df_10y.empty:
                latest = df_10y.iloc[-1]
                return {
                    'value': safe(lambda: fmt_num(latest.iloc[2], 4) if len(latest) > 2 else None, label="CN 10Y"),
                    'date': safe(lambda: str(latest.iloc[0])[:10], label="CN 10Y date"),
                    'source': 'AKShare bond_china_yield'
                }
        return None
    result['cn_10y_bond'] = safe(lambda: get_cn_bond(), label="CN 10Y Bond")

    # USD/CNY
    def get_usdcny():
        df = ak.fx_spot_quote()
        if df is not None and not df.empty:
            usd_row = df[df.iloc[:, 0].astype(str).str.contains('美元')]
            if not usd_row.empty:
                return {
                    'value': safe(lambda: fmt_num(usd_row.iloc[0, 3], 4) if usd_row.shape[1] > 3 else None, label="USDCNY"),
                    'source': 'AKShare fx_spot_quote'
                }
        return None
    result['usd_cny'] = safe(lambda: get_usdcny(), label="USD/CNY")

    print(f"  AKShare: fetched {len(result)} datasets")
    return result


# ---------------------------------------------------------------------------
# yfinance Data (Global Indices)
# ---------------------------------------------------------------------------
def fetch_yfinance():
    """Fetch global index levels from yfinance."""
    print("[3/3] Fetching yfinance data (global indices)...")
    import yfinance as yf

    tickers = {
        'shanghai_composite': '000001.SS',
        'shenzhen_component': '399001.SZ',
        'chinext':            '399006.SZ',
        'csi_300':            '000300.SS',
        'sp500':              '^GSPC',
        'nasdaq_composite':   '^IXIC',
        'nasdaq_100':         '^NDX',
        'russell_2000':       '^RUT',
        'dxy':                'DX-Y.NYB',
        'vix_yf':             '^VIX',
        'brent_oil':          'BZ=F',
        'gold':               'GC=F',
    }

    result = {}
    for key, symbol in tickers.items():
        def fetch_one(sym=symbol):
            t = yf.Ticker(sym)
            hist = t.history(period='5d')
            if hist.empty:
                return None
            last = hist.iloc[-1]
            return {
                'close': fmt_num(last['Close'], 2),
                'date': ts_to_str(hist.index[-1]),
                'change_pct': fmt_pct(
                    (last['Close'] / hist.iloc[-2]['Close'] - 1) * 100
                ) if len(hist) >= 2 else None,
            }
        result[key] = safe(lambda: fetch_one(), label=f"yf:{symbol}")

    # YTD performance for key indices
    ytd_tickers = {
        'sp500_ytd': '^GSPC',
        'nasdaq_ytd': '^IXIC',
        'russell_ytd': '^RUT',
        'shanghai_ytd': '000001.SS',
    }
    for key, symbol in ytd_tickers.items():
        def fetch_ytd(sym=symbol):
            t = yf.Ticker(sym)
            hist = t.history(period='ytd')
            if hist.empty or len(hist) < 2:
                return None
            first = hist.iloc[0]['Close']
            last = hist.iloc[-1]['Close']
            return fmt_pct((last / first - 1) * 100)
        result[key] = safe(lambda: fetch_ytd(), label=f"ytd:{symbol}")

    print(f"  yfinance: fetched {len(result)} tickers")
    return result


# ---------------------------------------------------------------------------
# Assemble & Write JSON
# ---------------------------------------------------------------------------
def assemble_data(fred_data, akshare_data, yfinance_data):
    """Combine all data sources into a single JSON structure."""
    now = datetime.now()

    output = {
        '_meta': {
            'generated_at': now.isoformat(),
            'generated_date': now.strftime('%Y-%m-%d'),
            'generated_time': now.strftime('%H:%M:%S'),
            'sources': ['FRED API', 'AKShare', 'yfinance'],
            'note': '自动生成，部分数据可能因API限制而缺失',
        },
        'fred': fred_data or {},
        'akshare': akshare_data or {},
        'yfinance': yfinance_data or {},
    }
    return output


def main():
    parser = argparse.ArgumentParser(description='A股宏观看板数据抓取器')
    parser.add_argument('--fred-key', type=str, default=None,
                        help='FRED API Key (or set FRED_API_KEY env var)')
    parser.add_argument('--skip-fred', action='store_true',
                        help='Skip FRED data fetching')
    parser.add_argument('--skip-akshare', action='store_true',
                        help='Skip AKShare data fetching')
    parser.add_argument('--skip-yfinance', action='store_true',
                        help='Skip yfinance data fetching')
    args = parser.parse_args()

    fred_key = args.fred_key or os.environ.get('FRED_API_KEY', '')

    print("=" * 60)
    print(f"A股宏观看板 — 数据抓取开始: {datetime.now().isoformat()}")
    print("=" * 60)

    # Fetch FRED
    fred_data = None
    if not args.skip_fred:
        if not fred_key:
            print("  [SKIP] FRED: 未提供 API Key (--fred-key 或 FRED_API_KEY)")
            print("         免费申请: https://fred.stlouisfed.org/docs/api/api_key.html")
        else:
            fred_data = safe(lambda: fetch_fred(fred_key), label="FRED total")
    else:
        print("  [SKIP] FRED (--skip-fred)")

    # Fetch AKShare
    akshare_data = None
    if not args.skip_akshare:
        akshare_data = safe(lambda: fetch_akshare(), label="AKShare total")
    else:
        print("  [SKIP] AKShare (--skip-akshare)")

    # Fetch yfinance
    yfinance_data = None
    if not args.skip_yfinance:
        yfinance_data = safe(lambda: fetch_yfinance(), label="yfinance total")
    else:
        print("  [SKIP] yfinance (--skip-yfinance)")

    # Assemble
    data = assemble_data(fred_data, akshare_data, yfinance_data)

    # Write JSON
    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2, default=str)

    print("=" * 60)
    print(f"Done! Output: {OUTPUT_FILE}")
    print(f"File size: {OUTPUT_FILE.stat().st_size:,} bytes")
    print("=" * 60)

    return data


if __name__ == '__main__':
    main()
