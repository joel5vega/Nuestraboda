import { colors, fonts, gradients } from "../../styles/theme";

const HeartIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M7 12S1 8 1 4.5A3 3 0 0 1 7 3.5 3 3 0 0 1 13 4.5C13 8 7 12 7 12Z"
      fill={colors.accentTeal} opacity="0.9"/>
  </svg>
);

const CrossIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path d="M9 2V16M4 7H14" stroke={colors.accentTeal} strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const S = {
  footer:    { background: colors.bgLight, padding: "5rem 1.5rem 3rem" },
  names:     { fontFamily: fonts.display, color: colors.textDark, fontSize: "clamp(2rem, 7vw, 4rem)", fontWeight: 400, letterSpacing: "0.02em" },
  ampersand: { fontFamily: fonts.display, color: colors.accentTeal, fontSize: "clamp(1.4rem, 4vw, 2.5rem)", fontStyle: "italic" as const, margin: "0 0.75rem" },
  date:      { fontFamily: fonts.sans, color: colors.textMid, fontSize: "0.8rem", letterSpacing: "0.4em", textTransform: "uppercase" as const, marginTop: "0.75rem" },
  verse:     { fontFamily: fonts.serif, fontStyle: "italic" as const, color: colors.textMid, fontSize: "clamp(0.9rem, 2vw, 1.1rem)", lineHeight: 1.8, maxWidth: "480px", margin: "0 auto", opacity: 0.9 },
  colTitle:  { fontFamily: fonts.sans, fontSize: "0.65rem", letterSpacing: "0.35em", textTransform: "uppercase" as const, color: colors.accentTeal, marginBottom: "0.75rem" },
  bottom:    { fontFamily: fonts.sans, fontSize: "0.72rem", color: colors.textMuted, letterSpacing: "0.2em", marginTop: "2.5rem", opacity: 0.8 },
} as const;

// Gradientes adaptados al fondo claro
const lineLightLeft  = `linear-gradient(to right, transparent, ${colors.accentTeal})`;
const lineLightRight = `linear-gradient(to left,  transparent, ${colors.accentTeal})`;

export function Footer() {
  return (
    <>
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <footer style={S.footer}>
        <div style={{ maxWidth: "720px", margin: "0 auto", textAlign: "center" }}>

          {/* Cruz */}
          <div style={{ marginBottom: "1.5rem", opacity: 0.7 }}>
            <CrossIcon />
          </div>

          {/* Nombres */}
          <div style={{ marginBottom: "0.5rem" }}>
            <span style={S.names}>Joel</span>
            <span style={S.ampersand}>&amp;</span>
            <span style={S.names}>Betania</span>
          </div>

          <p style={S.date}>01 · 08 · 2026</p>

          {/* Línea decorativa */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.75rem", margin: "2rem 0" }}>
            <div style={{ height: "1px", width: "60px", background: lineLightLeft }} />
            <HeartIcon />
            <div style={{ height: "1px", width: "60px", background: lineLightRight }} />
          </div>

          {/* Versículo */}
          <p style={S.verse}>
            "Amados, amémonos unos a otros;<br />
            porque el amor es de Dios."<br />
            <span style={{ fontSize: "0.85em", opacity: 0.7 }}>— 1 Juan 4:7</span>
          </p>

          {/* Bottom */}
          <p style={S.bottom}>
            Hecho con amor por Joel · 2026
          </p>

        </div>
      </footer>
    </>
  );
}