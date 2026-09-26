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
import { SpklApp } from './components/SpklApp';
import { IrGrApp } from './components/IrGrApp';
import { SolarApp } from './components/SolarApp';
import { MinMaxApp } from './components/MinMaxApp';
import { ArsipApp } from './components/ArsipApp';

export function App() {
  // App Navigation State
  const [currentApp, setCurrentApp] = useState<AppId>('portal');
  
  // App Mode: 'integrated' (built-in full feature & print PDF) vs 'embedded' (iframe to real server)
  const [viewMode, setViewMode] = useState<'integrated' | 'embedded'>('integrated');

  // User Authentication / Role State
  const [currentUser, setCurrentUser] = useState<UserProfile>(defaultUser);

  // Settings State for 5 Online URLs
  const [externalSettings, setExternalSettings] = useState<ExternalAppSettings>(defaultExternalSettings);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Centralized Application States
  const [spklList, setSpklList] = useState<SpklRecord[]>(initialSpklList);
  const [irgrList, setIrgrList] = useState<IrGrRecord[]>(initialIrGrList);
  const [solarList, setSolarList] = useState<SolarRecord[]>(initialSolarList);
  const [minmaxList, setMinmaxList] = useState<MinMaxItem[]>(initialMinMaxList);
  const [arsipList, setArsipList] = useState<ArsipRecord[]>(initialArsipList);

  // Handlers for SPKL
  const handleAddSpkl = (record: SpklRecord) => {
    setSpklList(prev => [record, ...prev]);
  };
  const handleApproveSpkl = (id: string, approverName: string) => {
    setSpklList(prev => prev.map(s => s.id === id ? { ...s, statusApproval: 'Disetujui', disetujuiOleh: approverName } : s));
  };
  const handleRejectSpkl = (id: string) => {
    setSpklList(prev => prev.map(s => s.id === id ? { ...s, statusApproval: 'Ditolak' } : s));
  };

  // Handlers for IR-GR
  const handleAddIrGr = (record: IrGrRecord) => {
    setIrgrList(prev => [record, ...prev]);
  };
  const handleUpdateGrStatus = (id: string, grNumber: string) => {
    setIrgrList(prev => prev.map(i => i.id === id ? { ...i, statusGr: 'GR Terbit (MIGO)', noGrSap: grNumber } : i));
  };

  // Handlers for Solar
  const handleAddSolar = (record: SolarRecord) => {
    setSolarList(prev => [record, ...prev]);
  };

  // Handlers for MinMax
  const handleAddMinMax = (item: MinMaxItem) => {
    setMinmaxList(prev => [item, ...prev]);
  };
  const handleUpdateStock = (id: string, newStock: number) => {
    setMinmaxList(prev => prev.map(m => {
      if (m.id === id) {
        let status: 'Aman' | 'Reorder Point' | 'Kritis (Di Bawah Min)' = 'Aman';
        if (newStock <= m.minStock) status = 'Kritis (Di Bawah Min)';
        else if (newStock <= m.reorderPoint) status = 'Reorder Point';
        return { ...m, stokFisik: newStock, statusPengadaan: status };
      }
      return m;
    }));
  };

  // Handlers for Arsip
  const handleAddArsip = (record: ArsipRecord) => {
    setArsipList(prev => [record, ...prev]);
  };

  // Role Switcher (Hamdi Ayussa as Manager vs Operational Staff)
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

  // Handler to switch app and default to integrated view
  const handleSelectApp = (app: AppId) => {
    setCurrentApp(app);
    setViewMode('integrated');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Header */}
      <PortalHeader
        currentApp={currentApp}
        onSelectApp={handleSelectApp}
        currentUser={currentUser}
        onChangeUser={handleChangeRole}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
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

        {/* 01. SPKL LEMBUR */}
        {currentApp === 'spkl' && (
          viewMode === 'embedded' ? (
            <EmbeddedAppViewer
              appId="spkl"
              title="Aplikasi SPKL Lembur Karyawan"
              subtitle="Server Online PythonAnywhere - PT Semen Padang"
              appUrl={externalSettings.spklUrl}
              serverPlatform="PythonAnywhere"
              currentUser={currentUser}
              onBackToPortal={() => setViewMode('integrated')}
              onOpenSettings={() => setIsSettingsOpen(true)}
            />
          ) : (
            <SpklApp
              records={spklList}
              currentUser={currentUser}
              onAddRecord={handleAddSpkl}
              onApproveRecord={handleApproveSpkl}
              onRejectRecord={handleRejectSpkl}
              onBackToPortal={() => setCurrentApp('portal')}
              onOpenLiveUrl={() => setViewMode('embedded')}
            />
          )
        )}

        {/* 02. ERP MONITORING IR-GR */}
        {currentApp === 'irgr' && (
          viewMode === 'embedded' ? (
            <EmbeddedAppViewer
              appId="irgr"
              title="Aplikasi ERP Monitoring IR - GR"
              subtitle="Server Online Streamlit Cloud - PT Semen Padang"
              appUrl={externalSettings.irgrUrl}
              serverPlatform="Streamlit"
              currentUser={currentUser}
              onBackToPortal={() => setViewMode('integrated')}
              onOpenSettings={() => setIsSettingsOpen(true)}
            />
          ) : (
            <IrGrApp
              records={irgrList}
              currentUser={currentUser}
              onAddRecord={handleAddIrGr}
              onUpdateGrStatus={handleUpdateGrStatus}
              onBackToPortal={() => setCurrentApp('portal')}
              onOpenLiveUrl={() => setViewMode('embedded')}
            />
          )
        )}

        {/* 03. PENERIMAAN SOLAR */}
        {currentApp === 'solar' && (
          viewMode === 'embedded' ? (
            <EmbeddedAppViewer
              appId="solar"
              title="Aplikasi Penerimaan Solar BBM"
              subtitle="Server Online PythonAnywhere - PT Semen Padang"
              appUrl={externalSettings.solarUrl}
              serverPlatform="PythonAnywhere"
              currentUser={currentUser}
              onBackToPortal={() => setViewMode('integrated')}
              onOpenSettings={() => setIsSettingsOpen(true)}
            />
          ) : (
            <SolarApp
              records={solarList}
              currentUser={currentUser}
              onAddRecord={handleAddSolar}
              onBackToPortal={() => setCurrentApp('portal')}
              onOpenLiveUrl={() => setViewMode('embedded')}
            />
          )
        )}

        {/* 04. MIN-MAX STOCK */}
        {currentApp === 'minmax' && (
          viewMode === 'embedded' ? (
            <EmbeddedAppViewer
              appId="minmax"
              title="Aplikasi MIN - MAX Stock Level"
              subtitle="Server Online GitHub Pages - PT Semen Padang"
              appUrl={externalSettings.minmaxUrl}
              serverPlatform="GitHub Pages"
              currentUser={currentUser}
              onBackToPortal={() => setViewMode('integrated')}
              onOpenSettings={() => setIsSettingsOpen(true)}
            />
          ) : (
            <MinMaxApp
              items={minmaxList}
              currentUser={currentUser}
              onAddItem={handleAddMinMax}
              onUpdateStock={handleUpdateStock}
              onBackToPortal={() => setCurrentApp('portal')}
              onOpenLiveUrl={() => setViewMode('embedded')}
            />
          )
        )}

        {/* 05. ARSIP GUDANG */}
        {currentApp === 'arsip' && (
          viewMode === 'embedded' ? (
            <EmbeddedAppViewer
              appId="arsip"
              title="Aplikasi Portal Arsip Gudang"
              subtitle="Server Online Vercel - PT Semen Padang"
              appUrl={externalSettings.arsipUrl}
              serverPlatform="Vercel"
              currentUser={currentUser}
              onBackToPortal={() => setViewMode('integrated')}
              onOpenSettings={() => setIsSettingsOpen(true)}
            />
          ) : (
            <ArsipApp
              records={arsipList}
              currentUser={currentUser}
              onAddRecord={handleAddArsip}
              onBackToPortal={() => setCurrentApp('portal')}
              onOpenLiveUrl={() => setViewMode('embedded')}
            />
          )
        )}
      </main>

      {/* Footer Branding */}
      <footer className="bg-slate-950 border-t border-slate-800/80 py-4 text-center text-xs text-slate-500 no-print">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>
            &copy; 2026 <strong>PT Semen Padang</strong> (SIG Group) — Departemen Logistik & Pengelolaan Pergudangan.
          </div>
          <div className="text-slate-400 font-mono text-[11px]">
            Master Portal v1.0 • 5 Aplikasi Terintegrasi
          </div>
        </div>
      </footer>

      {/* Settings Modal */}
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
