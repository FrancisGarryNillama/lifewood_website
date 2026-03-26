"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const API_BASE_URL = "http://127.0.0.1:8000";

interface Applicant {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  position: string;
  department: string;
  cover_letter: string;
  submitted_at: string;
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric", month: "short", day: "numeric",
    hour: "2-digit", minute: "2-digit",
  });
}

const DEPT_COLORS: Record<string, { bg: string; text: string }> = {
  "Engineering":          { bg: "#eff6ff", text: "#1d4ed8" },
  "Data & AI":            { bg: "#f0faf5", text: "#2D6A4F" },
  "Operations":           { bg: "#fff7ed", text: "#c2410c" },
  "Business Development": { bg: "#fdf4ff", text: "#7e22ce" },
  "People & Culture":     { bg: "#fef9c3", text: "#92400e" },
};

function DeptBadge({ dept }: { dept: string }) {
  const style = DEPT_COLORS[dept] ?? { bg: "#f3f4f6", text: "#374151" };
  return (
    <span style={{ fontSize: 11, fontWeight: 700, padding: "3px 9px", borderRadius: 999, background: style.bg, color: style.text, letterSpacing: "0.05em" }}>
      {dept || "—"}
    </span>
  );
}

// ── Applicant Detail Drawer ───────────────────────────────────────────────────
function Drawer({ applicant, onClose }: { applicant: Applicant; onClose: () => void }) {
  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 400, background: "rgba(17,24,39,0.45)", backdropFilter: "blur(6px)", display: "flex", justifyContent: "flex-end" }}>
      <div onClick={e => e.stopPropagation()} style={{ width: "100%", maxWidth: 480, background: "#fff", height: "100%", overflowY: "auto", padding: 36, boxShadow: "-8px 0 40px rgba(0,0,0,0.15)" }}>
        <button onClick={onClose} style={{ background: "none", border: "1px solid #e5e7eb", borderRadius: "50%", width: 32, height: 32, cursor: "pointer", fontSize: 18, color: "#6b7280", marginBottom: 24, display: "flex", alignItems: "center", justifyContent: "center" }}>×</button>

        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", color: "#F5A623", textTransform: "uppercase", marginBottom: 8 }}>Applicant #{applicant.id}</p>
        <h2 style={{ fontSize: 24, fontWeight: 700, color: "#1a1a1a", fontFamily: "Georgia, serif", marginBottom: 4 }}>
          {applicant.first_name} {applicant.last_name}
        </h2>
        <DeptBadge dept={applicant.department} />

        <div style={{ marginTop: 28, display: "flex", flexDirection: "column", gap: 20 }}>
          {[
            { label: "Position Applied", value: applicant.position },
            { label: "Email", value: applicant.email },
            { label: "Phone", value: applicant.phone || "—" },
            { label: "Department", value: applicant.department || "—" },
            { label: "Submitted", value: formatDate(applicant.submitted_at) },
          ].map(({ label, value }) => (
            <div key={label}>
              <p style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 4 }}>{label}</p>
              <p style={{ fontSize: 14, color: "#1a1a1a", margin: 0, lineHeight: 1.5 }}>{value}</p>
            </div>
          ))}

          {applicant.cover_letter && (
            <div>
              <p style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>Cover Letter</p>
              <div style={{ background: "#f8f9fa", borderRadius: 12, padding: "16px 18px", fontSize: 14, color: "#374151", lineHeight: 1.75, border: "1px solid #e5e7eb" }}>
                {applicant.cover_letter}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Main Dashboard ────────────────────────────────────────────────────────────
export default function AdminDashboard() {
  const router = useRouter();
  const [adminName, setAdminName]         = useState("");
  const [applicants, setApplicants]       = useState<Applicant[]>([]);
  const [loading, setLoading]             = useState(true);
  const [error, setError]                 = useState("");
  const [selected, setSelected]           = useState<Applicant | null>(null);
  const [search, setSearch]               = useState("");
  const [deptFilter, setDeptFilter]       = useState("All");
  const [loggingOut, setLoggingOut]       = useState(false);

  // ── Auth check + data fetch on mount ─────────────────────────────────────
  useEffect(() => {
    async function init() {
      try {
        // 1. Verify the session is authenticated
        const authRes = await fetch(`${API_BASE_URL}/api/auth/status/`, { credentials: "include" });
        const authData = await authRes.json();
        if (!authData.authenticated) {
          router.replace("/");
          return;
        }
        setAdminName(authData.username);

        // 2. Fetch applicants
        const appRes = await fetch(`${API_BASE_URL}/api/applicants/`, { credentials: "include" });
        if (!appRes.ok) throw new Error("Failed to load applicants.");
        const appData = await appRes.json();
        setApplicants(appData.applicants);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong.");
      } finally {
        setLoading(false);
      }
    }
    init();
  }, [router]);

  // ── Logout ────────────────────────────────────────────────────────────────
  const handleLogout = async () => {
    setLoggingOut(true);
    await fetch(`${API_BASE_URL}/hidden-admin/logout/`, { method: "POST", credentials: "include" });
    router.replace("/");
  };

  // ── Filtered view ─────────────────────────────────────────────────────────
  const departments = ["All", ...Array.from(new Set(applicants.map(a => a.department).filter(Boolean)))];
  const visible = applicants.filter(a => {
    const q = search.toLowerCase();
    const matchSearch = !q || `${a.first_name} ${a.last_name} ${a.email} ${a.position}`.toLowerCase().includes(q);
    const matchDept   = deptFilter === "All" || a.department === deptFilter;
    return matchSearch && matchDept;
  });

  // ── Loading / error states ─────────────────────────────────────────────────
  if (loading) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f8f9fa" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ width: 40, height: 40, border: "3px solid #e5e7eb", borderTopColor: "#2D6A4F", borderRadius: "50%", animation: "spin 0.8s linear infinite", margin: "0 auto 16px" }} />
          <p style={{ color: "#6b7280", fontSize: 14 }}>Loading dashboard…</p>
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f8f9fa" }}>
        <div style={{ textAlign: "center", maxWidth: 400 }}>
          <p style={{ color: "#b91c1c", fontSize: 15, marginBottom: 16 }}>{error}</p>
          <button onClick={() => router.replace("/")} style={{ padding: "10px 24px", borderRadius: 999, background: "#1a1a1a", color: "#fff", border: "none", fontSize: 14, cursor: "pointer" }}>Back to Home</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#f8f9fa" }}>

      {selected && <Drawer applicant={selected} onClose={() => setSelected(null)} />}

      {/* ── Top Bar ──────────────────────────────────────────────────────── */}
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
          <span style={{ fontSize: 13, color: "rgba(255,255,255,0.5)" }}>Signed in as <strong style={{ color: "#fff" }}>{adminName}</strong></span>
          <button
            onClick={handleLogout}
            disabled={loggingOut}
            style={{ padding: "7px 16px", borderRadius: 999, border: "1px solid rgba(255,255,255,0.2)", background: "transparent", color: "rgba(255,255,255,0.7)", fontSize: 13, cursor: "pointer", transition: "all 0.15s" }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.08)"; e.currentTarget.style.color = "#fff"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "rgba(255,255,255,0.7)"; }}
          >
            {loggingOut ? "Signing out…" : "Sign Out"}
          </button>
        </div>
      </header>

      {/* ── Page Content ─────────────────────────────────────────────────── */}
      <main style={{ maxWidth: 1300, margin: "0 auto", padding: "48px 40px" }}>

        {/* Heading + stats */}
        <div style={{ marginBottom: 40 }}>
          <h1 style={{ fontSize: "clamp(1.8rem, 3vw, 2.4rem)", fontWeight: 700, color: "#1a1a1a", fontFamily: "Georgia, serif", marginBottom: 8 }}>
            Applicant Management
          </h1>
          <p style={{ fontSize: 14, color: "#6b7280", margin: 0 }}>
            All job applications submitted through the careers page.
          </p>
        </div>

        {/* Stat cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 16, marginBottom: 36 }}>
          {[
            { label: "Total Applicants", value: applicants.length, color: "#1a1a1a" },
            { label: "Showing", value: visible.length, color: "#2D6A4F" },
            { label: "Departments", value: departments.length - 1, color: "#F5A623" },
          ].map(({ label, value, color }) => (
            <div key={label} style={{ background: "#fff", borderRadius: 14, padding: "20px 24px", border: "1px solid #e5e7eb" }}>
              <p style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>{label}</p>
              <p style={{ fontSize: 32, fontWeight: 800, color, fontFamily: "Georgia, serif", margin: 0 }}>{value}</p>
            </div>
          ))}
        </div>

        {/* Search + filter bar */}
        <div style={{ display: "flex", gap: 12, marginBottom: 24, flexWrap: "wrap", alignItems: "center" }}>
          <div style={{ position: "relative", flex: 1, minWidth: 240 }}>
            <svg style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)" }} width="14" height="14" viewBox="0 0 14 14" fill="none">
              <circle cx="6" cy="6" r="5" stroke="#9ca3af" strokeWidth="1.4" />
              <path d="M10 10L13 13" stroke="#9ca3af" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by name, email, or position…"
              style={{ width: "100%", padding: "10px 14px 10px 34px", borderRadius: 10, border: "1px solid #e5e7eb", fontSize: 14, color: "#1a1a1a", background: "#fff", outline: "none", boxSizing: "border-box" }}
            />
          </div>

          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {departments.map(dept => (
              <button
                key={dept}
                onClick={() => setDeptFilter(dept)}
                style={{ padding: "8px 16px", borderRadius: 999, border: "1px solid", fontSize: 12, fontWeight: 500, cursor: "pointer", transition: "all 0.15s", borderColor: deptFilter === dept ? "#1a1a1a" : "#e5e7eb", background: deptFilter === dept ? "#1a1a1a" : "#fff", color: deptFilter === dept ? "#fff" : "#374151" }}
              >
                {dept}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        {visible.length === 0 ? (
          <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #e5e7eb", padding: "80px 40px", textAlign: "center" }}>
            <p style={{ fontSize: 15, color: "#9ca3af" }}>{applicants.length === 0 ? "No applications have been submitted yet." : "No applicants match your search."}</p>
          </div>
        ) : (
          <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #e5e7eb", overflow: "hidden" }}>
            {/* Table header */}
            <div style={{ display: "grid", gridTemplateColumns: "2fr 2fr 2fr 1.5fr 1.2fr auto", gap: 0, padding: "12px 24px", background: "#f8f9fa", borderBottom: "1px solid #e5e7eb" }}>
              {["Applicant", "Position", "Email", "Department", "Submitted", ""].map(h => (
                <span key={h} style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", letterSpacing: "0.08em", textTransform: "uppercase" }}>{h}</span>
              ))}
            </div>

            {/* Rows */}
            {visible.map((a, idx) => (
              <div
                key={a.id}
                style={{ display: "grid", gridTemplateColumns: "2fr 2fr 2fr 1.5fr 1.2fr auto", gap: 0, padding: "16px 24px", borderBottom: idx < visible.length - 1 ? "1px solid #f3f4f6" : "none", alignItems: "center", transition: "background 0.15s", cursor: "pointer" }}
                onMouseEnter={e => (e.currentTarget.style.background = "#f8f9fa")}
                onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
                onClick={() => setSelected(a)}
              >
                <div>
                  <p style={{ fontSize: 14, fontWeight: 600, color: "#1a1a1a", margin: "0 0 2px" }}>{a.first_name} {a.last_name}</p>
                </div>
                <p style={{ fontSize: 13, color: "#374151", margin: 0 }}>{a.position}</p>
                <p style={{ fontSize: 13, color: "#6b7280", margin: 0 }}>{a.email}</p>
                <DeptBadge dept={a.department} />
                <p style={{ fontSize: 12, color: "#9ca3af", margin: 0 }}>{formatDate(a.submitted_at)}</p>
                <svg width="14" height="14" viewBox="0 0 12 12" fill="none" style={{ opacity: 0.4 }}><path d="M2.5 6H9.5M6.5 3L9.5 6L6.5 9" stroke="#374151" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}