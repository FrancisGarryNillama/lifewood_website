"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { AnimatedYouTubeEmbed } from "@/app/components/animated/AnimatedPrimitives";

// ── Data ──────────────────────────────────────────────────────────────────────
const CATEGORIES = ["All", "Company Updates", "AI & Technology", "Community", "Awards", "Events"];

const NEWS_ITEMS = [
  {
    category: "Company Updates",
    title: "Lifewood Expands Operations to 5 New African Markets",
    excerpt: "Building on our success in Kenya and Nigeria, Lifewood is establishing new delivery centers in Ethiopia, Mozambique, Senegal, Côte d'Ivoire, and Zambia.",
    date: "March 18, 2026",
    readTime: "4 min read",
    featured: true,
  },
  {
    category: "AI & Technology",
    title: "LiFT Platform v3.0 Launches with Real-Time Quality Scoring",
    excerpt: "Our proprietary Lifewood Integrated Flow Technology platform now features AI-powered quality scoring that reduces annotation error rates by up to 40%.",
    date: "March 11, 2026",
    readTime: "6 min read",
    featured: false,
  },
  {
    category: "Community",
    title: "56,000 Digital Workers: The Lifewood Community in Numbers",
    excerpt: "A deep look at our growing global workforce—who they are, where they work, and how Lifewood is improving livelihoods through sustainable AI data jobs.",
    date: "February 28, 2026",
    readTime: "8 min read",
    featured: false,
  },
  {
    category: "Awards",
    title: "Lifewood Named Top AI Data Provider in APAC for 2026",
    excerpt: "For the third consecutive year, Lifewood has been recognised as the leading AI data services company across the Asia Pacific region by TechData Awards.",
    date: "February 20, 2026",
    readTime: "3 min read",
    featured: false,
  },
  {
    category: "Events",
    title: "Join Us at AI Summit 2026 in Singapore",
    excerpt: "Lifewood will be exhibiting at AI Summit Asia on April 14–15. Visit our booth to see live demos of the LiFT platform and speak with our solutions team.",
    date: "February 12, 2026",
    readTime: "2 min read",
    featured: false,
  },
  {
    category: "AI & Technology",
    title: "How We Built a 50-Language Speech Corpus in 90 Days",
    excerpt: "A behind-the-scenes look at the methodology, tooling, and people behind one of our most ambitious data collection projects to date.",
    date: "February 5, 2026",
    readTime: "10 min read",
    featured: false,
  },
  {
    category: "Company Updates",
    title: "Lifewood Philippines Opens Third Manila Office",
    excerpt: "To accommodate rapid growth, we have opened a third facility in Ortigas Center, adding 800 workstations and expanding our Philippines headcount to over 3,000.",
    date: "January 30, 2026",
    readTime: "3 min read",
    featured: false,
  },
  {
    category: "Community",
    title: "Partnering with Schools in Nairobi for Digital Literacy",
    excerpt: "Lifewood's Impact Program has partnered with 12 secondary schools in Nairobi, equipping 2,400 students with AI literacy and annotation skills.",
    date: "January 22, 2026",
    readTime: "5 min read",
    featured: false,
  },
];

const CATEGORY_COLORS: Record<string, { bg: string; text: string }> = {
  "Company Updates": { bg: "#f0faf5", text: "#2D6A4F" },
  "AI & Technology": { bg: "#eff6ff", text: "#1d4ed8" },
  "Community": { bg: "#fdf4ff", text: "#7e22ce" },
  "Awards": { bg: "#fff7ed", text: "#c2410c" },
  "Events": { bg: "#fef9c3", text: "#92400e" },
};

// ── Sub-Components ────────────────────────────────────────────────────────────
function TabIndicator() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 20 }}>
      <span style={{ width: 20, height: 20, borderRadius: "50%", background: "#1a1a1a", display: "inline-block" }} />
      <span style={{ width: 20, height: 20, borderRadius: "50%", border: "2px solid #9ca3af", display: "inline-block" }} />
      <span style={{ display: "inline-block", width: 120, borderTop: "2px dashed #d1d5db", marginLeft: 4 }} />
    </div>
  );
}

function CategoryPill({ cat }: { cat: string }) {
  const style = CATEGORY_COLORS[cat] ?? { bg: "#f3f4f6", text: "#374151" };
  return (
    <span style={{
      fontSize: 11, fontWeight: 700, padding: "4px 10px", borderRadius: 999,
      background: style.bg, color: style.text, letterSpacing: "0.06em",
    }}>
      {cat}
    </span>
  );
}

