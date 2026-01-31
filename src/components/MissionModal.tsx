"use client";

import React, { useState } from 'react';
import { X, Headphones, FileText, Play, Pause, ExternalLink } from 'lucide-react';
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
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className="relative w-full max-w-6xl h-[85vh] bg-[#020617] border border-[#00E5FF]/20 rounded-[40px] overflow-hidden flex flex-col shadow-[0_0_100px_rgba(0,229,255,0.1)]"
          >
            {/* Header HUD */}
            <div className="p-8 border-b border-white/5 flex justify-between items-center bg-black/40">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#00E5FF] animate-pulse" />
                  <span className="text-[10px] font-mono font-black text-[#00E5FF] uppercase tracking-widest">{module.id} // MISSION ACTIVE</span>
                </div>
                <h2 className="text-3xl font-black text-white uppercase tracking-tighter">{module.title}</h2>
              </div>
              <button 
                onClick={onClose}
                className="p-4 bg-white/5 hover:bg-red-500/20 hover:text-red-500 rounded-2xl transition-all"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 overflow-hidden grid grid-cols-1 lg:grid-cols-2">
              {/* Left Side: Audio & Info */}
              <div className="p-10 space-y-10 overflow-y-auto border-r border-white/5 custom-scrollbar">
                <div className="space-y-6">
                  <div className="bg-[#0A192F] border border-white/10 rounded-3xl p-8 space-y-6 relative overflow-hidden group">
                    <div className="absolute -right-10 -top-10 opacity-10">
                      <Headphones className="w-40 h-40 text-[#00E5FF]" />
                    </div>
                    
                    <div className="flex items-center gap-4 relative z-10">
                      <div className="p-4 bg-[#00E5FF]/10 rounded-2xl border border-[#00E5FF]/20">
                        <Headphones className="w-8 h-8 text-[#00E5FF]" />
                      </div>
                      <div>
                        <p className="text-[10px] font-mono font-black text-[#00E5FF] uppercase tracking-widest">Tactical Audio Briefing</p>
                        <h4 className="text-lg font-bold text-white">OUÇA AS INSTRUÇÕES</h4>
                      </div>
                    </div>

                    <div className="flex items-center gap-6 bg-black/40 p-6 rounded-2xl border border-white/5 relative z-10">
                      <button 
                        onClick={toggleAudio}
                        className="w-16 h-16 bg-[#00E5FF] rounded-full flex items-center justify-center text-black shadow-[0_0_30px_rgba(0,229,255,0.3)] hover:scale-105 transition-transform"
                      >
                        {isPlaying ? <Pause className="w-6 h-6 fill-black" /> : <Play className="w-6 h-6 fill-black ml-1" />}
                      </button>
                      <div className="flex-1 space-y-2">
                        <WaveformVisualizer active={isPlaying} />
                        <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                          <div className="h-full bg-[#00E5FF]/40 w-1/3" />
                        </div>
                      </div>
                      <audio ref={audioRef} src={module.audioUrl} onEnded={() => setIsPlaying(false)} />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-4 bg-[#6366F1]" />
                      <h4 className="text-xs font-black text-white/40 uppercase tracking-widest">Mission Parameters</h4>
                    </div>
                    <p className="text-white/60 leading-relaxed text-lg">
                      {module.desc} Este sistema substitui PDFs estáticos por uma experiência imersiva de aprendizado. Utilize o áudio briefing enquanto revisa a documentação tática ao lado.
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Side: Document Viewer */}
              <div className="bg-black/50 relative group">
                {module.docUrl ? (
                  <iframe 
                    src={module.docUrl} 
                    className="w-full h-full border-none grayscale-[0.5] hover:grayscale-0 transition-all duration-700"
                    title="Mission Document"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center gap-4 text-white/10">
                    <FileText className="w-20 h-20" />
                    <p className="text-[10px] font-mono font-black uppercase tracking-[0.5em]">No Document Linked</p>
                  </div>
                )}
                
                {/* HUD Overlay for iframe */}
                <div className="absolute inset-0 pointer-events-none border-[20px] border-black/20" />
                <div className="absolute top-6 right-6 pointer-events-auto">
                  <a 
                    href={module.docUrl} 
                    target="_blank" 
                    rel="noreferrer"
                    className="p-3 bg-black/60 backdrop-blur-md border border-white/10 rounded-xl text-white/60 hover:text-[#00E5FF] hover:border-[#00E5FF]/40 transition-all"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MissionModal;