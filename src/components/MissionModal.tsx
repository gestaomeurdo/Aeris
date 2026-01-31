"use client";

import React, { useState, useRef, useEffect } from 'react';
import { X, Headphones, FileText, Play, Pause, ExternalLink, Activity, Volume2, Maximize2, ChevronLeft } from 'lucide-react';
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
  const [showAudioControls, setShowAudioControls] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!isOpen) {
      setIsPlaying(false);
      if (audioRef.current) audioRef.current.pause();
    }
  }, [isOpen]);

  if (!module) return null;

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.error("Audio playback blocked:", e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  const hasAudio = !!module.audioUrl;
  const hasDoc = !!module.docUrl;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 backdrop-blur-2xl"
        >
          {/* Main Container */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.05, opacity: 0 }}
            className="relative w-full h-full flex flex-col overflow-hidden"
          >
            {/* Immersive Header HUD */}
            <div className="h-20 px-8 flex items-center justify-between border-b border-white/5 bg-black/60 backdrop-blur-md z-50">
              <div className="flex items-center gap-6">
                <button 
                  onClick={onClose}
                  className="p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all group"
                >
                  <ChevronLeft className="w-5 h-5 text-white/40 group-hover:text-white" />
                </button>
                <div className="h-8 w-[1px] bg-white/10" />
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <span className="text-[9px] font-mono font-black text-[#00E5FF] uppercase tracking-[0.3em]">MISSION_INTEL // {module.id}</span>
                  </div>
                  <h2 className="text-xl font-black text-white uppercase tracking-tighter">{module.title}</h2>
                </div>
              </div>

              <div className="flex items-center gap-8">
                 <div className="hidden md:flex items-center gap-3 px-4 py-2 bg-[#00E5FF]/5 border border-[#00E5FF]/20 rounded-lg">
                    <Activity className="w-3 h-3 text-[#00E5FF] animate-pulse" />
                    <span className="text-[9px] font-mono text-[#00E5FF] uppercase tracking-widest">Signal Integrity: Nominal</span>
                 </div>
                 <button 
                  onClick={onClose}
                  className="p-3 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-xl transition-all border border-red-500/10"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 relative flex">
              {/* PDF VIEWER (Fundo principal) */}
              <div className="flex-1 bg-[#020617] relative">
                {hasDoc ? (
                  <iframe 
                    src={`${module.docUrl}#toolbar=0&navpanes=0`} 
                    className="w-full h-full border-none opacity-90 hover:opacity-100 transition-opacity duration-700"
                    title="Technical Manual"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center gap-6 text-white/5">
                    <FileText className="w-32 h-32" />
                    <p className="text-xs font-mono font-black uppercase tracking-[1em]">Restricted Document Data</p>
                  </div>
                )}
                
                {/* HUD Scanlines overlay over PDF */}
                <div className="absolute inset-0 pointer-events-none bg-scanline opacity-[0.03]" />
              </div>

              {/* FLOATING AUDIO CONTROLS (Só aparece se tiver áudio) */}
              {hasAudio && (
                <motion.div 
                  drag
                  dragConstraints={{ left: -500, right: 0, top: 0, bottom: 500 }}
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  className="absolute bottom-10 right-10 z-[60] cursor-move"
                >
                  <div className="bg-black/80 backdrop-blur-2xl border border-[#00E5FF]/40 rounded-3xl p-8 shadow-[0_20px_60px_rgba(0,0,0,0.8),0_0_30px_rgba(0,229,255,0.1)] flex items-center gap-8 min-w-[400px]">
                    <div className="relative">
                      <button 
                        onClick={toggleAudio}
                        className="w-16 h-16 bg-[#00E5FF] rounded-full flex items-center justify-center text-black shadow-[0_0_30px_rgba(0,229,255,0.3)] hover:scale-105 active:scale-95 transition-all"
                      >
                        {isPlaying ? <Pause className="w-7 h-7 fill-black" /> : <Play className="w-7 h-7 fill-black ml-1" />}
                      </button>
                      {isPlaying && (
                        <div className="absolute -inset-2 border-2 border-[#00E5FF] rounded-full animate-ping opacity-20 pointer-events-none" />
                      )}
                    </div>

                    <div className="flex-1 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono font-black text-[#00E5FF] uppercase tracking-widest">Audiobook Uplink</span>
                        <div className="flex items-center gap-2">
                           <Volume2 className="w-3 h-3 text-white/20" />
                           <div className="w-12 h-1 bg-white/10 rounded-full"><div className="w-2/3 h-full bg-[#00E5FF] rounded-full" /></div>
                        </div>
                      </div>
                      <div className="flex justify-start">
                        <WaveformVisualizer active={isPlaying} />
                      </div>
                    </div>
                    
                    <audio ref={audioRef} src={module.audioUrl} onEnded={() => setIsPlaying(false)} onPlay={() => setIsPlaying(true)} onPause={() => setIsPlaying(false)} />
                  </div>
                </motion.div>
              )}
            </div>

            {/* Bottom Status Bar */}
            <div className="h-10 px-8 bg-black/80 border-t border-white/5 flex items-center justify-between">
               <div className="flex gap-6">
                 <span className="text-[8px] font-mono text-white/20 uppercase tracking-widest">Protocol: AES-256</span>
                 <span className="text-[8px] font-mono text-white/20 uppercase tracking-widest">Source: Aeris_Academy_Vault</span>
               </div>
               <div className="flex items-center gap-2">
                 <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                 <span className="text-[8px] font-mono text-green-500 uppercase font-black">Secure Link Established</span>
               </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MissionModal;