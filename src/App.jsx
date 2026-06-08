import { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import './index.css';
import logoImg from './assets/logo.png';

const initialData = {
  name: 'PRITHVI BAHADUR SINGH',
  title: 'CEO',
  phone: '+977-9855061789',
  email: 'prithvi.singh@imperialfund.com.np',
  website: 'imperialfund.com.np',
  tagline: 'Smart Solutions, Trusted Growth',
  qrUrl: 'https://imperialfund.com.np/'
};

function App() {
  const [data, setData] = useState(initialData);
  const [uploadedImg, setUploadedImg] = useState(null);
  const [uploadSize, setUploadSize] = useState(130);
  const [uploadOffsetX, setUploadOffsetX] = useState(0);
  const [uploadOffsetY, setUploadOffsetY] = useState(0);
  const [uploadFit, setUploadFit] = useState('contain');
  const [showBack, setShowBack] = useState(false);

  const [exportWidth, setExportWidth] = useState(85); // mm
  const [exportHeight, setExportHeight] = useState(55); // mm

  const handleUpload = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(ev) {
      const dataUrl = ev.target.result;
      if (uploadedImg && uploadedImg.startsWith('blob:')) URL.revokeObjectURL(uploadedImg);
      setUploadedImg(dataUrl);
    };
    reader.readAsDataURL(file);
  };

  const removeUpload = () => {
    if (uploadedImg) {
      URL.revokeObjectURL(uploadedImg);
      setUploadedImg(null);
    }
  };

  const exportPdf = () => {
    const cardEl = document.querySelector('.print-card .shadow-xl');
    if (!cardEl) return window.print();

    const styles = Array.from(document.querySelectorAll('link[rel="stylesheet"], style'))
      .map(n => n.outerHTML).join('\n');

    const width = exportWidth;
    const height = exportHeight;

    const html = `<!doctype html><html><head><meta charset="utf-8"><title>Export</title>${styles}
      <base href="${document.baseURI}">
      <style>
        @page{ size: ${width}mm ${height}mm; margin:0 }
        html,body{ margin:0; padding:0 }
        .card-wrap{ width: ${width}mm; height: ${height}mm; overflow:hidden; }
        *{ -webkit-print-color-adjust: exact; print-color-adjust: exact; }
      </style>
    </head><body><div class="card-wrap">${cardEl.outerHTML}</div>
    <script>
      window.onload = function(){
        setTimeout(function(){ window.print(); }, 800);
        window.onafterprint = function(){ window.close(); };
      }
    </script></body></html>`;

    const w = window.open('', '_blank');
    if (!w) return alert('Please allow popups to export PDF');
    w.document.write(html);
    w.document.close();
  };

  const handleChange = (field, value) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 no-print">
      <div className="w-full max-w-2xl mx-auto px-4 py-12">
        <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-rose-400 text-4xl font-bold text-center mb-12 tracking-tight">
          Business Card
        </h1>

        {/* Card Preview */}
        <div className="flex flex-col items-center gap-4 mb-16">
          <div className="p-4 bg-white/5 backdrop-blur-xl rounded-2xl shadow-2xl print-card ring-1 ring-white/10">
            {!showBack ? (
              <div
                className="w-[570px] h-[310px] overflow-visible relative shadow-xl rounded-lg"
                style={{ background: 'white', WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact' }}
              >
                <div
                  className="absolute left-0 top-0 w-[260px] h-full flex items-center justify-center rounded-l-lg"
                  style={{ background: 'linear-gradient(135deg, #1b4d7a 0%, #2e5a8c 45%, #c41e3a 100%)', WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact', overflow: 'hidden' }}
                >
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 260 310" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{stopColor: '#2e5a8c', stopOpacity: 1}} />
                        <stop offset="45%" style={{stopColor: '#1b4d7a', stopOpacity: 1}} />
                        <stop offset="75%" style={{stopColor: '#8b2b3a', stopOpacity: 1}} />
                        <stop offset="100%" style={{stopColor: '#c41e3a', stopOpacity: 1}} />
                      </linearGradient>
                    </defs>
                    <path d="M 160 0 Q 220 80 200 155 Q 180 230 160 310" fill="none" stroke="url(#waveGradient)" strokeWidth="60" strokeLinecap="round" />
                    <path d="M 190 0 Q 240 100 220 155 Q 200 210 190 310" fill="none" stroke="rgba(196,30,58,0.45)" strokeWidth="35" strokeLinecap="round" opacity="0.6" />
                    <path d="M 210 0 Q 260 100 240 155 Q 220 210 210 310" fill="none" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="12" strokeLinecap="round" />
                  </svg>

                  <div className="absolute left-[35px] top-[50%] -translate-y-1/2 z-20 flex flex-col items-center">
                    <div style={{width: '128px', height: '128px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                      <div style={{background: '#c41e3a', width: '116px', height: '116px', borderRadius: '9999px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 20px rgba(0,0,0,0.35)'}}>
                        <div style={{background: 'white', padding: '10px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                          <QRCodeSVG value={data.qrUrl} size={92} fgColor="#1b4d7a" bgColor="white" level="M" />
                        </div>
                      </div>
                    </div>
                    <div className="mt-2 text-white/90 text-[11px] font-semibold" style={{letterSpacing: '0.4px'}}>Scan Me</div>
                  </div>
                  <div className="absolute left-0 bottom-0 w-[80px] h-[18px]" style={{ background: '#c41e3a', WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact' }} />
                </div>

                <div className="absolute right-0 top-0 w-[310px] h-full flex flex-col items-center justify-start p-[20px]" style={{ background: 'white', WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact' }}>
                  <h1 className="text-center text-[18px] leading-[1.05] mb-[8px] w-full" style={{ WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact', letterSpacing: '0.2px', marginTop: '18px', fontWeight: 900, whiteSpace: 'nowrap', overflow: 'hidden' }}>
                    <span style={{ color: '#1b4d7a', fontWeight: 900 }}>Imperial</span>
                    <span style={{ color: '#c41e3a', marginLeft: '10px', fontWeight: 800 }}>Innovation Fund Limited</span>
                  </h1>
                  <img src={uploadedImg || logoImg} alt="Logo" className="mb-[12px] mt-[5px]" style={{ width: `${uploadSize}px`, height: `${uploadSize}px`, objectFit: uploadFit, transform: `translate(${uploadOffsetX}px, ${uploadOffsetY}px)`, transition: 'transform 120ms linear, width 120ms linear, height 120ms linear', WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact' }} />
                  <div className="flex items-stretch gap-0 w-full mb-[12px]">
                    <div className="flex-1 py-[6px] px-[12px] text-center text-white text-[9px] font-semibold flex items-center justify-center" style={{ background: '#c41e3a', WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact' }}>{data.website}</div>
                    <div className="w-[25px] h-auto min-h-[24px]" style={{ background: '#1b4d7a', WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact' }} />
                  </div>
                  <div className="flex-1 flex items-center justify-center">
                    <div className="w-full text-center pb-[14px]">
                      <div className="text-[16px] font-bold" style={{ color: '#1a1a1a' }}>{data.name}</div>
                      <div className="text-[12px] font-semibold mt-[6px]" style={{ color: '#c41e3a' }}>{data.title}</div>
                      <div className="mt-[12px] text-[11px]" style={{ color: '#666666' }}>
                        <div>{data.email}</div>
                        <div className="mt-[4px]">{data.phone}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div
                className="w-[570px] h-[310px] overflow-hidden relative shadow-xl rounded-lg flex flex-col items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #1b4d7a 0%, #162d4a 50%, #8b2b3a 100%)', WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact' }}
              >
                {/* Decorative diamond pattern */}
                <svg className="absolute inset-0 w-full h-full opacity-[0.06]" viewBox="0 0 570 310" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="diamond" width="60" height="60" patternUnits="userSpaceOnUse">
                      <rect width="60" height="60" fill="none" />
                      <path d="M30 0 L60 30 L30 60 L0 30 Z" fill="white" stroke="none" />
                    </pattern>
                  </defs>
                  <rect width="570" height="310" fill="url(#diamond)" />
                </svg>

                {/* Top red accent line */}
                <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: 'linear-gradient(90deg, #c41e3a, #e8506a, #c41e3a)' }} />

                {/* Center content */}
                <div className="relative z-10 flex flex-col items-center px-16">
                  <div className="w-20 h-20 rounded-2xl bg-white/10 backdrop-blur flex items-center justify-center mb-5 ring-1 ring-white/20">
                    <img src={uploadedImg || logoImg} alt="Logo" className="w-14 h-14 object-contain" style={{ WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact' }} />
                  </div>

                  <h2 className="text-white text-center text-[20px] font-bold tracking-[0.3px] leading-tight" style={{ WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact' }}>
                    Imperial Innovation Fund Limited
                  </h2>

                  <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-pink-400 to-transparent my-4" />

                  <p className="text-white/60 text-center text-[11px] font-medium tracking-[0.15em] uppercase" style={{ WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact' }}>
                    {data.tagline}
                  </p>
                </div>

                {/* Bottom bar */}
                <div className="absolute bottom-0 left-0 right-0 h-[2px]" style={{ background: 'linear-gradient(90deg, transparent, #c41e3a, transparent)' }} />

                {/* Corner accents */}
                <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-white/10 rounded-tr" />
                <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-white/10 rounded-bl" />
              </div>
            )}
          </div>

          {/* Flip toggle */}
          <button
            onClick={() => setShowBack(!showBack)}
            className="px-6 py-2.5 rounded-xl bg-white/10 border border-white/10 text-white/70 text-sm font-medium hover:bg-white/20 hover:text-white transition-all duration-200"
          >
            {showBack ? 'Show Front' : 'Show Back'}
          </button>
        </div>

        {/* Editor Form */}
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl no-print">
          <div className="flex items-center gap-3 mb-8 pb-4 border-b border-white/10">
            <div className="w-1.5 h-7 bg-gradient-to-b from-pink-500 to-rose-500 rounded-full" />
            <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70 text-xl font-bold tracking-tight">Edit Your Card</h2>
          </div>

          <div className="max-w-lg mx-auto space-y-6">
            {/* Logo Upload */}
            <div className="mb-2">
              <label className="block text-white/60 text-[11px] font-semibold uppercase tracking-[0.15em] mb-3 group-focus-within:text-pink-400 transition-colors duration-200">Card Logo</label>
              <div className="flex items-center gap-5 p-4 rounded-2xl bg-white/5 border border-white/10">
                <div className="w-16 h-16 rounded-xl bg-white/10 flex items-center justify-center overflow-hidden shrink-0 ring-1 ring-white/10">
                  {uploadedImg ? (
                    <img src={uploadedImg} alt="Logo" className="w-full h-full object-contain" />
                  ) : (
                    <img src={logoImg} alt="Logo" className="w-full h-full object-contain" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <input
                    type="file"
                    accept="image/png, image/jpeg"
                    onChange={handleUpload}
                    className="w-full text-xs text-white/50 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-gradient-to-r file:from-pink-500/30 file:to-rose-500/30 file:text-pink-200 file:cursor-pointer hover:file:from-pink-500/40 hover:file:to-rose-500/40 file:transition-all duration-300 cursor-pointer"
                  />
                  {uploadedImg && (
                    <button onClick={removeUpload} className="mt-2 text-[11px] text-red-400/70 hover:text-red-400 transition-colors">
                      Remove logo
                    </button>
                  )}
                </div>
              </div>

              {uploadedImg && (
                <div className="mt-3 p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                  <div className="flex items-center justify-center gap-3">
                    <label className="text-white/50 text-[10px] font-medium w-6">Size</label>
                    <input type="range" min="40" max="220" value={uploadSize} onChange={(e)=>setUploadSize(Number(e.target.value))} className="flex-1 max-w-[180px] accent-pink-500" />
                    <span className="text-white/70 text-[11px] w-10 text-right font-mono">{uploadSize}px</span>
                  </div>
                  <div className="flex items-center justify-center gap-3">
                    <label className="text-white/50 text-[10px] font-medium w-6">X</label>
                    <input type="range" min="-80" max="80" value={uploadOffsetX} onChange={(e)=>setUploadOffsetX(Number(e.target.value))} className="flex-1 max-w-[180px] accent-pink-500" />
                    <span className="text-white/70 text-[11px] w-10 text-right font-mono">{uploadOffsetX}</span>
                  </div>
                  <div className="flex items-center justify-center gap-3">
                    <label className="text-white/50 text-[10px] font-medium w-6">Y</label>
                    <input type="range" min="-80" max="80" value={uploadOffsetY} onChange={(e)=>setUploadOffsetY(Number(e.target.value))} className="flex-1 max-w-[180px] accent-pink-500" />
                    <span className="text-white/70 text-[11px] w-10 text-right font-mono">{uploadOffsetY}</span>
                  </div>
                  <div className="flex items-center justify-center gap-3">
                    <label className="text-white/50 text-[10px] font-medium w-6">Fit</label>
                    <select value={uploadFit} onChange={(e)=>setUploadFit(e.target.value)} className="px-3 py-1.5 rounded-lg bg-white/10 border border-white/10 text-white/80 text-[11px] focus:outline-none focus:border-pink-500/50">
                      <option value="contain">Contain</option>
                      <option value="cover">Cover</option>
                    </select>
                  </div>
                </div>
              )}
            </div>

            <div className="group">
              <label className="block text-white/60 text-[11px] font-semibold uppercase tracking-[0.15em] mb-2 group-focus-within:text-pink-400 transition-colors duration-200">Full Name</label>
              <input
                type="text"
                value={data.name}
                onChange={(e) => handleChange('name', e.target.value)}
                className="w-full px-5 py-3.5 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-white/20 text-sm focus:outline-none focus:border-pink-500/60 focus:bg-white/[0.08] focus:ring-4 focus:ring-pink-500/10 group-focus-within:shadow-lg group-focus-within:shadow-pink-500/5 transition-all duration-300"
              />
            </div>

            <div className="group">
              <label className="block text-white/60 text-[11px] font-semibold uppercase tracking-[0.15em] mb-2 group-focus-within:text-pink-400 transition-colors duration-200">Designation</label>
              <input
                type="text"
                value={data.title}
                onChange={(e) => handleChange('title', e.target.value)}
                className="w-full px-5 py-3.5 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-white/20 text-sm focus:outline-none focus:border-pink-500/60 focus:bg-white/[0.08] focus:ring-4 focus:ring-pink-500/10 group-focus-within:shadow-lg group-focus-within:shadow-pink-500/5 transition-all duration-300"
              />
            </div>

            <div className="group">
              <label className="block text-white/60 text-[11px] font-semibold uppercase tracking-[0.15em] mb-2 group-focus-within:text-pink-400 transition-colors duration-200">Phone</label>
              <input
                type="text"
                value={data.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                className="w-full px-5 py-3.5 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-white/20 text-sm focus:outline-none focus:border-pink-500/60 focus:bg-white/[0.08] focus:ring-4 focus:ring-pink-500/10 group-focus-within:shadow-lg group-focus-within:shadow-pink-500/5 transition-all duration-300"
              />
            </div>

            <div className="group">
              <label className="block text-white/60 text-[11px] font-semibold uppercase tracking-[0.15em] mb-2 group-focus-within:text-pink-400 transition-colors duration-200">Email</label>
              <input
                type="text"
                value={data.email}
                onChange={(e) => handleChange('email', e.target.value)}
                className="w-full px-5 py-3.5 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-white/20 text-sm focus:outline-none focus:border-pink-500/60 focus:bg-white/[0.08] focus:ring-4 focus:ring-pink-500/10 group-focus-within:shadow-lg group-focus-within:shadow-pink-500/5 transition-all duration-300"
              />
            </div>

            <div className="group">
              <label className="block text-white/60 text-[11px] font-semibold uppercase tracking-[0.15em] mb-2 group-focus-within:text-pink-400 transition-colors duration-200">Website</label>
              <input
                type="text"
                value={data.website}
                onChange={(e) => handleChange('website', e.target.value)}
                className="w-full px-5 py-3.5 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-white/20 text-sm focus:outline-none focus:border-pink-500/60 focus:bg-white/[0.08] focus:ring-4 focus:ring-pink-500/10 group-focus-within:shadow-lg group-focus-within:shadow-pink-500/5 transition-all duration-300"
              />
            </div>

            <div className="group">
              <label className="block text-white/60 text-[11px] font-semibold uppercase tracking-[0.15em] mb-2 group-focus-within:text-pink-400 transition-colors duration-200">Tagline</label>
              <input
                type="text"
                value={data.tagline}
                onChange={(e) => handleChange('tagline', e.target.value)}
                className="w-full px-5 py-3.5 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-white/20 text-sm focus:outline-none focus:border-pink-500/60 focus:bg-white/[0.08] focus:ring-4 focus:ring-pink-500/10 group-focus-within:shadow-lg group-focus-within:shadow-pink-500/5 transition-all duration-300"
              />
            </div>

            <div className="group">
              <label className="block text-white/60 text-[11px] font-semibold uppercase tracking-[0.15em] mb-2 group-focus-within:text-pink-400 transition-colors duration-200">QR Code URL</label>
              <input
                type="text"
                value={data.qrUrl}
                onChange={(e) => handleChange('qrUrl', e.target.value)}
                className="w-full px-5 py-3.5 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-white/20 text-sm focus:outline-none focus:border-pink-500/60 focus:bg-white/[0.08] focus:ring-4 focus:ring-pink-500/10 group-focus-within:shadow-lg group-focus-within:shadow-pink-500/5 transition-all duration-300"
              />
            </div>

          </div>

          <div className="mt-8 pt-6 border-t border-white/10 flex flex-col items-center gap-5">
            <div className="flex items-center gap-4 bg-white/5 rounded-2xl px-6 py-4 border border-white/5">
              <label className="text-white/50 text-xs font-semibold uppercase tracking-wider">Width</label>
              <div className="flex items-center gap-1.5">
                <input type="number" value={exportWidth} onChange={(e)=>setExportWidth(Number(e.target.value))} className="w-20 px-3 py-2.5 rounded-xl bg-white/10 border border-white/10 text-white text-sm text-center focus:outline-none focus:border-pink-500/50 focus:ring-2 focus:ring-pink-500/10 transition-all duration-200" />
                <span className="text-white/40 text-xs font-medium">mm</span>
              </div>
              <label className="text-white/50 text-xs font-semibold uppercase tracking-wider">Height</label>
              <div className="flex items-center gap-1.5">
                <input type="number" value={exportHeight} onChange={(e)=>setExportHeight(Number(e.target.value))} className="w-20 px-3 py-2.5 rounded-xl bg-white/10 border border-white/10 text-white text-sm text-center focus:outline-none focus:border-pink-500/50 focus:ring-2 focus:ring-pink-500/10 transition-all duration-200" />
                <span className="text-white/40 text-xs font-medium">mm</span>
              </div>
            </div>
            <button
              onClick={exportPdf}
              className="w-full max-w-sm px-10 py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold rounded-2xl shadow-lg shadow-pink-500/20 hover:shadow-xl hover:shadow-pink-500/30 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 text-sm tracking-wide"
            >
              Print / Save PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;