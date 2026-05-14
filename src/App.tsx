import { useRef, useEffect } from 'react';
import Hero from './components/Hero';
import EventDetails from './components/EventDetails';
import RSVPForm from './components/RSVPForm';
import Footer from './components/Footer';

const cornerBase: React.CSSProperties = {
  position: 'fixed',
  width: 'clamp(60px, 12vw, 120px)',
  height: 'auto',
  opacity: 0.95,
  pointerEvents: 'none',
  zIndex: 50,
};

export default function App() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const onScroll = () => {
      if (!videoRef.current) return;
      // Portrait viewports: video is already portrait-shaped, centre it
      if (window.innerWidth <= window.innerHeight) {
        videoRef.current.style.objectPosition = '50% 50%';
        return;
      }
      const scrolled  = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress  = maxScroll > 0 ? Math.min(1, scrolled / maxScroll) : 0;
      videoRef.current.style.objectPosition = `50% ${progress * 100}%`;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // set initial position
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      {/* Fixed video background — pans from top to bottom as page scrolls */}
      <video
        ref={videoRef}
        autoPlay muted loop playsInline
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: '50% 0%',
          willChange: 'object-position',
          zIndex: -1,
          opacity: 0.15,
        }}
      >
        <source src={`${import.meta.env.BASE_URL}mandala-bg.mp4`} type="video/mp4" />
      </video>

      {/* Fixed corner ornaments */}
      <div aria-hidden="true">
        <img src={`${import.meta.env.BASE_URL}top-left-corner.png`} alt="" style={{ ...cornerBase, top: 0, left: 0 }} />
        <img src={`${import.meta.env.BASE_URL}top-right-corner.png`} alt="" style={{ ...cornerBase, top: 0, right: 0 }} />
        <img src={`${import.meta.env.BASE_URL}bottom-left-corner.png`} alt="" style={{ ...cornerBase, bottom: 0, left: 0 }} />
        <img src={`${import.meta.env.BASE_URL}bottom-right-corner.png`} alt="" style={{ ...cornerBase, bottom: 0, right: 0 }} />
      </div>

      <div style={{ position: 'relative', zIndex: 1 }}>
        <Hero />
        <EventDetails />
        <RSVPForm />
        <Footer />
      </div>
    </>
  );
}
