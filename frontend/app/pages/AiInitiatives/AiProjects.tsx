"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { AnimatedYouTubeEmbed } from "@/app/components/animated/AnimatedPrimitives";

// ── Data ──────────────────────────────────────────────────────────────────────
const PROJECTS = [
  {
    tag: "Data Collection",
    title: "Multi-Language Speech Dataset",
    description:
      "Building large-scale speech corpora across 50+ languages including low-resource languages to power next-generation voice AI models.",
    region: "Global",
    status: "Active",
  },
  {
    tag: "Annotation",
    title: "Autonomous Driving Perception Data",
    description:
      "Annotating LiDAR, radar, and camera data for autonomous vehicle perception systems across diverse road conditions and geographies.",
    region: "Asia Pacific",
    status: "Active",
  },
  {
    tag: "LLM Training",
    title: "Instruction Tuning for Enterprise LLMs",
    description:
      "Generating and curating high-quality instruction-following datasets tailored for domain-specific enterprise language model fine-tuning.",
    region: "North America",
    status: "Active",
  },
  {
    tag: "AIGC",
    title: "Synthetic Image Generation Pipeline",
    description:
      "Developing synthetic training data pipelines for computer vision models, reducing dependence on real-world data collection.",
    region: "Europe",
    status: "Ongoing",
  },
  {
    tag: "Platform",
    title: "LiFT Workforce Management Platform",
    description:
      "Industrializing data annotation workflows through our proprietary platform—enabling quality control, task routing, and delivery at scale.",
    region: "Global",
    status: "Active",
  },
  {
    tag: "Impact",
    title: "Digital Livelihoods in Under-Resourced Economies",
    description:
      "Creating sustainable digital work opportunities in emerging markets, empowering communities with fair-wage AI data jobs.",
    region: "Africa & SEA",
    status: "Ongoing",
  },
];

const STATUS_COLORS: Record<string, { bg: string; text: string }> = {
  Active:   { bg: "#f0faf5", text: "#2D6A4F" },
  Ongoing:  { bg: "#fff7ed", text: "#c2410c" },
};

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

