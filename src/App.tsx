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
} from './types';
import { 
  defaultUser, 
  defaultExternalSettings,
  initialSpklList,
  initialIrGrList,
  initialSolarList,
  initialMinMaxList,
  initialArsipList
} from './mockData';

import { PortalHeader } from './components/PortalHeader';
import { PortalHome } from './components/PortalHome';
import { EmbeddedAppViewer } from './components/EmbeddedAppViewer';
import { SettingsModal } from './components/SettingsModal';

export function App() {
  // App Navigation State - Default ke portal overview
  const [currentApp, setCurrentApp] = useState<AppId>('portal');

  // User Authentication / Role State
  const [currentUser, setCurrentUser] = useState<UserProfile>(defaultUser);

  // Settings State for 5 Online URLs (Streamlit, PythonAnywhere, GitHub Pages, Vercel)
  const [externalSettings, setExternalSettings] = useState<ExternalAppSettings>(defaultExternalSettings);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Centralized Application Data (untuk KPI dashboard eksekutif di beranda)
  const [spklList] = useState<SpklRecord[]>(initialSpklList);
  const [irgrList] = useState<IrGrRecord[]>(initialIrGrList);
  const [solarList] = useState<SolarRecord[]>(initialSolarList);
  const [minmaxList] = useState<MinMaxItem[]>(initialMinMaxList);
  const [arsipList] = useState<ArsipRecord[]>(initialArsipList);

  // Role Switcher (Hamdi Ayussa as Manager vs Staf)
  const handleChangeRole = (role: 'manager' | 'staff') => {
    if (role === 'manager') {
      setCurrentUser({
        id: 'usr-001',
        name: 'Hamdi Ayussa',
        username: 'hamdi',
        role: 'manager',
        unit: 'Unit Gudang & Logistik',
        avatar: 'HA'
      });
    } else {
      setCurrentUser({
        id: 'usr-002',
        name: 'Staf Lapangan Gudang',
        username: 'staf_gudang',
        role: 'staff',
        unit: 'Pelaksana Operasional',
        avatar: 'SG'
      });
    }
  };

  // Navigasi langsung ke aplikasi target
  const handleSelectApp = (app: AppId) => {
    setCurrentApp(app);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Header Terpadu */}
      <PortalHeader
        currentApp={currentApp}
        onSelectApp={handleSelectApp}
        currentUser={currentUser}
        onChangeUser={handleChangeRole}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />

      {/* Main Content Area: Langsung Menampilkan Aplikasi Asli Sesuai Pilihan */}
      <main className="flex-1">
        {/* BERANDA PORTAL EKSEKUTIF */}
        {currentApp === 'portal' && (
          <PortalHome
            onSelectApp={handleSelectApp}
            currentUser={currentUser}
            spklList={spklList}
            irgrList={irgrList}
            solarList={solarList}
            minmaxList={minmaxList}
            arsipList={arsipList}
            externalSettings={externalSettings}
            onOpenSettings={() => setIsSettingsOpen(true)}
          />
        )}

        {/* 01. SPKL LEMBUR (Langsung Dasbor PythonAnywhere Asli) */}
        {currentApp === 'spkl' && (
          <EmbeddedAppViewer
            appId="spkl"
            title="01. Dashboard Aplikasi SPKL Lembur Karyawan"
            subtitle="Pemantauan pengajuan lembur, jam kerja bawahan, dan download dokumen lembur resmi"
            appUrl={externalSettings.spklUrl}
            serverPlatform="PythonAnywhere"
            currentUser={currentUser}
            onBackToPortal={() => setCurrentApp('portal')}
            onOpenSettings={() => setIsSettingsOpen(true)}
          />
        )}

        {/* 02. ERP MONITORING IR-GR (Langsung Dasbor Streamlit Asli) */}
        {currentApp === 'irgr' && (
          <EmbeddedAppViewer
            appId="irgr"
            title="02. Dashboard Monitoring ERP IR - GR"
            subtitle="Pemantauan alur PO, inspeksi QC bawahan, status MIGO GR SAP, dan performa lead time"
            appUrl={externalSettings.irgrUrl}
            serverPlatform="Streamlit"
            currentUser={currentUser}
            onBackToPortal={() => setCurrentApp('portal')}
            onOpenSettings={() => setIsSettingsOpen(true)}
          />
        )}

        {/* 03. PENERIMAAN SOLAR (Langsung Dasbor PythonAnywhere Asli) */}
        {currentApp === 'solar' && (
          <EmbeddedAppViewer
            appId="solar"
            title="03. Dashboard Penerimaan Solar BBM Industri"
            subtitle="Level tangki BBM, deviasi sounding DO Pertamina, riwayat logistik, dan cetak BAP"
            appUrl={externalSettings.solarUrl}
            serverPlatform="PythonAnywhere"
            currentUser={currentUser}
            onBackToPortal={() => setCurrentApp('portal')}
            onOpenSettings={() => setIsSettingsOpen(true)}
          />
        )}

        {/* 04. MIN-MAX STOCK (Langsung Dasbor GitHub Pages Asli) */}
        {currentApp === 'minmax' && (
          <EmbeddedAppViewer
            appId="minmax"
            title="04. Dashboard MIN - MAX Stock Level"
            subtitle="Monitoring stok kritis suku cadang pabrik, safety stock, dan pencegahan kekosongan material"
            appUrl={externalSettings.minmaxUrl}
            serverPlatform="GitHub Pages"
            currentUser={currentUser}
            onBackToPortal={() => setCurrentApp('portal')}
            onOpenSettings={() => setIsSettingsOpen(true)}
          />
        )}

        {/* 05. ARSIP GUDANG (Langsung Dasbor Vercel Asli) */}
        {currentApp === 'arsip' && (
          <EmbeddedAppViewer
            appId="arsip"
            title="05. Dashboard Portal Arsip Gudang Terpadu"
            subtitle="Pencarian berkas fisik ordner lemari serta unduh langsung file scan PDF dokumen gudang"
            appUrl={externalSettings.arsipUrl}
            serverPlatform="Vercel"
            currentUser={currentUser}
            onBackToPortal={() => setCurrentApp('portal')}
            onOpenSettings={() => setIsSettingsOpen(true)}
          />
        )}
      </main>

      {/* Footer Branding */}
      <footer className="bg-slate-950 border-t border-slate-800/80 py-3 text-center text-xs text-slate-500 no-print">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>
            &copy; 2026 <strong>PT Semen Padang</strong> (SIG Group) — Departemen Logistik & Pengelolaan Pergudangan.
          </div>
          <div className="text-slate-400 font-mono text-[11px]">
            Master Executive Portal • Terkoneksi 5 Server Aktif
          </div>
        </div>
      </footer>

      {/* Modal Pengaturan Link Target */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={externalSettings}
        onSave={(newSettings) => setExternalSettings(newSettings)}
      />
    </div>
  );
}

export default App;
