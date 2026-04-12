(function () {
  const data = window.DASHBOARD_DATA;
  if (!data) {
    document.body.innerHTML =
      '<p style="padding:2rem;font-family:sans-serif">未找到数据：请确认已加载 js/data.js</p>';
    return;
  }

  const $ = (id) => document.getElementById(id);

  function esc(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  const signalLabel = { green: "绿", yellow: "黄", red: "红" };

  $("boardTitle").textContent = data.meta.title;

  $("metaBar").innerHTML = [
    `<span><strong>周期</strong> ${esc(data.meta.periodLabel)}</span>`,
    `<span><strong>数据截止</strong> ${esc(data.meta.dataAsOf)}</span>`,
    `<span><strong>下次更新</strong> ${esc(data.meta.nextUpdateDue)}</span>`,
    `<span><strong>频率</strong> ${esc(data.meta.frequency)}</span>`,
  ].join("");

  const s = data.summary;
  $("summaryBlock").innerHTML = `
    <div class="summary__row">
      <div class="summary__label">市场主线</div>
      <div class="summary__value">${esc(s.marketTheme)}</div>
    </div>
    <div class="summary__row">
      <div class="summary__label">风险偏好</div>
      <div class="summary__value">${esc(s.riskAppetite)} <span style="color:var(--faint);font-size:0.88rem">（${esc(s.riskAppetiteNote)}）</span></div>
    </div>
    <div class="summary__row">
      <div class="summary__label">A股</div>
      <div class="summary__value">${esc(s.aShareView)} <span style="color:var(--faint);font-size:0.88rem">（${esc(s.aShareViewNote)}）</span></div>
    </div>
    <div class="summary__row">
      <div class="summary__label">美股</div>
      <div class="summary__value">${esc(s.usView)}</div>
    </div>
  `;

  $("kpiGrid").innerHTML = data.kpis
    .map((k, i) => {
      const sig = k.signal || "yellow";
      return `
      <article class="kpi-card" data-signal="${esc(sig)}" style="animation-delay:${Math.min(i * 45, 400)}ms">
        <div class="kpi-card__dim">${esc(k.dim)}</div>
        <div class="kpi-card__name">${esc(k.name)}</div>
        <div class="kpi-card__value">${esc(k.value)}</div>
        <div class="kpi-card__delta">${esc(k.delta)}</div>
        <div class="kpi-card__foot kpi-card__foot--stack">
          <div class="kpi-card__footline">
            <span class="signal-pill" data-signal="${esc(sig)}">● ${signalLabel[sig] || "—"}</span>
            <span>${esc(k.updatedAt)}</span>
          </div>
          <a class="kpi-card__link" href="${esc(k.source)}" target="_blank" rel="noopener noreferrer">${esc(k.sourceLabel)}</a>
        </div>
      </article>`;
    })
    .join("");

  const fw = data.framework;
  $("quadGrid").innerHTML = ["growth", "inflation", "liquidity", "risk"]
    .map((key) => {
      const q = fw[key];
      const metrics = q.metrics.map((m) => `<li>${esc(m)}</li>`).join("");
      return `
      <div class="quad">
        <h3 class="quad__title">${esc(q.title)}</h3>
        <ul class="quad__metrics">${metrics}</ul>
        <p class="quad__note">${esc(q.note)}</p>
      </div>`;
    })
    .join("");

  const cn = data.aShare;
  $("cnBlock").innerHTML = `
    <div class="sector-pair">
      <div class="sector-box">
        <h3>行业偏强 Top</h3>
        <ul class="sector-list">
          ${cn.sectorsTop.map((x) => `<li><span>${esc(x.name)}</span><span>${esc(x.note)}</span></li>`).join("")}
        </ul>
      </div>
      <div class="sector-box">
        <h3>行业偏弱 Bottom</h3>
        <ul class="sector-list">
          ${cn.sectorsBottom.map((x) => `<li><span>${esc(x.name)}</span><span>${esc(x.note)}</span></li>`).join("")}
        </ul>
      </div>
    </div>
    <h3 class="quad__title" style="margin-bottom:0.75rem">资金面（相对强度示意）</h3>
    <div class="flow-bars">
      ${cn.flows
        .map(
          (f) => `
        <div class="flow-item">
          <span class="flow-item__label">${esc(f.label)}</span>
          <div class="flow-item__track"><div class="flow-item__fill" style="width:${Math.max(8, Math.min(100, f.bar))}%"></div></div>
          <span class="flow-item__val">${esc(f.valueText)}</span>
        </div>`
        )
        .join("")}
    </div>
    <p style="margin:1rem 0 0;font-size:0.8rem;color:var(--faint)">条形图为手动设定相对强度（0–100），可在 data.js 的 flows[].bar 中调整。</p>
  `;

  $("usBlock").innerHTML = `<ul class="us-list">${data.usMarket.map((u) => `<li><span>${esc(u.label)}</span><span>${esc(u.value)}</span></li>`).join("")}</ul>`;

  $("scenarioRow").innerHTML = data.scenarios
    .map(
      (sc) => `
    <div class="scenario">
      <h3>${esc(sc.name)}</h3>
      <div class="scenario__prob">概率 ${esc(sc.probability)}</div>
      <p>${esc(sc.text)}</p>
    </div>`
    )
    .join("");

  $("watchList").innerHTML = data.watchlist
    .map(
      (w) => `
    <li>
      <div class="watch-item__title">${esc(w.title)}</div>
      <div class="watch-item__grid">
        <div><strong>条件</strong> ${esc(w.condition)}</div>
        <div><strong>动作</strong> ${esc(w.action)}</div>
        <div><strong>来源</strong> ${esc(w.source)}</div>
      </div>
    </li>`
    )
    .join("");

  const methodBlock =
    data.meta.methodology && data.meta.methodology.length
      ? `<div class="foot-method"><strong class="foot-method__title">口径与判断说明</strong><ul>${data.meta.methodology.map((m) => `<li>${esc(m)}</li>`).join("")}</ul></div>`
      : "";

  $("foot").innerHTML = `
    ${methodBlock}
    <p class="foot-line">周更流程：编辑 <code>js/data.js</code> → 保存 → 刷新浏览器。</p>
    <p class="foot-line">本地预览（可选）：在项目目录执行 <code>python3 -m http.server 8080</code> 后访问 <code>http://127.0.0.1:8080</code>。</p>
    <p class="foot-line">© ${new Date().getFullYear()} · 数据由使用者自行核对，本页不构成投资建议。</p>
  `;
})();
