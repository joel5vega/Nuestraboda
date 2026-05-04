// ─────────────────────────────────────────────────────────────────────────────
// TEMA GLOBAL — Betania & Joel
// Edita solo este archivo para cambiar toda la paleta del sitio
// ─────────────────────────────────────────────────────────────────────────────

// ── 1. PALETA DE COLORES ─────────────────────────────────────────────────────
export const colors = {
  // Superficies
  bgDark:       "#16232F",
  bgMid:        "#1E2E3E",
  bgCard:       "#253545",
  bgCardLight:  "#344D64",
  bgLight:      "#F4EDE4",
  bgWhite:      "#FFFFFF",

  // Texto
  textPrimary:  "#F4EDE4",
  textDark:     "#253545",
  textMid:      "#445A6E",
  textMuted:    "#607585",

  // Acentos principales — núcleo: #748CAB
  accentBlue:   "#748CAB",   // ← nuevo núcleo azul acero
  accentTeal:   "#3E6E96",   // hover, bordes activos
  accentLeaf:   "#3E6E96",

  // Acentos secundarios (sin cambio)
  accentGold:   "#D4A85A",
  accentTerra:  "#C4713A",
  accentSage:   "#6B7C5E",
  accentCafe:   "#8B7355",

  // Utilidades
  overlay:      "rgba(22,35,47,0.95)",
  overlayMid:   "rgba(37,53,69,0.5)",
  border:       "rgba(116,140,171,0.3)",
  borderLight:  "rgba(116,140,171,0.12)",
  divider:      "rgba(0,0,0,0.4)",
} as const;
// ── 2. TIPOGRAFÍAS ───────────────────────────────────────────────────────────
export const fonts = {
  display: "'Playfair Display', Georgia, serif", // nombres, títulos románticos
  serif:   "'Crimson Text', Georgia, serif",      // fechas, citas, textos elegantes
  sans:    "'Lato', 'Helvetica Neue', sans-serif",// labels, datos, UI
} as const;

// ── 3. SOMBRAS ───────────────────────────────────────────────────────────────
export const shadows = {
  card:    "0 8px 40px rgba(44,61,79,0.12)",
  cardDark:"0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)",
  image:   "8px 8px 0px rgba(74,127,165,0.2), 16px 16px 0px rgba(74,127,165,0.1)",
  glow:    "0 0 20px rgba(74,127,165,0.2)",
  splash:  "0 20px 60px rgba(0,0,0,0.5), 0 4px 16px rgba(0,0,0,0.3)",
} as const;

// ── 4. GRADIENTES ────────────────────────────────────────────────────────────
export const gradients = {
  heroOverlay:   "linear-gradient(to bottom, rgba(28,42,58,0.72) 0%, rgba(28,42,58,0.55) 50%, rgba(28,42,58,0.8) 100%)",
  imageOverlay:  "linear-gradient(to bottom, transparent 60%, rgba(44,61,79,0.6))",
  sectionDark:   "linear-gradient(to bottom, #1E2E3E, #16232F)",
  cardDark:      "linear-gradient(135deg, #344D64, #253545)",
  cardDress:     "linear-gradient(135deg, #253545, #344D64)",
  lineLeft:      `linear-gradient(to right, transparent, #3E6E96)`,
  lineRight:     `linear-gradient(to left,  transparent, #3E6E96)`,
  flipCard:      "linear-gradient(160deg, #344D64 0%, #253545 100%)",
  cardHighlight: "linear-gradient(to bottom, rgba(255,255,255,0.04) 0%, transparent 50%)",
} as const;

// ── 5. RADIOS Y ESPACIADO ────────────────────────────────────────────────────
export const radius = {
  sm: "4px",
  md: "6px",
  lg: "12px",
  full: "9999px",
} as const;

// ── 6. DRESS CODE — paleta de colores sugerida para invitados ────────────────
export const dressPalette = [
  { color: colors.accentBlue,  label: "Azul acero"    },
  { color: colors.textPrimary, label: "Crema"         },
  { color: "#9EA89E",          label: "Gris sage"     },
  { color: colors.accentCafe,  label: "Café rústico"  },
  { color: colors.accentSage,  label: "Verde oliva"   },
] as const;

// ── 7. EXPORT DEFAULT (compatibilidad con imports anteriores) ─────────────────
// Mantiene el shape que ya usan HeroSection, OurStory, Gallery, CountdownTimer
const theme = {
  colors: {
    primary:  colors.accentBlue,
    secondary: colors.accentSage,
    accent:   colors.accentTerra,
    gold:     colors.accentGold,
    cream:    colors.textPrimary,
    muted:    colors.accentBlue,
    dark:     colors.bgDark,
  },
  fonts,
  shadows,
  gradients,
  heroOverlay:  gradients.heroOverlay,
  leaf:         colors.accentTeal,
  floral:       colors.accentBlue,
  border:       colors.accentBlue,
  dressPalette,
};

export default theme;

// En tu gradients o directamente como variable
export const pageBg = `linear-gradient(to bottom,
  #0A1520  0%,       /* hero oscuro */
  #0F1B28  18%,      /* countdown */
  #141E2C  35%,      /* story */
  #182230  52%,      /* event/schedule */
  #141E2C 70%,      /* gallery */
  #0F1B28  85%,      /* rsvp */
  #0A1520  100%      /* footer */
)`;