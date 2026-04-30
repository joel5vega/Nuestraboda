import { useEffect, useRef } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import theme, { colors, fonts, gradients, shadows, dressPalette } from "../../styles/theme";
import venueImage from "../../assets/jiwasa.png";
// const venueImage = "https://images.unsplash.com/photo-1586880043376-2b7bd270cd4b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080";

// ─── Íconos ──────────────────────────────────────────────────────────────────

const MapPinIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M8 1C5.24 1 3 3.24 3 6C3 9.5 8 15 8 15C8 15 13 9.5 13 6C13 3.24 10.76 1 8 1Z"
      stroke={colors.accentBlue} strokeWidth="1.3"/>
    <circle cx="8" cy="6" r="2" stroke={colors.accentBlue} strokeWidth="1.3"/>
  </svg>
);

const ClockIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="8" r="6.5" stroke={colors.accentBlue} strokeWidth="1.3"/>
    <path d="M8 4.5V8L10.5 10" stroke={colors.accentBlue} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const DressIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    <path d="M10 4C10 4 8 8 6 10C4 12 2 13 2 13L7 16L6 28H22L21 16L26 13C26 13 24 12 22 10C20 8 18 4 18 4"
      stroke={colors.accentBlue} strokeWidth="1.5" strokeLinejoin="round"/>
    <path d="M10 4H18" stroke={colors.accentBlue} strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M14 4V9" stroke={colors.accentBlue} strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

// ─── Estilos ─────────────────────────────────────────────────────────────────

