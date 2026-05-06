import { useEffect, useRef, useState } from 'react';
import dividerFlourishSrc from '../assets/svg/divider-flourish.svg';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const SINHALA_DIGITS: Record<string, string> = {
  '0': '෦', '1': '෧', '2': '෨', '3': '෩', '4': '෪',
  '5': '෫', '6': '෬', '7': '෭', '8': '෮', '9': '෯',
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

  const CountdownUnit = ({ value, label, sinLabel }: { value: number; label: string; sinLabel: string }) => (
    <div className="flex flex-col items-center min-w-[60px]">
      <div className="relative">
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg flex flex-col items-center justify-center
                        border-2 border-gold/60 bg-ivory/80 shadow-gold">
          <span className="font-sinhala text-xl sm:text-2xl font-bold text-gold leading-none">
            {toSinhalaNumRaw(value)}
          </span>
          <span className="font-garamond text-xs text-gold/60 mt-0.5">
            {String(value).padStart(2, '0')}
          </span>
        </div>
      </div>
      <span className="font-sinhala text-xs text-brown/70 mt-1">{sinLabel}</span>
      <span className="font-garamond text-xs text-brown/50 italic">{label}</span>
    </div>
  );

  return (
    <section ref={sectionRef} className="section-animate py-12 sm:py-16 px-4 sm:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="marble-card rounded-2xl p-6 sm:p-10 relative overflow-hidden">


          {/* Content */}
          <div className="relative z-10">
            {/* Top divider */}
            <img src={dividerFlourishSrc} alt="" aria-hidden="true" className="w-full max-w-md mx-auto mb-6"/>

            {/* Invitation text */}
            <p className="font-sinhala text-center text-base sm:text-lg text-brown/80 leading-relaxed mb-4">
              අතිනත ගැනීමේ ප්‍රීතිය නිමිත්තෙන්
            </p>
            <p className="font-garamond italic text-center text-base sm:text-lg text-brown/60 mb-6">
              With the joy of joining hands in marriage
            </p>

            {/* Date block */}
            <div className="text-center mb-2">
              <div className="inline-block">
                <p className="font-sinhala font-bold text-2xl sm:text-3xl lg:text-4xl"
                   style={{color: '#C9960C', textShadow: '0 1px 8px rgba(201,150,12,0.2)'}}>
                  2026 ජූලි මස 30
                </p>
                <p className="font-sinhala text-base sm:text-lg text-brown/70 mt-1">
                  බෘහස්පතින්දා
                </p>
                <p className="font-garamond italic text-sm sm:text-base text-brown/50">
                  Thursday, 30th July 2026
                </p>
              </div>
            </div>

            {/* Thin gold line */}
            <div className="w-32 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto my-4"/>

            {/* Time block */}
            <div className="text-center mb-2">
              <p className="font-sinhala text-lg sm:text-xl font-semibold text-brown">
                ප.ව. 4.30 සිට
              </p>
              <p className="font-garamond text-sm text-brown/60 italic">Commencing at 4:30 PM</p>
            </div>

            <div className="text-center mb-6">
              <p className="font-sinhala text-base sm:text-lg text-brown/80">
                <span className="font-bold text-accent-red">පොරොව වාරිතු</span> — ප.ව. 4.50
              </p>
              <p className="font-garamond text-sm text-brown/60 italic">Poruwa Ceremony at 4:50 PM</p>
            </div>

            {/* Venue */}
            <div className="text-center mb-6">
              <p className="font-sinhala font-bold text-xl sm:text-2xl lg:text-3xl text-brown leading-tight"
                 style={{textShadow: '0 1px 4px rgba(61,31,13,0.1)'}}>
                බත්තරමුල්ල
              </p>
              <p className="font-sinhala font-bold text-xl sm:text-2xl lg:text-3xl text-brown leading-tight">
                වෝටර්ස් එජ් හෝටලයේදී
              </p>
              <p className="font-garamond italic text-base text-brown/60 mt-1">
                Waters Edge Hotel, Battaramulla
              </p>
            </div>

            {/* Google Maps button */}
            <div className="flex justify-center mb-8">
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
            </div>

            {/* Countdown timer */}
            <div className="text-center mb-4">
              <p className="font-sinhala text-sm text-gold/70 mb-4">
                {timeLeft.days > 0
                  ? `දිනයට ඉතිරිව ඇත: ${toSinhalaNumRaw(timeLeft.days)} දිනයක්`
                  : 'දිනය එළඹ ඇත!'}
              </p>
              <div className="flex items-start justify-center gap-2 sm:gap-4 flex-wrap">
                <CountdownUnit value={timeLeft.days} label="Days" sinLabel="දින"/>
                <span className="text-gold/60 text-2xl mt-4">:</span>
                <CountdownUnit value={timeLeft.hours} label="Hours" sinLabel="පැය"/>
                <span className="text-gold/60 text-2xl mt-4">:</span>
                <CountdownUnit value={timeLeft.minutes} label="Minutes" sinLabel="මිනිත්තු"/>
                <span className="text-gold/60 text-2xl mt-4">:</span>
                <CountdownUnit value={timeLeft.seconds} label="Seconds" sinLabel="තත්පර"/>
              </div>
            </div>

            {/* Bottom divider */}
            <img src={dividerFlourishSrc} alt="" aria-hidden="true" className="w-full max-w-md mx-auto mt-6"/>
          </div>
        </div>
      </div>
    </section>
  );
}
