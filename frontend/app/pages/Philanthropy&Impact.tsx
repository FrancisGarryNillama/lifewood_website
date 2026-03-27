"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

import { AnimatedSurface } from "@/app/components/animated/AnimatedPrimitives";

function TabIndicator() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 20 }}>
      <span style={{ width: 20, height: 20, borderRadius: "50%", background: "#1a1a1a", display: "inline-block" }} />
      <span style={{ width: 20, height: 20, borderRadius: "50%", border: "2px solid #9ca3af", display: "inline-block" }} />
      <span style={{ display: "inline-block", width: 120, borderTop: "2px dashed #d1d5db", marginLeft: 4 }} />
    </div>
  );
}

const AFRICA_COUNTRIES = ["South Africa","Nigeria","Republic of the Congo","Democratic Republic of the Congo","Ghana","Madagascar","Benin","Uganda","Kenya","Ivory Coast","Egypt","Ethiopia","Niger","Tanzania","Namibia","Zambia","Zimbabwe","Liberia","Sierra Leone"];

const PILLARS = [
  { num: "01", label: "Partnership", body: "In partnership with our philanthropic partners, Lifewood has expanded operations across 20 African nations and Bangladesh, creating digital livelihoods in communities that need them most." },
  { num: "02", label: "Application", body: "This requires the application of our methods and experience for the development of people in under-resourced economies—bringing our proven AI data workflow expertise directly to local communities." },
  { num: "03", label: "Expanding", body: "We are expanding access to training, establishing equitable wage structures and career and leadership progression to create sustainable change—equipping individuals to grow the business for themselves for the long-term benefit of everyone." },
];

