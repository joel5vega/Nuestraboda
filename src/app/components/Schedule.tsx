import { useEffect, useRef } from "react";
import { colors, fonts, gradients } from "../../styles/theme";

const scheduleItems = [
  { time: "12:00 PM",  event: "Ceremonia",            desc: "Unión sagrada ante Dios y sus seres queridos",      icon: "✝️" },
  // { time: "2:00 PM",  event: "Primer refrigerio",              desc: "Un momento para compartir y convivir",              icon: "✦"  },
  // { time: "2:00 PM",  event: "Sesión de fotos",                desc: "Captura de los momentos más especiales",            icon: "◈"  },
  { time: "3:00 PM",  event: "Vals",     desc: "El momento más esperado",                           icon: "✿"  },
  // { time: "3:30 PM",  event: "Palabras de agradecimiento",     desc: "Gracias por acompañarnos en este día tan especial", icon: "◇"  },
  // { time: "3:30 PM",  event: "1ra Recepción de regalos",       desc: "Gracias por sus regalos y presentes",               icon: "❦"  },
  { time: "4:30 PM",  event: "Alabanza y adoración",           desc: "Tiempo de oración y alabanza al Señor",             icon: "◉"  },
  { time: "5:00 PM",  event: "Palabra",              desc: "Compartiendo la palabra de Dios",                   icon: "📖" },
  { time: "6:00 PM",  event: "Danza",                desc: "A gozarnos delante del Señor",                      icon: "🎶" },
  // { time: "6:30 PM",  event: "Recepción de regalos",           desc: "Recepción de regalos durante la danza",             icon: "❦"  },
  { time: "7:00 PM",  event: "Cena",                           desc: "Disfrutamos un delicioso banquete",                  icon: "🍽️" },
  // { time: "7:00 PM",  event: "Especiales por ministerios",     desc: "Presentaciones del ministerio de evangelismo",      icon: "◉"  },
  // { time: "8:00 PM",  event: "Dinámicas de solteros",          desc: "Momentos de diversión para los solteros",           icon: "✦"  },
  { time: "8:00 PM",  event: "Torta",                          desc: "Compartimos una rica torta",                        icon: "🎂" },
  { time: "8:30 PM",  event: "Despedida",         desc: "Hasta pronto y que Dios los bendiga",               icon: "✿"  },
];

// ─── Estilos ─────────────────────────────────────────────────────────────────

const S = {
  section:    {  padding: "5rem 1.5rem" },
  label:      { color: colors.accentBlue, fontFamily: fonts.sans, fontSize: "0.7rem", letterSpacing: "0.45em", textTransform: "uppercase" as const, marginBottom: "0.75rem" },
  heading:    { fontFamily: fonts.display, color: colors.textPrimary, fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 400, fontStyle: "italic" as const },
  time:       { fontFamily: fonts.sans, fontSize: "0.72rem", letterSpacing: "0.2em", color: colors.accentTeal, textTransform: "uppercase" as const, marginBottom: "0.25rem" },
  eventName:  { fontFamily: fonts.display, color: colors.textPrimary, fontSize: "clamp(1rem, 2.5vw, 1.2rem)", fontWeight: 400, margin: "0 0 0.3rem" },
  desc:       { fontFamily: fonts.serif, fontStyle: "italic" as const, color: colors.accentBlue, fontSize: "0.9rem", lineHeight: 1.6, opacity: 0.85 },
  cardLeft:   { textAlign: "right" as const, paddingRight: "2rem" },
  cardRight:  { textAlign: "left"  as const, paddingLeft:  "2rem" },
} as const;

// ─── Componente ──────────────────────────────────────────────────────────────

export function Schedule() {
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) {
          (e.target as HTMLElement).style.opacity   = "1";
          (e.target as HTMLElement).style.transform = "translateY(0)";
          observer.unobserve(e.target);
        }
      }),
      { threshold: 0.2 }
    );
    itemsRef.current.forEach(el => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section style={S.section}>
      <div style={{ maxWidth: "780px", margin: "0 auto" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <h2 style={S.heading}>El día en detalle</h2>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.75rem", marginTop: "1rem" }}>
            <div style={{ height: "1px", width: "60px", background: gradients.lineLeft }} />
            <svg width="10" height="10" viewBox="0 0 10 10">
              <circle cx="5" cy="5" r="3.5" fill={colors.accentTeal} opacity="0.6"/>
            </svg>
            <div style={{ height: "1px", width: "60px", background: gradients.lineRight }} />
          </div>
        </div>

        {/* Timeline */}
        <div style={{ position: "relative" }}>

          {/* Línea central */}
          <div style={{
            position:   "absolute",
            left:       "50%",
            top:        0,
            bottom:     0,
            width:      "1px",
            transform:  "translateX(-50%)",
            background: `linear-gradient(to bottom, transparent, ${colors.accentTeal} 8%, ${colors.accentTeal} 92%, transparent)`,
          }} />

          <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
            {scheduleItems.map((item, i) => {
              const isLeft = i % 2 === 0;
              return (
                <div
                  key={item.time}
                  ref={el => { itemsRef.current[i] = el; }}
                  style={{
                    display:       "grid",
                    gridTemplateColumns: "1fr 40px 1fr",
                    alignItems:    "center",
                    minHeight:     "90px",
                    opacity:       0,
                    transform:     "translateY(20px)",
                    transition:    `opacity 0.55s ease ${i * 0.07}s, transform 0.55s ease ${i * 0.07}s`,
                  }}
                >
                  {/* Columna izquierda */}
                  <div style={isLeft ? S.cardLeft : {}}>
                    {isLeft && <ItemCard item={item} align="right" />}
                  </div>

                  {/* Nodo central */}
                  <div style={{ display: "flex", justifyContent: "center", alignItems: "center", zIndex: 2 }}>
                    <div style={{
                      width:        "38px",
                      height:       "38px",
                      borderRadius: "50%",
                      background:   gradients.cardDark,
                      border:       `2px solid ${colors.accentTeal}`,
                      boxShadow:    `0 0 16px rgba(74,127,165,0.25)`,
                      display:      "flex",
                      alignItems:   "center",
                      justifyContent: "center",
                      fontSize:     "1rem",
                      flexShrink:   0,
                    }}>
                      {item.icon}
                    </div>
                  </div>

                  {/* Columna derecha */}
                  <div style={!isLeft ? S.cardRight : {}}>
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

// ─── Sub-componente tarjeta ──────────────────────────────────────────────────

function ItemCard({ item, align }: { item: typeof scheduleItems[0]; align: "left" | "right" }) {
  return (
    <div style={{
      background:   "rgba(255,255,255,0.04)",
      border:       `1px solid rgba(74,127,165,0.15)`,
      borderRadius: "6px",
      padding:      "0.9rem 1.1rem",
      textAlign:    align,
    }}>
      <p style={S.time}>{item.time}</p>
      <h3 style={S.eventName}>{item.event}</h3>
      {/* <p style={S.desc}>{item.desc}</p> */}
    </div>
  );
}