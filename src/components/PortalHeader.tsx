import React from 'react';
import { AppId, UserProfile } from '../types';
import { 
  Building2, 
  Home, 
  FileText, 
  Boxes, 
  Fuel, 
  BarChart3, 
  Archive, 
  SlidersHorizontal,
  ExternalLink,
  ShieldCheck,
  UserCheck
} from 'lucide-react';

interface PortalHeaderProps {
  currentApp: AppId;
  onSelectApp: (app: AppId) => void;
  currentUser: UserProfile;
  onChangeUser: (role: 'manager' | 'staff') => void;
  onOpenSettings: () => void;
}

export const PortalHeader: React.FC<PortalHeaderProps> = ({
  currentApp,
  onSelectApp,
  currentUser,
  onChangeUser,
  onOpenSettings,
}) => {
  const navItems = [
    { id: 'portal' as AppId, label: 'Portal Utama', icon: <Home className="w-4 h-4" /> },
    { id: 'spkl' as AppId, label: '01. SPKL Lembur', icon: <FileText className="w-4 h-4" /> },
    { id: 'irgr' as AppId, label: '02. ERP IR-GR', icon: <Boxes className="w-4 h-4" /> },
    { id: 'solar' as AppId, label: '03. Penerimaan Solar', icon: <Fuel className="w-4 h-4" /> },
    { id: 'minmax' as AppId, label: '04. MIN-MAX Stock', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'arsip' as AppId, label: '05. Arsip Gudang', icon: <Archive className="w-4 h-4" /> },
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-white">
      {/* Top Bar: Brand, Identity, User Role Switcher */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between gap-4">
        {/* Logo & Corporate Identity */}
        <div 
          onClick={() => onSelectApp('portal')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-600 to-amber-600 flex items-center justify-center font-bold text-white shadow-lg shadow-red-950/40 group-hover:scale-105 transition-transform">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold tracking-wider text-base sm:text-lg text-white">
                PT SEMEN PADANG
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-red-600/30 text-red-300 border border-red-500/30 uppercase">
                SIG Group
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium">
              Portal Terpadu Warehouse & Logistik Eksekutif
            </p>
          </div>
        </div>

        {/* User Status & Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Role Switcher for Boss / Staff */}
          <div className="hidden sm:flex items-center bg-slate-950 border border-slate-800 rounded-lg p-1 text-xs">
            <button
              onClick={() => onChangeUser('manager')}
              className={`px-2.5 py-1 rounded font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                currentUser.role === 'manager' 
                  ? 'bg-amber-500 text-slate-950 shadow-sm' 
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Akun Manager (Hamdi Ayussa / Yan Tanamal - Berhak Approval)"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Boss / Manager</span>
            </button>
            <button
              onClick={() => onChangeUser('staff')}
              className={`px-2.5 py-1 rounded font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                currentUser.role === 'staff' 
                  ? 'bg-blue-600 text-white shadow-sm' 
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Akun Petugas Operasional Gudang"
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Staf Gudang</span>
            </button>
          </div>

          {/* User Badge Info */}
          <div className="flex items-center gap-2 pl-2 border-l border-slate-800">
            <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-xs text-amber-400">
              {currentUser.avatar || currentUser.name.charAt(0)}
            </div>
            <div className="hidden md:block text-left text-xs">
              <div className="font-bold text-white truncate max-w-[130px]">{currentUser.name}</div>
              <div className="text-[10px] text-slate-400">{currentUser.role === 'manager' ? 'Kepala Unit / Manager' : 'Pelaksana Gudang'}</div>
            </div>
          </div>

          {/* Settings Modal Button */}
          <button
            onClick={onOpenSettings}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
            title="Pengaturan URL 5 Aplikasi Online"
          >
            <SlidersHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Navigation Sub-Bar (5 Integrated Apps Tab) */}
      <nav className="bg-slate-950/80 border-t border-slate-800/80 overflow-x-auto scrollbar-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-1 py-1.5 min-w-max">
          {navItems.map((item) => {
            const isActive = currentApp === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectApp(item.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-red-700 text-white shadow-md shadow-red-950/50'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </header>
  );
};
