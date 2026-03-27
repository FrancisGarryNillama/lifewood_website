"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import LifewoodLogo from "./LifewoodLogo";

interface DropdownItem {
  label: string;
  href: string;
}

interface NavItem {
  label: string;
  href?: string;
  dropdown?: DropdownItem[];
}

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
      { label: "Type A - Data Servicing", href: "/what-we-offer/type-a-data-servicing" },
      { label: "Type B - Horizontal LLM Data", href: "/what-we-offer/type-b-horizontal-llm-data" },
      { label: "Type C - Vertical LLM Data", href: "/what-we-offer/type-c-vertical-llm-data" },
      { label: "Type D - AIGC", href: "/what-we-offer/type-d-aigc" },
    ],
  },
  { label: "Philanthropy & Impact", href: "/philanthropy-and-impact" },
  { label: "Careers", href: "/careers" },
  { label: "Contact Us", href: "/contact-us" },
  { label: "Internal News", href: "/internal-news" },
];

function ChevronDown({ open }: { open: boolean }) {
  return (
    <svg
      width="11"
      height="11"
      viewBox="0 0 12 12"
      fill="none"
      style={{
        display: "inline-block",
        marginLeft: 3,
        transition: "transform 0.2s",
        transform: open ? "rotate(180deg)" : "rotate(0deg)",
      }}
      aria-hidden="true"
    >
      <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function DropdownMenu({ items, visible }: { items: DropdownItem[]; visible: boolean }) {
  return (
    <div
      style={{
        position: "absolute",
        top: "100%",
        left: "50%",
        transform: "translateX(-50%)",
        marginTop: 10,
        minWidth: 230,
        background: "#ffffff",
        border: "1px solid rgba(19,48,32,0.16)",
        borderRadius: 14,
        boxShadow: "0 14px 40px rgba(19,48,32,0.16)",
        zIndex: 100,
        overflow: "hidden",
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
        transition: "opacity 0.15s ease",
      }}
    >
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          style={{
            display: "block",
            padding: "12px 20px",
            fontSize: 14,
            fontWeight: 600,
            color: "#133020",
            textDecoration: "none",
            background: "transparent",
          }}
          onMouseEnter={(event) => {
            event.currentTarget.style.background = "#F9F7F7";
            event.currentTarget.style.color = "#046241";
          }}
          onMouseLeave={(event) => {
            event.currentTarget.style.background = "transparent";
            event.currentTarget.style.color = "#133020";
          }}
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
}

function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    if (!open) {
      setExpanded(null);
    }
  }, [open]);

  if (!open) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 200,
        background: "#F9F7F7",
        overflowY: "auto",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px 24px",
          borderBottom: "1px solid rgba(19,48,32,0.16)",
          background: "#046241",
        }}
      >
        <LifewoodLogo width={180} />
        <button
          onClick={onClose}
          style={{ padding: 8, cursor: "pointer", background: "none", border: "none" }}
          aria-label="Close menu"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M4 4L16 16M16 4L4 16" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" />
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
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                    padding: "12px",
                    fontSize: 16,
                    fontWeight: 700,
                    color: "#133020",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    borderRadius: 10,
                    textAlign: "left",
                  }}
                >
                  {item.label}
                  <ChevronDown open={expanded === item.label} />
                </button>
                {expanded === item.label ? (
                  <div
                    style={{
                      marginLeft: 16,
                      paddingLeft: 16,
                      borderLeft: "2px solid #FFC370",
                      marginBottom: 4,
                    }}
                  >
                    {item.dropdown.map((sub) => (
                      <Link
                        key={sub.href}
                        href={sub.href}
                        onClick={onClose}
                        style={{
                          display: "block",
                          padding: "8px 0",
                          fontSize: 14,
                          fontWeight: 600,
                          color: "#5B6A5E",
                          textDecoration: "none",
                        }}
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </>
            ) : (
              <Link
                href={item.href!}
                onClick={onClose}
                style={{
                  display: "block",
                  padding: "12px",
                  fontSize: 16,
                  fontWeight: 700,
                  color: "#133020",
                  textDecoration: "none",
                  borderRadius: 10,
                }}
              >
                {item.label}
              </Link>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
}

export default function Navbar() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activePage, setActivePage] = useState("Home");
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
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 40,
          background: "#046241",
          boxShadow: scrolled ? "0 10px 28px rgba(19,48,32,0.22)" : "0 1px 0 rgba(255,255,255,0.14)",
          transition: "box-shadow 0.3s",
        }}
      >
        <div
          style={{
            maxWidth: 1400,
            margin: "0 auto",
            padding: "0 40px",
            height: 72,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <LifewoodLogo width={210} />

          {mounted ? (
            <>
              {!isMobile ? (
                <nav style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  {NAV_ITEMS.map((item) => {
                    const isActive = activePage === item.label;
                    const hasDropdown = Boolean(item.dropdown);

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
                              fontWeight: isActive ? 700 : 600,
                              color: isActive ? "#FFC370" : "#ffffff",
                              textDecoration: "none",
                              borderRadius: 8,
                              whiteSpace: "nowrap",
                              transition: "color 0.15s",
                            }}
                            onMouseEnter={(event) => {
                              if (!isActive) event.currentTarget.style.color = "#FFB347";
                            }}
                            onMouseLeave={(event) => {
                              if (!isActive) event.currentTarget.style.color = "#ffffff";
                            }}
                          >
                            {item.label}
                          </Link>
                        ) : (
                          <button
                            onClick={() => setActivePage(item.label)}
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              padding: "8px 11px",
                              fontSize: 14,
                              fontWeight: isActive ? 700 : 600,
                              color: isActive ? "#FFC370" : "#ffffff",
                              background: "none",
                              border: "none",
                              cursor: "pointer",
                              borderRadius: 8,
                              whiteSpace: "nowrap",
                              transition: "color 0.15s",
                            }}
                            onMouseEnter={(event) => {
                              if (!isActive) event.currentTarget.style.color = "#FFB347";
                            }}
                            onMouseLeave={(event) => {
                              if (!isActive) event.currentTarget.style.color = "#ffffff";
                            }}
                          >
                            {item.label}
                            <ChevronDown open={activeDropdown === item.label} />
                          </button>
                        )}
                        {hasDropdown ? (
                          <DropdownMenu items={item.dropdown!} visible={activeDropdown === item.label} />
                        ) : null}
                      </div>
                    );
                  })}
                </nav>
              ) : (
                <button
                  onClick={() => setMobileOpen(true)}
                  style={{ padding: 8, background: "none", border: "none", cursor: "pointer", borderRadius: 8 }}
                  aria-label="Open menu"
                >
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                    <path d="M3 6H19M3 11H19M3 16H19" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                </button>
              )}
            </>
          ) : null}
        </div>
      </header>

      <div style={{ height: 72 }} aria-hidden="true" />
      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
