"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

// ── Types ─────────────────────────────────────────────────────────────────────
interface DropdownItem {
  label: string;
  href: string;
}
interface NavItem {
  label: string;
  href?: string;
  dropdown?: DropdownItem[];
}

// ── Nav config ────────────────────────────────────────────────────────────────
const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "AI Initiatives",
    dropdown: [
      { label: "AI Projects", href: "/ai-initiatives/ai-projects" },
      { label: "AI Services", href: "/ai-initiatives/ai-services" },
    ],
  },
  {
    label: "Our Company",
    dropdown: [
      { label: "About Us", href: "/our-company/about-us" },
      { label: "Offices", href: "/our-company/offices" },
    ],
  },
  {
    label: "What We Offer",
    dropdown: [
      { label: "Type A – Data Servicing", href: "/what-we-offer/type-a-data-servicing" },
      { label: "Type B – Horizontal LLM Data", href: "/what-we-offer/type-b-horizontal-llm-data" },
      { label: "Type C – Vertical LLM Data", href: "/what-we-offer/type-c-vertical-llm-data" },
      { label: "Type D – AIGC", href: "/what-we-offer/type-d-aigc" },
    ],
  },
  { label: "Philanthropy & Impact", href: "/philanthropy-and-impact" },
  { label: "Careers", href: "/careers" },
  { label: "Contact Us", href: "/contact-us" },
  { label: "Internal News", href: "/internal-news" },
];

// ── Logo ──────────────────────────────────────────────────────────────────────
function LifewoodLogo() {
  return (
    <Link href="/" className="flex items-center gap-2 select-none flex-shrink-0">
      <svg width="26" height="32" viewBox="0 0 28 34" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M14 0C14 0 26 8 26 18C26 25.732 20.627 32 14 32C7.373 32 2 25.732 2 18C2 8 14 0 14 0Z" fill="#F5A623" />
        <path d="M14 8C14 8 21 13 21 19C21 23.418 17.866 27 14 27C10.134 27 7 23.418 7 19C7 13 14 8 14 8Z" fill="#2D6A4F" />
      </svg>
      <span style={{ fontFamily: "Georgia, serif", letterSpacing: "-0.02em" }} className="text-2xl font-bold">
        <span style={{ color: "#2D6A4F" }}>life</span>
        <span style={{ color: "#1a1a1a" }}>wood</span>
      </span>
    </Link>
  );
}

