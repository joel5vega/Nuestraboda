import { ImageWithFallback } from "./figma/ImageWithFallback";

const coupleImage = "https://images.unsplash.com/photo-1776458027239-161226d01213?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwY291cGxlJTIwcG9ydHJhaXQlMjBmb3Jlc3R8ZW58MXx8fHwxNzc3MDQ0MTExfDA&ixlib=rb-4.1.0&q=80&w=1080";

const milestones = [
  {
    year: "2018",
    title: "El primer encuentro",
    desc: "Nos conocimos en una tarde de otoño en la plaza central. Una mirada fue suficiente para saber que algo especial estaba comenzando.",
    icon: "✦",
  },
  {
    year: "2020",
    title: "La primera aventura",
    desc: "Nuestro primer viaje juntos a las montañas del norte confirmó lo que ambos ya sabíamos en el corazón.",
    icon: "♡",
  },
  {
    year: "2023",
    title: "La propuesta",
    desc: "Bajo el cielo estrellado de Guanajuato, Joel se arrodilló y Betania dijo el más hermoso \"sí\" de su vida.",
    icon: "◈",
  },
  {
    year: "2026",
    title: "Para siempre",
    desc: "Hoy celebramos el comienzo de nuestra historia más grande, rodeados de quienes más amamos.",
    icon: "❦",
  },
];

export function OurStory() {
  return (
    <section className="py-24" style={{ background: "#2C3D4F" }}>
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="tracking-[0.4em] uppercase mb-3 text-xs" style={{ color: "#8FAFC2", fontFamily: "'Lato', sans-serif" }}>
            ✦ Nuestra Historia ✦
          </p>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            color: "#F4EDE4",
            fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
            fontWeight: 400,
            fontStyle: "italic"
          }}>
            El camino que nos trajo aquí
          </h2>
          <div className="flex items-center justify-center gap-3 mt-4">
            <div className="h-px w-16" style={{ background: "linear-gradient(to right, transparent, #4A7FA5)" }} />
            <svg width="12" height="12" viewBox="0 0 12 12"><circle cx="6" cy="6" r="4" fill="#4A7FA5" opacity="0.6"/></svg>
            <div className="h-px w-16" style={{ background: "linear-gradient(to left, transparent, #4A7FA5)" }} />
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <div className="relative">
            <div className="relative rounded-sm overflow-hidden" style={{
              boxShadow: "8px 8px 0px rgba(74,127,165,0.2), 16px 16px 0px rgba(74,127,165,0.1)"
            }}>
              <ImageWithFallback
                src={coupleImage}
                alt="Betania y Joel"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 60%, rgba(44,61,79,0.6))" }} />
            </div>
            {/* Decorative frame */}
            <div className="absolute -top-3 -left-3 w-20 h-20 border-t-2 border-l-2" style={{ borderColor: "#4A7FA5", opacity: 0.5 }} />
            <div className="absolute -bottom-3 -right-3 w-20 h-20 border-b-2 border-r-2" style={{ borderColor: "#4A7FA5", opacity: 0.5 }} />

            {/* Quote overlay */}
            <div className="absolute bottom-6 left-6 right-6">
              <p style={{
                fontFamily: "'Crimson Text', serif",
                fontStyle: "italic",
                color: "#F4EDE4",
                fontSize: "1.1rem",
                textShadow: "0 1px 4px rgba(0,0,0,0.5)"
              }}>
                "El amor verdadero no tiene un final feliz,<br />porque el amor verdadero nunca termina."
              </p>
            </div>
          </div>

          {/* Timeline */}
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-px" style={{ background: "linear-gradient(to bottom, transparent, #4A7FA5, #4A7FA5, transparent)" }} />

            <div className="space-y-10">
              {milestones.map((m, i) => (
                <div key={m.year} className="relative flex gap-8">
                  {/* Circle */}
                  <div className="relative z-10 flex-shrink-0">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{
                      background: "linear-gradient(135deg, #3A5068, #2C3D4F)",
                      border: "2px solid #4A7FA5",
                      boxShadow: "0 0 20px rgba(74,127,165,0.2)"
                    }}>
                      <span style={{ color: "#8FAFC2", fontSize: "1.1rem" }}>{m.icon}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 pt-1">
                    <span className="text-xs tracking-[0.2em] uppercase" style={{ color: "#4A7FA5", fontFamily: "'Lato', sans-serif" }}>
                      {m.year}
                    </span>
                    <h3 style={{
                      fontFamily: "'Playfair Display', serif",
                      color: "#F4EDE4",
                      fontSize: "1.25rem",
                      fontWeight: 400,
                      marginTop: "4px",
                      marginBottom: "8px"
                    }}>
                      {m.title}
                    </h3>
                    <p style={{
                      fontFamily: "'Crimson Text', serif",
                      color: "#8FAFC2",
                      fontSize: "1rem",
                      lineHeight: 1.7
                    }}>
                      {m.desc}
                    </p>
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