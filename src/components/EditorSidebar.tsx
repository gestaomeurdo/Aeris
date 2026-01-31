"use client";

import React, { useState } from 'react';
import { Settings, Save, ChevronRight, X, Play, FileText, Headphones } from 'lucide-react';
import { PortalData } from '@/types/portal';

interface EditorSidebarProps {
  data: PortalData;
  onUpdate: (data: PortalData) => void;
}

const EditorSidebar = ({ data, onUpdate }: EditorSidebarProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const updateGlobal = (key: keyof PortalData, value: any) => {
    onUpdate({ ...data, [key]: value });
  };

  const updateModule = (idx: number, field: string, value: any) => {
    const newModules = [...data.modules];
    (newModules[idx] as any)[field] = value;
    onUpdate({ ...data, modules: newModules });
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed right-0 top-1/2 -translate-y-1/2 z-[100] bg-[#00E5FF] text-black p-4 rounded-l-3xl shadow-[0_0_40px_rgba(0,229,255,0.4)] hover:pr-8 transition-all group"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Settings className="w-6 h-6 animate-spin-slow" />}
      </button>

      <div className={`fixed right-0 top-0 h-full w-96 bg-[#020617]/95 backdrop-blur-2xl border-l border-[#00E5FF]/10 z-[90] transition-transform duration-500 transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} overflow-y-auto custom-scrollbar shadow-2xl`}>
        <div className="p-10 space-y-12">
          <div className="space-y-2">
            <h3 className="text-2xl font-black text-white uppercase tracking-tighter">Command Center</h3>
            <p className="text-[10px] font-mono text-[#00E5FF] uppercase tracking-[0.4em]">Master Override Mode</p>
          </div>

          <div className="space-y-8">
            <div className="space-y-4">
              <label className="text-[9px] font-mono text-white/40 uppercase font-black tracking-widest">Main Operation Video</label>
              <input 
                value={data.mainVideo}
                onChange={(e) => updateGlobal('mainVideo', e.target.value)}
                placeholder="URL do Vídeo (mp4/youtube)"
                className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-xs text-white focus:border-[#00E5FF] outline-none transition-colors"
              />
            </div>

            <hr className="border-white/5" />

            <div className="space-y-6">
              <h4 className="text-[10px] font-black text-[#00E5FF] uppercase tracking-[0.4em]">Tactical Modules</h4>
              {data.modules.map((mod, idx) => (
                <div key={mod.id} className="p-6 bg-white/[0.02] border border-white/5 rounded-3xl space-y-4 hover:border-white/10 transition-colors">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-mono font-black text-white/20">{mod.id}</span>
                  </div>
                  <input 
                    value={mod.title}
                    onChange={(e) => updateModule(idx, 'title', e.target.value)}
                    placeholder="Título da Missão"
                    className="w-full bg-transparent text-sm font-bold text-white outline-none focus:text-[#00E5FF] transition-colors"
                  />
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-[9px] text-white/30 uppercase font-black">
                      <Headphones className="w-3 h-3" /> Audio URL
                    </div>
                    <input 
                      value={mod.audioUrl}
                      onChange={(e) => updateModule(idx, 'audioUrl', e.target.value)}
                      placeholder="Link do .mp3"
                      className="w-full bg-black/40 border border-white/5 rounded-xl p-3 text-[10px] text-white outline-none focus:border-[#00E5FF]/40"
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-[9px] text-white/30 uppercase font-black">
                      <FileText className="w-3 h-3" /> Document URL
                    </div>
                    <input 
                      value={mod.docUrl}
                      onChange={(e) => updateModule(idx, 'docUrl', e.target.value)}
                      placeholder="Link do PDF/Doc"
                      className="w-full bg-black/40 border border-white/5 rounded-xl p-3 text-[10px] text-white outline-none focus:border-[#00E5FF]/40"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button 
            onClick={() => {
              localStorage.setItem('aeris_data', JSON.stringify(data));
              alert('COMMITTED: Mission parameters updated in local matrix.');
            }}
            className="w-full py-5 bg-[#00E5FF] text-black font-black uppercase text-xs rounded-2xl shadow-[0_0_30px_rgba(0,229,255,0.2)] hover:scale-[1.02] transition-all flex items-center justify-center gap-3"
          >
            <Save className="w-4 h-4" />
            Save Configuration
          </button>
        </div>
      </div>
    </>
  );
};

export default EditorSidebar;