import Link from "next/link";
import Image from "next/image";

type LifewoodLogoProps = {
  href?: string;
  width?: number;
  className?: string;
  withBadge?: boolean;
  badgeColor?: string;
  padding?: string;
};

export default function LifewoodLogo({
  href = "/",
  width = 220,
  className,
  withBadge = false,
  badgeColor = "#ffffff",
  padding = "8px 14px",
}: LifewoodLogoProps) {
  const height = Math.round((width * 430) / 1536);

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
      <span
        className={className}
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          lineHeight: 1,
          background: withBadge ? badgeColor : "transparent",
          borderRadius: withBadge ? 16 : 0,
          padding: withBadge ? padding : 0,
        }}
      >
        <Image
          src="/assets/branding/lifewood-logo.svg"
          alt="Lifewood"
          width={width}
          height={height}
          priority
          style={{
            width: "100%",
            height: "auto",
            maxWidth: width,
            display: "block",
          }}
        />
      </span>
    </Link>
  );
}
