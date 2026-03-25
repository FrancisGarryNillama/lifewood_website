"use client";

import { useState } from "react";
import Link from "next/link";

function TabIndicator() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 20 }}>
      <span style={{ width: 20, height: 20, borderRadius: "50%", background: "#1a1a1a", display: "inline-block" }} />
      <span style={{ width: 20, height: 20, borderRadius: "50%", border: "2px solid #9ca3af", display: "inline-block" }} />
      <span style={{ display: "inline-block", width: 120, borderTop: "2px dashed #d1d5db", marginLeft: 4 }} />
    </div>
  );
}

const STEPS = [
  {
    num: "01", label: "Target",
    content: "Capture and transcribe recordings from native speakers across 23 countries including Netherlands, Spain, Norway, France, Germany, Poland, Russia, Italy, Japan, South Korea, Mexico, UAE, Saudi Arabia, Egypt, and more. Voice content spans 6 project types and 9 data domains for a total of 25,400 valid hours.",
  },
  {
    num: "02", label: "Solutions",
    content: "30,000+ native-speaking human resources from more than 30 countries were mobilized. Flexible industrial processes were continuously optimized. Power BI dashboards tracked daily collection and transcription progress in real time, enabling immediate analysis and improvement of results.",
  },
  {
    num: "03", label: "Results",
    content: "Delivered voice collection and annotation of 25,400 valid hours on time and with quality—completed in just 5 months. Voice, image, and text datasets were provided across more than 50 language sets for Apple Intelligence.",
  },
];

const DATA_TYPES = [
  { icon: "🎙", title: "Audio & Voice", body: "Native speaker recordings, transcription, utterance collection, voice categorisation, and music metadata across 50+ languages." },
  { icon: "🖼", title: "Image & Vision", body: "Collection, labelling, classification, object detection and tagging for computer vision and multimodal model training." },
  { icon: "📝", title: "Text & NLP", body: "Corpus collection, annotation, sentiment analysis, named entity recognition, and instruction-tuning dataset creation." },
  { icon: "🎬", title: "Video", body: "Video collection, scene labelling, subtitle generation, activity recognition, and live broadcast annotation." },
  { icon: "⚡", title: "Multimodal", body: "Cross-modal alignment, vision-language pairing, and instruction-tuning datasets for deep learning and LLMs." },
  { icon: "🔬", title: "Model Testing", body: "Red-teaming, adversarial dataset creation, benchmark construction, and human preference ranking for RLHF pipelines." },
];

