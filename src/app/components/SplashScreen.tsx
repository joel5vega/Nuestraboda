import { useEffect, useState } from "react";
import theme from "../../styles/theme";


// ─── Tipos ───────────────────────────────────────────────────────────────────
type Phase =
  | "envelope-idle"   // sobre cerrado, estático
  | "flap-open"       // solapa abriéndose
  | "card-rising"     // tarjeta subiendo
  | "card-expand"     // tarjeta expandiéndose a pantalla completa
  | "content-reveal"  // contenido (nombres, fecha) aparece
  | "exiting";        // fade-out final


// ─── Helpers ─────────────────────────────────────────────────────────────────
const AnimatedName = ({ name, delay = 0 }: { name: string; delay?: number }) => (
  <span style={{ display: "inline-block" }}>
    {name.split("").map((char, i) => (
      <span key={i} style={{
        display:         "inline-block",
        opacity:         0,
        transform:       "translateY(16px)",
        animation:       "letterReveal 0.5s ease forwards",
        animationDelay:  `${delay + i * 0.06}s`,
      }}>
        {char === " " ? "\u00A0" : char}
      </span>
    ))}
  </span>
);


// ─── Componente ──────────────────────────────────────────────────────────────
export function SplashScreen({ onComplete, onEnter }: { onComplete: () => void; onEnter?: () => void }) {
  const [phase, setPhase] = useState<Phase>("envelope-idle");
  const [btnHover, setBtnHover] = useState(false);


  // Secuencia automática de fases
  useEffect(() => {
    const t1 = setTimeout(() => setPhase("flap-open"),      800);   // solapa abre
    const t2 = setTimeout(() => setPhase("card-rising"),    1800);  // tarjeta sube
    const t3 = setTimeout(() => setPhase("card-expand"),    2600);  // tarjeta se expande
    const t4 = setTimeout(() => setPhase("content-reveal"), 3400);  // contenido aparece
    return () => [t1, t2, t3, t4].forEach(clearTimeout);
  }, []);


  const handleEnter = () => {
    setPhase("exiting");
    onEnter?.();
    setTimeout(onComplete, 700);
  };


  const isExpanded = phase === "card-expand" || phase === "content-reveal" || phase === "exiting";
  const showContent = phase === "content-reveal" || phase === "exiting";


  return (
    <>
      <style>{`
        @keyframes letterReveal {
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          to { opacity: 1; }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.3; transform: scale(1);   }
          50%       { opacity: 0.6; transform: scale(1.5); }
        }
        @keyframes flapOpen {
          from { transform: rotateX(0deg); }
          to   { transform: rotateX(-175deg); }
        }
          @keyframes gentlePulse {
  0%, 100% { opacity: 0.4; transform: scale(1); }
  50%       { opacity: 0.9; transform: scale(1.04); }
}
        @keyframes envelopeShake {
          0%, 100% { transform: translateX(0) rotate(0deg); }
          25%       { transform: translateX(-3px) rotate(-0.5deg); }
          75%       { transform: translateX(3px) rotate(0.5deg); }
        }
      `}</style>


      {/* ── Fondo ─────────────────────────────────────────────────────────── */}
      <div style={{
        position:       "fixed",
        inset:          0,
        zIndex:         9999,
        display:        "flex",
        alignItems:     "center",
        justifyContent: "center",
        background:     "#1C2A3A",
        opacity:        phase === "exiting" ? 0 : 1,
        transition:     "opacity 0.7s ease",
        pointerEvents:  phase === "exiting" ? "none" : "all",
        overflow:       "hidden",
      }}>


        {/* Puntos de luz */}
        {[...Array(8)].map((_, i) => (
          <div key={i} style={{
            position:     "absolute",
            width:        "3px", height: "3px",
            borderRadius: "50%",
            background:   theme.colors.primary,
            top:          `${10 + i * 11}%`,
            left:         i % 2 === 0 ? `${6 + i * 4}%` : `${88 - i * 4}%`,
            animation:    `pulse ${2 + i * 0.3}s ease-in-out ${i * 0.25}s infinite`,
          }} />
        ))}


        {/* Marco ornamental */}
        <div style={{ position: "absolute", inset: "1.5rem", border: `1px solid ${theme.border}`, opacity: 0.12, pointerEvents: "none" }} />


        {/* ── Escena del sobre ──────────────────────────────────────────── */}
        <div style={{
          position:       "relative",
          display:        "flex",
          alignItems:     "center",
          justifyContent: "center",
          width:          isExpanded ? "100vw" : "auto",
          height:         isExpanded ? "100vh" : "auto",
          transition:     "width 0.6s ease, height 0.6s ease",
        }}>


          {/* ── Tarjeta (dentro y encima del sobre) ───────────────────── */}
          <div style={{
            position:       "absolute",
            zIndex:         10,
            background:     theme.colors.cream,
            borderRadius:   isExpanded ? "4px" : "4px",
            display:        "flex",
            flexDirection:  "column",
            alignItems:     "center",
            justifyContent: "center",
            textAlign:      "center",
            padding:        isExpanded ? "3rem 2rem" : "0",
            overflow:       "hidden",

            // Tamaño: pequeño dentro del sobre → tarjeta real centrada
            width:  isExpanded ? "min(600px, 90vw)" : "180px",
            height: isExpanded ? "min(700px, 85vh)" : "110px",

            // Siempre centrado con top/left + translate para transición suave
            top:       "50%",
            left:      "50%",
            transform: isExpanded
              ? "translate(-50%, -50%)"
              : phase === "card-rising"
                ? "translate(-50%, calc(-50% - 55px))"
                : "translate(-50%, calc(-50% + 30px))",

            transition: phase === "card-rising"
              ? "transform 0.6s cubic-bezier(0.34,1.4,0.64,1), opacity 0.4s ease"
              : isExpanded
                ? "all 0.7s cubic-bezier(0.4,0,0.2,1)"
                : "none",

            opacity: phase === "envelope-idle" || phase === "flap-open" ? 0
                   : phase === "card-rising"   ? 1
                   : 1,

            boxShadow: isExpanded
              ? "0 25px 80px rgba(0,0,0,0.5), 0 8px 24px rgba(0,0,0,0.3)"
              : "none",
          }}>


            {/* Textura rústica sobre la tarjeta */}
            <div style={{
              position:        "absolute",
              inset:           0,
              opacity:         0.04,
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
              pointerEvents:   "none",
            }} />


            {/* Contenido de la tarjeta — visible solo en content-reveal */}
            {showContent && (
              <div style={{ position: "relative", zIndex: 1, width: "100%" }}>


                {/* Marco ornamental de la tarjeta */}
                <div style={{
                  position:     "absolute",
                  inset:        "1.5rem",
                  border:       `0px solid ${theme.leaf}`,
                  opacity:      0.25,
                  pointerEvents:"none",
                  borderRadius: "2px",
                }} />

                <p style={{
                  color:          theme.leaf,
                  fontFamily:     theme.fonts.sans,
                  fontSize:       ".85rem",
                  letterSpacing:  "0.5em",
                  textTransform:  "uppercase",
                  marginBottom:   "2rem",
                  opacity:        0,
                  animation:      "fadeIn 0.5s ease 0.1s forwards",
                }}>
                  ✦ Te invitamos a nuestra boda ✦
                </p>


                {/* Nombres */}
                {/* Nombres — layout vertical para evitar quiebre de letras */}
<div style={{ marginBottom: "1.2rem" }}>
  <h1 style={{
    fontFamily: theme.fonts.display,
    fontSize:   "clamp(2.8rem, 12vw, 5rem)",
    color:      "#2C3D4F",
    fontWeight: 400,
    lineHeight: 1.1,
    whiteSpace: "nowrap",       // ← clave: nunca rompe
    margin:     0,
  }}>
    <AnimatedName name="Joel" delay={0.2} />
  </h1>

  <div style={{
    display:        "flex",
    alignItems:     "center",
    gap:            "0.8rem",
    justifyContent: "center",
    margin:         "0.3rem 0",
    opacity:        0,
    animation:      "fadeIn 0.5s ease 0.7s forwards",
  }}>
    <div style={{ height: "1px", width: "40px", background: theme.leaf, opacity: 0.5 }} />
    <span style={{
      fontFamily: theme.fonts.display,
      fontSize:   "clamp(1.4rem, 4vw, 2.2rem)",
      color:      theme.leaf,
      fontStyle:  "italic",
    }}>&amp;</span>
    <div style={{ height: "1px", width: "40px", background: theme.leaf, opacity: 0.5 }} />
  </div>

  <h1 style={{
    fontFamily: theme.fonts.display,
    fontSize:   "clamp(2.8rem, 12vw, 5rem)",
    color:      "#2C3D4F",
    fontWeight: 400,
    lineHeight: 1.1,
    whiteSpace: "nowrap",       // ← clave: nunca rompe
    margin:     0,
  }}>
    <AnimatedName name="Betania" delay={0.8} />
  </h1>
</div>


                {/* Divisor floral */}
                <div style={{
                  display:        "flex", alignItems: "center", gap: "1rem",
                  justifyContent: "center", margin: "1rem 0",
                  opacity: 0, animation: "fadeIn 0.5s ease 1.3s forwards",
                }}>
                  <div style={{ height: "1px", width: "50px", background: `linear-gradient(to right, transparent, ${theme.leaf})` }} />
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M7 1C7 1 4.5 4 4.5 6C4.5 7.4 5.6 8.5 7 8.5C8.4 8.5 9.5 7.4 9.5 6C9.5 4 7 1 7 1Z" fill={theme.leaf} opacity="0.7"/>
                    <path d="M7 8.5V13" stroke={theme.leaf} strokeWidth="0.8" opacity="0.5"/>
                    <path d="M1 7C1 7 4 4.5 6 4.5C7.4 4.5 8.5 5.6 8.5 7C8.5 8.4 7.4 9.5 6 9.5C4 9.5 1 7 1 7Z" fill={theme.leaf} opacity="0.4"/>
                    <path d="M13 7C13 7 10 4.5 8 4.5" stroke={theme.leaf} strokeWidth="0.8" opacity="0.4"/>
                  </svg>
                  <div style={{ height: "1px", width: "50px", background: `linear-gradient(to left, transparent, ${theme.leaf})` }} />
                </div>


                <p style={{
                  fontFamily:    theme.fonts.serif,
                  color:         "#4A6070",
                  fontSize:      "clamp(0.8rem, 2vw, 1rem)",
                  letterSpacing: "0.2em",
                  marginBottom:  "2.5rem",
                  opacity:       0,
                  animation:     "fadeIn 0.5s ease 1.5s forwards",
                }}>
                  SÁBADO · 1 DE AGOSTO, 2026 · JIWASA, ACHOCHALLA
                </p>


                {/* Botón */}
                {/* <button
                  style={{
                    padding:       "0.75rem 2.5rem",
                    border:        `1px solid ${theme.leaf}`,
                    background:    btnHover ? theme.leaf : "transparent",
                    color:         btnHover ? theme.colors.cream : theme.leaf,
                    fontFamily:    theme.fonts.sans,
                    fontSize:      "1.2rem",
                    letterSpacing: "0.3em",
                    textTransform: "uppercase",
                    cursor:        "pointer",
                    transition:    "background 0.3s ease, color 0.3s ease",
                    opacity:       0,
                    animation:     "fadeIn 0.6s ease 1.9s forwards",
                  }}
                  onMouseEnter={() => setBtnHover(true)}
                  onMouseLeave={() => setBtnHover(false)}
                  onClick={handleEnter}
                >
                  Abrir invitación
                </button> */}
                {/* Botón con efectos */}
<div style={{
  display:        "flex",
  flexDirection:  "column",
  alignItems:     "center",
  gap:            "0.8rem",
  opacity:        0,
  animation:      "fadeIn 0.6s ease 1.9s forwards",
}}>


  {/* Marco rústico exterior */}
  <div style={{
    position: "relative",
    padding:  "6px",
  }}>
    {/* Esquinas decorativas */}
    {[
      { top: 0, left: 0, borderTop: `1px solid ${theme.leaf}`, borderLeft: `1px solid ${theme.leaf}` },
      { top: 0, right: 0, borderTop: `1px solid ${theme.leaf}`, borderRight: `1px solid ${theme.leaf}` },
      { bottom: 0, left: 0, borderBottom: `1px solid ${theme.leaf}`, borderLeft: `1px solid ${theme.leaf}` },
      { bottom: 0, right: 0, borderBottom: `1px solid ${theme.leaf}`, borderRight: `1px solid ${theme.leaf}` },
    ].map((corner, i) => (
      <div key={i} style={{
        position: "absolute",
        width:    "10px",
        height:   "10px",
        opacity:  0.6,
        ...corner,
      }} />
    ))}

    {/* Botón interior */}
    <button
      style={{
        padding:       "0.75rem 2.5rem",
        border:        `1px solid ${theme.leaf}`,
        background:    btnHover ? theme.leaf : "transparent",
        color:         btnHover ? theme.colors.cream : theme.leaf,
        fontFamily:    theme.fonts.sans,
        fontSize:      "0.72rem",
        letterSpacing: "0.3em",
        textTransform: "uppercase",
        cursor:        "pointer",
        transition:    "background 0.3s ease, color 0.3s ease, transform 0.2s ease, box-shadow 0.3s ease",
        transform:     btnHover ? "scale(1.03)" : "scale(1)",
        boxShadow:     btnHover ? `0 4px 20px ${theme.leaf}44` : "none",
        animation:     "fadeIn 0.5s ease 2.2s forwards, gentlePulse 2.5s ease 2.7s infinite",
        display:       "block",
      }}
      onMouseEnter={() => setBtnHover(true)}
      onMouseLeave={() => setBtnHover(false)}
      onClick={handleEnter}
    >
      Abrir invitación
    </button>
  </div>
</div>
              </div>
            )}
          </div>


          {/* ── Sobre ────────────────────────────────────────────────────── */}
          {!isExpanded && (
            <div style={{
              position:    "relative",
              width:       "260px",
              height:      "180px",
              perspective: "600px",   // ← MOVIDO AQUÍ desde la solapa
              animation:   phase === "envelope-idle"
                ? "envelopeShake 2s ease-in-out 0.3s 2"
                : "none",
            }}>


              {/* Cuerpo del sobre */}
              <div style={{
                position:     "absolute",
                inset:        0,
                background:   "linear-gradient(145deg, #D4C9B8, #C8BAA6)",
                borderRadius: "4px",
                boxShadow:    "0 20px 60px rgba(0,0,0,0.5), 0 4px 16px rgba(0,0,0,0.3)",
                overflow:     "hidden",
              }}>
                {/* Pliegues laterales del sobre */}
                <div style={{
                  position:   "absolute", inset: 0,
                  background: "linear-gradient(to bottom right, rgba(0,0,0,0.08) 50%, transparent 50%)",
                }} />
                <div style={{
                  position:   "absolute", inset: 0,
                  background: "linear-gradient(to bottom left, rgba(0,0,0,0.08) 50%, transparent 50%)",
                }} />
                {/* Iniciales */}
                <div style={{
                  position:   "absolute",
                  bottom:     "16px",
                  left:       "50%",
                  transform:  "translateX(-50%)",
                  fontFamily: theme.fonts.display,
                  fontSize:   "1rem",
                  color:      theme.leaf,
                  opacity:    0.6,
                  fontStyle:  "italic",
                  whiteSpace: "nowrap",
                }}>
                  B &amp; J
                </div>
              </div>


              {/* Solapa del sobre — se abre con rotateX */}
              <div style={{
                position:        "absolute",
                top:             0,
                left:            0,
                right:           0,
                height:          "50%",
                transformOrigin: "top center",
                transform:       phase === "flap-open" || phase === "card-rising"
                  ? "rotateX(-175deg)"
                  : "rotateX(0deg)",
                transition:      "transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
                zIndex:          20,
                // ← perspective ELIMINADO de aquí
              }}>
                {/* Forma triangular de la solapa */}
                <div style={{
                  width:       0,
                  height:      0,
                  borderLeft:  "130px solid transparent",
                  borderRight: "130px solid transparent",
                  borderTop:   "90px solid #BFB09C",
                  filter:      "drop-shadow(0 2px 4px rgba(0,0,0,0.2))",
                }} />
              </div>


            </div>
          )}


        </div>
      </div>
    </>
  );
}