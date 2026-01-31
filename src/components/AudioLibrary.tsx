"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Headset, Lock, Edit3, Trash2, Play, Pause, Upload, FileAudio, X } from 'lucide-react';
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
  const audioModules = modules.filter(m => m.audioUrl || m.id === 'TEST-00');
  
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [localAudio, setLocalAudio] = useState<{ url: string, name: string } | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // Cleanup local audio URL when component unmounts or localAudio changes
  useEffect(() => {
    return () => {
      if (localAudio) {
        URL.revokeObjectURL(localAudio.url);
      }
    };
  }, [localAudio]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'audio/mp3') {
      if (localAudio) URL.revokeObjectURL(localAudio.url);
      
      const url = URL.createObjectURL(file);
      setLocalAudio({ url, name: file.name });
      setPlayingId('TEST-00');
      setIsPlaying(false);
      setCurrentTime(0);
      setDuration(0);
      
      if (audioRef.current) {
        audioRef.current.src = url;
        audioRef.current.load();
      }
    }
  };

  const handlePlayPause = (id: string, url: string) => {
    if (!audioRef.current) return;

    if (playingId === id) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    } else {
      // Switching track
      setPlayingId(id);
      audioRef.current.src = url;
      audioRef.current.load();
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setDuration(audioRef.current.duration);
    }
  };

  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return "0:00";
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const currentModule = audioModules.find(m => m.id === playingId);
  const currentUrl = currentModule 
    ? (currentModule.id === 'TEST-00' && localAudio) 
      ? localAudio.url 
      : currentModule.audioUrl 
    : '';

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

      <div className="flex items-center justify-between gap-4 border-b border-white/5 pb-8">
        <div className="flex items-center gap-4">
          <Headset className="w-6 h-6 text-[#00E5FF]" />
          <h2 className="text-4xl font-black text-white uppercase tracking-tighter">TACTICAL <span className="font-light text-white/20">AUDIO HUB</span></h2>
        </div>
        
        {isMaster && (
          <div className="relative">
            <label htmlFor="audio-upload" className="flex items-center gap-3 px-6 py-3 bg-[#00E5FF]/10 border border-[#00E5FF]/30 rounded-xl text-[9px] font-black text-[#00E5FF] uppercase tracking-widest cursor-pointer hover:bg-[#00E5FF]/20 transition-all">
              <Upload className="w-3 h-3" />
              Upload Local MP3
            </label>
            <input 
              id="audio-upload" 
              type="file" 
              accept=".mp3" 
              onChange={handleFileChange} 
              className="hidden" 
            />
          </div>
        )}
      </div>

      {/* Global Player Card (Visible when a track is selected) */}
      {playingId && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-8 bg-[#0A192F]/60 border border-[#00E5FF]/40 rounded-3xl shadow-[0_0_30px_rgba(0,229,255,0.2)] space-y-6"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-[#00E5FF]/10 rounded-xl border border-[#00E5FF]/20">
                <FileAudio className="w-6 h-6 text-[#00E5FF]" />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-mono font-black text-[#00E5FF] uppercase tracking-widest">Now Playing</span>
                <h3 className="text-xl font-bold text-white uppercase tracking-tighter">
                  {currentModule?.title || localAudio?.name || 'Unknown Asset'}
                </h3>
              </div>
            </div>
            <button onClick={() => handlePlayPause(playingId, currentUrl)} className="p-4 bg-[#00E5FF] text-black rounded-full hover:scale-105 transition-transform shadow-[0_0_20px_rgba(0,229,255,0.4)]">
              {isPlaying ? <Pause size={24} fill="black" /> : <Play size={24} fill="black" className="ml-1" />}
            </button>
          </div>

          {/* Progress Bar and Waveform */}
          <div className="space-y-3">
            <div className="flex items-center gap-4">
              <span className="text-[10px] font-mono text-white/40">{formatTime(currentTime)}</span>
              <div className="flex-1 h-2 bg-white/10 rounded-full relative">
                <div 
                  className="h-full bg-[#00E5FF] rounded-full shadow-[0_0_10px_#00E5FF]" 
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

      {/* Audio List */}
      <div className="grid grid-cols-1 gap-6">
        {audioModules.length === 0 ? (
          <p className="text-white/50 italic">No audio assets available in the current database.</p>
        ) : (
          audioModules.map((mod, i) => {
            const isLocalTest = mod.id === 'TEST-00';
            const url = isLocalTest ? localAudio?.url || '' : mod.audioUrl;
            const isActive = playingId === mod.id;
            const isLocked = mod.locked && !isMaster;

            if (isLocalTest && !localAudio) return null; // Hide local test slot if no file is loaded

            return (
              <motion.div
                key={mod.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className={`p-6 rounded-2xl border transition-all ${
                  isLocked 
                    ? 'bg-zinc-900/50 border-white/5 opacity-50 cursor-not-allowed' 
                    : isActive 
                      ? 'bg-[#00E5FF]/10 border-[#00E5FF]/40 shadow-[0_0_20px_rgba(0,229,255,0.2)]' 
                      : 'bg-black/40 border-white/10 hover:border-[#00E5FF]/20'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-4">
                    <button 
                      onClick={() => !isLocked && handlePlayPause(mod.id, url)}
                      disabled={isLocked || !url}
                      className={`p-3 rounded-full transition-colors ${
                        isActive 
                          ? 'bg-[#00E5FF] text-black' 
                          : 'bg-white/10 text-[#00E5FF] hover:bg-white/20'
                      } ${isLocked || !url ? 'opacity-30 cursor-not-allowed' : ''}`}
                    >
                      {isActive && isPlaying ? <Pause size={18} fill="black" /> : <Play size={18} fill="#00E5FF" />}
                    </button>
                    <div className="space-y-1">
                      <h3 className="text-xl font-black text-white uppercase tracking-tighter">
                        {isLocalTest ? localAudio?.name.toUpperCase() : mod.title}
                      </h3>
                      <p className="text-xs font-mono text-white/50">
                        {isLocalTest ? 'LOCAL UPLINK // TEST ASSET' : mod.desc}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className={`text-[9px] font-mono font-black px-3 py-1 rounded-full ${mod.locked ? 'bg-red-900/30 text-red-400' : 'bg-green-900/30 text-green-400'}`}>
                      {mod.locked ? 'LOCKED' : 'ACTIVE'}
                    </span>
                    
                    {isMaster && (
                      <>
                        {isLocalTest ? (
                          <button onClick={() => { setLocalAudio(null); setPlayingId(null); }} className="p-2 text-red-400 hover:bg-red-500/10 transition-colors rounded-lg">
                            <X size={16} />
                          </button>
                        ) : (
                          <>
                            <button onClick={() => onEdit(mod)} className="p-2 text-white/50 hover:text-[#00E5FF] transition-colors">
                              <Edit3 size={16} />
                            </button>
                            <button onClick={() => onToggleLock(mod.id)} className="p-2 text-white/50 hover:text-yellow-400 transition-colors">
                              <Lock size={16} />
                            </button>
                            <button onClick={() => onDelete(mod.id)} className="p-2 text-white/50 hover:text-red-400 transition-colors">
                              <Trash2 size={16} />
                            </button>
                          </>
                        )}
                      </>
                    )}
                  </div>
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