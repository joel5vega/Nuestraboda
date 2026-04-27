import { useState, useEffect } from "react";

const navLinks = [
  { label: "Inicio", href: "#hero" },
  { label: "Nuestra historia", href: "#story" },
  { label: "Evento", href: "#event" },
  { label: "Programa", href: "#schedule" },
  { label: "Galería", href: "#gallery" },
  { label: "RSVP", href: "#rsvp" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-40 transition-all duration-500"
      style={{
        background: scrolled ? "rgba(28,42,58,0.97)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(74,127,165,0.15)" : "none",
        boxShadow: scrolled ? "0 4px 24px rgba(0,0,0,0.2)" : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => handleNavClick("#hero")}
          style={{
            fontFamily: "'Playfair Display', serif",
            color: "#F4EDE4",
            fontSize: "1.2rem",
            fontStyle: "italic",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 0
          }}
        >
          J <span style={{ color: "#8FAFC2" }}>&</span> B
        </button>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className="transition-colors duration-200 hover:opacity-100"
              style={{
                fontFamily: "'Lato', sans-serif",
                fontSize: "0.75rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#C8D9E6",
                background: "none",
                border: "none",
                cursor: "pointer",
                opacity: 0.75,
                padding: 0
              }}
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* RSVP CTA */}
        <button
          onClick={() => handleNavClick("#rsvp")}
          className="hidden md:block transition-all duration-200 hover:opacity-90"
          style={{
            fontFamily: "'Lato', sans-serif",
            fontSize: "0.7rem",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "#F4EDE4",
            background: "rgba(74,127,165,0.25)",
            border: "1px solid rgba(74,127,165,0.4)",
            borderRadius: "2px",
            padding: "8px 20px",
            cursor: "pointer"
          }}
        >
          Confirmar
        </button>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ background: "none", border: "none", cursor: "pointer" }}
        >
          <span className="block w-6 h-px transition-all" style={{ background: "#C8D9E6", transform: menuOpen ? "rotate(45deg) translateY(4px)" : "none" }} />
          <span className="block w-6 h-px transition-all" style={{ background: "#C8D9E6", opacity: menuOpen ? 0 : 1 }} />
          <span className="block w-6 h-px transition-all" style={{ background: "#C8D9E6", transform: menuOpen ? "rotate(-45deg) translateY(-4px)" : "none" }} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden py-6 px-6 space-y-4" style={{
          background: "rgba(28,42,58,0.98)",
          borderTop: "1px solid rgba(74,127,165,0.15)"
        }}>
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className="block w-full text-left py-2"
              style={{
                fontFamily: "'Lato', sans-serif",
                fontSize: "0.85rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#C8D9E6",
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}