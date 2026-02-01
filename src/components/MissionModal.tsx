"use client";

import React, { useState, useRef, useEffect } from 'react';
import { X, Headphones, FileText, Play, Pause, ChevronLeft, Video, BookOpen, Database, Radio, Activity, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrainingModule } from '@/types/portal';
import WaveformVisualizer from './WaveformVisualizer';
import { useIsMobile } from '@/hooks/use-mobile';

interface MissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  module: TrainingModule | null;
  initialView?: 'video' | 'doc' | 'audio';
}

const MissionModal = ({ isOpen, onClose, module, initialView = 'video' }: MissionModalProps) => {
  const isMobile = useIsMobile();
  const [isPlayingPodcast, setIsPlayingPodcast] = useState(false);
  const [isPlayingAudiobook, setIsPlayingAudiobook] = useState(false);
  const [activeView, setActiveView] = useState<'video' | 'doc' | 'audio'>(initialView);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (isOpen && module) {
      if (initialView === 'audio' && (module.audioUrl || module.audiobookUrl)) {
        setActiveView('audio');
      } else if (initialView === 'doc' && module.docUrl) {
        setActiveView('doc');
      } else if (initialView === 'video' && module.videoUrl) {
        setActiveView('video');
      } else {
        const fallback = module.videoUrl ? 'video' : (module.docUrl ? 'doc' : 'audio');
        setActiveView(fallback);
      }
    } else if (!isOpen) {
      setIsPlayingPodcast(false);
      setIsPlayingAudiobook(false);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
      }
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
        setActiveView('audio');
      }
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setDuration(audioRef.current.duration || 0);
    }
  };

  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
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
  const coverUrl = module.coverUrl || "https://images.unsplash.com/photo-1517976384346-3136801d605d?q=80&w=1200";

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }} 
          className="fixed inset-0 z-[200] flex flex-col bg-black/98 md:backdrop-blur-2xl h-[100dvh]"
        >
          {/* CABEÇALHO FIXO */}
          <div className="h-16 flex items-center justify-between px-4 border-b border-white/5 bg-black/80 z-50">
            <div className="flex items-center gap-3 overflow-hidden">
              <button onClick={onClose} className="p-2 bg-white/5 rounded-xl">
                <ChevronLeft className="w-5 h-5 text-white/40" />
              </button>
              <div className="overflow-hidden">
                <span className="block text-[8px] font-mono text-[#00E5FF] uppercase tracking-widest">MISSION_INTEL // {module.id}</span>
                <h2 className="text-sm font-black text-white uppercase truncate">{module.title}</h2>
              </div>
            </div>
            <button onClick={onClose} className="p-2 bg-red-500/10 text-red-500 rounded-xl"><X className="w-5 h-5" /></button>
          </div>

          {/* ÁREA DE CONTEÚDO */}
          <div className="flex-1 relative flex flex-col md:flex-row bg-[#020617] overflow-hidden">
            <div className="flex-1 relative bg-black flex flex-col items-center justify-center">
              {activeView === 'video' && hasVideo ? (
                <div className="w-full h-full">
                  <iframe src={embedUrl} className="w-full h-full border-none" allowFullScreen />
                </div>
              ) : activeView === 'doc' && hasDoc ? (
                <div className="w-full h-full relative">
                   <iframe src={module.docUrl} className="w-full h-full border-none bg-white/[0.05]" />
                   {isMobile && (
                     <a 
                      href={module.docUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="absolute bottom-6 right-6 p-4 bg-[#00E5FF] text-black rounded-full shadow-2xl flex items-center gap-2 font-black text-[10px] uppercase"
                     >
                       <ExternalLink size={16} /> Abrir PDF Completo
                     </a>
                   )}
                </div>
              ) : activeView === 'audio' && (hasAudio || hasAudiobook) ? (
                <div className="w-full h-full flex flex-col items-center justify-center p-6 overflow-y-auto">
                   <div className="relative w-40 h-40 md:w-64 md:h-64 mb-6">
                      <img src={coverUrl} className="w-full h-full object-cover rounded-3xl shadow-2xl border border-white/10" alt="" />
                      {(isPlayingPodcast || isPlayingAudiobook) && (
                        <div className="absolute -bottom-2 -right-2 bg-[#00E5FF] p-3 rounded-2xl shadow-[0_0_20px_#00E5FF]">
                          <Activity size={20} className="text-black animate-pulse" />
                        </div>
                      )}
                   </div>
                   
                   <div className="text-center space-y-4 max-w-sm mb-8">
                      <h3 className="text-xl md:text-3xl font-black text-white uppercase tracking-tighter">{module.title}</h3>
                      <div className="flex items-center gap-4">
                         <span className="text-[10px] font-mono text-white/40">{formatTime(currentTime)}</span>
                         <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
                            <motion.div className="h-full bg-[#00E5FF]" animate={{ width: `${(currentTime / duration) * 100 || 0}%` }} />
                         </div>
                         <span className="text-[10px] font-mono text-white/40">{formatTime(duration)}</span>
                      </div>
                      
                      <div className="flex items-center justify-center gap-6">
                         <button 
                          onClick={() => toggleAudio(hasAudiobook ? 'audiobook' : 'podcast')}
                          className="w-16 h-16 bg-[#00E5FF] text-black rounded-full flex items-center justify-center"
                         >
                            {(isPlayingPodcast || isPlayingAudiobook) ? <Pause size={24} fill="black" /> : <Play size={24} fill="black" className="ml-1" />}
                         </button>
                      </div>
                   </div>

                   {/* OPÇÕES DE ÁUDIO MOBILE */}
                   {isMobile && (
                     <div className="grid grid-cols-2 gap-3 w-full">
                        {hasAudiobook && (
                          <button onClick={() => toggleAudio('audiobook')} className={`flex flex-col items-center gap-2 p-4 rounded-2xl border transition-all ${isPlayingAudiobook ? 'bg-purple-500/20 border-purple-500' : 'bg-white/5 border-white/5'}`}>
                            <BookOpen size={16} className={isPlayingAudiobook ? 'text-purple-400' : 'text-white/20'} />
                            <span className="text-[8px] font-black uppercase text-white/60">Audiobook</span>
                          </button>
                        )}
                        {hasAudio && (
                          <button onClick={() => toggleAudio('podcast')} className={`flex flex-col items-center gap-2 p-4 rounded-2xl border transition-all ${isPlayingPodcast ? 'bg-green-500/20 border-green-500' : 'bg-white/5 border-white/5'}`}>
                            <Radio size={16} className={isPlayingPodcast ? 'text-green-400' : 'text-white/20'} />
                            <span className="text-[8px] font-black uppercase text-white/60">Podcast</span>
                          </button>
                        )}
                     </div>
                   )}
                </div>
              ) : null}
            </div>

            {/* BARRA LATERAL (DESKTOP) */}
            {!isMobile && (
              <div className="w-80 bg-black/40 border-l border-white/5 p-6 space-y-6">
                <h3 className="text-[10px] font-mono font-black text-white/20 uppercase tracking-widest">Uplink Status</h3>
                <div className="flex flex-col gap-3">
                   {hasVideo && (
                     <button onClick={() => setActiveView('video')} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeView === 'video' ? 'bg-[#00E5FF] text-black shadow-lg' : 'bg-white/5 text-white/40'}`}>
                        <Video size={14} /> Video Feed
                     </button>
                   )}
                   {hasDoc && (
                     <button onClick={() => setActiveView('doc')} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeView === 'doc' ? 'bg-[#00E5FF] text-black shadow-lg' : 'bg-white/5 text-white/40'}`}>
                        <FileText size={14} /> Manual PDF
                     </button>
                   )}
                   {(hasAudio || hasAudiobook) && (
                     <button onClick={() => setActiveView('audio')} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeView === 'audio' ? 'bg-[#00E5FF] text-black shadow-lg' : 'bg-white/5 text-white/40'}`}>
                        <Headphones size={14} /> Audio Hub
                     </button>
                   )}
                </div>
              </div>
            )}
          </div>

          {/* NAVEGAÇÃO INFERIOR MOBILE (TABS) */}
          {isMobile && (
            <div className="p-4 bg-black/80 border-t border-white/10 pb-10">
              <div className="flex bg-white/5 p-1 rounded-2xl gap-1">
                {hasVideo && (
                  <button onClick={() => setActiveView('video')} className={`flex-1 flex flex-col items-center gap-1 py-3 rounded-xl transition-all ${activeView === 'video' ? 'bg-[#00E5FF] text-black' : 'text-white/40'}`}>
                    <Video size={16} />
                    <span className="text-[8px] font-black uppercase">Vídeo</span>
                  </button>
                )}
                {hasDoc && (
                  <button onClick={() => setActiveView('doc')} className={`flex-1 flex flex-col items-center gap-1 py-3 rounded-xl transition-all ${activeView === 'doc' ? 'bg-[#00E5FF] text-black' : 'text-white/40'}`}>
                    <FileText size={16} />
                    <span className="text-[8px] font-black uppercase">Manual</span>
                  </button>
                )}
                {(hasAudio || hasAudiobook) && (
                  <button onClick={() => setActiveView('audio')} className={`flex-1 flex flex-col items-center gap-1 py-3 rounded-xl transition-all ${activeView === 'audio' ? 'bg-[#00E5FF] text-black' : 'text-white/40'}`}>
                    <Headphones size={16} />
                    <span className="text-[8px] font-black uppercase">Áudio</span>
                  </button>
                )}
              </div>
            </div>
          )}

          <audio ref={audioRef} onTimeUpdate={handleTimeUpdate} onEnded={() => { setIsPlayingPodcast(false); setIsPlayingAudiobook(false); }} />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MissionModal;