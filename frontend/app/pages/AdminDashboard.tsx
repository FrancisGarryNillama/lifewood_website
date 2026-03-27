"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { ensureCsrfToken, getApiBaseUrl } from "@/app/lib/api";
import LifewoodLogo from "@/app/components/LifewoodLogo";

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
  cv_url: string;
  cv_download_url: string;
  status: "pending" | "approved" | "rejected" | "interview_scheduled";
  interview_date: string | null;
  email_sent_at: string | null;
  last_email_type: "" | "approval" | "rejection" | "interview";
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

function StatusBadge({ value }: { value: InquiryRecord["status"] }) {
  const styles: Record<InquiryRecord["status"], { bg: string; text: string; label: string }> = {
    pending: { bg: "#f3f4f6", text: "#374151", label: "Pending" },
    approved: { bg: "#ecfdf3", text: "#166534", label: "Approved" },
    rejected: { bg: "#fef2f2", text: "#b91c1c", label: "Rejected" },
    interview_scheduled: { bg: "#eff6ff", text: "#1d4ed8", label: "Interview Scheduled" },
  };

  const style = styles[value];
  return (
    <span style={{ fontSize: 11, fontWeight: 700, padding: "4px 10px", borderRadius: 999, background: style.bg, color: style.text, letterSpacing: "0.04em" }}>
      {style.label}
    </span>
  );
}

function EmailHistoryBadge({ inquiry }: { inquiry: InquiryRecord }) {
  if (!inquiry.email_sent_at || !inquiry.last_email_type) {
    return (
      <span style={{ fontSize: 11, fontWeight: 700, padding: "4px 10px", borderRadius: 999, background: "#f3f4f6", color: "#6b7280", letterSpacing: "0.04em" }}>
        No Email Yet
      </span>
    );
  }

  const labels: Record<NonNullable<InquiryRecord["last_email_type"]>, string> = {
    "": "No Email Yet",
    approval: "Approval Email Sent",
    rejection: "Rejection Email Sent",
    interview: "Interview Email Sent",
  };

  return (
    <span style={{ fontSize: 11, fontWeight: 700, padding: "4px 10px", borderRadius: 999, background: "#eff6ff", color: "#1d4ed8", letterSpacing: "0.04em" }}>
      {labels[inquiry.last_email_type]}
    </span>
  );
}

function ScheduleInterviewModal({
  inquiry,
  submitting,
  error,
  onClose,
  onConfirm,
}: {
  inquiry: InquiryRecord;
  submitting: boolean;
  error: string;
  onClose: () => void;
  onConfirm: (value: string) => Promise<void>;
}) {
  const [dateTime, setDateTime] = useState(() =>
    inquiry.interview_date ? new Date(inquiry.interview_date).toISOString().slice(0, 16) : "",
  );

  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 500, background: "rgba(17,24,39,0.45)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div onClick={event => event.stopPropagation()} style={{ width: "100%", maxWidth: 420, background: "#fff", borderRadius: 20, padding: 28, boxShadow: "0 24px 80px rgba(0,0,0,0.18)" }}>
        <h3 style={{ fontSize: 20, fontWeight: 700, color: "#1a1a1a", fontFamily: "Georgia, serif", margin: "0 0 8px" }}>
          Schedule Interview
        </h3>
        <p style={{ fontSize: 14, color: "#6b7280", lineHeight: 1.6, margin: "0 0 20px" }}>
          Set the interview date and time for {inquiry.first_name} {inquiry.last_name}.
        </p>

        <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 8 }}>
          Interview Date & Time
        </label>
        <input
          type="datetime-local"
          value={dateTime}
          onChange={event => setDateTime(event.target.value)}
          style={{ width: "100%", padding: "11px 14px", borderRadius: 10, border: "1px solid #e5e7eb", fontSize: 14, color: "#1a1a1a", background: "#fff", outline: "none", boxSizing: "border-box" }}
        />

        {error ? (
          <div style={{ marginTop: 14, background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 10, padding: "10px 14px", fontSize: 13, color: "#b91c1c" }}>
            {error}
          </div>
        ) : null}

        <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 24 }}>
          <button onClick={onClose} style={{ padding: "10px 18px", borderRadius: 999, border: "1px solid #e5e7eb", background: "#fff", fontSize: 14, cursor: "pointer", color: "#374151" }}>
            Cancel
          </button>
          <button
            onClick={() => void onConfirm(dateTime)}
            disabled={submitting}
            style={{ padding: "10px 18px", borderRadius: 999, border: "none", background: submitting ? "#9ca3af" : "#2D6A4F", color: "#fff", fontSize: 14, fontWeight: 600, cursor: submitting ? "not-allowed" : "pointer" }}
          >
            {submitting ? "Saving..." : "Save Interview"}
          </button>
        </div>
      </div>
    </div>
  );
}

