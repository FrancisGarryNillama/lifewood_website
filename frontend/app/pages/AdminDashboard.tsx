"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { getApiBaseUrl } from "@/app/lib/api";

const API_BASE_URL = getApiBaseUrl();

interface InquiryRecord {
  id: number;
  first_name: string;
  last_name: string;
  work_email: string;
  company: string;
  phone_number: string;
  inquiry_type: string;
  message: string;
  submitted_at: string;
  position: string;
  department: string;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function InquiryTypeBadge({ value }: { value: string }) {
  const styles: Record<string, { bg: string; text: string }> = {
    "General Inquiry": { bg: "#eff6ff", text: "#1d4ed8" },
    "AI Data Services": { bg: "#ecfdf3", text: "#166534" },
    Partnership: { bg: "#fff7ed", text: "#c2410c" },
    Careers: { bg: "#fdf4ff", text: "#7e22ce" },
    "Media & Press": { bg: "#fef9c3", text: "#92400e" },
    Other: { bg: "#f3f4f6", text: "#374151" },
  };

  const style = styles[value] ?? { bg: "#f3f4f6", text: "#374151" };
  return (
    <span style={{ fontSize: 11, fontWeight: 700, padding: "4px 10px", borderRadius: 999, background: style.bg, color: style.text, letterSpacing: "0.04em" }}>
      {value}
    </span>
  );
}

function Drawer({ inquiry, onClose }: { inquiry: InquiryRecord; onClose: () => void }) {
  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 400, background: "rgba(17,24,39,0.45)", backdropFilter: "blur(6px)", display: "flex", justifyContent: "flex-end" }}>
      <div onClick={event => event.stopPropagation()} style={{ width: "100%", maxWidth: 520, background: "#fff", height: "100%", overflowY: "auto", padding: 36, boxShadow: "-8px 0 40px rgba(0,0,0,0.15)" }}>
        <button onClick={onClose} style={{ background: "none", border: "1px solid #e5e7eb", borderRadius: "50%", width: 32, height: 32, cursor: "pointer", fontSize: 18, color: "#6b7280", marginBottom: 24, display: "flex", alignItems: "center", justifyContent: "center" }}>
          x
        </button>

        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", color: "#F5A623", textTransform: "uppercase", marginBottom: 8 }}>
          Inquiry #{inquiry.id}
        </p>
        <h2 style={{ fontSize: 24, fontWeight: 700, color: "#1a1a1a", fontFamily: "Georgia, serif", marginBottom: 8 }}>
          {inquiry.first_name} {inquiry.last_name}
        </h2>
        <InquiryTypeBadge value={inquiry.inquiry_type} />

        <div style={{ marginTop: 28, display: "flex", flexDirection: "column", gap: 20 }}>
          {[
            { label: "Work Email", value: inquiry.work_email || "-" },
            { label: "Company", value: inquiry.company || "-" },
            { label: "Phone Number", value: inquiry.phone_number || "-" },
            { label: "Submitted", value: formatDate(inquiry.submitted_at) },
            { label: "Position", value: inquiry.position || "-" },
            { label: "Department", value: inquiry.department || "-" },
          ].map(({ label, value }) => (
            <div key={label}>
              <p style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 4 }}>{label}</p>
              <p style={{ fontSize: 14, color: "#1a1a1a", margin: 0, lineHeight: 1.5 }}>{value}</p>
            </div>
          ))}

          <div>
            <p style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>Message</p>
            <div style={{ background: "#f8f9fa", borderRadius: 12, padding: "16px 18px", fontSize: 14, color: "#374151", lineHeight: 1.75, border: "1px solid #e5e7eb", whiteSpace: "pre-wrap" }}>
              {inquiry.message || "No message provided."}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const router = useRouter();
  const [adminName, setAdminName] = useState("");
  const [inquiries, setInquiries] = useState<InquiryRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState<InquiryRecord | null>(null);
  const [search, setSearch] = useState("");
  const [inquiryTypeFilter, setInquiryTypeFilter] = useState("All");
  const [companyFilter, setCompanyFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    async function init() {
      try {
        const authRes = await fetch(`${API_BASE_URL}/api/auth/status/`, { credentials: "include" });
        const authData = await authRes.json();
        if (!authData.authenticated) {
          router.replace("/");
          return;
        }

        setAdminName(authData.username);

        const inquiriesRes = await fetch(`${API_BASE_URL}/api/applicants/`, { credentials: "include" });
        if (!inquiriesRes.ok) {
          throw new Error("Failed to load inquiries.");
        }

        const inquiriesData = await inquiriesRes.json();
        setInquiries(inquiriesData.applicants ?? []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong.");
      } finally {
        setLoading(false);
      }
    }

    init();
  }, [router]);

  const handleLogout = async () => {
    setLoggingOut(true);
    await fetch(`${API_BASE_URL}/hidden-admin/logout/`, { method: "POST", credentials: "include" });
    router.replace("/");
  };

  const inquiryTypes = ["All", ...Array.from(new Set(inquiries.map(inquiry => inquiry.inquiry_type).filter(Boolean)))];
  const filtered = inquiries.filter(inquiry => {
    const query = search.trim().toLowerCase();
    const matchesSearch = !query || [
      inquiry.first_name,
      inquiry.last_name,
      inquiry.work_email,
      inquiry.company,
      inquiry.message,
    ].join(" ").toLowerCase().includes(query);

    const matchesType = inquiryTypeFilter === "All" || inquiry.inquiry_type === inquiryTypeFilter;
    const matchesCompany = !companyFilter.trim() || inquiry.company.toLowerCase().includes(companyFilter.trim().toLowerCase());
    const matchesDate = !dateFilter || inquiry.submitted_at.slice(0, 10) === dateFilter;

    return matchesSearch && matchesType && matchesCompany && matchesDate;
  });

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f8f9fa" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ width: 40, height: 40, border: "3px solid #e5e7eb", borderTopColor: "#2D6A4F", borderRadius: "50%", animation: "spin 0.8s linear infinite", margin: "0 auto 16px" }} />
          <p style={{ color: "#6b7280", fontSize: 14 }}>Loading dashboard...</p>
          <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f8f9fa" }}>
        <div style={{ textAlign: "center", maxWidth: 420 }}>
          <p style={{ color: "#b91c1c", fontSize: 15, marginBottom: 16 }}>{error}</p>
          <button onClick={() => router.replace("/")} style={{ padding: "10px 24px", borderRadius: 999, background: "#1a1a1a", color: "#fff", border: "none", fontSize: 14, cursor: "pointer" }}>
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#f8f9fa" }}>
      {selected ? <Drawer inquiry={selected} onClose={() => setSelected(null)} /> : null}

      <header style={{ background: "#111827", padding: "0 48px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 28, height: 28, background: "#F5A623", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="14" height="14" viewBox="0 0 124 280" fill="none"><path d="M62 0L124 62V218L62 280L0 218V62L62 0Z" fill="#fff" /></svg>
          </div>
          <span style={{ color: "#fff", fontWeight: 700, fontSize: 15 }}>Lifewood</span>
          <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 14 }}>/</span>
          <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 14 }}>Admin Dashboard</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <span style={{ fontSize: 13, color: "rgba(255,255,255,0.5)" }}>
            Signed in as <strong style={{ color: "#fff" }}>{adminName}</strong>
          </span>
          <button
            onClick={handleLogout}
            disabled={loggingOut}
            style={{ padding: "7px 16px", borderRadius: 999, border: "1px solid rgba(255,255,255,0.2)", background: "transparent", color: "rgba(255,255,255,0.7)", fontSize: 13, cursor: "pointer", transition: "all 0.15s" }}
            onMouseEnter={event => { event.currentTarget.style.background = "rgba(255,255,255,0.08)"; event.currentTarget.style.color = "#fff"; }}
            onMouseLeave={event => { event.currentTarget.style.background = "transparent"; event.currentTarget.style.color = "rgba(255,255,255,0.7)"; }}
          >
            {loggingOut ? "Signing out..." : "Sign Out"}
          </button>
        </div>
      </header>

      <main style={{ maxWidth: 1320, margin: "0 auto", padding: "48px 40px" }}>
        <div style={{ marginBottom: 40 }}>
          <h1 style={{ fontSize: "clamp(1.8rem, 3vw, 2.4rem)", fontWeight: 700, color: "#1a1a1a", fontFamily: "Georgia, serif", marginBottom: 8 }}>
            Inquiry Management
          </h1>
          <p style={{ fontSize: 14, color: "#6b7280", margin: 0 }}>
            Review contact inquiries and other submitted requests behind the hidden admin gate.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 16, marginBottom: 36 }}>
          {[
            { label: "Total Inquiries", value: inquiries.length, color: "#1a1a1a" },
            { label: "Filtered Results", value: filtered.length, color: "#2D6A4F" },
            { label: "Inquiry Types", value: inquiryTypes.length - 1, color: "#F5A623" },
          ].map(({ label, value, color }) => (
            <div key={label} style={{ background: "#fff", borderRadius: 14, padding: "20px 24px", border: "1px solid #e5e7eb" }}>
              <p style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>{label}</p>
              <p style={{ fontSize: 32, fontWeight: 800, color, fontFamily: "Georgia, serif", margin: 0 }}>{value}</p>
            </div>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr", gap: 12, marginBottom: 16 }}>
          <div style={{ position: "relative" }}>
            <svg style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)" }} width="14" height="14" viewBox="0 0 14 14" fill="none">
              <circle cx="6" cy="6" r="5" stroke="#9ca3af" strokeWidth="1.4" />
              <path d="M10 10L13 13" stroke="#9ca3af" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
            <input
              value={search}
              onChange={event => setSearch(event.target.value)}
              placeholder="Search by name, email, company, or message..."
              style={{ width: "100%", padding: "10px 14px 10px 34px", borderRadius: 10, border: "1px solid #e5e7eb", fontSize: 14, color: "#1a1a1a", background: "#fff", outline: "none", boxSizing: "border-box" }}
            />
          </div>

          <input
            type="text"
            value={companyFilter}
            onChange={event => setCompanyFilter(event.target.value)}
            placeholder="Filter by company"
            style={{ width: "100%", padding: "10px 14px", borderRadius: 10, border: "1px solid #e5e7eb", fontSize: 14, color: "#1a1a1a", background: "#fff", outline: "none", boxSizing: "border-box" }}
          />

          <input
            type="date"
            value={dateFilter}
            onChange={event => setDateFilter(event.target.value)}
            style={{ width: "100%", padding: "10px 14px", borderRadius: 10, border: "1px solid #e5e7eb", fontSize: 14, color: "#1a1a1a", background: "#fff", outline: "none", boxSizing: "border-box" }}
          />
        </div>

        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 24 }}>
          {inquiryTypes.map(type => (
            <button
              key={type}
              onClick={() => setInquiryTypeFilter(type)}
              style={{ padding: "8px 16px", borderRadius: 999, border: "1px solid", fontSize: 12, fontWeight: 500, cursor: "pointer", transition: "all 0.15s", borderColor: inquiryTypeFilter === type ? "#1a1a1a" : "#e5e7eb", background: inquiryTypeFilter === type ? "#1a1a1a" : "#fff", color: inquiryTypeFilter === type ? "#fff" : "#374151" }}
            >
              {type}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #e5e7eb", padding: "80px 40px", textAlign: "center" }}>
            <p style={{ fontSize: 15, color: "#9ca3af" }}>{inquiries.length === 0 ? "No inquiries have been submitted yet." : "No inquiries match the current filters."}</p>
          </div>
        ) : (
          <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #e5e7eb", overflow: "hidden" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1.8fr 1.2fr 1.2fr 1fr auto", gap: 0, padding: "12px 24px", background: "#f8f9fa", borderBottom: "1px solid #e5e7eb" }}>
              {["Sender", "Email / Company", "Inquiry Type", "Date", "Career Context", ""].map(header => (
                <span key={header} style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", letterSpacing: "0.08em", textTransform: "uppercase" }}>{header}</span>
              ))}
            </div>

            {filtered.map((inquiry, index) => (
              <div
                key={inquiry.id}
                style={{ display: "grid", gridTemplateColumns: "1.6fr 1.8fr 1.2fr 1.2fr 1fr auto", gap: 0, padding: "16px 24px", borderBottom: index < filtered.length - 1 ? "1px solid #f3f4f6" : "none", alignItems: "center", transition: "background 0.15s", cursor: "pointer" }}
                onMouseEnter={event => (event.currentTarget.style.background = "#f8f9fa")}
                onMouseLeave={event => (event.currentTarget.style.background = "transparent")}
                onClick={() => setSelected(inquiry)}
              >
                <div>
                  <p style={{ fontSize: 14, fontWeight: 600, color: "#1a1a1a", margin: "0 0 2px" }}>{inquiry.first_name} {inquiry.last_name}</p>
                  <p style={{ fontSize: 12, color: "#9ca3af", margin: 0 }}>{inquiry.phone_number || "No phone number"}</p>
                </div>
                <div>
                  <p style={{ fontSize: 13, color: "#374151", margin: "0 0 2px" }}>{inquiry.work_email || "-"}</p>
                  <p style={{ fontSize: 12, color: "#9ca3af", margin: 0 }}>{inquiry.company || "No company provided"}</p>
                </div>
                <InquiryTypeBadge value={inquiry.inquiry_type} />
                <p style={{ fontSize: 12, color: "#9ca3af", margin: 0 }}>{formatDate(inquiry.submitted_at)}</p>
                <p style={{ fontSize: 12, color: "#6b7280", margin: 0 }}>{inquiry.position || inquiry.department || "-"}</p>
                <svg width="14" height="14" viewBox="0 0 12 12" fill="none" style={{ opacity: 0.4 }}>
                  <path d="M2.5 6H9.5M6.5 3L9.5 6L6.5 9" stroke="#374151" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
