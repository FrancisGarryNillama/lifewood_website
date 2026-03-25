"use client";

import { useRef, useState } from "react";
import Link from "next/link";

// ── Data ──────────────────────────────────────────────────────────────────────
const SERVICE_CARDS = [
  {
    category: "Video",
    description:
      "Collection, labelling, audit, live broadcast, subtitle generation",
  },
  {
    category: "Image",
    description:
      "Collection, labelling, classification, audit, object detection and tagging",
  },
  {
    category: "Audio",
    description:
      "Collection, labelling, voice categorization, music categorization, intelligent cs",
  },
  {
    category: "Text",
    description:
      "Text collection, labelling, transcription, utterance collection, sentiment analysis",
  },
  {
    category: "3D & AR",
    description:
      "3D model annotation, augmented reality asset labelling, depth perception tagging",
  },
  {
    category: "Multimodal",
    description:
      "Cross-modal alignment, vision-language pairing, instruction-tuning datasets",
  },
];

// ── Tab Indicator ─────────────────────────────────────────────────────────────
function TabIndicator({ active }: { active: number }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 20 }}>
      {[0, 1].map((i) => (
        <span
          key={i}
          style={{
            width: i === active ? 20 : 20,
            height: 20,
            borderRadius: "50%",
            background: i === active ? "#1a1a1a" : "transparent",
            border: i === active ? "none" : "2px solid #9ca3af",
            display: "inline-block",
            transition: "background 0.2s",
          }}
        />
      ))}
      {/* Dashed line */}
      <span style={{
        display: "inline-block",
        width: 120,
        borderTop: "2px dashed #d1d5db",
        marginLeft: 4,
      }} />
    </div>
  );
}

