import { useEffect, useRef } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import heroImage from "../../assets/jiwasa.png";   // ← .jpg no .png
import { colors, fonts, gradients } from "../../styles/theme";

const FloralDivider = () => (
  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.75rem", margin: "1rem 0" }}>
    <div style={{ height: "1px", flex: 1, maxWidth: "80px", background: `linear-gradient(to right, transparent, ${colors.accentBlue})` }} />
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M12 2C12 2 8 6 8 10C8 12.2 9.8 14 12 14C14.2 14 16 12.2 16 10C16 6 12 2 12 2Z" fill={colors.accentBlue} opacity="0.7"/>
      <path d="M12 14C12 14 8 18 8 22" stroke={colors.accentBlue} strokeWidth="1" opacity="0.5"/>
      <path d="M2 12C2 12 6 8 10 8C12.2 8 14 9.8 14 12C14 14.2 12.2 16 10 16C6 16 2 12 2 12Z" fill={colors.accentBlue} opacity="0.5"/>
      <path d="M22 12C22 12 18 8 14 8" stroke={colors.accentBlue} strokeWidth="1" opacity="0.5"/>
    </svg>
    <div style={{ height: "1px", flex: 1, maxWidth: "80px", background: `linear-gradient(to left, transparent, ${colors.accentBlue})` }} />
  </div>
);

const LeafDecor = ({ style = {} }: { style?: React.CSSProperties }) => (
  <svg style={style} width="60" height="80" viewBox="0 0 60 80" fill="none">
    <path d="M30 75C30 75 10 55 5 35C2 20 15 5 30 5C45 5 58 20 55 35C50 55 30 75 30 75Z" fill={colors.accentTeal} opacity="0.15"/>
    <path d="M30 75C30 75 10 55 5 35C2 20 15 5 30 5" stroke={colors.accentTeal} strokeWidth="1" opacity="0.3" fill="none"/>
    <path d="M30 75L30 15"  stroke={colors.accentTeal} strokeWidth="0.5" opacity="0.4"/>
    <path d="M30 30L18 22"  stroke={colors.accentTeal} strokeWidth="0.5" opacity="0.3"/>
    <path d="M30 40L42 32"  stroke={colors.accentTeal} strokeWidth="0.5" opacity="0.3"/>
    <path d="M30 50L20 44"  stroke={colors.accentTeal} strokeWidth="0.5" opacity="0.3"/>
  </svg>
);

const S = {
  label:     { color: colors.accentBlue,  fontFamily: fonts.sans,    letterSpacing: "0.4em",  fontSize: "0.7rem",  textTransform: "uppercase" as const },
  name:      { fontFamily: fonts.display, fontSize: "clamp(3rem, 10vw, 6rem)", color: colors.textPrimary, lineHeight: 1.05, fontWeight: 400, textShadow: "0 2px 20px rgba(0,0,0,0.4)" },
  ampersand: { color: colors.accentBlue,  fontFamily: fonts.display, fontSize: "1.5rem", fontStyle: "italic" as const },
  date:      { fontFamily: fonts.serif,   fontSize: "clamp(1rem, 3vw, 1.4rem)", color: colors.accentBlue, letterSpacing: "0.15em" },
  location:  { fontFamily: fonts.sans,    fontSize: "0.9rem", color: colors.accentBlue, letterSpacing: "0.2em", textTransform: "uppercase" as const },
  scrollLbl: { color: colors.accentBlue,  fontFamily: fonts.sans, fontSize: "0.7rem", letterSpacing: "0.3em", textTransform: "uppercase" as const },
} as const;

const INTRO_DURATION = 8000;
const SCALE_START    = 1.22;
const SCALE_END      = 1.06;
const Y_START        = 40;
const Y_END          = 0;

type Props = { animate: boolean };

