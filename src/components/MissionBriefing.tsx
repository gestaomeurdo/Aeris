"use client";

import React from 'react';
import { Play, Activity, Settings2, AlignLeft } from 'lucide-react';
import { motion } from 'framer-motion';

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
    if (url.includes('youtu.be/')) {
      id = url.split('youtu.be/')[1].split(/[?#]/)[0];
    } else if (url.includes('watch?v=')) {
      id = url.split('v=')[1].split(/[&?#]/)[0];
    }

    if (id) {
      return `https://www.youtube.com/embed/${id}?autoplay=0&rel=0&modestbranding=1&showinfo=0&iv_load_policy=3&controls=1&autohide=1`;
    }

    return url;
  };

  const embedUrl = getEmbedUrl(videoUrl);

  return (
    <section className="relative space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 px-2">
        <div className="space-y-2 max-w-3xl">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-[10px] font-mono font-black text-[#00E5FF] uppercase tracking-[0.4em]">Live Intelligence Feed</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase leading-none">
            {title.split(' ')[0]} <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40 font-light">{title.split(' ').slice(1).join(' ')}</span>
          </h2>
        </div>

        <div className="flex items-center gap-4">
          {onEdit && (
            <button 
              onClick={onEdit}
              className="flex items-center gap-2 bg-white/[0.03] backdrop-blur-xl border border-white/10 px-4 py-2 rounded-xl text-white/60 hover:text-[#00E5FF] hover:border-[#00E5FF]/40 transition-all"
            >
              <Settings2 className="w-4 h-4" />
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest">EDIT BRIEFING</span>
            </button>
          )}
          <div className="hidden md:flex items-center gap-4 bg-white/[0.03] backdrop-blur-xl border border-white/10 px-6 py-3 rounded-xl">
            <Activity className="w-4 h-4 text-[#00E5FF]" />
            <span className="text-[11px] font-mono font-bold text-white/80 uppercase tracking-widest">Signal: Encrypted</span>
          </div>
        </div>
      </div>

      <div className="relative aspect-video rounded-[40px] overflow-hidden border border-white/10 shadow-2xl group bg-black">
        <div className="absolute inset-0 z-20 pointer-events-none shadow-[inset_0_0_100px_rgba(0,0,0,0.8)]" />
        
        {embedUrl ? (
          <div className="absolute inset-0 w-full h-full scale-[1.01]"> 
            <iframe 
              src={embedUrl} 
              className="w-full h-full border-none"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
            />
          </div>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-white/10">
            <Play className="w-20 h-20" />
            <p className="text-[10px] font-mono font-black uppercase tracking-[0.5em]">Waiting for Uplink...</p>
          </div>
        )}
        
        {/* Overlay tático com a descrição (Sempre visível ao passar o mouse ou integrada) */}
        <div className="absolute inset-0 pointer-events-none p-8 flex flex-col justify-end z-30 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="bg-black/60 backdrop-blur-xl border border-white/10 p-6 rounded-3xl max-w-xl pointer-events-auto">
            <div className="flex items-center gap-3 mb-3">
              <AlignLeft className="w-4 h-4 text-[#00E5FF]" />
              <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">Mission Intelligence</span>
            </div>
            <p className="text-sm text-white/80 leading-relaxed italic">
              {description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionBriefing;