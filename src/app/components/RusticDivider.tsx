import { useEffect, useRef } from "react";
import { colors, fonts } from "../../styles/theme";

// ─── Tipos ───────────────────────────────────────────────────────────────────
export type RusticVariant =
  | "brush"      // Rough Brush Stroke
  | "twig"       // Twig & Leaf
  | "rope"       // Twisted Rope
  | "diamond"    // Double Rule & Diamond
  | "woodgrain"  // Woodgrain Band
  | "flourish"   // Calligraphic Flourish
  | "stitch"     // Stitched Border
  | "burnt"      // Burnt Edge
  | "stamp"      // Rustic Text Stamp
  | "chevron";   // Chevron Arrows

type Props = {
  variant?: RusticVariant;
  label?:   string;   // usado en "stamp"
};

// ─── Sub-componentes ─────────────────────────────────────────────────────────

const Brush = () => (
  <div style={{ display:"flex", alignItems:"center", justifyContent:"center", margin:"var(--rd-my) 0" }}>
    <svg viewBox="0 0 340 18" fill="none" preserveAspectRatio="none"
      style={{ width:"100%", maxWidth:"500px", height:"18px", color:colors.accentBlue, opacity:0.55 }}>
      <path d="M4 12 C20 8,40 15,65 10 C90 5,115 14,140 9 C165 4,190 13,215 10 C240 7,265 14,290 9 C310 6,325 13,336 10"
        stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" opacity="0.6"/>
      <path d="M4 14 C25 11,50 16,80 12 C110 8,130 15,160 11 C190 7,215 14,250 10 C275 7,305 14,336 12"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.3"/>
    </svg>
  </div>
);

const Twig = () => (
  <div style={{ display:"flex", alignItems:"center", gap:"1rem", margin:"var(--rd-my) 0" }}>
    <div style={{ flex:1, height:"1px", background:`linear-gradient(to right, transparent, ${colors.accentTeal}88, transparent)` }}/>
    <svg viewBox="0 0 80 22" fill="none" style={{ width:"80px", height:"22px", color:colors.accentTeal, flexShrink:0 }}>
      <line x1="40" y1="11" x2="8"  y2="11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.55"/>
      <path d="M18 11 Q22 6 28 9"   stroke="currentColor" strokeWidth="1" fill="none" opacity="0.5" strokeLinecap="round"/>
      <path d="M12 11 Q15 7 19 10"  stroke="currentColor" strokeWidth="1" fill="none" opacity="0.4" strokeLinecap="round"/>
      <line x1="40" y1="11" x2="72" y2="11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.55"/>
      <path d="M62 11 Q58 6 52 9"   stroke="currentColor" strokeWidth="1" fill="none" opacity="0.5" strokeLinecap="round"/>
      <path d="M68 11 Q65 7 61 10"  stroke="currentColor" strokeWidth="1" fill="none" opacity="0.4" strokeLinecap="round"/>
      <circle cx="40" cy="11" r="2.5" fill="currentColor" opacity="0.8"/>
      <path d="M37 11 Q40 5 43 11"  stroke="currentColor" strokeWidth="1" fill="none" opacity="0.6" strokeLinecap="round"/>
    </svg>
    <div style={{ flex:1, height:"1px", background:`linear-gradient(to left, transparent, ${colors.accentTeal}88, transparent)` }}/>
  </div>
);

