import { useEffect, useRef } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { colors, fonts, gradients, shadows } from "../../styles/theme";
import venueImage from "../../assets/jiwasa.png";

// ─── Íconos ──────────────────────────────────────────────────────────────────

const MapPinIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path
      d="M8 1C5.24 1 3 3.24 3 6C3 9.5 8 15 8 15C8 15 13 9.5 13 6C13 3.24 10.76 1 8 1Z"
      stroke={colors.accentBlue}
      strokeWidth="1.3"
    />
    <circle cx="8" cy="6" r="2" stroke={colors.accentBlue} strokeWidth="1.3" />
  </svg>
);

const ClockIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="8" r="6.5" stroke={colors.accentBlue} strokeWidth="1.3" />
    <path
      d="M8 4.5V8L10.5 10"
      stroke={colors.accentBlue}
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// ─── Estilos ─────────────────────────────────────────────────────────────────

const S = {
  section: {
    background: colors.bgLight,
    padding: "1rem 1rem 5rem 1rem",
  },
  heading: {
    fontFamily: fonts.display,
    color: colors.bgCard,
    fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
    fontWeight: 400,
    fontStyle: "italic" as const,
    marginBottom: "2rem",
    textAlign: "center" as const,
  },
  card: {
    background: colors.bgWhite,
    borderRadius: "4px",
    overflow: "hidden" as const,
    boxShadow: "0 4px 18px rgba(28,42,58,0.08)",
    border: `1px solid ${colors.borderLight}`,
  },
  imageWrap: {
    position: "relative" as const,
    height: "160px",
    overflow: "hidden",
  },
  cardBody: {
    padding: "1.25rem 1.25rem 1.5rem",
  },
  cardLabel: {
    fontFamily: fonts.sans,
    fontSize: "0.65rem",
    letterSpacing: "0.32em",
    textTransform: "uppercase" as const,
    color: colors.accentTeal,
    marginBottom: "0.5rem",
  },
  venueName: {
    fontFamily: fonts.display,
    color: colors.bgCard,
    fontSize: "clamp(1.5rem, 3vw, 2rem)",
    fontWeight: 400,
    margin: "0 0 1rem",
  },
  infoList: {
    display: "grid",
    gap: "0.75rem",
    marginBottom: "1.25rem",
  },
  infoRow: {
    display: "flex",
    alignItems: "center",
    gap: "0.6rem",
  },
  infoText: {
    fontFamily: fonts.sans,
    fontSize: "0.9rem",
    color: colors.textMid,
    lineHeight: 1.5,
  },
  note: {
    fontFamily: fonts.serif,
    fontStyle: "italic" as const,
    color: colors.textMuted,
    fontSize: "0.92rem",
    lineHeight: 1.65,
    borderLeft: `2px solid ${colors.accentTeal}`,
    paddingLeft: "0.85rem",
    marginBottom: "1.25rem",
    opacity: 0.9,
  },
  mapLink: {
    display: "inline-flex" as const,
    alignItems: "center",
    gap: "0.45rem",
    fontFamily: fonts.sans,
    fontSize: "0.75rem",
    letterSpacing: "0.18em",
    textTransform: "uppercase" as const,
    color: colors.accentTeal,
    textDecoration: "none",
    borderBottom: `1px solid ${colors.accentTeal}`,
    paddingBottom: "2px",
  },
} as const;

// ─── Reveal ──────────────────────────────────────────────────────────────────

const revealStyle: React.CSSProperties = {
  opacity: 0,
  transform: "translateY(20px)",
  transition: "opacity 0.65s ease, transform 0.65s ease",
};

// ─── Componente ──────────────────────────────────────────────────────────────

export function EventDetails() {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            (e.target as HTMLElement).style.opacity = "1";
            (e.target as HTMLElement).style.transform = "translateY(0)";
            observer.unobserve(e.target);
          }
        }),
      { threshold: 0.15 }
    );

    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section style={S.section}>
      <div style={{ maxWidth: "760px", margin: "0 auto" }}>
        <h2 style={S.heading}>Acompáñanos en este día especial</h2>

        <div ref={cardRef} style={{ ...S.card, ...revealStyle }}>
          <div style={S.imageWrap}>
            <ImageWithFallback
              src={venueImage}
              alt="Jiwasa - Achocalla"
              className="w-full h-full object-cover"
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: gradients.imageOverlay,
              }}
            />
          </div>

          <div style={S.cardBody}>
            <p style={S.cardLabel}>Ceremonia &amp; Recepción</p>
            <h3 style={S.venueName}>Jiwasa</h3>

            <div style={S.infoList}>
              <div style={S.infoRow}>
                <ClockIcon />
                <span style={S.infoText}>12:00 PM · 1 de agosto de 2026</span>
              </div>

              <div style={S.infoRow}>
                <MapPinIcon />
                <span style={S.infoText}>Carretera El Alto - Mallasilla, Achocalla</span>
              </div>
            </div>

            <p style={S.note}>
              Les pedimos llegar 15 minutos antes para comenzar puntualmente este momento tan especial.
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
      </div>
    </section>
  );
}