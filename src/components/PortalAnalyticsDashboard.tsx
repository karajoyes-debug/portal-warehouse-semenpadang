import React, { useState } from 'react';
import { 
  AppId, 
  SpklRecord, 
  IrGrRecord, 
  SolarRecord, 
  MinMaxItem, 
  ArsipRecord 
} from '../types';
import { 
  BarChart3, 
  TrendingUp, 
  Clock, 
  Boxes, 
  Fuel, 
  Archive, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight, 
  FileText, 
  ShieldCheck, 
  Sparkles,
  Users,
  ChevronRight,
  PackageCheck,
  AlertCircle,
  Truck
} from 'lucide-react';

interface PortalAnalyticsDashboardProps {
  spklList: SpklRecord[];
  irgrList: IrGrRecord[];
  solarList: SolarRecord[];
  minmaxList: MinMaxItem[];
  arsipList: ArsipRecord[];
  onNavigateApp: (appId: AppId) => void;
}

export const PortalAnalyticsDashboard: React.FC<PortalAnalyticsDashboardProps> = ({
  spklList,
  irgrList,
  solarList,
  minmaxList,
  arsipList,
  onNavigateApp
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'spkl' | 'irgr' | 'minmax' | 'solar'>('all');

  // 1. Calculations: SPKL Overtime Metrics
  const totalJamDiajukan = spklList.reduce((acc, curr) => acc + curr.jumlahJam, 0);
  const spklApproved = spklList.filter(s => s.statusApproval === 'Disetujui');
  const spklPending = spklList.filter(s => s.statusApproval === 'Pending');
  const spklRejected = spklList.filter(s => s.statusApproval === 'Ditolak');

  const jamApproved = spklApproved.reduce((acc, curr) => acc + curr.jumlahJam, 0);
  const jamPending = spklPending.reduce((acc, curr) => acc + curr.jumlahJam, 0);

  const jamOrganik = spklList
    .filter(s => s.tipeKaryawan === 'Organik')
    .reduce((acc, curr) => acc + curr.jumlahJam, 0);
  const jamNonOrganik = spklList
    .filter(s => s.tipeKaryawan === 'Non Organik')
    .reduce((acc, curr) => acc + curr.jumlahJam, 0);

  // 2. Calculations: ERP IR-GR Metrics
  const totalPo = irgrList.length;
  const poPendingGr = irgrList.filter(i => i.statusGr === 'Pending GR');
  const poGrTerbit = irgrList.filter(i => i.statusGr === 'GR Terbit (MIGO)');
  const poParsial = irgrList.filter(i => i.statusGr === 'Parsial');
  const qcLolos = irgrList.filter(i => i.statusQc === 'Inspeksi Selesai').length;
  const qcMenunggu = irgrList.filter(i => i.statusQc === 'Menunggu QC').length;
  const qcDitolak = irgrList.filter(i => i.statusQc === 'Ditolak QC').length;
  const qcPassRate = totalPo > 0 ? Math.round((qcLolos / totalPo) * 100) : 100;

  // 3. Calculations: MIN-MAX Inventory Metrics
  const totalItems = minmaxList.length;
  const criticalItems = minmaxList.filter(m => m.stokFisik <= m.minStock);
  const reorderItems = minmaxList.filter(m => m.stokFisik > m.minStock && m.stokFisik <= m.reorderPoint);
  const safeItems = minmaxList.filter(m => m.stokFisik > m.reorderPoint);
  const inventoryHealthRate = totalItems > 0 ? Math.round((safeItems.length / totalItems) * 100) : 100;

  // 4. Calculations: Solar BBM Metrics
  const totalVolumeDiterima = solarList.reduce((acc, curr) => acc + curr.volumeFisikDiterimaLiter, 0);
  const totalVolumeDo = solarList.reduce((acc, curr) => acc + curr.volumeSuratJalanLiter, 0);
  const netSelisihLiter = solarList.reduce((acc, curr) => acc + curr.selisihLiter, 0);

  return (
    <div className="bg-slate-900/90 border border-slate-700/80 rounded-2xl p-5 sm:p-6 shadow-2xl space-y-6">
      {/* Top Header of Analytics Dashboard */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-blue-500/20 text-blue-400 border border-blue-500/30">
              <BarChart3 className="w-5 h-5" />
            </span>
            <h2 className="text-lg sm:text-xl font-extrabold text-white tracking-wide">
              Dasbor Analitik Eksekutif 5 Aplikasi Gudang
            </h2>
          </div>
          <p className="text-xs text-slate-400">
            Pemantauan langsung performa lembur, alur pengadaan PO/GR, ketahanan stok material, dan logistik BBM.
          </p>
        </div>

        {/* Tab Filters */}
        <div className="flex items-center gap-1.5 bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs overflow-x-auto">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'all' 
                ? 'bg-blue-600 text-white shadow-md' 
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            Semua Indikator
          </button>
          <button
            onClick={() => setActiveTab('spkl')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'spkl' 
                ? 'bg-amber-600 text-white shadow-md' 
                : 'text-slate-400 hover:text-amber-300 hover:bg-slate-800/60'
            }`}
          >
            SPKL Lembur
          </button>
          <button
            onClick={() => setActiveTab('irgr')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'irgr' 
                ? 'bg-cyan-600 text-white shadow-md' 
                : 'text-slate-400 hover:text-cyan-300 hover:bg-slate-800/60'
            }`}
          >
            ERP PO & GR
          </button>
          <button
            onClick={() => setActiveTab('minmax')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'minmax' 
                ? 'bg-purple-600 text-white shadow-md' 
                : 'text-slate-400 hover:text-purple-300 hover:bg-slate-800/60'
            }`}
          >
            Stok Kritis
          </button>
          <button
            onClick={() => setActiveTab('solar')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'solar' 
                ? 'bg-emerald-600 text-white shadow-md' 
                : 'text-slate-400 hover:text-emerald-300 hover:bg-slate-800/60'
            }`}
          >
            Solar & Arsip
          </button>
        </div>
      </div>

      {/* Grid of Key Performance Indicators (KPI Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1: SPKL Lembur */}
        {(activeTab === 'all' || activeTab === 'spkl') && (
          <div className="p-4 rounded-xl bg-gradient-to-br from-amber-950/40 via-slate-900 to-slate-900 border border-amber-900/50 hover:border-amber-500/50 transition-all flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between text-xs text-amber-400 font-semibold mb-2">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  <span>Total Lembur Bulan Ini</span>
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold">
                  {spklPending.length > 0 ? `${spklPending.length} Pending` : 'Up-to-date'}
                </span>
              </div>

              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-3xl font-extrabold text-white">
                  {jamApproved.toFixed(1)}
                </span>
                <span className="text-sm font-semibold text-amber-300">Jam Disetujui</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Dari total <strong className="text-slate-200">{totalJamDiajukan.toFixed(1)} jam</strong> yang diajukan ({spklList.length} berkas).
              </p>

              {/* Overtime Progress Ratio */}
              <div className="mt-3 space-y-1.5">
                <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                  <span>Organik: {jamOrganik.toFixed(0)} Jm</span>
                  <span>Non Organik: {jamNonOrganik.toFixed(0)} Jm</span>
                </div>
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden flex">
                  <div 
                    style={{ width: `${totalJamDiajukan > 0 ? (jamOrganik / totalJamDiajukan) * 100 : 50}%` }} 
                    className="bg-amber-500 h-full" 
                    title="Jam Karyawan Organik"
                  />
                  <div 
                    style={{ width: `${totalJamDiajukan > 0 ? (jamNonOrganik / totalJamDiajukan) * 100 : 50}%` }} 
                    className="bg-indigo-500 h-full" 
                    title="Jam Karyawan Non Organik"
                  />
                </div>
              </div>
            </div>

            <button
              onClick={() => onNavigateApp('spkl')}
              className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-bold text-amber-400 hover:text-amber-300 transition-colors cursor-pointer"
            >
              <span>{spklPending.length > 0 ? 'Tindak Lanjut Approval SPKL' : 'Buka Rekap SPKL'}</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        )}

        {/* KPI 2: ERP PO & GR Processing */}
        {(activeTab === 'all' || activeTab === 'irgr') && (
          <div className="p-4 rounded-xl bg-gradient-to-br from-cyan-950/40 via-slate-900 to-slate-900 border border-cyan-900/50 hover:border-cyan-500/50 transition-all flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between text-xs text-cyan-400 font-semibold mb-2">
                <span className="flex items-center gap-1.5">
                  <Boxes className="w-4 h-4" />
                  <span>PO Sedang Diproses</span>
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-bold">
                  {poPendingGr.length} Tunggu GR
                </span>
              </div>

              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-3xl font-extrabold text-white">
                  {totalPo}
                </span>
                <span className="text-sm font-semibold text-cyan-300">Total PO Aktif</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Lolos inspeksi QC: <strong className="text-emerald-400">{qcLolos} item ({qcPassRate}%)</strong>.
              </p>

              {/* Progress Pipeline */}
              <div className="mt-3 space-y-1.5">
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>GR Terbit: {poGrTerbit.length}</span>
                  <span className="text-amber-300">Tertahan: {poPendingGr.length}</span>
                </div>
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden flex">
                  <div 
                    style={{ width: `${totalPo > 0 ? (poGrTerbit.length / totalPo) * 100 : 0}%` }} 
                    className="bg-emerald-500 h-full" 
                    title="GR Sudah Terbit (SAP MIGO)"
                  />
                  <div 
                    style={{ width: `${totalPo > 0 ? (poPendingGr.length / totalPo) * 100 : 0}%` }} 
                    className="bg-cyan-500 h-full" 
                    title="Menunggu Slip GR"
                  />
                  <div 
                    style={{ width: `${totalPo > 0 ? (poParsial.length / totalPo) * 100 : 0}%` }} 
                    className="bg-amber-500 h-full" 
                    title="Parsial Delivery"
                  />
                </div>
              </div>
            </div>

            <button
              onClick={() => onNavigateApp('irgr')}
              className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer"
            >
              <span>Review PO & Status MIGO</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        )}

        {/* KPI 3: MIN - MAX Critical Stock */}
        {(activeTab === 'all' || activeTab === 'minmax') && (
          <div className="p-4 rounded-xl bg-gradient-to-br from-rose-950/40 via-slate-900 to-slate-900 border border-rose-900/50 hover:border-rose-500/50 transition-all flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between text-xs text-rose-400 font-semibold mb-2">
                <span className="flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4" />
                  <span>Status Stok Kritis</span>
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 font-bold animate-pulse">
                  {criticalItems.length} Di Bawah Min
                </span>
              </div>

              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-3xl font-extrabold text-rose-400">
                  {criticalItems.length}
                </span>
                <span className="text-sm font-semibold text-slate-300">/ {totalItems} Material</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Kesehatan inventaris: <strong className="text-white">{inventoryHealthRate}% aman</strong>.
              </p>

              {/* Inventory ratio visual */}
              <div className="mt-3 space-y-1.5">
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span className="text-rose-400 font-bold">Kritis: {criticalItems.length}</span>
                  <span className="text-amber-400 font-bold">ROP: {reorderItems.length}</span>
                  <span className="text-emerald-400 font-bold">Aman: {safeItems.length}</span>
                </div>
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden flex">
                  <div 
                    style={{ width: `${totalItems > 0 ? (criticalItems.length / totalItems) * 100 : 0}%` }} 
                    className="bg-rose-500 h-full" 
                    title="Di Bawah Minimum"
                  />
                  <div 
                    style={{ width: `${totalItems > 0 ? (reorderItems.length / totalItems) * 100 : 0}%` }} 
                    className="bg-amber-500 h-full" 
                    title="Menyentuh Reorder Point"
                  />
                  <div 
                    style={{ width: `${totalItems > 0 ? (safeItems.length / totalItems) * 100 : 100}%` }} 
                    className="bg-emerald-500 h-full" 
                    title="Stok Aman"
                  />
                </div>
              </div>
            </div>

            <button
              onClick={() => onNavigateApp('minmax')}
              className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-bold text-rose-400 hover:text-rose-300 transition-colors cursor-pointer"
            >
              <span>Ajukan Pengadaan Stok</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        )}

        {/* KPI 4: Solar BBM & Arsip Digital */}
        {(activeTab === 'all' || activeTab === 'solar') && (
          <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-950/40 via-slate-900 to-slate-900 border border-emerald-900/50 hover:border-emerald-500/50 transition-all flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between text-xs text-emerald-400 font-semibold mb-2">
                <span className="flex items-center gap-1.5">
                  <Fuel className="w-4 h-4" />
                  <span>Penerimaan Solar & Arsip</span>
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold">
                  BBM 78%
                </span>
              </div>

              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-3xl font-extrabold text-white">
                  {(totalVolumeDiterima / 1000).toFixed(1)}k
                </span>
                <span className="text-sm font-semibold text-emerald-300">Liter Diterima</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Selisih fisik vs DO: <strong className="text-amber-300">{netSelisihLiter > 0 ? `+${netSelisihLiter}` : netSelisihLiter} L (Wajar)</strong>.
              </p>

              {/* Solar Tank Gauge Preview */}
              <div className="mt-3 space-y-1.5">
                <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                  <span>Tangki 01: 78% (325cm)</span>
                  <span>Arsip: {arsipList.length} BAP/PO</span>
                </div>
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full rounded-full" style={{ width: '78%' }} />
                </div>
              </div>
            </div>

            <button
              onClick={() => onNavigateApp('solar')}
              className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-bold text-emerald-400 hover:text-emerald-300 transition-colors cursor-pointer"
            >
              <span>Cek Tangki & DO BBM</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        )}
      </div>

      {/* Deep-Dive Panels: Highlight Items that Need Boss Attention */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 pt-2">
        {/* Panel Left: Critical Materials Radar (MIN - MAX Warning) */}
        <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-400" />
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                Radar Material Kritis (Perlu Order Segera)
              </h3>
            </div>
            <button
              onClick={() => onNavigateApp('minmax')}
              className="text-[11px] text-purple-400 hover:text-purple-300 font-semibold hover:underline"
            >
              Lihat Semua ({minmaxList.length}) &rarr;
            </button>
          </div>

          <div className="space-y-2">
            {criticalItems.length > 0 ? (
              criticalItems.slice(0, 3).map((item) => {
                const defisit = item.maxStock - item.stokFisik;

                return (
                  <div 
                    key={item.id}
                    className="p-2.5 rounded-lg bg-slate-900 border border-rose-900/40 hover:border-rose-700/60 transition-colors flex items-center justify-between gap-3 text-xs"
                  >
                    <div className="space-y-0.5 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-white truncate">{item.namaMaterial}</span>
                        <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-800 text-slate-400">
                          {item.kodeMaterial}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-400 flex items-center gap-2">
                        <span>Lokasi: <strong className="text-slate-300">{item.lokasiBin}</strong></span>
                        <span>•</span>
                        <span>Min: {item.minStock} {item.satuan}</span>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="text-xs font-bold text-rose-400">
                        Sisa {item.stokFisik} {item.satuan}
                      </div>
                      <div className="text-[10px] text-amber-300 font-semibold">
                        Order +{defisit} {item.satuan}
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-6 text-slate-500 text-xs flex flex-col items-center gap-1">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span>Semua stok material dalam batas aman (tidak ada yang kritis)</span>
              </div>
            )}
          </div>
        </div>

        {/* Panel Right: PO Pipeline & Pending SPKL Approvals */}
        <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <PackageCheck className="w-4 h-4 text-cyan-400" />
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                Dokumen Prioritas Menunggu Tindakan Boss
              </h3>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-mono">
              Live Action
            </span>
          </div>

          <div className="space-y-2">
            {/* SPKL Waiting Approval */}
            {spklPending.length > 0 ? (
              spklPending.slice(0, 2).map((spkl) => (
                <div 
                  key={spkl.id}
                  className="p-2.5 rounded-lg bg-slate-900 border border-amber-900/40 hover:border-amber-700/60 transition-colors flex items-center justify-between gap-3 text-xs"
                >
                  <div className="space-y-0.5 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-amber-300 truncate">Lembur: {spkl.nama}</span>
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 font-semibold">
                        {spkl.jumlahJam} Jam
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400 truncate">
                      {spkl.uraianPekerjaan} ({spkl.unitKerja})
                    </div>
                  </div>

                  <button
                    onClick={() => onNavigateApp('spkl')}
                    className="px-2.5 py-1 rounded bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-[11px] shrink-0 transition-colors cursor-pointer"
                  >
                    Setujui
                  </button>
                </div>
              ))
            ) : null}

            {/* PO Waiting for GR */}
            {poPendingGr.slice(0, 2).map((po) => (
              <div 
                key={po.id}
                className="p-2.5 rounded-lg bg-slate-900 border border-cyan-900/40 hover:border-cyan-700/60 transition-colors flex items-center justify-between gap-3 text-xs"
              >
                <div className="space-y-0.5 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-white truncate">{po.namaBarang}</span>
                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-800 text-cyan-300">
                      {po.noPo}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400 truncate">
                    Vendor: {po.vendor} • {po.jumlahDiterima} {po.satuan} (QC Lolos)
                  </div>
                </div>

                <button
                  onClick={() => onNavigateApp('irgr')}
                  className="px-2.5 py-1 rounded bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-[11px] shrink-0 transition-colors cursor-pointer"
                >
                  Proses GR
                </button>
              </div>
            ))}

            {spklPending.length === 0 && poPendingGr.length === 0 && (
              <div className="text-center py-6 text-slate-500 text-xs flex flex-col items-center gap-1">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span>Semua dokumen telah diproses. Tidak ada approval yang tertunda!</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