function AccordionStep({ num, label, content, open, onToggle }: typeof STEPS[0] & { open: boolean; onToggle: () => void }) {
  return (
    <div style={{ borderBottom: "1px solid rgba(255,255,255,0.10)" }}>
      <button onClick={onToggle} style={{ width: "100%", display: "flex", alignItems: "center", gap: 20, padding: "24px 0", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}>
        <span style={{ fontSize: 11, fontWeight: 700, color: "#F5A623", background: "rgba(245,166,35,0.15)", padding: "4px 10px", borderRadius: 6, letterSpacing: "0.06em", flexShrink: 0 }}>{num}</span>
        <span style={{ fontSize: 17, fontWeight: 700, color: open ? "#F5A623" : "#fff", fontFamily: "Georgia, serif", flex: 1, transition: "color 0.2s" }}>{label}</span>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform 0.25s", flexShrink: 0 }}>
          <path d="M4 6L8 10L12 6" stroke="#6b7280" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <div style={{ overflow: "hidden", maxHeight: open ? 200 : 0, transition: "max-height 0.35s ease" }}>
        <p style={{ fontSize: 14, color: "#9ca3af", lineHeight: 1.75, paddingBottom: 24, margin: 0 }}>{content}</p>
      </div>
    </div>
  );
}

export default function TypeBHorizontalLlmData() {
  const [openStep, setOpenStep] = useState<number | null>(0);
  return (
    <div style={{ background: "#fff", minHeight: "100vh" }}>

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section style={{ maxWidth: 1400, margin: "0 auto", padding: "72px 80px 60px" }}>
        <TabIndicator />
        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", color: "#2D6A4F", background: "#f0faf5", padding: "5px 12px", borderRadius: 999, display: "inline-block", marginBottom: 16 }}>Type B</span>
        <h1 style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)", fontWeight: 800, color: "#1a1a1a", marginBottom: 24, lineHeight: 1.1, fontFamily: "Georgia, serif", letterSpacing: "-0.02em" }}>Horizontal LLM Data</h1>
        <p style={{ fontSize: 15, color: "#374151", lineHeight: 1.8, maxWidth: 720, marginBottom: 36 }}>
          Comprehensive AI data solutions that cover the entire spectrum from data collection and annotation to model testing.
          Creating multimodal datasets for deep learning and large language models at global scale.
        </p>
        <Link href="/contact-us" style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "#F5A623", color: "#fff", padding: "12px 24px", borderRadius: 999, fontSize: 14, fontWeight: 600, textDecoration: "none", transition: "background 0.2s" }}
          onMouseEnter={e => (e.currentTarget.style.background = "#e09610")} onMouseLeave={e => (e.currentTarget.style.background = "#F5A623")}>
          Contact Us
          <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 28, height: 28, borderRadius: "50%", background: "#2D6A4F" }}>
            <svg width="13" height="13" viewBox="0 0 12 12" fill="none"><path d="M2.5 6H9.5M6.5 3L9.5 6L6.5 9" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </span>
        </Link>
      </section>

      {/* ── Featured Work Strip ───────────────────────────────────────────── */}
      <section style={{ background: "#f8f9fa", borderTop: "1px solid #e5e7eb", borderBottom: "1px solid #e5e7eb", padding: "20px 0" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 80px", display: "flex", gap: 48, alignItems: "center", flexWrap: "wrap" }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", letterSpacing: "0.1em", textTransform: "uppercase" as const, flexShrink: 0 }}>Featured Work</span>
          {["Voice, image and text for Apple Intelligence", "Provided over 50 language sets"].map(t => (
            <span key={t} style={{ fontSize: 13, color: "#374151", borderLeft: "2px solid #e5e7eb", paddingLeft: 20 }}>{t}</span>
          ))}
        </div>
      </section>

      {/* ── Data Types Grid ───────────────────────────────────────────────── */}
      <section style={{ maxWidth: 1400, margin: "0 auto", padding: "80px 80px 60px" }}>
        <div style={{ marginBottom: 48 }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", color: "#F5A623", textTransform: "uppercase" as const, marginBottom: 12 }}>Coverage</p>
          <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", fontWeight: 700, color: "#1a1a1a", fontFamily: "Georgia, serif", letterSpacing: "-0.02em", margin: 0 }}>Every modality. Every language.</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 20 }}>
          {DATA_TYPES.map(({ icon, title, body }) => (
            <div key={title} style={{ background: "#f8f9fa", borderRadius: 16, padding: "28px 24px", border: "1px solid #e5e7eb" }}>
              <span style={{ fontSize: 28, display: "block", marginBottom: 14 }}>{icon}</span>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: "#1a1a1a", marginBottom: 8, fontFamily: "Georgia, serif" }}>{title}</h3>
              <p style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.7, margin: 0 }}>{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Case Study (dark) ─────────────────────────────────────────────── */}
      <section style={{ background: "#111827", padding: "80px 0" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 80px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }}>
            <div>
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", color: "#F5A623", textTransform: "uppercase" as const, marginBottom: 20 }}>Case Study</p>
              <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)", fontWeight: 700, color: "#fff", fontFamily: "Georgia, serif", lineHeight: 1.2, marginBottom: 20 }}>
                Type B: AI Data Project (Audio)
              </h2>
              <p style={{ fontSize: 15, color: "#9ca3af", lineHeight: 1.75, marginBottom: 36 }}>
                One of the largest voice dataset projects ever completed—25,400 hours of multilingual speech data delivered in 5 months for a leading global technology company.
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
                {[
                  { value: "23", label: "Countries" },
                  { value: "25,400h", label: "Valid Hours" },
                  { value: "30K+", label: "Native Speakers" },
                  { value: "5 mo", label: "Delivered In" },
                ].map(({ value, label }) => (
                  <div key={label}>
                    <div style={{ fontSize: 28, fontWeight: 800, color: "#fff", fontFamily: "Georgia, serif" }}>{value}</div>
                    <div style={{ fontSize: 12, color: "#6b7280", marginTop: 4 }}>{label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", color: "#F5A623", textTransform: "uppercase" as const, marginBottom: 24 }}>Project Breakdown</p>
              {STEPS.map((step, i) => (
                <AccordionStep key={step.num} {...step} open={openStep === i} onToggle={() => setOpenStep(openStep === i ? null : i)} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section style={{ maxWidth: "calc(1400px - 160px)", margin: "80px auto", background: "#f8f9fa", borderRadius: 20, padding: "72px 80px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 40, flexWrap: "wrap", border: "1px solid #e5e7eb" }}>
        <div style={{ maxWidth: 560 }}>
          <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.15em", color: "#F5A623", textTransform: "uppercase" as const, marginBottom: 16 }}>Work With Us</p>
          <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)", fontWeight: 700, color: "#1a1a1a", lineHeight: 1.2, fontFamily: "Georgia, serif", marginBottom: 16 }}>Need a large-scale multilingual dataset?</h2>
          <p style={{ fontSize: 15, color: "#6b7280", lineHeight: 1.75, margin: 0 }}>We mobilize global native-speaking workforces to deliver any language, any modality, at any scale.</p>
        </div>
        <Link href="/contact-us" style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "#F5A623", color: "#fff", padding: "14px 28px", borderRadius: 999, fontSize: 15, fontWeight: 600, textDecoration: "none", flexShrink: 0 }}
          onMouseEnter={e => (e.currentTarget.style.background = "#e09610")} onMouseLeave={e => (e.currentTarget.style.background = "#F5A623")}>
          Get in Touch <svg width="14" height="14" viewBox="0 0 12 12" fill="none"><path d="M2.5 6H9.5M6.5 3L9.5 6L6.5 9" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </Link>
      </section>

    </div>
  );
}