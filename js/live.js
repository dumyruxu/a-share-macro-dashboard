/**
 * A股宏观看板 — 实时数据层
 * ==========================
 * 1. 从 /api/data 获取最新 JSON（或从 data/latest.json 静态读取）
 * 2. 将原始 API 数据映射为 DASHBOARD_DATA 格式
 * 3. 支持自动刷新（可配置间隔）
 * 4. 显示数据状态栏（最后更新时间、数据源状态）
 */

(function () {
  "use strict";

  // ---------------------------------------------------------------------------
  // Config
  // ---------------------------------------------------------------------------
  const CONFIG = {
    // Try API first, fallback to static file
    apiUrl: "/api/data",
    staticUrl: "data/latest.json",
    refreshInterval: 5 * 60 * 1000, // 5 minutes polling
    retryDelay: 10 * 1000, // 10 seconds on error
    maxRetries: 3,
  };

  // ---------------------------------------------------------------------------
  // State
  // ---------------------------------------------------------------------------
  let lastFetchTime = null;
  let liveData = null;
  let fetchErrors = 0;
  let refreshTimer = null;

  // ---------------------------------------------------------------------------
  // Fetch Data
  // ---------------------------------------------------------------------------
  async function fetchLiveData() {
    // Try API endpoint first
    try {
      const res = await fetch(CONFIG.apiUrl, { cache: "no-store" });
      if (res.ok) {
        liveData = await res.json();
        lastFetchTime = new Date();
        fetchErrors = 0;
        updateStatusBar("live");
        mergeLiveData();
        return;
      }
    } catch (e) {
      // API not available, try static file
    }

    // Fallback to static JSON
    try {
      const res = await fetch(CONFIG.staticUrl, { cache: "no-store" });
      if (res.ok) {
        liveData = await res.json();
        lastFetchTime = new Date();
        fetchErrors = 0;
        updateStatusBar("static");
        mergeLiveData();
        return;
      }
    } catch (e) {
      // Static file also not available
    }

    fetchErrors++;
    updateStatusBar("error");
  }

  // ---------------------------------------------------------------------------
  // Merge live data into DASHBOARD_DATA
  // ---------------------------------------------------------------------------
  function mergeLiveData() {
    if (!liveData || !window.DASHBOARD_DATA) return;

    const D = window.DASHBOARD_DATA;
    const fred = liveData.fred || {};
    const ak = liveData.akshare || {};
    const yf = liveData.yfinance || {};

    // Update meta
    if (liveData._meta) {
      D.meta.dataAsOf = liveData._meta.generated_date || D.meta.dataAsOf;
    }

    // --- Update KPIs with live data ---

    // Helper: find KPI by name substring and update
    function updateKpi(nameMatch, updates) {
      const kpi = D.kpis.find(
        (k) => k.name && k.name.includes(nameMatch)
      );
      if (kpi && updates.value !== null && updates.value !== undefined) {
        if (updates.value !== undefined) kpi.value = String(updates.value);
        if (updates.delta) kpi.delta = updates.delta;
        if (updates.updatedAt) kpi.updatedAt = updates.updatedAt;
        if (updates.signal) kpi.signal = updates.signal;
      }
    }

    // FRED: US 10Y
    if (fred.us_10y && fred.us_10y.value) {
      updateKpi("10Y 国债", {
        value: `${fred.us_10y.value}%`,
        updatedAt: fred.us_10y.date,
        delta: `FRED 实时数据`,
        signal: fred.us_10y.value > 4.5 ? "red" : fred.us_10y.value > 4.0 ? "yellow" : "green",
      });
    }

    // FRED: VIX
    if (fred.vix && fred.vix.value) {
      updateKpi("VIX", {
        value: `${fred.vix.value}`,
        updatedAt: fred.vix.date,
        delta: `FRED 实时数据`,
        signal: fred.vix.value > 28 ? "red" : fred.vix.value > 18 ? "yellow" : "green",
      });
    }

    // FRED: DXY
    if (fred.dxy_proxy && fred.dxy_proxy.value) {
      updateKpi("DXY", {
        value: `${fred.dxy_proxy.value}`,
        updatedAt: fred.dxy_proxy.date,
        delta: `FRED Broad Dollar Index`,
      });
    }

    // AKShare: DR007
    // AKShare: CPI
    if (ak.cn_cpi && ak.cn_cpi.yoy !== null) {
      updateKpi("CPI", {
        value: `${ak.cn_cpi.yoy > 0 ? "+" : ""}${ak.cn_cpi.yoy}%`,
        updatedAt: ak.cn_cpi.date,
        signal: ak.cn_cpi.yoy < 0 || ak.cn_cpi.yoy > 3 ? "red" : ak.cn_cpi.yoy < 0.5 ? "yellow" : "green",
      });
    }

    // AKShare: PPI
    if (ak.cn_ppi && ak.cn_ppi.yoy !== null) {
      updateKpi("PPI", {
        value: `${ak.cn_ppi.yoy > 0 ? "+" : ""}${ak.cn_ppi.yoy}%`,
        updatedAt: ak.cn_ppi.date,
        signal: ak.cn_ppi.yoy > 0 ? "green" : ak.cn_ppi.yoy > -2 ? "yellow" : "red",
      });
    }

    // yfinance: Index levels (inject into usMarket and aShare)
    if (yf.sp500 && yf.sp500.close) {
      const item = D.usMarket.find((u) => u.label.includes("标普") || u.label.includes("SPX"));
      if (item) {
        item.value = `${yf.sp500.close.toLocaleString()} (${yf.sp500.change_pct > 0 ? "+" : ""}${yf.sp500.change_pct}%)`;
      }
    }
    if (yf.nasdaq_composite && yf.nasdaq_composite.close) {
      const item = D.usMarket.find((u) => u.label.includes("纳斯达克") || u.label.includes("IXIC"));
      if (item) {
        item.value = `${yf.nasdaq_composite.close.toLocaleString()} (${yf.nasdaq_composite.change_pct > 0 ? "+" : ""}${yf.nasdaq_composite.change_pct}%)`;
      }
    }

    // Trigger re-render
    if (window.renderDashboard) {
      window.renderDashboard();
    }

    // Dispatch custom event for other scripts
    window.dispatchEvent(
      new CustomEvent("dashboard:data-updated", { detail: { liveData, lastFetchTime } })
    );
  }

  // ---------------------------------------------------------------------------
  // Status Bar
  // ---------------------------------------------------------------------------
  function createStatusBar() {
    if (document.getElementById("live-status-bar")) return;

    const bar = document.createElement("div");
    bar.id = "live-status-bar";
    bar.style.cssText = `
      position:fixed; bottom:0; left:0; right:0; z-index:9999;
      background:rgba(18,21,28,0.95); backdrop-filter:blur(8px);
      border-top:1px solid rgba(232,220,198,0.12);
      padding:8px 20px; display:flex; align-items:center; gap:16px;
      font-family:var(--font-mono,"JetBrains Mono",monospace); font-size:12px;
      color:rgba(232,220,198,0.6);
    `;
    bar.innerHTML = `
      <span id="status-indicator" style="width:8px;height:8px;border-radius:50%;background:#5bd39b;"></span>
      <span id="status-text">正在连接数据源...</span>
      <span style="flex:1"></span>
      <span id="status-time"></span>
      <button id="status-refresh" style="
        background:rgba(232,165,75,0.15); border:1px solid rgba(232,165,75,0.3);
        color:#e8a54b; padding:4px 12px; border-radius:6px; cursor:pointer;
        font-family:inherit; font-size:11px;
      ">刷新数据</button>
      <button id="status-toggle-auto" style="
        background:rgba(91,211,155,0.15); border:1px solid rgba(91,211,155,0.3);
        color:#5bd39b; padding:4px 12px; border-radius:6px; cursor:pointer;
        font-family:inherit; font-size:11px;
      ">自动刷新: 开</button>
    `;
    document.body.appendChild(bar);
    document.body.style.paddingBottom = "44px";

    document.getElementById("status-refresh").addEventListener("click", () => {
      fetchLiveData();
      // Also trigger server-side refresh if available
      fetch("/api/refresh", { method: "POST" }).catch(() => {});
    });

    let autoRefresh = true;
    document.getElementById("status-toggle-auto").addEventListener("click", (e) => {
      autoRefresh = !autoRefresh;
      e.target.textContent = `自动刷新: ${autoRefresh ? "开" : "关"}`;
      e.target.style.color = autoRefresh ? "#5bd39b" : "#f07178";
      e.target.style.borderColor = autoRefresh
        ? "rgba(91,211,155,0.3)"
        : "rgba(240,113,120,0.3)";
      e.target.style.background = autoRefresh
        ? "rgba(91,211,155,0.15)"
        : "rgba(240,113,120,0.15)";

      if (autoRefresh) {
        startAutoRefresh();
      } else {
        stopAutoRefresh();
      }
    });
  }

  function updateStatusBar(state) {
    const indicator = document.getElementById("status-indicator");
    const text = document.getElementById("status-text");
    const timeEl = document.getElementById("status-time");

    if (!indicator) return;

    switch (state) {
      case "live":
        indicator.style.background = "#5bd39b";
        indicator.style.boxShadow = "0 0 6px #5bd39b";
        text.textContent = "实时数据 · API 已连接";
        break;
      case "static":
        indicator.style.background = "#e8c547";
        indicator.style.boxShadow = "0 0 6px #e8c547";
        text.textContent = "静态数据 · 使用本地缓存";
        break;
      case "error":
        indicator.style.background = "#f07178";
        indicator.style.boxShadow = "0 0 6px #f07178";
        text.textContent = `连接失败 (${fetchErrors}次)`;
        break;
    }

    if (lastFetchTime) {
      timeEl.textContent = `最后更新: ${lastFetchTime.toLocaleTimeString("zh-CN")}`;
    }
  }

  // ---------------------------------------------------------------------------
  // Auto-refresh
  // ---------------------------------------------------------------------------
  function startAutoRefresh() {
    stopAutoRefresh();
    refreshTimer = setInterval(fetchLiveData, CONFIG.refreshInterval);
  }

  function stopAutoRefresh() {
    if (refreshTimer) {
      clearInterval(refreshTimer);
      refreshTimer = null;
    }
  }

  // ---------------------------------------------------------------------------
  // Init
  // ---------------------------------------------------------------------------
  function init() {
    createStatusBar();
    fetchLiveData();
    startAutoRefresh();
  }

  // Expose for external use
  window.liveDataLayer = {
    fetch: fetchLiveData,
    getData: () => liveData,
    getLastFetchTime: () => lastFetchTime,
  };

  // Start when DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