// ── Project Card ──────────────────────────────────────────────────────────────
function ProjectCard({
  tag, title, description, region, status,
}: (typeof PROJECTS)[0]) {
  const [hovered, setHovered] = useState(false);
  const statusStyle = STATUS_COLORS[status] ?? STATUS_COLORS.Active;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "#fafafa" : "#fff",
        border: `1px solid ${hovered ? "#d1d5db" : "#e5e7eb"}`,
        borderRadius: 16,
        padding: "32px 28px",
        display: "flex",
        flexDirection: "column",
        gap: 16,
        transition: "all 0.2s ease",
        boxShadow: hovered ? "0 8px 32px rgba(0,0,0,0.07)" : "none",
        cursor: "default",
      }}
    >
      {/* Tag + Status row */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "#F5A623",
          background: "#fff7ed",
          padding: "4px 10px",
          borderRadius: 999,
        }}>
          {tag}
        </span>
        <span style={{
          fontSize: 11,
          fontWeight: 600,
          color: statusStyle.text,
          background: statusStyle.bg,
          padding: "4px 10px",
          borderRadius: 999,
        }}>
          {status}
        </span>
      </div>

      {/* Title */}
      <h3 style={{
        fontSize: 18,
        fontWeight: 700,
        color: "#1a1a1a",
        lineHeight: 1.3,
        margin: 0,
        fontFamily: "Georgia, serif",
        transition: "color 0.2s",
        ...(hovered ? { color: "#2D6A4F" } : {}),
      }}>
        {title}
      </h3>

      {/* Description */}
      <p style={{ fontSize: 14, color: "#6b7280", lineHeight: 1.7, margin: 0 }}>
        {description}
      </p>

      {/* Region */}
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: "auto", paddingTop: 8 }}>
        <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <circle cx="7" cy="7" r="6" stroke="#9ca3af" strokeWidth="1.2" />
          <path d="M1 7h12M7 1c-2 2-3 4-3 6s1 4 3 6M7 1c2 2 3 4 3 6s-1 4-3 6" stroke="#9ca3af" strokeWidth="1.2" />
        </svg>
        <span style={{ fontSize: 12, color: "#9ca3af", fontWeight: 500 }}>{region}</span>
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function AiProjects() {
  const spotlightRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        spotlightRef.current,
        { backgroundPosition: "0% 0%" },
        {
          backgroundPosition: "0% 100%",
          ease: "none",
          scrollTrigger: {
            trigger: spotlightRef.current,
            start: "top 85%",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    }, spotlightRef);

    return () => ctx.revert();
  }, []);

  return (
    <div style={{ background: "#fff", minHeight: "100vh" }}>

      {/* ── Hero / Intro ─────────────────────────────────────────────────── */}
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
          AI Projects
        </h1>

        <p style={{
          fontSize: 15,
          color: "#374151",
          lineHeight: 1.75,
          maxWidth: 900,
          marginBottom: 36,
        }}>
          From building AI datasets in diverse languages and environments, to developing
          platforms that enhance productivity and open new opportunities in under-resourced
          economies, you&rsquo;ll see how Lifewood is shaping the future with innovation,
          integrity and a focus on people.
        </p>

        {/* CTA */}
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
            display: "inline-flex", alignItems: "center", justifyContent: "center",
            width: 28, height: 28, borderRadius: "50%", background: "#2D6A4F", flexShrink: 0,
          }}>
            <svg width="13" height="13" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path d="M2.5 6H9.5M6.5 3L9.5 6L6.5 9" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </Link>
      </section>

      <section
        ref={spotlightRef}
        style={{
          background: "linear-gradient(180deg, #111827 0%, #0f172a 100%)",
          backgroundSize: "100% 200%",
          padding: "0 0 80px",
        }}
      >
        <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 80px" }}>
          <AnimatedYouTubeEmbed
            videoId="g_JvAVL0WY4"
            title="Lifewood AI projects video"
            caption={
              <div style={{ padding: "28px 28px 20px" }}>
                <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", color: "#F5A623", textTransform: "uppercase", marginBottom: 12 }}>
                  Project Spotlight
                </p>
                <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)", fontWeight: 700, color: "#fff", fontFamily: "Georgia, serif", lineHeight: 1.2, margin: "0 0 10px" }}>
                  See how Lifewood delivers AI data services at scale
                </h2>
                <p style={{ fontSize: 14, color: "#9ca3af", lineHeight: 1.75, margin: 0, maxWidth: 760 }}>
                  This featured video sits ahead of the project grid in the same broad, high-impact format used across Lifewood&apos;s AI service storytelling.
                </p>
              </div>
            }
          />
        </div>
      </section>

      {/* ── Projects Section ─────────────────────────────────────────────── */}
      <section style={{ maxWidth: 1400, margin: "0 auto", padding: "0 80px 100px" }}>

        {/* Section label + heading */}
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <span style={{
            display: "inline-block",
            background: "#1a1a1a",
            color: "#fff",
            fontSize: 13,
            fontWeight: 600,
            padding: "6px 18px",
            borderRadius: 999,
            letterSpacing: "0.04em",
            marginBottom: 20,
          }}>
            Projects
          </span>
          <h2 style={{
            fontSize: "clamp(2rem, 4vw, 3.2rem)",
            fontWeight: 700,
            color: "#1a1a1a",
            lineHeight: 1.15,
            fontFamily: "Georgia, serif",
            letterSpacing: "-0.02em",
            margin: 0,
          }}>
            What we currently handle
          </h2>
        </div>

        {/* Cards grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))",
          gap: 24,
        }}>
          {PROJECTS.map((project) => (
            <ProjectCard key={project.title} {...project} />
          ))}
        </div>
      </section>

      {/* ── CTA Banner ───────────────────────────────────────────────────── */}
      <section style={{
        background: "#111827",
        maxWidth: "calc(1400px - 160px)",
        margin: "0 auto 80px",
        borderRadius: 20,
        padding: "72px 80px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 40,
        flexWrap: "wrap",
      }}>
        <div style={{ maxWidth: 560 }}>
          <p style={{
            fontSize: 12, fontWeight: 700, letterSpacing: "0.15em",
            color: "#F5A623", textTransform: "uppercase", marginBottom: 16,
          }}>
            Work With Us
          </p>
          <h2 style={{
            fontSize: "clamp(1.8rem, 3vw, 2.6rem)",
            fontWeight: 700,
            color: "#fff",
            lineHeight: 1.2,
            fontFamily: "Georgia, serif",
            marginBottom: 16,
          }}>
            Have a project in mind?
          </h2>
          <p style={{ fontSize: 15, color: "#9ca3af", lineHeight: 1.75, margin: 0 }}>
            Whether you need a custom dataset, annotation pipeline, or an end-to-end
            AI data solution, our team is ready to help you scale.
          </p>
        </div>

        <Link
          href="/contact-us"
          style={{
            display: "inline-flex", alignItems: "center", gap: 10,
            background: "#F5A623", color: "#fff",
            padding: "14px 28px", borderRadius: 999,
            fontSize: 15, fontWeight: 600, textDecoration: "none",
            flexShrink: 0, transition: "background 0.2s",
          }}
          onMouseEnter={e => (e.currentTarget.style.background = "#e09610")}
          onMouseLeave={e => (e.currentTarget.style.background = "#F5A623")}
        >
          Get in touch
          <svg width="14" height="14" viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <path d="M2.5 6H9.5M6.5 3L9.5 6L6.5 9" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </section>

    </div>
  );
} 