// ── Chevron ───────────────────────────────────────────────────────────────────
function ChevronDown({ open }: { open: boolean }) {
  return (
    <svg
      width="11" height="11" viewBox="0 0 12 12" fill="none"
      style={{
        display: "inline-block", marginLeft: 3,
        transition: "transform 0.2s",
        transform: open ? "rotate(180deg)" : "rotate(0deg)",
      }}
      aria-hidden="true"
    >
      <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ── Desktop Dropdown ──────────────────────────────────────────────────────────
function DropdownMenu({ items, visible }: { items: DropdownItem[]; visible: boolean }) {
  return (
    <div style={{
      position: "absolute",
      top: "100%",
      left: "50%",
      transform: "translateX(-50%)",
      marginTop: 8,
      minWidth: 220,
      background: "#fff",
      border: "1px solid #e5e7eb",
      borderRadius: 12,
      boxShadow: "0 10px 40px rgba(0,0,0,0.10)",
      zIndex: 100,
      overflow: "hidden",
      opacity: visible ? 1 : 0,
      pointerEvents: visible ? "auto" : "none",
      transition: "opacity 0.15s ease",
    }}>
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          style={{
            display: "block",
            padding: "12px 20px",
            fontSize: 14,
            fontWeight: 500,
            color: "#374151",
            textDecoration: "none",
          }}
          onMouseEnter={e => (e.currentTarget.style.background = "#f0faf5")}
          onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
}

// ── Mobile Menu ───────────────────────────────────────────────────────────────
function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [expanded, setExpanded] = useState<string | null>(null);
  useEffect(() => { if (!open) setExpanded(null); }, [open]);
  if (!open) return null;

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 200,
      background: "#fff", overflowY: "auto",
    }}>
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "16px 24px", borderBottom: "1px solid #e5e7eb",
      }}>
        <LifewoodLogo />
        <button onClick={onClose} style={{ padding: 8, cursor: "pointer", background: "none", border: "none" }} aria-label="Close menu">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M4 4L16 16M16 4L4 16" stroke="#1a1a1a" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </button>
      </div>
      <nav style={{ padding: "16px 24px" }}>
        {NAV_ITEMS.map((item) => (
          <div key={item.label}>
            {item.dropdown ? (
              <>
                <button
                  onClick={() => setExpanded(expanded === item.label ? null : item.label)}
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    width: "100%", padding: "12px 12px", fontSize: 16, fontWeight: 600,
                    color: "#1a1a1a", background: "none", border: "none", cursor: "pointer",
                    borderRadius: 8, textAlign: "left",
                  }}
                >
                  {item.label}
                  <ChevronDown open={expanded === item.label} />
                </button>
                {expanded === item.label && (
                  <div style={{ marginLeft: 16, paddingLeft: 16, borderLeft: "2px solid #d1fae5", marginBottom: 4 }}>
                    {item.dropdown.map((sub) => (
                      <Link key={sub.href} href={sub.href} onClick={onClose} style={{
                        display: "block", padding: "8px 0", fontSize: 14,
                        color: "#4b5563", textDecoration: "none",
                      }}>
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <Link href={item.href!} onClick={onClose} style={{
                display: "block", padding: "12px 12px", fontSize: 16, fontWeight: 600,
                color: "#1a1a1a", textDecoration: "none", borderRadius: 8,
              }}>
                {item.label}
              </Link>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
}

// ── Main Navbar ───────────────────────────────────────────────────────────────
export default function Navbar() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activePage, setActivePage] = useState("Home");
  // Start as true (mobile) to avoid flash — will correct on mount
  const [isMobile, setIsMobile] = useState(true);
  const [mounted, setMounted] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    setMounted(true);
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const openDropdown = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setActiveDropdown(label);
  };
  const scheduleClose = () => {
    closeTimer.current = setTimeout(() => setActiveDropdown(null), 150);
  };

  return (
    <>
      <header style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 40,
        background: "#fff",
        boxShadow: scrolled ? "0 2px 16px rgba(0,0,0,0.08)" : "0 1px 0 #e5e7eb",
        transition: "box-shadow 0.3s",
      }}>
        <div style={{
          maxWidth: 1400,
          margin: "0 auto",
          padding: "0 40px",
          height: 72,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}>
          <LifewoodLogo />

          {/* Only render nav after mount to avoid SSR/hydration mismatch */}
          {mounted && (
            <>
              {/* Desktop Nav */}
              {!isMobile && (
                <nav style={{ display: "flex", alignItems: "center", gap: 2 }}>
                  {NAV_ITEMS.map((item) => {
                    const isActive = activePage === item.label;
                    const hasDropdown = !!item.dropdown;
                    return (
                      <div
                        key={item.label}
                        style={{ position: "relative" }}
                        onMouseEnter={() => hasDropdown && openDropdown(item.label)}
                        onMouseLeave={() => hasDropdown && scheduleClose()}
                      >
                        {item.href ? (
                          <Link
                            href={item.href}
                            onClick={() => setActivePage(item.label)}
                            style={{
                              display: "inline-block",
                              padding: "8px 11px",
                              fontSize: 14,
                              fontWeight: isActive ? 600 : 500,
                              color: isActive ? "#F5A623" : "#374151",
                              textDecoration: "none",
                              borderRadius: 8,
                              whiteSpace: "nowrap",
                              transition: "color 0.15s",
                            }}
                            onMouseEnter={e => { if (!isActive) e.currentTarget.style.color = "#2D6A4F"; }}
                            onMouseLeave={e => { if (!isActive) e.currentTarget.style.color = "#374151"; }}
                          >
                            {item.label}
                          </Link>
                        ) : (
                          <button
                            onClick={() => setActivePage(item.label)}
                            style={{
                              display: "inline-flex", alignItems: "center",
                              padding: "8px 11px", fontSize: 14,
                              fontWeight: isActive ? 600 : 500,
                              color: isActive ? "#F5A623" : "#374151",
                              background: "none", border: "none", cursor: "pointer",
                              borderRadius: 8, whiteSpace: "nowrap",
                              transition: "color 0.15s",
                            }}
                            onMouseEnter={e => { if (!isActive) e.currentTarget.style.color = "#2D6A4F"; }}
                            onMouseLeave={e => { if (!isActive) e.currentTarget.style.color = "#374151"; }}
                          >
                            {item.label}
                            <ChevronDown open={activeDropdown === item.label} />
                          </button>
                        )}
                        {hasDropdown && (
                          <DropdownMenu items={item.dropdown!} visible={activeDropdown === item.label} />
                        )}
                      </div>
                    );
                  })}
                </nav>
              )}

              {/* Mobile hamburger */}
              {isMobile && (
                <button
                  onClick={() => setMobileOpen(true)}
                  style={{ padding: 8, background: "none", border: "none", cursor: "pointer", borderRadius: 8 }}
                  aria-label="Open menu"
                >
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                    <path d="M3 6H19M3 11H19M3 16H19" stroke="#1a1a1a" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                </button>
              )}
            </>
          )}
        </div>
      </header>

      {/* Spacer */}
      <div style={{ height: 72 }} aria-hidden="true" />

      {/* Mobile overlay */}
      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}