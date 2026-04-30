const HeartIcon = () => (
  <svg width="18" height="16" viewBox="0 0 18 16" fill="none">
    <path d="M9 15C9 15 1 9.5 1 4.5C1 2.57 2.57 1 4.5 1C6 1 7.5 2 9 3.5C10.5 2 12 1 13.5 1C15.43 1 17 2.57 17 4.5C17 9.5 9 15 9 15Z" fill="#4A7FA5" opacity="0.6"/>
  </svg>
);

export function Footer() {
  return (
    <footer style={{ background: "#2C3D4F", borderTop: "1px solid rgba(74,127,165,0.2)" }}>
      {/* Top section */}
      <div className="py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          {/* Names */}
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            color: "#F4EDE4",
            fontSize: "clamp(2rem, 6vw, 3.5rem)",
            fontWeight: 400,
            fontStyle: "italic",
            lineHeight: 1.1
          }}>
            Joel <span style={{ color: "#8FAFC2" }}>&</span> Betania
          </h2>

          <p className="mt-4 mb-8" style={{ fontFamily: "'Crimson Text', serif", color: "#8FAFC2", fontSize: "1rem", letterSpacing: "0.15em", textTransform: "uppercase" }}>
            01 · 08 · 2026
          </p>

          <div className="flex items-center justify-center gap-3 mb-10">
            <div className="h-px w-20" style={{ background: "linear-gradient(to right, transparent, #4A7FA5)" }} />
            <HeartIcon />
            <div className="h-px w-20" style={{ background: "linear-gradient(to left, transparent, #4A7FA5)" }} />
          </div>

          <p style={{ fontFamily: "'Crimson Text', serif", fontStyle: "italic", color: "#6B8FA3", fontSize: "1.15rem", lineHeight: 1.8, maxWidth: "500px", margin: "0 auto" }}>
            "Amados, amémonos unos a otros; porque el amor es de Dios."
            <br/>
            <span className="text-sm" style={{ letterSpacing: "0.1em" }}>— 1 Juan 4:7</span>
          </p>
        </div>
      </div>

      {/* Hashtag & Social */}
      <div className="py-8 px-6" style={{ borderTop: "1px solid rgba(74,127,165,0.1)" }}>
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <p className="text-xs tracking-[0.3em] uppercase mb-1" style={{ color: "#4A7FA5", fontFamily: "'Lato', sans-serif" }}>
                Hashtag oficial
              </p>
              <p style={{ fontFamily: "'Playfair Display', serif", color: "#C8D9E6", fontSize: "1.3rem", fontStyle: "italic" }}>
                #JoelyBetania2026
              </p>
            </div>

            <div className="text-center">
              <p className="text-xs tracking-[0.3em] uppercase mb-2" style={{ color: "#4A7FA5", fontFamily: "'Lato', sans-serif" }}>Contacto</p>
              <a href="mailto:boda@joelybetania.com" style={{ color: "#8FAFC2", fontFamily: "'Crimson Text', serif", fontSize: "1rem", textDecoration: "none" }}>
                77733987
              </a>
            </div>

           
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="py-4 px-6 text-center" style={{ borderTop: "1px solid rgba(74,127,165,0.08)" }}>
        <p className="text-xs" style={{ color: "#4A7FA5", fontFamily: "'Lato', sans-serif", letterSpacing: "0.1em", opacity: 0.6 }}>
          Hecho con amor para el día más especial ✦ 2026
        </p>
      </div>
    </footer>
  );
}