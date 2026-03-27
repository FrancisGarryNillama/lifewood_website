"use client";

import { useState } from "react";
import Link from "next/link";

// Ã¢"â‚¬Ã¢"â‚¬ Data Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬
const REGIONS = ["All", "Asia Pacific", "Africa", "Europe", "Americas"];

const OFFICES = [
  // Asia Pacific
  { city: "Pasig City", country: "Philippines", region: "Asia Pacific", role: "Headquarters", size: "Large" },
  { city: "Cebu City", country: "Philippines", region: "Asia Pacific", role: "Delivery Center", size: "Medium" },
  { city: "Manila", country: "Philippines", region: "Asia Pacific", role: "Delivery Center", size: "Medium" },
  { city: "Shenzhen", country: "China", region: "Asia Pacific", role: "Regional Office", size: "Large" },
  { city: "Beijing", country: "China", region: "Asia Pacific", role: "Delivery Center", size: "Large" },
  { city: "Shanghai", country: "China", region: "Asia Pacific", role: "Delivery Center", size: "Medium" },
  { city: "Ho Chi Minh City", country: "Vietnam", region: "Asia Pacific", role: "Delivery Center", size: "Medium" },
  { city: "Kuala Lumpur", country: "Malaysia", region: "Asia Pacific", role: "Delivery Center", size: "Small" },
  { city: "Jakarta", country: "Indonesia", region: "Asia Pacific", role: "Delivery Center", size: "Medium" },
  { city: "Bangalore", country: "India", region: "Asia Pacific", role: "Delivery Center", size: "Medium" },
  // Africa
  { city: "Nairobi", country: "Kenya", region: "Africa", role: "Regional Hub", size: "Large" },
  { city: "Lagos", country: "Nigeria", region: "Africa", role: "Delivery Center", size: "Medium" },
  { city: "Accra", country: "Ghana", region: "Africa", role: "Delivery Center", size: "Small" },
  { city: "Kigali", country: "Rwanda", region: "Africa", role: "Delivery Center", size: "Small" },
  { city: "Kampala", country: "Uganda", region: "Africa", role: "Delivery Center", size: "Small" },
  { city: "Dar es Salaam", country: "Tanzania", region: "Africa", role: "Delivery Center", size: "Small" },
  // Europe
  { city: "London", country: "United Kingdom", region: "Europe", role: "Regional Office", size: "Medium" },
  { city: "Amsterdam", country: "Netherlands", region: "Europe", role: "Delivery Center", size: "Small" },
  { city: "Warsaw", country: "Poland", region: "Europe", role: "Delivery Center", size: "Medium" },
  // Americas
  { city: "New York", country: "United States", region: "Americas", role: "Regional Office", size: "Medium" },
  { city: "SÃƒÂ£o Paulo", country: "Brazil", region: "Americas", role: "Delivery Center", size: "Medium" },
  { city: "Mexico City", country: "Mexico", region: "Americas", role: "Delivery Center", size: "Small" },
];

const SIZE_COLORS = {
  Large: { bg: "rgba(4,98,65,0.08)", text: "#046241" },
  Medium: { bg: "rgba(255,179,71,0.2)", text: "#133020" },
  Small: { bg: "#F9F7F7", text: "#133020" },
};

// Ã¢"â‚¬Ã¢"â‚¬ Sub-Components Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬
function TabIndicator() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 20 }}>
      <span style={{ width: 20, height: 20, borderRadius: "50%", background: "#133020", display: "inline-block" }} />
      <span style={{ width: 20, height: 20, borderRadius: "50%", border: "2px solid #6E7D71", display: "inline-block" }} />
      <span style={{ display: "inline-block", width: 120, borderTop: "2px dashed rgba(19,48,32,0.2)", marginLeft: 4 }} />
    </div>
  );
}

