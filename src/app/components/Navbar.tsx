import { useState, useEffect, useRef } from "react";
import { colors, fonts } from "../../styles/theme";

const navLinks = [
  { label: "Inicio",           href: "#hero"     },
  { label: "Evento",           href: "#event"    },
  { label: "Programa",         href: "#schedule" },
  { label: "Galería",          href: "#gallery"  },
  { label: "RSVP",             href: "#rsvp"     },
];

export function Navbar() {
  const [scrolled,   setScrolled]   = useState(false);
  const [menuOpen,   setMenuOpen]   = useState(false);
  const [activeLink, setActiveLink] = useState("#hero");
  const indicatorRef = useRef<HTMLDivElement>(null);
  const linksRef     = useRef<Map<string, HTMLButtonElement>>(new Map());

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = navLinks.map(l => document.querySelector(l.href)).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) setActiveLink(`#${e.target.id}`);
      }),
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach(s => s && observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // Mover underline deslizante
  useEffect(() => {
    if (!scrolled) return;
    const btn = linksRef.current.get(activeLink);
    const ind = indicatorRef.current;
    if (!btn || !ind) return;
    const rect   = btn.getBoundingClientRect();
    const parent = btn.parentElement!.getBoundingClientRect();
    ind.style.width  = `${rect.width}px`;
    ind.style.left   = `${rect.left - parent.left}px`;
    ind.style.opacity = "1";
  }, [activeLink, scrolled]);

  const handleNavClick = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  // ── En el hero: solo el hamburger (mobile) o nada (desktop)
  const isHero = !scrolled;

  return (
    <>
      <style>{`
        @keyframes navReveal {
          from { transform: translateY(-100%); opacity: 0; }
          to   { transform: translateY(0);     opacity: 1; }
        }
        @keyframes menuFade {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        .nav-link { transition: color 0.2s ease, opacity 0.2s ease; }
        .nav-link:hover { color: ${colors.textPrimary} !important; opacity: 1 !important; }
        .nav-cta:hover  { background: rgba(74,127,165,0.4) !important; border-color: ${colors.accentTeal} !important; }
        .mobile-link:hover { color: ${colors.textPrimary} !important; }
      `}</style>

      {/* ── Barra principal ──────────────────────────────────────────────── */}
      <nav style={{
        position:       "fixed",
        top:            0,
        left:           0,
        right:          0,
        zIndex:         100,
        display:        "flex",
        alignItems:     "center",
        justifyContent: "space-between",
        padding:        scrolled ? "0.7rem 2rem" : "1rem 1.5rem",

        // Completamente invisible en hero, sólido al scrollear
        background:     scrolled ? "rgba(16,26,38,0.94)" : "transparent",
        backdropFilter: scrolled ? "blur(14px)"           : "none",
        borderBottom:   scrolled ? `1px solid rgba(74,127,165,0.15)` : "none",
        boxShadow:      scrolled ? "0 2px 20px rgba(0,0,0,0.3)" : "none",

        transition: "padding 0.4s ease, background 0.5s ease, backdrop-filter 0.5s ease, border-color 0.4s ease, box-shadow 0.4s ease",

        // Solo aparece con animación cuando scrolled cambia a true por primera vez
        animation: scrolled ? "navReveal 0.4s ease both" : "none",
      }}>

        {/* Logo — solo visible al scrollear */}
        <button
          onClick={() => handleNavClick("#hero")}
          style={{
            fontFamily:  fonts.display,
            color:       colors.textPrimary,
            fontSize:    "1.2rem",
            fontStyle:   "italic",
            background:  "none",
            border:      "none",
            cursor:      "pointer",
            padding:     0,
            letterSpacing: "0.05em",
            opacity:     scrolled ? 1 : 0,
            transform:   scrolled ? "translateY(0)" : "translateY(-4px)",
            transition:  "opacity 0.4s ease, transform 0.4s ease",
            pointerEvents: scrolled ? "auto" : "none",
            whiteSpace:  "nowrap",
          }}
        >
          J &amp; B
        </button>

        {/* Links desktop — solo visibles al scrollear */}
        <div style={{
          display:    "flex",
          alignItems: "center",
          gap:        "1.75rem",
          position:   "relative",
          opacity:    scrolled ? 1 : 0,
          transform:  scrolled ? "translateY(0)" : "translateY(-6px)",
          transition: "opacity 0.4s ease 0.05s, transform 0.4s ease 0.05s",
          pointerEvents: scrolled ? "auto" : "none",
          // Ocultar en mobile
          display: "none",
        }}
          className="desktop-nav"
        >
          {navLinks.map((link) => (
            <button
              key={link.href}
              ref={el => { if (el) linksRef.current.set(link.href, el); }}
              onClick={() => handleNavClick(link.href)}
              className="nav-link"
              style={{
                fontFamily:    fonts.sans,
                fontSize:      "0.7rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                background:    "none",
                border:        "none",
                cursor:        "pointer",
                padding:       "4px 0",
                color:         activeLink === link.href ? colors.textPrimary : colors.accentBlue,
                opacity:       activeLink === link.href ? 1 : 0.7,
              }}
            >
              {link.label}
            </button>
          ))}

          {/* Underline deslizante */}
          <div
            ref={indicatorRef}
            style={{
              position:   "absolute",
              bottom:     "-4px",
              height:     "1px",
              background: `linear-gradient(to right, transparent, ${colors.accentTeal}, transparent)`,
              opacity:    0,
              transition: "left 0.35s cubic-bezier(0.4,0,0.2,1), width 0.35s cubic-bezier(0.4,0,0.2,1), opacity 0.3s ease",
              pointerEvents: "none",
            }}
          />
        </div>

        {/* CTA confirmar — desktop */}
        <button
          onClick={() => handleNavClick("#rsvp")}
          className="nav-cta"
          style={{
            fontFamily:    fonts.sans,
            fontSize:      "0.68rem",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color:         colors.textPrimary,
            background:    "rgba(74,127,165,0.2)",
            border:        `1px solid rgba(74,127,165,0.35)`,
            borderRadius:  "2px",
            padding:       "7px 18px",
            cursor:        "pointer",
            opacity:       scrolled ? 1 : 0,
            transform:     scrolled ? "translateY(0)" : "translateY(-4px)",
            transition:    "opacity 0.4s ease 0.1s, transform 0.4s ease 0.1s, background 0.2s ease, border-color 0.2s ease",
            pointerEvents: scrolled ? "auto" : "none",
            // Solo desktop
            display: "none",
          }}
          className="desktop-cta"
        >
          Confirmar
        </button>

        {/* ── Hamburger — SIEMPRE visible en mobile ──────────────────────── */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menú"
          style={{
            background:  "none",
            border:      "none",
            cursor:      "pointer",
            padding:     "8px",
            display:     "flex",
            flexDirection: "column",
            gap:         "5px",
            // En hero: fondo semitransparente para que se vea sobre la foto
            borderRadius: "6px",
            backgroundColor: isHero ? "rgba(12,22,34,0.45)" : "transparent",
            backdropFilter:  isHero ? "blur(6px)" : "none",
            transition:  "background 0.3s ease, backdrop-filter 0.3s ease",
          }}
          className="mobile-hamburger"
        >
          {[0, 1, 2].map(i => (
            <div key={i} style={{
              width:        "22px",
              height:       "1.5px",
              background:   colors.accentBlue,
              borderRadius: "2px",
              transition:   "transform 0.3s ease, opacity 0.3s ease",
              transform:
                menuOpen && i === 0 ? "translateY(6.5px) rotate(45deg)"   :
                menuOpen && i === 2 ? "translateY(-6.5px) rotate(-45deg)" :
                "none",
              opacity: menuOpen && i === 1 ? 0 : 1,
            }} />
          ))}
        </button>
      </nav>

      {/* ── Menú mobile ──────────────────────────────────────────────────── */}
      {menuOpen && (
        <div style={{
          position:       "fixed",
          top:            scrolled ? "54px" : "58px",
          left:           0,
          right:          0,
          zIndex:         99,
          background:     "rgba(12,20,30,0.97)",
          backdropFilter: "blur(20px)",
          borderBottom:   `1px solid rgba(74,127,165,0.2)`,
          padding:        "0.75rem 1.5rem 1.5rem",
          animation:      "menuFade 0.25s ease both",
        }}>
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className="mobile-link"
              style={{
                fontFamily:    fonts.sans,
                fontSize:      "0.82rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color:         activeLink === link.href ? colors.textPrimary : colors.accentBlue,
                background:    "none",
                border:        "none",
                borderBottom:  `1px solid rgba(74,127,165,0.1)`,
                cursor:        "pointer",
                padding:       "0.9rem 0",
                width:         "100%",
                textAlign:     "left",
                display:       "block",
                transition:    "color 0.2s ease",
              }}
            >
              {activeLink === link.href && (
                <span style={{ color: colors.accentTeal, marginRight: "0.5rem" }}>✦</span>
              )}
              {link.label}
            </button>
          ))}

          <button
            onClick={() => handleNavClick("#rsvp")}
            style={{
              fontFamily:    fonts.sans,
              fontSize:      "0.72rem",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color:         colors.textPrimary,
              background:    "rgba(74,127,165,0.2)",
              border:        `1px solid rgba(74,127,165,0.35)`,
              borderRadius:  "3px",
              padding:       "0.85rem",
              width:         "100%",
              cursor:        "pointer",
              marginTop:     "1rem",
              transition:    "background 0.2s ease",
            }}
          >
            Confirmar asistencia
          </button>
        </div>
      )}

      {/* ── CSS para mostrar/ocultar en desktop vs mobile ──────────────────── */}
      <style>{`
        @media (min-width: 768px) {
          .mobile-hamburger { display: none !important; }
          .desktop-nav      { display: flex !important; }
          .desktop-cta      { display: block !important; }
        }
        @media (max-width: 767px) {
          .desktop-nav { display: none !important; }
          .desktop-cta { display: none !important; }
        }
      `}</style>
    </>
  );
}