function FeaturedCard({ item }: { item: typeof NEWS_ITEMS[0] }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        gridColumn: "span 2",
        background: "#111827", borderRadius: 20, padding: "52px 56px",
        display: "grid", gridTemplateColumns: "1fr auto",
        gap: 48, alignItems: "center",
        transition: "all 0.2s",
        cursor: "default",
      }}
    >
      <div>
        <div style={{ display: "flex", gap: 10, marginBottom: 20, alignItems: "center" }}>
          <CategoryPill cat={item.category} />
          <span style={{ fontSize: 11, color: "#6b7280" }}>{item.date}</span>
          <span style={{ fontSize: 11, color: "#6b7280" }}>·</span>
          <span style={{ fontSize: 11, color: "#6b7280" }}>{item.readTime}</span>
        </div>
        <h2 style={{
          fontSize: "clamp(1.4rem, 2.5vw, 2rem)", fontWeight: 700,
          color: "#fff", lineHeight: 1.25,
          fontFamily: "Georgia, serif", marginBottom: 16,
          transition: "color 0.2s",
          ...(hovered ? { color: "#F5A623" } : {}),
        }}>
          {item.title}
        </h2>
        <p style={{ fontSize: 15, color: "#9ca3af", lineHeight: 1.75, maxWidth: 560 }}>
          {item.excerpt}
        </p>
      </div>
      <div style={{
        flexShrink: 0, width: 48, height: 48, borderRadius: "50%",
        background: "rgba(245,166,35,0.15)",
        display: "flex", alignItems: "center", justifyContent: "center",
        transition: "background 0.2s",
        ...(hovered ? { background: "#F5A623" } : {}),
      }}>
        <svg width="18" height="18" viewBox="0 0 12 12" fill="none" aria-hidden="true">
          <path d="M2.5 6H9.5M6.5 3L9.5 6L6.5 9"
            stroke={hovered ? "#fff" : "#F5A623"}
            strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}

