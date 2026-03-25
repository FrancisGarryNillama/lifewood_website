"use client";

import { useState } from "react";
import Link from "next/link";

// ── Shared: Tab Indicator ─────────────────────────────────────────────────────
function TabIndicator() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 20 }}>
      <span style={{ width: 20, height: 20, borderRadius: "50%", background: "#1a1a1a", display: "inline-block" }} />
      <span style={{ width: 20, height: 20, borderRadius: "50%", border: "2px solid #9ca3af", display: "inline-block" }} />
      <span style={{ display: "inline-block", width: 120, borderTop: "2px dashed #d1d5db", marginLeft: 4 }} />
    </div>
  );
}

// ── Core Values Data ──────────────────────────────────────────────────────────
const CORE_VALUES = [
  {
    letter: "D",
    title: "Diversity",
    description:
      "We celebrate differences in belief, philosophy and ways of life, because they bring unique perspectives and ideas that encourage everyone to move forward.",
  },
  {
    letter: "C",
    title: "Caring",
    description:
      "We care for every person deeply and equally, because without care work becomes meaningless.",
  },
  {
    letter: "I",
    title: "Innovation",
    description:
      "Innovation is at the heart of all we do, enriching our lives and challenging us to continually improve ourselves and our service.",
  },
  {
    letter: "I",
    title: "Integrity",
    description:
      "We are dedicated to act ethically and sustainably in everything we do. More than just the bare minimum. It is the basis of our existence as a company.",
  },
];

// ── Mission / Vision Data ─────────────────────────────────────────────────────
const TABS = {
  Mission: {
    heading: "Our Mission",
    body: "To develop and deploy cutting edge AI technologies that solve real-world problems, empower communities, and advance sustainable practices. We are committed to fostering a culture of innovation, collaborating with stakeholders across sectors, and making a meaningful impact on society and the environment.",
  },
  Vision: {
    heading: "Our Vision",
    body: "To be the world's most trusted and impactful AI data company—one that is recognised not only for the scale and quality of its solutions, but for the integrity, care, and innovation it brings to every partnership, community, and challenge it encounters.",
  },
};

// ── Photo Gallery Data ────────────────────────────────────────────────────────
// Using placeholder gradients to represent the gallery images from the live site
const GALLERY_ITEMS = [
  { bg: "#c8d5c0", aspect: "2/3", label: "Team photo" },
  { bg: "#b8c4b0", aspect: "4/3", label: "Office" },
  { bg: "#9aab92", aspect: "1/1", label: "Community" },
  { bg: "#d4ddd0", aspect: "3/4", label: "People" },
  { bg: "#aab8a2", aspect: "4/3", label: "Workspace" },
  { bg: "#c0cbb8", aspect: "1/1", label: "Culture" },
];

