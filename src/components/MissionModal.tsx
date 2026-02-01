"use client";

import React, { useState, useRef, useEffect } from 'react';
import { X, Headphones, FileText, Play, Pause, ChevronLeft, Video, BookOpen, Database, Radio } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrainingModule } from '@/types/portal';
import WaveformVisualizer from './WaveformVisualizer';

interface MissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  module: TrainingModule | null;
  initialView?: 'video' | 'doc';
}

const MissionModal = ({ isOpen, onClose, module, initialView = 'video' }: MissionModalProps) => {
  const [isPlayingPodcast, setIsPlayingPodcast] = useState(false);
  const [isPlayingAudiobook, setIsPlayingAudiobook] = useState(false);
  // Sincroniza a visão ativa com a intenção inicial toda vez que o modal abre ou o módulo muda
  const [activeView, setActiveView] = useState<'video' | 'doc'>(initialView);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (isOpen && module) {
      // Quando o modal abre, forçamos a visão para o que foi solicitado (initialView)
      // ou para o que estiver disponível como prioridade
      if (initialView === 'doc' && module.docUrl) {
        setActiveView('doc');
      } else if (initialView === 'video' && module.videoUrl) {
        setActiveView('video');
      } else {
        // Fallback inteligente apenas se o que foi pedido não existir
        setActiveView(module.videoUrl ? 'video' : 'doc');
      }
    } else if (!isOpen) {
      setIsPlayingPodcast(false);
      setIsPlayingAudiobook(false);
      if (audioRef.current) audioRef.current.pause();
    }
  }, [isOpen, module, initialView]);

  if (!module) return null;

  const toggleAudio = (type: 'podcast' | 'audiobook') => {
    if (audioRef.current) {
      const url = type === 'podcast' ? module.audioUrl : module.audiobookUrl;
      
      if ((type === 'podcast' && isPlayingPodcast) || (type === 'audiobook' && isPlayingAudiobook)) {
        audioRef.current.pause();
        setIsPlayingPodcast(false);
        setIsPlayingAudiobook(false);
      } else if (url) {
        audioRef.current.src = url;
        audioRef.current.play().catch(e => console.error("Audio playback blocked:", e));
        setIsPlayingPodcast(type === 'podcast');
        setIsPlayingAudiobook(type === 'audiobook');
      }
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
  const hasAudiobook = !!module.audiobookUrl;
  const hasDoc = !!module.docUrl;
  const hasVideo = !!module.videoUrl;
  const embedUrl = getEmbedUrl(module.videoUrl);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 backdrop-blur-2xl">
          <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 1.05, opacity: 0 }} className="relative w-full h-full flex flex-col overflow-hidden">
            <div className="h-20 px-8 flex items-center justify-between border-b border-white/5 bg-black/60 z-50">
              <div className="flex items-center gap-6">
                <button onClick={onClose} className="p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all group">
                  <ChevronLeft className="w-5 h-5 text-white/40 group-hover:text-white" />
                </button>
                <div className="space-y-1">
                  <span className="text-[9px] font-mono font-black text-[#00E5FF] uppercase tracking-[0.3em]">MISSION_INTEL // {module.id}</span>
                  <h2 className="text-xl font-black text-white uppercase tracking-tighter">{module.title}</h2>
                </div>
              </div>
              <button onClick={onClose} className="p-3 bg-red-500/10 text-red-500 rounded-xl transition-all"><X className="w-5 h-5" /></button>
            </div>

            <div className="flex-1 relative flex flex-col md:flex-row bg-[#020617]">
              <div className="flex-1 relative bg-black">
                {activeView === 'video' && hasVideo ? (
                  <iframe src={embedUrl} className="w-full h-full border-none" allowFullScreen />
                ) : (activeView === 'doc' && hasDoc) ? (
                  <iframe src={module.docUrl} className="w-full h-full border-none bg-white/[0.05]" />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center gap-6 text-white/5">
                    <Database className="w-32 h-32" />
                    <p className="text-xs font-mono font-black uppercase tracking-[1em]">No Stream Available</p>
                  </div>
                )}
              </div>

              <div className="w-full md:w-80 bg-black/40 border-l border-white/5 p-6 space-y-6 overflow-y-auto">
                   <h3 className="text-[10px] font-mono font-black text-white/20 uppercase tracking-widest border-b border-white/5 pb-2">Operational Uplinks</h3>
                   
                   <div className="space-y-3">
                      {hasVideo && (
                        <button 
                          onClick={() => setActiveView('video')}
                          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[9px] font-black uppercase transition-all ${activeView === 'video' ? 'bg-[#00E5FF] text-black shadow-[0_0_20px_rgba(0,229,255,0.4)]' : 'bg-white/5 text-white/40 hover:bg-white/10'}`}
                        >
                          <Video size={14} /> Video Briefing
                        </button>
                      )}
                      {hasDoc && (
                        <button 
                          onClick={() => setActiveView('doc')}
                          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[9px] font-black uppercase transition-all ${activeView === 'doc' ? 'bg-[#00E5FF] text-black shadow-[0_0_20px_rgba(0,229,255,0.4)]' : 'bg-white/5 text-white/40 hover:bg-white/10'}`}
                        >
                          <FileText size={14} /> Technical Manual
                        </button>
                      )}
                   </div>

                   <div className="h-px bg-white/5 w-full" />

                   {hasAudiobook && (
                     <div className="p-4 bg-purple-500/5 rounded-2xl border border-purple-500/10 space-y-4">
                        <div className="flex items-center gap-2 text-purple-500"><BookOpen size={14} /><span className="text-[9px] font-black uppercase">Audiobook</span></div>
                        <div className="flex flex-col items-center gap-4">
                           <button onClick={() => toggleAudio('audiobook')} className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-black">
                             {isPlayingAudiobook ? <Pause size={20} fill="black" /> : <Play size={20} fill="black" className="ml-1" />}
                           </button>
                           <WaveformVisualizer active={isPlayingAudiobook} />
                        </div>
                     </div>
                   )}

                   {hasAudio && (
                     <div className="p-4 bg-green-500/5 rounded-2xl border border-green-500/10 space-y-4">
                        <div className="flex items-center gap-2 text-green-500"><Radio size={14} /><span className="text-[9px] font-black uppercase">Podcast</span></div>
                        <div className="flex flex-col items-center gap-4">
                           <button onClick={() => toggleAudio('podcast')} className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-black">
                             {isPlayingPodcast ? <Pause size={20} fill="black" /> : <Play size={20} fill="black" className="ml-1" />}
                           </button>
                           <WaveformVisualizer active={isPlayingPodcast} />
                        </div>
                     </div>
                   )}
              </div>
            </div>
            <audio ref={audioRef} onEnded={() => { setIsPlayingPodcast(false); setIsPlayingAudiobook(false); }} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MissionModal;