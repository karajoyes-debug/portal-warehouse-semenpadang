import React, { useState } from 'react';
import { ExternalAppSettings } from '../types';
import { 
  X, 
  Save, 
  RotateCcw, 
  Server, 
  Globe, 
  FileText, 
  Boxes, 
  Fuel, 
  BarChart3, 
  Archive,
  CheckCircle2
} from 'lucide-react';
import { defaultExternalSettings } from '../mockData';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: ExternalAppSettings;
  onSave: (newSettings: ExternalAppSettings) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  settings,
  onSave
}) => {
  const [formData, setFormData] = useState<ExternalAppSettings>(settings);
  const [savedAlert, setSavedAlert] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleChange = (key: keyof ExternalAppSettings, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleReset = () => {
    setFormData(defaultExternalSettings);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    setSavedAlert(true);
    setTimeout(() => {
      setSavedAlert(false);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-red-600/20 text-red-400 border border-red-500/30">
              <Server className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">
                Konfigurasi URL 5 Aplikasi Terpadu
              </h2>
              <p className="text-xs text-slate-400">
                Atur alamat server online (PythonAnywhere, Streamlit, GitHub Pages, Vercel)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto flex-1">
          {savedAlert && (
            <div className="p-3 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>URL Aplikasi berhasil diperbarui dan disimpan!</span>
            </div>
          )}

          {/* App 1: SPKL */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-200 flex items-center gap-2">
              <FileText className="w-4 h-4 text-amber-400" />
              <span>01. Aplikasi SPKL (PythonAnywhere)</span>
            </label>
            <input
              type="url"
              value={formData.spklUrl}
              onChange={(e) => handleChange('spklUrl', e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-100 font-mono focus:border-amber-500 focus:outline-none"
              placeholder="https://spklembur.pythonanywhere.com/"
              required
            />
          </div>

          {/* App 2: IR-GR */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-200 flex items-center gap-2">
              <Boxes className="w-4 h-4 text-cyan-400" />
              <span>02. Aplikasi ERP Monitoring IR - GR (Streamlit)</span>
            </label>
            <input
              type="url"
              value={formData.irgrUrl}
              onChange={(e) => handleChange('irgrUrl', e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-100 font-mono focus:border-cyan-500 focus:outline-none"
              placeholder="https://monitoringirgrpenerimaan-ptsemenpadang.streamlit.app/"
              required
            />
          </div>

          {/* App 3: Solar */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-200 flex items-center gap-2">
              <Fuel className="w-4 h-4 text-emerald-400" />
              <span>03. Aplikasi Penerimaan Solar BBM (PythonAnywhere)</span>
            </label>
            <input
              type="url"
              value={formData.solarUrl}
              onChange={(e) => handleChange('solarUrl', e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-100 font-mono focus:border-emerald-500 focus:outline-none"
              placeholder="https://penerimaansolar.pythonanywhere.com/"
              required
            />
          </div>

          {/* App 4: MinMax */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-200 flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-purple-400" />
              <span>04. Aplikasi MIN - MAX Stock (GitHub Pages)</span>
            </label>
            <input
              type="url"
              value={formData.minmaxUrl}
              onChange={(e) => handleChange('minmaxUrl', e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-100 font-mono focus:border-purple-500 focus:outline-none"
              placeholder="https://karajoyes-debug.github.io/min-max-stock-level-warehouse-pt-semen-padang/"
              required
            />
          </div>

          {/* App 5: Arsip */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-200 flex items-center gap-2">
              <Archive className="w-4 h-4 text-rose-400" />
              <span>05. Aplikasi Arsip Gudang (Vercel)</span>
            </label>
            <input
              type="url"
              value={formData.arsipUrl}
              onChange={(e) => handleChange('arsipUrl', e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-100 font-mono focus:border-rose-500 focus:outline-none"
              placeholder="https://portal-arsip-gudang-pt-semen-padang-seven.vercel.app/"
              required
            />
          </div>
        </form>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
          <button
            type="button"
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-700 hover:bg-slate-800 text-xs text-slate-300 font-medium transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Kembalikan Default</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition-colors cursor-pointer"
            >
              Batal
            </button>
            <button
              onClick={handleSubmit}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-xs font-bold text-white transition-colors shadow-md cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Simpan Perubahan</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
