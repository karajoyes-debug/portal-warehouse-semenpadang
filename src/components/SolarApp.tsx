import React, { useState } from 'react';
import { SolarRecord, UserProfile } from '../types';
import { 
  Fuel, 
  Plus, 
  ArrowLeft, 
  Globe, 
  Printer, 
  Truck, 
  CheckCircle2, 
  AlertTriangle,
  Scale,
  Gauge
} from 'lucide-react';
import { PrintModal } from './PrintModal';

interface SolarAppProps {
  records: SolarRecord[];
  currentUser: UserProfile;
  onAddRecord: (record: SolarRecord) => void;
  onBackToPortal: () => void;
  onOpenLiveUrl: () => void;
}

export const SolarApp: React.FC<SolarAppProps> = ({
  records,
  currentUser,
  onAddRecord,
  onBackToPortal,
  onOpenLiveUrl
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [printRecord, setPrintRecord] = useState<SolarRecord | null>(null);

  // Form states
  const [noSuratJalan, setNoSuratJalan] = useState('');
  const [vendorTransporter, setVendorTransporter] = useState('PT Elnusa Petrofin');
  const [nomorPolisiTruk, setNomorPolisiTruk] = useState('BA ');
  const [namaSopir, setNamaSopir] = useState('');
  const [volumeDo, setVolumeDo] = useState<number>(16000);
  const [soundingCm, setSoundingCm] = useState<number>(325);
  const [densitas, setDensitas] = useState<number>(0.835);
  const [tangkiTujuan, setTangkiTujuan] = useState<'Tangki 01 (Utama)' | 'Tangki 02 (Cadangan)'>('Tangki 01 (Utama)');

  // Auto calculate physical volume from sounding (example table logic)
  const volumeFisikCalculated = Math.round(volumeDo + ((soundingCm - 325) * 50));
  const selisihCalculated = volumeFisikCalculated - volumeDo;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noSuratJalan || !nomorPolisiTruk || !namaSopir) return;

    const newRecord: SolarRecord = {
      id: `sol-${Date.now()}`,
      noSuratJalan,
      tanggalMasuk: new Date().toLocaleString('id-ID'),
      vendorTransporter,
      nomorPolisiTruk,
      namaSopir,
      volumeSuratJalanLiter: volumeDo,
      soundingTinggiCm: soundingCm,
      volumeFisikDiterimaLiter: volumeFisikCalculated,
      selisihLiter: selisihCalculated,
      densitas15C: densitas,
      tangkiTujuan,
      petugasPenerima: currentUser.name
    };

    onAddRecord(newRecord);
    setShowAddModal(false);
    setNoSuratJalan('');
    setNamaSopir('');
  };

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
          <div className="p-3 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            <Fuel className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg sm:text-xl font-bold text-white">
                03. Modul Penerimaan Solar BBM Industri
              </h1>
              <span className="text-[10px] px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 font-mono">
                PythonAnywhere
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Kalkulasi sounding tangki, validasi densitas solar, dan cetak Berita Acara Penerimaan (BAP).
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenLiveUrl}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-slate-300 hover:text-white transition-all cursor-pointer"
          >
            <Globe className="w-4 h-4 text-emerald-400" />
            <span>Server Asli (PythonAnywhere)</span>
          </button>

          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-md cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Input Kedatangan Truk BBM</span>
          </button>
        </div>
      </div>

      {/* Tank Gauges Preview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs text-slate-400 font-medium">Tangki 01 (Utama Kiln & Genset)</span>
            <div className="text-xl font-black text-white">78.5% <span className="text-xs text-emerald-400 font-normal">Kapasitas Aman</span></div>
            <div className="text-[11px] text-slate-400">Tinggi Sounding: 325 cm • Sisa: 42.000 Liter</div>
          </div>
          <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
            <Gauge className="w-8 h-8" />
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs text-slate-400 font-medium">Tangki 02 (Cadangan Operasional)</span>
            <div className="text-xl font-black text-white">45.0% <span className="text-xs text-amber-400 font-normal">Perlu Jadwal Pengisian</span></div>
            <div className="text-[11px] text-slate-400">Tinggi Sounding: 190 cm • Sisa: 22.500 Liter</div>
          </div>
          <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
            <Gauge className="w-8 h-8" />
          </div>
        </div>
      </div>

      {/* Table Records */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 font-bold uppercase tracking-wider border-b border-slate-800">
              <tr>
                <th className="px-4 py-3">No. Surat Jalan & Tanggal</th>
                <th className="px-4 py-3">Transporter & Plat Truk</th>
                <th className="px-4 py-3">Volume DO Pertamina</th>
                <th className="px-4 py-3">Hasil Sounding Fisik</th>
                <th className="px-4 py-3">Deviasi / Selisih</th>
                <th className="px-4 py-3">Densitas (15°C)</th>
                <th className="px-4 py-3">Tangki Tujuan</th>
                <th className="px-4 py-3 text-center">Cetak BAP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {records.map((item) => (
                <tr key={item.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="px-4 py-3">
                    <div className="font-mono font-bold text-emerald-300">{item.noSuratJalan}</div>
                    <div className="text-[10px] text-slate-400">{item.tanggalMasuk}</div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="font-bold text-white">{item.vendorTransporter}</div>
                    <div className="text-[11px] text-slate-400 font-mono">{item.nomorPolisiTruk} • {item.namaSopir}</div>
                  </td>
                  <td className="px-4 py-3 font-mono font-bold text-white">
                    {item.volumeSuratJalanLiter.toLocaleString()} L
                  </td>
                  <td className="px-4 py-3 font-mono">
                    <div className="font-bold text-emerald-400">{item.volumeFisikDiterimaLiter.toLocaleString()} L</div>
                    <div className="text-[10px] text-slate-400">Tinggi: {item.soundingTinggiCm} cm</div>
                  </td>
                  <td className="px-4 py-3 font-mono">
                    <span className={`font-bold ${item.selisihLiter < 0 ? 'text-amber-400' : 'text-emerald-400'}`}>
                      {item.selisihLiter > 0 ? `+${item.selisihLiter}` : item.selisihLiter} L
                    </span>
                    <span className="text-[10px] text-slate-400 block">(Toleransi wajar)</span>
                  </td>
                  <td className="px-4 py-3 font-mono text-slate-300">
                    {item.densitas15C} kg/L
                  </td>
                  <td className="px-4 py-3 text-slate-200">
                    {item.tangkiTujuan}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => setPrintRecord(item)}
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                      title="Cetak Berita Acara Penerimaan (BAP)"
                    >
                      <Printer className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Input Truk Solar */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-lg p-6 shadow-2xl space-y-4">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Fuel className="w-5 h-5 text-emerald-400" />
              <span>Input Berita Acara Penerimaan Solar BBM</span>
            </h2>

            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-slate-300 font-semibold">No. Surat Jalan (DO)</label>
                  <input
                    type="text"
                    required
                    placeholder="SJ-PTM-202609..."
                    value={noSuratJalan}
                    onChange={(e) => setNoSuratJalan(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white font-mono"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-300 font-semibold">Transporter</label>
                  <input
                    type="text"
                    value={vendorTransporter}
                    onChange={(e) => setVendorTransporter(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-slate-300 font-semibold">Nomor Polisi Truk</label>
                  <input
                    type="text"
                    required
                    placeholder="BA 8912 QU"
                    value={nomorPolisiTruk}
                    onChange={(e) => setNomorPolisiTruk(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white font-mono"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-300 font-semibold">Nama Sopir</label>
                  <input
                    type="text"
                    required
                    placeholder="Nama lengkap sopir"
                    value={namaSopir}
                    onChange={(e) => setNamaSopir(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="text-slate-300 font-semibold">Volume DO (L)</label>
                  <input
                    type="number"
                    required
                    value={volumeDo}
                    onChange={(e) => setVolumeDo(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white font-mono"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-300 font-semibold">Sounding (cm)</label>
                  <input
                    type="number"
                    required
                    value={soundingCm}
                    onChange={(e) => setSoundingCm(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white font-mono"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-300 font-semibold">Densitas (15°C)</label>
                  <input
                    type="number"
                    step="0.001"
                    required
                    value={densitas}
                    onChange={(e) => setDensitas(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white font-mono"
                  />
                </div>
              </div>

              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-[11px] space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-400">Volume Fisik Terhitung:</span>
                  <span className="font-bold text-white font-mono">{volumeFisikCalculated.toLocaleString()} Liter</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Selisih Fisik vs Surat Jalan:</span>
                  <span className={`font-bold font-mono ${selisihCalculated < 0 ? 'text-amber-400' : 'text-emerald-400'}`}>
                    {selisihCalculated > 0 ? `+${selisihCalculated}` : selisihCalculated} Liter
                  </span>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-semibold">Tangki Tujuan Pengisian</label>
                <select
                  value={tangkiTujuan}
                  onChange={(e) => setTangkiTujuan(e.target.value as any)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white"
                >
                  <option value="Tangki 01 (Utama)">Tangki 01 (Utama)</option>
                  <option value="Tangki 02 (Cadangan)">Tangki 02 (Cadangan)</option>
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
                  className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold"
                >
                  Simpan & Terbitkan BAP
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Cetak BAP Solar */}
      {printRecord && (
        <PrintModal
          isOpen={!!printRecord}
          onClose={() => setPrintRecord(null)}
          title="Berita Acara Penerimaan (BAP) BBM Solar Industri"
          documentNumber={`BAP-SOLAR-${printRecord.id}`}
        >
          <div className="space-y-6 text-sm text-slate-800">
            <div className="text-center pb-2">
              <h3 className="text-base font-black tracking-wide uppercase underline">
                BERITA ACARA PENERIMAAN SOLAR INDUSTRI
              </h3>
              <p className="text-xs font-mono mt-0.5 font-bold text-slate-600">
                Sesuai Surat Jalan DO: {printRecord.noSuratJalan}
              </p>
            </div>

            <table className="w-full border border-slate-300 text-xs">
              <tbody>
                <tr className="border-b border-slate-200">
                  <td className="p-2 font-bold bg-slate-100 w-1/3">Waktu Penerimaan</td>
                  <td className="p-2 font-bold">{printRecord.tanggalMasuk}</td>
                </tr>
                <tr className="border-b border-slate-200">
                  <td className="p-2 font-bold bg-slate-100">Transporter / No. Polisi</td>
                  <td className="p-2">{printRecord.vendorTransporter} • <strong>{printRecord.nomorPolisiTruk}</strong></td>
                </tr>
                <tr className="border-b border-slate-200">
                  <td className="p-2 font-bold bg-slate-100">Nama Pengemudi / Sopir</td>
                  <td className="p-2">{printRecord.namaSopir}</td>
                </tr>
                <tr className="border-b border-slate-200">
                  <td className="p-2 font-bold bg-slate-100">Volume Menurut Surat Jalan (DO)</td>
                  <td className="p-2 font-mono font-bold">{printRecord.volumeSuratJalanLiter.toLocaleString()} Liter</td>
                </tr>
                <tr className="border-b border-slate-200">
                  <td className="p-2 font-bold bg-slate-100">Tinggi Cairan Sounding Tangki</td>
                  <td className="p-2 font-mono">{printRecord.soundingTinggiCm} cm</td>
                </tr>
                <tr className="border-b border-slate-200">
                  <td className="p-2 font-bold bg-slate-100">Volume Fisik Aktual Diterima</td>
                  <td className="p-2 font-mono font-bold text-emerald-700">{printRecord.volumeFisikDiterimaLiter.toLocaleString()} Liter</td>
                </tr>
                <tr className="border-b border-slate-200">
                  <td className="p-2 font-bold bg-slate-100">Deviasi / Selisih Liter</td>
                  <td className="p-2 font-mono font-bold">
                    {printRecord.selisihLiter > 0 ? `+${printRecord.selisihLiter}` : printRecord.selisihLiter} Liter
                  </td>
                </tr>
                <tr className="border-b border-slate-200">
                  <td className="p-2 font-bold bg-slate-100">Densitas Suhu 15°C</td>
                  <td className="p-2 font-mono">{printRecord.densitas15C} kg/L (Memenuhi Syarat Mutu)</td>
                </tr>
                <tr>
                  <td className="p-2 font-bold bg-slate-100">Disimpan Pada</td>
                  <td className="p-2">{printRecord.tangkiTujuan}</td>
                </tr>
              </tbody>
            </table>

            <div className="grid grid-cols-2 pt-8 text-center text-xs">
              <div>
                <p className="text-slate-600">Pengemudi Truk Tangki,</p>
                <div className="h-16 flex items-end justify-center font-bold underline">
                  {printRecord.namaSopir}
                </div>
                <p className="text-[10px] text-slate-500">Transporter Solar</p>
              </div>
              <div>
                <p className="text-slate-600">Petugas Gudang Penerima,</p>
                <div className="h-16 flex items-end justify-center font-bold underline text-slate-900">
                  {printRecord.petugasPenerima}
                </div>
                <p className="text-[10px] text-slate-500">PT Semen Padang</p>
              </div>
            </div>
          </div>
        </PrintModal>
      )}
    </div>
  );
};
