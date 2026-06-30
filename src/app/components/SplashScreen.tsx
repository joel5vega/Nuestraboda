import { useEffect, useState } from "react";

type Phase =
  | "envelope-idle"
  | "flap-open"
  | "card-rising"
  | "card-expand"
  | "content-reveal"
  | "exiting";

const rustic = {
  bg: "#263127",
  bgGlow: "rgba(196,168,120,0.10)",
  paper: "#F4EBDD",
  paperEdge: "#E7D8C2",
  olive: "#5E6B4A",
  oliveDark: "#445038",
  ink: "#2F3A2C",
  muted: "#6E6A5E",
  gold: "#A88452",
  envelope: "#CDB89A",
  envelopeDark: "#B79F81",
};

const AnimatedName = ({ name, delay = 0 }: { name: string; delay?: number }) => (
  <span style={{ display: "inline-block" }}>
    {name.split("").map((char, i) => (
      <span
        key={i}
        style={{
          display: "inline-block",
          opacity: 0,
          transform: "translateY(18px)",
          filter: "blur(2px)",
          animation: "letterReveal 0.55s ease forwards",
          animationDelay: `${delay + i * 0.07}s`,
        }}
      >
        {char === " " ? "\u00A0" : char}
      </span>
    ))}
  </span>
);

