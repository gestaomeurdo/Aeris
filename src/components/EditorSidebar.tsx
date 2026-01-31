"use client";

import React, { useState } from 'react';
import { Settings, Save, RotateCcw, Plus, Trash2, ChevronRight, ChevronLeft } from 'lucide-react';
import { PortalData } from '@/types/portal';

interface EditorSidebarProps {
  data: PortalData;
  onUpdate: (data: PortalData) => void;
}

const EditorSidebar = ({ data, onUpdate }: EditorSidebarProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (path: string, value: any) => {
    const newData = { ...data };
    const keys = path.split('.');
    let current: any = newData;
    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]];
    }
    current[keys[keys.length - 1]] = value;
    onUpdate(newData);
  };

  return (
    <>
      {/* Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed right-0 top-1/2 -translate-y-1/2 z-[60] bg-[#00E5FF] text-black p-3 rounded-l-2xl shadow-[0_0_20px_rgba(0,229,255,0.4)] hover:pr-6 transition-all"
      >
        {isOpen ? <ChevronRight className="w-5 h-5" /> : <Settings className="w-5 h-5 animate-spin-slow" />}
      </button>

      {/* Sidebar Panel */}
      <div className={`fixed right-0 top-0 h-full w-80 md:w-96 bg-[#020617] border-l border-white/10 z-[55] transition-transform duration-500 transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} overflow-y-auto custom-scrollbar`}>
        <div className="p-8 space-y-10">
          <div className="space-y-2">
            <h3 className="text-xl font-black text-white uppercase tracking-tighter">Command Override</h3>
            <p className="text-[10px] font-mono text-white/30 uppercase tracking-widest">Master Editor Mode</p>
          </div>

          {/* Mission Settings */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-1 h-4 bg-[#00E5FF]" />
              <h4 className="text-[11px] font-bold text-white/60 uppercase tracking-widest">Mission Config</h4>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[9px] font-mono text-white/20 uppercase font-black">Video URL (YouTube Embed)</label>
                <input 
                  type="text" 
                  value={data.videoUrl}
                  onChange={(e) => handleChange('videoUrl', e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-xs text-white focus:border-[#00E5FF]/40 outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[9px] font-mono text-white/20 uppercase font-black">Mission Title</label>
                <input 
                  type="text" 
                  value={data.missionTitle}
                  onChange={(e) => handleChange('missionTitle', e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-xs text-white focus:border-[#00E5FF]/40 outline-none"
                />
              </div>
            </div>
          </div>

          {/* Audio Tracks */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-1 h-4 bg-[#6366F1]" />
                <h4 className="text-[11px] font-bold text-white/60 uppercase tracking-widest">Audio Hub</h4>
              </div>
            </div>
            
            <div className="space-y-4">
              {data.audioTracks.map((track, idx) => (
                <div key={track.id} className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl space-y-3">
                  <input 
                    type="text" 
                    value={track.title}
                    onChange={(e) => {
                      const newTracks = [...data.audioTracks];
                      newTracks[idx].title = e.target.value;
                      handleChange('audioTracks', newTracks);
                    }}
                    className="w-full bg-transparent text-xs text-white font-bold outline-none"
                    placeholder="Track Title"
                  />
                  <input 
                    type="text" 
                    value={track.url}
                    onChange={(e) => {
                      const newTracks = [...data.audioTracks];
                      newTracks[idx].url = e.target.value;
                      handleChange('audioTracks', newTracks);
                    }}
                    className="w-full bg-black/20 text-[9px] text-[#00E5FF] p-2 rounded-lg outline-none"
                    placeholder="MP3/Audio URL"
                  />
                </div>
              ))}
            </div>
          </div>

          <button 
            onClick={() => {
              localStorage.setItem('aeris_portal_data', JSON.stringify(data));
              alert('Configurações salvas no sistema local!');
            }}
            className="w-full py-4 bg-[#00E5FF] text-black font-black uppercase text-[11px] rounded-2xl flex items-center justify-center gap-3 hover:shadow-[0_0_30px_rgba(0,229,255,0.3)] transition-all"
          >
            <Save className="w-4 h-4" />
            Commit Changes
          </button>
        </div>
      </div>
    </>
  );
};

export default EditorSidebar;