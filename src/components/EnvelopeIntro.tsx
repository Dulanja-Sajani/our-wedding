import { useState } from 'react';

type Phase = 'closed' | 'cracking' | 'opening' | 'revealing';

// Natural size of the closed-envelope image — all layers are sized to this canvas.
const W = 1656;
const H = 1072;

export default function EnvelopeIntro({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState<Phase>('closed');

  // Scale the canvas so it covers the full viewport (like object-fit: cover).
  // Computed once — the envelope is a one-shot overlay so resize handling isn't needed.
  const scale = typeof window !== 'undefined'
    ? Math.max(window.innerWidth / W, window.innerHeight / H)
    : 1;

  function handleClick() {
    if (phase !== 'closed') return;
    setPhase('cracking');
    setTimeout(() => setPhase('opening'), 280);
    setTimeout(() => setPhase('revealing'), 850);
    setTimeout(onDone, 1500);
  }

  const flapOpen     = phase === 'opening' || phase === 'revealing';
  const sealCracking = phase !== 'closed';
  const B            = import.meta.env.BASE_URL;

  return (
    <>
      <style>{`
        @keyframes sealCrack {
          0%   { transform: scale(1)    rotate(0deg);  opacity: 1; }
          35%  { transform: scale(1.12) rotate(-7deg); opacity: 1; }
          100% { transform: scale(0.05) rotate(22deg); opacity: 0; }
        }
        @keyframes flapOpen {
          from { transform: rotateX(0deg);    }
          to   { transform: rotateX(-185deg); }
        }
        @keyframes overlayOut {
          from { opacity: 1; }
          to   { opacity: 0; }
        }
        @keyframes envFadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
      `}</style>

      {/* Full-screen backdrop — clips the scaled canvas edges */}
      <div
        onClick={handleClick}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9999,
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#f5edd0',
          cursor: phase === 'closed' ? 'pointer' : 'default',
          pointerEvents: phase === 'revealing' ? 'none' : 'auto',
          animation: phase === 'revealing'
            ? 'overlayOut 0.5s ease forwards'
            : 'envFadeIn 0.9s ease both',
        }}
      >
        {/* Fixed-size canvas scaled to cover viewport.
            All layers are positioned inside this so they stay aligned. */}
        <div style={{
          position: 'relative',
          width: W,
          height: H,
          flexShrink: 0,
          transform: `scale(${scale})`,
          transformOrigin: 'center center',
          perspective: '2000px',
        }}>

          {/* Layer 1 — closed envelope body */}
          <img
            src={`${B}env-closed.png`}
            alt=""
            draggable={false}
            style={{
              position: 'absolute', inset: 0,
              width: '100%', height: '100%',
              objectFit: 'fill',
              userSelect: 'none',
            }}
          />

          {/* Layer 2 — opened envelope interior, visible behind the flap */}
          <img
            src={`${B}env-opened.png`}
            alt=""
            draggable={false}
            style={{
              position: 'absolute', inset: 0,
              width: '100%', height: '100%',
              objectFit: 'fill',
              userSelect: 'none',
            }}
          />

          {/* Layer 3 — flap (RGBA transparent background).
              Width matches the canvas; height is auto so the image keeps its
              natural proportions — bottom edge lands at ~70% of canvas height. */}
          <img
            src={`${B}env-flap.png`}
            alt=""
            draggable={false}
            style={{
              position: 'absolute',
              top: 0, left: 0,
              width: W,
              height: 'auto',
              transformOrigin: 'top center',
              backfaceVisibility: 'hidden',
              userSelect: 'none',
              animation: flapOpen
                ? 'flapOpen 0.6s cubic-bezier(0.4,0,0.2,1) forwards'
                : undefined,
            }}
          />

          {/* Layer 4 — wax stamp.
              Centered at the flap V-tip: (50%, 69.9%) of canvas height. */}
          <div style={{
            position: 'absolute',
            top: Math.round(H * 0.699),
            left: Math.round(W / 2),
            transform: 'translate(-50%, -50%)',
            zIndex: 10,
            pointerEvents: 'none',
          }}>
            <img
              src={`${B}env-wax.png`}
              alt="wax seal"
              draggable={false}
              style={{
                width: Math.round(W * 0.38),
                height: 'auto',
                display: 'block',
                filter: 'drop-shadow(0 8px 20px rgba(0,0,0,0.55))',
                animation: sealCracking
                  ? 'sealCrack 0.38s cubic-bezier(0.4,0,1,1) forwards'
                  : undefined,
              }}
            />
          </div>

        </div>
      </div>
    </>
  );
}
