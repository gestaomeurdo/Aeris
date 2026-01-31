"use client";

import React from 'react';
import { Play, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

interface MissionBriefingProps {
  title: string;
  videoUrl: string;
  description: string;
}

const MissionBriefing = ({ title, videoUrl, description }: MissionBriefingProps) => {
  // Função para converter links normais do YouTube em links de EMBED
  const getEmbedUrl = (url: string) => {
    if (!url) return "";
    
    // Trata links curtos (youtu.be/ID)
    if (url.includes('youtu.be/')) {
      const id = url.split('youtu.be/')[1].split(/[?#]/)[0];
      return `https://www.youtube.com/embed/${id}?autoplay=0&rel=0`;
    }
    
    // Trata links longos (youtube.com/watch?v=ID)
    if (url.includes('watch?v=')) {
      const id = url.split('v=')[1].split(/[&?#]/)[0];
      return `https://www.youtube.com/embed/${id}?autoplay=0&rel=0`;
    }

    return url;
  };

  const embedUrl = getEmbedUrl(videoUrl);

  return (
    <section className="relative space-y-6">
      <div className="flex justify-between items-end px-2">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-[10px] font-mono font-black text-[#00E5FF] uppercase tracking-[0.4em]">Live Intelligence Feed</span>
          </div>
          <h2 className="text-6xl font-black text-white tracking-tighter uppercase leading-none">
            {title.split(' ')[0]} <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40 font-light">{title.split(' ').slice(1).join(' ')}</span>
          </h2>
        </div>
        <div className="flex items-center gap-4 bg-white/[0.03] backdrop-blur-xl border border-white/10 px-6 py-3 rounded-xl">
          <Activity className="w-4 h-4 text-[#00E5FF]" />
          <span className="text-[11px] font-mono font-bold text-white/80 uppercase tracking-widest">Signal: Encrypted</span>
        </div>
      </div>

      <div className="relative aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-2xl group bg-black">
        {embedUrl ? (
          <iframe 
            src={embedUrl} 
            className="w-full h-full border-none"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-white/10">
            <Play className="w-20 h-20" />
            <p className="text-[10px] font-mono font-black uppercase tracking-[0.5em]">Waiting for Uplink...</p>
          </div>
        )}
        
        {/* HUD Elements Overlay (Hover) */}
        <div className="absolute inset-0 pointer-events-none p-8 flex flex-col justify-between z-10 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="flex justify-between items-start">
             <div className="bg-black/40 backdrop-blur-md border border-white/10 p-4 rounded-2xl flex gap-6">
              <div className="space-y-1">
                <p className="text-[8px] font-black text-white/40 uppercase tracking-widest">Operation Status</p>
                <p className="text-xs font-mono text-[#00E5FF]">ACTIVE_STREAM</p>
              </div>
            </div>
          </div>
          <p className="text-lg text-white font-medium max-w-lg">{description}</p>
        </div>
      </div>
    </section>
  );
};

export default MissionBriefing;