function NewsCard({ item }: { item: typeof NEWS_ITEMS[0] }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        border: `1px solid ${hovered ? "#d1d5db" : "#e5e7eb"}`,
        borderRadius: 16, padding: "28px 24px",
        background: hovered ? "#fafafa" : "#fff",
        display: "flex", flexDirection: "column", gap: 14,
        transition: "all 0.2s",
        boxShadow: hovered ? "0 4px 20px rgba(0,0,0,0.06)" : "none",
        cursor: "default",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
        <CategoryPill cat={item.category} />
        <span style={{ fontSize: 11, color: "#9ca3af", whiteSpace: "nowrap" }}>{item.readTime}</span>
      </div>
      <h3 style={{
        fontSize: 16, fontWeight: 700, color: "#1a1a1a",
        lineHeight: 1.35, margin: 0, fontFamily: "Georgia, serif",
        transition: "color 0.2s",
        ...(hovered ? { color: "#2D6A4F" } : {}),
      }}>
        {item.title}
      </h3>
      <p style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.65, margin: 0, flexGrow: 1 }}>
        {item.excerpt}
      </p>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "auto", paddingTop: 8 }}>
        <span style={{ fontSize: 12, color: "#9ca3af" }}>{item.date}</span>
        <span style={{
          display: "inline-flex", alignItems: "center", gap: 4,
          fontSize: 12, fontWeight: 600,
          color: hovered ? "#2D6A4F" : "#374151",
          transition: "color 0.2s",
        }}>
          Read
          <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <path d="M2.5 6H9.5M6.5 3L9.5 6L6.5 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function InternalNews() {
  const [activeCategory, setActiveCategory] = useState("All");
  const featuredVideoRef = useRef<HTMLDivElement | null>(null);

  const featured = NEWS_ITEMS.find(n => n.featured);
  const rest = NEWS_ITEMS.filter(n => !n.featured);
  const filtered = activeCategory === "All" ? rest : rest.filter(n => n.category === activeCategory);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        featuredVideoRef.current,
        { backgroundPosition: "50% 0%" },
        {
          backgroundPosition: "50% 100%",
          ease: "none",
          scrollTrigger: {
            trigger: featuredVideoRef.current,
            start: "top 85%",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    }, featuredVideoRef);

    return () => ctx.revert();
  }, []);

  return (
    <div style={{ background: "#fff", minHeight: "100vh" }}>

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section style={{ maxWidth: 1400, margin: "0 auto", padding: "72px 80px 60px" }}>
        <TabIndicator />
        <h1 style={{
          fontSize: "clamp(2.4rem, 5vw, 4rem)", fontWeight: 800,
          color: "#1a1a1a", marginBottom: 24, lineHeight: 1.1,
          fontFamily: "Georgia, serif", letterSpacing: "-0.02em",
        }}>
          Internal News
        </h1>
        <p style={{ fontSize: 15, color: "#374151", lineHeight: 1.8, maxWidth: 640 }}>
          Stay up to date with the latest announcements, milestones, and stories from
          inside Lifewood. From platform launches to community impact, this is where
          it all gets shared.
        </p>
      </section>

      {/* ── News Feed ────────────────────────────────────────────────────── */}
      <section
        ref={featuredVideoRef}
        style={{
          maxWidth: 1400,
          margin: "0 auto",
          padding: "0 80px 72px",
          background: "linear-gradient(180deg, transparent 0%, rgba(15,23,42,0.02) 100%)",
          backgroundSize: "100% 200%",
        }}
      >
        <AnimatedYouTubeEmbed
          videoId="ccyrQ87EJag"
          title="Lifewood internal news video"
          caption={
            <div style={{ padding: "28px 28px 20px" }}>
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", color: "#F5A623", textTransform: "uppercase", marginBottom: 10 }}>
                Featured Update
              </p>
              <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.3rem)", fontWeight: 700, color: "#fff", fontFamily: "Georgia, serif", lineHeight: 1.2, margin: "0 0 10px" }}>
                Internal video highlight
              </h2>
              <p style={{ fontSize: 14, color: "#9ca3af", lineHeight: 1.75, margin: 0, maxWidth: 760 }}>
                This embedded feature mirrors the bold media-led storytelling treatment used on Lifewood&apos;s news reference page.
              </p>
            </div>
          }
        />
      </section>

      <section style={{ maxWidth: 1400, margin: "0 auto", padding: "0 80px 100px" }}>

        {/* Category filter */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 48 }}>
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: "8px 18px", borderRadius: 999, border: "1px solid",
                fontSize: 13, fontWeight: 500, cursor: "pointer", transition: "all 0.15s",
                borderColor: activeCategory === cat ? "#1a1a1a" : "#e5e7eb",
                background: activeCategory === cat ? "#1a1a1a" : "#fff",
                color: activeCategory === cat ? "#fff" : "#374151",
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Cards grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 20,
        }}>
          {/* Featured card (only when showing All) */}
          {activeCategory === "All" && featured && <FeaturedCard item={featured} />}

          {/* Regular cards */}
          {filtered.map(item => <NewsCard key={item.title} item={item} />)}
        </div>
      </section>

      {/* ── Newsletter CTA ───────────────────────────────────────────────── */}
      <section style={{
        background: "#111827",
        maxWidth: "calc(1400px - 160px)",
        margin: "0 auto 80px",
        borderRadius: 20,
        padding: "72px 80px",
        display: "flex", alignItems: "center", justifyContent: "space-between", gap: 40, flexWrap: "wrap",
      }}>
        <div style={{ maxWidth: 560 }}>
          <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.15em", color: "#F5A623", textTransform: "uppercase", marginBottom: 16 }}>
            Stay In The Loop
          </p>
          <h2 style={{
            fontSize: "clamp(1.8rem, 3vw, 2.6rem)", fontWeight: 700,
            color: "#fff", lineHeight: 1.2, fontFamily: "Georgia, serif", marginBottom: 16,
          }}>
            Never miss an update
          </h2>
          <p style={{ fontSize: 15, color: "#9ca3af", lineHeight: 1.75, margin: 0 }}>
            Have questions about something you read? Reach out to our communications
            team directly.
          </p>
        </div>
        <Link href="/contact-us" style={{
          display: "inline-flex", alignItems: "center", gap: 10,
          background: "#F5A623", color: "#fff",
          padding: "14px 28px", borderRadius: 999,
          fontSize: 15, fontWeight: 600, textDecoration: "none",
          flexShrink: 0, transition: "background 0.2s",
        }}
          onMouseEnter={e => (e.currentTarget.style.background = "#e09610")}
          onMouseLeave={e => (e.currentTarget.style.background = "#F5A623")}
        >
          Contact Us
          <svg width="14" height="14" viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <path d="M2.5 6H9.5M6.5 3L9.5 6L6.5 9" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </section>

    </div>
  );
}
