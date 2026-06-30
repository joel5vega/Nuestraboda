import { useEffect, useRef } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import theme from "../../styles/theme";

const milestones = [
  { year: "2017",     title: "El Comienzo de la Aventura", desc: "Dos almas opuestas se encontraron… y todo cambió.",                               icon: "✦"  },
  { year: "2019",     title: "Un Propósito Compartido",    desc: "Servir juntos reveló lo que el corazón ya sabía.",                                  icon: "🔥" },
  { year: "2025",     title: "Reencuentro en Perú",        desc: "Perú fue testigo de un reencuentro que el cielo ya tenía escrito.",                  icon: "🗺️" },
  { year: "2026",     title: "La Noche del Gran Sí",       desc: "Bajo la lluvia, un «sí» que reescribió nuestro destino.",                           icon: "💍" },
  { year: "Agosto 1", title: "Nuestro Pacto en Cristo",    desc: "Hoy, ante Cristo y ante ustedes, nuestra historia se vuelve una.",                  icon: "✝️" },
];

// ─── Estilos ────────────────────────────────────────────────────────────────

const S = {
  section:      { background: theme.colors.dark + "1)" },
  label:        { color: theme.colors.primary,  fontFamily: theme.fonts.sans,    letterSpacing: "0.4em" },
  heading:      { fontFamily: theme.fonts.display, color: theme.colors.cream,    fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 400, fontStyle: "italic" as const },
  imageOverlay: { background: `linear-gradient(to bottom, transparent 60%, ${theme.colors.dark}0.6))` },
  imageShadow:  { boxShadow: `8px 8px 0px rgba(74,127,165,0.2), 16px 16px 0px rgba(74,127,165,0.1)` },
  quote:        { fontFamily: theme.fonts.serif, fontStyle: "italic" as const, color: theme.colors.cream,   fontSize: "1.1rem", textShadow: "0 1px 4px rgba(0,0,0,0.5)" },
  timelineLine: { background: `linear-gradient(to bottom, transparent, ${theme.leaf}, ${theme.leaf}, transparent)` },
  circle:       { background: `linear-gradient(135deg, #3A5068, ${theme.colors.dark}1))`, border: `2px solid ${theme.leaf}`, boxShadow: `0 0 20px rgba(74,127,165,0.2)` },
  year:         { color: theme.leaf, fontFamily: theme.fonts.sans, letterSpacing: "0.2em" },
  title:        { fontFamily: theme.fonts.display, color: theme.colors.cream, fontSize: "1.25rem", fontWeight: 400, marginTop: "4px", marginBottom: "8px" },
  desc:         { fontFamily: theme.fonts.serif, color: theme.colors.primary, fontSize: "1rem", lineHeight: 1.7 },
} as const;

// ─── Componente ─────────────────────────────────────────────────────────────

export function OurStory() {
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Scroll reveal para cada milestone
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) {
          (e.target as HTMLElement).style.opacity = "1";
          (e.target as HTMLElement).style.transform = "translateY(0)";
          observer.unobserve(e.target);
        }
      }),
      { threshold: 0.2 }
    );
    itemsRef.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-24" style={S.section}>
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-16">
          {/* <p className="tracking-[0.4em] uppercase mb-3 text-xs" style={S.label}>✦ Nuestra Historia ✦</p> */}
          <h2 style={S.heading}>Nuestra Historia</h2>
          <div className="flex items-center justify-center gap-3 mt-4">
            <div className="h-px w-16" style={{ background: `linear-gradient(to right, transparent, ${theme.leaf})` }} />
            <svg width="12" height="12" viewBox="0 0 12 12"><circle cx="6" cy="6" r="4" fill={theme.leaf} opacity="0.6"/></svg>
            <div className="h-px w-16" style={{ background: `linear-gradient(to left, transparent, ${theme.leaf})` }} />
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Imagen */}
          <div className="relative">
            <div className="relative rounded-sm overflow-hidden" style={S.imageShadow}>
              <ImageWithFallback src={coupleImage} alt="Betania y Joel" className="w-full h-[500px] object-cover" />
              <div className="absolute inset-0" style={S.imageOverlay} />
            </div>
            <div className="absolute -top-3 -left-3 w-20 h-20 border-t-2 border-l-2" style={{ borderColor: theme.leaf, opacity: 0.5 }} />
            <div className="absolute -bottom-3 -right-3 w-20 h-20 border-b-2 border-r-2" style={{ borderColor: theme.leaf, opacity: 0.5 }} />
            <div className="absolute bottom-6 left-6 right-6">
              <p style={S.quote}>"Siguiendo la verdad en amor <br />crezcamos en Cristo.<br />Efesios 4:15"</p>
            </div>
          </div>

          {/* Timeline */}
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-px" style={S.timelineLine} />
            <div className="space-y-10">
              {milestones.map((m, i) => (
                <div
                  key={m.year}
                  ref={(el) => { itemsRef.current[i] = el; }}
                  className="relative flex gap-8"
                  style={{
                    opacity: 0,
                    transform: "translateY(28px)",
                    transition: `opacity 0.6s ease ${i * 0.12}s, transform 0.6s ease ${i * 0.12}s`,
                  }}
                >
                  <div className="relative z-10 flex-shrink-0">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center" style={S.circle}>
                      <span style={{ color: theme.colors.primary, fontSize: "1.1rem" }}>{m.icon}</span>
                    </div>
                  </div>
                  <div className="flex-1 pt-1">
                    <span className="text-xs tracking-[0.2em] uppercase" style={S.year}>{m.year}</span>
                    <h3 style={S.title}>{m.title}</h3>
                    <p style={S.desc}>{m.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}