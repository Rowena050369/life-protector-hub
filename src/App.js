/* eslint-disable */
import { useState } from "react";

var BRAND = { dark: "#1e3a5f", mid: "#2d6a9f", light: "#e8f0fb" };

function Home(props) {
  var tools = [
    { id: "kpi", icon: "📊", label: "KPI Dashboard", desc: "$250K monthly revenue tracker" },
    { id: "sop", icon: "📋", label: "SOP Hub", desc: "SOPs, training & templates" },
    { id: "compliance", icon: "🔍", label: "Compliance Audit", desc: "Client folder compliance check" },
    { id: "trail", icon: "🗂️", label: "Trail Cleanup", desc: "CRM cleanup & lead finder" },
  ];
  return (
    <div style={{ fontFamily: "Inter,sans-serif", background: "#f8fafc", minHeight: "100vh", padding: 24 }}>
      <div style={{ background: "linear-gradient(135deg,#1e3a5f,#2d6a9f)", borderRadius: 12, padding: "28px 32px", marginBottom: 24, color: "#fff" }}>
        <div style={{ fontSize: 10, opacity: 0.6, letterSpacing: 2, marginBottom: 8 }}>LIFE PROTECTOR LIMITED</div>
        <div style={{ fontSize: 26, fontWeight: 600, marginBottom: 6 }}>Team Hub</div>
        <div style={{ fontSize: 14, opacity: 0.8 }}>SOPs · KPIs · Compliance · CRM — all in one place.</div>
        <div style={{ display: "flex", gap: 20, marginTop: 18, flexWrap: "wrap" }}>
          {[["4","Tools"],["$250K","Monthly target"],["6","Product lines"],["100%","Free to host"]].map(function(item) {
            return (
              <div key={item[1]}>
                <div style={{ fontSize: 22, fontWeight: 600 }}>{item[0]}</div>
                <div style={{ fontSize: 12, opacity: 0.7 }}>{item[1]}</div>
              </div>
            );
          })}
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 14 }}>
        {tools.map(function(t) {
          return (
            <div key={t.id} onClick={function() { props.onNav(t.id); }}
              style={{ background: "#fff", borderRadius: 12, padding: 22, cursor: "pointer", border: "1px solid #e2e8f0", boxShadow: "0 1px 4px rgba(0,0,0,.06)" }}>
              <div style={{ fontSize: 30, marginBottom: 10 }}>{t.icon}</div>
              <div style={{ fontWeight: 600, fontSize: 15, color: "#1e293b", marginBottom: 5 }}>{t.label}</div>
              <div style={{ fontSize: 13, color: "#64748b" }}>{t.desc}</div>
            </div>
          );
        })}
      </div>
      <div style={{ marginTop: 20, padding: "14px 18px", background: "#fff", borderRadius: 10, border: "1px solid #e2e8f0", fontSize: 12, color: "#94a3b8", textAlign: "center" }}>
        Life Protector Limited · FAP Licence FSP 109291 · Privacy Act 2020 Compliant
      </div>
    </div>
  );
}

function BackBtn(props) {
  return (
    <button onClick={props.onClick} style={{ margin: "12px 16px", background: "#1e3a5f", color: "#fff", border: "none", borderRadius: 8, padding: "7px 16px", fontSize: 13, cursor: "pointer" }}>
      ← Back to Hub
    </button>
  );
}

var PRODUCT_TARGETS = [
  { name: "Mortgage", target: 80000, color: "#1e3a5f", bg: "#e8f0fb", icon: "🏠" },
  { name: "Insurance", target: 70000, color: "#155724", bg: "#d4edda", icon: "🛡️" },
  { name: "Personal Loan", target: 30000, color: "#0c5460", bg: "#d1ecf1", icon: "💳" },
  { name: "Business Loan", target: 30000, color: "#5a3e2b", bg: "#f5e6d8", icon: "🏢" },
  { name: "Investment", target: 25000, color: "#6f2c91", bg: "#f3e8fb", icon: "📈" },
  { name: "KiwiSaver", target: 15000, color: "#856404", bg: "#fff3cd", icon: "🐖" },
];

var WEEKLY_KPIS = [
  { key: "leads", label: "New leads", target: 100, icon: "👤" },
  { key: "calls", label: "Discovery calls", target: 40, icon: "📞" },
  { key: "soas", label: "SOAs issued", target: 20, icon: "📄" },
  { key: "apps", label: "Applications", target: 15, icon: "📤" },
  { key: "reviews", label: "Client reviews", target: 10, icon: "🔄" },
  { key: "referrals", label: "Referrals requested", target: 10, icon: "🤝" },
];

var MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
var MONTH_TARGET = 250000;

function pct(v, t) { return Math.min(100, Math.round((v / t) * 100)); }
function fmtFull(n) { return "$" + Number(n || 0).toLocaleString(); }
function emptyMonth() { return { products: {}, weeks: [{},{},{},{}], notes: "" }; }