// ── Core Value Card ───────────────────────────────────────────────────────────
function CoreValueCard({ letter, title, description }: (typeof CORE_VALUES)[0]) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 16,
        padding: "32px 28px",
        borderRadius: 16,
        border: `1px solid ${hovered ? "#d1d5db" : "#e5e7eb"}`,
        background: hovered ? "#fafafa" : "#fff",
        transition: "all 0.2s",
        boxShadow: hovered ? "0 8px 32px rgba(0,0,0,0.07)" : "none",
      }}
    >
      {/* Letter badge */}
      <div style={{
        width: 48, height: 48, borderRadius: 12,
        background: "#1a1a1a",
        display: "flex", alignItems: "center", justifyContent: "center",
        flexShrink: 0,
      }}>
        <span style={{ color: "#fff", fontSize: 22, fontWeight: 800, fontFamily: "Georgia, serif" }}>
          {letter}
        </span>
      </div>
      <h3 style={{
        fontSize: 16, fontWeight: 700, color: "#1a1a1a",
        textTransform: "uppercase", letterSpacing: "0.08em", margin: 0,
      }}>
        {title}
      </h3>
      <p style={{ fontSize: 14, color: "#6b7280", lineHeight: 1.7, margin: 0 }}>
        {description}
      </p>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function AboutUs() {
  const [activeTab, setActiveTab] = useState<"Mission" | "Vision">("Mission");
  const tab = TABS[activeTab];

  return (
    <div style={{ background: "#fff", minHeight: "100vh" }}>

      {/* ── 1. Hero / Intro ───────────────────────────────────────────────── */}
      <section style={{ maxWidth: 1400, margin: "0 auto", padding: "72px 80px 60px" }}>
        <TabIndicator />

        <h1 style={{
          fontSize: "clamp(2.4rem, 5vw, 4rem)",
          fontWeight: 800,
          color: "#1a1a1a",
          marginBottom: 28,
          lineHeight: 1.1,
          fontFamily: "Georgia, serif",
          letterSpacing: "-0.02em",
        }}>
          About our company
        </h1>

        {/* Two-tone paragraph matching the reference */}
        <p style={{ fontSize: 15, lineHeight: 1.8, maxWidth: 860, marginBottom: 36 }}>
          <span style={{ color: "#F5A623" }}>
            While we are motivated by business and economic objectives,{" "}
          </span>
          <span style={{ color: "#1a1a1a" }}>
            we remain committed to our core business beliefs{" "}
          </span>
          <span style={{ color: "#2D6A4F" }}>
            that shape our corporate and individual behaviour around the world.
          </span>
        </p>

        {/* CTA */}
        <Link
          href="/contact-us"
          style={{
            display: "inline-flex", alignItems: "center", gap: 10,
            background: "#F5A623", color: "#fff",
            padding: "12px 24px", borderRadius: 999,
            fontSize: 14, fontWeight: 600, textDecoration: "none",
            transition: "background 0.2s",
          }}
          onMouseEnter={e => (e.currentTarget.style.background = "#e09610")}
          onMouseLeave={e => (e.currentTarget.style.background = "#F5A623")}
        >
          Contact Us
          <span style={{
            display: "inline-flex", alignItems: "center", justifyContent: "center",
            width: 28, height: 28, borderRadius: "50%", background: "#2D6A4F", flexShrink: 0,
          }}>
            <svg width="13" height="13" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path d="M2.5 6H9.5M6.5 3L9.5 6L6.5 9" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </Link>
      </section>

      {/* ── 2. Image Pair ─────────────────────────────────────────────────── */}
      <section style={{ maxWidth: 1400, margin: "0 auto", padding: "0 80px 80px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 20 }}>
          {/* Wide landscape image */}
          <div style={{
            borderRadius: 20, overflow: "hidden", height: 480,
            background: "linear-gradient(135deg, #c8d5c0 0%, #8fa888 100%)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <span style={{ color: "#fff", fontSize: 13, fontWeight: 500, opacity: 0.7 }}>Office photo</span>
          </div>
          {/* Portrait image */}
          <div style={{
            borderRadius: 20, overflow: "hidden", height: 480,
            background: "linear-gradient(135deg, #b8c9b0 0%, #6b8f72 100%)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <span style={{ color: "#fff", fontSize: 13, fontWeight: 500, opacity: 0.7 }}>Team photo</span>
          </div>
        </div>
      </section>

      {/* ── 3. Core Values ────────────────────────────────────────────────── */}
      <section style={{ maxWidth: 1400, margin: "0 auto", padding: "0 80px 100px" }}>
        {/* "Lets collaborate" label */}
        <p style={{
          fontSize: 12, fontWeight: 700, letterSpacing: "0.15em",
          color: "#F5A623", textTransform: "uppercase", marginBottom: 12,
        }}>
          Lets collaborate
        </p>

        <h2 style={{
          fontSize: "clamp(1.4rem, 2.5vw, 2rem)",
          fontWeight: 800, letterSpacing: "0.12em",
          color: "#1a1a1a", textTransform: "uppercase",
          marginBottom: 16, fontFamily: "Georgia, serif",
        }}>
          Core Value
        </h2>

        <p style={{
          fontSize: 15, color: "#374151", lineHeight: 1.75,
          maxWidth: 680, marginBottom: 48,
        }}>
          At Lifewood we empower our company and our clients to realise the transformative
          power of AI: Bringing big data to life, launching new ways of thinking, innovating,
          learning, and doing.
        </p>

        {/* 4-column values grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
          gap: 20,
        }}>
          {CORE_VALUES.map((v) => (
            <CoreValueCard key={v.title} {...v} />
          ))}
        </div>
      </section>

      {/* ── 4. Mission / Vision ───────────────────────────────────────────── */}
      <section style={{
        maxWidth: 1400, margin: "0 auto", padding: "0 80px 100px",
      }}>
        <h2 style={{
          fontSize: "clamp(1.8rem, 3.5vw, 3rem)",
          fontWeight: 700, color: "#1a1a1a", lineHeight: 1.2,
          fontFamily: "Georgia, serif", letterSpacing: "-0.02em",
          marginBottom: 48,
        }}>
          What drives us today, and what inspires us for tomorrow
        </h2>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "start" }}>
          {/* Left: image */}
          <div style={{
            borderRadius: 20, overflow: "hidden", height: 420,
            background: "linear-gradient(135deg, #9aab92 0%, #5c7a62 100%)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <span style={{ color: "#fff", fontSize: 13, fontWeight: 500, opacity: 0.7 }}>Mission / Vision photo</span>
          </div>

          {/* Right: tab toggle + content */}
          <div>
            {/* Tab pills */}
            <div style={{
              display: "inline-flex", background: "#f3f4f6",
              borderRadius: 999, padding: 4, marginBottom: 32, gap: 4,
            }}>
              {(["Mission", "Vision"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setActiveTab(t)}
                  style={{
                    padding: "8px 24px", borderRadius: 999, border: "none",
                    fontSize: 14, fontWeight: 600, cursor: "pointer",
                    transition: "all 0.2s",
                    background: activeTab === t ? "#1a1a1a" : "transparent",
                    color: activeTab === t ? "#fff" : "#6b7280",
                  }}
                >
                  {t}
                </button>
              ))}
            </div>

            <h3 style={{
              fontSize: "clamp(1.4rem, 2vw, 1.8rem)",
              fontWeight: 700, color: "#1a1a1a",
              fontFamily: "Georgia, serif", marginBottom: 20,
            }}>
              {tab.heading}
            </h3>
            <p style={{ fontSize: 15, color: "#374151", lineHeight: 1.8, margin: 0 }}>
              {tab.body}
            </p>
          </div>
        </div>
      </section>

      {/* ── 5. Photo Gallery ("Be Amazed") ───────────────────────────────── */}
      <section style={{ maxWidth: 1400, margin: "0 auto", padding: "0 80px 100px" }}>
        <p style={{
          fontSize: 12, fontWeight: 700, letterSpacing: "0.15em",
          color: "#F5A623", textTransform: "uppercase", marginBottom: 32,
        }}>
          Be Amazed
        </p>

        {/* Masonry-style grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gridTemplateRows: "auto",
          gap: 16,
        }}>
          {/* Row 1: tall left + 2 stacked right */}
          <div style={{
            gridRow: "span 2", borderRadius: 16, overflow: "hidden",
            background: "linear-gradient(160deg, #b8c9b0 0%, #6b8f72 100%)",
            minHeight: 400, display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <span style={{ color: "#fff", fontSize: 12, opacity: 0.6 }}>Photo</span>
          </div>
          <div style={{
            borderRadius: 16, overflow: "hidden",
            background: "linear-gradient(160deg, #c8d5c0 0%, #8fa888 100%)",
            minHeight: 190, display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <span style={{ color: "#fff", fontSize: 12, opacity: 0.6 }}>Photo</span>
          </div>
          <div style={{
            borderRadius: 16, overflow: "hidden",
            background: "linear-gradient(160deg, #9aab92 0%, #5c7a62 100%)",
            minHeight: 190, display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <span style={{ color: "#fff", fontSize: 12, opacity: 0.6 }}>Photo</span>
          </div>

          {/* Row 2 right side */}
          <div style={{
            borderRadius: 16, overflow: "hidden",
            background: "linear-gradient(160deg, #d4ddd0 0%, #a0b8a4 100%)",
            minHeight: 190, display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <span style={{ color: "#fff", fontSize: 12, opacity: 0.6 }}>Photo</span>
          </div>
          <div style={{
            borderRadius: 16, overflow: "hidden",
            background: "linear-gradient(160deg, #aab8a2 0%, #708870 100%)",
            minHeight: 190, display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <span style={{ color: "#fff", fontSize: 12, opacity: 0.6 }}>Photo</span>
          </div>
        </div>
      </section>

    </div>
  );
}