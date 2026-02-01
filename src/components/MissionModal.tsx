"use client";

import React, { useState, useRef, useEffect } from 'react';
import { X, Headphones, FileText, Play, Pause, ExternalLink, Activity, Volume2, Maximize2, ChevronLeft, Video } from 'lucide-react';
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

  const getEmbedUrl = (url: string) => {
    if (!url) return "";
    let id = "";
    if (url.includes('youtu.be/')) id = url.split('youtu.be/')[1].split(/[?#]/)[0];
    else if (url.includes('watch?v=')) id = url.split('v=')[1].split(/[&?#]/)[0];
    if (id) return `https://www.youtube.com/embed/${id}?autoplay=0&rel=0&modestbranding=1`;
    return url;
  };

  const hasAudio = !!module.audioUrl;
  const hasDoc = !!module.docUrl;
  const hasVideo = !!module.videoUrl;
  const embedUrl = getEmbedUrl(module.videoUrl);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 backdrop-blur-2xl"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.05, opacity: 0 }}
            className="relative w-full h-full flex flex-col overflow-hidden"
          >
            {/* Header HUD */}
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
                  <span className="text-[9px] font-mono font-black text-[#00E5FF] uppercase tracking-[0.3em]">MISSION_INTEL // {module.id}</span>
                  <h2 className="text-xl font-black text-white uppercase tracking-tighter">{module.title}</h2>
                </div>
              </div>

              <div className="flex items-center gap-4">
                 <button 
                  onClick={onClose}
                  className="p-3 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-xl transition-all border border-red-500/10"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 relative flex flex-col md:flex-row bg-[#020617]">
              
              {/* Main Viewer (Video or PDF) */}
              <div className="flex-1 relative bg-black">
                {hasVideo ? (
                  <div className="w-full h-full">
                    <iframe 
                      src={embedUrl} 
                      className="w-full h-full border-none"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                ) : hasDoc ? (
                  <iframe 
                    src={`${module.docUrl}#toolbar=0&navpanes=0`} 
                    className="w-full h-full border-none opacity-90"
                    title="Technical Manual"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center gap-6 text-white/5">
                    <Database className="w-32 h-32" />
                    <p className="text-xs font-mono font-black uppercase tracking-[1em]">Restricted Data Stream</p>
                  </div>
                )}
                <div className="absolute inset-0 pointer-events-none bg-scanline opacity-[0.03]" />
              </div>

              {/* Sidebar or Overlay for secondary assets */}
              {(hasAudio || (hasDoc && hasVideo)) && (
                <div className="w-full md:w-80 bg-black/40 border-l border-white/5 p-6 space-y-6 overflow-y-auto">
                   <h3 className="text-[10px] font-mono font-black text-white/20 uppercase tracking-widest border-b border-white/5 pb-2">Secondary Uplinks</h3>
                   
                   {hasDoc && hasVideo && (
                     <div className="p-4 bg-white/5 rounded-2xl border border-white/10 space-y-4">
                        <div className="flex items-center gap-2 text-[#00E5FF]">
                           <FileText size={14} />
                           <span className="text-[9px] font-black uppercase">Document Asset</span>
                        </div>
                        <a href={module.docUrl} target="_blank" rel="noreferrer" className="block w-full py-3 bg-[#00E5FF]/10 text-[#00E5FF] text-center text-[9px] font-black uppercase rounded-lg border border-[#00E5FF]/20 hover:bg-[#00E5FF] hover:text-black transition-all">Open PDF Externally</a>
                     </div>
                   )}

                   {hasAudio && (
                     <div className="p-4 bg-amber-500/5 rounded-2xl border border-amber-500/10 space-y-4">
                        <div className="flex items-center gap-2 text-amber-500">
                           <Headphones size={14} />
                           <span className="text-[9px] font-black uppercase">Audio Briefing</span>
                        </div>
                        <div className="flex flex-col items-center gap-4">
                           <button 
                            onClick={toggleAudio}
                            className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center text-black shadow-lg hover:scale-105"
                           >
                            {isPlaying ? <Pause size={20} fill="black" /> : <Play size={20} fill="black" className="ml-1" />}
                           </button>
                           <WaveformVisualizer active={isPlaying} />
                        </div>
                        <audio ref={audioRef} src={module.audioUrl} onEnded={() => setIsPlaying(false)} />
                     </div>
                   )}
                </div>
              )}
            </div>

            {/* Bottom Status Bar */}
            <div className="h-10 px-8 bg-black/80 border-t border-white/5 flex items-center justify-between">
               <div className="flex gap-6">
                 <span className="text-[8px] font-mono text-white/20 uppercase tracking-widest">Protocol: AERIS-X7</span>
                 <span className="text-[8px] font-mono text-white/20 uppercase tracking-widest">Type: {module.type}</span>
               </div>
               <div className="flex items-center gap-2">
                 <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                 <span className="text-[8px] font-mono text-green-500 uppercase font-black">Secure Data Stream</span>
               </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MissionModal;