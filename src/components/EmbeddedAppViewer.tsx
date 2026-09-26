import React, { useState } from 'react';
import { 
  ExternalLink, 
  RefreshCw, 
  Maximize2, 
  ArrowLeft, 
  AlertCircle, 
  CheckCircle2, 
  ShieldCheck, 
  Lock,
  Server
} from 'lucide-react';
import { AppId, UserProfile } from '../types';

interface EmbeddedAppViewerProps {
  appId: AppId;
  title: string;
  subtitle: string;
  appUrl: string;
  serverPlatform: 'Streamlit' | 'PythonAnywhere' | 'GitHub Pages' | 'Vercel';
  currentUser: UserProfile;
  onBackToPortal: () => void;
  onOpenSettings: () => void;
}

export const EmbeddedAppViewer: React.FC<EmbeddedAppViewerProps> = ({
  appId,
  title,
  subtitle,
  appUrl,
  serverPlatform,
  currentUser,
  onBackToPortal,
  onOpenSettings
}) => {
  const [iframeKey, setIframeKey] = useState<number>(Date.now());
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleRefresh = () => {
    setIsLoading(true);
    setIframeKey(Date.now());
  };

  const platformBadgeColor = {
    Streamlit: 'bg-red-500/20 text-red-300 border-red-500/40',
    PythonAnywhere: 'bg-blue-500/20 text-blue-300 border-blue-500/40',
    'GitHub Pages': 'bg-purple-500/20 text-purple-300 border-purple-500/40',
    Vercel: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
  }[serverPlatform];

  return (
    <div className="flex flex-col h-[calc(100vh-105px)] bg-slate-950">
      {/* Top Viewer Control Bar */}
      <div className="bg-slate-900 border-b border-slate-800 px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 shrink-0">
        {/* Left: Back button & Title */}
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToPortal}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Portal</span>
          </button>

          <div className="border-l border-slate-700 pl-3">
            <div className="flex items-center gap-2">
              <h1 className="text-sm font-bold text-white truncate max-w-md">
                {title}
              </h1>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase ${platformBadgeColor}`}>
                {serverPlatform}
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              {subtitle}
            </p>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          {/* SSO / Master Key indicator */}
          <div className="hidden md:flex items-center gap-1 px-2.5 py-1 rounded bg-amber-500/10 border border-amber-500/30 text-[11px] text-amber-300">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
            <span>Akses Eksekutif Aktif: <strong>{currentUser.name}</strong></span>
          </div>

          <button
            onClick={handleRefresh}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
            title="Muat Ulang Layar"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin text-amber-400' : ''}`} />
          </button>

          {/* Direct Open in New Tab */}
          <a
            href={appUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white text-xs font-semibold transition-colors shadow-sm"
          >
            <span>Buka Tab Baru</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Info notice bar */}
      <div className="bg-slate-900/60 border-b border-slate-800/80 px-4 py-1.5 flex items-center justify-between text-[11px] text-slate-400">
        <div className="flex items-center gap-2 truncate">
          <Server className="w-3.5 h-3.5 text-blue-400 shrink-0" />
          <span className="truncate">URL Langsung: <span className="font-mono text-slate-300">{appUrl}</span></span>
        </div>
        <button
          onClick={onOpenSettings}
          className="text-amber-400 hover:underline shrink-0 pl-2"
        >
          Ubah URL Target
        </button>
      </div>

      {/* Embedded Iframe Container */}
      <div className="relative flex-1 w-full bg-slate-900 overflow-hidden">
        {isLoading && (
          <div className="absolute inset-0 z-10 bg-slate-950/80 backdrop-blur-xs flex flex-col items-center justify-center gap-3">
            <div className="w-10 h-10 border-4 border-amber-500/30 border-t-amber-500 rounded-full animate-spin" />
            <div className="text-center">
              <p className="text-sm font-bold text-white">Menghubungkan ke server {serverPlatform}...</p>
              <p className="text-xs text-slate-400 mt-1">Mengamankan sesi autentikasi PT Semen Padang</p>
            </div>
          </div>
        )}

        <iframe
          key={iframeKey}
          src={appUrl}
          title={title}
          className="w-full h-full border-none"
          onLoad={() => setIsLoading(false)}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-modals allow-downloads"
        />
      </div>
    </div>
  );
};
