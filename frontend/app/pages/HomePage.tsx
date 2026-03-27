"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { getApiBaseUrl } from "@/app/lib/api";
import { AnimatedImageCard } from "@/app/components/animated/AnimatedPrimitives";

// ï¿½"ï¿½ï¿½"ï¿½ Helpers ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

const HIDDEN_ADMIN_SECRET = "paenggwapo123";
const API_BASE_URL = getApiBaseUrl();

type AdminStatus = "idle" | "unlocking" | "ready" | "submitting" | "success" | "error";

// ï¿½"ï¿½ï¿½"ï¿½ 1. Hero ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½
function HeroSection() {
  return (
    <section
      style={{
        position: "relative",
        width: "100%",
        minHeight: "calc(100vh - 72px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        background: "#f2f2f0",
      }}
    >
      {/* Background curves */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }} aria-hidden="true">
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          viewBox="0 0 1440 900" fill="none" preserveAspectRatio="xMidYMid slice">
          <path d="M -100 700 Q 300 -200 900 400 Q 1200 800 1600 300" stroke="#c8c8c4" strokeWidth="1.2" fill="none" opacity="0.6" />
          <path d="M -100 650 Q 250 -150 850 380 Q 1150 750 1600 250" stroke="#c0c0bc" strokeWidth="0.8" fill="none" opacity="0.5" />
          <path d="M -200 800 Q 400 100 1000 500 Q 1300 750 1700 200" stroke="#b8b8b4" strokeWidth="0.6" fill="none" opacity="0.4" />
          <path d="M -80 900 Q 100 600 300 750 Q 450 850 400 1000" stroke="#a8a8a4" strokeWidth="2" fill="none" opacity="0.35" />
          <path d="M 1300 -50 Q 1500 200 1380 500 Q 1260 800 1450 950" stroke="#d0d0cc" strokeWidth="1" fill="none" opacity="0.4" />
          <path d="M 200 480 Q 600 420 900 460 Q 1150 490 1400 440" stroke="#d8d8d4" strokeWidth="0.8" fill="none" opacity="0.5" />
        </svg>
      </div>

      {/* Content */}
      <div style={{ position: "relative", zIndex: 10, textAlign: "center", padding: "0 24px", maxWidth: 860, margin: "0 auto" }}>
        <h1
          style={{
            fontSize: "clamp(2.4rem, 6vw, 4.5rem)",
            fontWeight: 800,
            lineHeight: 1.08,
            letterSpacing: "-0.03em",
            color: "#133020",
            fontFamily: "Arial, sans-serif",
            marginBottom: 40,
          }}
        >
          The world&rsquo;s leading provider
          <br />
          of AI-powered data solutions.
        </h1>

        <Link
          href="/contact-us"
          style={{
            display: "inline-flex", alignItems: "center", gap: 10,
            background: "#fff", color: "#133020",
            padding: "14px 28px", borderRadius: 999,
            fontSize: 15, fontWeight: 500, textDecoration: "none",
            boxShadow: "0 2px 12px rgba(0,0,0,0.10)",
            border: "1px solid #e0e0de",
            transition: "all 0.2s",
          }}
          onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.14)"; e.currentTarget.style.borderColor = "#ccc"; }}
          onMouseLeave={e => { e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.10)"; e.currentTarget.style.borderColor = "#e0e0de"; }}
        >
          Contact Us
          <span style={{
            display: "inline-flex", alignItems: "center", justifyContent: "center",
            width: 26, height: 26, borderRadius: "50%", background: "#133020",
            transition: "background 0.2s",
          }}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path d="M2.5 6H9.5M6.5 3L9.5 6L6.5 9" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </Link>
      </div>

      {/* Scroll hint */}
      <div style={{
        position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)",
        display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
        opacity: 0.45,
      }}>
        <span style={{ fontSize: 11, letterSpacing: "0.1em", color: "#555", fontWeight: 500 }}>SCROLL</span>
        <div style={{ width: 1, height: 40, background: "linear-gradient(to bottom, #555, transparent)" }} />
      </div>
    </section>
  );
}

