import { colors, fonts } from "../../styles/theme";

/* ── Fuentes (añade en tu _document.tsx o index.html) ────────────────
  <link href="https://fonts.googleapis.com/css2?
    family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400
    &family=Mulish:wght@300;400;600&display=swap" rel="stylesheet">
──────────────────────────────────────────────────────────────────── */

const CrossIcon = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
    <line x1="11" y1="2"  x2="11" y2="20" stroke={colors.accentTeal}
      strokeWidth="1.4" strokeLinecap="round" opacity={0.6} />
    <line x1="4"  y1="8"  x2="18" y2="8"  stroke={colors.accentTeal}
      strokeWidth="1.4" strokeLinecap="round" opacity={0.6} />
  </svg>
);

const HeartIcon = () => (
  <svg width="13" height="12" viewBox="0 0 13 12" fill="none" aria-hidden="true">
    <path
      d="M6.5 10.5S1 7 1 3.8A2.7 2.7 0 0 1 6.5 3a2.7 2.7 0 0 1 5.5.8C12 7 6.5 10.5 6.5 10.5Z"
      fill={colors.accentTeal} opacity={0.85}
    />
  </svg>
);

const anim = (delay = "0s") => ({
  animation: `fadeInUp 0.7s ${delay} cubic-bezier(.16,1,.3,1) both`,
});

const S = {
  footer:   { background: colors.bgLight,
              padding: "clamp(3rem,8vw,5rem) 1.5rem clamp(2.5rem,6vw,4rem)" },
  inner:    { maxWidth: "680px", margin: "0 auto", textAlign: "center" as const },
  names:    { fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "clamp(2.4rem,7vw,4.2rem)", fontWeight: 400,
              letterSpacing: "0.02em", color: colors.textDark, lineHeight: 1 },
  amp:      { fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "clamp(1.6rem,3vw,2.8rem)", fontStyle: "italic" as const,
              fontWeight: 300, color: colors.accentTeal, margin: "0 0.55rem", lineHeight: 1 },
  date:     { fontFamily: "'Mulish', sans-serif", fontSize: "clamp(.72rem,.68rem + .2vw,.85rem)",
              letterSpacing: "0.45em", textTransform: "uppercase" as const, color: colors.textMid,
              marginTop: "0.75rem" },
  verse:    { fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontStyle: "italic" as const, fontWeight: 300,
              fontSize: "clamp(1rem,1.8vw,1.2rem)", lineHeight: 2,
              color: colors.textMid, maxWidth: "500px", margin: "0 auto" },
  verseRef: { fontFamily: "'Mulish', sans-serif", fontStyle: "normal" as const,
              fontSize: "clamp(.72rem,.68rem + .2vw,.82rem)", letterSpacing: "0.18em",
              textTransform: "uppercase" as const, color: colors.textMuted,
              display: "block", marginTop: "1rem", opacity: 0.85 },
  bottom:   { fontFamily: "'Mulish', sans-serif",
              fontSize: "clamp(.72rem,.68rem + .2vw,.82rem)", letterSpacing: "0.22em",
              textTransform: "uppercase" as const, color: colors.textMuted, opacity: 0.8 },
  link:     { fontFamily: "'Mulish', sans-serif",
              fontSize: "clamp(.72rem,.68rem + .2vw,.82rem)", letterSpacing: "0.15em",
              textTransform: "uppercase" as const, color: colors.accentTeal,
              textDecoration: "none", borderBottom: `1px solid transparent` },
} as const;

const lineL = `linear-gradient(to right, transparent, ${colors.accentTeal})`;
const lineR = `linear-gradient(to left,  transparent, ${colors.accentTeal})`;

export function Footer() {
  return (
    <>
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .footer-link:hover { color: ${colors.accentTealDim}; }
      `}</style>

      <footer style={S.footer} role="contentinfo">
        <div style={S.inner}>

        

          {/* Nombres */}
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "center",
                        flexWrap: "wrap", ...anim("0.1s"), marginBottom: "0.5rem" }}>
            <span style={S.names}>Joel Pablo</span>
            <span style={S.amp}>&amp;</span>
            <span style={S.names}>Betania</span>
          </div>

          <p style={{ ...S.date, ...anim("0.18s") }}>01 · 08 · 2026</p>

          {/* Ornamento */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center",
                        gap: "0.75rem", margin: "2rem 0", ...anim("0.24s") }} aria-hidden="true">
            <div style={{ height: "1px", width: "64px", background: lineL, opacity: 0.7 }} />
            <CrossIcon />
            <div style={{ height: "1px", width: "64px", background: lineR, opacity: 0.7 }} />
          </div>

          {/* Versículo */}
          <blockquote style={{ ...S.verse, ...anim("0.32s") }}>
            "Porque Dios se casará con ella,<br />
            como se casa un joven con su novia;<br />
            Dios la reconstruirá y vivirá feliz con ella,<br />
            como vive feliz el marido con su esposa."
            <span style={S.verseRef}>— Isaías 62:5</span>
          </blockquote>

          {/* Barra inferior */}
          <div style={{ marginTop: "2.5rem", display: "flex", flexDirection: "column",
                        alignItems: "center", gap: "0.75rem", ...anim("0.42s") }}>
            <p style={S.bottom}>Hecho con 💗 por </p>
            <a
              href="https://joel5vega.github.io"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link"
              style={S.link}
              aria-label="Sitio de Joel Vega (abre en nueva pestaña)"
            >
              Joel
            </a>
          </div>

        </div>
      </footer>
    </>
  );
}