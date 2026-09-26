import React, { useState } from 'react';
import { IrGrRecord, UserProfile } from '../types';
import { 
  Boxes, 
  Plus, 
  ArrowLeft, 
  Globe, 
  Search, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  FileCheck,
  TrendingUp,
  Truck
} from 'lucide-react';

interface IrGrAppProps {
  records: IrGrRecord[];
  currentUser: UserProfile;
  onAddRecord: (record: IrGrRecord) => void;
  onUpdateGrStatus: (id: string, grNumber: string) => void;
  onBackToPortal: () => void;
  onOpenLiveUrl: () => void;
}

export const IrGrApp: React.FC<IrGrAppProps> = ({
  records,
  currentUser,
  onAddRecord,
  onUpdateGrStatus,
  onBackToPortal,
  onOpenLiveUrl
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [showAddModal, setShowAddModal] = useState(false);
  const [activeGrModalId, setActiveGrModalId] = useState<string | null>(null);
  const [inputGrNumber, setInputGrNumber] = useState('');

  // Form State
  const [noPo, setNoPo] = useState('');
  const [vendor, setVendor] = useState('');
  const [namaBarang, setNamaBarang] = useState('');
  const [jumlah, setJumlah] = useState<number>(1);
  const [satuan, setSatuan] = useState('PCS');
  const [statusQc, setStatusQc] = useState<'Menunggu QC' | 'Inspeksi Selesai' | 'Ditolak QC'>('Inspeksi Selesai');

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noPo || !vendor || !namaBarang) return;

    const newRecord: IrGrRecord = {
      id: `irgr-${Date.now()}`,
      noPo,
      vendor,
      namaBarang,
      jumlahDiterima: jumlah,
      satuan,
      tanggalTerima: new Date().toISOString().split('T')[0],
      statusQc,
      statusGr: 'Pending GR'
    };

    onAddRecord(newRecord);
    setShowAddModal(false);
    setNoPo('');
    setVendor('');
    setNamaBarang('');
  };

  const handleSaveGr = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeGrModalId && inputGrNumber) {
      onUpdateGrStatus(activeGrModalId, inputGrNumber);
      setActiveGrModalId(null);
      setInputGrNumber('');
    }
  };

  const filteredRecords = records.filter(item => {
    const matchSearch = 
      item.noPo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.vendor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.namaBarang.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filterStatus === 'All') return matchSearch;
    return matchSearch && item.statusGr === filterStatus;
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
          <div className="p-3 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
            <Boxes className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg sm:text-xl font-bold text-white">
                02. Modul ERP Monitoring IR - GR (Penerimaan SAP)
              </h1>
              <span className="text-[10px] px-2 py-0.5 rounded bg-red-500/20 text-red-300 font-mono">
                Streamlit
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Pelacakan alur Inspection Report (QC) hingga penerbitan nomor Good Receipt MIGO SAP.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenLiveUrl}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-slate-300 hover:text-white transition-all cursor-pointer"
          >
            <Globe className="w-4 h-4 text-cyan-400" />
            <span>Server Asli (Streamlit)</span>
          </button>

          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold transition-all shadow-md cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Catat PO / IR Masuk</span>
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Cari PO, vendor, atau barang..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
          {['All', 'Pending GR', 'GR Terbit (MIGO)', 'Parsial'].map(tab => (
            <button
              key={tab}
              onClick={() => setFilterStatus(tab)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                filterStatus === tab
                  ? 'bg-cyan-600 text-white'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {tab === 'All' ? 'Semua Status' : tab}
            </button>
          ))}
        </div>
      </div>

      {/* Table Records */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 font-bold uppercase tracking-wider border-b border-slate-800">
              <tr>
                <th className="px-4 py-3">Nomor PO & Tanggal</th>
                <th className="px-4 py-3">Vendor / Pemasok</th>
                <th className="px-4 py-3">Deskripsi Suku Cadang / Barang</th>
                <th className="px-4 py-3">Kuantitas</th>
                <th className="px-4 py-3">Status Inspeksi QC</th>
                <th className="px-4 py-3">Nomor GR (SAP MIGO)</th>
                <th className="px-4 py-3 text-center">Tindakan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {filteredRecords.map((item) => (
                <tr key={item.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="px-4 py-3">
                    <div className="font-mono font-bold text-cyan-300">{item.noPo}</div>
                    <div className="text-[10px] text-slate-400">{item.tanggalTerima}</div>
                  </td>
                  <td className="px-4 py-3 font-semibold text-white">
                    {item.vendor}
                  </td>
                  <td className="px-4 py-3 max-w-xs">
                    <div className="font-bold text-slate-200">{item.namaBarang}</div>
                  </td>
                  <td className="px-4 py-3 font-mono font-bold text-white">
                    {item.jumlahDiterima} {item.satuan}
                  </td>
                  <td className="px-4 py-3">
                    {item.statusQc === 'Inspeksi Selesai' && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>QC Lolos</span>
                      </span>
                    )}
                    {item.statusQc === 'Menunggu QC' && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 font-semibold border border-amber-500/30 animate-pulse">
                        <Clock className="w-3.5 h-3.5" />
                        <span>Menunggu QC</span>
                      </span>
                    )}
                    {item.statusQc === 'Ditolak QC' && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-rose-500/20 text-rose-300 font-semibold border border-rose-500/30">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>Ditolak QC</span>
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 font-mono">
                    {item.noGrSap ? (
                      <div className="font-bold text-emerald-400">{item.noGrSap}</div>
                    ) : (
                      <div className="text-amber-400 text-[11px] font-sans">Belum Terbit (Pending)</div>
                    )}
                  </td>
                  <td className="px-4 py-3 text-center">
                    {item.statusGr === 'Pending GR' ? (
                      <button
                        onClick={() => {
                          setActiveGrModalId(item.id);
                          setInputGrNumber(`5001${Math.floor(100000 + Math.random() * 900000)}`);
                        }}
                        className="px-2.5 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-[11px] transition-colors cursor-pointer"
                      >
                        Input No. GR
                      </button>
                    ) : (
                      <span className="text-[11px] text-emerald-400 font-semibold">Tuntas (MIGO)</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Input PO Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-md p-6 shadow-2xl space-y-4">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Boxes className="w-5 h-5 text-cyan-400" />
              <span>Pencatatan Dokumen PO Masuk (IR)</span>
            </h2>

            <form onSubmit={handleAddSubmit} className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="text-slate-300 font-semibold">Nomor PO SAP</label>
                <input
                  type="text"
                  required
                  placeholder="PO-450089XXXX"
                  value={noPo}
                  onChange={(e) => setNoPo(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-semibold">Nama Vendor / Supplier</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: PT SKF Indonesia"
                  value={vendor}
                  onChange={(e) => setVendor(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-semibold">Deskripsi Barang / Material</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Spherical Roller Bearing 22328"
                  value={namaBarang}
                  onChange={(e) => setNamaBarang(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-slate-300 font-semibold">Jumlah Diterima</label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={jumlah}
                    onChange={(e) => setJumlah(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white font-mono"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-300 font-semibold">Satuan</label>
                  <select
                    value={satuan}
                    onChange={(e) => setSatuan(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white"
                  >
                    <option value="PCS">PCS</option>
                    <option value="SET">SET</option>
                    <option value="DRUM">DRUM</option>
                    <option value="BOX">BOX</option>
                    <option value="UNIT">UNIT</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-semibold">Status Pemeriksaan Mutu (QC)</label>
                <select
                  value={statusQc}
                  onChange={(e) => setStatusQc(e.target.value as any)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white"
                >
                  <option value="Inspeksi Selesai">Inspeksi Selesai (Lolos QC)</option>
                  <option value="Menunggu QC">Menunggu QC</option>
                  <option value="Ditolak QC">Ditolak QC (Barang Cacat/Tidak Sesuai)</option>
                </select>
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
                  className="px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-bold"
                >
                  Simpan Catatan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Input No GR SAP Modal */}
      {activeGrModalId && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-sm p-6 shadow-2xl space-y-4">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <FileCheck className="w-5 h-5 text-emerald-400" />
              <span>Input Nomor Slip Penerimaan GR (MIGO)</span>
            </h2>

            <form onSubmit={handleSaveGr} className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="text-slate-300 font-semibold">Nomor Material Document SAP</label>
                <input
                  type="text"
                  required
                  placeholder="5001XXXXXX"
                  value={inputGrNumber}
                  onChange={(e) => setInputGrNumber(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white font-mono text-sm"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setActiveGrModalId(null)}
                  className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold"
                >
                  Konfirmasi GR Terbit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
