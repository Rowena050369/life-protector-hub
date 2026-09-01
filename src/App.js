import { useState, useEffect } from "react";

// ─────────────────────────────────────────────────────────────
// LIFE PROTECTOR LIMITED — COMPLETE TEAM HUB
// All 4 tools in one file. Ready to paste into src/App.js
// ─────────────────────────────────────────────────────────────

const BRAND = { dark: "#1e3a5f", mid: "#2d6a9f", light: "#e8f0fb" };

// ── HOME SCREEN ───────────────────────────────────────────────
function Home({ onNav }) {
  const tools = [
    { id: "kpi",        icon: "📊", label: "KPI Dashboard",   desc: "$250K monthly revenue tracker" },
    { id: "sop",        icon: "📋", label: "SOP Hub",          desc: "SOPs, training & templates" },
    { id: "compliance", icon: "🔍", label: "Compliance Audit", desc: "Client folder compliance check" },
    { id: "trail",      icon: "🗂️", label: "Trail Cleanup",    desc: "CRM cleanup & lead finder" },
  ];
  return (
    <div style={{ fontFamily:"Inter,sans-serif", background:"#f8fafc", minHeight:"100vh", padding:24 }}>
      <div style={{ background:`linear-gradient(135deg,${BRAND.dark},${BRAND.mid})`, borderRadius:12, padding:"28px 32px", marginBottom:24, color:"#fff" }}>
        <div style={{ fontSize:10, opacity:.6, letterSpacing:2, marginBottom:8 }}>LIFE PROTECTOR LIMITED</div>
        <div style={{ fontSize:26, fontWeight:600, marginBottom:6 }}>Team Hub</div>
        <div style={{ fontSize:14, opacity:.8 }}>SOPs · KPIs · Compliance · CRM — all in one place.</div>
        <div style={{ display:"flex", gap:20, marginTop:18, flexWrap:"wrap" }}>
          {[["4","Tools"],["$250K","Monthly target"],["6","Product lines"],["100%","Free to host"]].map(([v,l]) => (
            <div key={l}><div style={{ fontSize:22, fontWeight:600 }}>{v}</div><div style={{ fontSize:12, opacity:.7 }}>{l}</div></div>
          ))}
        </div>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))", gap:14 }}>
        {tools.map(t => (
          <div key={t.id} onClick={() => onNav(t.id)}
            style={{ background:"#fff", borderRadius:12, padding:22, cursor:"pointer", border:"1px solid #e2e8f0", boxShadow:"0 1px 4px rgba(0,0,0,.06)", transition:"box-shadow .2s" }}
            onMouseEnter={e => e.currentTarget.style.boxShadow="0 4px 16px rgba(0,0,0,.12)"}
            onMouseLeave={e => e.currentTarget.style.boxShadow="0 1px 4px rgba(0,0,0,.06)"}>
            <div style={{ fontSize:30, marginBottom:10 }}>{t.icon}</div>
            <div style={{ fontWeight:600, fontSize:15, color:"#1e293b", marginBottom:5 }}>{t.label}</div>
            <div style={{ fontSize:13, color:"#64748b" }}>{t.desc}</div>
          </div>
        ))}
      </div>
      <div style={{ marginTop:20, padding:"14px 18px", background:"#fff", borderRadius:10, border:"1px solid #e2e8f0", fontSize:12, color:"#94a3b8", textAlign:"center" }}>
        Life Protector Limited · FAP Licence FSP 109291 · Privacy Act 2020 Compliant
      </div>
    </div>
  );
}

function BackBtn({ onClick }) {
  return (
    <button onClick={onClick} style={{ margin:"12px 16px", background:BRAND.dark, color:"#fff", border:"none", borderRadius:8, padding:"7px 16px", fontSize:13, cursor:"pointer", display:"inline-flex", alignItems:"center", gap:6 }}>
      ← Back to Hub
    </button>
  );
}

// ── KPI DASHBOARD ─────────────────────────────────────────────
const PRODUCT_TARGETS = [
  { name:"Mortgage",      target:80000,  color:"#1e3a5f", bg:"#e8f0fb", icon:"🏠" },
  { name:"Insurance",     target:70000,  color:"#155724", bg:"#d4edda", icon:"🛡️" },
  { name:"Personal Loan", target:30000,  color:"#0c5460", bg:"#d1ecf1", icon:"💳" },
  { name:"Business Loan", target:30000,  color:"#5a3e2b", bg:"#f5e6d8", icon:"🏢" },
  { name:"Investment",    target:25000,  color:"#6f2c91", bg:"#f3e8fb", icon:"📈" },
  { name:"KiwiSaver",     target:15000,  color:"#856404", bg:"#fff3cd", icon:"🐖" },
];
const WEEKLY_KPIS = [
  { key:"leads",    label:"New leads",            target:100, icon:"👤" },
  { key:"calls",    label:"Discovery calls",       target:40,  icon:"📞" },
  { key:"soas",     label:"SOAs issued",           target:20,  icon:"📄" },
  { key:"apps",     label:"Applications",          target:15,  icon:"📤" },
  { key:"reviews",  label:"Client reviews",        target:10,  icon:"🔄" },
  { key:"referrals",label:"Referrals requested",   target:10,  icon:"🤝" },
];
const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const MONTH_TARGET = 250000;
function pct(v, t) { return Math.min(100, Math.round((v / t) * 100)); }
function fmtFull(n) { return "$" + Number(n||0).toLocaleString(); }
function emptyMonth() {
  return { products: {}, weeks: [{},{},{},{}], notes:"" };
}

