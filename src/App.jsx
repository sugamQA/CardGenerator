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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8">
      <h1 className="text-white text-3xl font-bold text-center mb-8 no-print">Imperial Innovation Fund Limited - Business Card Editor</h1>
      
      <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-8 items-start justify-center">
        {/* Editor Panel */}
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 w-full max-w-md border border-white/20 no-print">
          <h2 className="text-white text-xl font-semibold mb-6 pb-2 border-b border-white/20">Edit Your Card</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-white/80 text-sm mb-1.5">Full Name</label>
              <input
                type="text"
                value={data.name}
                onChange={(e) => handleChange('name', e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:bg-white/20 transition"
              />
            </div>
            
            <div>
              <label className="block text-white/80 text-sm mb-1.5">Designation</label>
              <input
                type="text"
                value={data.title}
                onChange={(e) => handleChange('title', e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:bg-white/20 transition"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-white/80 text-sm mb-1.5">Phone</label>
                <input
                  type="text"
                  value={data.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:bg-white/20 transition"
                />
              </div>
              <div>
                <label className="block text-white/80 text-sm mb-1.5">Email</label>
                <input
                  type="text"
                  value={data.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:bg-white/20 transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-white/80 text-sm mb-1.5">Website</label>
              <input
                type="text"
                value={data.website}
                onChange={(e) => handleChange('website', e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:bg-white/20 transition"
              />
            </div>

            <div>
              <label className="block text-white/80 text-sm mb-1.5">Tagline</label>
              <input
                type="text"
                value={data.tagline}
                onChange={(e) => handleChange('tagline', e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:bg-white/20 transition"
              />
            </div>

            <div>
              <label className="block text-white/80 text-sm mb-1.5">QR Code URL</label>
              <input
                type="text"
                value={data.qrUrl}
                onChange={(e) => handleChange('qrUrl', e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:bg-white/20 transition"
              />
            </div>

            <div>
              <label className="block text-white/80 text-sm mb-1.5">Upload Image (PNG / JPEG)</label>
              <input
                type="file"
                accept="image/png, image/jpeg"
                onChange={handleUpload}
                className="w-full text-sm text-white/80"
              />

              {uploadedImg && (
                <div className="mt-3 space-y-2 text-white/80">
                  <div className="flex items-center gap-2">
                    <label className="text-sm">Size</label>
                    <input type="range" min="40" max="220" value={uploadSize} onChange={(e)=>setUploadSize(Number(e.target.value))} />
                    <span className="w-12 text-right">{uploadSize}px</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="text-sm">X offset</label>
                    <input type="range" min="-80" max="80" value={uploadOffsetX} onChange={(e)=>setUploadOffsetX(Number(e.target.value))} />
                    <span className="w-12 text-right">{uploadOffsetX}px</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="text-sm">Y offset</label>
                    <input type="range" min="-80" max="80" value={uploadOffsetY} onChange={(e)=>setUploadOffsetY(Number(e.target.value))} />
                    <span className="w-12 text-right">{uploadOffsetY}px</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="text-sm">Fit</label>
                    <select value={uploadFit} onChange={(e)=>setUploadFit(e.target.value)} className="bg-white/10 text-white px-2 py-1 rounded">
                      <option value="contain">Contain</option>
                      <option value="cover">Cover</option>
                    </select>
                    <button onClick={removeUpload} className="ml-auto px-3 py-1 bg-red-600 text-white rounded">Remove</button>
                  </div>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3 items-end">
              <div className="flex items-center gap-2">
                <label className="text-white/80 text-sm">Width (mm)</label>
                <input type="number" value={exportWidth} onChange={(e)=>setExportWidth(Number(e.target.value))} className="w-20 px-2 py-1 rounded bg-white/10 text-white" />
                <label className="text-white/80 text-sm ml-2">Height (mm)</label>
                <input type="number" value={exportHeight} onChange={(e)=>setExportHeight(Number(e.target.value))} className="w-20 px-2 py-1 rounded bg-white/10 text-white" />
              </div>
              <button
                onClick={exportPdf}
                className="w-full px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-pink-500/30 transition-transform hover:-translate-y-0.5"
              >
                Print / Save PDF
              </button>
            </div>
          </div>
        </div>

        {/* Card Preview */}
        <div className="p-4 bg-slate-800/50 rounded-2xl shadow-2xl print-card">
          <div 
            className="w-[570px] h-[310px] overflow-visible relative shadow-xl"
            style={{ 
              background: 'white',
              WebkitPrintColorAdjust: 'exact',
              printColorAdjust: 'exact'
            }}
          >
            {/* Left Dark Section with Wave */}
            <div 
              className="absolute left-0 top-0 w-[260px] h-full flex items-center justify-center"
              style={{ 
                background: 'linear-gradient(135deg, #1b4d7a 0%, #2e5a8c 45%, #c41e3a 100%)',
                WebkitPrintColorAdjust: 'exact',
                printColorAdjust: 'exact',
                overflow: 'hidden'
              }}
            >
              {/* Curved wave background */}
              <svg 
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 260 310" 
                preserveAspectRatio="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style={{stopColor: '#2e5a8c', stopOpacity: 1}} />
                      <stop offset="45%" style={{stopColor: '#1b4d7a', stopOpacity: 1}} />
                      <stop offset="75%" style={{stopColor: '#8b2b3a', stopOpacity: 1}} />
                      <stop offset="100%" style={{stopColor: '#c41e3a', stopOpacity: 1}} />
                  </linearGradient>
                </defs>
                
                {/* Main curved wave shape */}
                <path 
                  d="M 160 0 Q 220 80 200 155 Q 180 230 160 310" 
                  fill="none" 
                  stroke="url(#waveGradient)" 
                  strokeWidth="60"
                  strokeLinecap="round"
                />
                
                {/* Second wave layer */}
                <path 
                  d="M 190 0 Q 240 100 220 155 Q 200 210 190 310" 
                  fill="none" 
                  stroke="rgba(196,30,58,0.45)" 
                  strokeWidth="35"
                  strokeLinecap="round"
                  opacity="0.6"
                />
                
                {/* White accent curve */}
                <path 
                  d="M 210 0 Q 260 100 240 155 Q 220 210 210 310" 
                  fill="none" 
                  stroke="rgba(255, 255, 255, 0.2)" 
                  strokeWidth="12"
                  strokeLinecap="round"
                />
              </svg>

              {/* QR Code - enhanced design */}
              <div className="absolute left-[35px] top-[50%] transform -translate-y-1/2 z-20 flex flex-col items-center" style={{WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact'}}>
                <div style={{width: '128px', height: '128px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                  <div style={{background: '#c41e3a', width: '116px', height: '116px', borderRadius: '9999px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 20px rgba(0,0,0,0.35)'}}>
                    <div style={{background: 'white', padding: '10px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                      <QRCodeSVG
                        value={data.qrUrl}
                        size={92}
                        fgColor="#1b4d7a"
                        bgColor="white"
                        level="M"
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-2 text-white/90 text-[11px] font-semibold" style={{letterSpacing: '0.4px'}}>Scan Me</div>
              </div>

              {/* Red Bar at bottom left */}
              <div 
                className="absolute left-0 bottom-0 w-[80px] h-[18px]"
                style={{ 
                  background: '#c41e3a',
                  WebkitPrintColorAdjust: 'exact',
                  printColorAdjust: 'exact'
                }}
              />
            </div>

            {/* Right White Section */}
            <div 
              className="absolute right-0 top-0 w-[310px] h-full flex flex-col items-center justify-start p-[20px]"
              style={{ 
                background: 'white',
                WebkitPrintColorAdjust: 'exact',
                printColorAdjust: 'exact'
              }}
            >
              {/* Main Heading in Blue */}
              <h1 
                className="text-center text-[18px] leading-[1.05] mb-[8px] w-full"
                style={{
                  WebkitPrintColorAdjust: 'exact',
                  printColorAdjust: 'exact',
                  letterSpacing: '0.2px',
                  marginTop: '18px',
                  fontWeight: 900,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden'
                }}
              >
                <span style={{ color: '#1b4d7a', fontWeight: 900 }}>Imperial</span>
                <span style={{ color: '#c41e3a', marginLeft: '10px', fontWeight: 800 }}>Innovation Fund Limited</span>
              </h1>

              {/* Logo at top - larger and more visible */}
              <img 
                src={uploadedImg || logoImg}
                alt="Imperial Innovation Fund Logo"
                className="mb-[12px] mt-[5px]"
                style={{
                  width: `${uploadSize}px`,
                  height: `${uploadSize}px`,
                  objectFit: uploadFit,
                  transform: `translate(${uploadOffsetX}px, ${uploadOffsetY}px)`,
                  transition: 'transform 120ms linear, width 120ms linear, height 120ms linear',
                  WebkitPrintColorAdjust: 'exact',
                  printColorAdjust: 'exact'
                }}
              />

              {/* Website Banner */}
              <div className="flex items-stretch gap-0 w-full mb-[12px]">
                <div 
                  className="flex-1 py-[6px] px-[12px] text-center text-white text-[9px] font-semibold flex items-center justify-center"
                  style={{ 
                    background: '#c41e3a',
                    WebkitPrintColorAdjust: 'exact',
                    printColorAdjust: 'exact'
                  }}
                >
                  {data.website}
                </div>
                <div 
                  className="w-[25px] h-auto min-h-[24px]"
                  style={{ 
                    background: '#1b4d7a',
                    WebkitPrintColorAdjust: 'exact',
                    printColorAdjust: 'exact'
                  }}
                />
              </div>

              {/* Centered contact block (name, designation, email, phone) */}
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
        </div>
      </div>
    </div>
  );
}

export default App;