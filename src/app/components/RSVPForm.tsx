import { useState } from "react";

type FormData = {
  name: string;
  email: string;
  guests: string;
  attendance: string;
  dietary: string;
  message: string;
};

export function RSVPForm() {
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    guests: "1",
    attendance: "",
    dietary: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  const inputStyle = {
    background: "rgba(74,127,165,0.06)",
    border: "1px solid rgba(74,127,165,0.25)",
    borderRadius: "2px",
    color: "#F4EDE4",
    fontFamily: "'Crimson Text', serif",
    fontSize: "1rem",
    padding: "12px 16px",
    width: "100%",
    outline: "none",
    transition: "border-color 0.2s",
  };

  const labelStyle = {
    fontFamily: "'Lato', sans-serif",
    fontSize: "0.75rem",
    letterSpacing: "0.2em",
    textTransform: "uppercase" as const,
    color: "#8FAFC2",
    display: "block",
    marginBottom: "8px",
  };

  return (
    <section className="py-24 px-6" style={{ background: "#1C2A3A" }}>
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="tracking-[0.4em] uppercase mb-3 text-xs" style={{ color: "#8FAFC2", fontFamily: "'Lato', sans-serif" }}>
            ✦ Confirmación ✦
          </p>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            color: "#F4EDE4",
            fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
            fontWeight: 400,
            fontStyle: "italic"
          }}>
            Confirma tu asistencia
          </h2>
          <div className="flex items-center justify-center gap-3 mt-4">
            <div className="h-px w-16" style={{ background: "linear-gradient(to right, transparent, #4A7FA5)" }} />
            <svg width="12" height="12" viewBox="0 0 12 12"><circle cx="6" cy="6" r="4" fill="#4A7FA5" opacity="0.6"/></svg>
            <div className="h-px w-16" style={{ background: "linear-gradient(to left, transparent, #4A7FA5)" }} />
          </div>
          <p className="mt-6" style={{ fontFamily: "'Crimson Text', serif", color: "#8FAFC2", fontSize: "1.05rem", fontStyle: "italic" }}>
            Por favor confirma tu asistencia antes del <strong style={{ color: "#C8D9E6" }}>14 de Mayo, 2026</strong>
          </p>
        </div>

        {submitted ? (
          <div className="text-center p-12 rounded-sm" style={{
            background: "rgba(74,127,165,0.1)",
            border: "1px solid rgba(74,127,165,0.3)"
          }}>
            <div className="mb-6">
              <svg className="mx-auto" width="64" height="64" viewBox="0 0 64 64" fill="none">
                <circle cx="32" cy="32" r="30" stroke="#4A7FA5" strokeWidth="1.5" opacity="0.6"/>
                <path d="M20 32L28 40L44 24" stroke="#8FAFC2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 style={{ fontFamily: "'Playfair Display', serif", color: "#F4EDE4", fontSize: "2rem", fontWeight: 400, marginBottom: "12px" }}>
              ¡Gracias, {form.name}!
            </h3>
            <p style={{ fontFamily: "'Crimson Text', serif", color: "#8FAFC2", fontSize: "1.1rem", lineHeight: 1.7, fontStyle: "italic" }}>
              {form.attendance === "yes"
                ? "Tu asistencia ha sido confirmada. ¡Nos vemos el 14 de junio para celebrar con Joel y Betania!"
                : "Lamentamos que no puedas acompañarnos, pero te tendremos en nuestro corazón."}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative rounded-sm p-8 space-y-6" style={{
              background: "rgba(44,61,79,0.5)",
              border: "1px solid rgba(74,127,165,0.2)"
            }}>
              {/* Decorative corners */}
              <div className="absolute top-4 left-4 w-8 h-8 border-t border-l" style={{ borderColor: "#4A7FA5", opacity: 0.3 }} />
              <div className="absolute top-4 right-4 w-8 h-8 border-t border-r" style={{ borderColor: "#4A7FA5", opacity: 0.3 }} />
              <div className="absolute bottom-4 left-4 w-8 h-8 border-b border-l" style={{ borderColor: "#4A7FA5", opacity: 0.3 }} />
              <div className="absolute bottom-4 right-4 w-8 h-8 border-b border-r" style={{ borderColor: "#4A7FA5", opacity: 0.3 }} />

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label style={labelStyle}>Nombre completo</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    placeholder="Tu nombre"
                    style={{ ...inputStyle, caretColor: "#8FAFC2" }}
                    onFocus={e => e.target.style.borderColor = "#4A7FA5"}
                    onBlur={e => e.target.style.borderColor = "rgba(74,127,165,0.25)"}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Correo electrónico</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="tu@correo.com"
                    style={{ ...inputStyle, caretColor: "#8FAFC2" }}
                    onFocus={e => e.target.style.borderColor = "#4A7FA5"}
                    onBlur={e => e.target.style.borderColor = "rgba(74,127,165,0.25)"}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label style={labelStyle}>¿Asistirás?</label>
                  <select
                    name="attendance"
                    value={form.attendance}
                    onChange={handleChange}
                    required
                    style={{ ...inputStyle, cursor: "pointer" }}
                  >
                    <option value="" style={{ background: "#2C3D4F" }}>Selecciona una opción</option>
                    <option value="yes" style={{ background: "#2C3D4F" }}>¡Sí, ahí estaré! 🎉</option>
                    <option value="no" style={{ background: "#2C3D4F" }}>Lamentablemente no podré</option>
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Número de acompañantes</label>
                  <select
                    name="guests"
                    value={form.guests}
                    onChange={handleChange}
                    style={{ ...inputStyle, cursor: "pointer" }}
                  >
                    {[1, 2, 3, 4, 5].map(n => (
                      <option key={n} value={n} style={{ background: "#2C3D4F" }}>
                        {n} {n === 1 ? "persona" : "personas"}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label style={labelStyle}>Restricciones alimentarias</label>
                <input
                  type="text"
                  name="dietary"
                  value={form.dietary}
                  onChange={handleChange}
                  placeholder="Vegetariano, alergia al gluten, etc. (opcional)"
                  style={{ ...inputStyle, caretColor: "#8FAFC2" }}
                  onFocus={e => e.target.style.borderColor = "#4A7FA5"}
                  onBlur={e => e.target.style.borderColor = "rgba(74,127,165,0.25)"}
                />
              </div>

              <div>
                <label style={labelStyle}>Mensaje para los novios</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Escríbeles un mensaje especial..."
                  style={{ ...inputStyle, resize: "vertical", caretColor: "#8FAFC2" }}
                  onFocus={e => e.target.style.borderColor = "#4A7FA5"}
                  onBlur={e => e.target.style.borderColor = "rgba(74,127,165,0.25)"}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-sm transition-all duration-300 hover:opacity-90 active:scale-[0.99] disabled:opacity-60"
                style={{
                  background: "linear-gradient(135deg, #4A7FA5, #3A6585)",
                  color: "#F4EDE4",
                  fontFamily: "'Lato', sans-serif",
                  fontSize: "0.8rem",
                  letterSpacing: "0.3em",
                  textTransform: "uppercase",
                  border: "1px solid rgba(143,175,194,0.2)",
                  boxShadow: "0 4px 20px rgba(74,127,165,0.3)"
                }}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-3">
                    <svg className="animate-spin" width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <circle cx="8" cy="8" r="6" stroke="#8FAFC2" strokeWidth="2" strokeDasharray="20 10"/>
                    </svg>
                    Enviando...
                  </span>
                ) : (
                  "Confirmar asistencia"
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}