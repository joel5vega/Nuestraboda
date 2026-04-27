import { useState } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const photos = [
  {
    src: "https://images.unsplash.com/photo-1677677403344-029c7fcd7300?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxydXN0aWMlMjB3ZWRkaW5nJTIwY2VyZW1vbnklMjBvdXRkb29yfGVufDF8fHx8MTc3NzA0NDExMHww&ixlib=rb-4.1.0&q=80&w=1080",
    alt: "Ceremonia al aire libre",
    size: "tall",
  },
  {
    src: "https://images.unsplash.com/photo-1690332547953-b98f4f4844e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwcmluZ3MlMjB3b29kJTIwdGFibGUlMjBydXN0aWN8ZW58MXx8fHwxNzc3MDQ0MTE3fDA&ixlib=rb-4.1.0&q=80&w=1080",
    alt: "Los anillos",
    size: "normal",
  },
  {
    src: "https://images.unsplash.com/photo-1517836833107-0ce99b4a1dc4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwZmxvd2VycyUyMGJvdXF1ZXQlMjBibHVlfGVufDF8fHx8MTc3NzA0NDExNHww&ixlib=rb-4.1.0&q=80&w=1080",
    alt: "El ramo",
    size: "normal",
  },
  {
    src: "https://images.unsplash.com/photo-1776458027239-161226d01213?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwY291cGxlJTIwcG9ydHJhaXQlMjBmb3Jlc3R8ZW58MXx8fHwxNzc3MDQ0MTExfDA&ixlib=rb-4.1.0&q=80&w=1080",
    alt: "La pareja",
    size: "wide",
  },
  {
    src: "https://images.unsplash.com/photo-1768777270882-9f74939fee50?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwcmVjZXB0aW9uJTIwdGFibGUlMjBkZWNvciUyMGVsZWdhbnR8ZW58MXx8fHwxNzc3MDQ0MTE4fDA&ixlib=rb-4.1.0&q=80&w=1080",
    alt: "Decoración de mesa",
    size: "normal",
  },
  {
    src: "https://images.unsplash.com/photo-1776383867854-36b71f5cda28?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb21hbnRpYyUyMGNvdXBsZSUyMGRhbmNpbmclMjB3ZWRkaW5nfGVufDF8fHx8MTc3NzA0NDExOHww&ixlib=rb-4.1.0&q=80&w=1080",
    alt: "El baile",
    size: "tall",
  },
];

export function Gallery() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <section className="py-24 px-6" style={{ background: "#F4EDE4" }}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="tracking-[0.4em] uppercase mb-3 text-xs" style={{ color: "#4A7FA5", fontFamily: "'Lato', sans-serif" }}>
            ✦ Galería ✦
          </p>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            color: "#2C3D4F",
            fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
            fontWeight: 400
          }}>
            Nuestros momentos
          </h2>
          <div className="flex items-center justify-center gap-3 mt-4">
            <div className="h-px w-16" style={{ background: "linear-gradient(to right, transparent, #8FAFC2)" }} />
            <svg width="12" height="12" viewBox="0 0 12 12"><circle cx="6" cy="6" r="4" fill="#4A7FA5" opacity="0.5"/></svg>
            <div className="h-px w-16" style={{ background: "linear-gradient(to left, transparent, #8FAFC2)" }} />
          </div>
        </div>

        {/* Masonry grid */}
        <div className="columns-2 md:columns-3 gap-4 space-y-4">
          {photos.map((photo, i) => (
            <div
              key={`gallery-${i}`}
              className="break-inside-avoid relative overflow-hidden rounded-sm cursor-pointer group"
              style={{
                boxShadow: "0 4px 16px rgba(44,61,79,0.15)",
                border: "1px solid rgba(74,127,165,0.15)"
              }}
              onClick={() => setSelected(i)}
            >
              <ImageWithFallback
                src={photo.src}
                alt={photo.alt}
                className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                style={{ aspectRatio: photo.size === "tall" ? "3/4" : photo.size === "wide" ? "4/3" : "1/1" }}
              />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center" style={{ background: "rgba(44,61,79,0.5)" }}>
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: "rgba(74,127,165,0.7)", border: "1px solid #8FAFC2" }}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <circle cx="9" cy="9" r="6" stroke="#F4EDE4" strokeWidth="1.5"/>
                    <path d="M14 14L18 18" stroke="#F4EDE4" strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M9 6V12M6 9H12" stroke="#F4EDE4" strokeWidth="1.5" strokeLinecap="round"/>
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
          style={{ background: "rgba(28,42,58,0.95)" }}
          onClick={() => setSelected(null)}
        >
          <button
            className="absolute top-6 right-6 w-10 h-10 rounded-full flex items-center justify-center transition-colors hover:bg-white/10"
            style={{ border: "1px solid rgba(143,175,194,0.4)" }}
            onClick={() => setSelected(null)}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 2L14 14M14 2L2 14" stroke="#8FAFC2" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>

          <div className="max-w-3xl w-full" onClick={e => e.stopPropagation()}>
            <ImageWithFallback
              src={photos[selected].src}
              alt={photos[selected].alt}
              className="w-full rounded-sm object-cover"
              style={{ maxHeight: "80vh" }}
            />
            <p className="text-center mt-4" style={{ color: "#8FAFC2", fontFamily: "'Crimson Text', serif", fontStyle: "italic" }}>
              {photos[selected].alt}
            </p>
          </div>

          {/* Prev/Next */}
          {selected > 0 && (
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center transition-colors hover:bg-white/10"
              style={{ border: "1px solid rgba(143,175,194,0.3)" }}
              onClick={e => { e.stopPropagation(); setSelected(selected - 1); }}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M13 4L7 10L13 16" stroke="#8FAFC2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          )}
          {selected < photos.length - 1 && (
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center transition-colors hover:bg-white/10"
              style={{ border: "1px solid rgba(143,175,194,0.3)" }}
              onClick={e => { e.stopPropagation(); setSelected(selected + 1); }}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M7 4L13 10L7 16" stroke="#8FAFC2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          )}
        </div>
      )}
    </section>
  );
}
