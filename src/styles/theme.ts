export const theme = {
  // ─── Paleta "Hora Dorada" ───────────────────────────────
  colors: {
    primary:    "#8FAFC2",   // Azul acero (flores, líneas, labels)
    secondary:  "#6B7C5E",   // Verde oliva (hojas, acentos naturales)
    accent:     "#C4713A",   // Terracota (CTA, ícono activo)
    gold:       "#D4A85A",   // Dorado (títulos especiales)
    cream:      "#F4EDE4",   // Crema cálido (texto principal)
    muted:      "#C8D9E6",   // Azul claro (fecha, subtítulos)
    dark:       "rgba(28,42,58,", // Base del overlay (usar con opacidad)
  },

  // ─── Tipografías ────────────────────────────────────────
  fonts: {
    display:  "'Playfair Display', serif",   // Nombres, títulos románticos
    serif:    "'Crimson Text', serif",        // Fecha, citas
    sans:     "'Lato', sans-serif",          // Labels, datos técnicos
  },

  // ─── Overlays del hero ──────────────────────────────────
  heroOverlay: "linear-gradient(to bottom, rgba(28,42,58,0.72) 0%, rgba(28,42,58,0.55) 50%, rgba(28,42,58,0.8) 100%)",

  // ─── Decoraciones ───────────────────────────────────────
  leaf:   "#4A7FA5",
  floral: "#8FAFC2",
  border: "#8FAFC2",
} as const;