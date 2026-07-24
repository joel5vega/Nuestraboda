import { useState, useEffect } from "react";
import theme from "../../styles/theme";

const WEDDING_DATE = new Date("2026-08-01T12:00:00");

function getTimeLeft() {
  const diff = WEDDING_DATE.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days:    Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours:   Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / 1000 / 60) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

// ─── Opción 3: Minimalista con línea inferior (una sola línea siempre) ────────

function Unit({ value, label, isLast }: { value: number; label: string; isLast: boolean }) {
  const display = String(value).padStart(2, "0");

  return (
    <div style={{
      display:       "flex",
      flexDirection: "column",
      alignItems:    "center",
      gap:           "0.3rem",
      flex:          "1 1 0",
      minWidth:      0,
      padding:       "0 clamp(0.25rem, 2vw, 2.5rem)",
      borderRight:   isLast ? "none" : "1px solid rgba(74,127,165,0.15)",
    }}>
      <span style={{
        fontFamily:    theme.fonts.display,
        fontSize:      "clamp(1.5rem, 7vw, 5rem)",
        color:         theme.colors.cream,
        fontWeight:    400,
        lineHeight:    1,
        letterSpacing: "-0.03em",
        transition:    "opacity 0.2s ease",
        whiteSpace:    "nowrap",
      }}>
        {display}
      </span>

      <div style={{ width: "100%", height: "1px", background: "rgba(74,127,165,0.3)" }} />

      <span style={{
        fontFamily:    theme.fonts.sans,
        fontSize:      "clamp(0.42rem, 1.6vw, 0.58rem)",
        color:         theme.colors.primary,
        letterSpacing: "clamp(0.08em, 0.5vw, 0.3em)",
        textTransform: "uppercase",
        marginTop:     "0.2rem",
        whiteSpace:    "nowrap",
      }}>
        {label}
      </span>
    </div>
  );
}

// ─── Componente principal ────────────────────────────────────────────────────���

export function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());

  useEffect(() => {
    const t = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(t);
  }, []);

  const units = [
    { label: "Días",     value: timeLeft.days    },
    { label: "Horas",    value: timeLeft.hours   },
    { label: "Minutos",  value: timeLeft.minutes },
    { label: "Segundos", value: timeLeft.seconds },
  ];

  return (
    <>
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
      `}</style>

      <section style={{ padding: "1rem 1rem 5rem 1rem", textAlign: "center" }}>

        <h2 style={{
          fontFamily: theme.fonts.display, color: theme.colors.cream,
          fontSize: "clamp(1.5rem, 4vw, 2.2rem)", fontWeight: 400,
          fontStyle: "italic", marginBottom: "3rem",
          animation: "fadeInUp 0.6s ease 0.1s both",
        }}>
          Faltan para el gran día
        </h2>

        {/* nowrap + flex:1 en cada Unit: siempre en una sola línea, sin importar el ancho */}
        <div style={{
          display:        "flex",
          alignItems:     "flex-start",
          justifyContent: "center",
          flexWrap:       "nowrap",
          width:          "100%",
          maxWidth:       "480px",
          margin:         "0 auto",
          animation:      "fadeInUp 0.6s ease 0.2s both",
        }}>
          {units.map((u, i) => (
            <Unit
              key={u.label}
              value={u.value}
              label={u.label}
              isLast={i === units.length - 1}
            />
          ))}
        </div>

        <p style={{
          fontFamily: theme.fonts.serif, fontStyle: "italic",
          color: theme.colors.primary, fontSize: "0.95rem",
          marginTop: "3rem", opacity: 0.75,
          animation: "fadeInUp 0.6s ease 0.3s both",
        }}>
          "Dios todo lo hizo hermoso en su tiempo..." — Eclesiastés 3:11
        </p>

      </section>
    </>
  );
}