const Rope = () => (
  <div style={{ display:"flex", alignItems:"center", justifyContent:"center", margin:"var(--rd-my) 0" }}>
    <svg viewBox="0 0 500 14" preserveAspectRatio="none"
      style={{ width:"100%", height:"14px", color:colors.accentBlue, opacity:0.65 }}>
      <path d="M0 7 C10 2,20 12,30 7 C40 2,50 12,60 7 C70 2,80 12,90 7 C100 2,110 12,120 7 C130 2,140 12,150 7 C160 2,170 12,180 7 C190 2,200 12,210 7 C220 2,230 12,240 7 C250 2,260 12,270 7 C280 2,290 12,300 7 C310 2,320 12,330 7 C340 2,350 12,360 7 C370 2,380 12,390 7 C400 2,410 12,420 7 C430 2,440 12,450 7 C460 2,470 12,480 7 C490 2,498 10,500 7"
        stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <path d="M0 7 C10 12,20 2,30 7 C40 12,50 2,60 7 C70 12,80 2,90 7 C100 12,110 2,120 7 C130 12,140 2,150 7 C160 12,170 2,180 7 C190 12,200 2,210 7 C220 12,230 2,240 7 C250 12,260 2,270 7 C280 12,290 2,300 7 C310 12,320 2,330 7 C340 12,350 2,360 7 C370 12,380 2,390 7 C400 12,410 2,420 7 C430 12,440 2,450 7 C460 12,470 2,480 7 C490 12,498 4,500 7"
        stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.5"/>
    </svg>
  </div>
);

const Diamond = () => (
  <div style={{ display:"flex", alignItems:"center", gap:"0.75rem", margin:"var(--rd-my) 0" }}>
    {[0,1].map(side => (
      <div key={side} style={{ flex:1, display:"flex", flexDirection:"column", gap:"5px" }}>
        <span style={{ display:"block", height:"1px", background:colors.accentBlue, opacity:0.5 }}/>
        <span style={{ display:"block", height:"1px", background:colors.accentBlue, opacity:0.25 }}/>
      </div>
    )).reduce((acc, el, i) => i === 0 ? [
      el,
      // diamond center
      <div key="d" style={{
        flexShrink:0, width:"10px", height:"10px",
        background: colors.accentGold,
        transform: "rotate(45deg)",
        boxShadow: `0 0 0 2px ${colors.bgDark}, 0 0 0 3px ${colors.accentGold}`,
      }}/>,
      acc[0],
    ] : acc, [] as JSX.Element[])}
  </div>
);

const Woodgrain = () => (
  <div style={{
    margin: "var(--rd-my) 0",
    height: "8px",
    borderRadius: "4px",
    overflow: "hidden",
    background: `repeating-linear-gradient(
      90deg,
      ${colors.accentTeal}55 0px,
      ${colors.accentBlue}44 3px,
      ${colors.accentTeal}33 4px,
      ${colors.accentBlue}22 7px,
      ${colors.accentTeal}55 8px,
      ${colors.accentBlue}44 12px,
      ${colors.accentTeal}33 14px
    )`,
    opacity: 0.7,
  }}/>
);

const Flourish = () => (
  <div style={{ display:"flex", alignItems:"center", justifyContent:"center", margin:"var(--rd-my) 0" }}>
    <svg viewBox="0 0 280 40" fill="none"
      style={{ width:"100%", maxWidth:"420px", height:"40px", color:colors.accentBlue, opacity:0.65 }}>
      <path d="M10 20 C20 10,35 28,50 18 C60 12,65 22,75 20"
        stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round"/>
      <path d="M10 20 Q5 14 12 10"
        stroke="currentColor" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.5"/>
      <path d="M270 20 C260 10,245 28,230 18 C220 12,215 22,205 20"
        stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round"/>
      <path d="M270 20 Q275 14 268 10"
        stroke="currentColor" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.5"/>
      <path d="M75 20 C95 20,105 10,115 20 C125 30,135 10,140 20 C145 30,155 10,165 20 C175 30,185 20,205 20"
        stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
      <circle cx="140" cy="20" r="3" fill="currentColor" opacity="0.7"/>
    </svg>
  </div>
);

const Stitch = ({ bgColor }: { bgColor: string }) => (
  <div style={{ margin:"var(--rd-my) 0", position:"relative" }}>
    <hr style={{
      border: "none",
      borderTop: `2px dashed ${colors.accentBlue}66`,
    }}/>
    {["left","right"].map(side => (
      <span key={side} style={{
        position:"absolute", top:"50%", transform:"translateY(-50%)",
        [side]: 0,
        fontSize:"10px", color:colors.accentGold,
        background: bgColor,
        padding:"0 0.5rem",
        lineHeight:1,
      }}>✦</span>
    ))}
  </div>
);

