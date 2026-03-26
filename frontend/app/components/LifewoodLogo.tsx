import Link from "next/link";

type LifewoodLogoProps = {
  href?: string;
  width?: number;
  className?: string;
  wordmarkColor?: string;
  iconOnly?: boolean;
};

export default function LifewoodLogo({
  href = "/",
  width = 220,
  className,
  wordmarkColor = "#005C3B",
  iconOnly = false,
}: LifewoodLogoProps) {
  const iconWidth = Math.round(width * 0.11);
  const iconHeight = Math.round(iconWidth * 1.16);
  const gap = Math.max(8, Math.round(width * 0.012));
  const textSize = Math.round(width * 0.235);

  const logo = (
    <span
      className={className}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap,
        lineHeight: 1,
      }}
    >
      <svg
        width={iconWidth}
        height={iconHeight}
        viewBox="0 0 124 280"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        style={{ flexShrink: 0 }}
      >
        <path d="M62 0L124 62V218L62 280L0 218V62L62 0Z" fill="#F4B04A" />
      </svg>

      {!iconOnly && (
        <span
          aria-label="Lifewood"
          style={{
            fontFamily:
              "Arial Black, Arial, Helvetica, system-ui, sans-serif",
            fontWeight: 900,
            fontSize: textSize,
            letterSpacing: "-0.06em",
            color: wordmarkColor,
            textTransform: "none",
            display: "inline-block",
          }}
        >
          Lifewood
        </span>
      )}
    </span>
  );

  return (
    <Link
      href={href}
      aria-label="Lifewood home"
      style={{
        display: "inline-flex",
        alignItems: "center",
        textDecoration: "none",
        flexShrink: 0,
      }}
    >
      {logo}
    </Link>
  );
}
