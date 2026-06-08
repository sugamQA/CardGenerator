import { useState } from 'react';
import './index.css';
import templates from './templates';
import CardRenderer from './components/CardRenderer';
import logoImg from './assets/logo.png';

const initialData = {
  name: 'PRITHVI BAHADUR SINGH',
  title: 'CEO',
  phone: '+977-9855061789',
  email: 'prithvi.singh@imperialfund.com.np',
  website: 'imperialfund.com.np',
  tagline: 'Smart Solutions, Trusted Growth',
  qrUrl: 'https://imperialfund.com.np/',
  backHeading: 'Imperial Innovation Fund',
  backSubheading: 'Smart Solutions, Trusted Growth',
  backAddress: 'Kathmandu, Nepal',
  backSocial: '@imperialfund'
};

function App() {
  const [data, setData] = useState(initialData);
  const [uploadedImg, setUploadedImg] = useState(null);
  const [uploadSize, setUploadSize] = useState(130);
  const [uploadOffsetX, setUploadOffsetX] = useState(0);
  const [uploadOffsetY, setUploadOffsetY] = useState(0);
  const [uploadFit, setUploadFit] = useState('contain');
  const [showBack, setShowBack] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(templates[0]);

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

        {/* Template Selector */}
        <div className="flex flex-wrap gap-3 mb-6 justify-center">
          {templates.map(t => (
            <button
              key={t.id}
              onClick={() => { setSelectedTemplate(t); setShowBack(false); }}
              className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                selectedTemplate.id === t.id
                  ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg shadow-pink-500/25'
                  : 'bg-white/10 border border-white/10 text-white/70 hover:bg-white/20 hover:text-white'
              }`}
            >
              {t.name}
            </button>
          ))}
        </div>

        {/* Size Preset + Export Controls */}
        <div className="flex items-center justify-center gap-4 mb-6 bg-white/5 rounded-2xl px-6 py-3 border border-white/5">
          <label className="text-white/50 text-[10px] font-semibold uppercase tracking-wider">Size</label>
          <div className="flex gap-2">
            {[
              { label: 'Standard', w: 85, h: 55 },
              { label: 'Square', w: 55, h: 55 },
              { label: 'Slim', w: 90, h: 50 },
              { label: 'Large', w: 100, h: 65 },
            ].map(p => (
              <button
                key={p.label}
                onClick={() => { setExportWidth(p.w); setExportHeight(p.h); }}
                className={`px-3 py-1.5 rounded-lg text-[11px] font-medium transition-all ${
                  exportWidth === p.w && exportHeight === p.h
                    ? 'bg-pink-500/30 text-pink-200'
                    : 'bg-white/5 text-white/50 hover:bg-white/10 hover:text-white/70'
                }`}
              >
                {p.label} {p.w}×{p.h}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-1.5 ml-2">
            <input type="number" value={exportWidth} onChange={(e)=>setExportWidth(Number(e.target.value))} className="w-14 px-2 py-1.5 rounded-lg bg-white/10 border border-white/10 text-white text-xs text-center focus:outline-none focus:border-pink-500/50" />
            <span className="text-white/30 text-[10px]">×</span>
            <input type="number" value={exportHeight} onChange={(e)=>setExportHeight(Number(e.target.value))} className="w-14 px-2 py-1.5 rounded-lg bg-white/10 border border-white/10 text-white text-xs text-center focus:outline-none focus:border-pink-500/50" />
            <span className="text-white/40 text-[10px] font-medium">mm</span>
          </div>
          <button
            onClick={exportPdf}
            className="px-5 py-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold rounded-xl shadow-lg shadow-pink-500/20 hover:shadow-xl hover:shadow-pink-500/30 text-xs tracking-wide transition-all"
          >
            Print / PDF
          </button>
        </div>

        {/* Card Preview */}
        <div className="flex flex-col items-center gap-4 mb-16">
          <div
            className="p-4 bg-white/5 backdrop-blur-xl rounded-2xl shadow-2xl print-card ring-1 ring-white/10 overflow-auto"
            style={{ display: 'flex', justifyContent: 'center' }}
          >
            <CardRenderer
              template={selectedTemplate}
              data={data}
              uploadedImg={uploadedImg}
              uploadSize={uploadSize}
              uploadOffsetX={uploadOffsetX}
              uploadOffsetY={uploadOffsetY}
              uploadFit={uploadFit}
              showBack={showBack}
              cardWidthMm={exportWidth}
              cardHeightMm={exportHeight}
            />
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

            {/* Back Content Section */}
            <div className="pt-4 mt-2 border-t border-white/10">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-1 h-5 bg-gradient-to-b from-pink-500 to-rose-500 rounded-full" />
                <h3 className="text-white/50 text-[10px] font-semibold uppercase tracking-[0.2em]">Back Content</h3>
              </div>

              <div className="space-y-5">
                <div className="group">
                  <label className="block text-white/60 text-[11px] font-semibold uppercase tracking-[0.15em] mb-2 group-focus-within:text-pink-400 transition-colors duration-200">Back Heading</label>
                  <input
                    type="text"
                    value={data.backHeading}
                    onChange={(e) => handleChange('backHeading', e.target.value)}
                    className="w-full px-5 py-3.5 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-white/20 text-sm focus:outline-none focus:border-pink-500/60 focus:bg-white/[0.08] focus:ring-4 focus:ring-pink-500/10 group-focus-within:shadow-lg group-focus-within:shadow-pink-500/5 transition-all duration-300"
                  />
                </div>

                <div className="group">
                  <label className="block text-white/60 text-[11px] font-semibold uppercase tracking-[0.15em] mb-2 group-focus-within:text-pink-400 transition-colors duration-200">Back Subheading</label>
                  <input
                    type="text"
                    value={data.backSubheading}
                    onChange={(e) => handleChange('backSubheading', e.target.value)}
                    className="w-full px-5 py-3.5 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-white/20 text-sm focus:outline-none focus:border-pink-500/60 focus:bg-white/[0.08] focus:ring-4 focus:ring-pink-500/10 group-focus-within:shadow-lg group-focus-within:shadow-pink-500/5 transition-all duration-300"
                  />
                </div>

                <div className="group">
                  <label className="block text-white/60 text-[11px] font-semibold uppercase tracking-[0.15em] mb-2 group-focus-within:text-pink-400 transition-colors duration-200">Address</label>
                  <input
                    type="text"
                    value={data.backAddress}
                    onChange={(e) => handleChange('backAddress', e.target.value)}
                    className="w-full px-5 py-3.5 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-white/20 text-sm focus:outline-none focus:border-pink-500/60 focus:bg-white/[0.08] focus:ring-4 focus:ring-pink-500/10 group-focus-within:shadow-lg group-focus-within:shadow-pink-500/5 transition-all duration-300"
                  />
                </div>

                <div className="group">
                  <label className="block text-white/60 text-[11px] font-semibold uppercase tracking-[0.15em] mb-2 group-focus-within:text-pink-400 transition-colors duration-200">Social Handle</label>
                  <input
                    type="text"
                    value={data.backSocial}
                    onChange={(e) => handleChange('backSocial', e.target.value)}
                    className="w-full px-5 py-3.5 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-white/20 text-sm focus:outline-none focus:border-pink-500/60 focus:bg-white/[0.08] focus:ring-4 focus:ring-pink-500/10 group-focus-within:shadow-lg group-focus-within:shadow-pink-500/5 transition-all duration-300"
                  />
                </div>
              </div>
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

        </div>
      </div>
    </div>
  );
}

export default App;