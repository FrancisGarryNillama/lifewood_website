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

const SERVICES = [
  { icon: "🎬", title: "Video Production", body: "Cinematic video content combining advanced film and editing techniques with generative AI to create immersive worlds for advertisements and corporate communications." },
  { icon: "🎙", title: "Voice Synthesis", body: "AI-generated voice content in multiple languages and accents, enabling fast localisation of video narration and character dialogue for global markets." },
  { icon: "🖼", title: "Image Generation", body: "High-fidelity synthetic image creation for marketing, training datasets, product mockups, and brand storytelling across digital channels." },
  { icon: "✍", title: "Text & Script", body: "Story-driven scriptwriting and editorial content that expresses your brand's personality in a compelling and distinctive way—crafted for the communication revolution." },
  { icon: "🌍", title: "Localisation", body: "Quickly adjust the culture and language of your video to suit different world markets—covering 100+ countries and multiple languages." },
  { icon: "🔁", title: "Synthetic Datasets", body: "AIGC pipelines that generate large-scale synthetic training data, reducing dependence on real-world collection for computer vision and NLP models." },
];

export default function TypeDAigc() {
  const [activeService, setActiveService] = useState(0);
  return (
    <div style={{ background: "#fff", minHeight: "100vh" }}>

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section style={{ maxWidth: 1400, margin: "0 auto", padding: "72px 80px 60px" }}>
        <TabIndicator />
        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", color: "#7e22ce", background: "#fdf4ff", padding: "5px 12px", borderRadius: 999, display: "inline-block", marginBottom: 16 }}>Type D</span>
        <h1 style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)", fontWeight: 800, color: "#1a1a1a", marginBottom: 24, lineHeight: 1.1, fontFamily: "Georgia, serif", letterSpacing: "-0.02em" }}>
          AI Generated Content
        </h1>
        <p style={{ fontSize: 15, color: "#374151", lineHeight: 1.8, maxWidth: 720, marginBottom: 36 }}>
          Lifewood&rsquo;s early adoption of AI tools has seen the company rapidly evolve the use of AI generated content,
          integrated into video production for communication requirements. These text, voice, image and video skills—combined
          with traditional production methods and story development—are now being sought by other companies.
        </p>
        <Link href="/contact-us" style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "#F5A623", color: "#fff", padding: "12px 24px", borderRadius: 999, fontSize: 14, fontWeight: 600, textDecoration: "none", transition: "background 0.2s" }}
          onMouseEnter={e => (e.currentTarget.style.background = "#e09610")} onMouseLeave={e => (e.currentTarget.style.background = "#F5A623")}>
          Contact Us
          <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 28, height: 28, borderRadius: "50%", background: "#2D6A4F" }}>
            <svg width="13" height="13" viewBox="0 0 12 12" fill="none"><path d="M2.5 6H9.5M6.5 3L9.5 6L6.5 9" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </span>
        </Link>
      </section>

      {/* ── Approach Statement ───────────────────────────────────────────── */}
      <section style={{ background: "#111827", padding: "80px 0" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 80px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
            <div>
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", color: "#F5A623", textTransform: "uppercase" as const, marginBottom: 20 }}>Our Approach</p>
              <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", fontWeight: 700, color: "#fff", fontFamily: "Georgia, serif", lineHeight: 1.2, marginBottom: 24 }}>
                Story-driven content for the communication revolution
              </h2>
              <p style={{ fontSize: 15, color: "#9ca3af", lineHeight: 1.8, marginBottom: 32 }}>
                Our motivation is to express the personality of your brand in a compelling and distinctive way.
                We use advanced film, video and editing techniques, combined with generative AI, to create
                cinematic worlds for your videos, advertisements, and corporate communications.
              </p>
              <blockquote style={{ borderLeft: "3px solid #F5A623", paddingLeft: 20, margin: 0 }}>
                <p style={{ fontSize: 15, color: "#d1d5db", lineHeight: 1.8, fontStyle: "italic", margin: 0 }}>
                  &ldquo;We understand that your customers spend hours looking at screens: so finding the one, most important
                  thing, on which to build your message is integral to our approach, as we seek to deliver surprise and originality.&rdquo;
                </p>
                <footer style={{ fontSize: 12, color: "#6b7280", marginTop: 12 }}>— Lifewood</footer>
              </blockquote>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {[
                { value: "100+", label: "Countries" },
                { value: "50+", label: "Languages" },
                { value: "4K+", label: "Videos Produced" },
                { value: "3+", label: "Years of AIGC" },
              ].map(({ value, label }) => (
                <div key={label} style={{ background: "rgba(255,255,255,0.05)", borderRadius: 16, padding: "28px 24px", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <div style={{ fontSize: 36, fontWeight: 800, color: "#F5A623", fontFamily: "Georgia, serif", marginBottom: 6 }}>{value}</div>
                  <div style={{ fontSize: 13, color: "#9ca3af" }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Services ─────────────────────────────────────────────────────── */}
      <section style={{ maxWidth: 1400, margin: "0 auto", padding: "80px 80px 60px" }}>
        <div style={{ marginBottom: 48 }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", color: "#F5A623", textTransform: "uppercase" as const, marginBottom: 12 }}>What We Produce</p>
          <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", fontWeight: 700, color: "#1a1a1a", fontFamily: "Georgia, serif", letterSpacing: "-0.02em", margin: 0 }}>AIGC capabilities</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 20 }}>
          {SERVICES.map(({ icon, title, body }, i) => (
            <div key={title}
              onMouseEnter={() => setActiveService(i)}
              style={{
                background: activeService === i ? "#f0faf5" : "#f8f9fa",
                border: `1px solid ${activeService === i ? "#2D6A4F" : "#e5e7eb"}`,
                borderRadius: 16, padding: "28px 24px", transition: "all 0.2s",
              }}>
              <span style={{ fontSize: 28, display: "block", marginBottom: 14 }}>{icon}</span>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: activeService === i ? "#2D6A4F" : "#1a1a1a", marginBottom: 8, fontFamily: "Georgia, serif", transition: "color 0.2s" }}>{title}</h3>
              <p style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.7, margin: 0 }}>{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Localisation Highlight ───────────────────────────────────────── */}
      <section style={{ background: "#f8f9fa", borderTop: "1px solid #e5e7eb", borderBottom: "1px solid #e5e7eb", padding: "60px 0", marginBottom: 0 }}>
        <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 80px", display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: 60, alignItems: "center" }}>
          <p style={{ fontSize: "clamp(1.2rem, 2vw, 1.6rem)", fontWeight: 700, color: "#1a1a1a", fontFamily: "Georgia, serif", lineHeight: 1.4, margin: 0 }}>
            We can <span style={{ color: "#2D6A4F" }}>quickly adjust</span> the culture and language of your video to suit different world markets.
          </p>
          <div style={{ width: 1, background: "#e5e7eb", height: 60 }} />
          <div style={{ display: "flex", gap: 40 }}>
            <div>
              <div style={{ fontSize: 40, fontWeight: 800, color: "#1a1a1a", fontFamily: "Georgia, serif" }}>50+</div>
              <div style={{ fontSize: 13, color: "#6b7280", marginTop: 4 }}>Languages</div>
            </div>
            <div>
              <div style={{ fontSize: 40, fontWeight: 800, color: "#1a1a1a", fontFamily: "Georgia, serif" }}>100+</div>
              <div style={{ fontSize: 13, color: "#6b7280", marginTop: 4 }}>Countries</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section style={{ background: "#111827", maxWidth: "calc(1400px - 160px)", margin: "80px auto", borderRadius: 20, padding: "72px 80px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 40, flexWrap: "wrap" }}>
        <div style={{ maxWidth: 560 }}>
          <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.15em", color: "#F5A623", textTransform: "uppercase" as const, marginBottom: 16 }}>Work With Us</p>
          <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)", fontWeight: 700, color: "#fff", lineHeight: 1.2, fontFamily: "Georgia, serif", marginBottom: 16 }}>Ready to join the communication revolution?</h2>
          <p style={{ fontSize: 15, color: "#9ca3af", lineHeight: 1.75, margin: 0 }}>Let us tell your brand story with surprise, originality, and AI-powered creativity at global scale.</p>
        </div>
        <Link href="/contact-us" style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "#F5A623", color: "#fff", padding: "14px 28px", borderRadius: 999, fontSize: 15, fontWeight: 600, textDecoration: "none", flexShrink: 0 }}
          onMouseEnter={e => (e.currentTarget.style.background = "#e09610")} onMouseLeave={e => (e.currentTarget.style.background = "#F5A623")}>
          Get in Touch <svg width="14" height="14" viewBox="0 0 12 12" fill="none"><path d="M2.5 6H9.5M6.5 3L9.5 6L6.5 9" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </Link>
      </section>

    </div>
  );
}