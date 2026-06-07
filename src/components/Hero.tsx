import { useState, useEffect } from 'react';
import { type Guest, getGuestByToken } from '../data/guests';

export function useInvitedGuest(): Guest | null {
  const [guest, setGuest] = useState<Guest | null>(null);
  useEffect(() => {
    const token = new URLSearchParams(window.location.search).get('guest');
    if (token) setGuest(getGuestByToken(token));
  }, []);
  return guest;
}

const s: Record<string, React.CSSProperties> = {
  section: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '10px 20px 0',
    position: 'relative',
    overflow: 'hidden',
  },
  symbolsRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 'clamp(20px,8vw,80px)',
    marginBottom: 10,
    width: '100%',
    maxWidth: 500,
  },
  mainTitle: {
    fontFamily: "'Tharu Digital Siyapatha', serif",
    fontSize: 'clamp(3rem,10vw,5.5rem)',
    fontWeight: 700,
    textAlign: 'center',
    lineHeight: 1.1,
    background: 'linear-gradient(135deg, #8B6000 0%, #C9960C 25%, #E6C547 50%, #D4AF37 75%, #8B6000 100%)',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    filter: 'drop-shadow(0 2px 12px rgba(201,150,12,0.4))',
    margin: '2px 0 6px',
  },
  parentsGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr auto 1fr',
    gap: 'clamp(8px,1.5vw,16px) clamp(10px,2vw,25px)',
    width: '100%',
    maxWidth: 1300,
    margin: '20px auto',
    position: 'relative',
    alignItems: 'center',
  },
  coupleArea: {
    width: 'clamp(280px,75vw,500px)',
    height: 'clamp(340px,85vw,580px)',
    position: 'relative',
    overflow: 'hidden',
    zIndex: 20,
  },
  textCell: {
    fontFamily: "'Tharu Digital Siyapatha', serif",
    textAlign: 'center',
    fontSize: 'clamp(0.8rem,2.5vw,1.1rem)',
    lineHeight: 1.7,
    color: 'var(--brown-lt)',
    minWidth: 0,
    overflowWrap: 'break-word',
  },
  roleCell: {
    fontFamily: "'Tharu Digital Siyapatha', serif",
    textAlign: 'center',
    fontSize: 'clamp(0.8rem,2.5vw,1.1rem)',
    lineHeight: 1.7,
    color: 'var(--gold-dk)',
    fontWeight: 600,
    minWidth: 0,
    overflowWrap: 'break-word',
  },
  nameCell: {
    fontFamily: "'Tharu Digital Siyapatha', serif",
    textAlign: 'center',
    color: 'var(--brown)',
    fontSize: 'clamp(1.2rem,4vw,1.7rem)',
    fontWeight: 700,
    paddingTop: 12,
    whiteSpace: 'nowrap',
  },
};


