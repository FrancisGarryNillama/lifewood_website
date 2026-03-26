"use client";

import { useState } from "react";

import { ensureCsrfToken, getApiBaseUrl } from "@/app/lib/api";

type ContactFormState = {
  firstName: string;
  lastName: string;
  workEmail: string;
  company: string;
  phoneNumber: string;
  inquiryType: string;
  message: string;
};

const API_BASE_URL = getApiBaseUrl();
const INQUIRY_TYPES = ["General Inquiry", "AI Data Services", "Partnership", "Careers", "Media & Press", "Other"];
const REQUIRED_FIELDS: Array<keyof ContactFormState> = ["firstName", "lastName", "workEmail", "inquiryType", "message"];

function TabIndicator() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 20 }}>
      <span style={{ width: 20, height: 20, borderRadius: "50%", background: "#1a1a1a", display: "inline-block" }} />
      <span style={{ width: 20, height: 20, borderRadius: "50%", border: "2px solid #9ca3af", display: "inline-block" }} />
      <span style={{ display: "inline-block", width: 120, borderTop: "2px dashed #d1d5db", marginLeft: 4 }} />
    </div>
  );
}

function Field({
  label,
  name,
  value,
  type = "text",
  required = true,
  placeholder,
  rows,
  error,
  onChange,
}: {
  label: string;
  name: keyof ContactFormState;
  value: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  rows?: number;
  error?: string;
  onChange: (name: keyof ContactFormState, value: string) => void;
}) {
  const [focused, setFocused] = useState(false);
  const borderColor = error ? "#dc2626" : focused ? "#2D6A4F" : "#e5e7eb";

  const shared = {
    width: "100%",
    border: `1px solid ${borderColor}`,
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
          value={value}
          required={required}
          placeholder={placeholder}
          rows={rows}
          onChange={event => onChange(name, event.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{ ...shared, padding: "12px 16px", resize: "vertical", fontFamily: "inherit", lineHeight: 1.6 }}
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          required={required}
          placeholder={placeholder}
          onChange={event => onChange(name, event.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{ ...shared, padding: "12px 16px", height: 48 }}
        />
      )}
      {error ? <span style={{ fontSize: 12, color: "#b91c1c" }}>{error}</span> : null}
    </div>
  );
}

