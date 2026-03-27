"use client";

import Link from "next/link";
import LifewoodLogo from "./LifewoodLogo";

function SocialLink({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: 36,
        height: 36,
        borderRadius: "50%",
        border: "1px solid rgba(255,255,255,0.18)",
        color: "rgba(255,255,255,0.78)",
        textDecoration: "none",
        transition: "all 0.2s",
      }}
      onMouseEnter={(event) => {
        event.currentTarget.style.background = "#FFC370";
        event.currentTarget.style.color = "#133020";
        event.currentTarget.style.borderColor = "#FFC370";
      }}
      onMouseLeave={(event) => {
        event.currentTarget.style.background = "transparent";
        event.currentTarget.style.color = "rgba(255,255,255,0.78)";
        event.currentTarget.style.borderColor = "rgba(255,255,255,0.18)";
      }}
    >
      {children}
    </a>
  );
}

export default function Footer() {
  return (
    <footer style={{ background: "#046241", color: "#ffffff" }}>
      <div
        style={{
          maxWidth: 1400,
          margin: "0 auto",
          padding: "72px 80px 56px",
          display: "grid",
          gridTemplateColumns: "1.4fr 1fr 1fr 1fr",
          gap: 48,
          alignItems: "start",
        }}
      >
        <div>
          <LifewoodLogo width={200} withBadge padding="10px 16px" />
          <p
            style={{
              fontSize: 14,
              color: "rgba(255,255,255,0.72)",
              lineHeight: 1.75,
              marginTop: 20,
              marginBottom: 28,
              maxWidth: 280,
            }}
          >
            We provide global Data Engineering Services to enable AI solutions.
          </p>
          <Link
            href="/contact-us"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "#FFC370",
              color: "#133020",
              padding: "10px 20px",
              borderRadius: 999,
              fontSize: 13,
              fontWeight: 700,
              textDecoration: "none",
              transition: "background 0.2s",
            }}
            onMouseEnter={(event) => (event.currentTarget.style.background = "#FFB347")}
            onMouseLeave={(event) => (event.currentTarget.style.background = "#FFC370")}
          >
            Contact Us
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path d="M2.5 6H9.5M6.5 3L9.5 6L6.5 9" stroke="#133020" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>

        <div>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", color: "rgba(255,255,255,0.68)", textTransform: "uppercase", marginBottom: 16 }}>
            AI Initiatives
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              { label: "AI Projects", href: "/ai-initiatives/ai-projects" },
              { label: "AI Services", href: "/ai-initiatives/ai-services" },
            ].map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                style={{ fontSize: 14, color: "rgba(255,255,255,0.82)", textDecoration: "none", transition: "color 0.15s" }}
                onMouseEnter={(event) => (event.currentTarget.style.color = "#FFC370")}
                onMouseLeave={(event) => (event.currentTarget.style.color = "rgba(255,255,255,0.82)")}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", color: "rgba(255,255,255,0.68)", textTransform: "uppercase", marginBottom: 16 }}>
            Our Company
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              { label: "About Us", href: "/our-company/about-us" },
              { label: "Offices", href: "/our-company/offices" },
              { label: "Careers", href: "/careers" },
              { label: "Internal News", href: "/internal-news" },
            ].map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                style={{ fontSize: 14, color: "rgba(255,255,255,0.82)", textDecoration: "none", transition: "color 0.15s" }}
                onMouseEnter={(event) => (event.currentTarget.style.color = "#FFC370")}
                onMouseLeave={(event) => (event.currentTarget.style.color = "rgba(255,255,255,0.82)")}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", color: "rgba(255,255,255,0.68)", textTransform: "uppercase", marginBottom: 16 }}>
            What We Offer
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              { label: "Type A - Data Servicing", href: "/what-we-offer/type-a-data-servicing" },
              { label: "Type B - Horizontal LLM Data", href: "/what-we-offer/type-b-horizontal-llm-data" },
              { label: "Type C - Vertical LLM Data", href: "/what-we-offer/type-c-vertical-llm-data" },
              { label: "Type D - AIGC", href: "/what-we-offer/type-d-aigc" },
            ].map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                style={{ fontSize: 14, color: "rgba(255,255,255,0.82)", textDecoration: "none", transition: "color 0.15s" }}
                onMouseEnter={(event) => (event.currentTarget.style.color = "#FFC370")}
                onMouseLeave={(event) => (event.currentTarget.style.color = "rgba(255,255,255,0.82)")}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div style={{ borderTop: "1px solid rgba(255,255,255,0.14)", maxWidth: 1400, margin: "0 auto" }} />

      <div
        style={{
          maxWidth: 1400,
          margin: "0 auto",
          padding: "24px 80px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 16,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 24, flexWrap: "wrap" }}>
          <span style={{ fontSize: 13, color: "rgba(255,255,255,0.68)" }}>(c) 2026 Lifewood - All Rights Reserved</span>
          {[
            { label: "Privacy Policy", href: "/privacy-policy" },
            { label: "Cookie Policy", href: "/cookie-policy" },
            { label: "Terms and Conditions", href: "/terms-conditions" },
          ].map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              style={{ fontSize: 13, color: "rgba(255,255,255,0.78)", textDecoration: "none", transition: "color 0.15s" }}
              onMouseEnter={(event) => (event.currentTarget.style.color = "#FFC370")}
              onMouseLeave={(event) => (event.currentTarget.style.color = "rgba(255,255,255,0.78)")}
            >
              {label}
            </Link>
          ))}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <span style={{ fontSize: 12, color: "rgba(255,255,255,0.68)", marginRight: 8 }}>Find Us On:</span>

          <SocialLink href="https://www.linkedin.com/company/lifewood-data-technology-ltd." label="LinkedIn">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
              <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
              <circle cx="4" cy="4" r="2" />
            </svg>
          </SocialLink>

          <SocialLink href="https://www.facebook.com/LifewoodPH" label="Facebook">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
            </svg>
          </SocialLink>

          <SocialLink href="https://www.instagram.com/lifewood_official/" label="Instagram">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
            </svg>
          </SocialLink>

          <SocialLink href="https://www.youtube.com/@LifewoodDataTechnology" label="YouTube">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 00-1.95 1.96A29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58z" />
              <polygon points="9.75,15.02 15.5,12 9.75,8.98 9.75,15.02" fill="#046241" />
            </svg>
          </SocialLink>
        </div>
      </div>
    </footer>
  );
}
