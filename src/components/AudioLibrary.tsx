"use client";

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Headset, Lock, Edit3, Trash2, Play, Pause, FileAudio, Settings2 } from 'lucide-react';
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
  // Filtra apenas módulos que possuem áudio configurado
  const audioModules = modules.filter(m => m.audioUrl);
  
  const [playingDbId, setPlayingDbId] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const handlePlayPause = async (dbId: string, url: string) => {
    if (!audioRef.current || !url) return;

    const audio = audioRef.current;

    if (playingDbId === dbId) {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        try {
          await audio.play();
          setIsPlaying(true);
        } catch (error) {
          console.error("Playback failed:", error);
        }
      }
    } else {
      setPlayingDbId(dbId);
      setIsPlaying(true); 
      audio.src = url;
      audio.load(); 
      
      audio.oncanplaythrough = async () => {
        try {
          await audio.play();
        } catch (error) {
          console.error("Playback failed on switch:", error);
        }
        audio.oncanplaythrough = null; 
      };
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
        onLoadedMetadata={() => {
          if (audioRef.current) setDuration(audioRef.current.duration);
        }}
        onEnded={() => {
          setIsPlaying(false);
          setCurrentTime(0);
        }}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      <div className="flex items-center gap-4 border-b border-white/5 pb-8">
        <Headset className="w-6 h-6 text-[#00E5FF]" />
        <h2 className="text-4xl font-black text-white uppercase tracking-tighter">TACTICAL <span className="font-light text-white/20">AUDIO HUB</span></h2>
      </div>

      {/* Player Principal - Estilo HUD */}
      {playingDbId && currentModule && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-8 bg-[#0A192F]/60 border border-[#00E5FF]/40 rounded-3xl shadow-[0_0_30px_rgba(0,229,255,0.2)] space-y-6 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-scanline opacity-[0.03] pointer-events-none" />
          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-[#00E5FF]/10 rounded-xl border border-[#00E5FF]/20">
                <FileAudio className="w-6 h-6 text-[#00E5FF]" />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-mono font-black text-[#00E5FF] uppercase tracking-widest">TRANSMISSION_ACTIVE</span>
                <h3 className="text-xl font-black text-white uppercase tracking-tighter">
                  {currentModule.title}
                </h3>
              </div>
            </div>
            <button 
              onClick={() => handlePlayPause(currentModule.dbId, currentUrl)} 
              className="p-4 bg-[#00E5FF] text-black rounded-full hover:scale-105 transition-all shadow-[0_0_20px_rgba(0,229,255,0.4)]"
            >
              {isPlaying ? <Pause size={24} fill="black" /> : <Play size={24} fill="black" className="ml-1" />}
            </button>
          </div>

          <div className="space-y-3 relative z-10">
            <div className="flex items-center gap-4">
              <span className="text-[10px] font-mono text-white/40">{formatTime(currentTime)}</span>
              <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#00E5FF] shadow-[0_0_10px_#00E5FF]" 
                  style={{ width: `${(currentTime / duration) * 100}%` }}
                />
              </div>
              <span className="text-[10px] font-mono text-white/40">{formatTime(duration)}</span>
            </div>
            <div className="flex justify-center">
              <WaveformVisualizer active={isPlaying} />
            </div>
          </div>
        </motion.div>
      )}

      {/* Lista de Podcasts/Áudios */}
      <div className="grid grid-cols-1 gap-4">
        {audioModules.length === 0 ? (
          <div className="p-12 border border-dashed border-white/10 rounded-3xl text-center">
            <p className="text-white/20 font-mono text-xs uppercase tracking-widest">Nenhuma transmissão de áudio detectada no sistema.</p>
          </div>
        ) : (
          audioModules.map((mod, i) => {
            const isActive = playingDbId === mod.dbId;
            const isLocked = mod.locked && !isMaster;

            return (
              <motion.div
                key={mod.dbId}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className={`p-6 rounded-2xl border transition-all ${
                  isLocked 
                    ? 'bg-red-500/5 border-red-500/10 opacity-40' 
                    : isActive 
                      ? 'bg-[#00E5FF]/10 border-[#00E5FF]/40' 
                      : 'bg-white/[0.02] border-white/5 hover:border-white/10'
                }`}
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <button 
                      onClick={() => !isLocked && handlePlayPause(mod.dbId, mod.audioUrl)}
                      disabled={isLocked}
                      className={`p-3 rounded-full transition-all ${
                        isActive && isPlaying
                          ? 'bg-[#00E5FF] text-black' 
                          : 'bg-white/5 text-[#00E5FF] hover:bg-white/10'
                      } ${isLocked ? 'cursor-not-allowed' : ''}`}
                    >
                      {isActive && isPlaying ? <Pause size={18} fill="black" /> : <Play size={18} fill="#00E5FF" className="ml-1" />}
                    </button>
                    <div className="space-y-1">
                      <h3 className="text-lg font-black text-white uppercase tracking-tighter leading-none">{mod.title}</h3>
                      <p className="text-[10px] font-mono text-white/30 uppercase tracking-widest">{mod.id} // {mod.type}</p>
                    </div>
                  </div>

                  {isMaster && (
                    <div className="flex items-center gap-2">
                      <button onClick={() => onEdit(mod)} className="p-2 text-white/20 hover:text-[#00E5FF] transition-colors"><Settings2 size={16} /></button>
                      <button onClick={() => onDelete(mod.id)} className="p-2 text-white/20 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default AudioLibrary;