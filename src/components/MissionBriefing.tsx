"use client";

import React from 'react';
import { Activity, Settings2, AlignLeft } from 'lucide-react';

interface MissionBriefingProps {
  title: string;
  videoUrl: string;
  description: string;
  onEdit?: () => void;
}

const MissionBriefing = ({ title, videoUrl, description, onEdit }: MissionBriefingProps) => {
  const getEmbedUrl = (url: string) => {
    if (!url) return "";
    let id = "";
    if (url.includes('youtu.be/')) id = url.split('youtu.be/')[1].split(/[?#]/)[0];
    else if (url.includes('watch?v=')) id = url.split('v=')[1].split(/[&?#]/)[0];
    if (id) return `https://www.youtube.com/embed/${id}?autoplay=0&rel=0&modestbranding=1`;
    return url;
  };

  const embedUrl = getEmbedUrl(videoUrl);

  return (
    <section className="relative space-y-8 md:space-y-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 px-2">
        <div className="space-y-2 max-w-3xl">
          <div className="flex items-center gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
            <span className="text-[9px] md:text-[10px] font-mono font-black text-[#00E5FF] uppercase tracking-[0.3em]">Live Feed</span>
          </div>
          <h2 className="text-3xl md:text-7xl font-black text-white tracking-tighter uppercase leading-tight">
            {title.split(' ')[0]} <span className="text-white/40 font-light">{title.split(' ').slice(1).join(' ')}</span>
          </h2>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          {onEdit && (
            <button onClick={onEdit} className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-white/[0.03] border border-white/10 px-4 py-2 rounded-xl text-white/60 hover:text-[#00E5FF] transition-all">
              <Settings2 className="w-4 h-4" />
              <span className="text-[9px] font-mono font-bold uppercase">EDIT</span>
            </button>
          )}
          <div className="hidden md:flex items-center gap-4 bg-white/[0.03] border border-white/10 px-6 py-3 rounded-xl">
            <Activity className="w-4 h-4 text-[#00E5FF]" />
            <span className="text-[11px] font-mono font-bold text-white/80 uppercase">Encrypted</span>
          </div>
        </div>
      </div>

      {/* Descrição movida para cima do vídeo */}
      <div className="px-2">
        <div className="bg-white/[0.02] backdrop-blur-xl border border-white/10 p-5 md:p-8 rounded-3xl max-w-4xl">
          <div className="flex items-center gap-2 mb-3">
            <AlignLeft className="w-3.5 h-3.5 text-[#00E5FF]" />
            <span className="text-[9px] font-black text-white/40 uppercase tracking-widest">Intelligence Brief / Protocol Data</span>
          </div>
          <p className="text-sm md:text-base text-white/80 leading-relaxed">
            {description}
          </p>
        </div>
      </div>

      <div className="relative aspect-video rounded-3xl md:rounded-[40px] overflow-hidden border border-white/10 shadow-2xl bg-black">
        {embedUrl ? (
          <iframe src={embedUrl} className="w-full h-full border-none" allowFullScreen />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-white/10">
            <span className="text-[10px] font-mono uppercase tracking-widest">No Link Detected</span>
          </div>
        )}
        
        {/* Efeito de vinheta sutil apenas para estética */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/20 to-transparent" />
      </div>
    </section>
  );
};

export default MissionBriefing;