export default function ContactUs() {
  const [form, setForm] = useState<ContactFormState>({
    firstName: "",
    lastName: "",
    workEmail: "",
    company: "",
    phoneNumber: "",
    inquiryType: "General Inquiry",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormState, string>>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [formMessage, setFormMessage] = useState("");

  const setField = (name: keyof ContactFormState, value: string) => {
    setForm(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: undefined }));
  };

  const validateForm = () => {
    const nextErrors: Partial<Record<keyof ContactFormState, string>> = {};

    for (const field of REQUIRED_FIELDS) {
      if (!form[field].trim()) {
        nextErrors[field] = "This field is required.";
      }
    }

    if (form.workEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.workEmail)) {
      nextErrors.workEmail = "Enter a valid work email address.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormMessage("");

    if (!validateForm()) {
      setStatus("error");
      return;
    }

    setStatus("submitting");

    try {
      const csrfToken = await ensureCsrfToken();
      const response = await fetch(`${API_BASE_URL}/api/applicants/submit/`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrfToken,
        },
        body: JSON.stringify(form),
      });

      const data = await response.json().catch(() => null);
      if (!response.ok) {
        throw new Error(data?.detail || data?.message || "Unable to submit your message right now.");
      }

      setStatus("success");
      setFormMessage(data?.message || "Inquiry submitted successfully.");
      setForm({
        firstName: "",
        lastName: "",
        workEmail: "",
        company: "",
        phoneNumber: "",
        inquiryType: "General Inquiry",
        message: "",
      });
      setErrors({});
    } catch (error) {
      setStatus("error");
      setFormMessage(error instanceof Error ? error.message : "Unable to submit your message right now.");
    }
  };

  return (
    <div style={{ background: "#fff", minHeight: "100vh" }}>
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
          solution, our team is ready to help. Reach out and we will respond within one business day.
        </p>
      </section>

      <section style={{ maxWidth: 1400, margin: "0 auto", padding: "0 80px 100px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 80, alignItems: "start" }}>
          {status === "success" ? (
            <div style={{
              display: "flex", flexDirection: "column", alignItems: "flex-start",
              justifyContent: "center", padding: "60px 0", gap: 16,
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
                {formMessage || "Thank you for reaching out. A member of our team will get back to you within one business day."}
              </p>
              <button
                onClick={() => {
                  setStatus("idle");
                  setFormMessage("");
                }}
                style={{
                  marginTop: 8, padding: "10px 24px", borderRadius: 999,
                  border: "1px solid #e5e7eb", background: "#fff",
                  fontSize: 14, fontWeight: 500, cursor: "pointer",
                  color: "#374151", transition: "border-color 0.2s",
                }}
                onMouseEnter={event => (event.currentTarget.style.borderColor = "#2D6A4F")}
                onMouseLeave={event => (event.currentTarget.style.borderColor = "#e5e7eb")}
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                <Field label="First Name" name="firstName" value={form.firstName} placeholder="Jane" onChange={setField} error={errors.firstName} />
                <Field label="Last Name" name="lastName" value={form.lastName} placeholder="Smith" onChange={setField} error={errors.lastName} />
              </div>
              <Field
                label="Work Email"
                name="workEmail"
                value={form.workEmail}
                type="email"
                placeholder="jane@company.com"
                onChange={setField}
                error={errors.workEmail}
              />
              <Field
                label="Company / Organisation"
                name="company"
                value={form.company}
                placeholder="Acme Corp"
                required={false}
                onChange={setField}
                error={errors.company}
              />
              <Field
                label="Phone Number"
                name="phoneNumber"
                value={form.phoneNumber}
                type="tel"
                placeholder="+1 (555) 000-0000"
                required={false}
                onChange={setField}
                error={errors.phoneNumber}
              />

              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <label style={{ fontSize: 13, fontWeight: 600, color: "#374151" }}>
                  Inquiry Type <span style={{ color: "#F5A623" }}>*</span>
                </label>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {INQUIRY_TYPES.map(type => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setField("inquiryType", type)}
                      style={{
                        padding: "8px 16px", borderRadius: 999, border: "1px solid",
                        fontSize: 13, fontWeight: 500, cursor: "pointer",
                        transition: "all 0.15s",
                        borderColor: form.inquiryType === type ? "#2D6A4F" : "#e5e7eb",
                        background: form.inquiryType === type ? "#f0faf5" : "#fff",
                        color: form.inquiryType === type ? "#2D6A4F" : "#374151",
                      }}
                    >
                      {type}
                    </button>
                  ))}
                </div>
                {errors.inquiryType ? <span style={{ fontSize: 12, color: "#b91c1c" }}>{errors.inquiryType}</span> : null}
              </div>

              <Field
                label="Message"
                name="message"
                value={form.message}
                rows={5}
                placeholder="Tell us about your project or question..."
                onChange={setField}
                error={errors.message}
              />

              {formMessage && status === "error" ? (
                <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 10, padding: "12px 14px", fontSize: 13, color: "#b91c1c" }}>
                  {formMessage}
                </div>
              ) : null}

              <button
                type="submit"
                disabled={status === "submitting"}
                style={{
                  display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 10,
                  background: status === "submitting" ? "#9ca3af" : "#F5A623", color: "#fff",
                  padding: "14px 32px", borderRadius: 999,
                  fontSize: 15, fontWeight: 600, border: "none", cursor: status === "submitting" ? "not-allowed" : "pointer",
                  alignSelf: "flex-start",
                  transition: "background 0.2s",
                }}
                onMouseEnter={event => {
                  if (status !== "submitting") event.currentTarget.style.background = "#e09610";
                }}
                onMouseLeave={event => {
                  if (status !== "submitting") event.currentTarget.style.background = "#F5A623";
                }}
              >
                {status === "submitting" ? "Sending..." : "Send Message"}
                {status !== "submitting" ? (
                  <svg width="14" height="14" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                    <path d="M2.5 6H9.5M6.5 3L9.5 6L6.5 9" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : null}
              </button>
            </form>
          )}

          <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
            <div style={{ background: "#f8f9fa", borderRadius: 20, padding: "36px 32px" }}>
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", color: "#F5A623", textTransform: "uppercase", marginBottom: 20 }}>
                Quick Contact
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                {[
                  { label: "Email", value: "info@lifewood.com", icon: "Email" },
                  { label: "HQ - Philippines", value: "Pasig City, Metro Manila", icon: "Location" },
                  { label: "LinkedIn", value: "Lifewood Data Technology Ltd.", icon: "Social" },
                ].map(({ label, value, icon }) => (
                  <div key={label} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                    <span style={{ fontSize: 12, fontWeight: 700, lineHeight: 1.2, color: "#F5A623", minWidth: 54 }}>{icon}</span>
                    <div>
                      <div style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 2 }}>{label}</div>
                      <div style={{ fontSize: 14, color: "#374151", fontWeight: 500 }}>{value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

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
                    onMouseEnter={event => { event.currentTarget.style.borderColor = "#2D6A4F"; event.currentTarget.style.color = "#2D6A4F"; }}
                    onMouseLeave={event => { event.currentTarget.style.borderColor = "#e5e7eb"; event.currentTarget.style.color = "#374151"; }}
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