// ── Service Card ──────────────────────────────────────────────────────────────
function ServiceCard({ category, description }: { category: string; description: string }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        minWidth: 220,
        maxWidth: 220,
        padding: "28px 0",
        borderRight: "1px solid #e5e7eb",
        paddingRight: 32,
        paddingLeft: 8,
        flexShrink: 0,
        cursor: "default",
        transition: "opacity 0.2s",
        opacity: hovered ? 1 : 0.85,
      }}
    >
      <h3
        style={{
          fontSize: 22,
          fontWeight: 600,
          color: hovered ? "#2D6A4F" : "#1a1a1a",
          marginBottom: 14,
          transition: "color 0.2s",
          fontFamily: "Georgia, serif",
        }}
      >
        {category}
      </h3>
      <p style={{ fontSize: 14, color: "#6b7280", lineHeight: 1.65, margin: 0 }}>
        {description}
      </p>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function AiServices() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  };

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === "right" ? 280 : -280, behavior: "smooth" });
  };

  return (
    <div style={{ background: "#fff", minHeight: "100vh" }}>

      {/* ── Hero / Intro Section ─────────────────────────────────────────── */}
      <section style={{
        maxWidth: 1400,
        margin: "0 auto",
        padding: "72px 80px 60px",
      }}>
        <TabIndicator active={0} />

        <h1 style={{
          fontSize: "clamp(2.4rem, 5vw, 4rem)",
          fontWeight: 800,
          letterSpacing: "-0.01em",
          color: "#1a1a1a",
          marginBottom: 28,
          lineHeight: 1.05,
          textTransform: "uppercase",
          fontFamily: "Georgia, serif",
        }}>
          AI DATA SERVICES
        </h1>

        <p style={{
          fontSize: 15,
          color: "#374151",
          lineHeight: 1.75,
          maxWidth: 680,
          marginBottom: 36,
        }}>
          Lifewood delivers end-to-end AI data solutions—from multi-language data collection
          and annotation to model training and generative AI content. Leveraging our global
          workforce, industrialized methodology, and proprietary LiFT platform, we enable
          organizations to scale efficiently, reduce costs, and accelerate decision-making
          with high-quality, domain-specific datasets.
        </p>

        {/* CTA */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Link
            href="/contact-us"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              background: "#F5A623",
              color: "#fff",
              padding: "12px 24px",
              borderRadius: 999,
              fontSize: 14,
              fontWeight: 600,
              textDecoration: "none",
              transition: "background 0.2s",
            }}
            onMouseEnter={e => (e.currentTarget.style.background = "#e09610")}
            onMouseLeave={e => (e.currentTarget.style.background = "#F5A623")}
          >
            Contact Us
            <span style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: 28,
              height: 28,
              borderRadius: "50%",
              background: "#2D6A4F",
              flexShrink: 0,
            }}>
              <svg width="13" height="13" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <path d="M2.5 6H9.5M6.5 3L9.5 6L6.5 9" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </Link>
        </div>
      </section>

      {/* ── Services Carousel ────────────────────────────────────────────── */}
      <section style={{
        maxWidth: 1400,
        margin: "0 auto",
        padding: "0 80px 80px",
        position: "relative",
      }}>
        {/* Scroll buttons */}
        {canScrollLeft && (
          <button
            onClick={() => scroll("left")}
            aria-label="Scroll left"
            style={{
              position: "absolute",
              left: 48,
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 10,
              width: 40,
              height: 40,
              borderRadius: "50%",
              background: "#fff",
              border: "1px solid #e5e7eb",
              boxShadow: "0 2px 8px rgba(0,0,0,0.10)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 4L6 8L10 12" stroke="#374151" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        )}

        {canScrollRight && (
          <button
            onClick={() => scroll("right")}
            aria-label="Scroll right"
            style={{
              position: "absolute",
              right: 48,
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 10,
              width: 40,
              height: 40,
              borderRadius: "50%",
              background: "#fff",
              border: "1px solid #e5e7eb",
              boxShadow: "0 2px 8px rgba(0,0,0,0.10)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M6 4L10 8L6 12" stroke="#374151" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        )}

        {/* Top border */}
        <div style={{ borderTop: "1px solid #e5e7eb", marginBottom: 0 }} />

        {/* Scrollable cards row */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          style={{
            display: "flex",
            overflowX: "auto",
            gap: 0,
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            paddingBottom: 4,
          }}
        >
          {SERVICE_CARDS.map((card) => (
            <ServiceCard key={card.category} {...card} />
          ))}
        </div>

        {/* Bottom border */}
        <div style={{ borderTop: "1px solid #e5e7eb" }} />
      </section>

      {/* ── Dark Feature Section ─────────────────────────────────────────── */}
      <section style={{
        background: "#111827",
        margin: "0 80px",
        borderRadius: 20,
        padding: "72px 80px",
        marginBottom: 80,
        maxWidth: "calc(1400px - 160px)",
        marginInline: "auto",
      }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 80,
          alignItems: "center",
        }}>
          {/* Left */}
          <div>
            <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.15em", color: "#F5A623", textTransform: "uppercase", marginBottom: 16 }}>
              Our Platform
            </p>
            <h2 style={{
              fontSize: "clamp(1.8rem, 3vw, 2.8rem)",
              fontWeight: 700,
              color: "#fff",
              lineHeight: 1.2,
              marginBottom: 24,
              fontFamily: "Georgia, serif",
            }}>
              Powered by the LiFT Platform
            </h2>
            <p style={{ fontSize: 15, color: "#9ca3af", lineHeight: 1.75, marginBottom: 32 }}>
              Our proprietary LiFT (Lifewood Integrated Flow Technology) platform orchestrates
              every stage of the data pipeline—from task assignment and quality control to
              delivery and analytics—ensuring consistency at any scale.
            </p>
            <Link
              href="/contact-us"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                color: "#F5A623",
                fontSize: 14,
                fontWeight: 600,
                textDecoration: "none",
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = "0.8")}
              onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
            >
              Learn more
              <svg width="14" height="14" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <path d="M2.5 6H9.5M6.5 3L9.5 6L6.5 9" stroke="#F5A623" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>

          {/* Right – stat grid */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
            {[
              { value: "50+", label: "Languages supported" },
              { value: "10M+", label: "Tasks completed daily" },
              { value: "99.5%", label: "Quality accuracy rate" },
              { value: "30+", label: "Countries operating in" },
            ].map(({ value, label }) => (
              <div key={label}>
                <div style={{ fontSize: 36, fontWeight: 800, color: "#fff", fontFamily: "Georgia, serif" }}>
                  {value}
                </div>
                <div style={{ fontSize: 13, color: "#6b7280", marginTop: 4 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}