const Burnt = () => (
  <div style={{ margin:"var(--rd-my) 0", height:"12px", position:"relative", overflow:"visible" }}>
    <svg viewBox="0 0 800 12" preserveAspectRatio="none"
      style={{ width:"100%", height:"12px", color:colors.accentTerra, opacity:0.5 }}>
      <path d="M0 6 C10 2,18 9,28 5 C38 1,44 8,55 4 C66 0,72 8,82 6 C92 4,98 9,110 5 C122 1,128 8,140 6 C152 4,158 9,170 4 C182 -1,190 8,200 6 C210 4,216 9,228 5 C240 1,248 8,260 4 C272 0,278 8,290 6 C302 4,308 10,320 5 C332 0,340 9,352 6 C364 3,370 10,382 5 C394 0,402 9,414 6 C426 3,432 10,444 5 C456 0,464 9,476 6 C488 3,494 10,506 5 C518 0,526 9,538 6 C550 3,556 10,568 5 C580 0,588 9,600 6 C612 3,618 10,630 5 C642 0,650 9,662 6 C674 3,680 10,692 5 C704 0,712 9,724 6 C736 3,742 10,754 5 C766 0,774 9,786 6 C794 4,798 8,800 6"
        stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  </div>
);

const Stamp = ({ label, bgColor }: { label: string; bgColor: string }) => (
  <div style={{ display:"flex", alignItems:"center", gap:"1rem", margin:"var(--rd-my) 0" }}>
    <div style={{ flex:1, height:"1px", background:colors.accentBlue, opacity:0.3 }}/>
    <div style={{
      flexShrink: 0,
      fontFamily: fonts.display,
      fontSize: "0.6rem",
      textTransform: "uppercase",
      letterSpacing: "0.3em",
      color: colors.accentGold,
      padding: "0.2rem 0.75rem",
      border: `1px solid ${colors.accentGold}55`,
      borderRadius: "2px",
      background: bgColor,
      whiteSpace: "nowrap",
    }}>
      {label}
    </div>
    <div style={{ flex:1, height:"1px", background:colors.accentBlue, opacity:0.3 }}/>
  </div>
);

const Chevron = () => {
  const chevrons = [0.15, 0.3, 0.55, 0.8, 0.55, 0.3, 0.15];
  return (
    <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:0, margin:"var(--rd-my) 0" }}>
      {chevrons.map((op, i) => (
        <span key={i} style={{
          display: "inline-block",
          width: "10px", height: "10px",
          borderRight: `1.5px solid ${colors.accentBlue}`,
          borderBottom: `1.5px solid ${colors.accentBlue}`,
          transform: "rotate(-45deg)",
          margin: "0 3px",
          opacity: op,
        }}/>
      ))}
    </div>
  );
};

// ─── Componente principal ─────────────────────────────────────────────────────
export function RusticDivider({ variant = "flourish", label = "✦" }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  // Detecta el color de fondo del padre para stitch/stamp
  const bgColor = colors.bgDark;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity   = "1";
          el.style.transform = "translateY(0)";
          observer.unobserve(el);
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const map: Record<RusticVariant, JSX.Element> = {
    brush:     <Brush />,
    twig:      <Twig />,
    rope:      <Rope />,
    diamond:   <Diamond />,
    woodgrain: <Woodgrain />,
    flourish:  <Flourish />,
    stitch:    <Stitch bgColor={bgColor} />,
    burnt:     <Burnt />,
    stamp:     <Stamp label={label} bgColor={bgColor} />,
    chevron:   <Chevron />,
  };

  return (
    <div
      ref={ref}
      style={{
        // --rd-my controla el margin interno de cada variante
        // @ts-ignore
        "--rd-my": "0px",
        padding:   "1.5rem 1.5rem",
        opacity:   0,
        transform: "translateY(10px)",
        transition:"opacity 0.8s ease, transform 0.8s ease",
      }}
    >
      {map[variant]}
    </div>
  );
}