function OfficeCard({ city, country, region, role, size }: typeof OFFICES[0]) {
  const [hovered, setHovered] = useState(false);
  const sizeStyle = SIZE_COLORS[size as keyof typeof SIZE_COLORS];
  const isHQ = role === "Headquarters";

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        border: `1px solid ${isHQ ? "#046241" : hovered ? "rgba(19,48,32,0.2)" : "rgba(19,48,32,0.16)"}`,
        borderRadius: 14, padding: "24px 22px",
        background: isHQ ? "rgba(4,98,65,0.08)" : hovered ? "#F9F7F7" : "#fff",
        transition: "all 0.2s",
        boxShadow: hovered ? "0 4px 16px rgba(0,0,0,0.06)" : "none",
        position: "relative" as const,
      }}
    >
      {isHQ && (
        <span style={{
          position: "absolute", top: -10, left: 16,
          background: "#046241", color: "#fff",
          fontSize: 10, fontWeight: 700, padding: "3px 10px",
          borderRadius: 999, letterSpacing: "0.08em",
        }}>
          HEADQUARTERS
        </span>
      )}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
        <div>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: "#133020", margin: "0 0 2px", fontFamily: "Arial, sans-serif" }}>{city}</h3>
          <p style={{ fontSize: 13, color: "#5B6A5E", margin: 0 }}>{country}</p>
        </div>
        <span style={{
          fontSize: 10, fontWeight: 700, padding: "3px 9px", borderRadius: 999,
          background: sizeStyle.bg, color: sizeStyle.text,
          letterSpacing: "0.06em", textTransform: "uppercase" as const,
        }}>
          {size}
        </span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
          <circle cx="7" cy="7" r="6" stroke="#6E7D71" strokeWidth="1.2" />
          <path d="M1 7h12M7 1c-2 2-3 4-3 6s1 4 3 6M7 1c2 2 3 4 3 6s-1 4-3 6" stroke="#6E7D71" strokeWidth="1.2" />
        </svg>
        <span style={{ fontSize: 12, color: "#6E7D71", fontWeight: 500 }}>{role}</span>
      </div>
    </div>
  );
}

