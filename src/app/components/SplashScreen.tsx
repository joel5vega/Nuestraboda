import { useEffect, useState } from "react";

type Phase =
  | "envelope-idle"
  | "flap-open"
  | "card-rising"
  | "card-expand"
  | "content-reveal"
  | "exiting";

const palette = {
  bg: "#10305a",
  bgGlow: "rgba(126, 146, 174, 0.16)",

  paper: "#F7F1EC",
  paperEdge: "#E8DDD3",

  dustyBlue: "#7E92AE",
  dustyBlueDeep: "#5F7390",

  dustyRose: "#B88D90",
  dustyRoseSoft: "#D8BEC3",

  frenchBlue: "#3F6FB6",
  navy: "#1F2F4A",

  ink: "#4B4A52",
  muted: "#8D847E",

  champagne: "#B79A6A",
  envelope: "#D9C7BA",
  envelopeDeep: "#BFA99A",

  mist: "#E6E1E7",
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
  radial-gradient(circle at 50% 32%, ${palette.bgGlow}, transparent 42%),
  linear-gradient(180deg, ${palette.bg} 0%, ${palette.bg} 100%)
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
              background: i % 2 === 0 ? palette.champagne : palette.dustyRoseSoft,
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
            border: `1px solid rgba(184, 141, 144, 0.18)`,
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
              background: `linear-gradient(180deg, ${palette.paper} 0%, ${palette.paperEdge} 100%)`,
              border: `1px solid rgba(183, 154, 106, 0.20)`,
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
                ? "0 30px 90px rgba(63, 48, 58, 0.22), inset 0 0 0 1px rgba(255,255,255,0.35)"
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
                    border: `1px solid rgba(126, 146, 174, 0.20)`,
                    opacity: 0.5,
                    pointerEvents: "none",
                    borderRadius: "2px",
                  }}
                />

                <div style={{ marginBottom: "1.2rem" }}>
                  <h1
                    style={{
                      fontFamily: `"Eyesome Script", "Cormorant Garamond", serif`,
                      fontSize: "clamp(3rem, 11vw, 5.7rem)",
                      color: palette.ink,
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
                        background: `linear-gradient(to right, transparent, ${palette.dustyBlue})`,
                        opacity: 0.7,
                      }}
                    />
                    <span
                      style={{
                        fontFamily: `"Cormorant Garamond", serif`,
                        fontSize: "clamp(1.5rem, 4vw, 2.2rem)",
                        color: palette.dustyRose,
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
                        background: `linear-gradient(to left, transparent, ${palette.dustyBlue})`,
                        opacity: 0.7,
                      }}
                    />
                  </div>

                  <h1
                    style={{
                      fontFamily: `"Eyesome Script", "Cormorant Garamond", serif`,
                      fontSize: "clamp(3rem, 11vw, 5.7rem)",
                      color: palette.ink,
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
                      background: `linear-gradient(to right, transparent, ${palette.champagne})`,
                    }}
                  />
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M7 1C7 1 4.5 4 4.5 6C4.5 7.4 5.6 8.5 7 8.5C8.4 8.5 9.5 7.4 9.5 6C9.5 4 7 1 7 1Z" fill={palette.champagne} opacity="0.8" />
                    <path d="M7 8.5V13" stroke={palette.champagne} strokeWidth="0.8" opacity="0.55" />
                    <path d="M1 7C1 7 4 4.5 6 4.5C7.4 4.5 8.5 5.6 8.5 7C8.5 8.4 7.4 9.5 6 9.5C4 9.5 1 7 1 7Z" fill={palette.champagne} opacity="0.42" />
                    <path d="M13 7C13 7 10 4.5 8 4.5" stroke={palette.champagne} strokeWidth="0.8" opacity="0.42" />
                  </svg>
                  <div
                    style={{
                      height: "1px",
                      width: "50px",
                      background: `linear-gradient(to left, transparent, ${palette.champagne})`,
                    }}
                  />
                </div>

                <p
                  style={{
                    fontFamily: `"Cormorant Garamond", serif`,
                    color: palette.muted,
                    fontSize: "clamp(0.9rem, 2vw, 1.05rem)",
                    letterSpacing: "0.22em",
                    marginBottom: "2.4rem",
                    opacity: 0,
                    animation: "fadeIn 0.8s ease 1.45s forwards",
                  }}
                >
                  1 DE AGOSTO, 2026 · <br />JIWASA, ACHOCHALLA
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
                      { top: 0, left: 0, borderTop: `1px solid ${palette.dustyBlue}`, borderLeft: `1px solid ${palette.dustyBlue}` },
                      { top: 0, right: 0, borderTop: `1px solid ${palette.dustyBlue}`, borderRight: `1px solid ${palette.dustyBlue}` },
                      { bottom: 0, left: 0, borderBottom: `1px solid ${palette.dustyBlue}`, borderLeft: `1px solid ${palette.dustyBlue}` },
                      { bottom: 0, right: 0, borderBottom: `1px solid ${palette.dustyBlue}`, borderRight: `1px solid ${palette.dustyBlue}` },
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
                        border: `1px solid ${btnHover ? palette.frenchBlue : palette.dustyBlue}`,
                        background: btnHover
                          ? `linear-gradient(135deg, ${palette.frenchBlue} 0%, ${palette.navy} 100%)`
                          : "rgba(255,255,255,0.22)",
                        color: btnHover ? palette.paper : palette.navy,
                        fontFamily: `"Inter", sans-serif`,
                        fontSize: "0.72rem",
                        letterSpacing: "0.28em",
                        textTransform: "uppercase",
                        cursor: "pointer",
                        transition:
                          "background 0.3s ease, color 0.3s ease, transform 0.2s ease, box-shadow 0.3s ease, border-color 0.3s ease",
                        transform: btnHover ? "translateY(-1px) scale(1.02)" : "scale(1)",
                        boxShadow: btnHover ? "0 8px 22px rgba(63, 111, 182, 0.22)" : "none",
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
                  background: `linear-gradient(145deg, ${palette.envelope} 0%, ${palette.envelopeDeep} 100%)`,
                  borderRadius: "4px",
                  boxShadow:
                    "0 20px 60px rgba(89, 73, 82, 0.24), 0 4px 16px rgba(89, 73, 82, 0.16)",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(to bottom right, rgba(255,255,255,0.08) 50%, transparent 50%)",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(to bottom left, rgba(0,0,0,0.05) 50%, transparent 50%)",
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
                    color: palette.dustyBlueDeep,
                    opacity: 0.8,
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
                    borderTop: `90px solid ${palette.envelopeDeep}`,
                    filter: "drop-shadow(0 2px 4px rgba(89,73,82,0.12))",
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