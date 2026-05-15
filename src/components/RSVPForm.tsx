import { useEffect, useRef, useState } from 'react';
import dividerFlourishSrc from '../assets/svg/divider-flourish.svg';
import { useInvitedGuest } from './Hero';

type AttendingStatus = 'yes' | 'no' | 'maybe' | null;

interface FormData {
  attending: AttendingStatus;
  guestCount: number;
  message: string;
  guestToken?: string;
}

export default function RSVPForm() {
  const sectionRef = useRef<HTMLElement>(null);
  const guest = useInvitedGuest();
  const [formData, setFormData] = useState<FormData>({
    attending: null,
    guestCount: 1,
    message: '',
    guestToken: undefined,
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  useEffect(() => {
    if (guest) setFormData(d => ({ ...d, guestCount: guest.count }));
  }, [guest]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('guest');
    if (token) setFormData(d => ({ ...d, guestToken: token }));

    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add('visible'); },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.attending) return;

    setStatus('submitting');
    try {
      const response = await fetch('https://formspree.io/f/REPLACE_WITH_YOUR_ID', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          ...(guest && { 'Guest Name': guest.name }),
          'Attending': formData.attending === 'yes' ? 'Yes - Happily' : 'No - With Regret',
          'Guest Count': formData.guestCount,
          'Message to Couple': formData.message || 'None',
          ...(formData.guestToken && { 'Guest Token': formData.guestToken }),
        }),
      });
      if (response.ok) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const AttendBtn = ({ value, label, sublabel }: { value: AttendingStatus; label: string; sublabel: string }) => (
    <button
      type="button"
      onClick={() => setFormData(d => ({ ...d, attending: value }))}
      className={`flex-1 py-3 px-2 rounded-lg border-2 transition-all duration-200
                  font-sinhala text-sm sm:text-base font-semibold
                  ${formData.attending === value
                    ? 'border-gold bg-gold/10 text-gold shadow-gold'
                    : 'border-gold/30 bg-ivory/40 text-brown/70 hover:border-gold/60 hover:bg-gold/5'
                  }`}
    >
      <span className="block">{label}</span>
      <span className="block text-xs font-garamond italic font-normal opacity-70 mt-0.5">{sublabel}</span>
    </button>
  );

  if (status === 'success') {
    return (
      <section ref={sectionRef} className="section-animate py-12 sm:py-16 px-4 sm:px-8">
        <div className="max-w-xl mx-auto text-center">
          <div className="marble-card rounded-2xl p-10 animate-scale-in">
            <svg width="80" height="80" viewBox="0 0 80 80" className="mx-auto mb-6">
              <circle cx="40" cy="40" r="36" fill="none" stroke="#D4AF37" strokeWidth="3"/>
              <polyline
                points="22,42 34,54 58,28"
                fill="none"
                stroke="#C9960C"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                  strokeDasharray: '60',
                  strokeDashoffset: '0',
                  animation: 'checkDraw 0.6s ease forwards 0.3s',
                }}
              />
            </svg>
            <h2 className="font-sinhala text-2xl sm:text-3xl font-bold text-gold mb-3">
              ස්තූතියි!
            </h2>
            <p className="font-sinhala text-lg text-brown/80 mb-2">
              ඔබගේ ප්‍රතිචාරය ලැබිණි.
            </p>
            <p className="font-garamond italic text-base text-brown/60">
              Thank you for your response. We look forward to celebrating with you!
            </p>
            <div className="mt-6">
              <img src={dividerFlourishSrc} alt="" aria-hidden="true" className="w-full max-w-xs mx-auto"/>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="section-animate py-12 sm:py-16 px-4 sm:px-8" id="rsvp">
      <div className="max-w-2xl mx-auto">

        {/* Section heading */}
        <div className="text-center mb-8">
          <h2 className="font-sinhala font-bold text-2xl sm:text-3xl lg:text-4xl text-gold">
            ගෞරවනීය ඇරයුම
          </h2>
          <p className="font-garamond text-base text-brown/60 mt-1">
            Kindly reply by July 15, 2026
          </p>
        </div>

        <form onSubmit={handleSubmit} className="marble-card rounded-2xl p-6 sm:p-8 space-y-6">

          {/* Attending status */}
          <div>
            <label className="block font-sinhala text-sm sm:text-base text-brown font-semibold mb-2">
              ඔබ සහභාගී වේද? <span className="text-accent-red">*</span>
              <span className="font-garamond text-xs font-normal italic text-brown/50 ml-2">Will you attend?</span>
            </label>
            <div className="flex gap-2 sm:gap-3">
              <AttendBtn value="yes" label="ඔව් — සතුටින්" sublabel="Yes, Happily"/>
              <AttendBtn value="no" label="නැත — සමාවෙන්න" sublabel="No, With Regret"/>
            </div>
          </div>

          {/* Guest count */}
          {formData.attending === 'yes' && (
            <div>
              <label className="block font-sinhala text-sm sm:text-base text-brown font-semibold mb-2">
                සහභාගී වන්නන් සංඛ්‍යාව
                <span className="font-garamond text-xs font-normal italic text-brown/50 ml-2">Number of guests (incl. yourself)</span>
              </label>
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => setFormData(d => ({ ...d, guestCount: Math.max(1, d.guestCount - 1) }))}
                  className="w-10 h-10 rounded-full border-2 border-gold/60 text-gold font-bold text-xl
                             hover:bg-gold/10 transition-colors flex items-center justify-center"
                  aria-label="Decrease"
                >−</button>
                <span className="font-sinhala text-xl font-bold text-gold w-16 text-center">
                  {formData.guestCount}
                </span>
                <button
                  type="button"
                  onClick={() => setFormData(d => ({ ...d, guestCount: Math.min(guest?.count ?? 10, d.guestCount + 1) }))}
                  className="w-10 h-10 rounded-full border-2 border-gold/60 text-gold font-bold text-xl
                             hover:bg-gold/10 transition-colors flex items-center justify-center"
                  aria-label="Increase"
                >+</button>
              </div>
            </div>
          )}

          {/* Message */}
          <div>
            <label className="block font-sinhala text-sm sm:text-base text-brown font-semibold mb-1.5">
              යුවළට පණිවිඩයක්
              <span className="font-garamond text-xs font-normal italic text-brown/50 ml-2">Message to the couple (optional)</span>
            </label>
            <textarea
              value={formData.message}
              onChange={e => setFormData(d => ({ ...d, message: e.target.value }))}
              rows={4}
              className="gold-input w-full px-4 py-3 rounded-lg text-base resize-none"
              placeholder="Share your warm wishes..."
            />
          </div>

          {/* Error message */}
          {status === 'error' && (
            <div className="rounded-lg bg-accent-red/10 border border-accent-red/30 p-3 text-center">
              <p className="font-sinhala text-sm text-accent-red">
                කරුණාකර නැවත උත්සාහ කරන්න. දෝෂයක් ඇති විය.
              </p>
              <p className="font-garamond text-xs text-accent-red/70 italic mt-0.5">
                An error occurred. Please try again.
              </p>
            </div>
          )}

          {/* Submit button */}
          <button
            type="submit"
            disabled={status === 'submitting' || !formData.attending}
            className="gold-btn w-full py-4 rounded-xl text-base sm:text-lg
                       disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {status === 'submitting' ? (
              <span className="font-sinhala">යවමින් පවතී...</span>
            ) : (
              <span className="font-sinhala">ඇරයුම් පිළිගනිමු →</span>
            )}
          </button>

        </form>
      </div>
    </section>
  );
}