function KpiDashboard() {
  const now = new Date();
  const [month, setMonth] = useState(MONTHS[now.getMonth()]);
  const [week, setWeek]   = useState(0);
  const [tab, setTab]     = useState("dashboard");
  const [data, setData]   = useState(() => {
    const d = {};
    MONTHS.forEach(m => { d[m] = emptyMonth(); });
    return d;
  });

  const mData   = data[month] || emptyMonth();
  const prods   = mData.products || {};
  const weeks   = mData.weeks   || [{},{},{},{}];
  const weekRow = weeks[week]   || {};
  const totalRev = PRODUCT_TARGETS.reduce((s,p) => s + (Number(prods[p.name])||0), 0);
  const totalPct = pct(totalRev, MONTH_TARGET);
  const gap      = Math.max(0, MONTH_TARGET - totalRev);
  const stColor  = totalPct>=90?"#155724":totalPct>=60?"#856404":"#721c24";
  const stBg     = totalPct>=90?"#d4edda":totalPct>=60?"#fff3cd":"#f8d7da";
  const stLabel  = totalPct>=90?"On Track":totalPct>=60?"At Risk":"Behind";

  function setProd(name, val) {
    setData(prev => ({ ...prev, [month]: { ...prev[month], products: { ...prev[month].products, [name]: val } } }));
  }
  function setWkKpi(wi, key, val) {
    setData(prev => {
      const ws = [...(prev[month].weeks||[{},{},{},{}])];
      ws[wi] = { ...ws[wi], [key]: val };
      return { ...prev, [month]: { ...prev[month], weeks: ws } };
    });
  }

  const tabStyle = (id) => ({ padding:"6px 14px", borderRadius:20, border:"none", cursor:"pointer", fontSize:12, fontWeight:500, background:tab===id?BRAND.dark:"transparent", color:tab===id?"#fff":"#64748b" });

  return (
    <div style={{ fontFamily:"Inter,sans-serif", background:"#f8fafc", minHeight:"100vh" }}>
      <div style={{ background:BRAND.dark, padding:"14px 20px", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:10 }}>
        <div style={{ fontSize:16, fontWeight:500, color:"#fff" }}>📊 KPI Dashboard — $250K Tracker</div>
        <select value={month} onChange={e=>setMonth(e.target.value)} style={{ fontSize:12, padding:"6px 10px", borderRadius:8, border:"none", background:"rgba(255,255,255,.15)", color:"#fff", cursor:"pointer" }}>
          {MONTHS.map(m=><option key={m} value={m} style={{color:"#000"}}>{m}</option>)}
        </select>
      </div>
      <div style={{ background:"#fff", borderBottom:"1px solid #e2e8f0", padding:"0 16px" }}>
        <div style={{ display:"flex", gap:4, padding:"8px 0" }}>
          {[["dashboard","Dashboard"],["revenue","Enter Revenue"],["weekly","Weekly KPIs"],["notes","Notes"]].map(([id,label])=>(
            <button key={id} onClick={()=>setTab(id)} style={tabStyle(id)}>{label}</button>
          ))}
        </div>
      </div>
      <div style={{ padding:20, maxWidth:860, margin:"0 auto" }}>

        {tab==="dashboard" && (
          <div>
            <div style={{ background:"#fff", borderRadius:12, padding:"22px 26px", marginBottom:14, border:"1px solid #e2e8f0" }}>
              <div style={{ display:"flex", justifyContent:"space-between", flexWrap:"wrap", gap:10 }}>
                <div>
                  <div style={{ fontSize:12, color:"#64748b", marginBottom:4 }}>{month} — Total Revenue</div>
                  <div style={{ fontSize:38, fontWeight:600, color:stColor }}>{fmtFull(totalRev)}</div>
                  <div style={{ fontSize:13, color:"#64748b", marginTop:4 }}>of {fmtFull(MONTH_TARGET)} · {totalPct}%</div>
                </div>
                <div style={{ textAlign:"right" }}>
                  <span style={{ background:stBg, color:stColor, fontWeight:600, fontSize:13, padding:"6px 16px", borderRadius:20 }}>{stLabel}</span>
                  <div style={{ fontSize:13, color:"#64748b", marginTop:8 }}>Gap: <strong style={{color:stColor}}>{fmtFull(gap)}</strong></div>
                </div>
              </div>
              <div style={{ marginTop:14, background:"#f1f5f9", borderRadius:8, height:10, overflow:"hidden" }}>
                <div style={{ width:totalPct+"%", height:"100%", background:stColor, borderRadius:8, transition:"width .4s" }} />
              </div>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(230px,1fr))", gap:10 }}>
              {PRODUCT_TARGETS.map(p => {
                const act = Number(prods[p.name])||0;
                const pp  = pct(act, p.target);
                const pc  = pp>=90?"#155724":pp>=60?"#856404":"#721c24";
                return (
                  <div key={p.name} style={{ background:"#fff", borderRadius:10, padding:"14px 16px", border:"1px solid #e2e8f0" }}>
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:8 }}>
                      <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                        <span style={{ fontSize:20 }}>{p.icon}</span>
                        <span style={{ fontWeight:500, fontSize:13, color:"#1e293b" }}>{p.name}</span>
                      </div>
                      <span style={{ fontSize:12, color:pc, fontWeight:600 }}>{pp}%</span>
                    </div>
                    <div style={{ fontSize:20, fontWeight:600, color:p.color, marginBottom:4 }}>{fmtFull(act)}</div>
                    <div style={{ fontSize:11, color:"#64748b", marginBottom:8 }}>of {fmtFull(p.target)}</div>
                    <div style={{ background:"#f1f5f9", borderRadius:6, height:5, overflow:"hidden" }}>
                      <div style={{ width:pp+"%", height:"100%", background:pc, borderRadius:6 }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {tab==="revenue" && (
          <div>
            <div style={{ fontSize:15, fontWeight:500, color:"#1e293b", marginBottom:14 }}>Enter revenue — {month}</div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))", gap:12 }}>
              {PRODUCT_TARGETS.map(p => {
                const act = Number(prods[p.name])||0;
                const pp  = pct(act, p.target);
                const pc  = pp>=100?"#155724":pp>=60?"#856404":"#721c24";
                return (
                  <div key={p.name} style={{ background:"#fff", borderRadius:12, padding:"16px 18px", border:"1px solid #e2e8f0" }}>
                    <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:12 }}>
                      <span style={{ fontSize:22 }}>{p.icon}</span>
                      <div>
                        <div style={{ fontWeight:500, fontSize:14, color:"#1e293b" }}>{p.name}</div>
                        <div style={{ fontSize:11, color:"#64748b" }}>Target: {fmtFull(p.target)}</div>
                      </div>
                    </div>
                    <div style={{ position:"relative", marginBottom:8 }}>
                      <span style={{ position:"absolute", left:10, top:"50%", transform:"translateY(-50%)", color:"#94a3b8", fontSize:14 }}>$</span>
                      <input type="number" min="0" placeholder="0" value={prods[p.name]||""}
                        onChange={e=>setProd(p.name, e.target.value)}
                        style={{ width:"100%", paddingLeft:26, paddingRight:10, fontSize:18, fontWeight:600, borderRadius:8, border:"1px solid #e2e8f0", background:"#f8fafc", color:"#1e293b", height:44, boxSizing:"border-box" }} />
                    </div>
                    <div style={{ background:"#f1f5f9", borderRadius:6, height:5, overflow:"hidden", marginBottom:5 }}>
                      <div style={{ width:pp+"%", height:"100%", background:pc, borderRadius:6 }} />
                    </div>
                    <div style={{ fontSize:11, color:pc }}>{pp>=100?"✅ Target hit!":act>0?`${fmtFull(p.target-act)} to go`:""}</div>
                  </div>
                );
              })}
            </div>
            <div style={{ background:stBg, borderRadius:12, padding:"16px 22px", marginTop:16, display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:10 }}>
              <div>
                <div style={{ fontSize:12, color:stColor, marginBottom:4 }}>Running total — {month}</div>
                <div style={{ fontSize:28, fontWeight:600, color:stColor }}>{fmtFull(totalRev)}</div>
              </div>
              <div style={{ fontSize:18, fontWeight:600, color:stColor }}>{gap>0?`${fmtFull(gap)} to go`:"🎉 Target smashed!"}</div>
            </div>
          </div>
        )}

        {tab==="weekly" && (
          <div>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14, flexWrap:"wrap", gap:8 }}>
              <div style={{ fontSize:15, fontWeight:500, color:"#1e293b" }}>Weekly KPIs — {month}</div>
              <div style={{ display:"flex", gap:6 }}>
                {[0,1,2,3].map(w=>(
                  <button key={w} onClick={()=>setWeek(w)} style={{ padding:"6px 14px", borderRadius:20, border:"none", cursor:"pointer", fontSize:12, fontWeight:500, background:week===w?BRAND.dark:"#f1f5f9", color:week===w?"#fff":"#475569" }}>
                    Week {w+1}
                  </button>
                ))}
              </div>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(230px,1fr))", gap:12 }}>
              {WEEKLY_KPIS.map(k => {
                const val = Number(weekRow[k.key])||0;
                const pp  = pct(val, k.target);
                const pc  = pp>=90?"#155724":pp>=60?"#856404":"#721c24";
                return (
                  <div key={k.key} style={{ background:"#fff", borderRadius:12, padding:"16px 18px", border:"1px solid #e2e8f0" }}>
                    <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:10 }}>
                      <span style={{ fontSize:20 }}>{k.icon}</span>
                      <div>
                        <div style={{ fontWeight:500, fontSize:13, color:"#1e293b" }}>{k.label}</div>
                        <div style={{ fontSize:11, color:"#64748b" }}>Target: {k.target}/week</div>
                      </div>
                    </div>
                    <input type="number" min="0" placeholder="0" value={weeks[week]?.[k.key]||""}
                      onChange={e=>setWkKpi(week,k.key,e.target.value)}
                      style={{ width:"100%", fontSize:22, fontWeight:600, borderRadius:8, border:"1px solid #e2e8f0", background:"#f8fafc", color:"#1e293b", height:48, textAlign:"center", boxSizing:"border-box", marginBottom:8 }} />
                    <div style={{ background:"#f1f5f9", borderRadius:6, height:5, overflow:"hidden", marginBottom:4 }}>
                      <div style={{ width:pp+"%", height:"100%", background:pc, borderRadius:6 }} />
                    </div>
                    <div style={{ fontSize:11, color:pc }}>{val>=k.target?"✅ Done":`${k.target-val} to go`}</div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {tab==="notes" && (
          <div>
            <div style={{ fontSize:15, fontWeight:500, color:"#1e293b", marginBottom:10 }}>Notes — {month}</div>
            <textarea value={mData.notes||""} onChange={e=>setData(prev=>({...prev,[month]:{...prev[month],notes:e.target.value}}))}
              placeholder={"🏆 WINS THIS MONTH\n-\n\n⚠️ BLOCKERS\n-\n\n🎯 NEXT MONTH ACTIONS\n-"}
              style={{ width:"100%", minHeight:320, fontSize:14, lineHeight:1.8, borderRadius:10, border:"1px solid #e2e8f0", background:"#fff", color:"#1e293b", padding:16, boxSizing:"border-box", resize:"vertical", fontFamily:"inherit" }} />
          </div>
        )}
      </div>
    </div>
  );
}

// ── SOP HUB ───────────────────────────────────────────────────
const SOP_CATS = [
  { name:"Mortgage",           color:"#1e3a5f", icon:"🏠", items:["Mortgage SOP — Full VA Workflow","Document Collection Checklist","Lender Submission Guide","Refix & Refinance Process","Lead Follow-Up Checklist"] },
  { name:"Insurance",          color:"#155724", icon:"🛡️", items:["Insurance SOP — Full VA Workflow","Quote Comparison Process","SOA Drafting Guide","Policy Replacement Process","Underwriting Follow-Up SOP","Policy Issuance & Welcome Pack"] },
  { name:"KiwiSaver",          color:"#856404", icon:"🐖", items:["KiwiSaver Transfer Process","Investment Application Process"] },
  { name:"Personal & Business",color:"#0c5460", icon:"💳", items:["Personal Loan Process — Avanti","Business Loan Process"] },
  { name:"Lead Generation",    color:"#721c24", icon:"🎯", items:["Lead Gen Daily SOP","Facebook Ads Management SOP","Community Group Engagement SOP","Database Reactivation SOP","Referral Management SOP"] },
  { name:"Admin & Operations", color:"#374151", icon:"⚙️", items:["Trail CRM Master Guide","Google Drive Structure Guide","Email Etiquette & Templates","DocuSign Process Guide","Escalation Protocol"] },
];
const TRAIN_TRACKS = [
  { name:"Adviser — 12 weeks", color:"#1e3a5f", modules:["Regulatory & Compliance","Mortgage Product Mastery","Insurance Product Mastery","KiwiSaver & Investment","Personal & Business Loans","Sales & Advice Process","Business Development"] },
  { name:"VA — 6 modules",     color:"#155724", modules:["Admin Fundamentals","Mortgage Admin","Insurance Admin","KiwiSaver, Investment & Loans","Customer Service Excellence","Lead Generation Support"] },
  { name:"Lead Gen — 2 weeks", color:"#721c24", modules:["Brand voice & compliance rules","Trail CRM lead entry","Facebook Ads & community posting","Phone scripts & call process","Email sequences & MailerLite"] },
];

function SopHub() {
  const [section, setSection] = useState("sops");
  const [open, setOpen]       = useState(null);

  const navBtn = (id, label) => (
    <button onClick={()=>setSection(id)} style={{ padding:"6px 14px", borderRadius:20, border:"none", cursor:"pointer", fontSize:12, fontWeight:500, background:section===id?BRAND.dark:"transparent", color:section===id?"#fff":"#64748b" }}>
      {label}
    </button>
  );

  return (
    <div style={{ fontFamily:"Inter,sans-serif", background:"#f8fafc", minHeight:"100vh" }}>
      <div style={{ background:BRAND.dark, padding:"14px 20px" }}>
        <div style={{ fontSize:16, fontWeight:500, color:"#fff" }}>📋 SOP Hub — Life Protector Limited</div>
      </div>
      <div style={{ background:"#fff", borderBottom:"1px solid #e2e8f0", padding:"0 16px" }}>
        <div style={{ display:"flex", gap:4, padding:"8px 0" }}>
          {navBtn("sops","SOPs")}
          {navBtn("training","Training")}
          {navBtn("compliance","Compliance Rules")}
          {navBtn("contacts","Key Contacts")}
        </div>
      </div>
      <div style={{ padding:20, maxWidth:860, margin:"0 auto" }}>

        {section==="sops" && (
          <div>
            <div style={{ fontSize:15, fontWeight:500, color:"#1e293b", marginBottom:14 }}>Standard Operating Procedures</div>
            {SOP_CATS.map((cat,ci)=>(
              <div key={ci} style={{ background:"#fff", borderRadius:12, marginBottom:10, border:"1px solid #e2e8f0", overflow:"hidden" }}>
                <div onClick={()=>setOpen(open===ci?null:ci)} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"14px 18px", cursor:"pointer" }}>
                  <div style={{ display:"flex", gap:10, alignItems:"center" }}>
                    <span style={{ fontSize:20 }}>{cat.icon}</span>
                    <span style={{ fontWeight:500, fontSize:14, color:"#1e293b" }}>{cat.name}</span>
                    <span style={{ background:"#f1f5f9", color:"#475569", fontSize:11, padding:"2px 8px", borderRadius:10 }}>{cat.items.length} SOPs</span>
                  </div>
                  <span style={{ color:"#94a3b8", fontSize:14 }}>{open===ci?"▲":"▼"}</span>
                </div>
                {open===ci && (
                  <div style={{ borderTop:"1px solid #f1f5f9", padding:"12px 18px" }}>
                    {cat.items.map((item,ii)=>(
                      <div key={ii} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"8px 0", borderBottom:ii<cat.items.length-1?"1px solid #f8fafc":"none" }}>
                        <div style={{ display:"flex", gap:8, alignItems:"center", fontSize:13, color:"#1e293b" }}>
                          <span style={{ color:cat.color }}>📄</span>{item}
                        </div>
                        <span style={{ background:"#d4edda", color:"#155724", fontSize:10, fontWeight:600, padding:"2px 8px", borderRadius:10 }}>Live</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {section==="training" && (
          <div>
            <div style={{ fontSize:15, fontWeight:500, color:"#1e293b", marginBottom:14 }}>Training Tracks</div>
            {TRAIN_TRACKS.map((track,ti)=>(
              <div key={ti} style={{ background:"#fff", borderRadius:12, marginBottom:12, border:"1px solid #e2e8f0", overflow:"hidden" }}>
                <div onClick={()=>setOpen(open===`t${ti}`?null:`t${ti}`)} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"16px 20px", cursor:"pointer", background:open===`t${ti}`?BRAND.light:"#fff" }}>
                  <div style={{ fontWeight:500, fontSize:15, color:track.color }}>{track.name}</div>
                  <span style={{ color:"#94a3b8" }}>{open===`t${ti}`?"▲":"▼"}</span>
                </div>
                {open===`t${ti}` && (
                  <div style={{ borderTop:"1px solid #f1f5f9", padding:"14px 20px" }}>
                    {track.modules.map((mod,mi)=>(
                      <div key={mi} style={{ display:"flex", gap:10, alignItems:"center", padding:"8px 0", borderBottom:mi<track.modules.length-1?"1px solid #f8fafc":"none" }}>
                        <div style={{ width:24, height:24, borderRadius:"50%", background:BRAND.light, color:BRAND.dark, display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, fontWeight:600, flexShrink:0 }}>{mi+1}</div>
                        <span style={{ fontSize:13, color:"#1e293b" }}>{mod}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {section==="compliance" && (
          <div>
            <div style={{ fontSize:15, fontWeight:500, color:"#1e293b", marginBottom:14 }}>Compliance Golden Rules</div>
            <div style={{ background:"#f8d7da", borderRadius:12, padding:"18px 20px", marginBottom:16 }}>
              {["Never provide financial advice without a signed SOA in place.","Never submit an application without a completed compliance checklist.","AML/KYC must be completed before any advice is given.","Disclosure Statement must be sent before the first advice conversation.","All client files must be retained for 7 years minimum.","Any complaint must be escalated to the Adviser within 24 hours.","All client communication must be logged in Trail within 24 hours.","Never share client data externally without Adviser authorisation."].map((r,i)=>(
                <div key={i} style={{ display:"flex", gap:8, marginBottom:8, fontSize:13, color:"#721c24", alignItems:"flex-start" }}>
                  <span style={{ flexShrink:0 }}>⚠️</span><span>{r}</span>
                </div>
              ))}
            </div>
            {[["FAP Licence","Licensed under FMCA 2013. FAP Licence No. FSP 109291. All advice must be given by or under supervision of the licensed adviser."],["AML/KYC","Verify identity before advice. Acceptable: NZ passport, driver licence, bank statement. Enhanced due diligence for PEPs."],["Privacy Act 2020","Collect only necessary data. Store securely. Never share without consent. Respond to access requests within 20 working days."],["Disclosure","Send Disclosure Statement before first advice. Include FAP details, adviser name, commission disclosure, complaints process."],["File Retention","All client files retained 7 years minimum. Digital files in Google Drive. Physical documents scanned and uploaded."]].map(([title,desc],i)=>(
              <div key={i} style={{ background:"#fff", borderRadius:10, padding:"14px 16px", marginBottom:10, border:"1px solid #e2e8f0" }}>
                <div style={{ fontWeight:500, fontSize:13, color:"#721c24", marginBottom:6 }}>🔒 {title}</div>
                <div style={{ fontSize:13, color:"#475569", lineHeight:1.7 }}>{desc}</div>
              </div>
            ))}
          </div>
        )}

        {section==="contacts" && (
          <div>
            <div style={{ fontSize:15, fontWeight:500, color:"#1e293b", marginBottom:14 }}>Key Contacts & Resources</div>
            {[["Regulators & Dispute",[["Financial Markets Authority","fma.govt.nz","0800 366 385"],["IFSO Ombudsman","ifso.nz","0800 888 202"],["Privacy Commissioner","privacy.org.nz","0800 803 909"]]],["Insurers",[["AIA NZ Adviser","aia.co.nz/adviser","0800 242 238"],["Partners Life","partnerslife.co.nz/adviser","0800 767 267"],["Chubb Life","chubb.com/nz","09 377 1459"]]],["Tools & Systems",[["Trail CRM","trailapp.com","support@trailapp.com"],["Kāinga Ora — First Home Grant","kaingaora.govt.nz","0508 935 266"],["IRD — KiwiSaver","ird.govt.nz","0800 549 472"]]]].map(([group,items],gi)=>(
              <div key={gi} style={{ background:"#fff", borderRadius:12, padding:"16px 18px", marginBottom:12, border:"1px solid #e2e8f0" }}>
                <div style={{ fontWeight:500, fontSize:13, color:BRAND.dark, marginBottom:10 }}>{group}</div>
                {items.map(([name,url,contact],i)=>(
                  <div key={i} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"8px 0", borderTop:i>0?"1px solid #f8fafc":"none", fontSize:13 }}>
                    <div><div style={{ fontWeight:500, color:"#1e293b" }}>{name}</div><div style={{ color:"#64748b", fontSize:12 }}>{contact}</div></div>
                    <a href={`https://${url}`} target="_blank" rel="noopener noreferrer" style={{ color:BRAND.dark, fontSize:12, fontWeight:500, textDecoration:"none" }}>🔗 {url}</a>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ── COMPLIANCE AUDIT ──────────────────────────────────────────
const COMPLIANCE_STEPS = [
  { num:"00", label:"Compliance Docs",  desc:"Disclosure, Privacy, AML/KYC, Authority Form, Consent" },
  { num:"01", label:"Quote",            desc:"Insurer quote PDF, comparison document" },
  { num:"02", label:"Previous Policy",  desc:"Existing policy schedule (if replacement/review)" },
  { num:"03", label:"Application",      desc:"Completed and signed application" },
  { num:"04", label:"Financial Docs",   desc:"Payslips, bank statements, ID" },
  { num:"05", label:"Medical Records",  desc:"GP reports, underwriting docs (if applicable)" },
  { num:"06", label:"New Policy",       desc:"Issued policy schedule, welcome pack confirmation" },
];
const AUDIT_CLIENTS = [
  { name:"Penaredondo, Noriel & Marissa", type:"Insurance", steps:[1,1,1,1,1,1,1], notes:"✅ Only client with full 6-step folder structure." },
  { name:"Tenorio, Joselito & Cristina",  type:"Insurance", steps:[0,1,1,0,0,0,1], notes:"⚠️ No Disclosure Statement, AML/KYC or signed application." },
  { name:"Neniel, Habiba & Christian",    type:"Insurance", steps:[0,1,1,0,0,0,0], notes:"⚠️ Active review — missing compliance, application, financial docs. Shared email flagged." },
  { name:"Ramos, Maria Nenita",           type:"Insurance — Claim", steps:[0,0,0,0,0,1,0], notes:"⚠️ Claim-only folder. No compliance, policy or application." },
  { name:"Zumel, Berdin & Joan",          type:"Insurance", steps:[0,0,0,0,0,0,1], notes:"⚠️ AIA Vitality forms only. No compliance docs." },
  { name:"Bartolome/Beza, Hale & Lani",  type:"Insurance", steps:[0,0,0,0,0,1,0], notes:"⚠️ Underwriting Q&A only. Missing compliance and policy." },
  { name:"Centeno, Rene",                 type:"Personal Loan", steps:[0,0,0,1,1,0,0], notes:"⚠️ Application and payslips present. No Disclosure or settlement doc." },
  { name:"Quiambao, Violeta",             type:"Insurance", steps:[0,0,0,0,0,0,0], notes:"❌ Empty folder." },
  { name:"Reyes, Sophia & Gilbert",       type:"Insurance", steps:[0,0,0,0,0,0,0], notes:"❌ Empty folder." },
  { name:"Bautista, Alejandro & Jennifer",type:"Insurance", steps:[0,0,0,0,0,0,0], notes:"❌ Empty folder." },
  { name:"Colongon",                      type:"Insurance", steps:[0,0,0,0,0,0,0], notes:"❌ Empty folder — rename to full name." },
  { name:"YEM",                           type:"Insurance", steps:[0,0,0,0,0,0,0], notes:"❌ Empty — name unclear. Rename to full client name." },
  { name:"OLAN",                          type:"Insurance", steps:[0,0,0,0,0,0,0], notes:"❌ Empty — name unclear. Rename to full client name." },
  { name:"Maangue",                       type:"Insurance", steps:[0,0,0,0,0,0,0], notes:"❌ Empty folder." },
  { name:"Esteban",                       type:"Insurance", steps:[0,0,0,0,0,0,0], notes:"❌ Empty folder." },
  { name:"Agad",                          type:"Insurance", steps:[0,0,0,0,0,0,0], notes:"❌ Empty folder." },
  { name:"Miguel, Winnie",                type:"Insurance", steps:[0,0,0,0,0,0,0], notes:"❌ Empty folder." },
  { name:"Somostrada",                    type:"Insurance", steps:[0,0,0,0,0,0,0], notes:"❌ Empty folder." },
  { name:"Manozca, Michelle",             type:"Insurance", steps:[0,0,0,0,0,0,0], notes:"❌ Empty folder." },
  { name:"Labajo",                        type:"Insurance", steps:[0,0,0,0,0,0,0], notes:"❌ Empty folder." },
  { name:"Fernandes",                     type:"Personal Loan", steps:[0,0,0,0,0,0,0], notes:"❌ Empty folder." },
];
function clientStatus(steps) {
  const s = steps.reduce((a,b)=>a+b,0);
  if (s===7) return { label:"Compliant",  color:"#155724", bg:"#d4edda" };
  if (s>=4)  return { label:"Partial",    color:"#856404", bg:"#fff3cd" };
  if (s>=1)  return { label:"Incomplete", color:"#721c24", bg:"#f8d7da" };
  return       { label:"Empty",      color:"#374151", bg:"#f1f5f9" };
}

function ComplianceAudit() {
  const [filter, setFilter]   = useState("All");
  const [expanded, setExpanded] = useState(null);
  const [search, setSearch]   = useState("");

  const counts = { All:AUDIT_CLIENTS.length, Compliant:0, Partial:0, Incomplete:0, Empty:0 };
  AUDIT_CLIENTS.forEach(c => { counts[clientStatus(c.steps).label]++; });

  const filtered = AUDIT_CLIENTS.filter(c => {
    const st = clientStatus(c.steps).label;
    return (filter==="All"||st===filter) && c.name.toLowerCase().includes(search.toLowerCase());
  });

  const urgent = AUDIT_CLIENTS.filter(c => !c.steps[0] && c.steps.reduce((a,b)=>a+b,0)>0);

  return (
    <div style={{ fontFamily:"Inter,sans-serif", background:"#f8fafc", minHeight:"100vh" }}>
      <div style={{ background:"#7f1d1d", padding:"14px 20px" }}>
        <div style={{ fontSize:16, fontWeight:500, color:"#fff" }}>🔍 Client Folder Compliance Audit</div>
        <div style={{ fontSize:12, color:"rgba(255,255,255,.7)", marginTop:2 }}>6-step compliance check — {AUDIT_CLIENTS.length} client folders scanned</div>
      </div>
      <div style={{ padding:20, maxWidth:860, margin:"0 auto" }}>
        {/* Step legend */}
        <div style={{ background:"#fff", borderRadius:12, padding:"14px 18px", marginBottom:14, border:"1px solid #e2e8f0" }}>
          <div style={{ fontSize:13, fontWeight:500, color:"#1e293b", marginBottom:10 }}>6-step folder structure required</div>
          <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
            {COMPLIANCE_STEPS.map(s=>(
              <div key={s.num} style={{ background:"#f8fafc", borderRadius:8, padding:"6px 10px", fontSize:11 }}>
                <span style={{ fontWeight:600, color:BRAND.dark }}>{s.num} {s.label}</span>
              </div>
            ))}
          </div>
        </div>
        {/* Stats */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:8, marginBottom:14 }}>
          {[["All",counts.All,"#1e3a5f","#e8f0fb"],["✅ Compliant",counts.Compliant,"#155724","#d4edda"],["⚠️ Partial",counts.Partial,"#856404","#fff3cd"],["❌ Incomplete",counts.Incomplete,"#721c24","#f8d7da"],["🗂️ Empty",counts.Empty,"#374151","#f1f5f9"]].map(([l,v,c,bg])=>(
            <div key={l} style={{ background:bg, borderRadius:10, padding:"12px 14px" }}>
              <div style={{ fontSize:22, fontWeight:600, color:c }}>{v}</div>
              <div style={{ fontSize:11, color:c, marginTop:2 }}>{l}</div>
            </div>
          ))}
        </div>
        {/* Urgent alert */}
        {urgent.length>0 && (
          <div style={{ background:"#f8d7da", border:"1px solid #f5c6cb", borderRadius:10, padding:"12px 16px", marginBottom:14 }}>
            <div style={{ fontWeight:600, fontSize:13, color:"#721c24", marginBottom:6 }}>🚨 Active clients with NO compliance folder (Step 00) — FMCA breach</div>
            <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
              {urgent.map(c=><span key={c.name} style={{ background:"#fff", color:"#721c24", fontSize:12, fontWeight:500, padding:"3px 10px", borderRadius:20, border:"1px solid #f5c6cb" }}>{c.name}</span>)}
            </div>
          </div>
        )}
        {/* Filters */}
        <div style={{ display:"flex", gap:8, marginBottom:12, flexWrap:"wrap", alignItems:"center" }}>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search client..." style={{ padding:"7px 12px", borderRadius:8, border:"1px solid #e2e8f0", fontSize:13, width:200 }} />
          {["All","Compliant","Partial","Incomplete","Empty"].map(f=>(
            <button key={f} onClick={()=>setFilter(f)} style={{ padding:"6px 12px", borderRadius:20, border:"none", cursor:"pointer", fontSize:12, fontWeight:500, background:filter===f?"#7f1d1d":"#f1f5f9", color:filter===f?"#fff":"#475569" }}>
              {f} ({counts[f]??0})
            </button>
          ))}
        </div>
        {/* Client list */}
        {filtered.map((client,ci)=>{
          const st  = clientStatus(client.steps);
          const sc  = client.steps.reduce((a,b)=>a+b,0);
          return (
            <div key={ci} style={{ background:"#fff", borderRadius:10, marginBottom:8, border:`1px solid ${st.bg}`, overflow:"hidden" }}>
              <div onClick={()=>setExpanded(expanded===ci?null:ci)} style={{ display:"flex", alignItems:"center", gap:12, padding:"12px 16px", cursor:"pointer" }}>
                <span style={{ background:st.bg, color:st.color, fontSize:11, fontWeight:600, padding:"3px 10px", borderRadius:12, flexShrink:0 }}>{st.label}</span>
                <div style={{ flex:1 }}>
                  <div style={{ fontWeight:500, fontSize:13, color:"#1e293b" }}>{client.name}</div>
                  <div style={{ fontSize:11, color:"#64748b" }}>{client.type}</div>
                </div>
                <div style={{ display:"flex", gap:3, alignItems:"center" }}>
                  {client.steps.map((has,i)=>(
                    <div key={i} title={COMPLIANCE_STEPS[i].label} style={{ width:18, height:18, borderRadius:"50%", background:has?"#155724":"#f8d7da", display:"flex", alignItems:"center", justifyContent:"center" }}>
                      <span style={{ fontSize:8, color:has?"#fff":"#721c24", fontWeight:700 }}>{COMPLIANCE_STEPS[i].num}</span>
                    </div>
                  ))}
                  <span style={{ marginLeft:6, fontSize:12, color:st.color, fontWeight:600 }}>{sc}/7</span>
                </div>
                <span style={{ color:"#94a3b8", fontSize:14 }}>{expanded===ci?"▲":"▼"}</span>
              </div>
              {expanded===ci && (
                <div style={{ borderTop:"1px solid #f1f5f9", padding:"12px 16px" }}>
                  <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))", gap:8, marginBottom:10 }}>
                    {COMPLIANCE_STEPS.map((s,i)=>(
                      <div key={i} style={{ background:client.steps[i]?"#d4edda":"#f8d7da", borderRadius:8, padding:"8px 10px" }}>
                        <div style={{ fontSize:11, fontWeight:600, color:client.steps[i]?"#155724":"#721c24" }}>
                          {client.steps[i]?"✅":"❌"} {s.num} — {s.label}
                        </div>
                        <div style={{ fontSize:11, color:client.steps[i]?"#166534":"#7f1d1d", marginTop:2 }}>{s.desc}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ background:"#f8fafc", borderRadius:8, padding:"10px 12px", fontSize:13, color:"#475569" }}>{client.notes}</div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── TRAIL CLEANUP ─────────────────────────────────────────────
const TRAIL_PHASES = [
  { phase:"Phase 1 — Duplicates",        color:"#721c24", bg:"#f8d7da", icon:"📋",
    tasks:[["Search known duplicates by surname","Centeno, Quiambao, Beza, Neniel — all flagged in Drive audit"],["Sort contacts A–Z and scan for duplicate names","Keep the most complete record for each person"],["Check for shared email addresses","Couples sharing one email create duplicate-looking records"],["Merge or delete sparse duplicate record","Log every merge: Name | Action | Date in a spreadsheet"]] },
  { phase:"Phase 2 — Stale Records",     color:"#856404", bg:"#fff3cd", icon:"⏱️",
    tasks:[["Filter: Last activity > 90 days","Export this list — it becomes your reactivation campaign"],["Filter: No mobile phone number","Flag — VA cannot call them. Check for email. If neither, mark Uncontactable"],["Filter: No email address","Attempt to find via LinkedIn or Facebook. Mark or update"],["Filter: Status = New Lead after 30+ days","Never followed up. Move to Dormant or reactivate immediately"],["Filter: No pipeline stage assigned","Every contact must have a stage. Assign from last known activity"]] },
  { phase:"Phase 3 — Pipeline Audit",    color:"#1e3a5f", bg:"#e8f0fb", icon:"🔀",
    tasks:[["Review every card in each pipeline stage","New Lead → Discovery → Fact Find → Quote → SOA → Application → Processing → Approved → Settled"],["Move settled clients out of active pipeline","They go to Clients — Active. Pipeline = live opportunities only"],["Remove dead leads from pipeline","Tag as Not Proceeding or Uncontactable. Remove from pipeline view"],["Check applications stuck in Processing > 30 days","Status check with insurer or lender required"],["Set next follow-up date on every open lead","No lead should have a blank Next Follow Up date"]] },
  { phase:"Phase 4 — Notes Cleanup",     color:"#155724", bg:"#d4edda", icon:"📝",
    tasks:[["Check every active client — last note date","No note in 30+ days on an active file = something stalled. Flag to Adviser"],["Backfill missing activity notes","Every email, call, or document received must have a Trail note"],["Clear all overdue tasks","Reschedule or reassign anything overdue by 7+ days"],["Standardise note format","[Date] — [Action taken] — [Next step]. Example: 15 Jun 2026 — SOA sent via DocuSign — Follow up 18 Jun"]] },
  { phase:"Phase 5 — Compliance Fields", color:"#6f2c91", bg:"#f3e8fb", icon:"🛡️",
    tasks:[["Check Disclosure Statement sent date on all clients","Must be noted in Trail. If blank — flag for immediate action"],["Check AML/KYC verification date","Every client who received advice must have AML recorded"],["Verify marketing consent field","Any contact with No consent must NOT receive marketing emails"],["Check policy anniversary dates","All active insurance clients need review dates set in Trail"],["Verify commission records","Every settled loan/issued policy needs commission amount and date logged"]] },
];
const LEAD_RULES = [
  { cat:"Dormant Leads",          color:"#721c24", bg:"#f8d7da", priority:"🔴 Urgent",  filter:"Last activity > 60 days, Status = Lead",        action:"Add to reactivation email sequence. VA calls within 48 hours." },
  { cat:"Never Contacted",        color:"#721c24", bg:"#f8d7da", priority:"🔴 Urgent",  filter:"Added > 30 days ago, no call or email logged",  action:"Call today. SMS + email if no answer." },
  { cat:"SOA Not Signed > 14 days",color:"#1e3a5f",bg:"#e8f0fb", priority:"🔴 High",   filter:"Status = SOA Issued, last activity > 14 days",  action:"Adviser calls personally. Identify objection." },
  { cat:"Annual Review Due",      color:"#155724", bg:"#d4edda", priority:"🟡 Medium",  filter:"Policy anniversary within next 60 days",        action:"Send review invitation. Book appointment. Cross-sell." },
  { cat:"Mortgage Refix Due",     color:"#0c5460", bg:"#d1ecf1", priority:"🟡 Medium",  filter:"Fixed rate expiry within next 90 days",         action:"Adviser calls personally. Rate comparison conversation." },
  { cat:"No Insurance (Mortgage Client)", color:"#856404", bg:"#fff3cd", priority:"🟢 Opportunity", filter:"Client type = Mortgage, no insurance product", action:"Cross-sell insurance during next review." },
  { cat:"No KiwiSaver Review",    color:"#155724", bg:"#d4edda", priority:"🟢 Opportunity", filter:"Age 25–55, no KiwiSaver record",            action:"Send KiwiSaver review invitation. 15-min quick win." },
];

function TrailCleanup() {
  const [tab, setTab]       = useState("checklist");
  const [open, setOpen]     = useState(0);
  const [checked, setChecked] = useState({});

  const toggle = (pi, ti) => {
    const k = `${pi}-${ti}`;
    setChecked(prev => ({ ...prev, [k]: !prev[k] }));
  };
  const progress = (pi) => {
    const total = TRAIL_PHASES[pi].tasks.length;
    const done  = TRAIL_PHASES[pi].tasks.filter((_,ti) => checked[`${pi}-${ti}`]).length;
    return { done, total };
  };
  const totalProg = () => {
    let done=0, total=0;
    TRAIL_PHASES.forEach((p,pi) => { p.tasks.forEach((_,ti) => { total++; if (checked[`${pi}-${ti}`]) done++; }); });
    return { done, total };
  };
  const prog = totalProg();

  const tabBtn = (id, label) => (
    <button onClick={()=>setTab(id)} style={{ padding:"6px 14px", borderRadius:20, border:"none", cursor:"pointer", fontSize:12, fontWeight:500, background:tab===id?BRAND.dark:"transparent", color:tab===id?"#fff":"#64748b" }}>
      {label}
    </button>
  );

  return (
    <div style={{ fontFamily:"Inter,sans-serif", background:"#f8fafc", minHeight:"100vh" }}>
      <div style={{ background:BRAND.dark, padding:"14px 20px" }}>
        <div style={{ fontSize:16, fontWeight:500, color:"#fff" }}>🗂️ Trail CRM Cleanup</div>
      </div>
      <div style={{ background:"#fff", borderBottom:"1px solid #e2e8f0", padding:"0 16px" }}>
        <div style={{ display:"flex", gap:4, padding:"8px 0" }}>
          {tabBtn("checklist","VA Checklist")}
          {tabBtn("leads","Lead Finder")}
          {tabBtn("export","How to Export")}
        </div>
      </div>
      <div style={{ padding:20, maxWidth:860, margin:"0 auto" }}>

        {tab==="checklist" && (
          <div>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14, flexWrap:"wrap", gap:8 }}>
              <div style={{ fontSize:15, fontWeight:500, color:"#1e293b" }}>Trail CRM Cleanup — VA Checklist</div>
              <div style={{ background:"#f8fafc", borderRadius:10, padding:"8px 14px", textAlign:"center" }}>
                <div style={{ fontSize:18, fontWeight:600, color:BRAND.dark }}>{prog.done}/{prog.total}</div>
                <div style={{ fontSize:11, color:"#64748b" }}>tasks done</div>
              </div>
            </div>
            {TRAIL_PHASES.map((phase,pi)=>{
              const { done, total } = progress(pi);
              return (
                <div key={pi} style={{ background:"#fff", borderRadius:12, marginBottom:10, border:"1px solid #e2e8f0", overflow:"hidden" }}>
                  <div onClick={()=>setOpen(open===pi?null:pi)} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"14px 18px", cursor:"pointer", background:done===total&&total>0?"#d4edda":phase.bg }}>
                    <div style={{ display:"flex", gap:10, alignItems:"center" }}>
                      <span style={{ fontSize:20 }}>{phase.icon}</span>
                      <div>
                        <div style={{ fontWeight:500, fontSize:14, color:phase.color }}>{phase.phase}</div>
                        <div style={{ fontSize:11, color:phase.color, opacity:.8 }}>{done}/{total} complete</div>
                      </div>
                    </div>
                    <div style={{ display:"flex", gap:10, alignItems:"center" }}>
                      <div style={{ width:60, height:5, background:"rgba(0,0,0,.1)", borderRadius:4, overflow:"hidden" }}>
                        <div style={{ width:`${(done/total)*100}%`, height:"100%", background:phase.color, borderRadius:4 }} />
                      </div>
                      <span style={{ color:"#94a3b8", fontSize:14 }}>{open===pi?"▲":"▼"}</span>
                    </div>
                  </div>
                  {open===pi && (
                    <div style={{ padding:"14px 18px" }}>
                      {phase.tasks.map(([task,detail],ti)=>{
                        const k = `${pi}-${ti}`;
                        const done = !!checked[k];
                        return (
                          <div key={ti} onClick={()=>toggle(pi,ti)} style={{ display:"flex", gap:12, marginBottom:10, cursor:"pointer", opacity:done?.6:1, alignItems:"flex-start" }}>
                            <div style={{ width:20, height:20, borderRadius:5, border:`1.5px solid ${done?phase.color:"#e2e8f0"}`, background:done?phase.color:"transparent", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, marginTop:1 }}>
                              {done && <span style={{ color:"#fff", fontSize:13, fontWeight:600 }}>✓</span>}
                            </div>
                            <div>
                              <div style={{ fontSize:13, fontWeight:500, color:"#1e293b", textDecoration:done?"line-through":"none", marginBottom:2 }}>{task}</div>
                              <div style={{ fontSize:12, color:"#64748b", lineHeight:1.6 }}>{detail}</div>
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

        {tab==="leads" && (
          <div>
            <div style={{ fontSize:15, fontWeight:500, color:"#1e293b", marginBottom:6 }}>Lead finder — filters to apply in Trail</div>
            <div style={{ fontSize:13, color:"#64748b", marginBottom:14 }}>Apply these filters in Trail to find leads hiding in your database right now.</div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:8, marginBottom:16 }}>
              {[["🔴 Urgent",LEAD_RULES.filter(r=>r.priority.includes("Urgent")||r.priority.includes("High")).length,"#721c24","#f8d7da"],["🟡 Medium",LEAD_RULES.filter(r=>r.priority.includes("Medium")).length,"#856404","#fff3cd"],["🟢 Opportunity",LEAD_RULES.filter(r=>r.priority.includes("Opportunity")).length,"#155724","#d4edda"]].map(([l,v,c,bg])=>(
                <div key={l} style={{ background:bg, borderRadius:10, padding:"12px 14px" }}>
                  <div style={{ fontSize:20, fontWeight:600, color:c }}>{v}</div>
                  <div style={{ fontSize:12, color:c }}>{l}</div>
                </div>
              ))}
            </div>
            {LEAD_RULES.map((rule,i)=>(
              <div key={i} style={{ background:"#fff", borderRadius:12, padding:"14px 18px", marginBottom:10, border:`1px solid ${rule.bg}` }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:10, flexWrap:"wrap", gap:6 }}>
                  <div style={{ fontWeight:500, fontSize:14, color:"#1e293b" }}>{rule.cat}</div>
                  <span style={{ background:rule.bg, color:rule.color, fontSize:11, fontWeight:600, padding:"3px 10px", borderRadius:12 }}>{rule.priority}</span>
                </div>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
                  <div style={{ background:"#f8fafc", borderRadius:8, padding:"10px 12px" }}>
                    <div style={{ fontSize:10, color:"#94a3b8", fontWeight:600, marginBottom:4 }}>TRAIL FILTER</div>
                    <div style={{ fontSize:12, color:"#475569", lineHeight:1.6 }}>{rule.filter}</div>
                  </div>
                  <div style={{ background:rule.bg, borderRadius:8, padding:"10px 12px" }}>
                    <div style={{ fontSize:10, color:rule.color, fontWeight:600, marginBottom:4 }}>ACTION</div>
                    <div style={{ fontSize:12, color:rule.color, lineHeight:1.6 }}>{rule.action}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab==="export" && (
          <div>
            <div style={{ fontSize:15, fontWeight:500, color:"#1e293b", marginBottom:14 }}>How to export from Trail & upload your CSV</div>
            {[["Step 1 — Export from Trail","Log into Trail → Settings (top right gear icon) → Data Export → Select Contacts or Leads → Choose CSV → Download the file."],["Step 2 — Upload to Google Drive","Drag the CSV file into your Google Drive. Name it exactly: trail_export.csv"],["Step 3 — Run the Google Sheets Sync Script","In Google Sheets → Extensions → Apps Script → paste the sync script from Claude → run importFromCSV(). This auto-sorts your contacts into: Urgent, Warm, Active Clients, Dormant, Duplicates."],["Step 4 — Work the lists","Start with the Urgent tab — these need action today. Then work through Warm, Dormant, and Opportunities in order."],["Step 5 — Update Trail","As you call, email, or action each lead, update their status in Trail. Log every interaction as a note."]].map(([title,desc],i)=>(
              <div key={i} style={{ background:"#fff", borderRadius:10, padding:"16px 18px", marginBottom:10, border:"1px solid #e2e8f0" }}>
                <div style={{ display:"flex", gap:10, alignItems:"flex-start" }}>
                  <div style={{ width:28, height:28, borderRadius:"50%", background:BRAND.light, color:BRAND.dark, display:"flex", alignItems:"center", justifyContent:"center", fontSize:13, fontWeight:600, flexShrink:0 }}>{i+1}</div>
                  <div>
                    <div style={{ fontWeight:500, fontSize:14, color:"#1e293b", marginBottom:5 }}>{title}</div>
                    <div style={{ fontSize:13, color:"#64748b", lineHeight:1.7 }}>{desc}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ── ROOT APP ──────────────────────────────────────────────────
export default function App() {
  const [screen, setScreen] = useState("home");
  const back = () => setScreen("home");

  if (screen==="kpi")        return <div><BackBtn onClick={back}/><KpiDashboard/></div>;
  if (screen==="sop")        return <div><BackBtn onClick={back}/><SopHub/></div>;
  if (screen==="compliance") return <div><BackBtn onClick={back}/><ComplianceAudit/></div>;
  if (screen==="trail")      return <div><BackBtn onClick={back}/><TrailCleanup/></div>;
  return <Home onNav={setScreen}/>;
}