export function SplashScreen({
  onComplete,
  onEnter,
}: {
  onComplete: () => void;
  onEnter?: () => void;
}) {
  const [phase, setPhase] = useState<Phase>("envelope-idle");
  const [btnHover, setBtnHover] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("flap-open"), 900);
    const t2 = setTimeout(() => setPhase("card-rising"), 1900);
    const t3 = setTimeout(() => setPhase("card-expand"), 2850);
    const t4 = setTimeout(() => setPhase("content-reveal"), 3800);
    return () => [t1, t2, t3, t4].forEach(clearTimeout);
  }, []);

  const handleEnter = () => {
    setPhase("exiting");
    onEnter?.();
    setTimeout(onComplete, 900);
  };

  const isExpanded =
    phase === "card-expand" || phase === "content-reveal" || phase === "exiting";
  const showContent = phase === "content-reveal" || phase === "exiting";

  return (
    <>
      <style>{`
        @import url('https://fonts.cdnfonts.com/css/eyesome-script');
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=Inter:wght@400;500;600&display=swap');

        @keyframes letterReveal {
          to { opacity: 1; transform: translateY(0); filter: blur(0); }
        }
        @keyframes fadeIn {
          to { opacity: 1; }
        }
        @keyframes pulseSoft {
          0%, 100% { opacity: 0.22; transform: scale(1); }
          50% { opacity: 0.42; transform: scale(1.18); }
        }
        @keyframes envelopeShake {
          0%, 100% { transform: translateX(0) rotate(0deg); }
          25% { transform: translateX(-2px) rotate(-0.4deg); }
          75% { transform: translateX(2px) rotate(0.4deg); }
        }
        @keyframes softBreath {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-2px) scale(1.01); }
        }
      `}</style>

      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 9999,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          pointerEvents: phase === "exiting" ? "none" : "all",
          opacity: phase === "exiting" ? 0 : 1,
          transition: "opacity 0.7s ease",
          background: `
            radial-gradient(circle at 50% 35%, ${rustic.bgGlow}, transparent 42%),
            linear-gradient(180deg, #2C372D 0%, ${rustic.bg} 100%)
          `,
        }}
      >
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              width: "3px",
              height: "3px",
              borderRadius: "50%",
              background: rustic.gold,
              top: `${12 + i * 10}%`,
              left: i % 2 === 0 ? `${7 + i * 3.5}%` : `${90 - i * 3.5}%`,
              animation: `pulseSoft ${2.4 + i * 0.2}s ease-in-out ${i * 0.2}s infinite`,
            }}
          />
        ))}

        <div
          style={{
            position: "absolute",
            inset: "1.5rem",
            border: `1px solid rgba(244,235,221,0.12)`,
            opacity: 0.9,
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: isExpanded ? "100vw" : "auto",
            height: isExpanded ? "100vh" : "auto",
            transition: "width 0.6s ease, height 0.6s ease",
          }}
        >
          <div
            style={{
              position: "absolute",
              zIndex: 10,
              background: `linear-gradient(180deg, ${rustic.paper} 0%, ${rustic.paperEdge} 100%)`,
              border: `1px solid rgba(168,132,82,0.18)`,
              borderRadius: "4px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              padding: isExpanded ? "3rem 2rem" : "0",
              overflow: "hidden",
              width: isExpanded ? "min(620px, 90vw)" : "180px",
              height: isExpanded ? "min(720px, 85vh)" : "110px",
              top: "50%",
              left: "50%",
              transform: isExpanded
                ? "translate(-50%, -50%)"
                : phase === "card-rising"
                ? "translate(-50%, calc(-50% - 55px))"
                : "translate(-50%, calc(-50% + 30px))",
              transition:
                phase === "card-rising"
                  ? "transform 0.6s cubic-bezier(0.34,1.4,0.64,1), opacity 0.4s ease"
                  : isExpanded
                  ? "all 0.7s cubic-bezier(0.4,0,0.2,1)"
                  : "none",
              opacity:
                phase === "envelope-idle" || phase === "flap-open"
                  ? 0
                  : 1,
              boxShadow: isExpanded
                ? "0 30px 90px rgba(0,0,0,0.34), inset 0 0 0 1px rgba(255,255,255,0.35)"
                : "none",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                opacity: 0.06,
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='120' height='120' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                pointerEvents: "none",
              }}
            />

            {showContent && (
              <div style={{ position: "relative", zIndex: 1, width: "100%" }}>
                <div
                  style={{
                    position: "absolute",
                    inset: "1.35rem",
                    border: `1px solid rgba(94,107,74,0.18)`,
                    opacity: 0.45,
                    pointerEvents: "none",
                    borderRadius: "2px",
                  }}
                />

                <div style={{ marginBottom: "1.2rem" }}>
                  <h1
                    style={{
                      fontFamily: `"Eyesome Script", "Cormorant Garamond", serif`,
                      fontSize: "clamp(3rem, 11vw, 5.7rem)",
                      color: rustic.ink,
                      fontWeight: 400,
                      lineHeight: 1.04,
                      letterSpacing: "0.01em",
                      textShadow: "0 1px 0 rgba(255,255,255,0.35)",
                      whiteSpace: "nowrap",
                      margin: 0,
                    }}
                  >
                    <AnimatedName name="Joel Pablo" delay={0.15} />
                  </h1>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.8rem",
                      justifyContent: "center",
                      margin: "0.35rem 0",
                      opacity: 0,
                      animation: "fadeIn 0.5s ease 0.7s forwards",
                    }}
                  >
                    <div
                      style={{
                        height: "1px",
                        width: "42px",
                        background: `linear-gradient(to right, transparent, ${rustic.olive})`,
                        opacity: 0.6,
                      }}
                    />
                    <span
                      style={{
                        fontFamily: `"Cormorant Garamond", serif`,
                        fontSize: "clamp(1.5rem, 4vw, 2.2rem)",
                        color: rustic.olive,
                        fontStyle: "italic",
                        lineHeight: 1,
                      }}
                    >
                      &amp;
                    </span>
                    <div
                      style={{
                        height: "1px",
                        width: "42px",
                        background: `linear-gradient(to left, transparent, ${rustic.olive})`,
                        opacity: 0.6,
                      }}
                    />
                  </div>

                  <h1
                    style={{
                      fontFamily: `"Eyesome Script", "Cormorant Garamond", serif`,
                      fontSize: "clamp(3rem, 11vw, 5.7rem)",
                      color: rustic.ink,
                      fontWeight: 400,
                      lineHeight: 1.04,
                      letterSpacing: "0.01em",
                      textShadow: "0 1px 0 rgba(255,255,255,0.35)",
                      whiteSpace: "nowrap",
                      margin: 0,
                    }}
                  >
                    <AnimatedName name="Betania" delay={0.72} />
                  </h1>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                    justifyContent: "center",
                    margin: "1rem 0",
                    opacity: 0,
                    animation: "fadeIn 0.5s ease 1.2s forwards",
                  }}
                >
                  <div
                    style={{
                      height: "1px",
                      width: "50px",
                      background: `linear-gradient(to right, transparent, ${rustic.gold})`,
                    }}
                  />
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M7 1C7 1 4.5 4 4.5 6C4.5 7.4 5.6 8.5 7 8.5C8.4 8.5 9.5 7.4 9.5 6C9.5 4 7 1 7 1Z" fill={rustic.gold} opacity="0.8" />
                    <path d="M7 8.5V13" stroke={rustic.gold} strokeWidth="0.8" opacity="0.55" />
                    <path d="M1 7C1 7 4 4.5 6 4.5C7.4 4.5 8.5 5.6 8.5 7C8.5 8.4 7.4 9.5 6 9.5C4 9.5 1 7 1 7Z" fill={rustic.gold} opacity="0.42" />
                    <path d="M13 7C13 7 10 4.5 8 4.5" stroke={rustic.gold} strokeWidth="0.8" opacity="0.42" />
                  </svg>
                  <div
                    style={{
                      height: "1px",
                      width: "50px",
                      background: `linear-gradient(to left, transparent, ${rustic.gold})`,
                    }}
                  />
                </div>

                <p
                  style={{
                    fontFamily: `"Cormorant Garamond", serif`,
                    color: rustic.muted,
                    fontSize: "clamp(0.9rem, 2vw, 1.05rem)",
                    letterSpacing: "0.22em",
                    marginBottom: "2.4rem",
                    opacity: 0,
                    animation: "fadeIn 0.8s ease 1.45s forwards",
                  }}
                >
                  1 DE AGOSTO, 2026 · <br></br>JIWASA, ACHOCHALLA
                </p>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "0.8rem",
                    opacity: 0,
                    animation: "fadeIn 0.8s ease 1.85s forwards",
                  }}
                >
                  <div style={{ position: "relative", padding: "6px" }}>
                    {[
                      { top: 0, left: 0, borderTop: `1px solid ${rustic.olive}`, borderLeft: `1px solid ${rustic.olive}` },
                      { top: 0, right: 0, borderTop: `1px solid ${rustic.olive}`, borderRight: `1px solid ${rustic.olive}` },
                      { bottom: 0, left: 0, borderBottom: `1px solid ${rustic.olive}`, borderLeft: `1px solid ${rustic.olive}` },
                      { bottom: 0, right: 0, borderBottom: `1px solid ${rustic.olive}`, borderRight: `1px solid ${rustic.olive}` },
                    ].map((corner, i) => (
                      <div
                        key={i}
                        style={{
                          position: "absolute",
                          width: "10px",
                          height: "10px",
                          opacity: 0.65,
                          ...corner,
                        }}
                      />
                    ))}

                    <button
                      style={{
                        padding: "0.78rem 2.6rem",
                        border: `1px solid ${rustic.olive}`,
                        background: btnHover ? rustic.olive : "rgba(255,255,255,0.18)",
                        color: btnHover ? rustic.paper : rustic.oliveDark,
                        fontFamily: `"Inter", sans-serif`,
                        fontSize: "0.72rem",
                        letterSpacing: "0.28em",
                        textTransform: "uppercase",
                        cursor: "pointer",
                        transition:
                          "background 0.3s ease, color 0.3s ease, transform 0.2s ease, box-shadow 0.3s ease",
                        transform: btnHover ? "translateY(-1px) scale(1.02)" : "scale(1)",
                        boxShadow: btnHover ? `0 6px 18px rgba(94,107,74,0.18)` : "none",
                        animation: "fadeIn 0.5s ease 2.15s forwards, softBreath 3.2s ease 2.8s infinite",
                        display: "block",
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

          {!isExpanded && (
            <div
              style={{
                position: "relative",
                width: "260px",
                height: "180px",
                perspective: "600px",
                animation:
                  phase === "envelope-idle"
                    ? "envelopeShake 2s ease-in-out 0.3s 2"
                    : "none",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: `linear-gradient(145deg, ${rustic.envelope} 0%, ${rustic.envelopeDark} 100%)`,
                  borderRadius: "4px",
                  boxShadow:
                    "0 20px 60px rgba(0,0,0,0.42), 0 4px 16px rgba(0,0,0,0.22)",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(to bottom right, rgba(0,0,0,0.08) 50%, transparent 50%)",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(to bottom left, rgba(0,0,0,0.08) 50%, transparent 50%)",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    bottom: "16px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    fontFamily: `"Cormorant Garamond", serif`,
                    fontSize: "1rem",
                    color: rustic.olive,
                    opacity: 0.72,
                    fontStyle: "italic",
                    whiteSpace: "nowrap",
                  }}
                >
                  B &amp; J
                </div>
              </div>

              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: "50%",
                  transformOrigin: "top center",
                  transform:
                    phase === "flap-open" || phase === "card-rising"
                      ? "rotateX(-175deg)"
                      : "rotateX(0deg)",
                  transition: "transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
                  zIndex: 20,
                }}
              >
                <div
                  style={{
                    width: 0,
                    height: 0,
                    borderLeft: "130px solid transparent",
                    borderRight: "130px solid transparent",
                    borderTop: `90px solid #B69D7F`,
                    filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.16))",
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}