import { useEffect, useRef } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import heroImage from "../../assets/jiwasa.png";
import { theme } from "../../styles/theme";

// ─── Subcomponentes ─────────────────────────────────────────────────────────

const FloralDivider = () => (
  <div className="flex items-center justify-center gap-3 my-4">
    <div className="h-px flex-1 max-w-[80px]"
      style={{ background: `linear-gradient(to right, transparent, ${theme.floral})` }} />
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M12 2C12 2 8 6 8 10C8 12.2 9.8 14 12 14C14.2 14 16 12.2 16 10C16 6 12 2 12 2Z"
        fill={theme.floral} opacity="0.7"/>
      <path d="M12 14C12 14 8 18 8 22" stroke={theme.floral} strokeWidth="1" opacity="0.5"/>
      <path d="M2 12C2 12 6 8 10 8C12.2 8 14 9.8 14 12C14 14.2 12.2 16 10 16C6 16 2 12 2 12Z"
        fill={theme.floral} opacity="0.5"/>
      <path d="M22 12C22 12 18 8 14 8" stroke={theme.floral} strokeWidth="1" opacity="0.5"/>
    </svg>
    <div className="h-px flex-1 max-w-[80px]"
      style={{ background: `linear-gradient(to left, transparent, ${theme.floral})` }} />
  </div>
);

const LeafDecor = ({ className = "" }: { className?: string }) => (
  <svg className={className} width="60" height="80" viewBox="0 0 60 80" fill="none">
    <path d="M30 75C30 75 10 55 5 35C2 20 15 5 30 5C45 5 58 20 55 35C50 55 30 75 30 75Z"
      fill={theme.leaf} opacity="0.15"/>
    <path d="M30 75C30 75 10 55 5 35C2 20 15 5 30 5"
      stroke={theme.leaf} strokeWidth="1" opacity="0.3" fill="none"/>
    <path d="M30 75L30 15" stroke={theme.leaf} strokeWidth="0.5" opacity="0.4"/>
    <path d="M30 30L18 22" stroke={theme.leaf} strokeWidth="0.5" opacity="0.3"/>
    <path d="M30 40L42 32" stroke={theme.leaf} strokeWidth="0.5" opacity="0.3"/>
    <path d="M30 50L20 44" stroke={theme.leaf} strokeWidth="0.5" opacity="0.3"/>
  </svg>
);

// ─── Estilos (todos centralizados aquí) ─────────────────────────────────────

const S = {
  label: {
    color: theme.colors.primary,
    fontFamily: theme.fonts.sans,
    letterSpacing: "0.4em",
  },
  name: {
    fontFamily: theme.fonts.display,
    fontSize: "clamp(3rem, 10vw, 6rem)",
    color: theme.colors.cream,
    lineHeight: 1.05,
    fontWeight: 400,
    textShadow: "0 2px 20px rgba(0,0,0,0.4)",
  },
  ampersand: {
    color: theme.colors.primary,
    fontFamily: theme.fonts.display,
    fontSize: "1.5rem",
    fontStyle: "italic",
  },
  date: {
    fontFamily: theme.fonts.serif,
    fontSize: "clamp(1rem, 3vw, 1.4rem)",
    color: theme.colors.muted,
    letterSpacing: "0.15em",
  },
  location: {
    fontFamily: theme.fonts.sans,
    fontSize: "0.9rem",
    color: theme.colors.primary,
    letterSpacing: "0.2em",
    textTransform: "uppercase" as const,
  },
  scrollLabel: {
    color: theme.colors.primary,
    fontFamily: theme.fonts.sans,
    fontSize: "0.7rem",
    letterSpacing: "0.3em",
    textTransform: "uppercase" as const,
  },
} as const;

// ─── Componente principal ────────────────────────────────────────────────────

export function HeroSection() {
  const bgRef = useRef<HTMLDivElement>(null);

  // Parallax — "caminar hacia el arco"
  useEffect(() => {
    const handleScroll = () => {
      if (bgRef.current) {
        const y = window.scrollY;
        bgRef.current.style.transform = `scale(1.15) translateY(${y * 0.25}px)`;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">

      {/* Fondo con parallax */}
      <div ref={bgRef} className="absolute inset-0"
        style={{ transform: "scale(1.15)", transformOrigin: "center bottom" }}>
        <ImageWithFallback src={heroImage} alt="Jiwasa"
          className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: theme.heroOverlay }} />
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
        }} />
      </div>

      {/* Hojas decorativas */}
      <LeafDecor className="absolute top-8 left-8 opacity-60 rotate-[-30deg]" />
      <LeafDecor className="absolute top-8 right-8 opacity-60 rotate-[30deg] scale-x-[-1]" />
      <LeafDecor className="absolute bottom-8 left-8 opacity-60 rotate-[150deg]" />
      <LeafDecor className="absolute bottom-8 right-8 opacity-60 rotate-[210deg] scale-x-[-1]" />

      {/* Marco ornamental */}
      <div className="absolute inset-6 border pointer-events-none"
        style={{ borderColor: theme.border, opacity: 0.2 }} />
      <div className="absolute inset-8 border pointer-events-none"
        style={{ borderColor: theme.border, opacity: 0.1 }} />

      {/* Contenido */}
      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">

        <p className="tracking-[0.4em] uppercase mb-6 text-xs" style={S.label}>
          ✦ Juntos por siempre ✦
        </p>

        <h1 style={S.name}>Betania</h1>

        <div className="flex items-center justify-center gap-4 my-2">
          <div className="h-px w-16" style={{ background: theme.colors.primary }} />
          <span style={S.ampersand}>&amp;</span>
          <div className="h-px w-16" style={{ background: theme.colors.primary }} />
        </div>

        <h1 style={S.name} className="mb-8">Joel</h1>

        <FloralDivider />

        <div className="mt-6 mb-4">
          <p style={S.date}>SÁBADO · 1 DE AGOSTO, 2026</p>
        </div>

        <p style={S.location}>JIWASA · ACHOCHALLA</p>

        <div className="mt-16 flex flex-col items-center gap-2 animate-bounce">
          <p style={S.scrollLabel}>Desliza</p>
          <svg width="16" height="24" viewBox="0 0 16 24" fill="none">
            <rect x="1" y="1" width="14" height="22" rx="7"
              stroke={theme.colors.primary} strokeWidth="1.5" opacity="0.6"/>
            <circle cx="8" cy="8" r="2" fill={theme.colors.primary} opacity="0.8">
              <animate attributeName="cy" from="8" to="14" dur="1.5s" repeatCount="indefinite"/>
              <animate attributeName="opacity" from="0.8" to="0" dur="1.5s" repeatCount="indefinite"/>
            </circle>
          </svg>
        </div>
      </div>
    </section>
  );
}