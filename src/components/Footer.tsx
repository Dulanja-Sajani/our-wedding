import peacockLeft from '../assets/svg/peacock-left.svg';
import peacockRight from '../assets/svg/peacock-right.svg';
import footerScroll from '../assets/svg/footer-scroll.svg';

export default function Footer() {
  return (
    <footer className="relative mt-8">

      {/* Footer scroll top border */}
      <div className="w-full overflow-hidden">
        <img src={footerScroll} alt="" aria-hidden="true" className="w-full h-auto min-h-[40px]"/>
      </div>

      {/* Footer body */}
      <div className="bg-gradient-to-b from-ivory via-champagne-light to-beige-light pt-6 pb-8 px-4">

        {/* Thin red accent line */}
        <div className="w-full max-w-lg mx-auto mb-5">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-accent-red to-transparent"/>
        </div>

        {/* Peacocks + center content */}
        <div className="flex items-end justify-between max-w-3xl mx-auto gap-4">

          {/* Left peacock */}
          <img src={peacockLeft} alt="" aria-hidden="true"
            className="w-20 sm:w-28 lg:w-36 flex-shrink-0 opacity-90 self-end"/>

          {/* Center text */}
          <div className="flex-1 text-center px-2">
            <blockquote className="font-sinhala text-sm sm:text-base text-brown/80 leading-relaxed mb-3">
              "ඔබට / ඔබ දෙපළට / ඔබ සෙමට කෙරෙන ගෞරවනීය ඇරයුමයි මේ."
            </blockquote>
            <p className="font-garamond italic text-xs sm:text-sm text-brown/50 mb-6 leading-relaxed">
              "This is a gracious invitation extended to you,<br className="hidden sm:inline"/>
              your family, and loved ones."
            </p>

            {/* Names again */}
            <div className="flex items-center justify-center gap-2 sm:gap-4 mb-2">
              <span className="font-sinhala text-sm sm:text-base font-semibold text-gold">දුලංජ්</span>
              <span className="text-gold/40 text-xl">♥</span>
              <span className="font-sinhala text-sm sm:text-base font-semibold text-gold">සප්තී</span>
            </div>

            {/* Date reminder */}
            <p className="font-garamond italic text-xs text-brown/40 mb-4">
              30 July 2026 · Waters Edge Hotel, Battaramulla
            </p>

            {/* RSVP link */}
            <a href="#rsvp"
               className="gold-btn px-5 py-2 rounded-full text-sm inline-block no-underline font-garamond">
              RSVP Now
            </a>

            {/* Copyright */}
            <p className="font-garamond text-xs text-brown/30 mt-6">
              © 2026 Dulanj &amp; Sapthi
            </p>
          </div>

          {/* Right peacock */}
          <img src={peacockRight} alt="" aria-hidden="true"
            className="w-20 sm:w-28 lg:w-36 flex-shrink-0 opacity-90 self-end"/>

        </div>

      </div>
    </footer>
  );
}