// Ã¢"â‚¬Ã¢"â‚¬ Page Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬
export default function Offices() {
  const [activeRegion, setActiveRegion] = useState("All");

  const filtered = activeRegion === "All" ? OFFICES : OFFICES.filter(o => o.region === activeRegion);

  const regionCounts = REGIONS.reduce((acc, r) => {
    acc[r] = r === "All" ? OFFICES.length : OFFICES.filter(o => o.region === r).length;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div style={{ background: "#fff", minHeight: "100vh" }}>

      {/* Ã¢"â‚¬Ã¢"â‚¬ Hero Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬ */}
      <section style={{ maxWidth: 1400, margin: "0 auto", padding: "72px 80px 60px" }}>
        <TabIndicator />
        <h1 style={{
          fontSize: "clamp(2.4rem, 5vw, 4rem)", fontWeight: 800,
          color: "#133020", marginBottom: 24, lineHeight: 1.1,
          fontFamily: "Arial, sans-serif", letterSpacing: "-0.02em",
        }}>
          Our Global Offices
        </h1>
        <p style={{ fontSize: 15, color: "#133020", lineHeight: 1.8, maxWidth: 700, marginBottom: 36 }}>
          Lifewood&rsquo;s global footprint spans <strong>30+ countries</strong> and <strong>40+ delivery centers</strong>,
          including extensive operations in Africa, Asia, Europe, and the AmericasÃ¢â‚¬"enabling
          region-specific datasets that reflect cultural and linguistic diversity.
        </p>
        <Link href="/contact-us" style={{
          display: "inline-flex", alignItems: "center", gap: 10,
          background: "#FFC370", color: "#fff",
          padding: "12px 24px", borderRadius: 999,
          fontSize: 14, fontWeight: 600, textDecoration: "none", transition: "background 0.2s",
        }}
          onMouseEnter={e => (e.currentTarget.style.background = "#FFB347")}
          onMouseLeave={e => (e.currentTarget.style.background = "#FFC370")}
        >
          Contact Us
          <span style={{
            display: "inline-flex", alignItems: "center", justifyContent: "center",
            width: 28, height: 28, borderRadius: "50%", background: "#046241",
          }}>
            <svg width="13" height="13" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path d="M2.5 6H9.5M6.5 3L9.5 6L6.5 9" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </Link>
      </section>

      {/* Ã¢"â‚¬Ã¢"â‚¬ Region Stats Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬ */}
      <section style={{ background: "#046241", padding: "56px 0" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 80px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 2 }}>
            {[
              { value: "40+", label: "Global Delivery Centers" },
              { value: "30+", label: "Countries" },
              { value: "4", label: "Continents" },
              { value: "56K+", label: "Online Resources" },
            ].map(({ value, label }, i) => (
              <div key={label} style={{
                padding: "32px 24px", textAlign: "center",
                borderRight: i < 3 ? "1px solid rgba(255,255,255,0.08)" : "none",
              }}>
                <div style={{ fontSize: 40, fontWeight: 800, color: "#FFC370", fontFamily: "Arial, sans-serif", marginBottom: 6 }}>{value}</div>
                <div style={{ fontSize: 13, color: "#6E7D71" }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ã¢"â‚¬Ã¢"â‚¬ Office Directory Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬ */}
      <section style={{ maxWidth: 1400, margin: "0 auto", padding: "80px 80px 100px" }}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 40, flexWrap: "wrap", gap: 24 }}>
          <div>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", color: "#FFC370", textTransform: "uppercase", marginBottom: 12 }}>
              Office Directory
            </p>
            <h2 style={{
              fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", fontWeight: 700,
              color: "#133020", fontFamily: "Arial, sans-serif", letterSpacing: "-0.02em", margin: 0,
            }}>
              Find us near you
            </h2>
          </div>
          <span style={{ fontSize: 14, color: "#5B6A5E" }}>{filtered.length} location{filtered.length !== 1 ? "s" : ""}</span>
        </div>

        {/* Region filter */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 40 }}>
          {REGIONS.map(r => (
            <button
              key={r}
              onClick={() => setActiveRegion(r)}
              style={{
                padding: "8px 18px", borderRadius: 999, border: "1px solid",
                fontSize: 13, fontWeight: 500, cursor: "pointer", transition: "all 0.15s",
                borderColor: activeRegion === r ? "#133020" : "rgba(19,48,32,0.16)",
                background: activeRegion === r ? "#133020" : "#fff",
                color: activeRegion === r ? "#fff" : "#133020",
              }}
            >
              {r} <span style={{ opacity: 0.6 }}>({regionCounts[r]})</span>
            </button>
          ))}
        </div>

        {/* Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 16 }}>
          {filtered.map(office => <OfficeCard key={`${office.city}-${office.country}`} {...office} />)}
        </div>
      </section>

      {/* Ã¢"â‚¬Ã¢"â‚¬ CTA Banner Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬Ã¢"â‚¬ */}
      <section style={{
        background: "#046241",
        maxWidth: "calc(1400px - 160px)",
        margin: "0 auto 80px",
        borderRadius: 20,
        padding: "72px 80px",
        display: "flex", alignItems: "center", justifyContent: "space-between", gap: 40, flexWrap: "wrap",
      }}>
        <div style={{ maxWidth: 560 }}>
          <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.15em", color: "#FFC370", textTransform: "uppercase", marginBottom: 16 }}>
            Global Coverage
          </p>
          <h2 style={{
            fontSize: "clamp(1.8rem, 3vw, 2.6rem)", fontWeight: 700,
            color: "#fff", lineHeight: 1.2, fontFamily: "Arial, sans-serif", marginBottom: 16,
          }}>
            Local expertise, global scale
          </h2>
          <p style={{ fontSize: 15, color: "#6E7D71", lineHeight: 1.75, margin: 0 }}>
            Our delivery centers are embedded in the communities they serveÃ¢â‚¬"enabling
            culturally-aware, linguistically-precise datasets no remote team can match.
          </p>
        </div>
        <Link href="/contact-us" style={{
          display: "inline-flex", alignItems: "center", gap: 10,
          background: "#FFC370", color: "#fff",
          padding: "14px 28px", borderRadius: 999,
          fontSize: 15, fontWeight: 600, textDecoration: "none",
          flexShrink: 0, transition: "background 0.2s",
        }}
          onMouseEnter={e => (e.currentTarget.style.background = "#FFB347")}
          onMouseLeave={e => (e.currentTarget.style.background = "#FFC370")}
        >
          Get in Touch
          <svg width="14" height="14" viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <path d="M2.5 6H9.5M6.5 3L9.5 6L6.5 9" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </section>

    </div>
  );
}