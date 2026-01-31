"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Headset, Lock, Edit3, Trash2, Play, Pause } from 'lucide-react';
import { TrainingModule } from '@/types/portal';

interface AudioLibraryProps {
  modules: TrainingModule[];
  isMaster: boolean;
  onEdit: (module: TrainingModule) => void;
  onDelete: (id: string) => void;
  onToggleLock: (id: string) => void;
}

const AudioLibrary = ({ modules, isMaster, onEdit, onDelete, onToggleLock }: AudioLibraryProps) => {
  // Filtra módulos que possuem URL de áudio
  const audioModules = modules.filter(m => m.audioUrl);
  
  // Estado simplificado para simular a reprodução
  const [playingId, setPlayingId] = React.useState<string | null>(null);

  const handlePlayPause = (id: string) => {
    // Se já estiver tocando, pausa. Senão, começa a tocar.
    setPlayingId(playingId === id ? null : id);
  };

  return (
    <div className="space-y-12">
      <div className="flex items-center gap-4">
        <Headset className="w-6 h-6 text-[#00E5FF]" />
        <h2 className="text-4xl font-black text-white uppercase tracking-tighter">TACTICAL <span className="font-light text-white/20">AUDIO HUB</span></h2>
      </div>

      {/* Audio List */}
      <div className="grid grid-cols-1 gap-6">
        {audioModules.length === 0 ? (
          <p className="text-white/50 italic">No audio assets available in the current database.</p>
        ) : (
          audioModules.map((mod, i) => (
            <motion.div
              key={mod.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className={`p-6 rounded-2xl border transition-all ${
                mod.locked && !isMaster 
                  ? 'bg-zinc-900/50 border-white/5 opacity-50 cursor-not-allowed' 
                  : playingId === mod.id 
                    ? 'bg-[#00E5FF]/10 border-[#00E5FF]/40 shadow-[0_0_20px_rgba(0,229,255,0.2)]' 
                    : 'bg-black/40 border-white/10 hover:border-[#00E5FF]/20'
              }`}
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => handlePlayPause(mod.id)}
                    disabled={mod.locked && !isMaster}
                    className={`p-3 rounded-full transition-colors ${
                      playingId === mod.id 
                        ? 'bg-[#00E5FF] text-black' 
                        : 'bg-white/10 text-[#00E5FF] hover:bg-white/20'
                    } ${mod.locked && !isMaster ? 'opacity-30' : ''}`}
                  >
                    {playingId === mod.id ? <Pause size={18} fill="black" /> : <Play size={18} fill="#00E5FF" />}
                  </button>
                  <div className="space-y-1">
                    <h3 className="text-xl font-black text-white uppercase tracking-tighter">{mod.title}</h3>
                    <p className="text-xs font-mono text-white/50">{mod.desc}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className={`text-[9px] font-mono font-black px-3 py-1 rounded-full ${mod.locked ? 'bg-red-900/30 text-red-400' : 'bg-green-900/30 text-green-400'}`}>
                    {mod.locked ? 'LOCKED' : 'ACTIVE'}
                  </span>
                  
                  {isMaster && (
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
                </div>
              </div>
              
              {/* Simplified Audio Player Placeholder (Progress Bar) */}
              {playingId === mod.id && (
                <div className="mt-4 h-1 bg-white/10 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className="h-full bg-[#00E5FF] shadow-[0_0_10px_#00E5FF]"
                  />
                </div>
              )}
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default AudioLibrary;