import { useRef, useEffect, useState } from 'react';
import Hero from './components/Hero';
import EventDetails from './components/EventDetails';
import RSVPForm from './components/RSVPForm';
import Footer from './components/Footer';
import EnvelopeIntro from './components/EnvelopeIntro';

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
  const audioRef = useRef<HTMLAudioElement>(null);
  const [envelopeOpened, setEnvelopeOpened] = useState(
    () => sessionStorage.getItem('weddingEnvelopeOpened') === '1'
  );
  const [muted, setMuted] = useState(false);

  function handleEnvelopeDone() {
    sessionStorage.setItem('weddingEnvelopeOpened', '1');
    setEnvelopeOpened(true);
    if (audioRef.current) {
      audioRef.current.currentTime = 11.5;
      audioRef.current.play().catch(() => {});
    }
  }

  function toggleMute() {
    if (!audioRef.current) return;
    audioRef.current.muted = !audioRef.current.muted;
    setMuted(audioRef.current.muted);
  }

  useEffect(() => {
    const onVisibility = () => {
      if (!audioRef.current) return;
      if (document.hidden) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(() => {});
      }
    };
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, []);

  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    vid.play().catch(() => {
      const resume = () => { vid.play().catch(() => {}); document.removeEventListener('click', resume); };
      document.addEventListener('click', resume, { once: true });
    });
  }, []);

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
      {!envelopeOpened && <EnvelopeIntro onDone={handleEnvelopeDone} />}

      <audio ref={audioRef} src={`${import.meta.env.BASE_URL}ObaNisa.mp3`} loop />

      {/* Floating mute button */}
      {envelopeOpened && (
        <button
          onClick={toggleMute}
          aria-label={muted ? 'Unmute music' : 'Mute music'}
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            zIndex: 100,
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            border: '1.5px solid rgba(201,150,12,0.5)',
            background: 'linear-gradient(135deg, rgba(253,246,237,0.92) 0%, rgba(247,231,206,0.88) 100%)',
            backdropFilter: 'blur(8px)',
            boxShadow: '0 4px 20px rgba(201,150,12,0.25), inset 0 1px 0 rgba(255,255,255,0.7)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {muted ? (
            /* Muted — speaker with X */
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M11 5L6 9H3a1 1 0 00-1 1v4a1 1 0 001 1h3l5 4V5z"
                fill="#C9960C" opacity="0.9"/>
              <line x1="23" y1="9" x2="17" y2="15" stroke="#C9960C" strokeWidth="2" strokeLinecap="round"/>
              <line x1="17" y1="9" x2="23" y2="15" stroke="#C9960C" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          ) : (
            /* Unmuted — speaker with sound waves */
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M11 5L6 9H3a1 1 0 00-1 1v4a1 1 0 001 1h3l5 4V5z"
                fill="#C9960C" opacity="0.9"/>
              <path d="M15.5 8.5a5 5 0 010 7" stroke="#C9960C" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
              <path d="M18.5 6a9 9 0 010 12" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.6"/>
            </svg>
          )}
        </button>
      )}

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
          pointerEvents: 'none',
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
