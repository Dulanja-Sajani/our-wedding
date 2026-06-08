import peacockLeft from '../assets/svg/peacock-left.svg';
import peacockRight from '../assets/svg/peacock-right.svg';
import footerScroll from '../assets/svg/footer-scroll.svg';

export default function Footer() {
  return (
    <footer className="relative mt-0">

      {/* Footer body */}
      <div className="bg-transparent pt-6 pb-8 px-4">

        {/* Thin red accent line */}
        <div className="w-full max-w-lg mx-auto mb-5">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-accent-red to-transparent"/>
        </div>

        {/* Peacocks + center content */}
        <div className="flex items-end justify-between max-w-3xl mx-auto gap-4">


          {/* Center text */}
          <div className="flex-1 text-center px-2">
            {/* Names again */}
            <div className="flex items-center justify-center gap-2 sm:gap-4 mb-2">
              <span className="font-sinhala text-sm sm:text-base font-semibold text-gold">ÿ,xc{/* දුලංජ */}</span>
              <span className="text-gold/40 text-xl">♥</span>
              <span className="font-sinhala text-sm sm:text-base font-semibold text-gold">icks{/* සජනි */}</span>
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
              © 2026 Dulanja &amp; Sajani
            </p>
          </div>
        </div>

      </div>
    </footer>
  );
}