// ï¿½"ï¿½ï¿½"ï¿½ 2. About Strip ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½
function AboutSection() {
  const { ref, visible } = useInView();
  return (
    <section ref={ref} style={{
      maxWidth: 1400, margin: "0 auto", padding: "100px 80px",
      display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center",
      opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(32px)",
      transition: "opacity 0.7s ease, transform 0.7s ease",
    }}>
      <div>
        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", color: "#FFC370", textTransform: "uppercase", marginBottom: 20 }}>
          About Us
        </p>
        <h2 style={{
          fontSize: "clamp(1.8rem, 3.5vw, 3rem)", fontWeight: 700,
          color: "#133020", lineHeight: 1.2,
          fontFamily: "Arial, sans-serif", letterSpacing: "-0.02em", marginBottom: 24,
        }}>
          Bringing big data to life for the good of humankind
        </h2>
        <p style={{ fontSize: 15, color: "#133020", lineHeight: 1.8, marginBottom: 16 }}>
          At <strong>Lifewood</strong> we empower our company and our clients to realize the
          transformative power of AI: bringing big data to life, launching new ways of thinking,
          learning and doing; for the good of humankind.
        </p>
        <p style={{ fontSize: 15, color: "#5B6A5E", lineHeight: 1.8, marginBottom: 36 }}>
          By connecting local expertise with our global AI data infrastructure, we create
          opportunities, empower communities, and drive inclusive growth worldwide.
        </p>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <Link href="/our-company/about-us" style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "#133020", color: "#fff",
            padding: "12px 24px", borderRadius: 999,
            fontSize: 14, fontWeight: 600, textDecoration: "none",
            transition: "background 0.2s",
          }}
            onMouseEnter={e => (e.currentTarget.style.background = "#046241")}
            onMouseLeave={e => (e.currentTarget.style.background = "#133020")}
          >
            Know Us Better
            <svg width="13" height="13" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path d="M2.5 6H9.5M6.5 3L9.5 6L6.5 9" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
          <Link href="/ai-initiatives/ai-projects" style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            border: "1px solid rgba(19,48,32,0.16)", color: "#133020",
            padding: "12px 24px", borderRadius: 999,
            fontSize: 14, fontWeight: 600, textDecoration: "none",
            transition: "all 0.2s",
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "#046241"; e.currentTarget.style.color = "#046241"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(19,48,32,0.16)"; e.currentTarget.style.color = "#133020"; }}
          >
            Explore More
          </Link>
        </div>
      </div>
      {/* Right: decorative stat stack */}
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {[
          { value: "40+", label: "Global Delivery Centers", href: "/our-company/offices" },
          { value: "30+", label: "Countries Across All Continents", href: "/our-company/offices" },
          { value: "50+", label: "Language Capabilities & Dialects", href: null },
          { value: "56,000+", label: "Global Online Resources", href: null },
        ].map(({ value, label, href }) => {
          const inner = (
            <div key={label} style={{
              display: "flex", alignItems: "center", gap: 20,
              padding: "20px 24px", borderRadius: 14,
              border: "1px solid rgba(19,48,32,0.16)", background: "#F9F7F7",
              transition: "all 0.2s",
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "#046241"; (e.currentTarget as HTMLElement).style.background = "rgba(4,98,65,0.08)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(19,48,32,0.16)"; (e.currentTarget as HTMLElement).style.background = "#F9F7F7"; }}
            >
              <span style={{ fontSize: 28, fontWeight: 800, color: "#133020", fontFamily: "Arial, sans-serif", minWidth: 80 }}>{value}</span>
              <span style={{ fontSize: 14, color: "#5B6A5E", lineHeight: 1.4 }}>{label}</span>
              {href && (
                <svg style={{ marginLeft: "auto", flexShrink: 0 }} width="14" height="14" viewBox="0 0 12 12" fill="none">
                  <path d="M2.5 6H9.5M6.5 3L9.5 6L6.5 9" stroke="#6E7D71" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </div>
          );
          return href ? <Link key={label} href={href} style={{ textDecoration: "none" }}>{inner}</Link> : <div key={label}>{inner}</div>;
        })}
      </div>
    </section>
  );
}

