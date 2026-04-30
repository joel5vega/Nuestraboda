import { useState, useEffect, useRef } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import hands      from "../../assets/hands.jpg";
import hugBlack   from "../../assets/hugBlack.jpg";
import lookAbove  from "../../assets/lookAbove.jpg";
import loveAndServe from "../../assets/loveAndServe.jpg";
import sajama     from "../../assets/sajama.jpg";
import jiwasa     from "../../assets/jiwasa.png";
import  theme  from "../../styles/theme";

const photos = [
  { src: hands,        alt: "Ceremonia al aire libre", size: "tall"   },
  { src: lookAbove,    alt: "Los anillos",             size: "normal" },
  { src: jiwasa,       alt: "El lugar",                size: "normal" },
  { src: loveAndServe, alt: "La pareja",               size: "wide"   },
  { src: sajama,       alt: "Decoración de mesa",      size: "normal" },
  { src: hugBlack,     alt: "El baile",                size: "tall"   },
];

// ─── Estilos ────────────────────────────────────────────────────────────────

const S = {
  section:      { background: theme.colors.cream },
  label:        { color: theme.leaf,            fontFamily: theme.fonts.sans,    letterSpacing: "0.4em" },
  heading:      { fontFamily: theme.fonts.display, color: theme.colors.dark + "1)", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 400 },
  card:         { boxShadow: `0 4px 16px rgba(44,61,79,0.15)`, border: `1px solid rgba(74,127,165,0.15)` },
  overlay:      { background: `rgba(44,61,79,0.5)` },
  zoomBtn:      { background: `rgba(74,127,165,0.7)`, border: `1px solid ${theme.colors.primary}` },
  lightboxBg:   { background: "rgba(28,42,58,0.95)" },
  navBtn:       { border: `1px solid rgba(143,175,194,0.3)` },
  caption:      { color: theme.colors.primary, fontFamily: theme.fonts.serif, fontStyle: "italic" as const },
} as const;

// ─── Componente ─────────────────────────────────────────────────────────────

export function Gallery() {
  const [selected, setSelected] = useState<number | null>(null);
  const cardsRef  = useRef<(HTMLDivElement | null)[]>([]);

  // Scroll reveal para las cards
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) {
          (e.target as HTMLElement).style.opacity = "1";
          (e.target as HTMLElement).style.transform = "translateY(0) scale(1)";
          observer.unobserve(e.target);
        }
      }),
      { threshold: 0.1 }
    );
    cardsRef.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Cerrar lightbox con Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
      if (e.key === "ArrowLeft"  && selected !== null && selected > 0)                    setSelected(selected - 1);
      if (e.key === "ArrowRight" && selected !== null && selected < photos.length - 1)    setSelected(selected + 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selected]);

  return (
    <section className="py-24 px-6" style={S.section}>
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <p className="tracking-[0.4em] uppercase mb-3 text-xs" style={S.label}>✦ Galería ✦</p>
          <h2 style={S.heading}>Nuestros momentos</h2>
          <div className="flex items-center justify-center gap-3 mt-4">
            <div className="h-px w-16" style={{ background: `linear-gradient(to right, transparent, ${theme.colors.primary})` }} />
            <svg width="12" height="12" viewBox="0 0 12 12"><circle cx="6" cy="6" r="4" fill={theme.leaf} opacity="0.5"/></svg>
            <div className="h-px w-16" style={{ background: `linear-gradient(to left, transparent, ${theme.colors.primary})` }} />
          </div>
        </div>

        {/* Masonry grid */}
        <div className="columns-2 md:columns-3 gap-4 space-y-4">
          {photos.map((photo, i) => (
            <div
              key={`gallery-${i}`}
              ref={(el) => { cardsRef.current[i] = el; }}
              className="break-inside-avoid relative overflow-hidden rounded-sm cursor-pointer group"
              style={{
                ...S.card,
                opacity: 0,
                transform: "translateY(24px) scale(0.98)",
                transition: `opacity 0.5s ease ${i * 0.08}s, transform 0.5s ease ${i * 0.08}s`,
              }}
              onClick={() => setSelected(i)}
            >
              <ImageWithFallback
                src={photo.src}
                alt={photo.alt}
                className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                style={{ aspectRatio: photo.size === "tall" ? "3/4" : photo.size === "wide" ? "4/3" : "1/1" }}
              />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center" style={S.overlay}>
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={S.zoomBtn}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <circle cx="9" cy="9" r="6" stroke={theme.colors.cream} strokeWidth="1.5"/>
                    <path d="M14 14L18 18" stroke={theme.colors.cream} strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M9 6V12M6 9H12" stroke={theme.colors.cream} strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selected !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={S.lightboxBg}
          onClick={() => setSelected(null)}
        >
          <button
            className="absolute top-6 right-6 w-10 h-10 rounded-full flex items-center justify-center transition-colors hover:bg-white/10"
            style={{ border: `1px solid rgba(143,175,194,0.4)` }}
            onClick={() => setSelected(null)}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 2L14 14M14 2L2 14" stroke={theme.colors.primary} strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>

          <div className="max-w-3xl w-full" onClick={(e) => e.stopPropagation()}>
            <ImageWithFallback
              src={photos[selected].src}
              alt={photos[selected].alt}
              className="w-full rounded-sm object-cover"
              style={{ maxHeight: "80vh" }}
            />
            <p className="text-center mt-4" style={S.caption}>{photos[selected].alt}</p>
          </div>

          {selected > 0 && (
            <button className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center transition-colors hover:bg-white/10"
              style={S.navBtn}
              onClick={(e) => { e.stopPropagation(); setSelected(selected - 1); }}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M13 4L7 10L13 16" stroke={theme.colors.primary} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          )}
          {selected < photos.length - 1 && (
            <button className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center transition-colors hover:bg-white/10"
              style={S.navBtn}
              onClick={(e) => { e.stopPropagation(); setSelected(selected + 1); }}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M7 4L13 10L7 16" stroke={theme.colors.primary} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          )}
        </div>
      )}
    </section>
  );
}