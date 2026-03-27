"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { ensureCsrfToken, getApiBaseUrl } from "@/app/lib/api";
import { AnimatedImageCard } from "@/app/components/animated/AnimatedPrimitives";

const API_BASE_URL = getApiBaseUrl();

const DEPARTMENTS = ["All", "Engineering", "Data & AI", "Operations", "Business Development", "People & Culture"];

const OPENINGS = [
  { title: "Senior Data Annotation Specialist", department: "Data & AI", location: "Manila, Philippines", type: "Full-time", description: "Lead annotation quality standards across multi-language datasets. Work alongside our AI research team to build world-class training data." },
  { title: "ML Platform Engineer", department: "Engineering", location: "Remote - APAC", type: "Full-time", description: "Build and scale the LiFT platform infrastructure that powers 10M+ AI data tasks daily across our global delivery centers." },
  { title: "AI Workforce Operations Manager", department: "Operations", location: "Nairobi, Kenya", type: "Full-time", description: "Manage day-to-day operations of our Africa data workforce. Drive quality, throughput, and team growth in one of our fastest-scaling regions." },
  { title: "Business Development Manager - EMEA", department: "Business Development", location: "London, UK", type: "Full-time", description: "Grow Lifewood's client portfolio across European and Middle Eastern markets. Own the full sales cycle from prospecting to close." },
  { title: "NLP Data Curator", department: "Data & AI", location: "Remote - Global", type: "Contract", description: "Curate high-quality instruction-tuning datasets for enterprise LLM fine-tuning projects. Experience in linguistics or computational language a plus." },
  { title: "People & Culture Partner", department: "People & Culture", location: "Pasig City, Philippines", type: "Full-time", description: "Champion Lifewood's culture of Diversity, Caring, Innovation, and Integrity across our Philippine offices. Partner with managers on talent strategy." },
  { title: "Computer Vision Data Engineer", department: "Engineering", location: "Shenzhen, China", type: "Full-time", description: "Design annotation pipelines for LiDAR, radar, and camera data used in autonomous driving perception systems." },
  { title: "Project Manager - AI Data Delivery", department: "Operations", location: "Remote - Americas", type: "Full-time", description: "Own end-to-end delivery of AI data projects for North and South American enterprise clients. Coordinate across annotation, QA, and engineering teams." },
];

const PERKS = [
  { icon: "GL", title: "Work Globally", body: "Join a team spanning 30+ countries. Collaborate with colleagues across Africa, Asia, Europe, and the Americas every day." },
  { icon: "GF", title: "Grow Fast", body: "Lifewood is scaling rapidly. Your contributions have direct impact, and your career can grow as fast as the company does." },
  { icon: "MD", title: "Mission-Driven", body: "We create sustainable digital livelihoods in under-resourced economies. Your work matters beyond the bottom line." },
  { icon: "AI", title: "Cutting-Edge Work", body: "Work on the frontier of AI, building the datasets that power tomorrow's most important language and vision models." },
  { icon: "PF", title: "People-First Culture", body: "Diversity, Caring, Innovation, and Integrity: these are not just words. They shape how we hire, lead, and support each other." },
  { icon: "FB", title: "Flexible & Balanced", body: "Many roles are remote-first. We trust our people to do great work from wherever they do it best." },
];