function Drawer({
  inquiry,
  actionBusy,
  actionError,
  onClose,
  onApprove,
  onReject,
  onSchedule,
}: {
  inquiry: InquiryRecord;
  actionBusy: boolean;
  actionError: string;
  onClose: () => void;
  onApprove: () => Promise<void>;
  onReject: () => Promise<void>;
  onSchedule: () => void;
}) {
  const isCareerInquiry = inquiry.inquiry_type === "Careers" || Boolean(inquiry.position);

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
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <InquiryTypeBadge value={inquiry.inquiry_type} />
          <StatusBadge value={inquiry.status} />
        </div>

        {isCareerInquiry ? (
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 24 }}>
            <button
              onClick={() => void onApprove()}
              disabled={actionBusy}
              style={{ padding: "10px 16px", borderRadius: 999, border: "none", background: "#166534", color: "#fff", fontSize: 13, fontWeight: 600, cursor: actionBusy ? "not-allowed" : "pointer", opacity: actionBusy ? 0.7 : 1 }}
            >
              Approve
            </button>
            <button
              onClick={() => void onReject()}
              disabled={actionBusy}
              style={{ padding: "10px 16px", borderRadius: 999, border: "none", background: "#b91c1c", color: "#fff", fontSize: 13, fontWeight: 600, cursor: actionBusy ? "not-allowed" : "pointer", opacity: actionBusy ? 0.7 : 1 }}
            >
              Reject
            </button>
            <button
              onClick={onSchedule}
              disabled={actionBusy}
              style={{ padding: "10px 16px", borderRadius: 999, border: "1px solid #d1d5db", background: "#fff", color: "#374151", fontSize: 13, fontWeight: 600, cursor: actionBusy ? "not-allowed" : "pointer", opacity: actionBusy ? 0.7 : 1 }}
            >
              Schedule Interview
            </button>
          </div>
        ) : null}

        {actionError ? (
          <div style={{ marginTop: 16, background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 10, padding: "10px 14px", fontSize: 13, color: "#b91c1c" }}>
            {actionError}
          </div>
        ) : null}

        <div style={{ marginTop: 28, display: "flex", flexDirection: "column", gap: 20 }}>
          {[
            { label: "Work Email", value: inquiry.work_email || "-" },
            { label: "Company", value: inquiry.company || "-" },
            { label: "Phone Number", value: inquiry.phone_number || "-" },
            { label: "Submitted", value: formatDate(inquiry.submitted_at) },
            { label: "Position", value: inquiry.position || "-" },
            { label: "Department", value: inquiry.department || "-" },
            { label: "Interview Date", value: inquiry.interview_date ? formatDate(inquiry.interview_date) : "-" },
            { label: "Last Email Sent", value: inquiry.email_sent_at ? formatDate(inquiry.email_sent_at) : "-" },
          ].map(({ label, value }) => (
            <div key={label}>
              <p style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 4 }}>{label}</p>
              <p style={{ fontSize: 14, color: "#1a1a1a", margin: 0, lineHeight: 1.5 }}>{value}</p>
            </div>
          ))}

          <div>
            <p style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>Attached CV</p>
            {inquiry.cv_download_url ? (
              <a
                href={`${API_BASE_URL}${inquiry.cv_download_url}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: "inline-flex", alignItems: "center", gap: 8, textDecoration: "none", color: "#2D6A4F", fontSize: 14, fontWeight: 600 }}
              >
                Download CV
              </a>
            ) : (
              <p style={{ fontSize: 14, color: "#6b7280", margin: 0 }}>{isCareerInquiry ? "No CV uploaded." : "Not applicable for this inquiry."}</p>
            )}
          </div>

          <div>
            <p style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>Email History</p>
            <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
              <EmailHistoryBadge inquiry={inquiry} />
              {inquiry.email_sent_at ? (
                <span style={{ fontSize: 13, color: "#6b7280" }}>{formatDate(inquiry.email_sent_at)}</span>
              ) : null}
            </div>
          </div>

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
  const [actionBusy, setActionBusy] = useState(false);
  const [actionError, setActionError] = useState("");
  const [scheduleTarget, setScheduleTarget] = useState<InquiryRecord | null>(null);
  const [scheduleBusy, setScheduleBusy] = useState(false);
  const [scheduleError, setScheduleError] = useState("");

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

  const syncApplicant = (updated: InquiryRecord) => {
    setInquiries(current => current.map(item => (item.id === updated.id ? updated : item)));
    setSelected(current => (current?.id === updated.id ? updated : current));
    setScheduleTarget(current => (current?.id === updated.id ? updated : current));
  };

  const updateApplicantStatus = async (applicantId: number, status: InquiryRecord["status"]) => {
    setActionBusy(true);
    setActionError("");

    try {
      const csrfToken = await ensureCsrfToken();
      const response = await fetch(`${API_BASE_URL}/api/applicants/${applicantId}/status/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrfToken,
        },
        credentials: "include",
        body: JSON.stringify({ status }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.detail || "Unable to update applicant.");
      }
      syncApplicant(data.applicant as InquiryRecord);
    } catch (err) {
      setActionError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setActionBusy(false);
    }
  };

  const submitInterviewSchedule = async (value: string) => {
    if (!scheduleTarget) return;
    if (!value) {
      setScheduleError("Interview date is required.");
      return;
    }

    setScheduleBusy(true);
    setScheduleError("");

    try {
      const csrfToken = await ensureCsrfToken();
      const interviewDate = new Date(value).toISOString();
      const response = await fetch(`${API_BASE_URL}/api/applicants/${scheduleTarget.id}/schedule-interview/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrfToken,
        },
        credentials: "include",
        body: JSON.stringify({ interviewDate }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.detail || "Unable to schedule interview.");
      }
      syncApplicant(data.applicant as InquiryRecord);
      setScheduleTarget(null);
    } catch (err) {
      setScheduleError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setScheduleBusy(false);
    }
  };

  const inquiryTypes = ["All", ...Array.from(new Set(inquiries.map(inquiry => inquiry.inquiry_type).filter(Boolean)))];
  const openScheduleFor = (inquiry: InquiryRecord) => {
    setActionError("");
    setScheduleError("");
    setScheduleTarget(inquiry);
    setSelected(inquiry);
  };

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
      {selected ? (
        <Drawer
          inquiry={selected}
          actionBusy={actionBusy}
          actionError={actionError}
          onClose={() => {
            setSelected(null);
            setActionError("");
          }}
          onApprove={() => updateApplicantStatus(selected.id, "approved")}
          onReject={() => updateApplicantStatus(selected.id, "rejected")}
          onSchedule={() => openScheduleFor(selected)}
        />
      ) : null}
      {scheduleTarget ? (
        <ScheduleInterviewModal
          inquiry={scheduleTarget}
          submitting={scheduleBusy}
          error={scheduleError}
          onClose={() => {
            if (!scheduleBusy) {
              setScheduleTarget(null);
              setScheduleError("");
            }
          }}
          onConfirm={submitInterviewSchedule}
        />
      ) : null}

      <header style={{ background: "#111827", padding: "0 48px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <LifewoodLogo width={170} withBadge padding="8px 14px" />
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
            Review contact inquiries, CV-backed job applications, and applicant interview decisions behind the hidden admin gate.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 16, marginBottom: 36 }}>
          {[
            { label: "Total Inquiries", value: inquiries.length, color: "#1a1a1a" },
            { label: "Filtered Results", value: filtered.length, color: "#2D6A4F" },
            { label: "Inquiry Types", value: inquiryTypes.length - 1, color: "#F5A623" },
            { label: "Pending Applicants", value: inquiries.filter(item => item.status === "pending").length, color: "#1d4ed8" },
            { label: "Emails Sent", value: inquiries.filter(item => Boolean(item.email_sent_at)).length, color: "#166534" },
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
            <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1.6fr 0.9fr 1fr 1fr 1fr 1.3fr auto", gap: 0, padding: "12px 24px", background: "#f8f9fa", borderBottom: "1px solid #e5e7eb" }}>
              {["Sender", "Email / Company", "Inquiry Type", "Status", "Email", "Date", "Actions", ""].map(header => (
                <span key={header} style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", letterSpacing: "0.08em", textTransform: "uppercase" }}>{header}</span>
              ))}
            </div>

            {filtered.map((inquiry, index) => (
              <div
                key={inquiry.id}
                style={{ display: "grid", gridTemplateColumns: "1.4fr 1.6fr 0.9fr 1fr 1fr 1fr 1.3fr auto", gap: 0, padding: "16px 24px", borderBottom: index < filtered.length - 1 ? "1px solid #f3f4f6" : "none", alignItems: "center", transition: "background 0.15s", cursor: "pointer" }}
                onMouseEnter={event => (event.currentTarget.style.background = "#f8f9fa")}
                onMouseLeave={event => (event.currentTarget.style.background = "transparent")}
                onClick={() => {
                  setSelected(inquiry);
                  setActionError("");
                }}
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
                <StatusBadge value={inquiry.status} />
                <EmailHistoryBadge inquiry={inquiry} />
                <p style={{ fontSize: 12, color: "#9ca3af", margin: 0 }}>{formatDate(inquiry.submitted_at)}</p>
                <div
                  onClick={event => event.stopPropagation()}
                  style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "flex-start" }}
                >
                  {inquiry.inquiry_type === "Careers" || inquiry.position ? (
                    <>
                      <button
                        onClick={() => void updateApplicantStatus(inquiry.id, "approved")}
                        disabled={actionBusy}
                        style={{ padding: "6px 10px", borderRadius: 999, border: "none", background: "#166534", color: "#fff", fontSize: 11, fontWeight: 700, cursor: actionBusy ? "not-allowed" : "pointer" }}
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => void updateApplicantStatus(inquiry.id, "rejected")}
                        disabled={actionBusy}
                        style={{ padding: "6px 10px", borderRadius: 999, border: "none", background: "#b91c1c", color: "#fff", fontSize: 11, fontWeight: 700, cursor: actionBusy ? "not-allowed" : "pointer" }}
                      >
                        Reject
                      </button>
                      <button
                        onClick={() => openScheduleFor(inquiry)}
                        disabled={actionBusy}
                        style={{ padding: "6px 10px", borderRadius: 999, border: "1px solid #d1d5db", background: "#fff", color: "#374151", fontSize: 11, fontWeight: 700, cursor: actionBusy ? "not-allowed" : "pointer" }}
                      >
                        Schedule
                      </button>
                    </>
                  ) : (
                    <span style={{ fontSize: 12, color: "#9ca3af" }}>Not applicable</span>
                  )}
                </div>
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