const S = {
  section:    { background: colors.bgLight, padding: "5rem 1.5rem" },
  label:      { color: colors.accentTeal, fontFamily: fonts.sans, fontSize: "0.7rem", letterSpacing: "0.45em", textTransform: "uppercase" as const, marginBottom: "0.75rem" },
  heading:    { fontFamily: fonts.display, color: colors.bgCard, fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 400, fontStyle: "italic" as const, marginBottom: "3rem" },
  card:       { background: colors.bgWhite, borderRadius: "6px", overflow: "hidden" as const, boxShadow: shadows.card, border: `1px solid ${colors.borderLight}` },
  cardLabel:  { fontFamily: fonts.sans, fontSize: "0.65rem", letterSpacing: "0.35em", textTransform: "uppercase" as const, color: colors.accentBlue, marginBottom: "0.5rem" },
  venueName:  { fontFamily: fonts.display, color: colors.bgCard, fontSize: "clamp(1.6rem, 4vw, 2.2rem)", fontWeight: 400, margin: "0.25rem 0 1.25rem" },
  infoRow:    { display: "flex", alignItems: "center", gap: "0.5rem" },
  infoText:   { fontFamily: fonts.sans, fontSize: "0.85rem", color: colors.textMid, lineHeight: 1.5 },
  note:       { fontFamily: fonts.serif, fontStyle: "italic" as const, color: colors.textMuted, fontSize: "0.95rem", lineHeight: 1.7, borderLeft: `2px solid ${colors.accentTeal}`, paddingLeft: "1rem", opacity: 0.9 },
  mapLink:    { display: "inline-flex" as const, alignItems: "center", gap: "0.4rem", fontFamily: fonts.sans, fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase" as const, color: colors.accentTeal, textDecoration: "none", borderBottom: `1px solid ${colors.accentTeal}`, paddingBottom: "2px" },
  dressCard:  { background: gradients.cardDress, borderRadius: "6px", padding: "2.5rem", textAlign: "center" as const, border: `1px solid ${colors.border}` },
  dressTitle: { fontFamily: fonts.display, color: colors.textPrimary, fontSize: "clamp(1.3rem, 3vw, 1.8rem)", fontWeight: 400, fontStyle: "italic" as const, margin: "0.75rem 0 0.5rem" },
  dressNote:  { fontFamily: fonts.serif, fontStyle: "italic" as const, color: colors.accentBlue, fontSize: "0.95rem", marginTop: "0.75rem" },
} as const;

// ─── Reveal style reutilizable ────────────────────────────────────────────────

const revealStyle: React.CSSProperties = {
  opacity:   0,
  transform: "translateY(28px)",
  transition:"opacity 0.7s ease, transform 0.7s ease",
};

// ─── Componente ──────────────────────────────────────────────────────────────

export function EventDetails() {
  const cardRef  = useRef<HTMLDivElement>(null);
  const dressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) {
          (e.target as HTMLElement).style.opacity   = "1";
          (e.target as HTMLElement).style.transform = "translateY(0)";
          observer.unobserve(e.target);
        }
      }),
      { threshold: 0.15 }
    );
    [cardRef, dressRef].forEach(r => r.current && observer.observe(r.current));
    return () => observer.disconnect();
  }, []);

  return (
    <section style={S.section}>
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <p style={S.label}>✦ Detalles del Evento ✦</p>
          <h2 style={S.heading}>Acompáñanos en este día especial</h2>
        </div>

        {/* ── Card Venue ──────────────────────────────────────────────── */}
        <div ref={cardRef} style={{ ...S.card, ...revealStyle, marginBottom: "2rem" }}>

          {/* Imagen */}
          <div style={{ position: "relative", height: "260px", overflow: "hidden" }}>
            <ImageWithFallback
              src={venueImage}
              alt="Jiwasa - Achocalla"
              className="w-full h-full object-cover"
            />
            <div style={{ position: "absolute", inset: 0, background: gradients.imageOverlay }} />
            <div style={{
              position: "absolute", bottom: "1.5rem", left: "1.5rem",
              background: "rgba(28,42,58,0.75)", backdropFilter: "blur(8px)",
              borderRadius: "4px", padding: "0.5rem 1rem",
              border: `1px solid rgba(143,175,194,0.25)`,
            }}>
              <p style={{ ...S.cardLabel, marginBottom: 0 }}>Ceremonia &amp; Recepción</p>
            </div>
          </div>

          {/* Info */}
          <div style={{ padding: "2rem 2.5rem 2.5rem" }}>
            <h3 style={S.venueName}>Jiwasa</h3>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "1.25rem", marginBottom: "1.5rem" }}>
              <div style={S.infoRow}>
                <ClockIcon />
                <span style={S.infoText}>12:00 PM · Sábado, 1 de agosto, 2026</span>
              </div>
              <div style={S.infoRow}>
                <MapPinIcon />
                <span style={S.infoText}>Carretera El Alto - Mallasilla, Achocalla, La Paz</span>
              </div>
            </div>

            <p style={{ ...S.note, marginBottom: "1.75rem" }}>
              Les pedimos llegar 15 minutos antes de la hora indicada para que todos estemos listos para este momento tan especial.
            </p>

            <a
              href="https://maps.app.goo.gl/1fCM2CS4UvyX2B4y8?g_st=iw"
              target="_blank"
              rel="noopener noreferrer"
              style={S.mapLink}
            >
              <MapPinIcon />
              Ver en Google Maps
            </a>
          </div>
        </div>

        {/* ── Card Dress Code ─────────────────────────────────────────── */}
        <div ref={dressRef} style={{ ...S.dressCard, ...revealStyle, transitionDelay: "0.15s" }}>
          <DressIcon />
          <p style={{ ...S.cardLabel, color: colors.accentBlue, marginTop: "0.75rem" }}>Código de Vestimenta</p>
          <h3 style={S.dressTitle}>Formal Elegante</h3>

          {/* Paleta visual */}
          <div style={{ display: "flex", justifyContent: "center", gap: "0.75rem", margin: "1.25rem 0", flexWrap: "wrap" }}>
            {dressPalette.map((p) => (
              <div key={p.color} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.4rem" }}>
                <div style={{
                  width: "36px", height: "36px", borderRadius: "50%",
                  background: p.color,
                  border: "2px solid rgba(255,255,255,0.15)",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.25)",
                }} />
                <span style={{ fontFamily: fonts.sans, fontSize: "0.6rem", color: colors.accentBlue, letterSpacing: "0.1em" }}>
                  {p.label}
                </span>
              </div>
            ))}
          </div>

          <p style={S.dressNote}>"Tonos tierra y pasteles que abracen la naturaleza de Jiwasa"</p>
        </div>

      </div>
    </section>
  );
}