/* =============================================================
   Japanese Document Intelligence Pipeline — demonstration engine.
   Fully client-side. No network calls, no real personal data.
   Extraction results for the preloaded samples are representative
   and fixed; a live pilot runs a client's own documents through
   the real pipeline. Everything here is clearly labelled "Demo".
   ============================================================= */
(function () {
  "use strict";

  var root = document.getElementById("doc-demo");
  if (!root) return;

  // ---- Sample documents (no real personal data) ----
  var SAMPLES = [
    {
      id: "invoice",
      name: "請求書",
      nameEn: "Invoice",
      meta: "PDF · 8 fields · 0 flagged",
      doc: {
        title: "請求書",
        rows: [
          ["請求書番号", "INV-2024-0512"],
          ["発行日", "令和6年5月12日"],
          ["請求先", "株式会社山田製作所"],
          ["件名", "AIシステム開発 業務委託"],
          ["小計", "¥482,000"],
          ["消費税 (10%)", "¥48,200"],
          ["合計金額", "¥530,200"],
          ["支払期限", "令和6年6月30日"]
        ]
      },
      fields: [
        { key: "document_type", label: "文書種別", value: "請求書 (Invoice)", conf: 0.99, flag: "ok" },
        { key: "invoice_no", label: "請求書番号", value: "INV-2024-0512", conf: 0.99, flag: "ok" },
        { key: "issue_date", label: "発行日", value: "2024-05-12", raw: "令和6年5月12日", conf: 0.97, flag: "ok", note: "和暦→西暦 変換済み" },
        { key: "supplier_name", label: "請求先", value: "株式会社山田製作所", conf: 0.98, flag: "ok" },
        { key: "subtotal", label: "小計", value: "482000", conf: 0.99, flag: "ok" },
        { key: "tax", label: "消費税", value: "48200", conf: 0.99, flag: "ok", note: "10% of subtotal ✓" },
        { key: "total", label: "合計金額", value: "530200", conf: 0.99, flag: "ok", note: "subtotal + tax ✓" },
        { key: "due_date", label: "支払期限", value: "2024-06-30", raw: "令和6年6月30日", conf: 0.96, flag: "ok" }
      ],
      audit: [
        ["ingest", "ok", "1 document received · 1 page · 320 KB"],
        ["extract", "ok", "8 fields extracted · JP layout model"],
        ["normalize", "ok", "和暦 dates → ISO 8601 (2 fields)"],
        ["validate", "ok", "Consumption tax 10% verified"],
        ["validate", "ok", "subtotal + tax = total verified"],
        ["export", "ok", "Structured JSON + CSV produced"]
      ]
    },
    {
      id: "quote",
      name: "見積書",
      nameEn: "Quotation",
      meta: "Scanned image · 8 fields · 2 flagged",
      doc: {
        title: "御見積書",
        rows: [
          ["見積番号", "EST-0345"],
          ["発行日", "2024年4月3日"],
          ["御中", "みらい商事株式会社"],
          ["件名", "文書処理自動化 PoC"],
          ["小計", "¥350,000"],
          ["消費税", "¥28,000"],
          ["合計", "¥378,000"],
          ["備考", "（手書き）納期応相談"]
        ]
      },
      fields: [
        { key: "document_type", label: "文書種別", value: "見積書 (Quotation)", conf: 0.98, flag: "ok" },
        { key: "quote_no", label: "見積番号", value: "EST-0345", conf: 0.97, flag: "ok" },
        { key: "issue_date", label: "発行日", value: "2024-04-03", raw: "2024年4月3日", conf: 0.95, flag: "ok" },
        { key: "customer_name", label: "御中", value: "みらい商事株式会社", conf: 0.96, flag: "ok" },
        { key: "subtotal", label: "小計", value: "350000", conf: 0.94, flag: "ok" },
        { key: "tax", label: "消費税", value: "28000", conf: 0.93, flag: "err", note: "8% detected — expected 10% (¥35,000). Rule mismatch." },
        { key: "total", label: "合計", value: "378000", conf: 0.93, flag: "warn", note: "Consistent with 8% tax; confirm tax rate with issuer." },
        { key: "remarks", label: "備考", value: "納期応相談", conf: 0.71, flag: "warn", note: "Handwritten annotation · low confidence" }
      ],
      audit: [
        ["ingest", "ok", "1 document received · scanned image · 210 KB"],
        ["extract", "ok", "8 fields extracted · JP layout + handwriting model"],
        ["normalize", "ok", "和暦/西暦 dates normalized"],
        ["validate", "warn", "Tax rate 8% ≠ expected 10% — flagged"],
        ["validate", "warn", "Handwritten field below 0.80 confidence — flagged"],
        ["route", "warn", "2 fields routed to human-review queue"]
      ]
    },
    {
      id: "delivery",
      name: "納品書",
      nameEn: "Delivery note",
      meta: "PDF · 10 fields · 1 flagged",
      doc: {
        title: "納品書",
        rows: [
          ["納品書番号", "DN-778120"],
          ["納品日", "令和6年3月28日"],
          ["納品先", "株式会社北陸電機"],
          ["品目", "組込みAIモジュール ×120"],
          ["単価", "¥6,500"],
          ["金額", "¥780,000"],
          ["消費税", "¥78,000"],
          ["合計", "¥858,000"]
        ]
      },
      fields: [
        { key: "document_type", label: "文書種別", value: "納品書 (Delivery note)", conf: 0.99, flag: "ok" },
        { key: "delivery_no", label: "納品書番号", value: "DN-778120", conf: 0.98, flag: "ok" },
        { key: "delivery_date", label: "納品日", value: "2024-03-28", raw: "令和6年3月28日", conf: 0.96, flag: "ok" },
        { key: "customer_name", label: "納品先", value: "株式会社北陸電機", conf: 0.97, flag: "ok" },
        { key: "item", label: "品目", value: "組込みAIモジュール", conf: 0.9, flag: "ok" },
        { key: "quantity", label: "数量", value: "120", conf: 0.88, flag: "warn", note: "Parsed from '×120' — confirm quantity" },
        { key: "unit_price", label: "単価", value: "6500", conf: 0.95, flag: "ok" },
        { key: "amount", label: "金額", value: "780000", conf: 0.98, flag: "ok", note: "unit_price × quantity ✓" },
        { key: "tax", label: "消費税", value: "78000", conf: 0.98, flag: "ok", note: "10% ✓" },
        { key: "total", label: "合計", value: "858000", conf: 0.98, flag: "ok", note: "amount + tax ✓" }
      ],
      audit: [
        ["ingest", "ok", "1 document received · 1 page · 288 KB"],
        ["extract", "ok", "10 fields extracted · JP layout model"],
        ["normalize", "ok", "和暦 date → ISO 8601"],
        ["validate", "ok", "unit_price × quantity = amount verified"],
        ["validate", "warn", "Quantity parsed from '×120' — confidence 0.88"],
        ["export", "ok", "Structured JSON + CSV produced"]
      ]
    }
  ];

  var CONF_THRESHOLD = 0.80;

  // ---- Elements ----
  var listEl = root.querySelector("[data-samples]");
  var mainEl = root.querySelector("[data-main]");
  var stepsEl = root.querySelector("[data-steps]");
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var current = null;

  // ---- Build sample buttons ----
  SAMPLES.forEach(function (s, i) {
    var b = document.createElement("button");
    b.className = "sample-btn" + (i === 0 ? "" : "");
    b.type = "button";
    b.setAttribute("data-id", s.id);
    b.innerHTML =
      '<span class="s-name"><span class="jp">' + s.name + "</span> · " + s.nameEn + "</span>" +
      '<span class="s-meta">' + s.meta + "</span>";
    b.addEventListener("click", function () { selectSample(s.id); });
    listEl.appendChild(b);
  });

  // Upload (honest: preview only; extraction shown on preloaded samples)
  var uploadNote = root.querySelector("[data-upload-note]");
  var fileInput = root.querySelector("#demo-file");
  if (fileInput) {
    fileInput.addEventListener("change", function () {
      if (fileInput.files && fileInput.files.length) {
        uploadNote.hidden = false;
        uploadNote.textContent =
          '"' + fileInput.files[0].name + '" received. In this demonstration, extraction output is shown for the ' +
          "preloaded samples below. A live pilot runs your own documents through the real pipeline.";
      }
    });
  }

  var STEPS = ["Ingest", "Extract", "Normalize", "Validate", "Export"];

  function renderSteps(activeIndex) {
    stepsEl.innerHTML = "";
    STEPS.forEach(function (name, i) {
      var d = document.createElement("span");
      var state = i < activeIndex ? "done" : (i === activeIndex ? "active" : "");
      d.className = "demo-step " + state;
      d.innerHTML = '<span class="dot"></span>' + name;
      stepsEl.appendChild(d);
    });
  }

  function selectSample(id) {
    current = SAMPLES.filter(function (s) { return s.id === id; })[0];
    if (!current) return;
    listEl.querySelectorAll(".sample-btn").forEach(function (b) {
      b.classList.toggle("active", b.getAttribute("data-id") === id);
    });
    runPipeline();
  }

  function runPipeline() {
    var i = 0;
    renderSteps(0);
    mainEl.innerHTML = '<div class="demo-empty">Processing ' + current.name + " …</div>";
    if (reduce) { renderSteps(STEPS.length); renderResults(); return; }
    var timer = setInterval(function () {
      i++;
      if (i >= STEPS.length) {
        clearInterval(timer);
        renderSteps(STEPS.length);
        renderResults();
      } else {
        renderSteps(i);
      }
    }, 420);
  }

  function pct(x) { return Math.round(x * 100) + "%"; }
  function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }

  function flagLabel(f) {
    if (f === "ok") return '<span class="flag ok">Valid</span>';
    if (f === "warn") return '<span class="flag warn">Review</span>';
    return '<span class="flag err">Rule failed</span>';
  }

  function renderResults() {
    var s = current;
    var reviewItems = s.fields.filter(function (f) { return f.flag !== "ok" || f.conf < CONF_THRESHOLD; });

    // JSON
    var jsonObj = { document_type: undefined, source: "demo-sample:" + s.id, fields: {} };
    s.fields.forEach(function (f) {
      if (f.key === "document_type") { jsonObj.document_type = f.value; return; }
      jsonObj.fields[f.key] = isNumeric(f.value) ? Number(f.value) : f.value;
    });
    var jsonStr = jsonHighlight(jsonObj);

    var html = "";
    html += '<div class="demo-tabs" role="tablist">';
    html += '<button class="demo-tab active" data-tab="fields" role="tab">Extracted fields</button>';
    html += '<button class="demo-tab" data-tab="json" role="tab">JSON output</button>';
    html += '<button class="demo-tab" data-tab="audit" role="tab">Audit log</button>';
    html += '<button class="demo-tab" data-tab="review" role="tab">Review queue (' + reviewItems.length + ")</button>";
    html += "</div>";

    // Fields panel
    html += '<div class="demo-panel active" data-panel="fields">';
    html += '<table class="result-table"><thead><tr><th>Field</th><th>Value</th><th>Confidence</th><th>Status</th></tr></thead><tbody>';
    s.fields.forEach(function (f) {
      html += "<tr><td class=\"field-label\">" + esc(f.label) + (f.raw ? '<br><span style="font-size:11px">← ' + esc(f.raw) + "</span>" : "") + "</td>";
      html += '<td class="field-value jp">' + esc(f.value) + (f.note ? '<br><span class="text-muted small" style="font-weight:400">' + esc(f.note) + "</span>" : "") + "</td>";
      html += '<td><span class="conf">' + pct(f.conf) + "</span></td>";
      html += "<td>" + flagLabel(f.flag) + "</td></tr>";
    });
    html += "</tbody></table></div>";

    // JSON panel
    html += '<div class="demo-panel" data-panel="json"><pre class="json">' + jsonStr + "</pre>";
    html += '<p class="form-note mt-4">Structured output is also produced as CSV for spreadsheet and ERP import.</p></div>';

    // Audit panel
    html += '<div class="demo-panel" data-panel="audit"><ul class="audit-log">';
    var t0 = Date.now();
    s.audit.forEach(function (a, idx) {
      var ts = new Date(t0 + idx * 380).toISOString().substr(11, 8);
      html += "<li><span class=\"t\">" + ts + '</span><span class="lv ' + a[1] + '">' + a[1].toUpperCase() + "</span><span>" + esc(a[2]) + "</span></li>";
    });
    html += "</ul></div>";

    // Review queue panel
    html += '<div class="demo-panel" data-panel="review">';
    if (!reviewItems.length) {
      html += '<div class="demo-empty" style="min-height:120px">No exceptions. All fields passed validation above the ' + pct(CONF_THRESHOLD) + " confidence threshold.</div>";
    } else {
      html += '<p class="form-note" style="margin-bottom:12px">Exceptions are held for a human to confirm before the record is committed. Nothing auto-posts on a failed rule or low confidence.</p>';
      html += '<div class="review-queue">';
      reviewItems.forEach(function (f) {
        html += '<div class="review-item"><div class="ri-head"><span class="ri-field">' + esc(f.label) + " · " + esc(f.value) + "</span>" + flagLabel(f.flag) + "</div>";
        html += '<div class="small text-muted" style="margin-top:4px">' + esc(f.note || ("Confidence " + pct(f.conf))) + "</div>";
        html += '<div class="ri-actions"><button class="approve" type="button">Approve</button><button type="button">Edit value</button><button type="button">Reject</button></div></div>';
      });
      html += "</div>";
    }
    html += "</div>";

    mainEl.innerHTML = html;
    wireTabs();
    wireReviewButtons();
  }

  function wireTabs() {
    var tabs = mainEl.querySelectorAll(".demo-tab");
    tabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        tabs.forEach(function (t) { t.classList.remove("active"); });
        tab.classList.add("active");
        var name = tab.getAttribute("data-tab");
        mainEl.querySelectorAll(".demo-panel").forEach(function (p) {
          p.classList.toggle("active", p.getAttribute("data-panel") === name);
        });
      });
    });
  }

  function wireReviewButtons() {
    mainEl.querySelectorAll(".review-item .ri-actions button").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var item = btn.closest(".review-item");
        item.style.opacity = ".5";
        item.querySelector(".ri-actions").innerHTML =
          '<span class="flag ok">' + esc(btn.textContent) + "ed · recorded in audit log</span>";
      });
    });
  }

  function isNumeric(v) { return /^\d+$/.test(v); }

  function jsonHighlight(obj) {
    var json = JSON.stringify(obj, function (k, v) { return v === undefined ? null : v; }, 2);
    return esc(json)
      .replace(/&quot;([^&]+?)&quot;:/g, '<span class="k">"$1"</span>:')
      .replace(/: &quot;([^&]*?)&quot;/g, ': <span class="s">"$1"</span>')
      .replace(/: (\d+)/g, ': <span class="n">$1</span>');
  }

  // Auto-select the first sample so visitors see output immediately.
  selectSample(SAMPLES[0].id);
})();
