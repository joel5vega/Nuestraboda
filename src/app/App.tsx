import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { CountdownTimer } from "./components/CountdownTimer";
import { OurStory } from "./components/OurStory";
import { EventDetails } from "./components/EventDetails";
import { Schedule } from "./components/Schedule";
import { Gallery } from "./components/Gallery";
import { RSVPForm } from "./components/RSVPForm";
import { Footer } from "./components/Footer";
import { MusicPlayer } from "./components/MusicPlayer";

export default function App() {
  return (
    <div style={{ fontFamily: "'Lato', sans-serif" }}>
      <Navbar />

      <section id="hero">
        <HeroSection />
      </section>

      <section id="countdown">
        <CountdownTimer />
      </section>

      <section id="story">
        <OurStory />
      </section>

      <section id="event">
        <EventDetails />
      </section>

      <section id="schedule">
        <Schedule />
      </section>

      <section id="gallery">
        <Gallery />
      </section>

      <section id="rsvp">
        <RSVPForm />
      </section>

      <Footer />

      <MusicPlayer />
    </div>
  );
}