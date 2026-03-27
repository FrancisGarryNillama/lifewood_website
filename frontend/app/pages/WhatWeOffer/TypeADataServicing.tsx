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
  {
    num: "01", label: "Objective",
    content: "Scan documents for preservation, extract data and structure into a searchable database. Covers multi-language genealogy documents, newspapers, archives and digital assets such as QQ Music song libraries.",
  },
  {
    num: "02", label: "Key Features",
    content: "Features include Auto Crop, Auto De-skew, Blur Detection, Foreign Object Detection, and AI Data Extraction. Each capability is tuned for high-variance document types spanning dozens of languages and formats.",
  },
  {
    num: "03", label: "Results",
    content: "Accurate and precise data is ensured through validation and quality assurance. The system is efficient and scalable, enabling fast and adaptable data extraction. It supports multiple languages and formats. Advanced features include auto-crop, de-skew, blur, and object detection. With AI integration, the solution provides structured data for AI tools.",
  },
];

const CAPABILITIES = [
  { icon: "DC", title: "Document Capture", body: "High-volume scanning and digitisation of physical archives, including genealogy records, newspapers, and legal documents." },
  { icon: "DE", title: "Data Extraction", body: "AI-powered extraction of structured data from unstructured sources such as names, dates, addresses, and entities across 50+ languages." },
  { icon: "LA", title: "Labelling & Annotation", body: "Precise manual and semi-automated labelling pipelines with multi-tier quality control for text, image, and multimodal data." },
  { icon: "QA", title: "Quality Assurance", body: "Multi-level QA workflows including automated checks, human review, and statistical sampling to guarantee data accuracy." },
  { icon: "CL", title: "Data Cleaning", body: "Normalization, deduplication, format standardisation, and noise removal to produce clean, model-ready datasets." },
  { icon: "FD", title: "Formatting & Delivery", body: "Structured output in JSON, CSV, XML, or custom formats delivered via API, SFTP, or directly into your data warehouse." },
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
      <div style={{ overflow: "hidden", maxHeight: open ? 200 : 0, transition: "max-height 0.35s ease" }}>
        <p style={{ fontSize: 14, color: "#5B6A5E", lineHeight: 1.75, paddingBottom: 24, margin: 0 }}>{content}</p>
      </div>
    </div>
  );
}

export default function TypeADataServicing() {
  const [openStep, setOpenStep] = useState<number | null>(0);
  return (
    <div style={{ background: "#fff", minHeight: "100vh" }}>
      <section style={{ maxWidth: 1400, margin: "0 auto", padding: "72px 80px 60px" }}>
        <TabIndicator />
        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", color: "#FFC370", background: "rgba(255,179,71,0.2)", padding: "5px 12px", borderRadius: 999, display: "inline-block", marginBottom: 16 }}>Type A</span>
        <h1 style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)", fontWeight: 800, color: "#133020", marginBottom: 24, lineHeight: 1.1, fontFamily: "Arial, sans-serif", letterSpacing: "-0.02em" }}>Data Servicing</h1>
        <p style={{ fontSize: 15, color: "#133020", lineHeight: 1.8, maxWidth: 720, marginBottom: 36 }}>
          End-to-end data services specializing in multi-language datasets, including document capture, data collection and preparation, extraction, cleaning, labeling, annotation, quality assurance, and formatting.
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
          {["Multi-language genealogy documents, newspapers & archives for global ancestry research", "QQ Music - millions of non-Chinese songs and lyrics"].map(t => (
            <span key={t} style={{ fontSize: 13, color: "#133020", borderLeft: "2px solid rgba(19,48,32,0.16)", paddingLeft: 20 }}>{t}</span>
          ))}
        </div>
      </section>

      <section style={{ maxWidth: 1400, margin: "0 auto", padding: "80px 80px 60px" }}>
        <div style={{ marginBottom: 48 }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", color: "#FFC370", textTransform: "uppercase" as const, marginBottom: 12 }}>What We Do</p>
          <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", fontWeight: 700, color: "#133020", fontFamily: "Arial, sans-serif", letterSpacing: "-0.02em", margin: 0 }}>Full-spectrum data services</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 20 }}>
          {CAPABILITIES.map(({ icon, title, body }) => (
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
          <div>
            <div style={{ borderRadius: 20, background: "linear-gradient(135deg, #133020 0%, #046241 100%)", height: 420, display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: 40 }}>
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", color: "#FFC370", textTransform: "uppercase" as const, marginBottom: 16 }}>Case Study</p>
              <h3 style={{ fontSize: 24, fontWeight: 700, color: "#fff", fontFamily: "Arial, sans-serif", lineHeight: 1.3, marginBottom: 12 }}>Type A - Data Servicing</h3>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", lineHeight: 1.6, margin: 0 }}>Document scanning | AI extraction | Quality assurance</p>
            </div>
          </div>
          <div>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", color: "#FFC370", textTransform: "uppercase" as const, marginBottom: 24 }}>How It Works</p>
            {STEPS.map((step, i) => (
              <AccordionStep key={step.num} {...step} open={openStep === i} onToggle={() => setOpenStep(openStep === i ? null : i)} />
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: "#046241", maxWidth: "calc(1400px - 160px)", margin: "0 auto 80px", borderRadius: 20, padding: "72px 80px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 40, flexWrap: "wrap" }}>
        <div style={{ maxWidth: 560 }}>
          <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.15em", color: "#FFC370", textTransform: "uppercase" as const, marginBottom: 16 }}>Get Started</p>
          <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)", fontWeight: 700, color: "#fff", lineHeight: 1.2, fontFamily: "Arial, sans-serif", marginBottom: 16 }}>Ready to scale your data pipeline?</h2>
          <p style={{ fontSize: 15, color: "#6E7D71", lineHeight: 1.75, margin: 0 }}>Tell us about your project. Our solutions team will respond within one business day.</p>
        </div>
        <Link href="/contact-us" style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "#FFC370", color: "#fff", padding: "14px 28px", borderRadius: 999, fontSize: 15, fontWeight: 600, textDecoration: "none", flexShrink: 0 }}
          onMouseEnter={e => (e.currentTarget.style.background = "#FFB347")} onMouseLeave={e => (e.currentTarget.style.background = "#FFC370")}>
          Get in Touch <svg width="14" height="14" viewBox="0 0 12 12" fill="none"><path d="M2.5 6H9.5M6.5 3L9.5 6L6.5 9" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </Link>
      </section>
    </div>
  );
}
