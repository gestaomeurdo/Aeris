"use client";

import React, { useState, useRef, useEffect } from 'react';
import { X, Headphones, FileText, Play, Pause, ChevronLeft, Video, BookOpen, Database, Radio, Activity } from 'lucide-react';
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
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 backdrop-blur-2xl">
          <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 1.05, opacity: 0 }} className="relative w-full h-full flex flex-col overflow-hidden">
            <div className="h-16 md:h-20 px-4 md:px-8 flex items-center justify-between border-b border-white/5 bg-black/60 z-50">
              <div className="flex items-center gap-4 md:gap-6">
                <button onClick={onClose} className="p-2 md:p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all group">
                  <ChevronLeft className="w-4 h-4 md:w-5 md:h-5 text-white/40 group-hover:text-white" />
                </button>
                <div className="space-y-0.5">
                  <span className="text-[8px] md:text-[9px] font-mono font-black text-[#00E5FF] uppercase tracking-[0.3em]">MISSION_INTEL // {module.id}</span>
                  <h2 className="text-sm md:text-xl font-black text-white uppercase tracking-tighter truncate max-w-[150px] md:max-w-none">{module.title}</h2>
                </div>
              </div>
              <button onClick={onClose} className="p-2 md:p-3 bg-red-500/10 text-red-500 rounded-xl transition-all"><X className="w-4 h-4 md:w-5 md:h-5" /></button>
            </div>

            <div className="flex-1 relative flex flex-col md:flex-row bg-[#020617] overflow-hidden">
              {/* MAIN DISPLAY AREA */}
              <div className="flex-1 relative bg-black flex items-center justify-center overflow-hidden">
                {activeView === 'video' && hasVideo ? (
                  <div className="w-full h-full flex items-center justify-center">
                    <iframe src={embedUrl} className="w-full aspect-video md:h-full md:aspect-auto border-none" allowFullScreen />
                  </div>
                ) : activeView === 'doc' && hasDoc ? (
                  <iframe src={module.docUrl} className="w-full h-full border-none bg-white/[0.05]" />
                ) : activeView === 'audio' && (hasAudio || hasAudiobook) ? (
                  <div className="relative w-full h-full flex items-center justify-center p-4 md:p-20 overflow-y-auto custom-scrollbar">
                    <img src={coverUrl} className="absolute inset-0 w-full h-full object-cover opacity-10 blur-3xl pointer-events-none" alt="" />
                    
                    <div className="relative z-10 w-full max-w-4xl flex flex-col lg:flex-row items-center gap-8 md:gap-12 bg-black/40 backdrop-blur-xl p-6 md:p-16 rounded-[32px] md:rounded-[40px] border border-white/10 shadow-2xl">
                      <div className="relative w-32 h-32 md:w-64 md:h-64 flex-shrink-0 group">
                        <img src={coverUrl} className="w-full h-full object-cover rounded-2xl md:rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.5)] group-hover:scale-105 transition-transform duration-700" alt="Cover" />
                        <div className="absolute inset-0 rounded-2xl md:rounded-3xl border-2 border-[#00E5FF]/20 group-hover:border-[#00E5FF]/50 transition-colors" />
                        {(isPlayingPodcast || isPlayingAudiobook) && (
                          <div className="absolute -bottom-2 -right-2 md:-bottom-4 md:-right-4 bg-[#00E5FF] p-2 md:p-3 rounded-xl md:rounded-2xl shadow-[0_0_20px_#00E5FF]">
                            <Activity className="w-4 h-4 md:w-6 md:h-6 text-black animate-pulse" />
                          </div>
                        )}
                      </div>

                      <div className="flex-1 space-y-6 md:space-y-8 text-center lg:text-left">
                        <div className="space-y-2">
                          <span className="text-[10px] md:text-xs font-mono font-black text-[#00E5FF] uppercase tracking-[0.4em]">{isPlayingAudiobook ? 'AUDIOBOOK' : 'PODCAST'} UPLINK ACTIVE</span>
                          <h3 className="text-2xl md:text-5xl font-black text-white uppercase tracking-tighter leading-tight">{module.title}</h3>
                          <p className="text-xs md:text-sm text-white/40 font-medium line-clamp-3">{module.desc}</p>
                        </div>

                        <div className="space-y-4">
                           <div className="flex items-center gap-3 md:gap-4">
                             <span className="text-[9px] md:text-[10px] font-mono text-white/40 w-10">{formatTime(currentTime)}</span>
                             <div className="flex-1 h-1 md:h-1.5 bg-white/10 rounded-full overflow-hidden">
                                <motion.div 
                                  className="h-full bg-[#00E5FF] shadow-[0_0_15px_#00E5FF]" 
                                  initial={{ width: 0 }}
                                  animate={{ width: `${(currentTime / duration) * 100 || 0}%` }}
                                />
                             </div>
                             <span className="text-[9px] md:text-[10px] font-mono text-white/40 w-10">{formatTime(duration)}</span>
                           </div>
                           
                           <div className="flex items-center justify-center lg:justify-start gap-6 md:gap-8">
                              <button 
                                onClick={() => toggleAudio(isPlayingAudiobook ? 'audiobook' : 'podcast')}
                                className="w-16 h-16 md:w-20 md:h-20 bg-[#00E5FF] text-black rounded-full flex items-center justify-center hover:scale-105 transition-all shadow-[0_0_30px_rgba(0,229,255,0.4)]"
                              >
                                { (isPlayingPodcast || isPlayingAudiobook) ? (
                                  <Pause size={isMobile ? 28 : 32} fill="black" />
                                ) : (
                                  <Play size={isMobile ? 28 : 32} fill="black" className="ml-1" />
                                ) }
                              </button>
                              <div className="hidden sm:block">
                                <WaveformVisualizer active={isPlayingPodcast || isPlayingAudiobook} />
                              </div>
                           </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center gap-6 text-white/5">
                    <Database className="w-20 h-20 md:w-32 md:h-32" />
                    <p className="text-[10px] md:text-xs font-mono font-black uppercase tracking-[0.5em] md:tracking-[1em]">No Stream Available</p>
                  </div>
                )}
              </div>

              {/* SIDEBAR CONTROLS */}
              <div className="w-full md:w-72 lg:w-80 bg-black/40 border-t md:border-t-0 md:border-l border-white/5 p-4 md:p-6 space-y-4 md:space-y-6 overflow-y-auto">
                   <h3 className="text-[8px] md:text-[10px] font-mono font-black text-white/20 uppercase tracking-widest border-b border-white/5 pb-2">Operational Uplinks</h3>
                   
                   <div className="grid grid-cols-3 md:grid-cols-1 gap-2 md:gap-3">
                      {hasVideo && (
                        <button 
                          onClick={() => setActiveView('video')}
                          className={`flex items-center justify-center md:justify-start gap-2 md:gap-3 px-2 md:px-4 py-3 rounded-xl text-[8px] md:text-[9px] font-black uppercase transition-all ${activeView === 'video' ? 'bg-[#00E5FF] text-black shadow-[0_0_20px_rgba(0,229,255,0.4)]' : 'bg-white/5 text-white/40 hover:bg-white/10'}`}
                        >
                          <Video size={isMobile ? 12 : 14} /> <span className="hidden xs:inline">Video</span>
                        </button>
                      )}
                      {hasDoc && (
                        <button 
                          onClick={() => setActiveView('doc')}
                          className={`flex items-center justify-center md:justify-start gap-2 md:gap-3 px-2 md:px-4 py-3 rounded-xl text-[8px] md:text-[9px] font-black uppercase transition-all ${activeView === 'doc' ? 'bg-[#00E5FF] text-black shadow-[0_0_20px_rgba(0,229,255,0.4)]' : 'bg-white/5 text-white/40 hover:bg-white/10'}`}
                        >
                          <FileText size={isMobile ? 12 : 14} /> <span className="hidden xs:inline">Manual</span>
                        </button>
                      )}
                      {(hasAudio || hasAudiobook) && (
                        <button 
                          onClick={() => setActiveView('audio')}
                          className={`flex items-center justify-center md:justify-start gap-2 md:gap-3 px-2 md:px-4 py-3 rounded-xl text-[8px] md:text-[9px] font-black uppercase transition-all ${activeView === 'audio' ? 'bg-[#00E5FF] text-black shadow-[0_0_20px_rgba(0,229,255,0.4)]' : 'bg-white/5 text-white/40 hover:bg-white/10'}`}
                        >
                          <Headphones size={isMobile ? 12 : 14} /> <span className="hidden xs:inline">Audio</span>
                        </button>
                      )}
                   </div>

                   <div className="hidden md:block h-px bg-white/5 w-full" />

                   <div className="hidden md:flex flex-col gap-4">
                      {hasAudiobook && (
                        <div className={`p-4 rounded-2xl border transition-all ${isPlayingAudiobook ? 'bg-purple-500/10 border-purple-500/40' : 'bg-white/[0.02] border-white/5'}`}>
                           <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2 text-purple-400"><BookOpen size={12} /><span className="text-[8px] font-black uppercase">Audiobook</span></div>
                              <button onClick={() => toggleAudio('audiobook')} className="p-2 bg-purple-500/20 text-purple-400 rounded-lg">
                                {isPlayingAudiobook ? <Pause size={14} /> : <Play size={14} />}
                              </button>
                           </div>
                        </div>
                      )}

                      {hasAudio && (
                        <div className={`p-4 rounded-2xl border transition-all ${isPlayingPodcast ? 'bg-green-500/10 border-green-500/40' : 'bg-white/[0.02] border-white/5'}`}>
                           <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2 text-green-400"><Radio size={12} /><span className="text-[8px] font-black uppercase">Podcast</span></div>
                              <button onClick={() => toggleAudio('podcast')} className="p-2 bg-green-500/20 text-green-400 rounded-lg">
                                {isPlayingPodcast ? <Pause size={14} /> : <Play size={14} />}
                              </button>
                           </div>
                        </div>
                      )}
                   </div>
              </div>
            </div>
            <audio 
              ref={audioRef} 
              onTimeUpdate={handleTimeUpdate}
              onEnded={() => { setIsPlayingPodcast(false); setIsPlayingAudiobook(false); }} 
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MissionModal;