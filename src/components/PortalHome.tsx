import React, { useState } from 'react';
import { 
  AppId, 
  UserProfile, 
  SpklRecord, 
  IrGrRecord, 
  SolarRecord, 
  MinMaxItem, 
  ArsipRecord,
  ExternalAppSettings 
} from '../types';
import { 
  FileText, 
  Boxes, 
  Fuel, 
  BarChart3, 
  Archive, 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  ShieldCheck, 
  Search,
  ExternalLink,
  Layers,
  Sparkles,
  TrendingUp,
  FileCheck2,
  HardDrive,
  Server,
  Globe,
  ArrowUpRight,
  SlidersHorizontal
} from 'lucide-react';

import { PortalAnalyticsDashboard } from './PortalAnalyticsDashboard';

interface PortalHomeProps {
  onSelectApp: (app: AppId) => void;
  currentUser: UserProfile;
  spklList: SpklRecord[];
  irgrList: IrGrRecord[];
  solarList: SolarRecord[];
  minmaxList: MinMaxItem[];
  arsipList: ArsipRecord[];
  externalSettings: ExternalAppSettings;
  onOpenSettings: () => void;
}

export const PortalHome: React.FC<PortalHomeProps> = ({
  onSelectApp,
  currentUser,
  spklList,
  irgrList,
  solarList,
  minmaxList,
  arsipList,
  externalSettings,
  onOpenSettings
}) => {
  const [globalSearch, setGlobalSearch] = useState('');

  // Calculate live stats
  const pendingSpkl = spklList.filter(s => s.statusApproval === 'Pending').length;
  const approvedJamTotal = spklList
    .filter(s => s.statusApproval === 'Disetujui')
    .reduce((sum, s) => sum + s.jumlahJam, 0);

  const pendingIrGr = irgrList.filter(i => i.statusGr === 'Pending GR').length;
  const totalPoActive = irgrList.length;

  const totalSolarBulanIni = solarList.reduce((sum, s) => sum + s.volumeFisikDiterimaLiter, 0);

  const criticalStockItems = minmaxList.filter(m => m.stokFisik <= m.minStock);

  const totalArsip = arsipList.length;

  const apps = [
    {
      id: 'spkl' as AppId,
      number: '01',
      title: 'Aplikasi SPKL (Surat Perintah Kerja Lembur)',
      subtitle: 'Pengajuan Lembur, Persetujuan Manager, Cetak PDF Kolektif & Bulanan Karyawan',
      serverPlatform: 'PythonAnywhere' as const,
      deployedUrl: externalSettings.spklUrl || 'https://spklembur.pythonanywhere.com/',
      icon: <FileText className="w-8 h-8 text-amber-400" />,
      badge: pendingSpkl > 0 ? `${pendingSpkl} Butuh Approval` : 'Normal',
      badgeColor: pendingSpkl > 0 ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
      bgColor: 'from-amber-950/40 via-slate-900 to-slate-900',
      borderColor: 'hover:border-amber-500/50',
      buttonBg: 'bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-slate-950',
      stats: [
        { label: 'Pending Approval', value: `${pendingSpkl} Berkas` },
        { label: 'Total Jam Disetujui', value: `${approvedJamTotal.toFixed(0)} Jam` },
        { label: 'Total SPKL Dibuat', value: `${spklList.length} Transaksi` },
      ],
      features: [
        'Input lembur shift & reguler dengan kalkulasi jam otomatis',
        'Persetujuan langsung oleh Manager (Hamdi Ayussa / Yan Tanamal)',
        'Cetak SPKL Kolektif resmi & Rekapitulasi per nama tanpa batasan',
        'Integrasi notifikasi WhatsApp Manager dengan 1-klik',
      ]
    },
    {
      id: 'irgr' as AppId,
      number: '02',
      title: 'Aplikasi ERP Monitoring IR - GR',
      subtitle: 'Pelacakan Status Inspection Report (QC) hingga Penerimaan SAP MIGO (GR)',
      serverPlatform: 'Streamlit' as const,
      deployedUrl: externalSettings.irgrUrl || 'https://monitoringirgrpenerimaan-ptsemenpadang.streamlit.app/',
      icon: <Boxes className="w-8 h-8 text-cyan-400" />,
      badge: `${pendingIrGr} Menunggu GR`,
      badgeColor: pendingIrGr > 0 ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40' : 'bg-slate-700 text-slate-300',
      bgColor: 'from-cyan-950/40 via-slate-900 to-slate-900',
      borderColor: 'hover:border-cyan-500/50',
      buttonBg: 'bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 text-slate-950',
      stats: [
        { label: 'PO Masuk Dimonitor', value: `${totalPoActive} PO` },
        { label: 'Pending GR SAP', value: `${pendingIrGr} Dokumen` },
        { label: 'Tingkat Keberhasilan QC', value: '95%' },
      ],
      features: [
        'Sinkronisasi alur nomor PO pengadaan suku cadang & barang',
        'Status inspeksi tim Quality Control (QC) penerimaan fisik',
        'Pelacakan nomor dokumen MIGO Good Receipt (GR)',
        'Grafik tren waktu penyelesaian dari IR menuju GR',
      ]
    },
    {
      id: 'solar' as AppId,
      number: '03',
      title: 'Aplikasi Penerimaan Solar BBM Industri',
      subtitle: 'Kalibrasi Sounding Tangki, Validasi Densitas & Berita Acara Penerimaan (BAP)',
      serverPlatform: 'PythonAnywhere' as const,
      deployedUrl: externalSettings.solarUrl || 'https://penerimaansolar.pythonanywhere.com/',
      icon: <Fuel className="w-8 h-8 text-emerald-400" />,
      badge: 'Tangki 01: 78%',
      badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
      bgColor: 'from-emerald-950/40 via-slate-900 to-slate-900',
      borderColor: 'hover:border-emerald-500/50',
      buttonBg: 'bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-slate-950',
      stats: [
        { label: 'Penerimaan Bulan Ini', value: `${(totalSolarBulanIni / 1000).toFixed(1)}k Liter` },
        { label: 'Densitas Rata-rata', value: '0.835 kg/L' },
        { label: 'Akurasi Pengukuran', value: '99.8%' },
      ],
      features: [
        'Kalkulator sounding tinggi cairan vs volume liter akurat',
        'Pengecekan selisih DO Pertamina vs volume fisik aktual',
        'Cetak Berita Acara Penerimaan (BAP) solar resmi',
        'Pencatatan nomor polisi truk, sopir & vendor transporter',
      ]
    },
    {
      id: 'minmax' as AppId,
      number: '04',
      title: 'Aplikasi MIN - MAX Stock Level Warehouse',
      subtitle: 'Pencegahan Kehabisan Stok Suku Cadang Kritis, Reorder Point & Safety Stock',
      serverPlatform: 'GitHub Pages' as const,
      deployedUrl: externalSettings.minmaxUrl || 'https://karajoyes-debug.github.io/min-max-stock-level-warehouse-pt-semen-padang/',
      icon: <BarChart3 className="w-8 h-8 text-purple-400" />,
      badge: `${criticalStockItems.length} Stok Kritis`,
      badgeColor: criticalStockItems.length > 0 ? 'bg-rose-500/20 text-rose-300 border-rose-500/40' : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
      bgColor: 'from-purple-950/40 via-slate-900 to-slate-900',
      borderColor: 'hover:border-purple-500/50',
      buttonBg: 'bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-slate-950',
      stats: [
        { label: 'Total Item Dipantau', value: `${minmaxList.length} Item` },
        { label: 'Di Bawah Minimum', value: `${criticalStockItems.length} Part` },
        { label: 'Safety Stock Ratio', value: '88%' },
      ],
      features: [
        'Peringatan otomatis suku cadang pabrik di bawah batas aman',
        'Kalkulasi otomatis jumlah reorder point (ROP) berdasarkan lead time',
        'Pemetaan lokasi rak dan bin penyimpanan di gudang',
        'Export laporan stok kritis untuk pengajuan Purchase Request (PR)',
      ]
    },
    {
      id: 'arsip' as AppId,
      number: '05',
      title: 'Aplikasi Portal Arsip Gudang Terpadu',
      subtitle: 'Pengindeksan Berkas Fisik, Kotak Dokumen, Ordner & Softcopy Digital PDF',
      serverPlatform: 'Vercel' as const,
      deployedUrl: externalSettings.arsipUrl || 'https://portal-arsip-gudang-pt-semen-padang-seven.vercel.app/',
      icon: <Archive className="w-8 h-8 text-rose-400" />,
      badge: `${totalArsip} Arsip Terdata`,
      badgeColor: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
      bgColor: 'from-rose-950/40 via-slate-900 to-slate-900',
      borderColor: 'hover:border-rose-500/50',
      buttonBg: 'bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-500 hover:to-rose-400 text-slate-950',
      stats: [
        { label: 'Dokumen Terarsip', value: `${totalArsip} Berkas` },
        { label: 'Kategori Dokumen', value: '5 Macam' },
        { label: 'Retensi Penyimpanan', value: '5-10 Tahun' },
      ],
      features: [
        'Pencarian kilat dokumen berdasarkan nomor, tahun, atau perihal',
        'Pemetaan lokasi fisik: nomor lemari, ordner, dan rak dus',
        'Akses cepat file digital scan dokumen PDF',
        'Audit jejak penyimpanan dokumen untuk kelengkapan inspeksi',
      ]
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8">
      {/* Executive Welcome Hero Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-slate-900 via-red-950/60 to-slate-900 border border-slate-700/80 p-6 sm:p-8 shadow-2xl">
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/20 border border-red-500/30 text-red-300 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Satu Gerbang Kendali Eksekutif Terpadu PT Semen Padang</span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
              Selamat Datang, <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-red-400">{currentUser.name}</span>
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Pusat monitoring dan operasional pergudangan Semen Padang. Kelima aplikasi utama Anda telah disatukan di sini dengan akses instan, pengawasan terpusat, dan cetak dokumen resmi tanpa perlu berpindah-pindah website.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3 text-xs text-slate-300">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Status Akun: <strong>{currentUser.role === 'manager' ? 'Akses Penuh Approval (Manager)' : 'Pelaksana Input Data'}</strong></span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700">
                <Server className="w-4 h-4 text-cyan-400" />
                <span>5 Server Aktif (PythonAnywhere, Streamlit, GitHub, Vercel)</span>
              </div>
            </div>
          </div>

          {/* Quick Access Action Card */}
          <div className="lg:w-80 shrink-0 bg-slate-900/90 border border-slate-700/80 rounded-2xl p-4 sm:p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-bold text-white uppercase tracking-wider">Aksi Cepat Manager</span>
              </div>
              <button 
                onClick={onOpenSettings}
                className="text-[11px] text-slate-400 hover:text-amber-400 transition-colors flex items-center gap-1 cursor-pointer"
                title="Kelola URL Aplikasi Online"
              >
                <SlidersHorizontal className="w-3 h-3" />
                <span>Atur Link</span>
              </button>
            </div>

            <div className="space-y-2">
              <button
                onClick={() => onSelectApp('spkl')}
                className="w-full flex items-center justify-between p-2.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-semibold transition-all cursor-pointer group"
              >
                <span className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  <span>Review {pendingSpkl} SPKL Menunggu</span>
                </span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => onSelectApp('minmax')}
                className="w-full flex items-center justify-between p-2.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs font-semibold transition-all cursor-pointer group"
              >
                <span className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  <span>Cek {criticalStockItems.length} Stok Kritis</span>
                </span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => onSelectApp('irgr')}
                className="w-full flex items-center justify-between p-2.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-xs font-semibold transition-all cursor-pointer group"
              >
                <span className="flex items-center gap-2">
                  <Boxes className="w-4 h-4" />
                  <span>Cek {pendingIrGr} PO Belum GR</span>
                </span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Real-time Summary Quick-Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        <div 
          onClick={() => onSelectApp('spkl')}
          className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/80 hover:border-amber-500/50 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>SPKL Lembur</span>
            <FileText className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-xl font-bold text-amber-300">{pendingSpkl} <span className="text-xs text-slate-400 font-normal">Pending</span></div>
          <div className="text-[11px] text-slate-400 mt-0.5">Disetujui: {approvedJamTotal.toFixed(0)} Jm</div>
        </div>

        <div 
          onClick={() => onSelectApp('irgr')}
          className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/80 hover:border-cyan-500/50 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>ERP Monitoring</span>
            <Boxes className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-xl font-bold text-cyan-300">{pendingIrGr} <span className="text-xs text-slate-400 font-normal">Tunggu GR</span></div>
          <div className="text-[11px] text-slate-400 mt-0.5">Total: {totalPoActive} PO Aktif</div>
        </div>

        <div 
          onClick={() => onSelectApp('solar')}
          className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/80 hover:border-emerald-500/50 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>Penerimaan Solar</span>
            <Fuel className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-xl font-bold text-emerald-300">{(totalSolarBulanIni / 1000).toFixed(1)}k <span className="text-xs text-slate-400 font-normal">Liter</span></div>
          <div className="text-[11px] text-slate-400 mt-0.5">Tangki 01: 78% (Aman)</div>
        </div>

        <div 
          onClick={() => onSelectApp('minmax')}
          className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/80 hover:border-purple-500/50 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>MIN - MAX Stock</span>
            <BarChart3 className="w-4 h-4 text-purple-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-xl font-bold text-rose-300">{criticalStockItems.length} <span className="text-xs text-slate-400 font-normal">Item Kritis</span></div>
          <div className="text-[11px] text-slate-400 mt-0.5">Butuh pengadaan segera</div>
        </div>

        <div 
          onClick={() => onSelectApp('arsip')}
          className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/80 hover:border-rose-500/50 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>Arsip Gudang</span>
            <Archive className="w-4 h-4 text-rose-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-xl font-bold text-rose-300">{totalArsip} <span className="text-xs text-slate-400 font-normal">Berkas</span></div>
          <div className="text-[11px] text-slate-400 mt-0.5">Terarsip fisik & digital</div>
        </div>
      </div>

      {/* Executive Analytics Dashboard */}
      <PortalAnalyticsDashboard
        spklList={spklList}
        irgrList={irgrList}
        solarList={solarList}
        minmaxList={minmaxList}
        arsipList={arsipList}
        onNavigateApp={onSelectApp}
      />

      {/* 5 Applications Main Catalog Cards */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-amber-400" />
            <h2 className="text-lg font-bold text-white tracking-wide">
              5 Aplikasi Utama Terpadu Warehouse Semen Padang
            </h2>
          </div>
          <span className="text-xs text-slate-400">Pilih aplikasi untuk membukanya secara terintegrasi di portal ini</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {apps.map((app) => (
            <div
              key={app.id}
              className={`rounded-2xl bg-gradient-to-b ${app.bgColor} border border-slate-800 ${app.borderColor} p-5 flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 relative group`}
            >
              <div>
                {/* Header Card */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-700/80 shadow-md">
                      {app.icon}
                    </div>
                    <div>
                      <span className="text-xs font-mono font-bold text-slate-400">
                        MODUL #{app.number}
                      </span>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 text-slate-300 border border-slate-800">
                          {app.serverPlatform}
                        </span>
                      </div>
                    </div>
                  </div>

                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${app.badgeColor}`}>
                    {app.badge}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white mb-1 group-hover:text-amber-300 transition-colors">
                  {app.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  {app.subtitle}
                </p>

                {/* Key Metrics in Card */}
                <div className="grid grid-cols-3 gap-2 p-2.5 rounded-xl bg-slate-950/70 border border-slate-800/80 mb-4 text-center">
                  {app.stats.map((st, i) => (
                    <div key={i} className="space-y-0.5">
                      <div className="text-[10px] text-slate-400 truncate">{st.label}</div>
                      <div className="text-xs font-bold text-white truncate">{st.value}</div>
                    </div>
                  ))}
                </div>

                {/* Highlights */}
                <div className="space-y-1.5 mb-5">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Fitur & Integrasi:
                  </span>
                  <ul className="space-y-1">
                    {app.features.map((feat, idx) => (
                      <li key={idx} className="text-xs text-slate-300 flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2 border-t border-slate-800/80">
                <button
                  onClick={() => onSelectApp(app.id)}
                  className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer ${app.buttonBg}`}
                >
                  <span>Buka Modul di Portal</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="flex items-center justify-between text-[11px] px-1 text-slate-400">
                  <span className="truncate max-w-[190px]">URL: {app.deployedUrl}</span>
                  <a
                    href={app.deployedUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-slate-300 hover:text-white transition-colors"
                    title="Buka Langsung di Tab Baru"
                  >
                    <span>Tab Baru</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
