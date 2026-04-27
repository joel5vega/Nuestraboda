const scheduleItems = [
  { time: "3:45 PM", event: "Llegada de los invitados", desc: "Recibimiento en la entrada de la Parroquia", icon: "✦" },
  { time: "4:00 PM", event: "Ceremonia religiosa", desc: "Unión sagrada ante Dios y sus seres queridos", icon: "♡" },
  { time: "5:30 PM", event: "Sesión de fotos", desc: "Captura de los momentos más especiales", icon: "◈" },
  { time: "6:30 PM", event: "Cóctel de bienvenida", desc: "Aperitivos y música en vivo en la hacienda", icon: "◇" },
  { time: "8:00 PM", event: "Cena de gala", desc: "Banquete con menú de tres tiempos", icon: "❦" },
  { time: "9:30 PM", event: "Vals y primer baile", desc: "El momento más esperado de la noche", icon: "✿" },
  { time: "10:00 PM", event: "Fiesta y baile", desc: "¡A bailar toda la noche con la mejor música!", icon: "✦" },
  { time: "2:00 AM", event: "Brunch de madrugada", desc: "Snacks y café para continuar la celebración", icon: "◉" },
];

export function Schedule() {
  return (
    <section className="py-24 px-6" style={{ background: "#2C3D4F" }}>
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="tracking-[0.4em] uppercase mb-3 text-xs" style={{ color: "#8FAFC2", fontFamily: "'Lato', sans-serif" }}>
            ✦ Programa ✦
          </p>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            color: "#F4EDE4",
            fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
            fontWeight: 400,
            fontStyle: "italic"
          }}>
            El día en detalle
          </h2>
          <div className="flex items-center justify-center gap-3 mt-4">
            <div className="h-px w-16" style={{ background: "linear-gradient(to right, transparent, #4A7FA5)" }} />
            <svg width="12" height="12" viewBox="0 0 12 12"><circle cx="6" cy="6" r="4" fill="#4A7FA5" opacity="0.6"/></svg>
            <div className="h-px w-16" style={{ background: "linear-gradient(to left, transparent, #4A7FA5)" }} />
          </div>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Center line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2" style={{
            background: "linear-gradient(to bottom, transparent, #4A7FA5 10%, #4A7FA5 90%, transparent)"
          }} />

          <div className="space-y-8">
            {scheduleItems.map((item, i) => {
              const isLeft = i % 2 === 0;
              return (
                <div key={`${item.time}-${i}`} className={`relative flex items-center gap-0 ${isLeft ? "flex-row" : "flex-row-reverse"}`}>
                  {/* Content */}
                  <div className={`w-[calc(50%-2rem)] ${isLeft ? "text-right pr-6" : "text-left pl-6"}`}>
                    <div
                      className="inline-block p-4 rounded-sm"
                      style={{
                        background: "rgba(74,127,165,0.08)",
                        border: "1px solid rgba(74,127,165,0.2)",
                        maxWidth: "260px"
                      }}
                    >
                      <p className="text-xs tracking-[0.2em] uppercase mb-1" style={{ color: "#4A7FA5", fontFamily: "'Lato', sans-serif" }}>
                        {item.time}
                      </p>
                      <p style={{
                        fontFamily: "'Playfair Display', serif",
                        color: "#F4EDE4",
                        fontSize: "1rem",
                        fontWeight: 400,
                        marginBottom: "4px"
                      }}>
                        {item.event}
                      </p>
                      <p style={{
                        fontFamily: "'Crimson Text', serif",
                        color: "#8FAFC2",
                        fontSize: "0.9rem",
                        lineHeight: 1.5,
                        fontStyle: "italic"
                      }}>
                        {item.desc}
                      </p>
                    </div>
                  </div>

                  {/* Center dot */}
                  <div className="absolute left-1/2 -translate-x-1/2 z-10">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{
                      background: "linear-gradient(135deg, #3A5068, #2C3D4F)",
                      border: "2px solid #4A7FA5",
                      boxShadow: "0 0 12px rgba(74,127,165,0.3)"
                    }}>
                      <span style={{ color: "#8FAFC2", fontSize: "0.75rem" }}>{item.icon}</span>
                    </div>
                  </div>

                  {/* Empty side */}
                  <div className="w-[calc(50%-2rem)]" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
