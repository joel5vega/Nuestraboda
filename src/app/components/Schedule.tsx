import { useEffect, useRef } from "react";
import { colors, fonts, gradients } from "../../styles/theme";

const scheduleItems = [
  { time: "12:00 PM", event: "Ceremonia",             icon: "rings"    },
  { time: "3:00 PM",  event: "Vals",                  icon: "dance"    },
  { time: "4:30 PM",  event: "Alabanza y adoración",  icon: "worship"  },
  { time: "5:00 PM",  event: "Palabra",               icon: "bible"    },
  { time: "6:00 PM",  event: "Danza",                 icon: "ballet"   },
  { time: "7:00 PM",  event: "Cena",                  icon: "dinner"   },
  { time: "8:00 PM",  event: "Torta",                 icon: "cake"     },
  { time: "8:30 PM",  event: "Despedida",             icon: "car"      },
];

// ─── SVG Icons — line-art minimalista ────────────────────────────────────────

const icons: Record<string, JSX.Element> = {
  rings: (
    <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.6"
      strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
      <circle cx="14" cy="20" r="8" />
      <circle cx="26" cy="20" r="8" />
    </svg>
  ),
  dance: (
    <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.6"
      strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
      <circle cx="13" cy="9" r="3" />
      <path d="M13 12 L13 22 M10 16 L16 16 M13 22 L10 30 M13 22 L16 30" />
      <circle cx="27" cy="9" r="3" />
      <path d="M27 12 Q30 16 27 22 M27 12 Q24 16 27 22 M27 22 L24 30 M27 22 L30 30" />
    </svg>
  ),
  worship: (
    <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.6"
      strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
      <path d="M11 28 L11 18 M9 20 L11 18 L13 20 M11 18 L11 13" />
      <path d="M20 28 L20 15 M18 17 L20 15 L22 17 M20 15 L20 9" />
      <path d="M29 28 L29 18 M27 20 L29 18 L31 20 M29 18 L29 13" />
      <path d="M20 6 L21 8 L23 8 L21.5 9.5 L22.2 12 L20 10.5 L17.8 12 L18.5 9.5 L17 8 L19 8 Z"
        fill="currentColor" stroke="none" opacity="0.5" />
    </svg>
  ),
  bible: (
    <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.6"
      strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
      <rect x="8" y="8" width="24" height="28" rx="2" />
      <path d="M16 8 L16 36" />
      <path d="M20 15 L28 15 M20 20 L28 20 M20 25 L26 25" />
      <path d="M12 13 L12 21 M9 17 L15 17" />
    </svg>
  ),
  ballet: (
    <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.6"
      strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
      <circle cx="20" cy="8" r="3" />
      <path d="M20 11 L20 21" />
      <path d="M12 15 L20 13 L28 15" />
      <path d="M20 21 L14 32 M20 21 L26 32" />
    </svg>
  ),
  dinner: (
    <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.6"
      strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
      <circle cx="20" cy="22" r="10" />
      <path d="M15 10 L15 16" />
      <path d="M13 10 Q13 14 15 14 Q17 14 17 10" />
      <path d="M25 10 L25 32" />
    </svg>
  ),
  cake: (
    <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.6"
      strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
      <rect x="10" y="28" width="20" height="6" rx="1" />
      <rect x="12" y="21" width="16" height="7" rx="1" />
      <rect x="14" y="15" width="12" height="6" rx="1" />
      <path d="M18 15 L18 11 M22 15 L22 11" />
      <circle cx="18" cy="10" r="1.2" fill="currentColor" stroke="none" opacity="0.6" />
      <circle cx="22" cy="10" r="1.2" fill="currentColor" stroke="none" opacity="0.6" />
    </svg>
  ),
  car: (
    <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.6"
      strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
      <path d="M5 24 L10 16 L30 16 L35 24 L35 30 L5 30 Z" />
      <path d="M12 16 L14 10 L26 10 L28 16" />
      <circle cx="12" cy="30" r="3" />
      <circle cx="28" cy="30" r="3" />
      <path d="M15 22 L25 22" strokeDasharray="2 1.5" />
    </svg>
  ),
};

// ─── Styles ──────────────────────────────────────────────────────────────────

const S = {
  section: { padding: "5rem 1.5rem" },
  heading: {
    fontFamily: fonts.display,
    color: colors.textPrimary,
    fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
    fontWeight: 400,
    fontStyle: "italic" as const,
  },
  time: {
    fontFamily: fonts.sans,
    fontSize: "0.68rem",
    letterSpacing: "0.22em",
    color: colors.accentTeal,
    textTransform: "uppercase" as const,
    marginBottom: "0.2rem",
    display: "block",
  },
  eventName: {
    fontFamily: fonts.display,
    color: colors.textPrimary,
    fontSize: "clamp(0.95rem, 2vw, 1.15rem)",
    fontWeight: 400,
    margin: 0,
    fontStyle: "italic" as const,
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
      <div style={{ maxWidth: "720px", margin: "0 auto" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <p style={{
            fontFamily: fonts.sans, fontSize: "0.68rem", letterSpacing: "0.45em",
            textTransform: "uppercase", color: colors.accentTeal, marginBottom: "0.6rem",
          }}>
            Programa
          </p>
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

        {/* Timeline */}
        <div style={{ position: "relative" }}>
          <div style={{
            position: "absolute", left: "50%", top: 0, bottom: 0, width: "1px",
            transform: "translateX(-50%)",
            background: `linear-gradient(to bottom, transparent, ${colors.accentTeal} 6%, ${colors.accentTeal} 94%, transparent)`,
            opacity: 0.35,
          }} />

          <div style={{ display: "flex", flexDirection: "column" }}>
            {scheduleItems.map((item, i) => {
              const isLeft = i % 2 === 0;
              return (
                <div
                  key={item.time}
                  ref={(el) => { itemsRef.current[i] = el; }}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 48px 1fr",
                    alignItems: "center",
                    minHeight: "80px",
                    opacity: 0,
                    transform: "translateY(18px)",
                    transition: `opacity 0.5s ease ${i * 0.08}s, transform 0.5s ease ${i * 0.08}s`,
                  }}
                >
                  <div style={{ textAlign: "right", paddingRight: "1.75rem" }}>
                    {isLeft && <ItemCard item={item} align="right" />}
                  </div>

                  <div style={{ display: "flex", justifyContent: "center",
                    alignItems: "center", zIndex: 2 }}>
                    <div style={{
                      width: "40px", height: "40px", borderRadius: "50%",
                      background: gradients.cardDark,
                      border: `1px solid rgba(74,127,165,0.3)`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: colors.accentTeal, flexShrink: 0,
                    }}>
                      {icons[item.icon]}
                    </div>
                  </div>

                  <div style={{ textAlign: "left", paddingLeft: "1.75rem" }}>
                    {!isLeft && <ItemCard item={item} align="left" />}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function ItemCard({ item, align }: {
  item: (typeof scheduleItems)[0]; align: "left" | "right";
}) {
  return (
    <div style={{ textAlign: align }}>
      <span style={S.time}>{item.time}</span>
      <h3 style={S.eventName}>{item.event}</h3>
    </div>
  );
}