export function HeroSection({ animate }: Props) {
  const bgRef      = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const animRef    = useRef<number | null>(null);

  useEffect(() => {
    if (!animate) return;

    let startTime: number | null = null;

    const introAnimate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed  = timestamp - startTime;
      const progress = Math.min(elapsed / INTRO_DURATION, 1);

      const ease       = 1 - Math.pow(1 - progress, 5);
      const scale      = SCALE_START + (SCALE_END - SCALE_START) * ease;
      const translateY = Y_START     + (Y_END - Y_START)          * ease;

      if (bgRef.current) {
        bgRef.current.style.transform = `scale(${scale}) translateY(${translateY}px)`;
      }

      if (contentRef.current) {
        const cp    = Math.max(0, (progress - 0.25) / 0.75);
        const cEase = 1 - Math.pow(1 - cp, 3);
        contentRef.current.style.opacity   = String(cEase);
        contentRef.current.style.transform = `translateY(${(1 - cEase) * 24}px)`;
      }

      if (progress < 1) {
        animRef.current = requestAnimationFrame(introAnimate);
      } else {
        window.addEventListener("scroll", handleScroll, { passive: true });
      }
    };

    const handleScroll = () => {
      if (!bgRef.current) return;
      const y     = window.scrollY;
      const scale = SCALE_END + y * 0.00015;
      bgRef.current.style.transform = `scale(${scale}) translateY(${y * 0.18}px)`;
    };

    animRef.current = requestAnimationFrame(introAnimate);

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [animate]);

  return (
    <>
      <style>{`
        @keyframes scrollBounce {
          0%, 100% { transform: translateY(0);   opacity: 1;   }
          50%       { transform: translateY(6px); opacity: 0.4; }
        }
      `}</style>

      <section style={{
        position:       "relative",
        minHeight:      "100svh",
        display:        "flex",
        flexDirection:  "column",
        alignItems:     "center",
        justifyContent: "center",
        overflow:       "hidden",
      }}>

        {/* Fondo con zoom */}
        <div
          ref={bgRef}
          style={{
            position:        "absolute",
            inset:           0,
            willChange:      "transform",
            transform:       `scale(${SCALE_START}) translateY(${Y_START}px)`,
            transformOrigin: "center center",
          }}
        >
          <ImageWithFallback
            src={heroImage}
            alt="Jiwasa - Achocalla"
            className="w-full h-full object-cover"
            style={{ objectPosition: "center 55%" }}
          />
          <div style={{ position: "absolute", inset: 0, background: gradients.heroOverlay }} />
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 70% 70% at 50% 60%, transparent 30%, rgba(12,22,34,0.65) 100%)" }} />
          <div style={{ position: "absolute", inset: 0, opacity: 0.15, backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`, backgroundRepeat: "repeat" }} />
        </div>

        {/* Hojas decorativas */}
        <LeafDecor style={{ position: "absolute", top: "2rem",    left:  "2rem",  opacity: 0.5, transform: "rotate(-30deg)" }} />
        <LeafDecor style={{ position: "absolute", top: "2rem",    right: "2rem",  opacity: 0.5, transform: "rotate(30deg) scaleX(-1)" }} />
        <LeafDecor style={{ position: "absolute", bottom: "2rem", left:  "2rem",  opacity: 0.4, transform: "rotate(150deg)" }} />
        <LeafDecor style={{ position: "absolute", bottom: "2rem", right: "2rem",  opacity: 0.4, transform: "rotate(210deg) scaleX(-1)" }} />

        {/* Marco ornamental */}
        <div style={{ position: "absolute", inset: "1.5rem", border: `1px solid ${colors.accentBlue}`, opacity: 0.18, pointerEvents: "none" }} />
        <div style={{ position: "absolute", inset: "2.2rem", border: `1px solid ${colors.accentBlue}`, opacity: 0.08, pointerEvents: "none" }} />

        {/* Contenido */}
        <div
          ref={contentRef}
          style={{
            position:  "relative",
            zIndex:    10,
            textAlign: "center",
            padding:   "0 1.5rem",
            maxWidth:  "780px",
            margin:    "0 auto",
            opacity:   0,
            transform: "translateY(24px)",
          }}
        >
          <p style={{ ...S.label, marginBottom: "1.5rem" }}>✦ Juntos por siempre ✦</p>

          <h1 style={S.name}>Joel</h1>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem", margin: "0.5rem 0" }}>
            <div style={{ height: "1px", width: "60px", background: colors.accentBlue }} />
            <span style={S.ampersand}>&amp;</span>
            <div style={{ height: "1px", width: "60px", background: colors.accentBlue }} />
          </div>

          <h1 style={{ ...S.name, marginBottom: "2rem" }}>Betania</h1>

          <FloralDivider />

          <div style={{ marginTop: "1.5rem", marginBottom: "1rem" }}>
            <p style={S.date}>SÁBADO · 1 DE AGOSTO, 2026</p>
          </div>

          <p style={S.location}>JIWASA · ACHOCHALLA</p>

          {/* Scroll indicator — aparece después de que termina la intro */}
          <div style={{
            marginTop:  "4rem",
            display:    "flex",
            flexDirection: "column",
            alignItems: "center",
            gap:        "0.5rem",
            animation:  animate ? "scrollBounce 2s ease-in-out 8s infinite" : "none",
          }}>
            <p style={S.scrollLbl}>Desliza</p>
            <svg width="16" height="24" viewBox="0 0 16 24" fill="none">
              <rect x="1" y="1" width="14" height="22" rx="7" stroke={colors.accentBlue} strokeWidth="1.5" opacity="0.6"/>
              <circle cx="8" cy="8" r="2" fill={colors.accentBlue} opacity="0.8">
                <animate attributeName="cy"      from="8" to="14" dur="1.5s" repeatCount="indefinite"/>
                <animate attributeName="opacity" from="0.8" to="0" dur="1.5s" repeatCount="indefinite"/>
              </circle>
            </svg>
          </div>
        </div>

      </section>
    </>
  );
}