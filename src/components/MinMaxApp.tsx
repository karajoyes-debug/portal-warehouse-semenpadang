import React, { useState } from 'react';
import { MinMaxItem, UserProfile } from '../types';
import { 
  BarChart3, 
  Plus, 
  ArrowLeft, 
  Globe, 
  Search, 
  AlertTriangle, 
  CheckCircle2, 
  TrendingDown, 
  MapPin,
  Package
} from 'lucide-react';

interface MinMaxAppProps {
  items: MinMaxItem[];
  currentUser: UserProfile;
  onAddItem: (item: MinMaxItem) => void;
  onUpdateStock: (id: string, newStock: number) => void;
  onBackToPortal: () => void;
  onOpenLiveUrl: () => void;
}

export const MinMaxApp: React.FC<MinMaxAppProps> = ({
  items,
  currentUser,
  onAddItem,
  onUpdateStock,
  onBackToPortal,
  onOpenLiveUrl
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [showAddModal, setShowAddModal] = useState(false);

  // Form states
  const [kodeMaterial, setKodeMaterial] = useState('');
  const [namaMaterial, setNamaMaterial] = useState('');
  const [satuan, setSatuan] = useState('PCS');
  const [kategori, setKategori] = useState('Mechanical Spares');
  const [lokasiBin, setLokasiBin] = useState('RAK-');
  const [stokFisik, setStokFisik] = useState<number>(10);
  const [minStock, setMinStock] = useState<number>(5);
  const [maxStock, setMaxStock] = useState<number>(30);
  const [leadTimeHari, setLeadTimeHari] = useState<number>(14);

  const calculateStatus = (stok: number, min: number, rpoint: number): 'Aman' | 'Reorder Point' | 'Kritis (Di Bawah Min)' => {
    if (stok <= min) return 'Kritis (Di Bawah Min)';
    if (stok <= rpoint) return 'Reorder Point';
    return 'Aman';
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!kodeMaterial || !namaMaterial) return;

    const rPoint = Math.round(minStock + (minStock * 0.5));
    const status = calculateStatus(stokFisik, minStock, rPoint);

    const newItem: MinMaxItem = {
      id: `mm-${Date.now()}`,
      kodeMaterial,
      namaMaterial,
      satuan,
      kategori,
      lokasiBin,
      stokFisik,
      minStock,
      maxStock,
      reorderPoint: rPoint,
      leadTimeHari,
      statusPengadaan: status
    };

    onAddItem(newItem);
    setShowAddModal(false);
    setKodeMaterial('');
    setNamaMaterial('');
  };

  const filteredItems = items.filter(it => {
    const matchSearch = 
      it.namaMaterial.toLowerCase().includes(searchTerm.toLowerCase()) ||
      it.kodeMaterial.toLowerCase().includes(searchTerm.toLowerCase()) ||
      it.lokasiBin.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filterCategory === 'All') return matchSearch;
    return matchSearch && it.statusPengadaan === filterCategory;
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
          <div className="p-3 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/30">
            <BarChart3 className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg sm:text-xl font-bold text-white">
                04. Modul MIN - MAX Stock Level Warehouse
              </h1>
              <span className="text-[10px] px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 font-mono">
                GitHub Pages
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Pengendalian safety stock, reorder point (ROP), dan pencegahan shutdown pabrik akibat kekosongan suku cadang.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenLiveUrl}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-slate-300 hover:text-white transition-all cursor-pointer"
          >
            <Globe className="w-4 h-4 text-purple-400" />
            <span>Server Asli (GitHub Pages)</span>
          </button>

          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-all shadow-md cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Master Material</span>
          </button>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Cari kode material, nama, lokasi..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
          {['All', 'Kritis (Di Bawah Min)', 'Reorder Point', 'Aman'].map(tab => (
            <button
              key={tab}
              onClick={() => setFilterCategory(tab)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                filterCategory === tab
                  ? 'bg-purple-600 text-white'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {tab === 'All' ? 'Semua Status' : tab}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Material Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredItems.map((item) => {
          const isCritical = item.stokFisik <= item.minStock;
          const isRop = item.stokFisik > item.minStock && item.stokFisik <= item.reorderPoint;

          return (
            <div 
              key={item.id}
              className={`p-4 rounded-2xl bg-slate-900 border transition-all ${
                isCritical 
                  ? 'border-rose-500/60 shadow-lg shadow-rose-950/20' 
                  : isRop 
                  ? 'border-amber-500/50' 
                  : 'border-slate-800'
              }`}
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 text-slate-300 border border-slate-800">
                    {item.kodeMaterial}
                  </span>
                  <h3 className="text-sm font-bold text-white mt-1 line-clamp-1">{item.namaMaterial}</h3>
                  <div className="text-[11px] text-slate-400 flex items-center gap-1.5 mt-0.5">
                    <MapPin className="w-3 h-3 text-amber-400" />
                    <span>Lokasi: <strong className="text-slate-200">{item.lokasiBin}</strong></span>
                  </div>
                </div>

                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                  isCritical 
                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40' 
                    : isRop 
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' 
                    : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                }`}>
                  {item.statusPengadaan}
                </span>
              </div>

              {/* Progress Level Bar */}
              <div className="space-y-1.5 my-3">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Stok Fisik Saat Ini:</span>
                  <span className="font-bold text-white font-mono">{item.stokFisik} {item.satuan}</span>
                </div>
                <div className="w-full bg-slate-950 h-2.5 rounded-full overflow-hidden flex border border-slate-800">
                  <div 
                    style={{ width: `${Math.min(100, (item.stokFisik / item.maxStock) * 100)}%` }}
                    className={`h-full ${isCritical ? 'bg-rose-500' : isRop ? 'bg-amber-500' : 'bg-emerald-500'}`}
                  />
                </div>
                <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                  <span>Min: {item.minStock}</span>
                  <span>ROP: {item.reorderPoint}</span>
                  <span>Max: {item.maxStock} {item.satuan}</span>
                </div>
              </div>

              {/* Adjust Stock buttons */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs">
                <span className="text-[11px] text-slate-400">Lead Time: {item.leadTimeHari} Hari</span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => onUpdateStock(item.id, Math.max(0, item.stokFisik - 1))}
                    className="w-7 h-7 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold flex items-center justify-center cursor-pointer"
                    title="Keluarkan 1 Barang"
                  >
                    -
                  </button>
                  <button
                    onClick={() => onUpdateStock(item.id, item.stokFisik + 1)}
                    className="w-7 h-7 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold flex items-center justify-center cursor-pointer"
                    title="Terima 1 Barang"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal Tambah Material */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-md p-6 shadow-2xl space-y-4">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Package className="w-5 h-5 text-purple-400" />
              <span>Tambah Master Item MIN - MAX</span>
            </h2>

            <form onSubmit={handleAddSubmit} className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="text-slate-300 font-semibold">Kode Material SAP</label>
                <input
                  type="text"
                  required
                  placeholder="MAT-100XXXX"
                  value={kodeMaterial}
                  onChange={(e) => setKodeMaterial(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-semibold">Nama Material & Spesifikasi</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Bearing SKF Deep Groove 6312"
                  value={namaMaterial}
                  onChange={(e) => setNamaMaterial(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-slate-300 font-semibold">Kategori</label>
                  <select
                    value={kategori}
                    onChange={(e) => setKategori(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white"
                  >
                    <option value="Mechanical Spares">Mechanical Spares</option>
                    <option value="Electrical Spares">Electrical Spares</option>
                    <option value="Pelumas & Kimia">Pelumas & Kimia</option>
                    <option value="Filtration">Filtration</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-slate-300 font-semibold">Lokasi Bin Rak</label>
                  <input
                    type="text"
                    required
                    placeholder="RAK-B04-02"
                    value={lokasiBin}
                    onChange={(e) => setLokasiBin(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="text-slate-300 font-semibold">Stok Fisik</label>
                  <input
                    type="number"
                    min="0"
                    required
                    value={stokFisik}
                    onChange={(e) => setStokFisik(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white font-mono"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-300 font-semibold">Min Stock</label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={minStock}
                    onChange={(e) => setMinStock(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white font-mono"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-300 font-semibold">Max Stock</label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={maxStock}
                    onChange={(e) => setMaxStock(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white font-mono"
                  />
                </div>
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
                  className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-bold"
                >
                  Simpan Material
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
