import { useState } from "react";
import { colors, fonts, gradients } from "../../styles/theme";

type FormData = {
  name:      string;
  phone:     string;
  companion: string; // "no" | "sí"
  adults:    string;
  children:  string;
};

// ─── Estilos ─────────────────────────────────────────────────────────────────

const S = {
  section:   { background: `linear-gradient(to bottom, ${colors.bgDark}, ${colors.bgCard})`, padding: "1rem 1rem 5rem 1rem" },
  label:     { fontFamily: fonts.sans, fontSize: "0.7rem", letterSpacing: "0.45em", textTransform: "uppercase" as const, color: colors.accentBlue, marginBottom: "0.75rem" },
  heading:   { fontFamily: fonts.display, color: colors.textPrimary, fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 400, fontStyle: "italic" as const, margin: "0 0 0.5rem" },
  deadline:  { fontFamily: fonts.serif, fontStyle: "italic" as const, color: colors.accentBlue, fontSize: "0.95rem", opacity: 0.8 },
  card:      { background: "rgba(255,255,255,0.03)", border: `1px solid ${colors.border}`, borderRadius: "8px", padding: "clamp(1.5rem, 4vw, 3rem)", maxWidth: "560px", margin: "0 auto", backdropFilter: "blur(4px)" },
  fieldLabel:{ fontFamily: fonts.sans, fontSize: "0.72rem", letterSpacing: "0.2em", textTransform: "uppercase" as const, color: colors.accentBlue, display: "block", marginBottom: "8px" },
  input:     { background: "rgba(74,127,165,0.06)", border: `1px solid rgba(74,127,165,0.25)`, borderRadius: "4px", color: colors.textPrimary, fontFamily: fonts.serif, fontSize: "1rem", padding: "12px 16px", width: "100%", outline: "none", transition: "border-color 0.2s ease, background 0.2s ease", caretColor: colors.accentBlue } as React.CSSProperties,
  btn:       { width: "100%", padding: "1rem", background: `linear-gradient(135deg, ${colors.accentTeal}, #3A6585)`, color: colors.textPrimary, fontFamily: fonts.sans, fontSize: "0.78rem", letterSpacing: "0.3em", textTransform: "uppercase" as const, border: `1px solid rgba(143,175,194,0.2)`, borderRadius: "4px", boxShadow: "0 4px 20px rgba(74,127,165,0.3)", cursor: "pointer", transition: "opacity 0.2s ease, transform 0.15s ease" },
  giftBox: {
  marginTop: "0.5rem",
  padding: "1.25rem",
  border: `1px solid rgba(143,175,194,0.18)`,
  borderRadius: "8px",
  background: "rgba(255,255,255,0.04)",
  textAlign: "center" as const,
},
giftText: {
  fontFamily: fonts.serif,
  color: colors.textPrimary,
  fontSize: "0.98rem",
  lineHeight: 1.75,
  maxWidth: "420px",
  margin: "0 auto 1rem",
},
giftQrWrap: {
  background: "#FFFFFF",
  padding: "10px",
  borderRadius: "10px",
  width: "fit-content",
  margin: "0 auto 0.85rem",
  boxShadow: "0 8px 24px rgba(0,0,0,0.18)",
},
giftNote: {
  fontFamily: fonts.sans,
  fontSize: "0.72rem",
  letterSpacing: "0.16em",
  textTransform: "uppercase" as const,
  color: colors.accentBlue,
  opacity: 0.9,
},
} as const;

// ─── Helpers ─────────────────────────────────────────────────────────────────

const focusIn  = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
  e.target.style.borderColor = colors.accentTeal;
  e.target.style.background  = "rgba(74,127,165,0.1)";
};
const focusOut = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
  e.target.style.borderColor = "rgba(74,127,165,0.25)";
  e.target.style.background  = "rgba(74,127,165,0.06)";
};

// ─── Componente ──────────────────────────────────────────────────────────────

