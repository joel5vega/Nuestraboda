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
    display: "grid",
    gridTemplateColumns: "38px 64px 1fr",
    alignItems: "center",
    columnGap: "0.9rem",
    padding: "0.7rem 0",
  },
  iconCircle: {
    width: "38px",
    height: "38px",
    borderRadius: "50%",
    background: `linear-gradient(135deg, ${colors.accentTeal}, rgba(74,127,165,0.55))`,
    boxShadow: "0 0 0 4px rgba(74,127,165,0.12), 0 2px 8px rgba(0,0,0,0.25)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: colors.cream ?? "#fff",
    flexShrink: 0,
    zIndex: 2,
  },
  time: {
    fontFamily: fonts.sans,
    fontSize: "0.68rem",
    letterSpacing: "0.16em",
    color: colors.accentTeal,
    textTransform: "uppercase" as const,
  },
  eventName: {
    fontFamily: fonts.display,
    color: colors.textPrimary,
    fontSize: "clamp(1rem, 2vw, 1.2rem)",
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
            (e.target as HTMLElement).style.transform = "translateY(0) scale(1)";
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

        {/* Lista vertical simple, una sola columna, todo alineado por grid */}
        <div style={{ position: "relative" }}>
          <div style={{
            position: "absolute", left: "19px", top: "6px", bottom: "6px", width: "1.5px",
            background: colors.accentTeal,
            opacity: 0.45,
          }} />

          {scheduleItems.map((item, i) => (
            <div
              key={item.time + item.event}
              ref={(el) => { itemsRef.current[i] = el; }}
              style={{
                ...S.row,
                opacity: 0,
                transform: "translateY(14px) scale(0.96)",
                transition: `opacity 0.5s cubic-bezier(0.34,1.2,0.64,1) ${i * 0.07}s, transform 0.5s cubic-bezier(0.34,1.2,0.64,1) ${i * 0.07}s`,
              }}
            >
              <div style={S.iconCircle}>
                <item.Icon size={16} />
              </div>
              <span style={S.time}>{item.time}</span>
              <h3 style={S.eventName}>{item.event}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}