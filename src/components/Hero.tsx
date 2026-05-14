const s: Record<string, React.CSSProperties> = {
  section: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '10px 20px 250px',
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
  goldBar: {
    width: '80%',
    maxWidth: 1000,
    height: 3,
    background: 'linear-gradient(to right,transparent,var(--champagne),var(--gold-metallic),var(--gold),var(--champagne),transparent)',
    margin: '-8px auto 8px auto',
    borderRadius: 2,
  },
  preTitle: {
    fontFamily: "'Tharu Digital Nikini', serif",
    fontSize: 'clamp(0.9rem,2.5vw,1.1rem)',
    color: 'var(--brown-lt)',
    letterSpacing: '0.15em',
    textAlign: 'center',
    marginTop: 4,
  },
  mainTitle: {
    fontFamily: "'Tharu Digital Nikini', serif",
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
  subTitle: {
    fontFamily: "'Tharu Digital Nikini', serif",
    fontSize: 'clamp(0.8rem,2vw,0.95rem)',
    letterSpacing: '0.1em',
    color: 'var(--brown-lt)',
    textAlign: 'center',
    marginBottom: 8,
  },
  coupleArea: {
    width: 'clamp(280px,75vw,500px)',
    height: 'clamp(340px,85vw,580px)',
    position: 'relative',
    margin: '12px auto',
    overflow: 'hidden',
  },
  imageWithParentsContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 'clamp(10px,2vw,25px)',
    width: '100%',
    maxWidth: 1300,
    margin: '20px auto',
  },
  parentsSide: {
    flex: 1,
    textAlign: 'center',
    fontSize: 'clamp(1.2rem,3.8vw,1.5rem)',
    lineHeight: 1.7,
    color: 'var(--brown-lt)',
  },
  parentsGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr auto 1fr',
    gap: 10,
    maxWidth: 560,
    width: '100%',
    margin: '14px 0',
    textAlign: 'center',
    fontSize: 'clamp(0.72rem,2.2vw,0.84rem)',
    lineHeight: 1.7,
  },
  dividerV: {
    width: 1,
    background: 'linear-gradient(to bottom,transparent,var(--gold),transparent)',
    margin: '0 auto',
  },
  coupleNames: {
    display: 'flex', alignItems: 'center',
    gap: 'clamp(10px,3vw,24px)',
    margin: '10px 0',
    flexWrap: 'wrap' as const,
    justifyContent: 'center',
  },
  nameBig: {
    fontFamily: "'Noto Serif Sinhala', serif",
    fontSize: 'clamp(1.3rem,4.5vw,2rem)',
    fontWeight: 700,
    color: 'var(--brown)',
    textDecoration: 'underline',
    textUnderlineOffset: 6,
    textDecorationColor: 'var(--gold)',
  },
  saha: {
    fontSize: 'clamp(0.9rem,2.5vw,1.1rem)',
    color: 'var(--gold-dk)',
    fontWeight: 600,
  },
};