// ï¿½"ï¿½ï¿½"ï¿½ 3. Services Preview ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½
const SERVICE_ITEMS = [
  { cat: "Audio", desc: "Collection, labelling, voice categorization, music categorization, intelligent cs", icon: "AU" },
  { cat: "Image", desc: "Collection, labelling, classification, audit, object detection and tagging", icon: "IM" },
  { cat: "Video", desc: "Collection, labelling, audit, live broadcast, subtitle generation", icon: "VI" },
  { cat: "Text", desc: "Text collection, labelling, transcription, utterance collection, sentiment analysis", icon: "TX" },
  { cat: "3D & AR", desc: "3D model annotation, augmented reality asset labelling, depth perception tagging", icon: "3D" },
  { cat: "Multimodal", desc: "Cross-modal alignment, vision-language pairing, instruction-tuning datasets", icon: "MM" },
];

function ServicesSection() {
  const { ref, visible } = useInView();
  const [active, setActive] = useState(0);

  return (
    <section style={{ background: "#046241", padding: "100px 0" }}>
      <div ref={ref} style={{
        maxWidth: 1400, margin: "0 auto", padding: "0 80px",
        opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(24px)",
        transition: "opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s",
      }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 80, alignItems: "start" }}>
          {/* Left */}
          <div>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", color: "#FFC370", textTransform: "uppercase", marginBottom: 20 }}>
              What We Do
            </p>
            <h2 style={{
              fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 700,
              color: "#fff", lineHeight: 1.15,
              fontFamily: "Arial, sans-serif", letterSpacing: "-0.02em", marginBottom: 24,
            }}>
              AI DATA SERVICES
            </h2>
            <p style={{ fontSize: 15, color: "#6E7D71", lineHeight: 1.8, marginBottom: 36 }}>
              Lifewood offers AI and IT services that enhance decision-making, reduce costs,
              and improve productivity to optimize organizational performance.
            </p>
            <Link href="/ai-initiatives/ai-services" style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "#FFC370", color: "#fff",
              padding: "12px 24px", borderRadius: 999,
              fontSize: 14, fontWeight: 600, textDecoration: "none",
              transition: "background 0.2s",
            }}
              onMouseEnter={e => (e.currentTarget.style.background = "#FFB347")}
              onMouseLeave={e => (e.currentTarget.style.background = "#FFC370")}
            >
              View All Services
              <svg width="13" height="13" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <path d="M2.5 6H9.5M6.5 3L9.5 6L6.5 9" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>

          {/* Right: service list */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            {SERVICE_ITEMS.map((s, i) => (
              <div
                key={s.cat}
                onMouseEnter={() => setActive(i)}
                style={{
                  padding: "20px 0",
                  borderBottom: "1px solid rgba(255,255,255,0.08)",
                  display: "grid",
                  gridTemplateColumns: "32px 1fr",
                  gap: 16,
                  alignItems: "start",
                  cursor: "default",
                  transition: "all 0.2s",
                }}
              >
                <span style={{ fontSize: 20, lineHeight: 1.4 }}>{s.icon}</span>
                <div>
                  <h3 style={{
                    fontSize: 16, fontWeight: 700,
                    color: active === i ? "#FFC370" : "#fff",
                    fontFamily: "Arial, sans-serif", marginBottom: 6,
                    transition: "color 0.2s",
                  }}>{s.cat}</h3>
                  <p style={{
                    fontSize: 13, color: "#5B6A5E", lineHeight: 1.6, margin: 0,
                    maxHeight: active === i ? 80 : 0,
                    overflow: "hidden",
                    transition: "max-height 0.3s ease, opacity 0.3s ease",
                    opacity: active === i ? 1 : 0,
                  }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ï¿½"ï¿½ï¿½"ï¿½ 4. Stats Banner ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½
function StatsBanner() {
  const { ref, visible } = useInView();
  return (
    <section ref={ref} style={{
      maxWidth: 1400, margin: "0 auto", padding: "100px 80px",
      opacity: visible ? 1 : 0, transition: "opacity 0.8s ease",
    }}>
      <div style={{ textAlign: "center", marginBottom: 64 }}>
        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", color: "#FFC370", textTransform: "uppercase", marginBottom: 16 }}>
          Constant Innovation: Unlimited Possibilities
        </p>
        <h2 style={{
          fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", fontWeight: 700,
          color: "#133020", lineHeight: 1.2,
          fontFamily: "Arial, sans-serif",
        }}>
          Global AI Data Projects at Scale
        </h2>
      </div>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: 20,
        marginBottom: 28,
      }}>
        {[
          "https://framerusercontent.com/images/EfuuWuqk2ibqcvZK8Q4ZM59MgsQ.jpeg?width=1280&height=853",
          "https://framerusercontent.com/images/EfuuWuqk2ibqcvZK8Q4ZM59MgsQ.jpeg?width=1280&height=853",
        ].map((src, index) => (
          <AnimatedImageCard
            key={`${src}-${index}`}
            src={src}
            alt={`Lifewood innovation project showcase ${index + 1}`}
            width={1280}
            height={853}
            delay={index * 0.12}
            hoverScale={1.045}
            frameStyle={{ borderRadius: 24 }}
            imageStyle={{ height: "100%" }}
            overlay={
              <div
                style={{
                  width: "100%",
                  padding: "22px 22px 20px",
                  background: "linear-gradient(180deg, rgba(15,23,42,0) 0%, rgba(15,23,42,0.72) 100%)",
                }}
              >
                <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.14em", color: "#FFC370", textTransform: "uppercase" }}>
                  Innovation In Motion
                </span>
              </div>
            }
          />
        ))}
      </div>
      <div style={{
        display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: 2, borderRadius: 20, overflow: "hidden",
        border: "1px solid rgba(19,48,32,0.16)",
      }}>
        {[
          { value: "40+", label: "Global Delivery Centers", color: "#046241" },
          { value: "30+", label: "Countries Worldwide", color: "#FFC370" },
          { value: "50+", label: "Languages & Dialects", color: "#046241" },
          { value: "56K+", label: "Online Resources", color: "#FFC370" },
        ].map(({ value, label, color }, i) => (
          <div key={label} style={{
            padding: "48px 32px", background: i % 2 === 0 ? "#fff" : "#F9F7F7",
            textAlign: "center",
            borderRight: i < 3 ? "1px solid rgba(19,48,32,0.16)" : "none",
          }}>
            <div style={{ fontSize: 48, fontWeight: 800, color, fontFamily: "Arial, sans-serif", marginBottom: 8 }}>{value}</div>
            <div style={{ fontSize: 14, color: "#5B6A5E", lineHeight: 1.5 }}>{label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ï¿½"ï¿½ï¿½"ï¿½ 5. Clients ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½
const CLIENT_NAMES = ["Microsoft", "Google", "Amazon", "Meta", "Apple", "NVIDIA", "Samsung", "Alibaba", "Baidu", "ByteDance", "OpenAI", "Anthropic"];

function ClientsSection() {
  const { ref, visible } = useInView();
  return (
    <section style={{ background: "#F9F7F7", padding: "80px 0", overflow: "hidden" }}>
      <div ref={ref} style={{
        maxWidth: 1400, margin: "0 auto", padding: "0 80px 48px",
        opacity: visible ? 1 : 0, transition: "opacity 0.7s ease",
      }}>
        <h2 style={{
          fontSize: "clamp(1.6rem, 3vw, 2.4rem)", fontWeight: 700,
          color: "#133020", lineHeight: 1.2,
          fontFamily: "Arial, sans-serif", textAlign: "center", marginBottom: 16,
        }}>
          Our Clients And Partners
        </h2>
        <p style={{ fontSize: 15, color: "#5B6A5E", textAlign: "center", maxWidth: 640, margin: "0 auto 48px", lineHeight: 1.7 }}>
          We are proud to partner and work with leading organizations worldwide in transforming
          data into meaningful solutions.
        </p>
      </div>
      {/* Marquee */}
      <div style={{ position: "relative", overflow: "hidden" }}>
        <div style={{
          display: "flex", gap: 0,
          animation: "marquee 28s linear infinite",
        }}>
          {[...CLIENT_NAMES, ...CLIENT_NAMES].map((name, i) => (
            <div key={i} style={{
              flexShrink: 0, padding: "16px 40px",
              display: "flex", alignItems: "center", justifyContent: "center",
              borderRight: "1px solid rgba(19,48,32,0.16)",
            }}>
              <span style={{ fontSize: 15, fontWeight: 600, color: "#6E7D71", letterSpacing: "0.02em", whiteSpace: "nowrap" }}>{name}</span>
            </div>
          ))}
        </div>
      </div>
      <style>{`@keyframes marquee { from { transform: translateX(0) } to { transform: translateX(-50%) } }`}</style>
    </section>
  );
}

// ï¿½"ï¿½ï¿½"ï¿½ 6. Final CTA ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½
function CtaSection() {
  const { ref, visible } = useInView();
  return (
    <section style={{ maxWidth: 1400, margin: "0 auto", padding: "80px 80px 100px" }}>
      <div ref={ref} style={{
        background: "#046241", borderRadius: 24, padding: "80px",
        display: "grid", gridTemplateColumns: "1fr auto", gap: 60, alignItems: "center",
        opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(24px)",
        transition: "opacity 0.7s ease, transform 0.7s ease",
      }}>
        <div>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", color: "#FFC370", textTransform: "uppercase", marginBottom: 20 }}>
            Let&apos;s Work Together
          </p>
          <h2 style={{
            fontSize: "clamp(1.8rem, 3.5vw, 3rem)", fontWeight: 700,
            color: "#fff", lineHeight: 1.15,
            fontFamily: "Arial, sans-serif", marginBottom: 20,
          }}>
            No matter the industry, size or type of dataï¿½"our solutions satisfy any AI-data requirement.
          </h2>
          <p style={{ fontSize: 15, color: "#6E7D71", lineHeight: 1.8, maxWidth: 520 }}>
            From data collection and annotation to model training at global scale,
            Lifewood is your end-to-end AI data partner.
          </p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12, flexShrink: 0 }}>
          <Link href="/contact-us" style={{
            display: "inline-flex", alignItems: "center", gap: 10,
            background: "#FFC370", color: "#fff",
            padding: "14px 28px", borderRadius: 999,
            fontSize: 15, fontWeight: 600, textDecoration: "none",
            whiteSpace: "nowrap", transition: "background 0.2s",
          }}
            onMouseEnter={e => (e.currentTarget.style.background = "#FFB347")}
            onMouseLeave={e => (e.currentTarget.style.background = "#FFC370")}
          >
            Contact Us Now
            <svg width="14" height="14" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path d="M2.5 6H9.5M6.5 3L9.5 6L6.5 9" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
          <Link href="/ai-initiatives/ai-projects" style={{
            display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 10,
            border: "1px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.7)",
            padding: "14px 28px", borderRadius: 999,
            fontSize: 15, fontWeight: 600, textDecoration: "none",
            whiteSpace: "nowrap", transition: "all 0.2s",
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.4)"; e.currentTarget.style.color = "#fff"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"; e.currentTarget.style.color = "rgba(255,255,255,0.7)"; }}
          >
            Explore Projects
          </Link>
        </div>
      </div>
    </section>
  );
}

function HiddenAdminModal({
  isOpen,
  status,
  username,
  password,
  message,
  isAuthenticated,
  onUsernameChange,
  onPasswordChange,
  onSubmit,
  onClose,
  onLogout,
}: {
  isOpen: boolean;
  status: AdminStatus;
  username: string;
  password: string;
  message: string;
  isAuthenticated: boolean;
  onUsernameChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onClose: () => void;
  onLogout: () => void;
}) {
  if (!isOpen) return null;

  const isBusy = status === "unlocking" || status === "submitting";
  const isSuccess = status === "success";
  const isError = status === "error";

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 2000,
        background: "rgba(17, 24, 39, 0.58)",
        backdropFilter: "blur(10px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 420,
          borderRadius: 24,
          background: "linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)",
          boxShadow: "0 24px 80px rgba(15, 23, 42, 0.28)",
          border: "1px solid rgba(229, 231, 235, 0.9)",
          padding: 28,
          position: "relative",
        }}
        onClick={event => event.stopPropagation()}
      >
        <button
          type="button"
          aria-label="Close hidden admin login"
          onClick={onClose}
          style={{
            position: "absolute",
            top: 16,
            right: 16,
            width: 34,
            height: 34,
            borderRadius: "50%",
            border: "1px solid rgba(19,48,32,0.16)",
            background: "#fff",
            color: "#5B6A5E",
            cursor: "pointer",
            fontSize: 18,
            lineHeight: 1,
          }}
        >
          ï¿½-
        </button>

        <div style={{ marginBottom: 24 }}>
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            borderRadius: 999,
            padding: "6px 12px",
            background: "#F9F7F7",
            color: "#133020",
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            marginBottom: 14,
          }}>
            Secure Access
          </div>
          <h3 style={{
            fontSize: 28,
            lineHeight: 1.15,
            color: "#046241",
            fontFamily: "Arial, sans-serif",
            marginBottom: 10,
          }}>
            Hidden Admin Login
          </h3>
          <p style={{ fontSize: 14, lineHeight: 1.7, color: "#5B6A5E", margin: 0 }}>
            Access is available only after the private homepage key sequence is entered.
          </p>
        </div>

        <form onSubmit={onSubmit} style={{ display: "grid", gap: 14 }}>
          <label style={{ display: "grid", gap: 8 }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: "#133020" }}>Username</span>
            <input
              value={username}
              onChange={event => onUsernameChange(event.target.value)}
              placeholder="admin123"
              autoComplete="username"
              disabled={isBusy || isAuthenticated}
              style={{
                width: "100%",
                borderRadius: 14,
                border: "1px solid rgba(19,48,32,0.2)",
                background: isAuthenticated ? "#F9F7F7" : "#fff",
                color: "#046241",
                padding: "14px 16px",
                fontSize: 14,
                outline: "none",
              }}
            />
          </label>

          <label style={{ display: "grid", gap: 8 }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: "#133020" }}>Password</span>
            <input
              type="password"
              value={password}
              onChange={event => onPasswordChange(event.target.value)}
              placeholder="Enter password"
              autoComplete="current-password"
              disabled={isBusy || isAuthenticated}
              style={{
                width: "100%",
                borderRadius: 14,
                border: "1px solid rgba(19,48,32,0.2)",
                background: isAuthenticated ? "#F9F7F7" : "#fff",
                color: "#046241",
                padding: "14px 16px",
                fontSize: 14,
                outline: "none",
              }}
            />
          </label>

          {message ? (
            <div style={{
              borderRadius: 14,
              padding: "12px 14px",
              fontSize: 13,
              lineHeight: 1.6,
              background: isSuccess ? "rgba(4,98,65,0.12)" : isError ? "rgba(19,48,32,0.1)" : "#F9F7F7",
              color: isSuccess ? "#046241" : isError ? "#133020" : "#133020",
              border: `1px solid ${isSuccess ? "rgba(4,98,65,0.2)" : isError ? "rgba(19,48,32,0.2)" : "rgba(19,48,32,0.16)"}`,
            }}>
              {message}
            </div>
          ) : null}

          <div style={{ display: "flex", gap: 12, marginTop: 4 }}>
            {!isAuthenticated ? (
              <button
                type="submit"
                disabled={isBusy}
                style={{
                  flex: 1,
                  border: "none",
                  borderRadius: 999,
                  background: isBusy ? "#6E7D71" : "#046241",
                  color: "#fff",
                  padding: "14px 18px",
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: isBusy ? "not-allowed" : "pointer",
                  transition: "background 0.2s",
                }}
              >
                {status === "submitting" ? "Signing In..." : "Sign In"}
              </button>
            ) : (
              <button
                type="button"
                onClick={onLogout}
                disabled={isBusy}
                style={{
                  flex: 1,
                  border: "none",
                  borderRadius: 999,
                  background: isBusy ? "#6E7D71" : "#133020",
                  color: "#fff",
                  padding: "14px 18px",
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: isBusy ? "not-allowed" : "pointer",
                }}
              >
                {isBusy ? "Processing..." : "Log Out"}
              </button>
            )}

            <button
              type="button"
              onClick={onClose}
              disabled={isBusy}
              style={{
                flex: 1,
                borderRadius: 999,
                border: "1px solid rgba(19,48,32,0.2)",
                background: "#fff",
                color: "#133020",
                padding: "14px 18px",
                fontSize: 14,
                fontWeight: 600,
                cursor: isBusy ? "not-allowed" : "pointer",
              }}
            >
              {isAuthenticated ? "Close" : "Cancel"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ï¿½"ï¿½ï¿½"ï¿½ Page ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½
export default function HomePage() {
  const [typedSequence, setTypedSequence] = useState("");
  const [isHiddenAdminOpen, setIsHiddenAdminOpen] = useState(false);
  const [adminStatus, setAdminStatus] = useState<AdminStatus>("idle");
  const [adminMessage, setAdminMessage] = useState("");
  const [adminUsername, setAdminUsername] = useState("admin123");
  const [adminPassword, setAdminPassword] = useState("");
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const router = useRouter();

  const closeHiddenAdmin = async () => {
    setIsHiddenAdminOpen(false);

    if (isAdminAuthenticated) {
      return;
    }

    try {
      await fetch(`${API_BASE_URL}/hidden-admin/logout/`, {
        method: "POST",
        credentials: "include",
      });
    } catch {
      // Intentionally silent; hidden flow should not interrupt the public homepage.
    } finally {
      setTypedSequence("");
      setAdminStatus("idle");
      setAdminMessage("");
      setAdminPassword("");
    }
  };

  const logoutHiddenAdmin = async () => {
    setAdminStatus("submitting");

    try {
      const response = await fetch(`${API_BASE_URL}/hidden-admin/logout/`, {
        method: "POST",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Unable to end the hidden admin session right now.");
      }

      setIsAdminAuthenticated(false);
      setAdminStatus("idle");
      setAdminMessage("Hidden admin session closed.");
      setAdminPassword("");
      setTypedSequence("");
      setIsHiddenAdminOpen(false);
    } catch (error) {
      setAdminStatus("error");
      setAdminMessage(error instanceof Error ? error.message : "Unable to log out right now.");
    }
  };

  useEffect(() => {
    const handleKeyDown = async (event: KeyboardEvent) => {
      if (event.ctrlKey || event.metaKey || event.altKey) return;

      const target = event.target as HTMLElement | null;
      const tagName = target?.tagName?.toLowerCase();

      if (tagName === "input" || tagName === "textarea" || target?.isContentEditable) {
        return;
      }

      const key = event.key.toLowerCase();

      if (key.length !== 1) {
        return;
      }

      const nextSequence = `${typedSequence}${key}`.slice(-HIDDEN_ADMIN_SECRET.length);
      setTypedSequence(nextSequence);

      if (nextSequence !== HIDDEN_ADMIN_SECRET) {
        return;
      }

      setAdminStatus("unlocking");
      setAdminMessage("");
      setAdminPassword("");

      try {
        const response = await fetch(`${API_BASE_URL}/hidden-admin/unlock/`, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ secret: HIDDEN_ADMIN_SECRET }),
        });

        const data = await response.json().catch(() => null);

        if (!response.ok) {
          throw new Error(data?.detail || data?.message || "Hidden admin access could not be opened.");
        }

        setIsHiddenAdminOpen(true);
        setAdminStatus("ready");
        setAdminMessage("Access unlocked. Continue with your administrator credentials.");
        setTypedSequence("");
      } catch (error) {
        setAdminStatus("error");
        setAdminMessage(error instanceof Error ? error.message : "Hidden admin access could not be opened.");
        setTypedSequence("");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [typedSequence]);

  const handleAdminSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  setAdminStatus("submitting");
  setAdminMessage("");
 
  try {
    const response = await fetch(`${API_BASE_URL}/hidden-admin/login/`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: adminUsername,
        password: adminPassword,
      }),
    });
 
    const data = await response.json().catch(() => null);
 
    if (!response.ok) {
      throw new Error(data?.detail || data?.message || "Unable to sign in.");
    }
 
    setIsAdminAuthenticated(true);
    setAdminStatus("success");
    setAdminMessage(data?.message || "Redirecting to dashboardâ€¦");
    setAdminPassword("");
 
    // ï¿½"ï¿½ï¿½"ï¿½ NEW: redirect to the admin dashboard after a short delay ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½
    setTimeout(() => {
        router.push("/admin-dashboard");
      }, 800);
 
    } catch (error) {
      setIsAdminAuthenticated(false);
      setAdminStatus("error");
      setAdminMessage(error instanceof Error ? error.message : "Unable to sign in.");
    }
  };

  return (
    <>
      <HeroSection />
      <AboutSection />
      <StatsBanner />
      <ServicesSection />
      <ClientsSection />
      <CtaSection />
      <HiddenAdminModal
        isOpen={isHiddenAdminOpen}
        status={adminStatus}
        username={adminUsername}
        password={adminPassword}
        message={adminMessage}
        isAuthenticated={isAdminAuthenticated}
        onUsernameChange={setAdminUsername}
        onPasswordChange={setAdminPassword}
        onSubmit={handleAdminSubmit}
        onClose={closeHiddenAdmin}
        onLogout={logoutHiddenAdmin}
      />
    </>
  );
}