export function RSVPForm() {
  const [form, setForm] = useState<FormData>({
    name: "", phone: "", companion: "no", adults: "1", children: "0",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading,   setLoading]   = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("https://script.google.com/macros/s/AKfycbwPRR8OShetBXmXNtqgkgFnOveNJv550ib7NhkW_DL42m5uhcVDXWtaC2oJF1dHkbstQw/exec", {
        method: "POST",
        redirect: "follow",
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          attendance: "yes",
          guests:   form.companion, // "sí" | "no" — misma clave/valores que ya reconoce tu Apps Script
          adults:   form.companion === "sí" ? form.adults   : "0",
          children: form.companion === "sí" ? form.children : "0",
        }),
      });

      const result = await res.json();

      if (result.ok) {
        setSubmitted(true);
      } else {
        alert("Error al guardar: " + result.error);
      }
    } catch (error) {
      alert("No se pudo enviar el formulario");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @keyframes checkDraw {
          from { stroke-dashoffset: 50; }
          to   { stroke-dashoffset: 0;  }
        }
        @keyframes successPop {
          0%   { transform: scale(0.8); opacity: 0; }
          60%  { transform: scale(1.05); }
          100% { transform: scale(1);   opacity: 1; }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        .rsvp-btn:hover:not(:disabled) { opacity: 0.88; }
        .rsvp-btn:active:not(:disabled) { transform: scale(0.99); }
        .rsvp-btn:disabled { opacity: 0.55; cursor: not-allowed; }
      `}</style>

      <section style={S.section}>
        <div style={{ maxWidth: "720px", margin: "0 auto" }}>

          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: "3rem", animation: "fadeInUp 0.6s ease both" }}>
            <h2 style={S.heading}>El mejor regalo es tu presencia</h2>
            <p style={S.deadline}>Por favor confirma antes del <strong style={{ color: colors.accentBlue }}>25 de Julio, 2026</strong></p>
          </div>

          <div style={{ ...S.card, animation: "fadeInUp 0.6s ease 0.15s both" }}>

            {/* ── Estado: enviado ──────────────────────────────────── */}
            {submitted ? (
              <div style={{ textAlign: "center", padding: "2rem 1rem", animation: "successPop 0.5s ease both" }}>

                {/* Círculo con check animado */}
                <div style={{
                  width: "80px", height: "80px", borderRadius: "50%",
                  background: "rgba(74,127,165,0.12)",
                  border: `2px solid ${colors.accentTeal}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  margin: "0 auto 1.5rem",
                  boxShadow: "0 0 32px rgba(74,127,165,0.2)",
                }}>
                  <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                    <path
                      d="M8 18L15 25L28 11"
                      stroke={colors.accentTeal}
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeDasharray="50"
                      style={{ animation: "checkDraw 0.5s ease 0.2s both" }}
                    />
                  </svg>
                </div>

                <h3 style={{ fontFamily: fonts.display, color: colors.textPrimary, fontSize: "1.8rem", fontWeight: 400, fontStyle: "italic", marginBottom: "1rem" }}>
                  ¡Gracias, {form.name}!
                </h3>
                <p style={{ fontFamily: fonts.serif, color: colors.accentBlue, fontSize: "1.05rem", lineHeight: 1.7, maxWidth: "380px", margin: "0 auto" }}>
                  Tu asistencia ha sido confirmada. ¡Nos vemos el 1 de agosto para celebrar juntos!
                </p>

                {/* Decoración */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.75rem", marginTop: "2rem" }}>
                  <div style={{ height: "1px", width: "40px", background: gradients.lineLeft }} />
                  <span style={{ color: colors.accentTeal, fontSize: "1rem" }}>✝️</span>
                  <div style={{ height: "1px", width: "40px", background: gradients.lineRight }} />
                </div>
              </div>

            ) : (

              /* ── Formulario ─────────────────────────────────────── */
              <form onSubmit={handleSubmit}>
                <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>

                  {/* Nombre */}
                  <div>
                    <label style={S.fieldLabel}>Nombre completo</label>
                    <input
                      type="text" name="name" value={form.name}
                      onChange={handleChange} required
                      placeholder="Tu nombre completo"
                      style={S.input}
                      onFocus={focusIn} onBlur={focusOut}
                    />
                  </div>

                  {/* Teléfono */}
                  <div>
                    <label style={S.fieldLabel}>Teléfono / WhatsApp</label>
                    <input
                      type="tel" name="phone" value={form.phone}
                      onChange={handleChange} required
                      placeholder="76543210"
                      style={S.input}
                      onFocus={focusIn} onBlur={focusOut}
                    />
                  </div>

                  {/* ¿Acompañado? */}
                  <div>
                    <label style={S.fieldLabel}>¿Vendrás acompañado?</label>
                    <select
                      name="companion" value={form.companion}
                      onChange={handleChange}
                      style={{ ...S.input, cursor: "pointer" }}
                      onFocus={focusIn} onBlur={focusOut}
                    >
                      <option value="no" style={{ background: colors.bgCard }}>Solo/a</option>
                      <option value="sí" style={{ background: colors.bgCard }}>Acompañado</option>
                    </select>
                  </div>

                  {/* Adultos y niños — solo si viene acompañado */}
                  {form.companion === "sí" && (
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                      <div>
                        <label style={S.fieldLabel}>Número de adultos</label>
                        <input
                          type="number" name="adults" value={form.adults}
                          onChange={handleChange} min="1" required
                          style={S.input}
                          onFocus={focusIn} onBlur={focusOut}
                        />
                      </div>
                      <div>
                        <label style={S.fieldLabel}>Número de niños</label>
                        <input
                          type="number" name="children" value={form.children}
                          onChange={handleChange} min="0" required
                          style={S.input}
                          onFocus={focusIn} onBlur={focusOut}
                        />
                      </div>
                    </div>
                  )}

                  {/* Botón */}
                  <button type="submit" disabled={loading} className="rsvp-btn" style={S.btn}>
                    {loading ? (
                      <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.6rem" }}>
                        <svg style={{ animation: "spin 0.8s linear infinite" }} width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <circle cx="8" cy="8" r="6" stroke={colors.accentBlue} strokeWidth="2" strokeDasharray="20 10"/>
                        </svg>
                        Enviando...
                      </span>
                    ) : "Confirmar asistencia"}
                  </button>

                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}