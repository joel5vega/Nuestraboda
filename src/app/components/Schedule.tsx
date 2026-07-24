import { useEffect, useRef } from "react";
import { colors, fonts, gradients } from "../../styles/theme";
import { FaBookOpen, FaUtensils, FaCarSide } from "react-icons/fa6";
import { GiBigDiamondRing, GiMusicalNotes, GiCakeSlice } from "react-icons/gi";
import type { IconType } from "react-icons";

// ─── Solo los momentos más importantes del día ────────────────────────────────
const scheduleItems: { time: string; event: string; Icon: IconType }[] = [
  { time: "12:00 PM", event: "Ceremonia", Icon: GiBigDiamondRing },
  { time: "3:00 PM",  event: "Vals",      Icon: GiMusicalNotes   },
  { time: "5:00 PM",  event: "Palabra",   Icon: FaBookOpen       },
  { time: "7:00 PM",  event: "Cena",      Icon: FaUtensils       },
  { time: "8:00 PM",  event: "Torta",     Icon: GiCakeSlice      },
  { time: "8:30 PM",  event: "Despedida", Icon: FaCarSide        },
];

// ─── Styles ──────────────────────────────────────────────────────────────────

const S = {
  section: { padding: "0rem 1rem 3.5rem 1rem" },
  heading: {
    fontFamily: fonts.display,
    color: colors.textPrimary,
    fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
    fontWeight: 400,
    fontStyle: "italic" as const,
  },
  row: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    padding: "0.65rem 0",
  },
  iconCircle: {
    width: "38px",
    height: "38px",
    borderRadius: "50%",
    background: gradients.cardDark,
    border: "1px solid rgba(74,127,165,0.3)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: colors.accentTeal,
    flexShrink: 0,
    zIndex: 2,
  },
  time: {
    fontFamily: fonts.sans,
    fontSize: "0.68rem",
    letterSpacing: "0.18em",
    color: colors.accentTeal,
    textTransform: "uppercase" as const,
    flexShrink: 0,
    minWidth: "70px",
  },
  eventName: {
    fontFamily: fonts.display,
    color: colors.textPrimary,
    fontSize: "clamp(0.95rem, 2vw, 1.15rem)",
    fontWeight: 400,
    fontStyle: "italic" as const,
    margin: 0,
  },
} as const;

// ─── Component ───────────────────────────────────────────────────────────────

export function Schedule() {
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            (e.target as HTMLElement).style.opacity = "1";
            (e.target as HTMLElement).style.transform = "translateY(0)";
            observer.unobserve(e.target);
          }
        }),
      { threshold: 0.15 }
    );
    itemsRef.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section style={S.section}>
      <div style={{ maxWidth: "420px", margin: "0 auto" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "1.75rem" }}>
          <h2 style={S.heading}>El día en detalle</h2>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center",
            gap: "0.75rem", marginTop: "1rem" }}>
            <div style={{ height: "1px", width: "50px", background: gradients.lineLeft }} />
            <svg width="8" height="8" viewBox="0 0 8 8">
              <circle cx="4" cy="4" r="2.8" fill={colors.accentTeal} opacity="0.5" />
            </svg>
            <div style={{ height: "1px", width: "50px", background: gradients.lineRight }} />
          </div>
        </div>

        {/* Lista vertical simple, una sola columna */}
        <div style={{ position: "relative" }}>
          <div style={{
            position: "absolute", left: "19px", top: 0, bottom: 0, width: "1px",
            background: `linear-gradient(to bottom, transparent, ${colors.accentTeal} 6%, ${colors.accentTeal} 94%, transparent)`,
            opacity: 0.3,
          }} />

          {scheduleItems.map((item, i) => (
            <div
              key={item.time + item.event}
              ref={(el) => { itemsRef.current[i] = el; }}
              style={{
                ...S.row,
                opacity: 0,
                transform: "translateY(14px)",
                transition: `opacity 0.45s ease ${i * 0.06}s, transform 0.45s ease ${i * 0.06}s`,
              }}
            >
              <div style={S.iconCircle}>
                <item.Icon size={16} color={colors.accentTeal} />
              </div>
              <div style={{ display: "flex", alignItems: "baseline", gap: "0.6rem", flexWrap: "wrap" }}>
                <span style={S.time}>{item.time}</span>
                <h3 style={S.eventName}>{item.event}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}