function KpiDashboard() {
  var now = new Date();
  var monthState = useState(MONTHS[now.getMonth()]);
  var month = monthState[0]; var setMonth = monthState[1];
  var weekState = useState(0);
  var week = weekState[0]; var setWeek = weekState[1];
  var tabState = useState("dashboard");
  var tab = tabState[0]; var setTab = tabState[1];
  var initData = {};
  MONTHS.forEach(function(m) { initData[m] = emptyMonth(); });
  var dataState = useState(initData);
  var data = dataState[0]; var setData = dataState[1];

  var mData = data[month] || emptyMonth();
  var prods = mData.products || {};
  var weeks = mData.weeks || [{},{},{},{}];
  var weekRow = weeks[week] || {};
  var totalRev = PRODUCT_TARGETS.reduce(function(s, p) { return s + (Number(prods[p.name]) || 0); }, 0);
  var totalPct = pct(totalRev, MONTH_TARGET);
  var gap = Math.max(0, MONTH_TARGET - totalRev);
  var stColor = totalPct >= 90 ? "#155724" : totalPct >= 60 ? "#856404" : "#721c24";
  var stBg = totalPct >= 90 ? "#d4edda" : totalPct >= 60 ? "#fff3cd" : "#f8d7da";
  var stLabel = totalPct >= 90 ? "On Track" : totalPct >= 60 ? "At Risk" : "Behind";

  function setProd(name, val) {
    setData(function(prev) {
      var updated = Object.assign({}, prev);
      updated[month] = Object.assign({}, prev[month]);
      updated[month].products = Object.assign({}, prev[month].products);
      updated[month].products[name] = val;
      return updated;
    });
  }

  function setWkKpi(wi, key, val) {
    setData(function(prev) {
      var updated = Object.assign({}, prev);
      updated[month] = Object.assign({}, prev[month]);
      var ws = (prev[month].weeks || [{},{},{},{}]).slice();
      ws[wi] = Object.assign({}, ws[wi]);
      ws[wi][key] = val;
      updated[month].weeks = ws;
      return updated;
    });
  }

  function tabBtn(id, label) {
    return (
      <button key={id} onClick={function() { setTab(id); }} style={{ padding: "6px 14px", borderRadius: 20, border: "none", cursor: "pointer", fontSize: 12, fontWeight: 500, background: tab === id ? "#1e3a5f" : "transparent", color: tab === id ? "#fff" : "#64748b" }}>
        {label}
      </button>
    );
  }

  return (
    <div style={{ fontFamily: "Inter,sans-serif", background: "#f8fafc", minHeight: "100vh" }}>
      <div style={{ background: "#1e3a5f", padding: "14px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
        <div style={{ fontSize: 16, fontWeight: 500, color: "#fff" }}>📊 KPI Dashboard — $250K Tracker</div>
        <select value={month} onChange={function(e) { setMonth(e.target.value); }} style={{ fontSize: 12, padding: "6px 10px", borderRadius: 8, border: "none", background: "rgba(255,255,255,.15)", color: "#fff", cursor: "pointer" }}>
          {MONTHS.map(function(m) { return <option key={m} value={m} style={{ color: "#000" }}>{m}</option>; })}
        </select>
      </div>
      <div style={{ background: "#fff", borderBottom: "1px solid #e2e8f0", padding: "0 16px" }}>
        <div style={{ display: "flex", gap: 4, padding: "8px 0" }}>
          {tabBtn("dashboard", "Dashboard")}
          {tabBtn("revenue", "Enter Revenue")}
          {tabBtn("weekly", "Weekly KPIs")}
          {tabBtn("notes", "Notes")}
        </div>
      </div>
      <div style={{ padding: 20, maxWidth: 860, margin: "0 auto" }}>
        {tab === "dashboard" && (
          <div>
            <div style={{ background: "#fff", borderRadius: 12, padding: "22px 26px", marginBottom: 14, border: "1px solid #e2e8f0" }}>
              <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
                <div>
                  <div style={{ fontSize: 12, color: "#64748b", marginBottom: 4 }}>{month} — Total Revenue</div>
                  <div style={{ fontSize: 38, fontWeight: 600, color: stColor }}>{fmtFull(totalRev)}</div>
                  <div style={{ fontSize: 13, color: "#64748b", marginTop: 4 }}>of {fmtFull(MONTH_TARGET)} · {totalPct}%</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <span style={{ background: stBg, color: stColor, fontWeight: 600, fontSize: 13, padding: "6px 16px", borderRadius: 20 }}>{stLabel}</span>
                  <div style={{ fontSize: 13, color: "#64748b", marginTop: 8 }}>Gap: <strong style={{ color: stColor }}>{fmtFull(gap)}</strong></div>
                </div>
              </div>
              <div style={{ marginTop: 14, background: "#f1f5f9", borderRadius: 8, height: 10, overflow: "hidden" }}>
                <div style={{ width: totalPct + "%", height: "100%", background: stColor, borderRadius: 8 }} />
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(230px,1fr))", gap: 10 }}>
              {PRODUCT_TARGETS.map(function(p) {
                var act = Number(prods[p.name]) || 0;
                var pp = pct(act, p.target);
                var pc = pp >= 90 ? "#155724" : pp >= 60 ? "#856404" : "#721c24";
                return (
                  <div key={p.name} style={{ background: "#fff", borderRadius: 10, padding: "14px 16px", border: "1px solid #e2e8f0" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <span style={{ fontSize: 20 }}>{p.icon}</span>
                        <span style={{ fontWeight: 500, fontSize: 13, color: "#1e293b" }}>{p.name}</span>
                      </div>
                      <span style={{ fontSize: 12, color: pc, fontWeight: 600 }}>{pp}%</span>
                    </div>
                    <div style={{ fontSize: 20, fontWeight: 600, color: p.color, marginBottom: 4 }}>{fmtFull(act)}</div>
                    <div style={{ fontSize: 11, color: "#64748b", marginBottom: 8 }}>of {fmtFull(p.target)}</div>
                    <div style={{ background: "#f1f5f9", borderRadius: 6, height: 5, overflow: "hidden" }}>
                      <div style={{ width: pp + "%", height: "100%", background: pc, borderRadius: 6 }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        {tab === "revenue" && (
          <div>
            <div style={{ fontSize: 15, fontWeight: 500, color: "#1e293b", marginBottom: 14 }}>Enter revenue — {month}</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))", gap: 12 }}>
              {PRODUCT_TARGETS.map(function(p) {
                var act = Number(prods[p.name]) || 0;
                var pp = pct(act, p.target);
                var pc = pp >= 100 ? "#155724" : pp >= 60 ? "#856404" : "#721c24";
                return (
                  <div key={p.name} style={{ background: "#fff", borderRadius: 12, padding: "16px 18px", border: "1px solid #e2e8f0" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                      <span style={{ fontSize: 22 }}>{p.icon}</span>
                      <div>
                        <div style={{ fontWeight: 500, fontSize: 14, color: "#1e293b" }}>{p.name}</div>
                        <div style={{ fontSize: 11, color: "#64748b" }}>Target: {fmtFull(p.target)}</div>
                      </div>
                    </div>
                    <div style={{ position: "relative", marginBottom: 8 }}>
                      <span style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "#94a3b8", fontSize: 14 }}>$</span>
                      <input type="number" min="0" placeholder="0" value={prods[p.name] || ""}
                        onChange={function(e) { setProd(p.name, e.target.value); }}
                        style={{ width: "100%", paddingLeft: 26, paddingRight: 10, fontSize: 18, fontWeight: 600, borderRadius: 8, border: "1px solid #e2e8f0", background: "#f8fafc", color: "#1e293b", height: 44, boxSizing: "border-box" }} />
                    </div>
                    <div style={{ background: "#f1f5f9", borderRadius: 6, height: 5, overflow: "hidden", marginBottom: 5 }}>
                      <div style={{ width: pp + "%", height: "100%", background: pc, borderRadius: 6 }} />
                    </div>
                    <div style={{ fontSize: 11, color: pc }}>{pp >= 100 ? "✅ Target hit!" : act > 0 ? (fmtFull(p.target - act) + " to go") : ""}</div>
                  </div>
                );
              })}
            </div>
            <div style={{ background: stBg, borderRadius: 12, padding: "16px 22px", marginTop: 16, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
              <div>
                <div style={{ fontSize: 12, color: stColor, marginBottom: 4 }}>Running total — {month}</div>
                <div style={{ fontSize: 28, fontWeight: 600, color: stColor }}>{fmtFull(totalRev)}</div>
              </div>
              <div style={{ fontSize: 18, fontWeight: 600, color: stColor }}>{gap > 0 ? (fmtFull(gap) + " to go") : "🎉 Target smashed!"}</div>
            </div>
          </div>
        )}
        {tab === "weekly" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14, flexWrap: "wrap", gap: 8 }}>
              <div style={{ fontSize: 15, fontWeight: 500, color: "#1e293b" }}>Weekly KPIs — {month}</div>
              <div style={{ display: "flex", gap: 6 }}>
                {[0,1,2,3].map(function(w) {
                  return (
                    <button key={w} onClick={function() { setWeek(w); }} style={{ padding: "6px 14px", borderRadius: 20, border: "none", cursor: "pointer", fontSize: 12, fontWeight: 500, background: week === w ? "#1e3a5f" : "#f1f5f9", color: week === w ? "#fff" : "#475569" }}>
                      Week {w + 1}
                    </button>
                  );
                })}
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(230px,1fr))", gap: 12 }}>
              {WEEKLY_KPIS.map(function(k) {
                var val = Number(weekRow[k.key]) || 0;
                var pp = pct(val, k.target);
                var pc = pp >= 90 ? "#155724" : pp >= 60 ? "#856404" : "#721c24";
                return (
                  <div key={k.key} style={{ background: "#fff", borderRadius: 12, padding: "16px 18px", border: "1px solid #e2e8f0" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                      <span style={{ fontSize: 20 }}>{k.icon}</span>
                      <div>
                        <div style={{ fontWeight: 500, fontSize: 13, color: "#1e293b" }}>{k.label}</div>
                        <div style={{ fontSize: 11, color: "#64748b" }}>Target: {k.target}/week</div>
                      </div>
                    </div>
                    <input type="number" min="0" placeholder="0" value={(weeks[week] && weeks[week][k.key]) || ""}
                      onChange={function(e) { setWkKpi(week, k.key, e.target.value); }}
                      style={{ width: "100%", fontSize: 22, fontWeight: 600, borderRadius: 8, border: "1px solid #e2e8f0", background: "#f8fafc", color: "#1e293b", height: 48, textAlign: "center", boxSizing: "border-box", marginBottom: 8 }} />
                    <div style={{ background: "#f1f5f9", borderRadius: 6, height: 5, overflow: "hidden", marginBottom: 4 }}>
                      <div style={{ width: pp + "%", height: "100%", background: pc, borderRadius: 6 }} />
                    </div>
                    <div style={{ fontSize: 11, color: pc }}>{val >= k.target ? "✅ Done" : (k.target - val) + " to go"}</div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        {tab === "notes" && (
          <div>
            <div style={{ fontSize: 15, fontWeight: 500, color: "#1e293b", marginBottom: 10 }}>Notes — {month}</div>
            <textarea value={mData.notes || ""}
              onChange={function(e) {
                setData(function(prev) {
                  var updated = Object.assign({}, prev);
                  updated[month] = Object.assign({}, prev[month], { notes: e.target.value });
                  return updated;
                });
              }}
              placeholder={"🏆 WINS THIS MONTH\n-\n\n⚠️ BLOCKERS\n-\n\n🎯 NEXT MONTH ACTIONS\n-"}
              style={{ width: "100%", minHeight: 320, fontSize: 14, lineHeight: 1.8, borderRadius: 10, border: "1px solid #e2e8f0", background: "#fff", color: "#1e293b", padding: 16, boxSizing: "border-box", resize: "vertical", fontFamily: "inherit" }} />
          </div>
        )}
      </div>
    </div>
  );
}

var SOP_CATS = [
  { name: "Mortgage", color: "#1e3a5f", icon: "🏠", items: ["Mortgage SOP — Full VA Workflow", "Document Collection Checklist", "Lender Submission Guide", "Refix & Refinance Process", "Lead Follow-Up Checklist"] },
  { name: "Insurance", color: "#155724", icon: "🛡️", items: ["Insurance SOP — Full VA Workflow", "Quote Comparison Process", "SOA Drafting Guide", "Policy Replacement Process", "Underwriting Follow-Up SOP", "Policy Issuance & Welcome Pack"] },
  { name: "KiwiSaver", color: "#856404", icon: "🐖", items: ["KiwiSaver Transfer Process", "Investment Application Process"] },
  { name: "Personal & Business", color: "#0c5460", icon: "💳", items: ["Personal Loan Process — Avanti", "Business Loan Process"] },
  { name: "Lead Generation", color: "#721c24", icon: "🎯", items: ["Lead Gen Daily SOP", "Facebook Ads Management SOP", "Community Group Engagement SOP", "Database Reactivation SOP", "Referral Management SOP"] },
  { name: "Admin & Operations", color: "#374151", icon: "⚙️", items: ["Trail CRM Master Guide", "Google Drive Structure Guide", "Email Etiquette & Templates", "DocuSign Process Guide", "Escalation Protocol"] },
];

var TRAIN_TRACKS = [
  { name: "Adviser — 12 weeks", color: "#1e3a5f", modules: ["Regulatory & Compliance", "Mortgage Product Mastery", "Insurance Product Mastery", "KiwiSaver & Investment", "Personal & Business Loans", "Sales & Advice Process", "Business Development"] },
  { name: "VA — 6 modules", color: "#155724", modules: ["Admin Fundamentals", "Mortgage Admin", "Insurance Admin", "KiwiSaver, Investment & Loans", "Customer Service Excellence", "Lead Generation Support"] },
  { name: "Lead Gen — 2 weeks", color: "#721c24", modules: ["Brand voice & compliance rules", "Trail CRM lead entry", "Facebook Ads & community posting", "Phone scripts & call process", "Email sequences & MailerLite"] },
];

function SopHub() {
  var sectionState = useState("sops");
  var section = sectionState[0]; var setSection = sectionState[1];
  var openState = useState(null);
  var open = openState[0]; var setOpen = openState[1];

  function navBtn(id, label) {
    return (
      <button key={id} onClick={function() { setSection(id); }} style={{ padding: "6px 14px", borderRadius: 20, border: "none", cursor: "pointer", fontSize: 12, fontWeight: 500, background: section === id ? "#1e3a5f" : "transparent", color: section === id ? "#fff" : "#64748b" }}>
        {label}
      </button>
    );
  }

  return (
    <div style={{ fontFamily: "Inter,sans-serif", background: "#f8fafc", minHeight: "100vh" }}>
      <div style={{ background: "#1e3a5f", padding: "14px 20px" }}>
        <div style={{ fontSize: 16, fontWeight: 500, color: "#fff" }}>📋 SOP Hub — Life Protector Limited</div>
      </div>
      <div style={{ background: "#fff", borderBottom: "1px solid #e2e8f0", padding: "0 16px" }}>
        <div style={{ display: "flex", gap: 4, padding: "8px 0" }}>
          {navBtn("sops", "SOPs")}
          {navBtn("training", "Training")}
          {navBtn("compliance", "Compliance Rules")}
          {navBtn("contacts", "Key Contacts")}
        </div>
      </div>
      <div style={{ padding: 20, maxWidth: 860, margin: "0 auto" }}>
        {section === "sops" && (
          <div>
            <div style={{ fontSize: 15, fontWeight: 500, color: "#1e293b", marginBottom: 14 }}>Standard Operating Procedures</div>
            {SOP_CATS.map(function(cat, ci) {
              return (
                <div key={ci} style={{ background: "#fff", borderRadius: 12, marginBottom: 10, border: "1px solid #e2e8f0", overflow: "hidden" }}>
                  <div onClick={function() { setOpen(open === ci ? null : ci); }} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 18px", cursor: "pointer" }}>
                    <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                      <span style={{ fontSize: 20 }}>{cat.icon}</span>
                      <span style={{ fontWeight: 500, fontSize: 14, color: "#1e293b" }}>{cat.name}</span>
                      <span style={{ background: "#f1f5f9", color: "#475569", fontSize: 11, padding: "2px 8px", borderRadius: 10 }}>{cat.items.length} SOPs</span>
                    </div>
                    <span style={{ color: "#94a3b8", fontSize: 14 }}>{open === ci ? "▲" : "▼"}</span>
                  </div>
                  {open === ci && (
                    <div style={{ borderTop: "1px solid #f1f5f9", padding: "12px 18px" }}>
                      {cat.items.map(function(item, ii) {
                        return (
                          <div key={ii} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: ii < cat.items.length - 1 ? "1px solid #f8fafc" : "none" }}>
                            <div style={{ display: "flex", gap: 8, alignItems: "center", fontSize: 13, color: "#1e293b" }}>
                              <span style={{ color: cat.color }}>📄</span>{item}
                            </div>
                            <span style={{ background: "#d4edda", color: "#155724", fontSize: 10, fontWeight: 600, padding: "2px 8px", borderRadius: 10 }}>Live</span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
        {section === "training" && (
          <div>
            <div style={{ fontSize: 15, fontWeight: 500, color: "#1e293b", marginBottom: 14 }}>Training Tracks</div>
            {TRAIN_TRACKS.map(function(track, ti) {
              var key = "t" + ti;
              return (
                <div key={ti} style={{ background: "#fff", borderRadius: 12, marginBottom: 12, border: "1px solid #e2e8f0", overflow: "hidden" }}>
                  <div onClick={function() { setOpen(open === key ? null : key); }} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 20px", cursor: "pointer" }}>
                    <div style={{ fontWeight: 500, fontSize: 15, color: track.color }}>{track.name}</div>
                    <span style={{ color: "#94a3b8" }}>{open === key ? "▲" : "▼"}</span>
                  </div>
                  {open === key && (
                    <div style={{ borderTop: "1px solid #f1f5f9", padding: "14px 20px" }}>
                      {track.modules.map(function(mod, mi) {
                        return (
                          <div key={mi} style={{ display: "flex", gap: 10, alignItems: "center", padding: "8px 0", borderBottom: mi < track.modules.length - 1 ? "1px solid #f8fafc" : "none" }}>
                            <div style={{ width: 24, height: 24, borderRadius: "50%", background: "#e8f0fb", color: "#1e3a5f", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 600, flexShrink: 0 }}>{mi + 1}</div>
                            <span style={{ fontSize: 13, color: "#1e293b" }}>{mod}</span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
        {section === "compliance" && (
          <div>
            <div style={{ fontSize: 15, fontWeight: 500, color: "#1e293b", marginBottom: 14 }}>Compliance Golden Rules</div>
            <div style={{ background: "#f8d7da", borderRadius: 12, padding: "18px 20px", marginBottom: 16 }}>
              {["Never provide financial advice without a signed SOA in place.", "Never submit an application without a completed compliance checklist.", "AML/KYC must be completed before any advice is given.", "Disclosure Statement must be sent before the first advice conversation.", "All client files must be retained for 7 years minimum.", "Any complaint must be escalated to the Adviser within 24 hours.", "All client communication must be logged in Trail within 24 hours.", "Never share client data externally without Adviser authorisation."].map(function(r, i) {
                return (
                  <div key={i} style={{ display: "flex", gap: 8, marginBottom: 8, fontSize: 13, color: "#721c24", alignItems: "flex-start" }}>
                    <span style={{ flexShrink: 0 }}>⚠️</span><span>{r}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        {section === "contacts" && (
          <div>
            <div style={{ fontSize: 15, fontWeight: 500, color: "#1e293b", marginBottom: 14 }}>Key Contacts</div>
            {[
              ["Regulators", [["Financial Markets Authority", "fma.govt.nz", "0800 366 385"], ["IFSO Ombudsman", "ifso.nz", "0800 888 202"]]],
              ["Insurers", [["AIA NZ Adviser", "aia.co.nz/adviser", "0800 242 238"], ["Partners Life", "partnerslife.co.nz/adviser", "0800 767 267"], ["Chubb Life", "chubb.com/nz", "09 377 1459"]]],
              ["Tools", [["Trail CRM", "trailapp.com", "support@trailapp.com"], ["Kainga Ora", "kaingaora.govt.nz", "0508 935 266"]]],
            ].map(function(group, gi) {
              return (
                <div key={gi} style={{ background: "#fff", borderRadius: 12, padding: "16px 18px", marginBottom: 12, border: "1px solid #e2e8f0" }}>
                  <div style={{ fontWeight: 500, fontSize: 13, color: "#1e3a5f", marginBottom: 10 }}>{group[0]}</div>
                  {group[1].map(function(item, i) {
                    return (
                      <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderTop: i > 0 ? "1px solid #f8fafc" : "none", fontSize: 13 }}>
                        <div>
                          <div style={{ fontWeight: 500, color: "#1e293b" }}>{item[0]}</div>
                          <div style={{ color: "#64748b", fontSize: 12 }}>{item[2]}</div>
                        </div>
                        <span style={{ color: "#1e3a5f", fontSize: 12 }}>{item[1]}</span>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

var COMPLIANCE_STEPS = [
  { num: "00", label: "Compliance Docs", desc: "Disclosure, Privacy, AML/KYC, Authority Form, Consent" },
  { num: "01", label: "Quote", desc: "Insurer quote PDF, comparison document" },
  { num: "02", label: "Previous Policy", desc: "Existing policy schedule (if replacement/review)" },
  { num: "03", label: "Application", desc: "Completed and signed application" },
  { num: "04", label: "Financial Docs", desc: "Payslips, bank statements, ID" },
  { num: "05", label: "Medical Records", desc: "GP reports, underwriting docs (if applicable)" },
  { num: "06", label: "New Policy", desc: "Issued policy schedule, welcome pack confirmation" },
];

var AUDIT_CLIENTS = [
  { name: "Penaredondo, Noriel & Marissa", type: "Insurance", steps: [1,1,1,1,1,1,1], notes: "Only client with full 6-step folder structure." },
  { name: "Tenorio, Joselito & Cristina", type: "Insurance", steps: [0,1,1,0,0,0,1], notes: "No Disclosure Statement, AML/KYC or signed application." },
  { name: "Neniel, Habiba & Christian", type: "Insurance", steps: [0,1,1,0,0,0,0], notes: "Active review — missing compliance, application, financial docs." },
  { name: "Ramos, Maria Nenita", type: "Insurance — Claim", steps: [0,0,0,0,0,1,0], notes: "Claim-only folder. No compliance, policy or application." },
  { name: "Zumel, Berdin & Joan", type: "Insurance", steps: [0,0,0,0,0,0,1], notes: "AIA Vitality forms only. No compliance docs." },
  { name: "Bartolome/Beza, Hale & Lani", type: "Insurance", steps: [0,0,0,0,0,1,0], notes: "Underwriting Q&A only. Missing compliance and policy." },
  { name: "Centeno, Rene", type: "Personal Loan", steps: [0,0,0,1,1,0,0], notes: "Application and payslips present. No Disclosure or settlement doc." },
  { name: "Quiambao, Violeta", type: "Insurance", steps: [0,0,0,0,0,0,0], notes: "Empty folder." },
  { name: "Reyes, Sophia & Gilbert", type: "Insurance", steps: [0,0,0,0,0,0,0], notes: "Empty folder." },
  { name: "Bautista, Alejandro & Jennifer", type: "Insurance", steps: [0,0,0,0,0,0,0], notes: "Empty folder." },
  { name: "Colongon", type: "Insurance", steps: [0,0,0,0,0,0,0], notes: "Empty folder — rename to full name." },
  { name: "YEM", type: "Insurance", steps: [0,0,0,0,0,0,0], notes: "Empty — name unclear. Rename to full client name." },
  { name: "Maangue", type: "Insurance", steps: [0,0,0,0,0,0,0], notes: "Empty folder." },
  { name: "Esteban", type: "Insurance", steps: [0,0,0,0,0,0,0], notes: "Empty folder." },
  { name: "Fernandes", type: "Personal Loan", steps: [0,0,0,0,0,0,0], notes: "Empty folder." },
];

function clientStatus(steps) {
  var s = steps.reduce(function(a, b) { return a + b; }, 0);
  if (s === 7) return { label: "Compliant", color: "#155724", bg: "#d4edda" };
  if (s >= 4) return { label: "Partial", color: "#856404", bg: "#fff3cd" };
  if (s >= 1) return { label: "Incomplete", color: "#721c24", bg: "#f8d7da" };
  return { label: "Empty", color: "#374151", bg: "#f1f5f9" };
}

function ComplianceAudit() {
  var filterState = useState("All");
  var filter = filterState[0]; var setFilter = filterState[1];
  var expandedState = useState(null);
  var expanded = expandedState[0]; var setExpanded = expandedState[1];
  var searchState = useState("");
  var search = searchState[0]; var setSearch = searchState[1];

  var counts = { All: AUDIT_CLIENTS.length, Compliant: 0, Partial: 0, Incomplete: 0, Empty: 0 };
  AUDIT_CLIENTS.forEach(function(c) { counts[clientStatus(c.steps).label]++; });

  var filtered = AUDIT_CLIENTS.filter(function(c) {
    var st = clientStatus(c.steps).label;
    return (filter === "All" || st === filter) && c.name.toLowerCase().indexOf(search.toLowerCase()) !== -1;
  });

  var urgent = AUDIT_CLIENTS.filter(function(c) {
    return !c.steps[0] && c.steps.reduce(function(a, b) { return a + b; }, 0) > 0;
  });

  return (
    <div style={{ fontFamily: "Inter,sans-serif", background: "#f8fafc", minHeight: "100vh" }}>
      <div style={{ background: "#7f1d1d", padding: "14px 20px" }}>
        <div style={{ fontSize: 16, fontWeight: 500, color: "#fff" }}>🔍 Client Folder Compliance Audit</div>
        <div style={{ fontSize: 12, color: "rgba(255,255,255,.7)", marginTop: 2 }}>{AUDIT_CLIENTS.length} client folders scanned</div>
      </div>
      <div style={{ padding: 20, maxWidth: 860, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 8, marginBottom: 14 }}>
          {[["All", counts.All, "#1e3a5f", "#e8f0fb"],["Compliant", counts.Compliant, "#155724", "#d4edda"],["Partial", counts.Partial, "#856404", "#fff3cd"],["Incomplete", counts.Incomplete, "#721c24", "#f8d7da"],["Empty", counts.Empty, "#374151", "#f1f5f9"]].map(function(item) {
            return (
              <div key={item[0]} style={{ background: item[3], borderRadius: 10, padding: "12px 14px" }}>
                <div style={{ fontSize: 22, fontWeight: 600, color: item[2] }}>{item[1]}</div>
                <div style={{ fontSize: 11, color: item[2], marginTop: 2 }}>{item[0]}</div>
              </div>
            );
          })}
        </div>
        {urgent.length > 0 && (
          <div style={{ background: "#f8d7da", border: "1px solid #f5c6cb", borderRadius: 10, padding: "12px 16px", marginBottom: 14 }}>
            <div style={{ fontWeight: 600, fontSize: 13, color: "#721c24", marginBottom: 6 }}>🚨 Active clients with NO compliance folder — FMCA breach</div>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {urgent.map(function(c) {
                return <span key={c.name} style={{ background: "#fff", color: "#721c24", fontSize: 12, fontWeight: 500, padding: "3px 10px", borderRadius: 20, border: "1px solid #f5c6cb" }}>{c.name}</span>;
              })}
            </div>
          </div>
        )}
        <div style={{ display: "flex", gap: 8, marginBottom: 12, flexWrap: "wrap", alignItems: "center" }}>
          <input value={search} onChange={function(e) { setSearch(e.target.value); }} placeholder="Search client..." style={{ padding: "7px 12px", borderRadius: 8, border: "1px solid #e2e8f0", fontSize: 13, width: 200 }} />
          {["All","Compliant","Partial","Incomplete","Empty"].map(function(f) {
            return (
              <button key={f} onClick={function() { setFilter(f); }} style={{ padding: "6px 12px", borderRadius: 20, border: "none", cursor: "pointer", fontSize: 12, fontWeight: 500, background: filter === f ? "#7f1d1d" : "#f1f5f9", color: filter === f ? "#fff" : "#475569" }}>
                {f} ({counts[f] !== undefined ? counts[f] : 0})
              </button>
            );
          })}
        </div>
        {filtered.map(function(client, ci) {
          var st = clientStatus(client.steps);
          var sc = client.steps.reduce(function(a, b) { return a + b; }, 0);
          return (
            <div key={ci} style={{ background: "#fff", borderRadius: 10, marginBottom: 8, border: "1px solid " + st.bg, overflow: "hidden" }}>
              <div onClick={function() { setExpanded(expanded === ci ? null : ci); }} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", cursor: "pointer" }}>
                <span style={{ background: st.bg, color: st.color, fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 12, flexShrink: 0 }}>{st.label}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 500, fontSize: 13, color: "#1e293b" }}>{client.name}</div>
                  <div style={{ fontSize: 11, color: "#64748b" }}>{client.type}</div>
                </div>
                <div style={{ display: "flex", gap: 3, alignItems: "center" }}>
                  {client.steps.map(function(has, i) {
                    return (
                      <div key={i} style={{ width: 18, height: 18, borderRadius: "50%", background: has ? "#155724" : "#f8d7da", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <span style={{ fontSize: 8, color: has ? "#fff" : "#721c24", fontWeight: 700 }}>{COMPLIANCE_STEPS[i].num}</span>
                      </div>
                    );
                  })}
                  <span style={{ marginLeft: 6, fontSize: 12, color: st.color, fontWeight: 600 }}>{sc}/7</span>
                </div>
                <span style={{ color: "#94a3b8", fontSize: 14 }}>{expanded === ci ? "▲" : "▼"}</span>
              </div>
              {expanded === ci && (
                <div style={{ borderTop: "1px solid #f1f5f9", padding: "12px 16px" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 8, marginBottom: 10 }}>
                    {COMPLIANCE_STEPS.map(function(s, i) {
                      return (
                        <div key={i} style={{ background: client.steps[i] ? "#d4edda" : "#f8d7da", borderRadius: 8, padding: "8px 10px" }}>
                          <div style={{ fontSize: 11, fontWeight: 600, color: client.steps[i] ? "#155724" : "#721c24" }}>
                            {client.steps[i] ? "✅" : "❌"} {s.num} — {s.label}
                          </div>
                          <div style={{ fontSize: 11, color: client.steps[i] ? "#166534" : "#7f1d1d", marginTop: 2 }}>{s.desc}</div>
                        </div>
                      );
                    })}
                  </div>
                  <div style={{ background: "#f8fafc", borderRadius: 8, padding: "10px 12px", fontSize: 13, color: "#475569" }}>{client.notes}</div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

var TRAIL_PHASES = [
  { phase: "Phase 1 — Duplicates", color: "#721c24", bg: "#f8d7da", icon: "📋",
    tasks: [["Search known duplicates by surname", "Centeno, Quiambao, Beza, Neniel — all flagged in Drive audit"], ["Sort contacts A–Z and scan for duplicate names", "Keep the most complete record for each person"], ["Check for shared email addresses", "Couples sharing one email create duplicate-looking records"], ["Merge or delete sparse duplicate record", "Log every merge: Name | Action | Date"]] },
  { phase: "Phase 2 — Stale Records", color: "#856404", bg: "#fff3cd", icon: "⏱️",
    tasks: [["Filter: Last activity > 90 days", "Export this list — it becomes your reactivation campaign"], ["Filter: No mobile phone number", "Flag — VA cannot call them. Check for email. If neither, mark Uncontactable"], ["Filter: No email address", "Attempt to find via LinkedIn or Facebook. Mark or update"], ["Filter: Status = New Lead after 30+ days", "Never followed up. Move to Dormant or reactivate immediately"], ["Filter: No pipeline stage assigned", "Every contact must have a stage. Assign from last known activity"]] },
  { phase: "Phase 3 — Pipeline Audit", color: "#1e3a5f", bg: "#e8f0fb", icon: "🔀",
    tasks: [["Review every card in each pipeline stage", "New Lead to Discovery to Fact Find to Quote to SOA to Application to Processing to Approved to Settled"], ["Move settled clients out of active pipeline", "They go to Clients — Active. Pipeline = live opportunities only"], ["Remove dead leads from pipeline", "Tag as Not Proceeding or Uncontactable. Remove from pipeline view"], ["Set next follow-up date on every open lead", "No lead should have a blank Next Follow Up date"]] },
  { phase: "Phase 4 — Notes Cleanup", color: "#155724", bg: "#d4edda", icon: "📝",
    tasks: [["Check every active client — last note date", "No note in 30+ days on an active file means something stalled. Flag to Adviser"], ["Backfill missing activity notes", "Every email, call, or document received must have a Trail note"], ["Clear all overdue tasks", "Reschedule or reassign anything overdue by 7+ days"], ["Standardise note format", "[Date] — [Action taken] — [Next step]"]] },
  { phase: "Phase 5 — Compliance Fields", color: "#6f2c91", bg: "#f3e8fb", icon: "🛡️",
    tasks: [["Check Disclosure Statement sent date on all clients", "Must be noted in Trail. If blank — flag for immediate action"], ["Check AML/KYC verification date", "Every client who received advice must have AML recorded"], ["Verify marketing consent field", "Any contact with No consent must NOT receive marketing emails"], ["Check policy anniversary dates", "All active insurance clients need review dates set in Trail"]] },
];

var LEAD_RULES = [
  { cat: "Dormant Leads", color: "#721c24", bg: "#f8d7da", priority: "Urgent", filter: "Last activity > 60 days, Status = Lead", action: "Add to reactivation email sequence. VA calls within 48 hours." },
  { cat: "Never Contacted", color: "#721c24", bg: "#f8d7da", priority: "Urgent", filter: "Added > 30 days ago, no call or email logged", action: "Call today. SMS + email if no answer." },
  { cat: "SOA Not Signed > 14 days", color: "#1e3a5f", bg: "#e8f0fb", priority: "High", filter: "Status = SOA Issued, last activity > 14 days", action: "Adviser calls personally. Identify objection." },
  { cat: "Annual Review Due", color: "#155724", bg: "#d4edda", priority: "Medium", filter: "Policy anniversary within next 60 days", action: "Send review invitation. Book appointment. Cross-sell." },
  { cat: "No Insurance (Mortgage Client)", color: "#856404", bg: "#fff3cd", priority: "Opportunity", filter: "Client type = Mortgage, no insurance product", action: "Cross-sell insurance during next review." },
  { cat: "No KiwiSaver Review", color: "#155724", bg: "#d4edda", priority: "Opportunity", filter: "Age 25-55, no KiwiSaver record", action: "Send KiwiSaver review invitation. 15-min quick win." },
];

function TrailCleanup() {
  var tabState = useState("checklist");
  var tab = tabState[0]; var setTab = tabState[1];
  var openState = useState(0);
  var open = openState[0]; var setOpen = openState[1];
  var checkedState = useState({});
  var checked = checkedState[0]; var setChecked = checkedState[1];

  function toggle(pi, ti) {
    var k = pi + "-" + ti;
    setChecked(function(prev) {
      var next = Object.assign({}, prev);
      next[k] = !prev[k];
      return next;
    });
  }

  function progress(pi) {
    var total = TRAIL_PHASES[pi].tasks.length;
    var done = TRAIL_PHASES[pi].tasks.filter(function(_, ti) { return checked[pi + "-" + ti]; }).length;
    return { done: done, total: total };
  }

  function tabBtn(id, label) {
    return (
      <button key={id} onClick={function() { setTab(id); }} style={{ padding: "6px 14px", borderRadius: 20, border: "none", cursor: "pointer", fontSize: 12, fontWeight: 500, background: tab === id ? "#1e3a5f" : "transparent", color: tab === id ? "#fff" : "#64748b" }}>
        {label}
      </button>
    );
  }

  return (
    <div style={{ fontFamily: "Inter,sans-serif", background: "#f8fafc", minHeight: "100vh" }}>
      <div style={{ background: "#1e3a5f", padding: "14px 20px" }}>
        <div style={{ fontSize: 16, fontWeight: 500, color: "#fff" }}>🗂️ Trail CRM Cleanup</div>
      </div>
      <div style={{ background: "#fff", borderBottom: "1px solid #e2e8f0", padding: "0 16px" }}>
        <div style={{ display: "flex", gap: 4, padding: "8px 0" }}>
          {tabBtn("checklist", "VA Checklist")}
          {tabBtn("leads", "Lead Finder")}
        </div>
      </div>
      <div style={{ padding: 20, maxWidth: 860, margin: "0 auto" }}>
        {tab === "checklist" && (
          <div>
            <div style={{ fontSize: 15, fontWeight: 500, color: "#1e293b", marginBottom: 14 }}>Trail CRM Cleanup — VA Checklist</div>
            {TRAIL_PHASES.map(function(phase, pi) {
              var prog = progress(pi);
              return (
                <div key={pi} style={{ background: "#fff", borderRadius: 12, marginBottom: 10, border: "1px solid #e2e8f0", overflow: "hidden" }}>
                  <div onClick={function() { setOpen(open === pi ? null : pi); }} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 18px", cursor: "pointer", background: prog.done === prog.total && prog.total > 0 ? "#d4edda" : phase.bg }}>
                    <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                      <span style={{ fontSize: 20 }}>{phase.icon}</span>
                      <div>
                        <div style={{ fontWeight: 500, fontSize: 14, color: phase.color }}>{phase.phase}</div>
                        <div style={{ fontSize: 11, color: phase.color, opacity: 0.8 }}>{prog.done}/{prog.total} complete</div>
                      </div>
                    </div>
                    <span style={{ color: "#94a3b8", fontSize: 14 }}>{open === pi ? "▲" : "▼"}</span>
                  </div>
                  {open === pi && (
                    <div style={{ padding: "14px 18px" }}>
                      {phase.tasks.map(function(taskArr, ti) {
                        var k = pi + "-" + ti;
                        var isDone = !!checked[k];
                        return (
                          <div key={ti} onClick={function() { toggle(pi, ti); }} style={{ display: "flex", gap: 12, marginBottom: 10, cursor: "pointer", opacity: isDone ? 0.6 : 1, alignItems: "flex-start" }}>
                            <div style={{ width: 20, height: 20, borderRadius: 5, border: "1.5px solid " + (isDone ? phase.color : "#e2e8f0"), background: isDone ? phase.color : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                              {isDone && <span style={{ color: "#fff", fontSize: 13, fontWeight: 600 }}>✓</span>}
                            </div>
                            <div>
                              <div style={{ fontSize: 13, fontWeight: 500, color: "#1e293b", textDecoration: isDone ? "line-through" : "none", marginBottom: 2 }}>{taskArr[0]}</div>
                              <div style={{ fontSize: 12, color: "#64748b", lineHeight: 1.6 }}>{taskArr[1]}</div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
        {tab === "leads" && (
          <div>
            <div style={{ fontSize: 15, fontWeight: 500, color: "#1e293b", marginBottom: 14 }}>Lead finder — filters to apply in Trail</div>
            {LEAD_RULES.map(function(rule, i) {
              return (
                <div key={i} style={{ background: "#fff", borderRadius: 12, padding: "14px 18px", marginBottom: 10, border: "1px solid " + rule.bg }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10, flexWrap: "wrap", gap: 6 }}>
                    <div style={{ fontWeight: 500, fontSize: 14, color: "#1e293b" }}>{rule.cat}</div>
                    <span style={{ background: rule.bg, color: rule.color, fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 12 }}>{rule.priority}</span>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                    <div style={{ background: "#f8fafc", borderRadius: 8, padding: "10px 12px" }}>
                      <div style={{ fontSize: 10, color: "#94a3b8", fontWeight: 600, marginBottom: 4 }}>TRAIL FILTER</div>
                      <div style={{ fontSize: 12, color: "#475569", lineHeight: 1.6 }}>{rule.filter}</div>
                    </div>
                    <div style={{ background: rule.bg, borderRadius: 8, padding: "10px 12px" }}>
                      <div style={{ fontSize: 10, color: rule.color, fontWeight: 600, marginBottom: 4 }}>ACTION</div>
                      <div style={{ fontSize: 12, color: rule.color, lineHeight: 1.6 }}>{rule.action}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default function App() {
  var screenState = useState("home");
  var screen = screenState[0]; var setScreen = screenState[1];
  function back() { setScreen("home"); }

  if (screen === "kpi") return React.createElement("div", null, React.createElement(BackBtn, { onClick: back }), React.createElement(KpiDashboard, null));
  if (screen === "sop") return React.createElement("div", null, React.createElement(BackBtn, { onClick: back }), React.createElement(SopHub, null));
  if (screen === "compliance") return React.createElement("div", null, React.createElement(BackBtn, { onClick: back }), React.createElement(ComplianceAudit, null));
  if (screen === "trail") return React.createElement("div", null, React.createElement(BackBtn, { onClick: back }), React.createElement(TrailCleanup, null));
  return React.createElement(Home, { onNav: setScreen });
}