// ï¿½"ï¿½ï¿½"ï¿½ Apply Modal ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½
function ApplyModal({
  position,
  department,
  onClose,
}: {
  position: string;
  department: string;
  onClose: () => void;
}) {
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", phone: "", coverLetter: "" });
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(prev => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");

    if (!cvFile) {
      setStatus("error");
      setErrorMsg("Attach CV is required.");
      return;
    }

    try {
      const csrfToken = await ensureCsrfToken();
      const formData = new FormData();
      Object.entries({ ...form, position, department }).forEach(([key, value]) => {
        formData.append(key, value);
      });
      formData.append("cv", cvFile);

      const res = await fetch(`${API_BASE_URL}/api/applicants/submit/`, {
        method: "POST",
        headers: {
          "X-CSRFToken": csrfToken,
        },
        credentials: "include",
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || "Submission failed.");
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
    }
  };

  const inputStyle = (focused: boolean) => ({
    width: "100%",
    border: `1px solid ${focused ? "#046241" : "rgba(19,48,32,0.24)"}`,
    borderRadius: 10,
    padding: "11px 14px",
    fontSize: 14,
    color: "#133020",
    background: "#F9F7F7",
    outline: "none",
    boxSizing: "border-box" as const,
  });

  const [focused, setFocused] = useState<Record<string, boolean>>({});
  const focus   = (f: string) => () => setFocused(p => ({ ...p, [f]: true }));
  const unfocus = (f: string) => () => setFocused(p => ({ ...p, [f]: false }));

  return (
    <div
      onClick={onClose}
      style={{ position: "fixed", inset: 0, zIndex: 300, background: "rgba(17,24,39,0.55)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{ width: "100%", maxWidth: 520, background: "#fff", borderRadius: 20, padding: 32, boxShadow: "0 24px 80px rgba(0,0,0,0.22)", maxHeight: "90vh", overflowY: "auto" }}
      >
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
          <div>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", color: "#FFC370", textTransform: "uppercase", display: "block", marginBottom: 6 }}>
              Apply Now
            </span>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: "#133020", fontFamily: "Arial, sans-serif", margin: 0, lineHeight: 1.2 }}>
              {position}
            </h2>
            <span style={{ fontSize: 13, color: "#5B6A5E" }}>{department}</span>
          </div>
          <button onClick={onClose} style={{ background: "none", border: "1px solid rgba(19,48,32,0.16)", borderRadius: "50%", width: 32, height: 32, cursor: "pointer", fontSize: 18, color: "#5B6A5E", flexShrink: 0 }}>x</button>
        </div>

        {status === "success" ? (
          <div style={{ textAlign: "center", padding: "32px 0" }}>
            <div style={{ width: 56, height: 56, borderRadius: "50%", background: "rgba(4,98,65,0.08)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M5 12l5 5L20 7" stroke="#046241" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </div>
            <h3 style={{ fontSize: 20, fontWeight: 700, color: "#133020", fontFamily: "Arial, sans-serif", marginBottom: 10 }}>Application Submitted!</h3>
            <p style={{ fontSize: 14, color: "#5B6A5E", lineHeight: 1.7, marginBottom: 24 }}>
              Thanks for applying for <strong>{position}</strong>. We&apos;ll be in touch soon.
            </p>
            <button onClick={onClose} style={{ padding: "10px 24px", borderRadius: 999, border: "1px solid rgba(19,48,32,0.16)", background: "#fff", fontSize: 14, fontWeight: 500, cursor: "pointer", color: "#133020" }}>
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              {[["firstName", "First Name"], ["lastName", "Last Name"]].map(([field, label]) => (
                <div key={field}>
                  <label style={{ fontSize: 13, fontWeight: 600, color: "#133020", display: "block", marginBottom: 6 }}>
                    {label} <span style={{ color: "#FFC370" }}>*</span>
                  </label>
                  <input
                    required
                    value={form[field as keyof typeof form]}
                    onChange={set(field)}
                    onFocus={focus(field)}
                    onBlur={unfocus(field)}
                    style={inputStyle(!!focused[field])}
                  />
                </div>
              ))}
            </div>

            {[
              { field: "email", label: "Email Address", type: "email", required: true },
              { field: "phone", label: "Phone Number", type: "tel", required: false },
            ].map(({ field, label, type, required }) => (
              <div key={field}>
                <label style={{ fontSize: 13, fontWeight: 600, color: "#133020", display: "block", marginBottom: 6 }}>
                  {label} {required && <span style={{ color: "#FFC370" }}>*</span>}
                </label>
                <input
                  type={type}
                  required={required}
                  value={form[field as keyof typeof form]}
                  onChange={set(field)}
                  onFocus={focus(field)}
                  onBlur={unfocus(field)}
                  style={inputStyle(!!focused[field])}
                />
              </div>
            ))}

            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: "#133020", display: "block", marginBottom: 6 }}>Cover Letter</label>
              <textarea
                rows={4}
                value={form.coverLetter}
                onChange={set("coverLetter")}
                onFocus={focus("coverLetter")}
                onBlur={unfocus("coverLetter")}
                placeholder="Tell us why you're a great fit..."
                style={{ ...inputStyle(!!focused["coverLetter"]), resize: "vertical", fontFamily: "inherit", lineHeight: 1.6 }}
              />
            </div>

            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: "#133020", display: "block", marginBottom: 6 }}>
                Attach CV <span style={{ color: "#FFC370" }}>*</span>
              </label>
              <input
                type="file"
                accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                onChange={event => setCvFile(event.target.files?.[0] ?? null)}
                style={{ ...inputStyle(false), padding: "9px 14px" }}
              />
              <p style={{ fontSize: 12, color: "#5B6A5E", margin: "8px 0 0" }}>
                Accepted formats: PDF, DOC, DOCX. Max file size 5 MB.
              </p>
            </div>

            {status === "error" && (
              <div style={{ background: "rgba(19,48,32,0.1)", border: "1px solid rgba(19,48,32,0.2)", borderRadius: 10, padding: "10px 14px", fontSize: 13, color: "#133020" }}>
                {errorMsg}
              </div>
            )}

            <button
              type="submit"
              disabled={status === "submitting"}
              style={{
                background: status === "submitting" ? "#6E7D71" : "#FFC370",
                color: "#133020", border: "none", borderRadius: 999,
                padding: "13px 28px", fontSize: 14, fontWeight: 600,
                cursor: status === "submitting" ? "not-allowed" : "pointer",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                transition: "background 0.2s",
              }}
            >
              {status === "submitting" ? "Submitting..." : "Submit Application"}
              {status !== "submitting" && (
                <svg width="13" height="13" viewBox="0 0 12 12" fill="none"><path d="M2.5 6H9.5M6.5 3L9.5 6L6.5 9" stroke="#133020" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

// ï¿½"ï¿½ï¿½"ï¿½ Sub-Components ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½
function TabIndicator() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 20 }}>
      <span style={{ width: 20, height: 20, borderRadius: "50%", background: "#133020", display: "inline-block" }} />
      <span style={{ width: 20, height: 20, borderRadius: "50%", border: "2px solid #6E7D71", display: "inline-block" }} />
      <span style={{ display: "inline-block", width: 120, borderTop: "2px dashed rgba(19,48,32,0.2)", marginLeft: 4 }} />
    </div>
  );
}

function JobCard({ title, department, location, type, description, onApply }: typeof OPENINGS[0] & { onApply: () => void }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        border: `1px solid ${hovered ? "#046241" : "rgba(19,48,32,0.16)"}`,
        borderRadius: 16, padding: "28px 28px 24px",
        background: hovered ? "rgba(4,98,65,0.08)" : "#fff",
        transition: "all 0.2s", cursor: "default",
        boxShadow: hovered ? "0 4px 24px rgba(45,106,79,0.08)" : "none",
        display: "flex", flexDirection: "column", gap: 0,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12, gap: 12 }}>
        <h3 style={{ fontSize: 17, fontWeight: 700, color: "#133020", lineHeight: 1.3, fontFamily: "Arial, sans-serif", margin: 0 }}>{title}</h3>
        <span style={{ fontSize: 11, fontWeight: 600, padding: "4px 10px", borderRadius: 999, flexShrink: 0, background: type === "Full-time" ? "rgba(4,98,65,0.08)" : "rgba(255,179,71,0.2)", color: type === "Full-time" ? "#046241" : "#133020" }}>{type}</span>
      </div>

      <div style={{ display: "flex", gap: 16, marginBottom: 14, flexWrap: "wrap" }}>
        <span style={{ fontSize: 12, color: "#5B6A5E", display: "flex", alignItems: "center", gap: 4 }}>
          <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="6" stroke="#6E7D71" strokeWidth="1.2" /><path d="M1 7h12M7 1c-2 2-3 4-3 6s1 4 3 6M7 1c2 2 3 4 3 6s-1 4-3 6" stroke="#6E7D71" strokeWidth="1.2" /></svg>
          {location}
        </span>
        <span style={{ fontSize: 12, color: "#5B6A5E", display: "flex", alignItems: "center", gap: 4 }}>
          <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><rect x="1" y="3" width="12" height="9" rx="2" stroke="#6E7D71" strokeWidth="1.2" /><path d="M5 3V2a2 2 0 014 0v1" stroke="#6E7D71" strokeWidth="1.2" /></svg>
          {department}
        </span>
      </div>

      <p style={{ fontSize: 14, color: "#5B6A5E", lineHeight: 1.65, margin: "0 0 20px", flexGrow: 1 }}>{description}</p>

      <button
        onClick={onApply}
        style={{
          display: "inline-flex", alignItems: "center", gap: 6,
          fontSize: 13, fontWeight: 600,
          color: hovered ? "#fff" : "#133020",
          background: hovered ? "#046241" : "transparent",
          border: `1px solid ${hovered ? "#046241" : "rgba(19,48,32,0.16)"}`,
          borderRadius: 999, padding: "8px 18px",
          cursor: "pointer", transition: "all 0.2s", alignSelf: "flex-start",
        }}
      >
        Apply Now
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2.5 6H9.5M6.5 3L9.5 6L6.5 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </button>
    </div>
  );
}

