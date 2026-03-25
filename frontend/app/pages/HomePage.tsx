import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Home",
};

// ── Hero ─────────────────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section className="relative w-full min-h-[calc(100vh-72px)] flex items-center justify-center overflow-hidden bg-[#f2f2f0]">
      {/* Abstract SVG background — mimics the grayscale architectural curves from the reference */}
      <div className="absolute inset-0 pointer-events-none select-none" aria-hidden="true">
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 1440 900"
          fill="none"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Large sweeping arc – top left */}
          <path
            d="M -100 700 Q 300 -200 900 400 Q 1200 800 1600 300"
            stroke="#c8c8c4"
            strokeWidth="1.2"
            fill="none"
            opacity="0.6"
          />
          <path
            d="M -100 650 Q 250 -150 850 380 Q 1150 750 1600 250"
            stroke="#c0c0bc"
            strokeWidth="0.8"
            fill="none"
            opacity="0.5"
          />
          <path
            d="M -200 800 Q 400 100 1000 500 Q 1300 750 1700 200"
            stroke="#b8b8b4"
            strokeWidth="0.6"
            fill="none"
            opacity="0.4"
          />

          {/* Bottom-left organic shape */}
          <path
            d="M -80 900 Q 100 600 300 750 Q 450 850 400 1000"
            stroke="#a8a8a4"
            strokeWidth="2"
            fill="none"
            opacity="0.35"
          />
          <path
            d="M -120 950 Q 80 650 280 800 Q 420 900 370 1050"
            stroke="#b0b0ac"
            strokeWidth="1.2"
            fill="none"
            opacity="0.25"
          />

          {/* Right edge subtlety */}
          <path
            d="M 1300 -50 Q 1500 200 1380 500 Q 1260 800 1450 950"
            stroke="#d0d0cc"
            strokeWidth="1"
            fill="none"
            opacity="0.4"
          />
          <path
            d="M 1350 -100 Q 1560 150 1420 460 Q 1300 760 1490 920"
            stroke="#c8c8c4"
            strokeWidth="0.6"
            fill="none"
            opacity="0.3"
          />

          {/* Centre horizon accent */}
          <path
            d="M 200 480 Q 600 420 900 460 Q 1150 490 1400 440"
            stroke="#d8d8d4"
            strokeWidth="0.8"
            fill="none"
            opacity="0.5"
          />
        </svg>
      </div>

      {/* Hero content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <h1
          className="text-[clamp(2.4rem,6vw,4.5rem)] font-bold leading-[1.1] tracking-tight text-gray-900 mb-10"
          style={{ fontFamily: "'Georgia', serif" }}
        >
          The world&rsquo;s leading provider
          <br />
          of AI-powered data solutions.
        </h1>

        <Link
          href="/contact-us"
          className="inline-flex items-center gap-2.5 bg-white text-gray-900 px-7 py-3.5 rounded-full text-base font-medium shadow-sm border border-gray-200 hover:shadow-md hover:border-gray-300 transition-all duration-200 group"
        >
          Contact Us
          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gray-900 text-white group-hover:bg-[#2D6A4F] transition-colors duration-200">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path d="M2.5 6H9.5M6.5 3L9.5 6L6.5 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </Link>
      </div>
    </section>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <>
      <HeroSection />
      {/* Additional sections (Stats, Services, About, etc.) will be added here */}
    </>
  );
}