export default function Hero() {
  const guest = useInvitedGuest();

  return (
    <section style={s.section}>

      {/* Top three symbols */}
      <div style={s.symbolsRow} className="fade-up">
        <img src={`${import.meta.env.BASE_URL}sun.png`} alt="Sun" style={{width:'clamp(80px,18vw,150px)',height:'auto'}} />
        <img src={`${import.meta.env.BASE_URL}punkalasa.png`} alt="Punkalasa" style={{width:'clamp(80px,18vw,150px)',height:'auto'}} />
        <img src={`${import.meta.env.BASE_URL}moon_no_bg.png`} alt="Moon" style={{width:'clamp(80px,18vw,150px)',height:'auto'}} />
      </div>

      <h1 style={s.mainTitle} className="fade-up delay-2">ch iqn ux.,ï</h1>

      {/* CSS Grid: each text line is its own cell so rows align across columns */}
      <div style={s.parentsGrid} className="fade-up delay-3 parents-grid">

        {/* Row 1 – Fathers */}
        <div style={s.textCell} className="pg-g-father">;=is;   nd,iQßh</div>{/* තුසිත බාලසූරිය */}

        {/* Photo – spans all 7 text rows in center column */}
        <div style={s.coupleArea} className="pg-photo">
          <img src={`${import.meta.env.BASE_URL}Couple_img.png`} alt="Couple" style={{width:'100%',height:'100%',objectFit:'cover'}} />
        </div>

        <div style={s.textCell} className="pg-b-father">o¾Yka   fldgqf.dv</div>{/* දර්ශන් කොටුගොඩ */}

        {/* Row 2 – Fathers honorific */}
        <div style={s.textCell} className="pg-g-pat">ue;s;=udf.a</div>{/* මැතිතුමාගේ */}
        <div style={s.textCell} className="pg-b-pat">ue;s;=udf.a</div>{/* මැතිතුමාගේ */}

        {/* Row 2 – iy (සහ) */}
        <div style={s.textCell} className="pg-g-saha">iy</div>{/* සහ */}
        <div style={s.textCell} className="pg-b-saha">iy</div>{/* සහ */}

        {/* Row 3 – Mothers */}
        <div style={s.textCell} className="pg-g-mother">È,dks   jkisx y</div>{/* දිලානි වනසිංහ */}
        <div style={s.textCell} className="pg-b-mother">ks¾u,d   fldgqf.dv</div>{/* නිර්මලා කොටුගොඩ */}

        {/* Row 4 – Mothers honorific */}
        <div style={s.textCell} className="pg-g-mat">ue;sKshf.a</div>{/* මැතිණියගේ */}
        <div style={s.textCell} className="pg-b-mat">ue;sKshf.a</div>{/* මැතිණියගේ */}

        {/* Row 4 – Role */}
        <div style={s.roleCell} className="pg-g-role">wdorKSh  mq;a</div>{/* ආදරණීය පුත් */}
        <div style={s.roleCell} className="pg-b-role">wdorKSh  ÈhKsh</div>{/* ආදරණීය දියණිය */}

        {/* Row 5 – Names */}
        <div style={s.nameCell} className="pg-g-name">ÿ,xc  nd,iQßh</div>{/* දුලංජ බාලසූරිය */}
        <div style={s.nameCell} className="pg-b-name">icks fldgqf.dv</div>{/* සජනි කොටුගොඩ */}

      </div>

      {/* Invitation Details
      <div style={{marginTop: 'clamp(40px, 8vw, 80px)', textAlign: 'center', maxWidth: 700}} className="fade-up delay-4">
        <p style={{fontFamily: "'Tharu Digital Nikini', serif", fontSize: 'clamp(0.95rem, 2.2vw, 1.1rem)', lineHeight: 1.8, color: 'var(--brown)', margin: '0 20px'}}>
          අතිනත ගැනීමේ ප්‍රීතිය නිමිත්තෙන් 2026 ක් වූ ජූලි මස 30 වෙනි බ්‍රහස්පතින්දා ප.ව 4.30 සිට බත්තරමුල්ල වෝටර්ස් එජ් හෝටලයේ දීපවත්වන ප්‍රිය සම්භාෂණයට
        </p>
      </div> */}

      {/* Content */}
      <div className="relative z-10">

        {/* Invitation text – අතිනත ගැනීමේ ප්‍රීතිය නිමිත්තෙන් පවත්වන ප්‍රිය සම්භාෂණයට */}
        <p className="font-sinhala text-center text-base sm:text-lg text-brown/80 leading-relaxed mb-4">
          w;sk;  .ekSfï  m%S;sh    ksñ;af;ka     mj;ajk  m%sh   iïNdIKhg
        </p>

        {/* Date block */}
        <div className="text-center mb-2">
          <div className="inline-block">
            <p className="font-sinhala font-bold text-2xl sm:text-3xl lg:text-4xl"
                style={{color: '#C9960C', textShadow: '0 1px 8px rgba(201,150,12,0.2)'}}>
              2026 cQ,s   ui 30{/* 2026 ජූලි මස 30 */}
            </p>
            <p className="font-sinhala text-base sm:text-lg text-brown/70 mt-1">
              n%yiam;skaod{/* බ්‍රහස්පතින්දා */}
            </p>
          </div>
        </div>

        {/* Thin gold line */}
        {/* <div className="w-32 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto my-4"/> */}

        {/* Time block */}
        <div className="text-center mb-2">
          <p className="font-sinhala text-lg sm:text-xl font-semibold text-brown">
            m¡j¡ 4¡30 isg{/* ප.ව. 4.30 සිට */}
          </p>
        </div>

        

        {/* Venue */}
        <div className="text-center mb-6">
          <p className="font-sinhala font-bold text-xl sm:text-2xl lg:text-3xl text-brown leading-tight"
              style={{textShadow: '0 1px 4px rgba(61,31,13,0.1)'}}>
            n;a;ruq,a,{/* බත්තරමුල්ල */}
          </p>
          <p className="font-sinhala font-bold text-xl sm:text-2xl lg:text-3xl text-brown leading-tight">
            fjdag¾ia tÊ fydag,fha§{/* වෝටර්ස් එජ් හෝටලයේදී */}
          </p>
          <p className="font-sinhala text-base sm:text-lg text-brown/80 mt-4">
            mj;ajk  m%sh   iïNdIKhg{/* පවත්වන ප්‍රිය සම්භාෂණයට */}
          </p>
          {/* <p className="font-garamond italic text-base text-brown/60 mt-1">
            Waters Edge Hotel, Battaramulla
          </p> */}

          {/* Guest name */}
          <div style={{marginTop: '18px'}}>
            {guest ? (
              <p className="font-sinhala font-bold text-xl sm:text-2xl mb-4"
                  style={{color:'#C9960C', textShadow:'0 1px 8px rgba(201,150,12,0.2)'}}>
                {guest.name}{' '}
                {guest.inviteType === 'Individual'
                  ? (guest.gender === 'male' ? 'uy;dg' /* මහතාට */ : 'uy;añhg' /* මහත්මියට */)
                  : guest.inviteType === 'Couple'
                  ? 'uy;d iy uy;añhg' /* මහතා සහ මහත්මියට */
                  : (guest.gender === 'male' ? 'uy;d' /* මහතා */ : 'uy;añh' /* මහත්මිය */)}

              </p>
            ) : (
              <p className="font-sinhala font-bold text-xl sm:text-2xl mb-4"
                  style={{color:'#C9960C', textShadow:'0 1px 8px rgba(201,150,12,0.2)'}}>
                f.!rjkSh wdrdê;hka{/* ගෞරවනීය ආරාධිතයන් */}
              </p>
            )}
            {(!guest || guest.inviteType === 'Family') && (
              <p className="font-sinhala text-base text-brown/70 mt-1">
                we;=¿   mjqf,a  ieug{/* ඇතුළු පවුලේ සැමට */}
              </p>
            )}
            <p className="font-sinhala text-base sm:text-lg text-brown/80 mt-3">
              flfrk f.!rjkSh  werhquhs   fï¡{/* කෙරෙන ගෞරවනීය ඇරයුමයි මේ. */}
            </p>
            <p className="font-sinhala text-base sm:text-lg font-bold text-accent-red mt-3">
              fmdarefõ  pdß;%{/* පෝරුවේ චාරිත්‍ර */}
            </p>
            <p className="font-sinhala text-base sm:text-lg font-bold text-accent-red mt-1">
              m¡j¡ 4¡50{/* ප.ව. 4.50 */}
            </p>
          </div>
        </div>
      </div>

    </section>
  );
}
