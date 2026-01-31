"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Headset, Lock, Edit3, Trash2, Play, Pause, FileAudio, Settings2, Activity, Radio } from 'lucide-react';
import { TrainingModule } from '@/types/portal';
import WaveformVisualizer from './WaveformVisualizer';

interface AudioLibraryProps {
  modules: TrainingModule[];
  isMaster: boolean;
  onEdit: (module: TrainingModule) => void;
  onDelete: (id: string) => void;
  onToggleLock: (id: string) => void;
}

const AudioLibrary = ({ modules, isMaster, onEdit, onDelete, onToggleLock }: AudioLibraryProps) => {
  // Agora recebe apenas os módulos já filtrados por categoria 'podcast' no Index.tsx
  const audioModules = modules;
  
  const [playingDbId, setPlayingDbId] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
      }
    };
  }, []);

  const handlePlayPause = async (dbId: string, url: string) => {
    if (!audioRef.current || !url) return;
    const audio = audioRef.current;

    if (playingDbId === dbId) {
      if (isPlaying) audio.pause();
      else await audio.play();
    } else {
      audio.pause();
      audio.src = "";
      setPlayingDbId(dbId);
      setTimeout(async () => {
        audio.src = url;
        audio.load();
        await audio.play();
        setIsPlaying(true);
      }, 50);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setDuration(audioRef.current.duration);
    }
  };

  const formatTime = (seconds: number) => {
    if (isNaN(seconds) || seconds === Infinity) return "0:00";
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const currentModule = audioModules.find(m => m.dbId === playingDbId);
  const currentUrl = currentModule?.audioUrl || '';

  return (
    <div className="space-y-12">
      <audio 
        ref={audioRef} 
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={() => { if (audioRef.current) setDuration(audioRef.current.duration); }}
        onEnded={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      <div className="flex items-center gap-4 border-b border-white/5 pb-8">
        <Radio className="w-6 h-6 text-[#00E5FF]" />
        <h2 className="text-4xl font-black text-white uppercase tracking-tighter">AURAL <span className="font-light text-white/20">INTELLIGENCE</span></h2>
      </div>

      {playingDbId && currentModule ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-10 bg-[#0A192F]/60 border border-[#00E5FF]/40 rounded-[32px] shadow-[0_0_50px_rgba(0,229,255,0.15)] space-y-8 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-scanline opacity-[0.05] pointer-events-none" />
          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-[#00E5FF]/10 rounded-2xl border border-[#00E5FF]/20 flex items-center justify-center relative overflow-hidden">
                <Headset className="w-10 h-10 text-[#00E5FF]" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                   <Activity className="w-3 h-3 text-[#00E5FF] animate-pulse" />
                   <span className="text-[9px] font-mono font-black text-[#00E5FF] uppercase tracking-[0.3em]">PODCAST_FEED_ACTIVE</span>
                </div>
                <h3 className="text-3xl font-black text-white uppercase tracking-tighter leading-none">{currentModule.title}</h3>
              </div>
            </div>
            <button 
              onClick={() => handlePlayPause(currentModule.dbId, currentUrl)} 
              className="w-20 h-20 bg-[#00E5FF] text-black rounded-full hover:scale-105 active:scale-95 transition-all shadow-[0_0_40px_rgba(0,229,255,0.4)] flex items-center justify-center"
            >
              {isPlaying ? <Pause size={32} fill="black" /> : <Play size={32} fill="black" className="ml-1" />}
            </button>
          </div>
          {/* Progress & Waveform */}
          <div className="space-y-4 relative z-10">
            <div className="flex items-center gap-6">
              <span className="text-xs font-mono text-white/40 w-12 text-right">{formatTime(currentTime)}</span>
              <div className="flex-1 h-3 bg-white/5 rounded-full overflow-hidden border border-white/5">
                <motion.div initial={false} animate={{ width: `${(currentTime / duration) * 100}%` }} className="h-full bg-gradient-to-r from-[#00E5FF]/40 to-[#00E5FF] shadow-[0_0_20px_#00E5FF]" />
              </div>
              <span className="text-xs font-mono text-white/40 w-12">{formatTime(duration)}</span>
            </div>
            <div className="flex justify-center h-12"><WaveformVisualizer active={isPlaying} /></div>
          </div>
        </motion.div>
      ) : (
        <div className="p-16 border border-dashed border-white/10 rounded-[32px] flex flex-col items-center gap-4 bg-white/[0.01]">
           <Radio className="w-12 h-12 text-white/10" />
           <p className="text-[10px] font-mono text-white/20 uppercase tracking-[0.5em]">Selecione um podcast para iniciar a transmissão</p>
        </div>
      )}

      {/* Lista de Podcasts Filtrados */}
      <div className="grid grid-cols-1 gap-4">
        {audioModules.map((mod, i) => {
          const isActive = playingDbId === mod.dbId;
          const isLocked = mod.locked && !isMaster;
          return (
            <motion.div
              key={mod.dbId}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className={`group relative p-6 rounded-2xl border transition-all duration-500 overflow-hidden ${
                isLocked ? 'bg-red-500/5 border-red-500/10 opacity-40' : isActive ? 'bg-[#00E5FF]/10 border-[#00E5FF]/40 shadow-[0_0_30px_rgba(0,229,255,0.1)]' : 'bg-white/[0.02] border-white/5 hover:border-[#00E5FF]/20 hover:bg-white/[0.04]'
              }`}
            >
              <div className="flex justify-between items-center relative z-10">
                <div className="flex items-center gap-6">
                  <button onClick={() => !isLocked && handlePlayPause(mod.dbId, mod.audioUrl)} disabled={isLocked} className={`w-12 h-12 rounded-full transition-all flex items-center justify-center ${isActive && isPlaying ? 'bg-[#00E5FF] text-black shadow-[0_0_20px_#00E5FF]' : 'bg-white/5 text-[#00E5FF] hover:bg-[#00E5FF] hover:text-black'}`}>
                    {isActive && isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" className="ml-1" />}
                  </button>
                  <div className="space-y-1">
                    <h3 className={`text-xl font-black uppercase tracking-tighter leading-none transition-colors ${isActive ? 'text-[#00E5FF]' : 'text-white'}`}>{mod.title}</h3>
                    <p className="text-[9px] font-mono text-white/30 uppercase tracking-widest">{mod.id} // SECURE_PODCAST</p>
                  </div>
                </div>
                {isMaster && (
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => onEdit(mod)} className="p-3 bg-black/40 border border-white/10 rounded-xl text-white/40 hover:text-[#00E5FF]"><Settings2 size={16} /></button>
                    <button onClick={() => onDelete(mod.id)} className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500"><Trash2 size={16} /></button>
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default AudioLibrary;