import { useEffect, useRef, useState } from 'react';
import dividerFlourishSrc from '../assets/svg/divider-flourish.svg';

const PLACEHOLDER_SLOTS = Array.from({ length: 6 }, (_, i) => ({
  id: i + 1,
  label: `Photo ${i + 1}`,
}));

export default function Gallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeSlot, setActiveSlot] = useState<number | null>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add('visible'); },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxOpen(false);
    };
    if (lightboxOpen) document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [lightboxOpen]);

  const openLightbox = (id: number) => {
    setActiveSlot(id);
    setLightboxOpen(true);
  };

  return (
    <section ref={sectionRef} className="section-animate py-12 sm:py-16 px-4 sm:px-8" id="gallery">
      <div className="max-w-4xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-8">
          <h2 className="font-sinhala font-bold text-2xl sm:text-3xl lg:text-4xl text-gold">
            අපගේ මතකයන්
          </h2>
          <p className="font-fell italic text-lg sm:text-xl text-brown/70 mt-2">
            Our Memories
          </p>
          <div className="mt-4">
            <img src={dividerFlourishSrc} alt="" aria-hidden="true" className="w-full max-w-sm mx-auto"/>
          </div>
        </div>

        {/* Gallery grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
          {PLACEHOLDER_SLOTS.map(slot => (
            <button
              key={slot.id}
              onClick={() => openLightbox(slot.id)}
              className="group relative aspect-square rounded-xl overflow-hidden
                         border-2 border-dashed border-gold/40 bg-champagne-light/60
                         hover:border-gold hover:bg-champagne-light transition-all duration-300
                         cursor-pointer focus:outline-none focus:ring-2 focus:ring-gold/50"
              aria-label={`Open ${slot.label}`}
            >
              {/* Placeholder content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-4">
                <div className="w-12 h-12 rounded-full border-2 border-gold/40 group-hover:border-gold/70
                                flex items-center justify-center transition-colors">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <rect x="3" y="4" width="18" height="16" rx="2" stroke="#C9960C" strokeWidth="1.5" strokeOpacity="0.6"/>
                    <circle cx="9" cy="10" r="2.5" stroke="#C9960C" strokeWidth="1.5" strokeOpacity="0.6"/>
                    <path d="M3,18 L8,13 L12,17 L16,13 L21,18" stroke="#C9960C" strokeWidth="1.5" strokeLinejoin="round" strokeOpacity="0.6"/>
                  </svg>
                </div>
                <span className="font-garamond text-xs sm:text-sm text-brown/40 group-hover:text-brown/60 italic transition-colors text-center">
                  Add Photo
                </span>
              </div>
              {/* Corner accent */}
              <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-gold/30 group-hover:border-gold/60 transition-colors"/>
              <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-gold/30 group-hover:border-gold/60 transition-colors"/>
              <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-gold/30 group-hover:border-gold/60 transition-colors"/>
              <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-gold/30 group-hover:border-gold/60 transition-colors"/>
            </button>
          ))}
        </div>

        <p className="text-center font-garamond italic text-sm text-brown/40 mt-6">
          Photos will be added closer to the wedding day
        </p>

      </div>

      {/* Lightbox modal */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{background: 'rgba(61,31,13,0.85)'}}
          onClick={() => setLightboxOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Photo lightbox"
        >
          <div
            className="relative max-w-2xl w-full aspect-square rounded-xl overflow-hidden
                        border-2 border-gold/40 bg-ivory/90 animate-scale-in"
            onClick={e => e.stopPropagation()}
          >
            {/* Placeholder */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <p className="font-sinhala text-brown/40 text-sm">
                {activeSlot ? `ඡායාරූපය ${activeSlot}` : ''}
              </p>
              <p className="font-garamond italic text-brown/30 text-xs mt-1">Photo placeholder</p>
            </div>
            {/* Close button */}
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-3 right-3 w-9 h-9 rounded-full bg-brown/10
                         flex items-center justify-center text-brown/60 hover:text-brown
                         hover:bg-brown/20 transition-colors"
              aria-label="Close"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
