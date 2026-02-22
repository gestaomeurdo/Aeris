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
  const [playbackRate, setPlaybackRate] = useState(1);
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

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = playbackRate;
    }
  }, [playbackRate, isPlayingPodcast, isPlayingAudiobook]);

  if (!module) return null;

  const handlePlaybackRateChange = () => {
    const rates = [1, 1.25, 1.5, 2];
    const currentIndex = rates.indexOf(playbackRate);
    const nextIndex = (currentIndex + 1) % rates.length;
    setPlaybackRate(rates[nextIndex]);
  };

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
          className="fixed inset-0 z-[500] flex flex-col bg-[#020617] h-[100dvh] overflow-hidden"
        >
          {/* HEADER FIXO */}
          <div className="flex-shrink-0 h-16 flex items-center justify-between px-4 border-b border-white/10 bg-[#020617]">
            <div className="flex items-center gap-3 overflow-hidden">
              <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-xl transition-colors">
                <ChevronLeft className="w-5 h-5 text-white/60" />
              </button>
              <div className="overflow-hidden">
                <span className="block text-[8px] font-mono text-[#00E5FF] uppercase tracking-widest leading-none mb-1">MODULE // {module.id}</span>
                <h2 className="text-xs font-black text-white uppercase truncate max-w-[180px]">{module.title}</h2>
              </div>
            </div>
            <button onClick={onClose} className="p-2 bg-red-500/10 text-red-500 rounded-xl active:scale-95 transition-transform"><X className="w-5 h-5" /></button>
          </div>

          {/* TABS DE NAVEGAÇÃO (FIXO NO TOPO ABAIXO DO HEADER NO MOBILE) */}
          {isMobile && (
            <div className="flex-shrink-0 flex p-2 bg-black/40 border-b border-white/5 gap-2">
              {hasVideo && (
                <button 
                  onClick={() => setActiveView('video')} 
                  className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-[10px] font-black uppercase transition-all ${activeView === 'video' ? 'bg-[#00E5FF] text-black shadow-lg' : 'bg-white/5 text-white/40'}`}
                >
                  <Video size={14} /> Vídeo
                </button>
              )}
              {hasDoc && (
                <button 
                  onClick={() => setActiveView('doc')} 
                  className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-[10px] font-black uppercase transition-all ${activeView === 'doc' ? 'bg-[#00E5FF] text-black shadow-lg' : 'bg-white/5 text-white/40'}`}
                >
                  <FileText size={14} /> Manual
                </button>
              )}
              {(hasAudio || hasAudiobook) && (
                <button 
                  onClick={() => setActiveView('audio')} 
                  className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-[10px] font-black uppercase transition-all ${activeView === 'audio' ? 'bg-[#00E5FF] text-black shadow-lg' : 'bg-white/5 text-white/40'}`}
                >
                  <Headphones size={14} /> Áudio
                </button>
              )}
            </div>
          )}

          {/* ÁREA DE CONTEÚDO PRINCIPAL (ROLÁVEL) */}
          <div className="flex-1 relative flex flex-col md:flex-row bg-[#020617] overflow-hidden">
            <div className="flex-1 relative bg-black min-h-0 flex flex-col overflow-y-auto custom-scrollbar">
              
              {activeView === 'video' && hasVideo && (
                <div className="w-full aspect-video bg-black flex items-center justify-center">
                  <iframe src={embedUrl} className="w-full h-full border-none" allowFullScreen />
                </div>
              )}

              {activeView === 'doc' && hasDoc && (
                <div className="w-full h-full flex flex-col">
                   <iframe src={module.docUrl} className="flex-1 w-full min-h-[60vh] border-none bg-white/[0.05]" />
                   <div className="p-6 bg-black/60 border-t border-white/10">
                      <a 
                        href={module.docUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-full p-4 bg-[#00E5FF] text-black rounded-2xl shadow-xl flex items-center justify-center gap-3 font-black text-xs uppercase"
                      >
                        <ExternalLink size={18} /> Ver Documento em Tela Cheia
                      </a>
                   </div>
                </div>
              )}

              {activeView === 'audio' && (hasAudio || hasAudiobook) && (
                <div className="w-full flex flex-col items-center p-8 md:p-12 space-y-8">
                   {/* Player Card */}
                   <div className="w-full max-w-sm bg-white/[0.03] border border-white/10 rounded-[32px] p-6 space-y-6">
                      <div className="relative aspect-square w-full">
                        <img src={coverUrl} className="w-full h-full object-cover rounded-2xl shadow-2xl border border-white/10" alt="" />
                        {(isPlayingPodcast || isPlayingAudiobook) && (
                          <div className="absolute -bottom-2 -right-2 bg-[#00E5FF] p-3 rounded-xl shadow-[0_0_20px_#00E5FF]">
                            <Activity size={20} className="text-black animate-pulse" />
                          </div>
                        )}
                      </div>

                      <div className="text-center space-y-2">
                         <span className="text-[9px] font-mono text-[#00E5FF] uppercase tracking-widest">{isPlayingAudiobook ? 'AUDIOBOOK' : 'PODCAST'} ACTIVE</span>
                         <h3 className="text-xl font-black text-white uppercase leading-tight">{module.title}</h3>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                           <span className="text-[10px] font-mono text-white/40 w-10">{formatTime(currentTime)}</span>
                           <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
                              <motion.div className="h-full bg-[#00E5FF]" animate={{ width: `${(currentTime / duration) * 100 || 0}%` }} transition={{ duration: 0.1 }} />
                           </div>
                           <span className="text-[10px] font-mono text-white/40 w-10">{formatTime(duration)}</span>
                        </div>
                        
                        <div className="flex items-center justify-center gap-6">
                           <button
                            onClick={handlePlaybackRateChange}
                            className="w-12 h-12 bg-white/5 text-[#00E5FF] rounded-full flex items-center justify-center text-[10px] font-black border border-[#00E5FF]/20 hover:bg-[#00E5FF]/10 transition-colors shadow-lg"
                            title="Velocidade de Reprodução"
                           >
                              {playbackRate}x
                           </button>

                           <button
                            onClick={() => toggleAudio(hasAudiobook ? 'audiobook' : 'podcast')}
                            className="w-16 h-16 bg-[#00E5FF] text-black rounded-full flex items-center justify-center active:scale-95 transition-transform shadow-xl"
                           >
                              {(isPlayingPodcast || isPlayingAudiobook) ? <Pause size={28} fill="black" /> : <Play size={28} fill="black" className="ml-1" />}
                           </button>

                           <div className="w-12" /> {/* Spacer for symmetry */}
                        </div>
                      </div>

                      {/* Botões de Seleção de Áudio Simplificados */}
                      <div className="grid grid-cols-2 gap-2">
                        {hasAudio && (
                          <button onClick={() => toggleAudio('podcast')} className={`p-3 rounded-xl border text-[9px] font-black uppercase transition-all ${isPlayingPodcast ? 'bg-[#00E5FF]/20 border-[#00E5FF] text-[#00E5FF]' : 'bg-white/5 border-white/5 text-white/40'}`}>Podcast</button>
                        )}
                        {hasAudiobook && (
                          <button onClick={() => toggleAudio('audiobook')} className={`p-3 rounded-xl border text-[9px] font-black uppercase transition-all ${isPlayingAudiobook ? 'bg-purple-500/20 border-purple-500 text-purple-400' : 'bg-white/5 border-white/5 text-white/40'}`}>Audiobook</button>
                        )}
                      </div>
                   </div>

                   {/* Waveform apenas para efeito visual */}
                   <div className="opacity-40">
                      <WaveformVisualizer active={isPlayingPodcast || isPlayingAudiobook} />
                   </div>
                </div>
              )}

              {!hasVideo && !hasDoc && !hasAudio && !hasAudiobook && (
                <div className="flex-1 flex flex-col items-center justify-center text-white/10 gap-4 py-20">
                   <Database size={48} />
                   <span className="text-[10px] font-mono uppercase tracking-[0.5em]">No Data Link</span>
                </div>
              )}
            </div>

            {/* SIDEBAR (DESKTOP APENAS) */}
            {!isMobile && (
              <aside className="w-80 bg-black/40 border-l border-white/5 p-6 flex flex-col gap-6">
                <h3 className="text-[10px] font-mono font-black text-white/20 uppercase tracking-widest border-b border-white/5 pb-3">Available Sources</h3>
                <div className="flex flex-col gap-3">
                   {hasVideo && (
                     <button onClick={() => setActiveView('video')} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeView === 'video' ? 'bg-[#00E5FF] text-black shadow-lg font-black' : 'bg-white/5 text-white/40 hover:bg-white/10'}`}>
                        <Video size={16} /> Video Presentation
                     </button>
                   )}
                   {hasDoc && (
                     <button onClick={() => setActiveView('doc')} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeView === 'doc' ? 'bg-[#00E5FF] text-black shadow-lg font-black' : 'bg-white/5 text-white/40 hover:bg-white/10'}`}>
                        <FileText size={16} /> Technical Manual
                     </button>
                   )}
                   {(hasAudio || hasAudiobook) && (
                     <button onClick={() => setActiveView('audio')} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeView === 'audio' ? 'bg-[#00E5FF] text-black shadow-lg font-black' : 'bg-white/5 text-white/40 hover:bg-white/10'}`}>
                        <Headphones size={16} /> Audio Briefing
                     </button>
                   )}
                </div>
              </aside>
            )}
          </div>

          <audio ref={audioRef} onTimeUpdate={handleTimeUpdate} onEnded={() => { setIsPlayingPodcast(false); setIsPlayingAudiobook(false); }} />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MissionModal;