export default function Hero() {
  return (
    <section style={s.section}>

      {/* Top three symbols */}
      <div style={s.symbolsRow} className="fade-up">

        {/* Sun */}
        <img src={`${import.meta.env.BASE_URL}sun.png`} alt="Sun" style={{width:'clamp(150px,25vw,200px)',height:'auto'}} />

        {/* Kalasha */}
        <img src={`${import.meta.env.BASE_URL}punkalasa.png`} alt="Punkalasa" style={{width:'clamp(150px,25vw,200px)',height:'auto'}} />

        {/* Moon Rabbit */}
        <img src={`${import.meta.env.BASE_URL}moon_no_bg.png`} alt="Moon" style={{width:'clamp(150px,25vw,200px)',height:'auto'}} />

      </div>

      {/* Gold bar */}
      {/* <div style={s.goldBar} className="fade-up delay-1"/> */}
      {/* Titles */}
      <h1 style={s.mainTitle} className="fade-up delay-2">ජය සුබ මංගලම්</h1>
      {/* <div style={s.goldBar} className="fade-up delay-2"/> */}

      {/* Image with Parents on sides */}
      <div style={s.imageWithParentsContainer} className="fade-up delay-3">
        {/* Left Parents */}
        <div style={s.parentsSide}>
          <div>තුසිත බාලසූරිය මැතිතුමාගේ</div>
          <div>සහ</div>
          <div>දිලානි වනසිංහ මැතිණියගේ</div>
          <div style={{color:'var(--gold-dk)',fontWeight:600}}>ආදරණීය පුත්</div>
          <div style={{marginTop: 12, color: 'var(--brown)', fontSize: 'clamp(1.4rem,4.5vw,1.9rem)', fontWeight: 700}}>දුලංජ බාලසූරිය</div>
        </div>

        {/* Couple photo */}
        <div style={s.coupleArea}>
          <img src={`${import.meta.env.BASE_URL}Couple_img.png`} alt="Couple" style={{width:'100%',height:'100%',objectFit:'cover'}} />
        </div>

        {/* Right Parents */}
        <div style={s.parentsSide}>
          <div>දර්ශන් කොටුගොඩ මැතිතුමාගේ</div>
          <div>සහ</div>
          <div>නිර්මලා කොටුගොඩ මැතිණියගේ</div>
          <div style={{color:'var(--gold-dk)',fontWeight:600}}>ආදරණීය දියණිය</div>
          <div style={{marginTop: 12, color: 'var(--brown)', fontSize: 'clamp(1.4rem,4.5vw,1.9rem)', fontWeight: 700}}>සජනි කොටුගොඩ</div>
        </div>
      </div>

      {/* Couple names
      <div style={s.coupleNames} className="fade-up delay-4">
        <span style={s.nameBig}>දුලංජ් බාලසූරිය</span>
        <span style={s.saha}>සහ</span>
        <span style={s.nameBig}>සප්තී කොටුගොඩ</span>
      </div> */}

      {/* Divider */}
      {/* <div className="fade-up delay-4" style={{display:'flex',justifyContent:'center',margin:'16px 0',width:'100%'}}>
        <svg style={{width:'clamp(200px,70vw,320px)',height:'auto'}} viewBox="0 0 300 30" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="dg" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%"   stopColor="#C9960C" stopOpacity="0"/>
              <stop offset="20%"  stopColor="#C9960C"/>
              <stop offset="50%"  stopColor="#F5D060"/>
              <stop offset="80%"  stopColor="#C9960C"/>
              <stop offset="100%" stopColor="#C9960C" stopOpacity="0"/>
            </linearGradient>
          </defs>
          <line x1="0" y1="15" x2="300" y2="15" stroke="url(#dg)" strokeWidth="1"/>
          <path d="M30,15 C40,15 45,10 42,7 C39,4 34,6 34,9 C34,12 38,14 42,12"   stroke="#C9960C" strokeWidth="1.2" fill="none"/>
          <path d="M30,15 C40,15 45,20 42,23 C39,26 34,24 34,21 C34,18 38,16 42,18" stroke="#C9960C" strokeWidth="1.2" fill="none"/>
          <path d="M270,15 C260,15 255,10 258,7 C261,4 266,6 266,9 C266,12 262,14 258,12"   stroke="#C9960C" strokeWidth="1.2" fill="none"/>
          <path d="M270,15 C260,15 255,20 258,23 C261,26 266,24 266,21 C266,18 262,16 258,18" stroke="#C9960C" strokeWidth="1.2" fill="none"/>
          <path d="M145,15 L150,8 L155,15 L150,22Z" fill="#C9960C"/>
          <path d="M147,15 L150,10 L153,15 L150,20Z" fill="#F5D060"/>
          <circle cx="130" cy="15" r="2.5" fill="#C9960C"/>
          <circle cx="170" cy="15" r="2.5" fill="#C9960C"/>
          <circle cx="118" cy="15" r="1.5" fill="#C9960C" opacity="0.7"/>
          <circle cx="182" cy="15" r="1.5" fill="#C9960C" opacity="0.7"/>
        </svg>
      </div> */}

    </section>
  );
}
