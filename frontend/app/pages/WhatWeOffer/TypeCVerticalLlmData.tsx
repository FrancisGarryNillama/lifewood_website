"use client";

import { useState } from "react";
import Link from "next/link";

function TabIndicator() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 20 }}>
      <span style={{ width: 20, height: 20, borderRadius: "50%", background: "#133020", display: "inline-block" }} />
      <span style={{ width: 20, height: 20, borderRadius: "50%", border: "2px solid #6E7D71", display: "inline-block" }} />
      <span style={{ display: "inline-block", width: 120, borderTop: "2px dashed rgba(19,48,32,0.2)", marginLeft: 4 }} />
    </div>
  );
}

const STEPS = [
  { num: "01", label: "Target", content: "Annotate vehicles, pedestrians, and road objects with 2D & 3D techniques to enable accurate object detection for autonomous driving. Self-driving cars rely on precise visual training to detect, classify, and respond safely in real-world conditions." },
  { num: "02", label: "Solutions", content: "Dedicated Process Engineering team for analysis and optimization. AI-enhanced workflow with multi-level quality checks. Scalable global delivery through crowdsourced workforce management across Malaysia and Indonesia." },
  { num: "03", label: "Results", content: "Achieved 25% production in Month 1 with 95% accuracy (target: 90%) and 50% production in Month 2 with 99% accuracy (target: 95%). Maintained overall accuracy of 99% with on-time delivery. Successfully expanded to Malaysia (100 annotators) and Indonesia (150 annotators)." },
];

const VERTICALS = [
  { icon: "ï¿½-", title: "Autonomous Driving", body: "2D, 3D & 4D LiDAR annotation, radar data labelling, camera fusion, and Driver Monitoring System datasets." },
  { icon: "ðŸ¥", title: "Healthcare & Medical", body: "Medical imaging annotation, clinical NLP datasets, diagnostic AI training data, and radiology report structuring." },
  { icon: "ï¿½-", title: "Legal & Compliance", body: "Contract review datasets, legal entity extraction, regulatory document annotation, and jurisdiction-specific corpora." },
  { icon: "ï¿½'ï¿½", title: "Finance & FinTech", body: "Transaction classification, fraud detection datasets, financial report extraction, and trading sentiment datasets." },
  { icon: "ðŸ­", title: "Industrial & Manufacturing", body: "Defect detection training data, equipment monitoring datasets, and production line computer vision annotation." },
  { icon: "ðŸš¢", title: "Enterprise & Maritime", body: "Enterprise-grade private LLM datasets including ShipGPT-style maritime intelligence corpora for specialized domains." },
];

