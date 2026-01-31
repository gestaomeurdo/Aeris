"use client";

import React, { useState, useRef } from 'react';
import { Headphones, Play, Pause, SkipForward, Radio } from 'lucide-react';
import WaveformVisualizer from './WaveformVisualizer';
import { AudioTrack } from '@/types/portal';

interface AudioIntelligenceProps {
  tracks: AudioTrack[];
}

const AudioIntelligence = ({ tracks }: AudioIntelligenceProps) => {
  const [currentTrackIdx, setCurrentTrackIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlay = (idx: number) => {
    if (currentTrackIdx === idx) {
      if (isPlaying) {
        audioRef.current?.pause();
      } else {
        audioRef.current?.play();
      }
      setIsPlaying(!isPlaying);
    } else {
      setCurrentTrackIdx(idx);
      setIsPlaying(true);
      if (audioRef.current) {
        audioRef.current.src = tracks[idx].url;
        audioRef.current.play();
      }
    }
  };

  return (
    <section className="space-y-8">
      <audio 
        ref={audioRef} 
        src={tracks[currentTrackIdx]?.url} 
        onEnded={() => setIsPlaying(false)}
      />
      
      <div className="flex items-center gap-4">
        <div className="h-[2px] w-12 bg-[#00E5FF] shadow-[0_0_10px_#00E5FF]" />
        <h3 className="text-3xl font-black text-white tracking-tighter uppercase">INTELIGÊNCIA EM <span className="font-light">ÁUDIO</span></h3>
        <div className="flex-1 h-[1px] bg-white/10" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {tracks.map((track, i) => {
          const isActive = currentTrackIdx === i && isPlaying;
          const isSelected = currentTrackIdx === i;

          return (
            <div 
              key={track.id}
              className={`relative group bg-[#0A192F]/40 backdrop-blur-xl border ${isSelected ? 'border-[#00E5FF]/40 bg-[#00E5FF]/5' : 'border-white/5'} rounded-2xl p-6 transition-all duration-500 hover:border-[#00E5FF]/30 overflow-hidden`}
            >
              <div className="flex flex-col gap-6">
                <div className="flex items-start gap-4">
                  <div className="relative w-16 h-16 bg-white/5 rounded-xl flex items-center justify-center border border-white/10 group-hover:border-[#00E5FF]/40 transition-colors">
                    <Headphones className={`w-8 h-8 ${isSelected ? 'text-[#00E5FF]' : 'text-white/20'}`} />
                    {isActive && (
                      <div className="absolute -bottom-1 -right-1">
                        <WaveformVisualizer active={true} />
                      </div>
                    )}
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-white font-bold leading-tight group-hover:text-[#00E5FF] transition-colors">{track.title}</h4>
                    <p className="text-[10px] font-mono text-white/40 uppercase tracking-widest">{track.host}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between bg-black/40 rounded-xl p-3 border border-white/5">
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => togglePlay(i)}
                      className="p-2 hover:bg-white/5 rounded-lg transition-colors"
                    >
                      {isActive ? (
                        <Pause className="w-4 h-4 text-[#00E5FF] fill-[#00E5FF]" />
                      ) : (
                        <Play className={`w-4 h-4 ${isSelected ? 'text-[#00E5FF] fill-[#00E5FF]' : 'text-white/40'}`} />
                      )}
                    </button>
                    <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                      <SkipForward className="w-4 h-4 text-white/20" />
                    </button>
                  </div>
                  <span className="text-[10px] font-mono text-white/20">{track.duration}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default AudioIntelligence;