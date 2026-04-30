// ─────────────────────────────────────────────────────────────────────────────
// TEMA GLOBAL — Betania & Joel
// Edita solo este archivo para cambiar toda la paleta del sitio
// ─────────────────────────────────────────────────────────────────────────────

// ── 1. PALETA DE COLORES ─────────────────────────────────────────────────────
export const colors = {
  // Superficies
  bgDark:       "#1C2A3A",   // fondo hero, splash, countdown
  bgMid:        "#243445",   // fondo countdown gradiente inferior
  bgCard:       "#2C3D4F",   // fondo tarjetas oscuras, OurStory
  bgCardLight:  "#3A5068",   // gradiente secundario en tarjetas oscuras
  bgLight:      "#F4EDE4",   // fondo secciones claras (Gallery, EventDetails)
  bgWhite:      "#FFFFFF",   // fondo tarjeta blanca EventDetails

  // Texto
  textPrimary:  "#F4EDE4",   // crema — texto principal sobre fondos oscuros
  textDark:     "#2C3D4F",   // azul oscuro — texto sobre fondos claros
  textMid:      "#4A6070",   // gris azulado — texto secundario
  textMuted:    "#6A8090",   // gris suave — notas, citas

  // Acentos principales
  accentBlue:   "#8FAFC2",   // azul acero — labels, líneas, íconos
  accentTeal:   "#4A7FA5",   // azul teal — hover, línea timeline, bordes
  accentLeaf:   "#4A7FA5",   // alias de accentTeal (uso en hojas SVG)

  // Acentos secundarios
  accentGold:   "#D4A85A",   // dorado — títulos especiales, sellos
  accentTerra:  "#C4713A",   // terracota — CTA activo, íconos de acción
  accentSage:   "#6B7C5E",   // verde oliva — follaje, naturales
  accentCafe:   "#8B7355",   // café rústico — dress code

  // Utilidades
  overlay:      "rgba(28,42,58,0.95)",  // lightbox
  overlayMid:   "rgba(44,61,79,0.5)",   // hover cards
  border:       "rgba(74,127,165,0.3)", // bordes sutiles
  borderLight:  "rgba(74,127,165,0.12)",// bordes muy sutiles (fondo claro)
  divider:      "rgba(0,0,0,0.4)",      // línea divisoria flip card
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
  sectionDark:   "linear-gradient(to bottom, #243445, #1C2A3A)",
  cardDark:      "linear-gradient(135deg, #3A5068, #2C3D4F)",
  cardDress:     "linear-gradient(135deg, #2C3D4F, #3A5068)",
  lineLeft:      `linear-gradient(to right, transparent, #4A7FA5)`,
  lineRight:     `linear-gradient(to left,  transparent, #4A7FA5)`,
  flipCard:      "linear-gradient(160deg, #3A5068 0%, #2C3D4F 100%)",
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
  #0C1622 0%,       /* hero oscuro */
  #111D2A 18%,      /* countdown */
  #162030 35%,      /* story */
  #1A2535 52%,      /* event/schedule */
  #162030 70%,      /* gallery */
  #111D2A 85%,      /* rsvp */
  #0C1622 100%      /* footer */
)`;