function AccordionStep({ num, label, content, open, onToggle }: typeof STEPS[0] & { open: boolean; onToggle: () => void }) {
  return (
    <div style={{ borderBottom: "1px solid rgba(19,48,32,0.16)" }}>
      <button onClick={onToggle} style={{ width: "100%", display: "flex", alignItems: "center", gap: 20, padding: "24px 0", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}>
        <span style={{ fontSize: 11, fontWeight: 700, color: "#FFC370", background: "rgba(245,166,35,0.10)", padding: "4px 10px", borderRadius: 6, letterSpacing: "0.06em", flexShrink: 0 }}>{num}</span>
        <span style={{ fontSize: 17, fontWeight: 700, color: open ? "#046241" : "#133020", fontFamily: "Arial, sans-serif", flex: 1, transition: "color 0.2s" }}>{label}</span>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform 0.25s", flexShrink: 0 }}>
          <path d="M4 6L8 10L12 6" stroke="#6E7D71" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <div style={{ overflow: "hidden", maxHeight: open ? 220 : 0, transition: "max-height 0.35s ease" }}>
        <p style={{ fontSize: 14, color: "#5B6A5E", lineHeight: 1.75, paddingBottom: 24, margin: 0 }}>{content}</p>
      </div>
    </div>
  );
}

export default function TypeCVerticalLlmData() {
  const [openStep, setOpenStep] = useState<number | null>(0);
  return (
    <div style={{ background: "#fff", minHeight: "100vh" }}>
      <section style={{ maxWidth: 1400, margin: "0 auto", padding: "72px 80px 60px" }}>
        <TabIndicator />
        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", color: "#133020", background: "rgba(255,195,112,0.22)", padding: "5px 12px", borderRadius: 999, display: "inline-block", marginBottom: 16 }}>Type C</span>
        <h1 style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)", fontWeight: 800, color: "#133020", marginBottom: 24, lineHeight: 1.1, fontFamily: "Arial, sans-serif", letterSpacing: "-0.02em" }}>Vertical LLM Data</h1>
        <p style={{ fontSize: 15, color: "#133020", lineHeight: 1.8, maxWidth: 720, marginBottom: 36 }}>
          AI data solutions across specific industry verticals including autonomous driving data annotation, in-vehicle data collection, and specialized data services for industry, enterprise, or private LLM deployments.
        </p>
        <Link href="/contact-us" style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "#FFC370", color: "#fff", padding: "12px 24px", borderRadius: 999, fontSize: 14, fontWeight: 600, textDecoration: "none", transition: "background 0.2s" }}
          onMouseEnter={e => (e.currentTarget.style.background = "#FFB347")} onMouseLeave={e => (e.currentTarget.style.background = "#FFC370")}>
          Contact Us
          <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 28, height: 28, borderRadius: "50%", background: "#046241" }}>
            <svg width="13" height="13" viewBox="0 0 12 12" fill="none"><path d="M2.5 6H9.5M6.5 3L9.5 6L6.5 9" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </span>
        </Link>
      </section>

      <section style={{ background: "#F9F7F7", borderTop: "1px solid rgba(19,48,32,0.16)", borderBottom: "1px solid rgba(19,48,32,0.16)", padding: "20px 0" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 80px", display: "flex", gap: 48, alignItems: "center", flexWrap: "wrap" }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: "#6E7D71", letterSpacing: "0.1em", textTransform: "uppercase" as const, flexShrink: 0 }}>Featured Work</span>
          {["Autonomous driving & smart cockpit datasets for Driver Monitoring System", "China Merchants Group enterprise dataset for building ShipGPT"].map(t => (
            <span key={t} style={{ fontSize: 13, color: "#133020", borderLeft: "2px solid rgba(19,48,32,0.16)", paddingLeft: 20 }}>{t}</span>
          ))}
        </div>
      </section>

      <section style={{ maxWidth: 1400, margin: "0 auto", padding: "80px 80px 60px" }}>
        <div style={{ marginBottom: 48 }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", color: "#FFC370", textTransform: "uppercase" as const, marginBottom: 12 }}>Industries</p>
          <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", fontWeight: 700, color: "#133020", fontFamily: "Arial, sans-serif", letterSpacing: "-0.02em", margin: 0 }}>Domain-specific AI data</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 20 }}>
          {VERTICALS.map(({ icon, title, body }) => (
            <div key={title} style={{ background: "#F9F7F7", borderRadius: 16, padding: "28px 24px", border: "1px solid rgba(19,48,32,0.16)" }}>
              <span style={{ fontSize: 28, display: "block", marginBottom: 14 }}>{icon}</span>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: "#133020", marginBottom: 8, fontFamily: "Arial, sans-serif" }}>{title}</h3>
              <p style={{ fontSize: 13, color: "#5B6A5E", lineHeight: 1.7, margin: 0 }}>{body}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ maxWidth: 1400, margin: "0 auto", padding: "0 80px 100px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }}>
          <div style={{ borderRadius: 20, background: "linear-gradient(135deg, #0f172a 0%, #133020 100%)", height: 420, display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: 40 }}>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", color: "#FFC370", textTransform: "uppercase" as const, marginBottom: 16 }}>Case Study</p>
            <h3 style={{ fontSize: 22, fontWeight: 700, color: "#fff", fontFamily: "Arial, sans-serif", lineHeight: 1.3, marginBottom: 20 }}>2D, 3D & 4D Data for Autonomous Driving</h3>
            <div style={{ display: "flex", gap: 24 }}>
              {[{ v: "99%", l: "Accuracy" }, { v: "250+", l: "Annotators" }].map(({ v, l }) => (
                <div key={l}><div style={{ fontSize: 24, fontWeight: 800, color: "#fff", fontFamily: "Arial, sans-serif" }}>{v}</div><div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", marginTop: 2 }}>{l}</div></div>
              ))}
            </div>
          </div>
          <div>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", color: "#FFC370", textTransform: "uppercase" as const, marginBottom: 24 }}>Project Breakdown</p>
            {STEPS.map((step, i) => (
              <AccordionStep key={step.num} {...step} open={openStep === i} onToggle={() => setOpenStep(openStep === i ? null : i)} />
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: "#046241", maxWidth: "calc(1400px - 160px)", margin: "0 auto 80px", borderRadius: 20, padding: "72px 80px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 40, flexWrap: "wrap" }}>
        <div style={{ maxWidth: 560 }}>
          <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.15em", color: "#FFC370", textTransform: "uppercase" as const, marginBottom: 16 }}>Get Started</p>
          <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)", fontWeight: 700, color: "#fff", lineHeight: 1.2, fontFamily: "Arial, sans-serif", marginBottom: 16 }}>Need vertical AI training data?</h2>
          <p style={{ fontSize: 15, color: "#6E7D71", lineHeight: 1.75, margin: 0 }}>From autonomous vehicles to enterprise LLMs, we build the domain-specific datasets your models need.</p>
        </div>
        <Link href="/contact-us" style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "#FFC370", color: "#fff", padding: "14px 28px", borderRadius: 999, fontSize: 15, fontWeight: 600, textDecoration: "none", flexShrink: 0 }}
          onMouseEnter={e => (e.currentTarget.style.background = "#FFB347")} onMouseLeave={e => (e.currentTarget.style.background = "#FFC370")}>
          Get in Touch <svg width="14" height="14" viewBox="0 0 12 12" fill="none"><path d="M2.5 6H9.5M6.5 3L9.5 6L6.5 9" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </Link>
      </section>
    </div>
  );
}