export default function PhilanthropyAndImpact() {
  const impactVisualRef = useRef<HTMLDivElement | null>(null);
  const impactImageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.to(impactImageRef.current, {
        yPercent: -10,
        ease: "none",
        scrollTrigger: {
          trigger: impactVisualRef.current,
          start: "top 85%",
          end: "bottom top",
          scrub: true,
        },
      });
    }, impactVisualRef);

    return () => ctx.revert();
  }, []);

  return (
    <div style={{ background: "#fff", minHeight: "100vh" }}>

      <section style={{ maxWidth: 1400, margin: "0 auto", padding: "72px 80px 60px" }}>
        <TabIndicator />
        <h1 style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)", fontWeight: 800, color: "#1a1a1a", marginBottom: 24, lineHeight: 1.1, fontFamily: "Georgia, serif", letterSpacing: "-0.02em" }}>
          Philanthropy &amp; Impact
        </h1>
        <p style={{ fontSize: 15, color: "#374151", lineHeight: 1.8, maxWidth: 720, marginBottom: 36 }}>
          We direct resources into education and developmental projects that create lasting change.
          Our approach goes beyond giving: it builds sustainable growth and empowers communities for the future.
        </p>
        <Link href="/contact-us" style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "#F5A623", color: "#fff", padding: "12px 24px", borderRadius: 999, fontSize: 14, fontWeight: 600, textDecoration: "none", transition: "background 0.2s" }}
          onMouseEnter={e => (e.currentTarget.style.background = "#e09610")} onMouseLeave={e => (e.currentTarget.style.background = "#F5A623")}>
          Contact Us
          <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 28, height: 28, borderRadius: "50%", background: "#2D6A4F" }}>
            <svg width="13" height="13" viewBox="0 0 12 12" fill="none"><path d="M2.5 6H9.5M6.5 3L9.5 6L6.5 9" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </span>
        </Link>
      </section>

      <section style={{ background: "#f8f9fa", borderTop: "1px solid #e5e7eb", borderBottom: "1px solid #e5e7eb", padding: "56px 0" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 80px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
          <div>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", color: "#F5A623", textTransform: "uppercase" as const, marginBottom: 20 }}>Our Vision</p>
            <p style={{ fontSize: "clamp(1.1rem, 2vw, 1.4rem)", color: "#1a1a1a", lineHeight: 1.7, fontFamily: "Georgia, serif", margin: 0 }}>
              A world where financial investment plays a central role in solving the social and environmental challenges
              facing the global community, specifically in <strong>Africa</strong> and the <strong>Indian sub-continent</strong>.
            </p>
          </div>
          <div style={{ display: "flex", gap: 40, justifyContent: "flex-end" }}>
            {[{ v: "20+", l: "African Countries" }, { v: "56K+", l: "Community Workers" }, { v: "30+", l: "Nations Impacted" }].map(({ v, l }) => (
              <div key={l} style={{ textAlign: "center" }}>
                <div style={{ fontSize: 40, fontWeight: 800, color: "#2D6A4F", fontFamily: "Georgia, serif" }}>{v}</div>
                <div style={{ fontSize: 13, color: "#6b7280", marginTop: 6 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ maxWidth: 1400, margin: "0 auto", padding: "80px 80px 0" }}>
        <motion.div
          ref={impactVisualRef}
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <AnimatedSurface
            style={{
              borderRadius: 28,
              overflow: "hidden",
              border: "1px solid #e5e7eb",
              boxShadow: "0 18px 48px rgba(15, 23, 42, 0.10)",
            }}
          >
            <div ref={impactImageRef}>
              <Image
                src="https://framerusercontent.com/images/7RZ9ESz7UTTmxn6ifh8I9jHlHA.png?width=1004&height=591"
                alt="Lifewood philanthropy and impact initiative"
                width={1004}
                height={591}
                style={{ display: "block", width: "100%", height: "auto" }}
              />
            </div>
          </AnimatedSurface>
        </motion.div>
      </section>

      <section style={{ maxWidth: 1400, margin: "0 auto", padding: "100px 80px 80px" }}>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", color: "#F5A623", textTransform: "uppercase" as const, marginBottom: 16 }}>Be Amazed</p>
          <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 3.2rem)", fontWeight: 700, color: "#1a1a1a", fontFamily: "Georgia, serif", letterSpacing: "-0.02em", margin: 0 }}>
            Transforming Communities Worldwide
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }}>
          <div>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", color: "#F5A623", textTransform: "uppercase" as const, marginBottom: 20 }}>Impact</p>
            <p style={{ fontSize: 15, color: "#374151", lineHeight: 1.8, marginBottom: 40 }}>
              Through purposeful partnerships and sustainable investment, we empower communities across Africa and
              the Indian sub-continent to create lasting economic and social transformation.
            </p>
            {PILLARS.map(({ num, label, body }) => (
              <div key={num} style={{ display: "flex", gap: 20, paddingBottom: 32, borderBottom: "1px solid #e5e7eb", marginBottom: 32 }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: "#F5A623", background: "rgba(245,166,35,0.10)", padding: "4px 10px", borderRadius: 6, letterSpacing: "0.06em", flexShrink: 0, alignSelf: "flex-start", marginTop: 3 }}>{num}</span>
                <div>
                  <h3 style={{ fontSize: 14, fontWeight: 700, color: "#1a1a1a", marginBottom: 8, textTransform: "uppercase" as const, letterSpacing: "0.06em" }}>{label}</h3>
                  <p style={{ fontSize: 14, color: "#6b7280", lineHeight: 1.75, margin: 0 }}>{body}</p>
                </div>
              </div>
            ))}
          </div>
          <div>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", color: "#F5A623", textTransform: "uppercase" as const, marginBottom: 24 }}>Where We Operate</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 32 }}>
              {AFRICA_COUNTRIES.map(c => (
                <span key={c} style={{ fontSize: 12, fontWeight: 500, padding: "6px 12px", borderRadius: 999, background: "#f0faf5", color: "#2D6A4F", border: "1px solid #d1fae5" }}>{c}</span>
              ))}
              <span style={{ fontSize: 12, fontWeight: 500, padding: "6px 12px", borderRadius: 999, background: "#eff6ff", color: "#1d4ed8", border: "1px solid #bfdbfe" }}>Bangladesh</span>
            </div>
            <div style={{ background: "#111827", borderRadius: 20, padding: "32px 28px" }}>
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", color: "#F5A623", textTransform: "uppercase" as const, marginBottom: 16 }}>Working With New Intelligence</p>
              <p style={{ fontSize: 22, fontWeight: 700, color: "#fff", fontFamily: "Georgia, serif", lineHeight: 1.3, margin: "0 0 20px" }}>For a better world.</p>
              <Link href="/our-company/about-us" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 600, color: "#F5A623", textDecoration: "none" }}>
                Know Us Better
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2.5 6H9.5M6.5 3L9.5 6L6.5 9" stroke="#F5A623" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section style={{ background: "#111827", maxWidth: "calc(1400px - 160px)", margin: "0 auto 80px", borderRadius: 20, padding: "72px 80px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 40, flexWrap: "wrap" }}>
        <div style={{ maxWidth: 560 }}>
          <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.15em", color: "#F5A623", textTransform: "uppercase" as const, marginBottom: 16 }}>Partner With Us</p>
          <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)", fontWeight: 700, color: "#fff", lineHeight: 1.2, fontFamily: "Georgia, serif", marginBottom: 16 }}>
            Join us in building a more equitable world
          </h2>
          <p style={{ fontSize: 15, color: "#9ca3af", lineHeight: 1.75, margin: 0 }}>
            If you share our vision of using AI to create opportunity and lasting change, we&rsquo;d love to hear from you.
          </p>
        </div>
        <Link href="/contact-us" style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "#F5A623", color: "#fff", padding: "14px 28px", borderRadius: 999, fontSize: 15, fontWeight: 600, textDecoration: "none", flexShrink: 0 }}
          onMouseEnter={e => (e.currentTarget.style.background = "#e09610")} onMouseLeave={e => (e.currentTarget.style.background = "#F5A623")}>
          Get in Touch <svg width="14" height="14" viewBox="0 0 12 12" fill="none"><path d="M2.5 6H9.5M6.5 3L9.5 6L6.5 9" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </Link>
      </section>

    </div>
  );
}
