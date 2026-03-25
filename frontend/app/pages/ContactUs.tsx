"use client";

import { useState } from "react";

// ── Tab Indicator ─────────────────────────────────────────────────────────────
function TabIndicator() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 20 }}>
      <span style={{ width: 20, height: 20, borderRadius: "50%", background: "#1a1a1a", display: "inline-block" }} />
      <span style={{ width: 20, height: 20, borderRadius: "50%", border: "2px solid #9ca3af", display: "inline-block" }} />
      <span style={{ display: "inline-block", width: 120, borderTop: "2px dashed #d1d5db", marginLeft: 4 }} />
    </div>
  );
}

// ── Input Component ───────────────────────────────────────────────────────────
function Field({
  label, name, type = "text", required = true, placeholder, rows,
}: {
  label: string; name: string; type?: string; required?: boolean; placeholder?: string; rows?: number;
}) {
  const [focused, setFocused] = useState(false);
  const shared = {
    width: "100%",
    border: `1px solid ${focused ? "#2D6A4F" : "#e5e7eb"}`,
    borderRadius: 10,
    fontSize: 14,
    color: "#1a1a1a",
    background: "#fff",
    outline: "none",
    transition: "border-color 0.2s, box-shadow 0.2s",
    boxShadow: focused ? "0 0 0 3px rgba(45,106,79,0.1)" : "none",
    boxSizing: "border-box" as const,
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <label style={{ fontSize: 13, fontWeight: 600, color: "#374151" }}>
        {label} {required && <span style={{ color: "#F5A623" }}>*</span>}
      </label>
      {rows ? (
        <textarea
          name={name}
          required={required}
          placeholder={placeholder}
          rows={rows}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{ ...shared, padding: "12px 16px", resize: "vertical", fontFamily: "inherit", lineHeight: 1.6 }}
        />
      ) : (
        <input
          type={type}
          name={name}
          required={required}
          placeholder={placeholder}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{ ...shared, padding: "12px 16px", height: 48 }}
        />
      )}
    </div>
  );
}

const INQUIRY_TYPES = ["General Inquiry", "AI Data Services", "Partnership", "Careers", "Media & Press", "Other"];

