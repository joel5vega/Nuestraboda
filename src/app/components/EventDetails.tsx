import { ImageWithFallback } from "./figma/ImageWithFallback";

const venueImage = "https://images.unsplash.com/photo-1586880043376-2b7bd270cd4b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxydXN0aWMlMjB3ZWRkaW5nJTIwdmVudWUlMjBiYXJuJTIwd29vZHxlbnwxfHx8fDE3NzcwNDQxMTF8MA&ixlib=rb-4.1.0&q=80&w=1080";

const ChurchIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <path d="M16 2L16 8M13 5H19" stroke="#8FAFC2" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M8 10H24V28H8V10Z" stroke="#8FAFC2" strokeWidth="1.5"/>
    <path d="M13 28V20H19V28" stroke="#8FAFC2" strokeWidth="1.5"/>
    <path d="M11 14H14M18 14H21M11 18H14M18 18H21" stroke="#8FAFC2" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M4 28H28" stroke="#8FAFC2" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const DinnerIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <path d="M10 6V14C10 16.2 11.8 18 14 18V28M14 6V28" stroke="#8FAFC2" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M20 6C20 6 22 8 22 12C22 15 20 16 20 16V28" stroke="#8FAFC2" strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="16" cy="16" r="13" stroke="#8FAFC2" strokeWidth="1" opacity="0.2"/>
  </svg>
);

const MapPinIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path d="M9 1C6.24 1 4 3.24 4 6C4 9.75 9 17 9 17C9 17 14 9.75 14 6C14 3.24 11.76 1 9 1Z" fill="#4A7FA5" opacity="0.8"/>
    <circle cx="9" cy="6" r="2" fill="#F4EDE4"/>
  </svg>
);

const ClockIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <circle cx="9" cy="9" r="7" stroke="#4A7FA5" strokeWidth="1.5" opacity="0.8"/>
    <path d="M9 5V9L11.5 11.5" stroke="#4A7FA5" strokeWidth="1.5" strokeLinecap="round" opacity="0.8"/>
  </svg>
);

