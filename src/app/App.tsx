import { useState ,useRef } from "react";
import { colors }        from "../styles/theme";
import { SplashScreen }  from "./components/SplashScreen";
import { Navbar }        from "./components/Navbar";
import { HeroSection }   from "./components/HeroSection";
import { CountdownTimer } from "./components/CountdownTimer";
import { OurStory }      from "./components/OurStory";
import { EventDetails }  from "./components/EventDetails";
import { Schedule }      from "./components/Schedule";
import { Gallery }       from "./components/Gallery";
import { RSVPForm }      from "./components/RSVPForm";
import { Footer }        from "./components/Footer";
import { MusicPlayer, MusicPlayerHandle  }   from "./components/MusicPlayer";
import { PetalCanvas }   from "./components/PetalCanvas";
import { RusticDivider } from "./components/RusticDivider"; 

// ── Wave helper ──────────────────────────────────────────────────────────────
// fill = color de la SIGUIENTE sección
const Wave = ({
  fill,
  variant = "wave",
}: {
  fill: string;
  variant?: "wave" | "tilt" | "tilt-r" | "curve";
}) => {
  const paths = {
    wave:    "M0,40 C150,80 350,0 500,40 C650,80 850,0 1000,40 L1000,80 L0,80 Z",
    tilt:    "M0,0 L1000,55 L1000,80 L0,80 Z",
    "tilt-r":"M0,55 L1000,0 L1000,80 L0,80 Z",
    curve:   "M0,60 Q500,0 1000,60 L1000,80 L0,80 Z",
  };
  return (
    <svg
      viewBox="0 0 1000 80"
      preserveAspectRatio="none"
      style={{
        position: "absolute",
        bottom:   0,
        left:     0,
        width:    "100%",
        height:   "80px",
        display:  "block",
        zIndex:   2,
      }}
    >
      <path d={paths[variant]} fill={fill} />
    </svg>
  );
};

// ── Colores de cada sección (del theme real) ─────────────────────────────────
//  Hero        → imagen propia (no define bg)
//  Countdown   → bgDark   "#1C2A3A"   (gradients.sectionDark)
//  OurStory    → bgCard   "#2C3D4F"
//  EventDetails→ bgLight  "#F4EDE4"
//  Schedule    → bgDark   "#1C2A3A"
//  Gallery     → bgLight  "#F4EDE4"
//  RSVPForm    → bgDark   "#1C2A3A"
//  Footer      → bgDark   "#1C2A3A"

export default function App() {
  const [splashDone, setSplashDone] = useState(false);
const musicRef = useRef<MusicPlayerHandle>(null);
  return (
    <div style={{ fontFamily: "'Lato', sans-serif" }}>
      
      <SplashScreen onComplete={() => setSplashDone(true)} onEnter={() => musicRef.current?.play()}/>
      <PetalCanvas active={splashDone} fixed zIndex={50} />

      <div style={{
        opacity:       splashDone ? 1 : 0,
        transition:    "opacity 0.8s ease",
        pointerEvents: splashDone ? "all" : "none",
      }}>
        <Navbar />

        {/* ── Hero ─── imagen → siguiente: bgDark */}
        <section id="hero" style={{ position: "relative" }}>
          <HeroSection animate={splashDone} />
          <Wave fill={colors.bgDark} variant="wave" />
        </section>

        {/* ── Countdown ─── bgDark → siguiente: bgLight */}
        <section id="countdown" style={{ position: "relative", background: colors.bgDark }}>
          <CountdownTimer />
          <Wave fill={colors.bgLight} variant="curve" />
        </section>

        {/* ── Story ─── bgCard → siguiente: bgLight */}
        {/* <section id="story" style={{ position: "relative", background: colors.bgCard }}>
          <OurStory />
          <Wave fill={colors.bgLight} variant="curve" />
        </section> */}

        {/* ── Event ─── bgLight → siguiente: bgDark */}
        <section id="event" style={{ position: "relative", background: colors.bgLight }}>
          <EventDetails />
          <Wave fill={colors.bgDark} variant="tilt-r" />
        </section>

        {/* ── Schedule ─── bgDark → siguiente: bgLight */}
        <section id="schedule" style={{ position: "relative", background: colors.bgDark }}>
          <Schedule />
          <Wave fill={colors.bgLight} variant="wave" />
        </section>

        {/* ── Gallery ─── bgLight → siguiente: bgDark */}
        <section id="gallery" style={{ position: "relative", background: colors.bgLight }}>
          <Gallery />
          <Wave fill={colors.bgDark} variant="curve" />
        </section>

        {/* ── RSVP ─── bgDark → siguiente: Footer bgLight */}
        <section id="rsvp" style={{ position: "relative", background: colors.bgDark }}>
          <RSVPForm />
          <Wave fill={colors.bgLight} variant="curve" />
        </section>

        {/* ── Footer ─── bgDark (sin wave, es el final) */}
        <Footer />
        <MusicPlayer ref={musicRef} />
      </div>
    </div>
  );
}