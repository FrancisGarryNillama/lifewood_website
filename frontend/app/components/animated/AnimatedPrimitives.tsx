"use client";

import {
  type CSSProperties,
  type ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import { Slot } from "@radix-ui/react-slot";
import * as AspectRatio from "@radix-ui/react-aspect-ratio";
import { animated, useSpring } from "@react-spring/web";
import { motion } from "framer-motion";

type InViewOptions = {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
};

export function useIntersectionReveal<T extends HTMLElement>({
  threshold = 0.2,
  rootMargin = "0px 0px -10% 0px",
  once = true,
}: InViewOptions = {}) {
  const ref = useRef<T | null>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setIsInView(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [once, rootMargin, threshold]);

  return { ref, isInView };
}

type AnimatedSurfaceProps = {
  asChild?: boolean;
  children: ReactNode;
  style?: CSSProperties;
  className?: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
};

export function AnimatedSurface({
  asChild,
  children,
  style,
  className,
  onMouseEnter,
  onMouseLeave,
}: AnimatedSurfaceProps) {
  const Comp = asChild ? Slot : "div";

  return (
    <Comp
      className={className}
      style={style}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </Comp>
  );
}

type AnimatedImageCardProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  delay?: number;
  ratio?: number;
  hoverScale?: number;
  frameStyle?: CSSProperties;
  imageStyle?: CSSProperties;
  overlay?: ReactNode;
  threshold?: number;
  rotateY?: number;
};

export function AnimatedImageCard({
  src,
  alt,
  width,
  height,
  delay = 0,
  ratio,
  hoverScale = 1.035,
  frameStyle,
  imageStyle,
  overlay,
  threshold,
  rotateY = 0,
}: AnimatedImageCardProps) {
  const { ref, isInView } = useIntersectionReveal<HTMLDivElement>({ threshold });
  const [hovered, setHovered] = useState(false);

  const springStyle = useSpring({
    transform: hovered
      ? `scale(${hoverScale}) translateY(-10px)`
      : isInView
        ? "scale(1) translateY(0px)"
        : "scale(0.975) translateY(0px)",
    boxShadow: hovered
      ? "0 28px 60px rgba(15, 23, 42, 0.18)"
      : "0 18px 42px rgba(15, 23, 42, 0.10)",
    config: { mass: 1.2, tension: 220, friction: 22 },
  });

  const resolvedRatio = useMemo(() => ratio ?? width / height, [height, ratio, width]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9, y: 36, rotateY }}
      animate={isInView ? { opacity: 1, scale: 1, y: 0, rotateY: 0 } : undefined}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      style={{ perspective: 1400 }}
    >
      <animated.div style={springStyle}>
        <AnimatedSurface
          style={{
            position: "relative",
            overflow: "hidden",
            borderRadius: 28,
            border: "1px solid rgba(229, 231, 235, 0.9)",
            background: "#f8fafc",
            ...frameStyle,
          }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <AspectRatio.Root ratio={resolvedRatio}>
            <Image
              src={src}
              alt={alt}
              width={width}
              height={height}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
                ...imageStyle,
              }}
            />
            {overlay ? (
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: "flex-end",
                  pointerEvents: "none",
                }}
              >
                {overlay}
              </div>
            ) : null}
          </AspectRatio.Root>
        </AnimatedSurface>
      </animated.div>
    </motion.div>
  );
}

type AnimatedYouTubeEmbedProps = {
  videoId: string;
  title: string;
  delay?: number;
  caption?: ReactNode;
  threshold?: number;
};

export function AnimatedYouTubeEmbed({
  videoId,
  title,
  delay = 0,
  caption,
  threshold,
}: AnimatedYouTubeEmbedProps) {
  const { ref, isInView } = useIntersectionReveal<HTMLDivElement>({ threshold });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <AnimatedSurface
        style={{
          borderRadius: 28,
          overflow: "hidden",
          background: "#0f172a",
          border: "1px solid rgba(255,255,255,0.06)",
          boxShadow: "0 24px 60px rgba(15, 23, 42, 0.24)",
        }}
      >
        {caption}
        <AspectRatio.Root ratio={16 / 9}>
          <iframe
            src={`https://www.youtube.com/embed/${videoId}`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            style={{ width: "100%", height: "100%", border: 0, display: "block" }}
          />
        </AspectRatio.Root>
      </AnimatedSurface>
    </motion.div>
  );
}

type AnimatedVideoPlayerProps = {
  src: string;
  title: string;
  delay?: number;
  rotateY?: number;
  caption?: ReactNode;
};

export function AnimatedVideoPlayer({
  src,
  title,
  delay = 0,
  rotateY = 14,
  caption,
}: AnimatedVideoPlayerProps) {
  const { ref, isInView } = useIntersectionReveal<HTMLDivElement>({ threshold: 0.25 });
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [hovered, setHovered] = useState(false);

  const buttonSpring = useSpring({
    transform: hovered ? "scale(1.05)" : "scale(1)",
    boxShadow: hovered
      ? "0 16px 32px rgba(245, 166, 35, 0.22)"
      : "0 10px 20px rgba(15, 23, 42, 0.14)",
    config: { mass: 1, tension: 240, friction: 18 },
  });

  const togglePlayback = async () => {
    const node = videoRef.current;
    if (!node) return;

    if (node.paused) {
      await node.play();
      setIsPlaying(true);
      return;
    }

    node.pause();
    setIsPlaying(false);
  };

  const toggleMute = () => {
    const node = videoRef.current;
    if (!node) return;

    node.muted = !node.muted;
    setIsMuted(node.muted);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.92, rotateY, y: 36 }}
      animate={isInView ? { opacity: 1, scale: 1, rotateY: 0, y: 0 } : undefined}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      style={{ perspective: 1400 }}
    >
      <AnimatedSurface
        style={{
          borderRadius: 28,
          overflow: "hidden",
          background: "#111827",
          boxShadow: "0 24px 60px rgba(15, 23, 42, 0.20)",
        }}
      >
        {caption}
        <AspectRatio.Root ratio={16 / 9}>
          <video
            ref={videoRef}
            src={src}
            title={title}
            controls
            playsInline
            preload="metadata"
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            style={{ display: "block", width: "100%", height: "100%", background: "#000" }}
          />
        </AspectRatio.Root>
        <div
          style={{
            display: "flex",
            gap: 12,
            padding: "18px 20px 22px",
            background: "linear-gradient(180deg, rgba(17,24,39,0.9) 0%, rgba(17,24,39,1) 100%)",
          }}
        >
          <animated.button
            type="button"
            style={{
              ...buttonSpring,
              border: "none",
              borderRadius: 999,
              background: "#F5A623",
              color: "#fff",
              padding: "11px 18px",
              fontSize: 13,
              fontWeight: 700,
              cursor: "pointer",
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={togglePlayback}
          >
            {isPlaying ? "Pause Video" : "Play Video"}
          </animated.button>
          <animated.button
            type="button"
            style={{
              ...buttonSpring,
              border: "1px solid rgba(255,255,255,0.14)",
              borderRadius: 999,
              background: "rgba(255,255,255,0.06)",
              color: "#e5e7eb",
              padding: "11px 18px",
              fontSize: 13,
              fontWeight: 700,
              cursor: "pointer",
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={toggleMute}
          >
            {isMuted ? "Unmute" : "Mute"}
          </animated.button>
        </div>
      </AnimatedSurface>
    </motion.div>
  );
}
