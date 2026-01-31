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
    <section className="relative space-y-6 md:space-y-8">
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

      <div className="relative aspect-video rounded-3xl md:rounded-[40px] overflow-hidden border border-white/10 shadow-2xl bg-black">
        {embedUrl ? (
          <iframe src={embedUrl} className="w-full h-full border-none" allowFullScreen />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-white/10">
            <span className="text-[10px] font-mono uppercase tracking-widest">No Link</span>
          </div>
        )}
        
        <div className="absolute inset-x-0 bottom-0 p-4 md:p-8 bg-gradient-to-t from-black via-black/40 to-transparent">
          <div className="bg-black/60 backdrop-blur-xl border border-white/10 p-4 md:p-6 rounded-2xl md:rounded-3xl max-w-xl">
            <div className="flex items-center gap-2 mb-2">
              <AlignLeft className="w-3 h-3 text-[#00E5FF]" />
              <span className="text-[8px] font-black text-white/40 uppercase">Intelligence Brief</span>
            </div>
            <p className="text-xs md:text-sm text-white/80 leading-relaxed line-clamp-3 md:line-clamp-none">
              {description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionBriefing;