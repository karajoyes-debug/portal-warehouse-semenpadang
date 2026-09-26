import React, { useState } from 'react';
import { SpklRecord, UserProfile } from '../types';
import { 
  FileText, 
  Plus, 
  CheckCircle, 
  XCircle, 
  Printer, 
  ArrowLeft, 
  Clock, 
  ShieldCheck, 
  User, 
  Filter, 
  Calendar,
  Building,
  Globe,
  Share2
} from 'lucide-react';
import { PrintModal } from './PrintModal';

interface SpklAppProps {
  records: SpklRecord[];
  currentUser: UserProfile;
  onAddRecord: (record: SpklRecord) => void;
  onApproveRecord: (id: string, approverName: string) => void;
  onRejectRecord: (id: string) => void;
  onBackToPortal: () => void;
  onOpenLiveUrl: () => void;
}

export const SpklApp: React.FC<SpklAppProps> = ({
  records,
  currentUser,
  onAddRecord,
  onApproveRecord,
  onRejectRecord,
  onBackToPortal,
  onOpenLiveUrl
}) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [printRecord, setPrintRecord] = useState<SpklRecord | null>(null);
  const [statusFilter, setStatusFilter] = useState<'All' | 'Pending' | 'Disetujui' | 'Ditolak'>('All');

  // Form State
  const [nama, setNama] = useState('');
  const [badge, setBadge] = useState('');
  const [unitKerja, setUnitKerja] = useState('Penerimaan & Bongkar Muat');
  const [tipeKaryawan, setTipeKaryawan] = useState<'Organik' | 'Non Organik'>('Organik');
  const [alasanLembur, setAlasanLembur] = useState('');
  const [uraianPekerjaan, setUraianPekerjaan] = useState('');
  const [tanggal, setTanggal] = useState(new Date().toISOString().split('T')[0]);
  const [jamMulai, setJamMulai] = useState('17:00');
  const [jamSelesai, setJamSelesai] = useState('21:00');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nama || !alasanLembur || !uraianPekerjaan) return;

    // Calculate hours diff
    const [startH, startM] = jamMulai.split(':').map(Number);
    const [endH, endM] = jamSelesai.split(':').map(Number);
    let diff = (endH + endM / 60) - (startH + startM / 60);
    if (diff < 0) diff += 24;

    const newRecord: SpklRecord = {
      id: `spkl-${Date.now()}`,
      noSpkl: `SPKL/PTSP/GDG/${new Date().getFullYear()}/${String(new Date().getMonth() + 1).padStart(2, '0')}/${Math.floor(1000 + Math.random() * 9000)}`,
      tanggal,
      nama,
      badge: badge || `PTSP-${Math.floor(10000 + Math.random() * 90000)}`,
      unitKerja,
      tipeKaryawan,
      alasanLembur,
      uraianPekerjaan,
      jamMulai,
      jamSelesai,
      jumlahJam: Number(diff.toFixed(1)),
      statusApproval: 'Pending',
      createdAt: new Date().toLocaleString('id-ID')
    };

    onAddRecord(newRecord);
    setShowAddForm(false);
    // Reset form
    setNama('');
    setBadge('');
    setAlasanLembur('');
    setUraianPekerjaan('');
  };

  const filteredRecords = records.filter(r => {
    if (statusFilter === 'All') return true;
    return r.statusApproval === statusFilter;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Top Banner Control */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToPortal}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
            title="Kembali ke Beranda Portal"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="p-3 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg sm:text-xl font-bold text-white">
                01. Modul SPKL (Surat Perintah Kerja Lembur)
              </h1>
              <span className="text-[10px] px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 font-mono">
                PythonAnywhere
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Kelola pengajuan lembur, persetujuan Manager, dan cetak form lembur resmi PT Semen Padang.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenLiveUrl}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-slate-300 hover:text-white transition-all cursor-pointer"
          >
            <Globe className="w-4 h-4 text-blue-400" />
            <span>Server Asli (PythonAnywhere)</span>
          </button>

          <button
            onClick={() => setShowAddForm(true)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-slate-950 text-xs font-bold transition-all shadow-md cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Buat SPKL Baru</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-between gap-3 overflow-x-auto pb-1">
        <div className="flex items-center gap-2 bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs">
          {(['All', 'Pending', 'Disetujui', 'Ditolak'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setStatusFilter(tab)}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                statusFilter === tab 
                  ? 'bg-amber-500 text-slate-950 shadow-sm' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {tab === 'All' ? 'Semua Berkas' : tab}
            </button>
          ))}
        </div>
        <div className="text-xs text-slate-400">
          Total: <strong className="text-white">{filteredRecords.length}</strong> formulir
        </div>
      </div>

      {/* Record Table / Cards */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 font-bold uppercase tracking-wider border-b border-slate-800">
              <tr>
                <th className="px-4 py-3">Nomor SPKL</th>
                <th className="px-4 py-3">Nama & Unit Kerja</th>
                <th className="px-4 py-3">Tanggal & Jam</th>
                <th className="px-4 py-3">Total Jam</th>
                <th className="px-4 py-3">Uraian Tugas</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {filteredRecords.map((r) => (
                <tr key={r.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="px-4 py-3">
                    <div className="font-mono font-bold text-amber-300">{r.noSpkl}</div>
                    <div className="text-[10px] text-slate-400">{r.createdAt}</div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="font-bold text-white">{r.nama}</div>
                    <div className="text-[11px] text-slate-400">{r.unitKerja} • <span className="text-slate-300 font-medium">{r.tipeKaryawan}</span></div>
                  </td>
                  <td className="px-4 py-3">
                    <div>{r.tanggal}</div>
                    <div className="text-[11px] text-slate-400 font-mono">{r.jamMulai} - {r.jamSelesai} WIB</div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="font-bold text-white text-sm">{r.jumlahJam}</span> <span className="text-slate-400">Jam</span>
                  </td>
                  <td className="px-4 py-3 max-w-xs">
                    <div className="font-semibold text-slate-200 line-clamp-1">{r.alasanLembur}</div>
                    <div className="text-[11px] text-slate-400 line-clamp-2">{r.uraianPekerjaan}</div>
                  </td>
                  <td className="px-4 py-3">
                    {r.statusApproval === 'Disetujui' && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30">
                        <CheckCircle className="w-3.5 h-3.5" />
                        <span>Disetujui ({r.disetujuiOleh})</span>
                      </span>
                    )}
                    {r.statusApproval === 'Pending' && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 font-semibold border border-amber-500/30 animate-pulse">
                        <Clock className="w-3.5 h-3.5" />
                        <span>Menunggu Approval</span>
                      </span>
                    )}
                    {r.statusApproval === 'Ditolak' && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-rose-500/20 text-rose-300 font-semibold border border-rose-500/30">
                        <XCircle className="w-3.5 h-3.5" />
                        <span>Ditolak</span>
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-center gap-1.5">
                      {/* Boss Approval Buttons */}
                      {currentUser.role === 'manager' && r.statusApproval === 'Pending' && (
                        <>
                          <button
                            onClick={() => onApproveRecord(r.id, currentUser.name)}
                            className="p-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white transition-colors cursor-pointer"
                            title="Setujui Lembur Sebagai Manager"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => onRejectRecord(r.id)}
                            className="p-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white transition-colors cursor-pointer"
                            title="Tolak Pengajuan"
                          >
                            <XCircle className="w-4 h-4" />
                          </button>
                        </>
                      )}

                      {/* Print PDF Button */}
                      <button
                        onClick={() => setPrintRecord(r)}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                        title="Cetak SPKL Resmi (Format PDF)"
                      >
                        <Printer className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Input Form SPKL Baru */}
      {showAddForm && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-lg p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <FileText className="w-5 h-5 text-amber-400" />
                <span>Formulir Pengajuan SPKL Lembur</span>
              </h2>
              <button 
                onClick={() => setShowAddForm(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-slate-300 font-semibold">Nama Karyawan</label>
                  <input
                    type="text"
                    required
                    value={nama}
                    onChange={(e) => setNama(e.target.value)}
                    placeholder="Contoh: Rahmat Hidayat"
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-300 font-semibold">No. Badge / NIK</label>
                  <input
                    type="text"
                    value={badge}
                    onChange={(e) => setBadge(e.target.value)}
                    placeholder="PTSP-48821"
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-slate-300 font-semibold">Unit Kerja</label>
                  <select
                    value={unitKerja}
                    onChange={(e) => setUnitKerja(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white"
                  >
                    <option value="Penerimaan & Bongkar Muat">Penerimaan & Bongkar Muat</option>
                    <option value="Stockist & Spareparts">Stockist & Spareparts</option>
                    <option value="Logistik BBM Solar">Logistik BBM Solar</option>
                    <option value="Administrasi & Arsip">Administrasi & Arsip</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-slate-300 font-semibold">Tipe Karyawan</label>
                  <select
                    value={tipeKaryawan}
                    onChange={(e) => setTipeKaryawan(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white"
                  >
                    <option value="Organik">Organik (PT Semen Padang)</option>
                    <option value="Non Organik">Non Organik (Vendor / Outsourcing)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="text-slate-300 font-semibold">Tanggal</label>
                  <input
                    type="date"
                    required
                    value={tanggal}
                    onChange={(e) => setTanggal(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-300 font-semibold">Jam Mulai</label>
                  <input
                    type="time"
                    required
                    value={jamMulai}
                    onChange={(e) => setJamMulai(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-300 font-semibold">Jam Selesai</label>
                  <input
                    type="time"
                    required
                    value={jamSelesai}
                    onChange={(e) => setJamSelesai(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-semibold">Alasan Lembur</label>
                <input
                  type="text"
                  required
                  value={alasanLembur}
                  onChange={(e) => setAlasanLembur(e.target.value)}
                  placeholder="Contoh: Bongkar Muat Kritis Refractories Kiln"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-semibold">Uraian Rinci Pekerjaan</label>
                <textarea
                  rows={3}
                  required
                  value={uraianPekerjaan}
                  onChange={(e) => setUraianPekerjaan(e.target.value)}
                  placeholder="Jelaskan detail pekerjaan yang dilakukan selama jam lembur..."
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold"
                >
                  Simpan & Ajukan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Print PDF Template Modal */}
      {printRecord && (
        <PrintModal
          isOpen={!!printRecord}
          onClose={() => setPrintRecord(null)}
          title="Surat Perintah Kerja Lembur (SPKL)"
          documentNumber={printRecord.noSpkl}
        >
          <div className="space-y-6 text-sm text-slate-800">
            <div className="text-center pb-2">
              <h3 className="text-base font-black tracking-wide uppercase underline">
                SURAT PERINTAH KERJA LEMBUR (SPKL)
              </h3>
              <p className="text-xs font-mono mt-0.5 font-bold text-slate-600">
                Nomor: {printRecord.noSpkl}
              </p>
            </div>

            <table className="w-full border border-slate-300 text-xs">
              <tbody>
                <tr className="border-b border-slate-200">
                  <td className="p-2 font-bold bg-slate-100 w-1/3">Nama Karyawan</td>
                  <td className="p-2 font-bold text-slate-900">{printRecord.nama}</td>
                </tr>
                <tr className="border-b border-slate-200">
                  <td className="p-2 font-bold bg-slate-100">No. Badge / NIK</td>
                  <td className="p-2 font-mono">{printRecord.badge}</td>
                </tr>
                <tr className="border-b border-slate-200">
                  <td className="p-2 font-bold bg-slate-100">Unit Kerja & Status</td>
                  <td className="p-2">{printRecord.unitKerja} ({printRecord.tipeKaryawan})</td>
                </tr>
                <tr className="border-b border-slate-200">
                  <td className="p-2 font-bold bg-slate-100">Hari / Tanggal</td>
                  <td className="p-2">{printRecord.tanggal}</td>
                </tr>
                <tr className="border-b border-slate-200">
                  <td className="p-2 font-bold bg-slate-100">Jam Kerja Lembur</td>
                  <td className="p-2 font-mono font-bold">{printRecord.jamMulai} s/d {printRecord.jamSelesai} WIB ({printRecord.jumlahJam} Jam)</td>
                </tr>
                <tr className="border-b border-slate-200">
                  <td className="p-2 font-bold bg-slate-100">Alasan Lembur</td>
                  <td className="p-2 font-semibold">{printRecord.alasanLembur}</td>
                </tr>
                <tr>
                  <td className="p-2 font-bold bg-slate-100">Rincian Pekerjaan</td>
                  <td className="p-2 leading-relaxed">{printRecord.uraianPekerjaan}</td>
                </tr>
              </tbody>
            </table>

            {/* Signature Area */}
            <div className="grid grid-cols-2 pt-8 text-center text-xs">
              <div>
                <p className="text-slate-600">Yang Diberi Perintah,</p>
                <div className="h-16 flex items-end justify-center font-bold underline">
                  {printRecord.nama}
                </div>
                <p className="text-[10px] text-slate-500">Badge: {printRecord.badge}</p>
              </div>
              <div>
                <p className="text-slate-600">Disetujui Oleh (Kepala Unit / Manager),</p>
                <div className="h-16 flex items-end justify-center font-bold underline text-slate-900">
                  {printRecord.disetujuiOleh || 'Hamdi Ayussa / Yan Tanamal'}
                </div>
                <p className="text-[10px] text-slate-500">Unit Gudang & Logistik PT Semen Padang</p>
              </div>
            </div>
          </div>
        </PrintModal>
      )}
    </div>
  );
};
