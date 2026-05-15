import { useEffect, useRef, useState } from 'react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const SINHALA_DIGITS: Record<string, string> = {
  '0': '0', '1': '1', '2': '2', '3': '3', '4': '4',
  '5': '5', '6': '6', '7': '7', '8': '8', '9': '9',
};

function toSinhalaNumRaw(n: number): string {
  return String(n).split('').map(d => SINHALA_DIGITS[d] ?? d).join('');
}

function useCountdown(targetDate: Date) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    function calculate() {
      const now = new Date().getTime();
      const diff = targetDate.getTime() - now;
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      });
    }
    calculate();
    const id = setInterval(calculate, 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  return timeLeft;
}

export default function EventDetails() {
  const sectionRef = useRef<HTMLElement>(null);
  // July 30 2026, 16:30 Sri Lanka time (UTC+5:30 = UTC+330min)
  const weddingDate = new Date('2026-07-30T11:00:00.000Z'); // 16:30 LKT = 11:00 UTC
  const timeLeft = useCountdown(weddingDate);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add('visible'); },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const CountdownUnit = ({ value, sinLabel }: { value: number; sinLabel: string }) => (
    <div className="flex flex-col items-center min-w-[60px]">
      <div className="relative">
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg flex flex-col items-center justify-center
                        border-2 border-gold/60 bg-ivory/80 shadow-gold">
          <span className="font-sinhala text-xl sm:text-2xl font-bold text-gold leading-none">
            {toSinhalaNumRaw(value)}
          </span>
        </div>
      </div>
      <span className="font-sinhala text-xs text-brown/70 mt-1">{sinLabel}</span>
    </div>
  );

  return (
    <section ref={sectionRef} className="section-animate py-12 sm:py-16 px-4 sm:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="marble-card rounded-2xl p-6 sm:p-10 relative overflow-hidden">


          {/* Content */}
          <div className="relative z-10">
      

            {/* Thin gold line */}
            {/* <div className="w-32 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto my-4"/> */}


      

            

            {/* Countdown timer */}
            <div className="text-center mb-4">
              <p className="font-sinhala text-sm text-gold/70 mb-4">
                {timeLeft.days > 0
                  ? `දිනයට ඉතිරිව ඇත: ${toSinhalaNumRaw(timeLeft.days)} දිනයක්`
                  : 'දිනය එළඹ ඇත!'}
              </p>
              <div className="flex items-start justify-center gap-2 sm:gap-4 flex-nowrap">
                <CountdownUnit value={timeLeft.days} sinLabel="දින"/>
                <span className="text-gold/60 text-2xl mt-4">:</span>
                <CountdownUnit value={timeLeft.hours} sinLabel="පැය"/>
                <span className="text-gold/60 text-2xl mt-4">:</span>
                <CountdownUnit value={timeLeft.minutes} sinLabel="මිනිත්තු"/>
                <span className="text-gold/60 text-2xl mt-4">:</span>
                <CountdownUnit value={timeLeft.seconds} sinLabel="තත්පර"/>
              </div>
            </div>
            {/* Thin gold line */}
            <div className="w-32 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto my-4"/>
            {/* Venue */}
            <div className="text-center mb-6">
              <p className="font-sinhala font-bold text-xl sm:text-2xl lg:text-3xl text-brown leading-tight"
                 style={{textShadow: '0 1px 4px rgba(61,31,13,0.1)'}}>
                බත්තරමුල්ල
              </p>
              <p className="font-sinhala font-bold text-xl sm:text-2xl lg:text-3xl text-brown leading-tight">
                වෝටර්ස් එජ් හෝටලය
              </p>
              <p className="font-garamond italic text-base text-brown/60 mt-1">
                Waters Edge Hotel, Battaramulla
              </p>
            </div>

            {/* Google Maps + Calendar buttons */}
            <div className="flex justify-center gap-3 mt-1 flex-wrap">
              <a
                href="https://maps.google.com/?q=Waters+Edge+Hotel+Battaramulla+Sri+Lanka"
                target="_blank"
                rel="noopener noreferrer"
                className="gold-btn px-6 py-3 rounded-full text-sm sm:text-base font-garamond
                           flex items-center gap-2 no-underline"
              >
                <span>📍</span>
                <span>Get Directions</span>
              </a>
              <a
                href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=Dulanja+%26+Sajani+Wedding&dates=20260730T110000Z%2F20260730T160000Z&details=Poruwa+Ceremony+at+4%3A50+PM%0AWaters+Edge+Hotel%2C+Battaramulla&location=Waters+Edge+Hotel%2C+Battaramulla%2C+Sri+Lanka"
                target="_blank"
                rel="noopener noreferrer"
                className="gold-btn px-6 py-3 rounded-full text-sm sm:text-base font-garamond
                           flex items-center gap-2 no-underline"
              >
                <span>📅</span>
                <span>Add to Calendar</span>
              </a>
            </div>

            {/* Bottom divider */}
            {/* <img src={dividerFlourishSrc} alt="" aria-hidden="true" className="w-full max-w-md mx-auto mt-6"/> */}
          </div>
        </div>
      </div>
    </section>
  );
}