export function EventDetails() {
  return (
    <section className="py-24 px-6" style={{ background: "#F4EDE4" }}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="tracking-[0.4em] uppercase mb-3 text-xs" style={{ color: "#4A7FA5", fontFamily: "'Lato', sans-serif" }}>
            ✦ Detalles del Evento ✦
          </p>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            color: "#2C3D4F",
            fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
            fontWeight: 400
          }}>
            Acompáñanos en este día especial
          </h2>
          <div className="flex items-center justify-center gap-3 mt-4">
            <div className="h-px w-16" style={{ background: "linear-gradient(to right, transparent, #8FAFC2)" }} />
            <svg width="12" height="12" viewBox="0 0 12 12"><circle cx="6" cy="6" r="4" fill="#4A7FA5" opacity="0.5"/></svg>
            <div className="h-px w-16" style={{ background: "linear-gradient(to left, transparent, #8FAFC2)" }} />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Ceremony Card */}
          <div className="relative rounded-sm overflow-hidden" style={{
            background: "linear-gradient(145deg, #2C3D4F, #3A5068)",
            boxShadow: "0 8px 32px rgba(44,61,79,0.3)"
          }}>
            {/* Wood grain */}
            <div className="absolute inset-0 opacity-5" style={{
              backgroundImage: `repeating-linear-gradient(
                87deg,
                transparent,
                transparent 3px,
                rgba(255,255,255,0.15) 3px,
                rgba(255,255,255,0.15) 4px
              )`
            }} />
            {/* Border */}
            <div className="absolute inset-3 border opacity-20 pointer-events-none" style={{ borderColor: "#8FAFC2" }} />

            <div className="relative p-10">
              <div className="flex items-center gap-3 mb-6">
                <ChurchIcon />
                <span className="tracking-[0.3em] uppercase text-xs" style={{ color: "#8FAFC2", fontFamily: "'Lato', sans-serif" }}>Ceremonia</span>
              </div>

              <h3 style={{
                fontFamily: "'Playfair Display', serif",
                color: "#F4EDE4",
                fontSize: "1.8rem",
                fontWeight: 400,
                marginBottom: "16px"
              }}>
                Parroquia de San Miguel
              </h3>

              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3">
                  <ClockIcon />
                  <span style={{ color: "#C8D9E6", fontFamily: "'Crimson Text', serif", fontSize: "1.05rem" }}>4:00 PM — Sábado, 14 de Junio 2026</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPinIcon />
                  <span style={{ color: "#C8D9E6", fontFamily: "'Crimson Text', serif", fontSize: "1.05rem" }}>Av. Constitución 450, Centro, Monterrey</span>
                </div>
              </div>

              <p style={{ color: "#8FAFC2", fontFamily: "'Crimson Text', serif", fontSize: "0.95rem", lineHeight: 1.7, fontStyle: "italic" }}>
                Les pedimos llegar 15 minutos antes de la hora indicada para que todos estemos listos para este momento tan especial.
              </p>

              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-6 px-6 py-2.5 rounded-sm transition-all duration-300 hover:opacity-80"
                style={{
                  border: "1px solid #4A7FA5",
                  color: "#8FAFC2",
                  fontFamily: "'Lato', sans-serif",
                  fontSize: "0.8rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  textDecoration: "none"
                }}
              >
                <MapPinIcon />
                Ver en el mapa
              </a>
            </div>
          </div>

          {/* Reception Card */}
          <div className="relative rounded-sm overflow-hidden" style={{
            background: "linear-gradient(145deg, #2C3D4F, #3A5068)",
            boxShadow: "0 8px 32px rgba(44,61,79,0.3)"
          }}>
            <div className="absolute inset-0 opacity-5" style={{
              backgroundImage: `repeating-linear-gradient(
                87deg,
                transparent,
                transparent 3px,
                rgba(255,255,255,0.15) 3px,
                rgba(255,255,255,0.15) 4px
              )`
            }} />
            <div className="absolute inset-3 border opacity-20 pointer-events-none" style={{ borderColor: "#8FAFC2" }} />

            {/* Venue image */}
            <div className="relative h-48 overflow-hidden">
              <ImageWithFallback
                src={venueImage}
                alt="Hacienda El Roble"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent, rgba(44,61,79,0.9))" }} />
            </div>

            <div className="relative p-10 -mt-2">
              <div className="flex items-center gap-3 mb-6">
                <DinnerIcon />
                <span className="tracking-[0.3em] uppercase text-xs" style={{ color: "#8FAFC2", fontFamily: "'Lato', sans-serif" }}>Recepción</span>
              </div>

              <h3 style={{
                fontFamily: "'Playfair Display', serif",
                color: "#F4EDE4",
                fontSize: "1.8rem",
                fontWeight: 400,
                marginBottom: "16px"
              }}>
                Hacienda El Roble
              </h3>

              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3">
                  <ClockIcon />
                  <span style={{ color: "#C8D9E6", fontFamily: "'Crimson Text', serif", fontSize: "1.05rem" }}>6:30 PM — Hasta las 2:00 AM</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPinIcon />
                  <span style={{ color: "#C8D9E6", fontFamily: "'Crimson Text', serif", fontSize: "1.05rem" }}>Carretera Nacional Km. 23, Monterrey</span>
                </div>
              </div>

              <p style={{ color: "#8FAFC2", fontFamily: "'Crimson Text', serif", fontSize: "0.95rem", lineHeight: 1.7, fontStyle: "italic" }}>
                La noche promete ser mágica con cena, baile y muchos momentos inolvidables en esta hermosa hacienda rústica.
              </p>

              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-6 px-6 py-2.5 rounded-sm transition-all duration-300 hover:opacity-80"
                style={{
                  border: "1px solid #4A7FA5",
                  color: "#8FAFC2",
                  fontFamily: "'Lato', sans-serif",
                  fontSize: "0.8rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  textDecoration: "none"
                }}
              >
                <MapPinIcon />
                Ver en el mapa
              </a>
            </div>
          </div>
        </div>

        {/* Dress code */}
        <div className="mt-8 p-8 rounded-sm text-center" style={{
          background: "rgba(74,127,165,0.08)",
          border: "1px solid rgba(74,127,165,0.2)"
        }}>
          <p className="tracking-[0.35em] uppercase text-xs mb-2" style={{ color: "#4A7FA5", fontFamily: "'Lato', sans-serif" }}>Código de Vestimenta</p>
          <p style={{ fontFamily: "'Playfair Display', serif", color: "#2C3D4F", fontSize: "1.5rem", fontWeight: 400 }}>Formal Elegante</p>
          <p style={{ fontFamily: "'Crimson Text', serif", color: "#6B8FA3", fontSize: "1rem", marginTop: "8px" }}>
            Paleta sugerida: tonos azul acero, crema, gris y café rústico
          </p>
        </div>
      </div>
    </section>
  );
}
