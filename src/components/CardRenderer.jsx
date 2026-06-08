import { QRCodeSVG } from 'qrcode.react';
import logoImg from '../assets/logo.png';

/* ─── Icon SVGs ─── */
const MailIcon = () => (
  <svg className="inline-block ml-1 mr-5" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);
const PhoneIcon = () => (
  <svg className="inline-block ml-1 mr-5" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

/* ─── LAYOUT 1: Split panel with waves (original) ─── */
function SplitWaveFront({ t, data, uploadedImg, uploadSize, uploadOffsetX, uploadOffsetY, uploadFit }) {
  return (
    <div className="w-[570px] h-[310px] overflow-visible relative shadow-xl rounded-lg" style={{ background: t.rightPanelBg, WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact' }}>
      <div className="absolute left-0 top-0 w-[260px] h-full flex items-center justify-center rounded-l-lg" style={{ background: t.leftPanelColor, WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact', overflow: 'hidden' }}>
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 260 310" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            {t.gradientDefs?.map(g => (
              <linearGradient key={g.id} id={g.id} x1={g.x1} y1={g.y1} x2={g.x2} y2={g.y2}>
                {g.stops.map((s, i) => <stop key={i} offset={s.offset} style={{ stopColor: s.color, stopOpacity: 1 }} />)}
              </linearGradient>
            ))}
          </defs>
          <path d="M 160 0 Q 220 80 200 155 Q 180 230 160 310" fill="none" stroke={t.waveColors?.wave1} strokeWidth="60" strokeLinecap="round" />
          <path d="M 190 0 Q 240 100 220 155 Q 200 210 190 310" fill="none" stroke={t.waveColors?.wave2} strokeWidth="35" strokeLinecap="round" opacity="0.6" />
          <path d="M 210 0 Q 260 100 240 155 Q 220 210 210 310" fill="none" stroke={t.waveColors?.wave3} strokeWidth="12" strokeLinecap="round" />
        </svg>
        <div className="absolute left-[35px] top-[50%] -translate-y-1/2 z-20 flex flex-col items-center">
          <div style={{ width: '128px', height: '128px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ background: t.qrCircleColor, width: '116px', height: '116px', borderRadius: '9999px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 20px rgba(0,0,0,0.35)' }}>
              <div style={{ background: 'white', padding: '10px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <QRCodeSVG value={data.qrUrl} size={92} fgColor={t.primaryColor} bgColor="white" level="M" />
              </div>
            </div>
          </div>
          {t.showScanMe && <div className="mt-2 text-white/90 text-[11px] font-semibold" style={{ letterSpacing: '0.4px' }}>Scan Me</div>}
        </div>
        <div className="absolute left-0 bottom-0 w-[80px] h-[18px]" style={{ background: t.accentColor }} />
        {t.cornerBadge && t.cornerBadgeStyle && (
          <div className="absolute top-3 right-3 z-30"><span className="text-[10px] font-bold tracking-[0.2em]" style={{ color: t.cornerBadgeStyle.color }}>{t.cornerBadgeStyle.text}</span></div>
        )}
      </div>
      <div className="absolute right-0 top-0 w-[310px] h-full flex flex-col items-center justify-start p-[20px]" style={{ background: t.rightPanelBg }}>
        <h1 className="text-center text-[17px] leading-[1.1] mb-[6px] w-full" style={{ letterSpacing: '0.5px', marginTop: '16px', fontWeight: 800 }}>
          <span style={{ color: t.companyColors?.first }}>Imperial</span>
          <span style={{ color: t.companyColors?.second, marginLeft: '8px' }}>Innovation Fund</span>
        </h1>
        <div className="w-8 h-[2px] rounded-full mb-[6px]" style={{ background: t.accentColor }} />
        <img src={uploadedImg || logoImg} alt="Logo" className="mb-[10px] mt-[3px]" style={{ width: `${uploadSize}px`, height: `${uploadSize}px`, objectFit: uploadFit, transform: `translate(${uploadOffsetX}px, ${uploadOffsetY}px)`, transition: 'transform 120ms linear, width 120ms linear, height 120ms linear' }} />
        <div className="flex items-stretch gap-0 w-full mb-[10px]">
          <div className="flex-1 py-[5px] px-[12px] text-center text-[9px] font-semibold flex items-center justify-center tracking-wider" style={{ background: t.websiteBg, color: t.websiteTextColor || '#ffffff' }}>{data.website}</div>
          <div className="w-[25px] h-auto min-h-[22px]" style={{ background: t.websiteAccent }} />
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full text-center pb-[12px]">
            <div className="text-[16px] font-bold tracking-tight" style={{ color: t.nameColor }}>{data.name}</div>
            <div className="text-[11px] font-semibold mt-[4px] tracking-wide" style={{ color: t.titleColor }}>{data.title}</div>
            <div className="mt-[10px] text-[10px]" style={{ color: t.contactColor }}>
              <div><MailIcon />{data.email}</div>
              <div className="mt-[3px]"><PhoneIcon />{data.phone}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── LAYOUT 2: Full-bleed background with content overlaid ─── */
function FullBleedFront({ t, data, uploadedImg, uploadSize, uploadOffsetX, uploadOffsetY, uploadFit }) {
  return (
    <div className="w-[570px] h-[310px] overflow-hidden relative shadow-xl rounded-lg flex flex-col items-center justify-center" style={{ background: t.background, position: 'relative' }}>
      {t.showOverlayShapes && (
        <div className="absolute inset-0 overflow-hidden opacity-[0.07]">
          <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full" style={{ background: t.overlayColor || '#ffffff' }} />
          <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full" style={{ background: t.overlayColor2 || '#ffffff' }} />
        </div>
      )}
      <div className="relative z-10 flex flex-col items-center px-12 w-full h-full justify-center">
        <div className="absolute top-4 right-4">
          <div style={{ background: t.qrBg || 'rgba(255,255,255,0.15)', padding: '6px', borderRadius: '8px', backdropFilter: 'blur(4px)' }}>
            <QRCodeSVG value={data.qrUrl} size={56} fgColor={t.qrFgColor || '#ffffff'} bgColor="transparent" level="M" />
          </div>
        </div>
        <img src={uploadedImg || logoImg} alt="Logo" className="mb-2" style={{ width: `${Math.min(uploadSize, 90)}px`, height: `${Math.min(uploadSize, 90)}px`, objectFit: uploadFit, transform: `translate(${uploadOffsetX}px, ${uploadOffsetY}px)` }} />
        <h1 className="text-center font-bold leading-tight" style={{ color: t.headingColor || '#ffffff', fontSize: '15px', letterSpacing: '1px', textShadow: '0 1px 3px rgba(0,0,0,0.3)' }}>
          Imperial Innovation Fund
        </h1>
        <div className="w-10 h-[2px] my-2 rounded-full" style={{ background: t.dividerColor || 'rgba(255,255,255,0.4)' }} />
        <div className="text-center text-[13px] font-bold tracking-tight" style={{ color: t.nameColor || '#ffffff' }}>{data.name}</div>
        <div className="text-[10px] mt-1 font-medium tracking-wider uppercase" style={{ color: t.titleColor || 'rgba(255,255,255,0.8)' }}>{data.title}</div>
        <div className="mt-2 text-[10px] text-center" style={{ color: t.contactColor || 'rgba(255,255,255,0.6)' }}>
          <span><PhoneIcon />{data.phone}</span><span className="mx-2">|</span><span><MailIcon />{data.email}</span>
        </div>
        <div className="mt-1 text-[10px] font-semibold tracking-wider" style={{ color: t.websiteColor || 'rgba(255,255,255,0.7)' }}>{data.website}</div>
      </div>
    </div>
  );
}

/* ─── LAYOUT 3: Minimal clean with lots of whitespace ─── */
function MinimalFront({ t, data, uploadedImg, uploadSize, uploadOffsetX, uploadOffsetY, uploadFit }) {
  return (
    <div className="w-[570px] h-[310px] overflow-hidden relative shadow-xl rounded-lg flex flex-col" style={{ background: t.cardBg || '#ffffff' }}>
      <div className="h-[3px] w-full" style={{ background: t.accentColor }} />
      <div className="flex-1 flex items-center px-10 py-8">
        <div className="flex-1">
          <img src={uploadedImg || logoImg} alt="Logo" className="mb-3" style={{ width: `${Math.min(uploadSize, 75)}px`, height: `${Math.min(uploadSize, 75)}px`, objectFit: uploadFit, transform: `translate(${uploadOffsetX}px, ${uploadOffsetY}px)` }} />
          <h1 className="text-[12px] font-bold tracking-[0.35em] uppercase" style={{ color: t.accentColor, letterSpacing: '0.35em' }}>Imperial Innovation Fund</h1>
          <div className="text-[20px] font-bold mt-2 tracking-tight" style={{ color: t.nameColor || '#1a1a1a' }}>{data.name}</div>
          <div className="text-[11px] font-medium mt-1 tracking-wide" style={{ color: t.titleColor || '#888' }}>{data.title}</div>
          <div className="mt-3 text-[10px] space-y-1" style={{ color: t.contactColor || '#aaa' }}>
            <div><MailIcon />{data.email}</div>
            <div><PhoneIcon />{data.phone}</div>
            <div><svg className="inline-block ml-1 mr-5" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>{data.website}</div>
          </div>
        </div>
        <div className="flex flex-col items-center ml-6">
          <div style={{ background: t.qrBg || '#f5f5f5', padding: '8px', borderRadius: '12px' }}>
            <QRCodeSVG value={data.qrUrl} size={80} fgColor={t.qrFgColor || t.accentColor} bgColor="transparent" level="M" />
          </div>
          {t.showScanMe && <div className="mt-1 text-[9px] font-semibold tracking-wider" style={{ color: t.accentColor }}>SCAN ME</div>}
        </div>
      </div>
    </div>
  );
}

/* ─── LAYOUT 4: Classic bordered with ornate frame ─── */
function BorderedFront({ t, data, uploadedImg, uploadSize, uploadOffsetX, uploadOffsetY, uploadFit }) {
  return (
    <div className="w-[570px] h-[310px] overflow-hidden relative shadow-xl rounded-lg" style={{ background: t.cardBg || '#fefcf5' }}>
      <div className="absolute inset-[12px] rounded-md" style={{ border: `1.5px solid ${t.borderColor || '#c9a96e'}` }} />
      <div className="absolute inset-[18px] rounded-sm" style={{ border: `0.5px solid ${t.borderColor || '#c9a96e'}66` }} />
      {t.showOrnaments && (
        <>
          <div className="absolute top-[8px] left-[8px] w-6 h-6" style={{ borderTop: `2px solid ${t.borderColor}`, borderLeft: `2px solid ${t.borderColor}` }} />
          <div className="absolute top-[8px] right-[8px] w-6 h-6" style={{ borderTop: `2px solid ${t.borderColor}`, borderRight: `2px solid ${t.borderColor}` }} />
          <div className="absolute bottom-[8px] left-[8px] w-6 h-6" style={{ borderBottom: `2px solid ${t.borderColor}`, borderLeft: `2px solid ${t.borderColor}` }} />
          <div className="absolute bottom-[8px] right-[8px] w-6 h-6" style={{ borderBottom: `2px solid ${t.borderColor}`, borderRight: `2px solid ${t.borderColor}` }} />
        </>
      )}
      <div className="absolute inset-[28px] flex">
        <div className="flex-1 flex flex-col justify-center">
          <img src={uploadedImg || logoImg} alt="Logo" className="mb-3" style={{ width: `${Math.min(uploadSize, 65)}px`, height: `${Math.min(uploadSize, 65)}px`, objectFit: uploadFit, transform: `translate(${uploadOffsetX}px, ${uploadOffsetY}px)` }} />
          <div className="text-[12px] font-semibold tracking-[0.25em] uppercase" style={{ color: t.accentColor || '#c9a96e', letterSpacing: '0.25em' }}>Imperial Innovation Fund</div>
          <div className="text-[19px] font-bold tracking-tight mt-1" style={{ color: t.nameColor || '#2c1810' }}>{data.name}</div>
          <div className="text-[11px] font-medium mt-1 tracking-wider uppercase" style={{ color: t.titleColor || '#c9a96e' }}>{data.title}</div>
          <div className="w-10 h-[1.5px] my-2" style={{ background: t.accentColor || '#c9a96e' }} />
          <div className="text-[10px] space-y-0.5" style={{ color: t.contactColor || '#8b7355' }}>
            <div><MailIcon />{data.email}</div>
            <div><PhoneIcon />{data.phone}</div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center ml-4">
          <div style={{ background: t.qrBg || '#f8f4ec', padding: '6px', borderRadius: '8px' }}>
            <QRCodeSVG value={data.qrUrl} size={72} fgColor={t.qrFgColor || t.accentColor} bgColor="transparent" level="M" />
          </div>
          <div className="mt-1 text-[8px] font-semibold tracking-[0.2em]" style={{ color: t.accentColor }}>SCAN</div>
        </div>
      </div>
    </div>
  );
}

/* ─── LAYOUT 5: Diagonal split ─── */
function DiagonalFront({ t, data, uploadedImg, uploadSize, uploadOffsetX, uploadOffsetY, uploadFit }) {
  return (
    <div className="w-[570px] h-[310px] overflow-hidden relative shadow-xl rounded-lg" style={{ background: t.bgColor || '#ffffff' }}>
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 570 310" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <polygon points="0,0 340,0 200,310 0,310" fill={t.diagonalColor1} />
        <polygon points="340,0 570,0 570,310 200,310" fill={t.diagonalColor2} />
        <line x1="340" y1="0" x2="200" y2="310" stroke={t.dividerLine || t.diagonalColor2} strokeWidth="1" />
      </svg>
      <div className="absolute right-6 top-1/2 -translate-y-1/2 z-10 flex flex-col items-center">
        <div style={{ background: t.qrBg || 'rgba(255,255,255,0.15)', padding: '8px', borderRadius: '12px', backdropFilter: 'blur(4px)' }}>
          <QRCodeSVG value={data.qrUrl} size={80} fgColor={t.qrFgColor || '#ffffff'} bgColor="transparent" level="M" />
        </div>
        {t.showScanMe && <div className="mt-1 text-[9px] font-semibold tracking-wider" style={{ color: t.qrFgColor || '#ffffff', opacity: 0.7 }}>SCAN</div>}
      </div>
      <div className="absolute left-8 top-1/2 -translate-y-1/2 z-10 max-w-[200px]">
        <img src={uploadedImg || logoImg} alt="Logo" className="mb-3" style={{ width: `${Math.min(uploadSize, 75)}px`, height: `${Math.min(uploadSize, 75)}px`, objectFit: uploadFit, transform: `translate(${uploadOffsetX}px, ${uploadOffsetY}px)` }} />
        <h1 className="text-[12px] font-bold tracking-[0.2em] uppercase" style={{ color: t.headingColor || '#ffffff', letterSpacing: '0.2em' }}>Imperial Innovation Fund</h1>
        <div className="w-8 h-[2px] my-2 rounded-full" style={{ background: t.dividerLine || 'rgba(255,255,255,0.3)' }} />
        <div className="text-[17px] font-bold mt-1 tracking-tight" style={{ color: t.nameColor || '#ffffff' }}>{data.name}</div>
        <div className="text-[10px] font-medium mt-0.5 tracking-wider uppercase" style={{ color: t.titleColor || 'rgba(255,255,255,0.8)' }}>{data.title}</div>
        <div className="mt-2 text-[10px]" style={{ color: t.contactColor || 'rgba(255,255,255,0.6)' }}>
          <div><MailIcon />{data.email}</div>
          <div><PhoneIcon />{data.phone}</div>
        </div>
      </div>
    </div>
  );
}

/* ─── Back layouts ─── */
function DefaultBack({ t, data, uploadedImg }) {
  return (
    <div className="w-[570px] h-[310px] overflow-hidden relative shadow-xl rounded-lg flex flex-col items-center justify-center" style={{ background: t.background, WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact' }}>
      {t.showDiamondPattern && (
        <svg className="absolute inset-0 w-full h-full opacity-[0.06]" viewBox="0 0 570 310" xmlns="http://www.w3.org/2000/svg">
          <defs><pattern id="diamond" width="60" height="60" patternUnits="userSpaceOnUse"><rect width="60" height="60" fill="none" /><path d="M30 0 L60 30 L30 60 L0 30 Z" fill="white" stroke="none" /></pattern></defs>
          <rect width="570" height="310" fill="url(#diamond)" />
        </svg>
      )}
      <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: t.topBar }} />
      <div className="relative z-10 flex flex-col items-center px-16">
        <div className="relative mb-6">
          {t.logoGlow && <div className={`absolute inset-0 w-36 h-36 rounded-2xl bg-gradient-to-br ${t.glowColor || 'from-pink-500/30 to-rose-500/10'} blur-3xl`} />}
          <div className="relative w-36 h-36 rounded-2xl bg-white/10 backdrop-blur-xl flex items-center justify-center ring-2 ring-white/20 shadow-2xl">
            <img src={uploadedImg || logoImg} alt="Logo" className="w-32 h-32 object-contain drop-shadow-xl" />
          </div>
        </div>
        <h2 className={`text-center text-[22px] font-bold tracking-[0.5px] leading-tight drop-shadow-lg ${t.headingColor}`}>{data.backHeading || 'Imperial Innovation Fund Limited'}</h2>
        <div className={`w-20 h-[3px] bg-gradient-to-r ${t.dividerColor} my-5 rounded-full`} />
        <p className={`text-center text-[12px] font-medium tracking-[0.18em] uppercase drop-sm ${t.taglineColor}`}>{data.tagline}</p>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-[2px]" style={{ background: t.bottomBar }} />
      {t.showCornerAccents && (
        <>
          <div className={`absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 ${t.cornerAccentColor || 'border-white/10'} rounded-tr`} />
          <div className={`absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 ${t.cornerAccentColor || 'border-white/10'} rounded-bl`} />
        </>
      )}
    </div>
  );
}

function MinimalBack({ t, data, uploadedImg }) {
  return (
    <div className="w-[570px] h-[310px] overflow-hidden relative shadow-xl rounded-lg flex flex-col" style={{ background: t.cardBg || '#ffffff' }}>
      <div className="h-[3px] w-full" style={{ background: t.accentColor }} />
      <div className="flex-1 flex flex-col items-center justify-center px-16">
        <img src={uploadedImg || logoImg} alt="Logo" className="mb-5 opacity-60" style={{ width: '72px', height: '72px', objectFit: 'contain' }} />
        <h2 className="text-center text-[20px] font-bold tracking-tight" style={{ color: t.headingColor || '#333' }}>{data.backHeading || 'Imperial Innovation Fund Limited'}</h2>
        <div className="w-10 h-[2px] my-4 rounded-full" style={{ background: t.accentColor }} />
        <p className="text-center text-[11px] font-medium tracking-[0.12em] uppercase" style={{ color: t.taglineColor || '#999' }}>{data.tagline}</p>
        {(data.backAddress || data.backSocial) && (
          <div className="mt-6 text-[10px] text-center" style={{ color: t.contactColor || '#bbb' }}>
            {data.backAddress && <div>{data.backAddress}</div>}
            {data.backSocial && <div className="mt-1">{data.backSocial}</div>}
          </div>
        )}
      </div>
    </div>
  );
}

function FullBleedBack({ t, data, uploadedImg }) {
  return (
    <div className="w-[570px] h-[310px] overflow-hidden relative shadow-xl rounded-lg flex flex-col items-center justify-center" style={{ background: t.background }}>
      {t.showOverlayShapes && (
        <div className="absolute inset-0 overflow-hidden opacity-[0.06]">
          <div className="absolute -top-16 left-1/4 w-72 h-72 rounded-full" style={{ background: t.overlayColor || '#ffffff' }} />
          <div className="absolute -bottom-20 right-1/4 w-56 h-56 rounded-full" style={{ background: t.overlayColor2 || '#ffffff' }} />
        </div>
      )}
      <div className="relative z-10 flex flex-col items-center px-16">
        <img src={uploadedImg || logoImg} alt="Logo" className="mb-5" style={{ width: '80px', height: '80px', objectFit: 'contain' }} />
        <h2 className="text-center text-[20px] font-bold tracking-[0.5px] leading-tight" style={{ color: t.headingColor || '#ffffff' }}>{data.backHeading || 'Imperial Innovation Fund Limited'}</h2>
        <div className="w-16 h-[2px] my-4 rounded-full" style={{ background: t.dividerColor || 'rgba(255,255,255,0.3)' }} />
        <p className="text-center text-[11px] font-medium tracking-[0.15em] uppercase" style={{ color: t.taglineColor || 'rgba(255,255,255,0.7)' }}>{data.tagline}</p>
        <div className="mt-6 text-[10px] text-center" style={{ color: t.contactColor || 'rgba(255,255,255,0.5)' }}>
          {data.backAddress && <div>{data.backAddress}</div>}
          {data.backSocial && <div className="mt-1">{data.backSocial}</div>}
        </div>
      </div>
    </div>
  );
}

/* ─── Renderer ─── */
export default function CardRenderer({ template, data, uploadedImg, uploadSize, uploadOffsetX, uploadOffsetY, uploadFit, showBack }) {
  const layout = template.layout || 'split-wave';

  if (showBack) {
    const bt = template.back;
    switch (layout) {
      case 'minimal':
        return <MinimalBack t={bt} data={data} uploadedImg={uploadedImg} />;
      case 'fullbleed':
        return <FullBleedBack t={bt} data={data} uploadedImg={uploadedImg} />;
      default:
        return <DefaultBack t={bt} data={data} uploadedImg={uploadedImg} />;
    }
  }

  const t = template.front;
  switch (layout) {
    case 'fullbleed':
      return <FullBleedFront t={t} data={data} uploadedImg={uploadedImg} uploadSize={uploadSize} uploadOffsetX={uploadOffsetX} uploadOffsetY={uploadOffsetY} uploadFit={uploadFit} />;
    case 'minimal':
      return <MinimalFront t={t} data={data} uploadedImg={uploadedImg} uploadSize={uploadSize} uploadOffsetX={uploadOffsetX} uploadOffsetY={uploadOffsetY} uploadFit={uploadFit} />;
    case 'bordered':
      return <BorderedFront t={t} data={data} uploadedImg={uploadedImg} uploadSize={uploadSize} uploadOffsetX={uploadOffsetX} uploadOffsetY={uploadOffsetY} uploadFit={uploadFit} />;
    case 'diagonal':
      return <DiagonalFront t={t} data={data} uploadedImg={uploadedImg} uploadSize={uploadSize} uploadOffsetX={uploadOffsetX} uploadOffsetY={uploadOffsetY} uploadFit={uploadFit} />;
    default:
      return <SplitWaveFront t={t} data={data} uploadedImg={uploadedImg} uploadSize={uploadSize} uploadOffsetX={uploadOffsetX} uploadOffsetY={uploadOffsetY} uploadFit={uploadFit} />;
  }
}
