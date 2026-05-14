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
    textAlign: 'center',
    fontSize: 'clamp(0.8rem,2.5vw,1.1rem)',
    lineHeight: 1.7,
    color: 'var(--brown-lt)',
    minWidth: 0,
    overflowWrap: 'break-word',
  },
  roleCell: {
    textAlign: 'center',
    fontSize: 'clamp(0.8rem,2.5vw,1.1rem)',
    lineHeight: 1.7,
    color: 'var(--gold-dk)',
    fontWeight: 600,
    minWidth: 0,
    overflowWrap: 'break-word',
  },
  nameCell: {
    textAlign: 'center',
    color: 'var(--brown)',
    fontSize: 'clamp(1.2rem,4vw,1.7rem)',
    fontWeight: 700,
    paddingTop: 12,
    whiteSpace: 'nowrap',
  },
};

// nbsp: non-breaking space keeps surname + honorific on the same line
const NBSP = ' ';

export default function Hero() {
  return (
    <section style={s.section}>

      {/* Top three symbols */}
      <div style={s.symbolsRow} className="fade-up">
        <img src={`${import.meta.env.BASE_URL}sun.png`} alt="Sun" style={{width:'clamp(80px,18vw,150px)',height:'auto'}} />
        <img src={`${import.meta.env.BASE_URL}punkalasa.png`} alt="Punkalasa" style={{width:'clamp(80px,18vw,150px)',height:'auto'}} />
        <img src={`${import.meta.env.BASE_URL}moon_no_bg.png`} alt="Moon" style={{width:'clamp(80px,18vw,150px)',height:'auto'}} />
      </div>

      <h1 style={s.mainTitle} className="fade-up delay-2">ජය සුබ මංගලම්</h1>

      {/* CSS Grid: each text line is its own cell so rows align across columns */}
      <div style={s.parentsGrid} className="fade-up delay-3 parents-grid">

        {/* Row 1 – Fathers */}
        <div style={s.textCell} className="pg-g-father">{`තුසිත${NBSP}බාලසූරිය`}</div>

        {/* Photo – spans all 7 text rows in center column */}
        <div style={s.coupleArea} className="pg-photo">
          <img src={`${import.meta.env.BASE_URL}Couple_img.png`} alt="Couple" style={{width:'100%',height:'100%',objectFit:'cover'}} />
        </div>

        <div style={s.textCell} className="pg-b-father">{`දර්ශන්${NBSP}කොටුගොඩ`}</div>

        {/* Row 2 – Fathers honorific */}
        <div style={s.textCell} className="pg-g-pat">මැතිතුමාගේ</div>
        <div style={s.textCell} className="pg-b-pat">මැතිතුමාගේ</div>

        {/* Row 2 – සහ */}
        <div style={s.textCell} className="pg-g-saha">සහ</div>
        <div style={s.textCell} className="pg-b-saha">සහ</div>

        {/* Row 3 – Mothers */}
        <div style={s.textCell} className="pg-g-mother">{`දිලානි${NBSP}වනසිංහ`}</div>
        <div style={s.textCell} className="pg-b-mother">{`නිර්මලා ${NBSP}කොටුගොඩ`}</div>

        {/* Row 4 – Mothers honorific */}
        <div style={s.textCell} className="pg-g-mat">මැතිණියගේ</div>
        <div style={s.textCell} className="pg-b-mat">මැතිණියගේ</div>

        {/* Row 4 – Role */}
        <div style={s.roleCell} className="pg-g-role">ආදරණීය පුත්</div>
        <div style={s.roleCell} className="pg-b-role">ආදරණීය දියණිය</div>

        {/* Row 5 – Names */}
        <div style={s.nameCell} className="pg-g-name">{`දුලංජ${NBSP}බාලසූරිය`}</div>
        <div style={s.nameCell} className="pg-b-name">{`සජනි${NBSP}කොටුගොඩ`}</div>

      </div>

    </section>
  );
}
