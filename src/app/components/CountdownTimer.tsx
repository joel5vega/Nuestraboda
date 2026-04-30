import { useState, useEffect, useRef } from "react";
import  theme from "../../styles/theme";

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

// ─── Flip Card ───────────────────────────────────────────────────────────────

function FlipUnit({ value, label }: { value: number; label: string }) {
  const display    = String(value).padStart(2, "0");
  const prevRef    = useRef(display);
  const [flip, setFlip] = useState(false);

  useEffect(() => {
    if (prevRef.current !== display) {
      setFlip(true);
      const t = setTimeout(() => {
        setFlip(false);
        prevRef.current = display;
      }, 400);
      return () => clearTimeout(t);
    }
  }, [display]);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.75rem" }}>

      {/* Tarjeta con flip */}
      <div style={{
        position:    "relative",
        width:       "clamp(72px, 16vw, 110px)",
        height:      "clamp(80px, 18vw, 120px)",
        perspective: "400px",
      }}>

        {/* Fondo de la tarjeta */}
        <div style={{
          position:     "absolute",
          inset:        0,
          borderRadius: "6px",
          background:   "linear-gradient(160deg, #3A5068 0%, #2C3D4F 100%)",
          border:       `1px solid rgba(74,127,165,0.3)`,
          boxShadow:    `0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)`,
        }} />

        {/* Línea divisoria central (estilo split-flap) */}
        <div style={{
          position:   "absolute",
          top:        "50%",
          left:       "8px",
          right:      "8px",
          height:     "1px",
          background: "rgba(0,0,0,0.4)",
          zIndex:     5,
          transform:  "translateY(-50%)",
        }} />

        {/* Número actual (parte inferior fija) */}
        <div style={{
          position:     "absolute",
          inset:        0,
          display:      "flex",
          alignItems:   "center",
          justifyContent: "center",
          borderRadius: "6px",
          overflow:     "hidden",
        }}>
          <span style={{
            fontFamily:  theme.fonts.display,
            fontSize:    "clamp(2.2rem, 6vw, 3.5rem)",
            color:       theme.colors.cream,
            fontWeight:  400,
            lineHeight:  1,
            letterSpacing: "-0.02em",
          }}>
            {display}
          </span>
        </div>

        {/* Flap animado — tapa superior que cae */}
        {flip && (
          <div style={{
            position:        "absolute",
            top:             0,
            left:            0,
            right:           0,
            height:          "50%",
            overflow:        "hidden",
            borderRadius:    "6px 6px 0 0",
            transformOrigin: "bottom center",
            animation:       "flapDown 0.35s cubic-bezier(0.4,0,0.2,1) forwards",
            zIndex:          10,
            background:      "linear-gradient(160deg, #3A5068 0%, #2C3D4F 100%)",
            border:          `1px solid rgba(74,127,165,0.3)`,
            borderBottom:    "none",
          }}>
            <div style={{
              position:     "absolute",
              inset:        0,
              display:      "flex",
              alignItems:   "flex-end",
              justifyContent: "center",
              paddingBottom: "2px",
            }}>
              <span style={{
                fontFamily: theme.fonts.display,
                fontSize:   "clamp(2.2rem, 6vw, 3.5rem)",
                color:      theme.colors.cream,
                fontWeight: 400,
                lineHeight: 1,
              }}>
                {prevRef.current}
              </span>
            </div>
          </div>
        )}

        {/* Brillo sutil */}
        <div style={{
          position:     "absolute",
          inset:        0,
          borderRadius: "6px",
          background:   "linear-gradient(to bottom, rgba(255,255,255,0.04) 0%, transparent 50%)",
          pointerEvents: "none",
        }} />
      </div>

      {/* Label */}
      <span style={{
        fontFamily:    theme.fonts.sans,
        fontSize:      "0.65rem",
        color:         theme.colors.primary,
        letterSpacing: "0.25em",
        textTransform: "uppercase" as const,
      }}>
        {label}
      </span>
    </div>
  );
}

// ─── Separador ───────────────────────────────────────────────────────────────

function Separator() {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const t = setInterval(() => setVisible(v => !v), 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{
      display:       "flex",
      flexDirection: "column",
      gap:           "10px",
      paddingBottom: "1.8rem",
      opacity:       visible ? 1 : 0.2,
      transition:    "opacity 0.3s ease",
    }}>
      <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: theme.colors.primary, opacity: 0.7 }} />
      <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: theme.colors.primary, opacity: 0.7 }} />
    </div>
  );
}

// ─── Componente principal ────────────────────────────────────────────────────

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
        @keyframes flapDown {
          from { transform: rotateX(0deg);    }
          to   { transform: rotateX(-90deg);  }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
      `}</style>

      <section style={{
        background: `linear-gradient(to bottom, #243445, #1C2A3A)`,
        padding:    "5rem 1.5rem",
        textAlign:  "center",
      }}>

        {/* Header */}
        <p style={{
          color:         theme.colors.primary,
          fontFamily:    theme.fonts.sans,
          fontSize:      "0.7rem",
          letterSpacing: "0.45em",
          textTransform: "uppercase",
          marginBottom:  "0.75rem",
          animation:     "fadeInUp 0.6s ease both",
        }}>
          ✦ Cuenta Regresiva ✦
        </p>
        <h2 style={{
          fontFamily:   theme.fonts.display,
          color:        theme.colors.cream,
          fontSize:     "clamp(1.5rem, 4vw, 2.2rem)",
          fontWeight:   400,
          fontStyle:    "italic",
          marginBottom: "3rem",
          animation:    "fadeInUp 0.6s ease 0.1s both",
        }}>
          Faltan para el gran día
        </h2>

        {/* Unidades */}
        <div style={{
          display:        "flex",
          alignItems:     "center",
          justifyContent: "center",
          gap:            "clamp(0.5rem, 2vw, 1.5rem)",
          flexWrap:       "wrap",
          animation:      "fadeInUp 0.6s ease 0.2s both",
        }}>
          {units.map((u, i) => (
            <>
              <FlipUnit key={u.label} value={u.value} label={u.label} />
              {i < units.length - 1 && <Separator key={`sep-${i}`} />}
            </>
          ))}
        </div>

        {/* Cita */}
        <p style={{
          fontFamily:   theme.fonts.serif,
          fontStyle:    "italic",
          color:        theme.colors.primary,
          fontSize:     "0.95rem",
          marginTop:    "3rem",
          opacity:      0.75,
          animation:    "fadeInUp 0.6s ease 0.3s both",
        }}>
          "Dios todo lo hizo hermoso en su tiempo..." — Eclesiastés 3:11
        </p>

      </section>
    </>
  );
}