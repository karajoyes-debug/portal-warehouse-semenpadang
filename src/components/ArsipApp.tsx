import React, { useState } from 'react';
import { ArsipRecord, UserProfile } from '../types';
import { 
  Archive, 
  Plus, 
  ArrowLeft, 
  Globe, 
  Search, 
  FileText, 
  FolderCheck, 
  MapPin, 
  Calendar,
  ExternalLink
} from 'lucide-react';

interface ArsipAppProps {
  records: ArsipRecord[];
  currentUser: UserProfile;
  onAddRecord: (record: ArsipRecord) => void;
  onBackToPortal: () => void;
  onOpenLiveUrl: () => void;
}

export const ArsipApp: React.FC<ArsipAppProps> = ({
  records,
  currentUser,
  onAddRecord,
  onBackToPortal,
  onOpenLiveUrl
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterJenis, setFilterJenis] = useState<string>('All');
  const [showAddModal, setShowAddModal] = useState(false);

  // Form states
  const [nomorDokumen, setNomorDokumen] = useState('');
  const [jenisDokumen, setJenisDokumen] = useState<'SPKL' | 'BAP Solar' | 'PO & GR' | 'Surat Jalan' | 'Berita Acara Lainnya'>('PO & GR');
  const [perihal, setPerihal] = useState('');
  const [lokasiPenyimpananFisik, setLokasiPenyimpananFisik] = useState('Gedung Arsip Gudang Lantai 2');
  const [rakDus, setRakDus] = useState('Ordner 01 / Lemari Besi');
  const [filePdfName, setFilePdfName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nomorDokumen || !perihal) return;

    const newRecord: ArsipRecord = {
      id: `ars-${Date.now()}`,
      nomorDokumen,
      jenisDokumen,
      tanggalDokumen: new Date().toISOString().split('T')[0],
      perihal,
      lokasiPenyimpananFisik,
      rakDus,
      filePdfName: filePdfName || `SCAN_${nomorDokumen.replace(/[/\\?%*:|"<>]/g, '_')}.pdf`,
      diinputOleh: currentUser.name
    };

    onAddRecord(newRecord);
    setShowAddModal(false);
    setNomorDokumen('');
    setPerihal('');
    setFilePdfName('');
  };

  const filteredRecords = records.filter(it => {
    const matchSearch = 
      it.nomorDokumen.toLowerCase().includes(searchTerm.toLowerCase()) ||
      it.perihal.toLowerCase().includes(searchTerm.toLowerCase()) ||
      it.rakDus.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filterJenis === 'All') return matchSearch;
    return matchSearch && it.jenisDokumen === filterJenis;
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
          <div className="p-3 rounded-xl bg-rose-500/20 text-rose-400 border border-rose-500/30">
            <Archive className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg sm:text-xl font-bold text-white">
                05. Modul Portal Arsip Gudang Terpadu
              </h1>
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono">
                Vercel
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Pencarian cepat lokasi fisik ordner lemari dokumen serta salinan digital PDF pergudangan PT Semen Padang.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenLiveUrl}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-slate-300 hover:text-white transition-all cursor-pointer"
          >
            <Globe className="w-4 h-4 text-rose-400" />
            <span>Server Asli (Vercel)</span>
          </button>

          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition-all shadow-md cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Arsipkan Dokumen Baru</span>
          </button>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Cari nomor dokumen, ordner, perihal..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white focus:outline-none focus:border-rose-500"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
          {['All', 'SPKL', 'BAP Solar', 'PO & GR', 'Surat Jalan'].map(tab => (
            <button
              key={tab}
              onClick={() => setFilterJenis(tab)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                filterJenis === tab
                  ? 'bg-rose-600 text-white'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {tab === 'All' ? 'Semua Berkas' : tab}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Archive Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredRecords.map((item) => (
          <div 
            key={item.id}
            className="p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-rose-500/50 transition-all flex flex-col justify-between group"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">
                  {item.jenisDokumen}
                </span>
                <span className="text-[11px] text-slate-400 flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  <span>{item.tanggalDokumen}</span>
                </span>
              </div>

              <h3 className="text-xs font-mono font-bold text-amber-300 break-all">
                {item.nomorDokumen}
              </h3>

              <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">
                {item.perihal}
              </p>

              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800/80 text-[11px] space-y-1">
                <div className="flex items-start gap-1.5 text-slate-400">
                  <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
                  <span className="line-clamp-1">{item.lokasiPenyimpananFisik}</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-300 font-semibold pl-5">
                  <span>Ordner: {item.rakDus}</span>
                </div>
              </div>
            </div>

            <div className="pt-3 mt-3 border-t border-slate-800 flex items-center justify-between text-xs">
              <div className="text-[10px] text-slate-500">
                Diinput: {item.diinputOleh}
              </div>
              <span className="text-[11px] font-mono text-cyan-400 flex items-center gap-1">
                <FileText className="w-3.5 h-3.5" />
                <span>PDF Ready</span>
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Input Arsip */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-md p-6 shadow-2xl space-y-4">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Archive className="w-5 h-5 text-rose-400" />
              <span>Pengindeksan Arsip Gudang Baru</span>
            </h2>

            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="text-slate-300 font-semibold">Nomor Surat / Dokumen</label>
                <input
                  type="text"
                  required
                  placeholder="SPKL/..., PO-..., atau BAP-..."
                  value={nomorDokumen}
                  onChange={(e) => setNomorDokumen(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-semibold">Jenis Berkas</label>
                <select
                  value={jenisDokumen}
                  onChange={(e) => setJenisDokumen(e.target.value as any)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white"
                >
                  <option value="PO & GR">PO & Good Receipt (GR MIGO)</option>
                  <option value="SPKL">SPKL Lembur Karyawan</option>
                  <option value="BAP Solar">BAP Penerimaan Solar BBM</option>
                  <option value="Surat Jalan">Surat Jalan Pengiriman</option>
                  <option value="Berita Acara Lainnya">Berita Acara Lainnya</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-semibold">Perihal / Keterangan Dokumen</label>
                <textarea
                  rows={2}
                  required
                  placeholder="Ringkasan isi berkas dokumen..."
                  value={perihal}
                  onChange={(e) => setPerihal(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-semibold">Gedung / Ruang Penyimpanan Fisik</label>
                <input
                  type="text"
                  required
                  value={lokasiPenyimpananFisik}
                  onChange={(e) => setLokasiPenyimpananFisik(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-semibold">Nama Lemari / Ordner / Box Dus</label>
                <input
                  type="text"
                  required
                  placeholder="Ordner PO-2026 / Lemari 02"
                  value={rakDus}
                  onChange={(e) => setRakDus(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold"
                >
                  Simpan ke Arsip
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
