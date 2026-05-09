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

// ─── Unidad ───────────────────────────────────────────────────────────────────

function Unit({ value, label }: { value: number; label: string }) {
  const display = String(value).padStart(2, "0");

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.6rem" }}>
      <div style={{
        width:        "clamp(72px, 16vw, 110px)",
        height:       "clamp(80px, 18vw, 120px)",
        borderRadius: "8px",
        background:   "linear-gradient(160deg, #3A5068 0%, #2C3D4F 100%)",
        border:       "1px solid rgba(74,127,165,0.3)",
        boxShadow:    "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)",
        display:      "flex",
        alignItems:   "center",
        justifyContent: "center",
        position:     "relative",
        overflow:     "hidden",
      }}>
        {/* Línea divisoria */}
        <div style={{
          position:   "absolute",
          top: "50%", left: "8px", right: "8px",
          height:     "1px",
          background: "rgba(0,0,0,0.35)",
          zIndex:     2,
        }} />
        {/* Brillo */}
        <div style={{
          position:   "absolute",
          inset: 0,
          background: "linear-gradient(to bottom, rgba(255,255,255,0.05) 0%, transparent 50%)",
          pointerEvents: "none",
        }} />
        <span style={{
          fontFamily:    theme.fonts.display,
          fontSize:      "clamp(2.2rem, 6vw, 3.5rem)",
          color:         theme.colors.cream,
          fontWeight:    400,
          lineHeight:    1,
          letterSpacing: "-0.02em",
          zIndex:        3,
          transition:    "opacity 0.2s ease",
        }}>
          {display}
        </span>
      </div>

      <span style={{
        fontFamily:    theme.fonts.sans,
        fontSize:      "0.62rem",
        color:         theme.colors.primary,
        letterSpacing: "0.25em",
        textTransform: "uppercase",
      }}>
        {label}
      </span>
    </div>
  );
}

// ─── Separador ────────────────────────────────────────────────────────────────

function Dot({ blink }: { blink: boolean }) {
  return (
    <div style={{
      display:       "flex",
      flexDirection: "column",
      gap:           "8px",
      paddingBottom: "1.8rem",
      opacity:       blink ? 1 : 0.15,
      transition:    "opacity 0.4s ease",
    }}>
      {[0, 1].map(i => (
        <div key={i} style={{
          width: "5px", height: "5px",
          borderRadius: "50%",
          background: theme.colors.primary,
        }} />
      ))}
    </div>
  );
}

// ─── Componente principal ─────────────────────────────────────────────────────

export function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());
  const [blink,    setBlink]    = useState(true);

  useEffect(() => {
    const t = setInterval(() => {
      setTimeLeft(getTimeLeft());
      setBlink(v => !v);
    }, 1000);
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

      <section style={{ padding: "5rem 1.5rem", textAlign: "center" }}>

        <p style={{
          color: theme.colors.primary, fontFamily: theme.fonts.sans,
          fontSize: "0.7rem", letterSpacing: "0.45em",
          textTransform: "uppercase", marginBottom: "0.75rem",
          animation: "fadeInUp 0.6s ease both",
        }}>
          ✦ Cuenta Regresiva ✦
        </p>

        <h2 style={{
          fontFamily: theme.fonts.display, color: theme.colors.cream,
          fontSize: "clamp(1.5rem, 4vw, 2.2rem)", fontWeight: 400,
          fontStyle: "italic", marginBottom: "3rem",
          animation: "fadeInUp 0.6s ease 0.1s both",
        }}>
          Faltan para el gran día
        </h2>

        <div style={{
          display: "flex", alignItems: "center",
          justifyContent: "center",
          gap: "clamp(0.5rem, 2vw, 1.5rem)",
          flexWrap: "wrap",
          animation: "fadeInUp 0.6s ease 0.2s both",
        }}>
          {units.map((u, i) => (
            <>
              <Unit key={u.label} value={u.value} label={u.label} />
              {i < units.length - 1 && <Dot key={`dot-${i}`} blink={blink} />}
            </>
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