"use client";

import React, { useState } from 'react';
import { X, Headphones, FileText, Play, Pause, ExternalLink, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrainingModule } from '@/types/portal';
import WaveformVisualizer from './WaveformVisualizer';

interface MissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  module: TrainingModule | null;
}

const MissionModal = ({ isOpen, onClose, module }: MissionModalProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);

  if (!module) return null;

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) audioRef.current.pause();
      else audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[110] flex items-center justify-center p-4 md:p-8 bg-black/95 backdrop-blur-xl"
        >
          {/* Background Matrix Effect */}
          <div className="absolute inset-0 opacity-10 pointer-events-none overflow-hidden">
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
             <motion.div 
               animate={{ y: ["-100%", "100%"] }}
               transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
               className="w-full h-2 bg-gradient-to-b from-transparent via-[#00E5FF]/20 to-transparent"
             />
          </div>

          <motion.div
            initial={{ scale: 0.8, opacity: 0, filter: "blur(10px)" }}
            animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
            exit={{ scale: 1.1, opacity: 0, filter: "blur(20px)" }}
            transition={{ type: "spring", damping: 20, stiffness: 100 }}
            className="relative w-full max-w-7xl h-[90vh] bg-[#020617] border border-[#00E5FF]/20 rounded-[32px] overflow-hidden flex flex-col shadow-[0_0_100px_rgba(0,229,255,0.1)]"
          >
            {/* Header HUD */}
            <div className="px-10 py-8 border-b border-white/5 flex justify-between items-center bg-black/40">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="flex gap-1">
                    <div className="w-1 h-3 bg-[#00E5FF]" />
                    <div className="w-1 h-3 bg-[#00E5FF]/40" />
                    <div className="w-1 h-3 bg-[#00E5FF]/10" />
                  </div>
                  <span className="text-[10px] font-mono font-black text-[#00E5FF] uppercase tracking-[0.4em]">ACCESSING SECURE ASSET // {module.id}</span>
                </div>
                <h2 className="text-4xl font-black text-white uppercase tracking-tighter">{module.title}</h2>
              </div>
              <div className="flex items-center gap-6">
                <div className="hidden lg:flex flex-col items-end">
                   <span className="text-[8px] font-mono text-white/20 uppercase">Sync Status</span>
                   <span className="text-xs font-mono text-[#00E5FF]">ACTIVE_UPLINK</span>
                </div>
                <button 
                  onClick={onClose}
                  className="p-5 bg-white/5 hover:bg-red-500/20 hover:text-red-500 rounded-2xl transition-all border border-white/5 group"
                >
                  <X className="w-6 h-6 group-hover:rotate-90 transition-transform" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-hidden grid grid-cols-1 lg:grid-cols-2">
              {/* Left Side: Briefing & Audio */}
              <div className="p-10 space-y-12 overflow-y-auto border-r border-white/5 custom-scrollbar bg-black/20">
                <div className="space-y-8">
                  <div className="bg-[#0A192F]/60 border border-[#00E5FF]/20 rounded-3xl p-10 space-y-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                      <Activity className="w-24 h-24 text-[#00E5FF]" />
                    </div>
                    
                    <div className="space-y-1 relative z-10">
                      <p className="text-[10px] font-mono font-black text-[#00E5FF] uppercase tracking-widest">Aural Intelligence</p>
                      <h4 className="text-2xl font-bold text-white uppercase">MISSION AUDIO BRIEFING</h4>
                    </div>

                    <div className="flex items-center gap-8 bg-black/60 p-8 rounded-3xl border border-white/5 relative z-10">
                      <button 
                        onClick={toggleAudio}
                        disabled={!module.audioUrl}
                        className="w-20 h-20 bg-[#00E5FF] rounded-full flex items-center justify-center text-black shadow-[0_0_40px_rgba(0,229,255,0.4)] hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isPlaying ? <Pause className="w-8 h-8 fill-black" /> : <Play className="w-8 h-8 fill-black ml-1" />}
                      </button>
                      <div className="flex-1 space-y-4">
                        <WaveformVisualizer active={isPlaying} />
                        <div className="flex justify-between items-center text-[9px] font-mono text-white/20 uppercase tracking-widest">
                           <span>Signal Strength: {module.audioUrl ? '98%' : 'N/A'}</span>
                           <span>Bitrate: 320kbps</span>
                        </div>
                      </div>
                      <audio ref={audioRef} src={module.audioUrl} onEnded={() => setIsPlaying(false)} />
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                      <div className="h-[2px] w-8 bg-[#00E5FF]" />
                      <h4 className="text-[11px] font-black text-white/40 uppercase tracking-[0.5em]">Executive Summary</h4>
                    </div>
                    <p className="text-white/70 leading-relaxed text-xl font-medium">
                      {module.desc} 
                    </p>
                    <div className="grid grid-cols-2 gap-4 pt-6">
                       <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                          <p className="text-[8px] font-mono text-white/20 uppercase mb-1">Complexity</p>
                          <p className="text-sm font-black text-white">LEVEL_04</p>
                       </div>
                       <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                          <p className="text-[8px] font-mono text-white/20 uppercase mb-1">Access Tier</p>
                          <p className="text-sm font-black text-[#00E5FF]">CONFIDENTIAL</p>
                       </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side: Tactical Document Viewer */}
              <div className="bg-black/40 relative group">
                {module.docUrl ? (
                  <iframe 
                    src={module.docUrl} 
                    className="w-full h-full border-none grayscale-[0.8] hover:grayscale-0 transition-all duration-1000 opacity-80 hover:opacity-100"
                    title="Tactical Asset"
                    allowFullScreen // Added for better PDF viewing experience
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center gap-6 text-white/5">
                    <FileText className="w-24 h-24" />
                    <p className="text-[10px] font-mono font-black uppercase tracking-[1em]">Asset Restricted</p>
                  </div>
                )}
                
                {/* HUD Elements for Viewer */}
                <div className="absolute inset-0 pointer-events-none border-[30px] border-black/10" />
                {module.docUrl && (
                  <div className="absolute top-10 right-10 pointer-events-auto">
                    <a 
                      href={module.docUrl} 
                      target="_blank" 
                      rel="noreferrer"
                      className="flex items-center gap-3 px-5 py-3 bg-black/80 backdrop-blur-xl border border-[#00E5FF]/30 rounded-2xl text-[10px] font-black text-[#00E5FF] uppercase tracking-widest hover:bg-[#00E5FF] hover:text-black transition-all shadow-2xl"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Full Expansion
                    </a>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MissionModal;