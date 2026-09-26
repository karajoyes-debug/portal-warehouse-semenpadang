import React from 'react';
import { X, Printer, FileText, CheckCircle2 } from 'lucide-react';

interface PrintModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  documentNumber: string;
  children: React.ReactNode;
}

export const PrintModal: React.FC<PrintModalProps> = ({
  isOpen,
  onClose,
  title,
  documentNumber,
  children
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="px-5 py-3.5 border-b border-slate-800 flex items-center justify-between no-print">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white">{title}</h2>
              <p className="text-[11px] text-slate-400 font-mono">No: {documentNumber}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white text-xs font-bold transition-all shadow-md cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Cetak Dokumen (PDF)</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Printable Content Sheet */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 bg-slate-950">
          <div className="bg-white text-slate-900 p-6 sm:p-8 rounded-xl shadow-lg border border-slate-200 max-w-3xl mx-auto print:m-0 print:p-0 print:border-none print:shadow-none">
            {/* Header Kop Surat Resmi PT Semen Padang */}
            <div className="border-b-2 border-slate-900 pb-4 mb-6 flex items-start justify-between">
              <div>
                <div className="text-lg font-black tracking-wider text-red-600 uppercase">
                  PT SEMEN PADANG
                </div>
                <div className="text-xs font-bold text-slate-800 uppercase tracking-wide">
                  Departemen Logistik & Pengelolaan Pergudangan
                </div>
                <div className="text-[10px] text-slate-600">
                  Indarung, Padang 25237, Sumatera Barat - Indonesia
                </div>
              </div>
              <div className="text-right">
                <span className="inline-block text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-300 font-bold uppercase">
                  Dokumen Resmi Sistem
                </span>
                <div className="text-[10px] text-slate-500 mt-1">Dicetak: {new Date().toLocaleDateString('id-ID')}</div>
              </div>
            </div>

            {/* Inner Content */}
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
