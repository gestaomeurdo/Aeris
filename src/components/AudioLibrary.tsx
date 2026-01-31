"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Headset, Lock, Edit3, Trash2, Play, Pause, Radio, Volume2, Clock, Activity, Settings2 } from 'lucide-react';
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
  const audioModules = modules.filter(m => m.category === 'podcast'); // Filtrando apenas podcasts
  
  const [playingDbId, setPlayingDbId] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8); // New state for volume

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

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
  
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      const seekTime = parseFloat(e.target.value);
      audioRef.current.currentTime = seekTime;
      setCurrentTime(seekTime);
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

      {/* COMMAND CONSOLE (Player Principal) */}
      {playingDbId && currentModule ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-10 bg-black/60 backdrop-blur-xl border border-[#00E5FF]/40 rounded-[32px] shadow-[0_0_50px_rgba(0,229,255,0.15)] space-y-8 relative overflow-hidden"
        >
          {/* Neon Pulse Border Effect */}
          <div className="absolute inset-0 rounded-[32px] border-4 border-transparent pointer-events-none animate-pulse-slow">
             <style>{`
                @keyframes pulse-slow {
                    0%, 100% { box-shadow: 0 0 10px rgba(0, 229, 255, 0.3); }
                    50% { box-shadow: 0 0 30px rgba(0, 229, 255, 0.8); }
                }
                .animate-pulse-slow {
                    animation: pulse-slow 4s infinite ease-in-out;
                }
             `}</style>
          </div>
          
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
            
            {/* Play/Pause Button */}
            <button 
              onClick={() => handlePlayPause(currentModule.dbId, currentUrl)} 
              className="w-20 h-20 bg-[#00E5FF] text-black rounded-full hover:scale-105 active:scale-95 transition-all shadow-[0_0_40px_rgba(0,229,255,0.4)] flex items-center justify-center"
            >
              {isPlaying ? <Pause size={32} fill="black" /> : <Play size={32} fill="black" className="ml-1" />}
            </button>
          </div>
          
          {/* Progress & Waveform & Controls */}
          <div className="space-y-6 relative z-10">
            {/* Waveform Visualizer */}
            <div className="flex justify-center h-16 w-full bg-black/40 rounded-xl border border-white/10 p-2">
                <WaveformVisualizer active={isPlaying} />
            </div>

            {/* Time and Seek Bar */}
            <div className="flex items-center gap-6">
              <span className="text-sm font-mono text-[#00E5FF] w-12 text-right">{formatTime(currentTime)}</span>
              <input 
                type="range" 
                min="0" 
                max={duration} 
                value={currentTime} 
                onChange={handleSeek} 
                className="flex-1 h-2 bg-white/10 rounded-full appearance-none cursor-pointer accent-[#00E5FF]" 
              />
              <span className="text-sm font-mono text-white/40 w-12">{formatTime(duration)}</span>
            </div>

            {/* Volume Control */}
            <div className="flex items-center justify-end gap-4 pt-4 border-t border-white/5">
                <Volume2 className="w-4 h-4 text-[#00E5FF]" />
                <input 
                    type="range" 
                    min="0" 
                    max="1" 
                    step="0.01" 
                    value={volume} 
                    onChange={(e) => setVolume(parseFloat(e.target.value))} 
                    className="w-32 h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-[#00E5FF]" 
                />
            </div>
          </div>
        </motion.div>
      ) : (
        <div className="p-16 border border-dashed border-white/10 rounded-[32px] flex flex-col items-center gap-4 bg-white/[0.01]">
           <Radio className="w-12 h-12 text-white/10" />
           <p className="text-[10px] font-mono text-white/20 uppercase tracking-[0.5em]">Selecione um podcast para iniciar a transmissão</p>
        </div>
      )}

      {/* Lista de Módulos (Frequency Strips) */}
      <div className="grid grid-cols-1 gap-3">
        {audioModules.map((mod, i) => {
          const isActive = playingDbId === mod.dbId;
          const isLocked = mod.locked && !isMaster;
          
          return (
            <motion.div
              key={mod.dbId}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className={`relative w-full flex overflow-hidden group transition-all duration-500 ${
                isLocked 
                    ? 'bg-red-900/10 border border-red-500/20 opacity-50 cursor-default' 
                    : 'bg-[#0A192F]/80 border border-[#00E5FF]/20 hover:border-[#00E5FF]/60 hover:shadow-[0_0_30px_rgba(0,229,255,0.1)] cursor-pointer'
              } rounded-xl`}
            >
              {/* 1. Vertical Status Strip */}
              <div className={`w-2 transition-all duration-500 ${
                  isLocked ? 'bg-red-500' : isActive ? 'bg-[#00E5FF] shadow-[0_0_15px_#00E5FF]' : 'bg-white/10 group-hover:bg-[#00E5FF]/40'
              }`} />

              {/* 2. Hover Grid Overlay */}
              <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-[0.05] transition-opacity duration-500 bg-grid-pattern" />

              <div className="flex-1 p-6 flex justify-between items-center relative z-10">
                {/* Left/Center Content */}
                <div className="flex items-center gap-8">
                  {/* Play/Status Indicator (Target Reticle style) */}
                  <button 
                      onClick={() => !isLocked && handlePlayPause(mod.dbId, mod.audioUrl)} 
                      disabled={isLocked} 
                      className={`relative w-12 h-12 rounded-full transition-all flex items-center justify-center ${
                          isLocked ? 'bg-red-500/10 text-red-500' : isActive && isPlaying ? 'bg-[#00E5FF] text-black shadow-[0_0_15px_#00E5FF]' : 'bg-white/5 text-[#00E5FF] hover:bg-[#00E5FF] hover:text-black'
                      }`}
                  >
                      {/* Target Reticle Effect */}
                      <div className={`absolute inset-0 border-2 rounded-full transition-all duration-300 ${
                          isActive ? 'border-[#00E5FF]/60 scale-100' : 'border-white/10 scale-125 group-hover:scale-100 group-hover:border-[#00E5FF]/40'
                      }`} />
                      {isLocked ? <Lock size={18} /> : isActive && isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" className="ml-1" />}
                  </button>
                  
                  <div className="space-y-1">
                    <h3 className={`text-xl font-black uppercase tracking-tighter leading-none transition-colors ${isActive ? 'text-[#00E5FF]' : 'text-white'}`}>{mod.title}</h3>
                    <div className="flex items-center gap-4">
                        {/* Tactical Labels */}
                        <span className="text-[10px] font-mono font-black text-white/40 uppercase tracking-widest">
                            FREQ: 104.5 // {mod.type.toUpperCase()}
                        </span>
                        <span className="text-[10px] font-mono font-black text-[#00E5FF]/60 uppercase tracking-widest">
                            SECURE_CH
                        </span>
                    </div>
                  </div>
                </div>
                
                {/* Right Side: Metadata and Controls */}
                <div className="flex items-center gap-6">
                    <div className="text-right space-y-1 hidden sm:block">
                        <span className="block text-[8px] font-mono text-white/20 uppercase tracking-widest">V.O.X. ID</span>
                        <span className="block text-xs font-mono text-white/60">{mod.id}</span>
                    </div>
                    
                    {isMaster && (
                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onClick={(e) => { e.stopPropagation(); onEdit(mod); }} className="p-2 bg-black/40 border border-white/10 rounded-lg text-white/40 hover:text-[#00E5FF]"><Settings2 size={14} /></button>
                            <button onClick={(e) => { e.stopPropagation(); onDelete(mod.id); }} className="p-2 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500"><Trash2 size={14} /></button>
                        </div>
                    )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default AudioLibrary;