// ï¿½"ï¿½ï¿½"ï¿½ Page ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½
export default function Careers() {
  const [activeDept, setActiveDept] = useState("All");
  const [applyingTo, setApplyingTo] = useState<{ title: string; department: string } | null>(null);
  const careerShowcaseRef = useRef<HTMLDivElement | null>(null);
  const careerCopyRef = useRef<HTMLDivElement | null>(null);
  const careerImageRef = useRef<HTMLDivElement | null>(null);

  const filtered = activeDept === "All" ? OPENINGS : OPENINGS.filter(j => j.department === activeDept);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: careerShowcaseRef.current,
          start: "top 78%",
          once: true,
        },
      });

      timeline
        .fromTo(
          careerCopyRef.current,
          { y: 44, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
        )
        .fromTo(
          careerImageRef.current,
          { y: 56, opacity: 0, scale: 0.95 },
          { y: 0, opacity: 1, scale: 1, duration: 0.95, ease: "back.out(1.4)" },
          "-=0.48"
        );
    }, careerShowcaseRef);

    return () => ctx.revert();
  }, []);

  return (
    <div style={{ background: "#fff", minHeight: "100vh" }}>

      {/* Apply Modal */}
      {applyingTo && (
        <ApplyModal
          position={applyingTo.title}
          department={applyingTo.department}
          onClose={() => setApplyingTo(null)}
        />
      )}

      {/* ï¿½"ï¿½ï¿½"ï¿½ Hero ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ */}
      <section style={{ maxWidth: 1400, margin: "0 auto", padding: "72px 80px 60px" }}>
        <TabIndicator />
        <h1 style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)", fontWeight: 800, color: "#133020", marginBottom: 24, lineHeight: 1.1, fontFamily: "Arial, sans-serif", letterSpacing: "-0.02em" }}>
          Join Our Team
        </h1>
        <p style={{ fontSize: 15, color: "#133020", lineHeight: 1.8, maxWidth: 700, marginBottom: 36 }}>
          Help shape the future of AI. At Lifewood, we bring together passionate people
          from 30+ countries to build the data infrastructure that powers the world&apos;s most
          advanced AI systemsï¿½"while creating opportunities for communities everywhere.
        </p>
        <a href="#openings" style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "#FFC370", color: "#fff", padding: "12px 24px", borderRadius: 999, fontSize: 14, fontWeight: 600, textDecoration: "none" }}>
          See Open Roles
          <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 28, height: 28, borderRadius: "50%", background: "#046241" }}>
            <svg width="13" height="13" viewBox="0 0 12 12" fill="none"><path d="M2.5 6H9.5M6.5 3L9.5 6L6.5 9" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </span>
        </a>
      </section>

      <section style={{ maxWidth: 1400, margin: "0 auto", padding: "0 80px 80px" }}>
        <div
          ref={careerShowcaseRef}
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(280px, 0.8fr) minmax(360px, 1.2fr)",
            gap: 28,
            alignItems: "center",
          }}
        >
          <div ref={careerCopyRef}>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", color: "#FFC370", textTransform: "uppercase", marginBottom: 14 }}>
              Careers Spotlight
            </p>
            <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)", fontWeight: 700, color: "#133020", fontFamily: "Arial, sans-serif", lineHeight: 1.15, margin: "0 0 16px" }}>
              Build meaningful work with a truly global team
            </h2>
            <p style={{ fontSize: 15, color: "#5B6A5E", lineHeight: 1.8, margin: 0 }}>
              The careers page now opens with a more editorial media block, pairing a short recruitment message with an image treatment that feels closer to Lifewood&apos;s live reference.
            </p>
          </div>
          <div ref={careerImageRef}>
            <AnimatedImageCard
              src="https://framerusercontent.com/images/DF2gzPqqVW8QGp7Jxwp1y5257xk.jpg?width=6000&height=4000"
              alt="Lifewood careers team collaboration"
              width={6000}
              height={4000}
              hoverScale={1.06}
              frameStyle={{ borderRadius: 28, background: "#F9F7F7" }}
              imageStyle={{ height: "100%" }}
            />
          </div>
        </div>
      </section>

      {/* ï¿½"ï¿½ï¿½"ï¿½ Perks Grid ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ */}
      <section style={{ background: "#F9F7F7", padding: "80px 0" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 80px" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <span style={{ display: "inline-block", background: "#133020", color: "#fff", fontSize: 13, fontWeight: 600, padding: "6px 18px", borderRadius: 999, letterSpacing: "0.04em", marginBottom: 20 }}>Why Lifewood</span>
            <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", fontWeight: 700, color: "#133020", fontFamily: "Arial, sans-serif", letterSpacing: "-0.02em", margin: 0 }}>Life is better at Lifewood</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 20 }}>
            {PERKS.map(({ icon, title, body }) => (
              <div key={title} style={{ background: "#fff", borderRadius: 16, padding: "28px 28px 24px", border: "1px solid rgba(19,48,32,0.16)" }}>
                <span style={{ fontSize: 28, display: "block", marginBottom: 16 }}>{icon}</span>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: "#133020", marginBottom: 10, fontFamily: "Arial, sans-serif" }}>{title}</h3>
                <p style={{ fontSize: 14, color: "#5B6A5E", lineHeight: 1.7, margin: 0 }}>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ï¿½"ï¿½ï¿½"ï¿½ Open Roles ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ */}
      <section id="openings" style={{ maxWidth: 1400, margin: "0 auto", padding: "100px 80px" }}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 40, flexWrap: "wrap", gap: 24 }}>
          <div>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", color: "#FFC370", textTransform: "uppercase", marginBottom: 12 }}>Open Positions</p>
            <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", fontWeight: 700, color: "#133020", fontFamily: "Arial, sans-serif", letterSpacing: "-0.02em", margin: 0 }}>Where you could fit in</h2>
          </div>
          <span style={{ fontSize: 14, color: "#5B6A5E" }}>{filtered.length} role{filtered.length !== 1 ? "s" : ""}</span>
        </div>

        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 40 }}>
          {DEPARTMENTS.map(dept => (
            <button key={dept} onClick={() => setActiveDept(dept)} style={{ padding: "8px 18px", borderRadius: 999, border: "1px solid", fontSize: 13, fontWeight: 500, cursor: "pointer", transition: "all 0.15s", borderColor: activeDept === dept ? "#133020" : "rgba(19,48,32,0.16)", background: activeDept === dept ? "#133020" : "#fff", color: activeDept === dept ? "#fff" : "#133020" }}>
              {dept}
            </button>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))", gap: 20 }}>
          {filtered.map(job => (
            <JobCard
              key={job.title}
              {...job}
              onApply={() => setApplyingTo({ title: job.title, department: job.department })}
            />
          ))}
        </div>
      </section>

      {/* ï¿½"ï¿½ï¿½"ï¿½ CTA Banner ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ï¿½"ï¿½ */}
      <section style={{ background: "#046241", maxWidth: "calc(1400px - 160px)", margin: "0 auto 80px", borderRadius: 20, padding: "72px 80px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 40, flexWrap: "wrap" }}>
        <div style={{ maxWidth: 560 }}>
          <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.15em", color: "#FFC370", textTransform: "uppercase", marginBottom: 16 }}>Don&rsquo;t See Your Role?</p>
          <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)", fontWeight: 700, color: "#fff", lineHeight: 1.2, fontFamily: "Arial, sans-serif", marginBottom: 16 }}>Send us a speculative application</h2>
          <p style={{ fontSize: 15, color: "#6E7D71", lineHeight: 1.75, margin: 0 }}>We&rsquo;re always looking for exceptional people. If you believe you&rsquo;d add value to Lifewood, reach out and introduce yourself.</p>
        </div>
        <Link href="/contact-us" style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "#FFC370", color: "#fff", padding: "14px 28px", borderRadius: 999, fontSize: 15, fontWeight: 600, textDecoration: "none", flexShrink: 0, transition: "background 0.2s" }}
          onMouseEnter={e => (e.currentTarget.style.background = "#FFB347")} onMouseLeave={e => (e.currentTarget.style.background = "#FFC370")}>
          Get in Touch
          <svg width="14" height="14" viewBox="0 0 12 12" fill="none"><path d="M2.5 6H9.5M6.5 3L9.5 6L6.5 9" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </Link>
      </section>

    </div>
  );
}