// ── Page ──────────────────────────────────────────────────────────────────────
export default function ContactUs() {
  const [submitted, setSubmitted] = useState(false);
  const [inquiryType, setInquiryType] = useState("General Inquiry");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

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
          Get In Touch
        </h1>
        <p style={{ fontSize: 15, color: "#374151", lineHeight: 1.8, maxWidth: 620 }}>
          Whether you need a custom dataset, annotation pipeline, or an end-to-end AI data
          solution—our team is ready to help. Reach out and we&rsquo;ll respond within one business day.
        </p>
      </section>

      {/* ── Main Grid ────────────────────────────────────────────────────── */}
      <section style={{ maxWidth: 1400, margin: "0 auto", padding: "0 80px 100px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 80, alignItems: "start" }}>

          {/* ── Contact Form ─────────────────────────────────────────────── */}
          {!submitted ? (
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                <Field label="First Name" name="firstName" placeholder="Jane" />
                <Field label="Last Name" name="lastName" placeholder="Smith" />
              </div>
              <Field label="Work Email" name="email" type="email" placeholder="jane@company.com" />
              <Field label="Company / Organisation" name="company" placeholder="Acme Corp" required={false} />
              <Field label="Phone Number" name="phone" type="tel" placeholder="+1 (555) 000-0000" required={false} />

              {/* Inquiry type */}
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <label style={{ fontSize: 13, fontWeight: 600, color: "#374151" }}>
                  Inquiry Type <span style={{ color: "#F5A623" }}>*</span>
                </label>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {INQUIRY_TYPES.map(t => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setInquiryType(t)}
                      style={{
                        padding: "8px 16px", borderRadius: 999, border: "1px solid",
                        fontSize: 13, fontWeight: 500, cursor: "pointer",
                        transition: "all 0.15s",
                        borderColor: inquiryType === t ? "#2D6A4F" : "#e5e7eb",
                        background: inquiryType === t ? "#f0faf5" : "#fff",
                        color: inquiryType === t ? "#2D6A4F" : "#374151",
                      }}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <Field label="Message" name="message" rows={5} placeholder="Tell us about your project or question…" />

              <button
                type="submit"
                style={{
                  display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 10,
                  background: "#F5A623", color: "#fff",
                  padding: "14px 32px", borderRadius: 999,
                  fontSize: 15, fontWeight: 600, border: "none", cursor: "pointer",
                  alignSelf: "flex-start",
                  transition: "background 0.2s",
                }}
                onMouseEnter={e => (e.currentTarget.style.background = "#e09610")}
                onMouseLeave={e => (e.currentTarget.style.background = "#F5A623")}
              >
                Send Message
                <svg width="14" height="14" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <path d="M2.5 6H9.5M6.5 3L9.5 6L6.5 9" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </form>
          ) : (
            /* Success state */
            <div style={{
              display: "flex", flexDirection: "column", alignItems: "flex-start",
              justifyContent: "center", padding: "60px 0",
              gap: 16,
            }}>
              <div style={{
                width: 64, height: 64, borderRadius: "50%", background: "#f0faf5",
                display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 8,
              }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12l5 5L20 7" stroke="#2D6A4F" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h2 style={{ fontSize: 28, fontWeight: 700, color: "#1a1a1a", fontFamily: "Georgia, serif", margin: 0 }}>
                Message sent!
              </h2>
              <p style={{ fontSize: 15, color: "#6b7280", lineHeight: 1.7, maxWidth: 420, margin: 0 }}>
                Thank you for reaching out. A member of our team will get back to you within
                one business day.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                style={{
                  marginTop: 8, padding: "10px 24px", borderRadius: 999,
                  border: "1px solid #e5e7eb", background: "#fff",
                  fontSize: 14, fontWeight: 500, cursor: "pointer",
                  color: "#374151", transition: "border-color 0.2s",
                }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = "#2D6A4F")}
                onMouseLeave={e => (e.currentTarget.style.borderColor = "#e5e7eb")}
              >
                Send another message
              </button>
            </div>
          )}

          {/* ── Right panel: contact info ─────────────────────────────────── */}
          <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
            {/* Quick contact */}
            <div style={{ background: "#f8f9fa", borderRadius: 20, padding: "36px 32px" }}>
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", color: "#F5A623", textTransform: "uppercase", marginBottom: 20 }}>
                Quick Contact
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                {[
                  { label: "Email", value: "info@lifewood.com", icon: "✉" },
                  { label: "HQ – Philippines", value: "Pasig City, Metro Manila", icon: "📍" },
                  { label: "LinkedIn", value: "Lifewood Data Technology Ltd.", icon: "💼" },
                ].map(({ label, value, icon }) => (
                  <div key={label} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                    <span style={{ fontSize: 18, lineHeight: 1.2 }}>{icon}</span>
                    <div>
                      <div style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 2 }}>{label}</div>
                      <div style={{ fontSize: 14, color: "#374151", fontWeight: 500 }}>{value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Response times */}
            <div style={{ background: "#111827", borderRadius: 20, padding: "36px 32px" }}>
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", color: "#F5A623", textTransform: "uppercase", marginBottom: 20 }}>
                What Happens Next
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {[
                  { step: "01", text: "We review your inquiry within 1 business day" },
                  { step: "02", text: "A solutions specialist will reach out to learn more" },
                  { step: "03", text: "We propose a tailored AI data solution for your needs" },
                ].map(({ step, text }) => (
                  <div key={step} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                    <span style={{
                      fontSize: 11, fontWeight: 700, color: "#F5A623",
                      background: "rgba(245,166,35,0.12)", padding: "4px 8px",
                      borderRadius: 6, flexShrink: 0, letterSpacing: "0.05em",
                    }}>
                      {step}
                    </span>
                    <span style={{ fontSize: 14, color: "#9ca3af", lineHeight: 1.6 }}>{text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Social links */}
            <div>
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", color: "#9ca3af", textTransform: "uppercase", marginBottom: 16 }}>
                Find Us On
              </p>
              <div style={{ display: "flex", gap: 10 }}>
                {[
                  { label: "LinkedIn", href: "https://www.linkedin.com/company/lifewood-data-technology-ltd." },
                  { label: "Facebook", href: "https://www.facebook.com/LifewoodPH" },
                  { label: "Instagram", href: "https://www.instagram.com/lifewood_official/" },
                  { label: "YouTube", href: "https://www.youtube.com/@LifewoodDataTechnology" },
                ].map(({ label, href }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer" style={{
                    padding: "8px 14px", borderRadius: 8, border: "1px solid #e5e7eb",
                    fontSize: 12, fontWeight: 600, color: "#374151",
                    textDecoration: "none", transition: "all 0.15s",
                  }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = "#2D6A4F"; e.currentTarget.style.color = "#2D6A4F"; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = "#e5e7eb"; e.currentTarget.style.color = "#374151"; }}
                  >
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}