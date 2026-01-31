"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Globe, Activity, Terminal } from 'lucide-react';

const logs = [
  "INITIATING UPLINK PROTOCOL 7.0-BETA...",
  "SYNCING MODULE: NCO_CORE_V2.0 [100%]",
  "UPDATING LEADERSHIP PROTOCOLS...",
  "ASSET RETRIEVAL: DOC-01 SUCCESSFUL",
  "VOX FEED: DECRYPTING SIGNAL 3...",
  "FIREWALL STATUS: ACTIVE",
  "GLOBAL READINESS INDEX: 94.2%",
  "DEPLOYMENT: CORE_V1.0 CONFIRMED",
  "SYSTEM CHECK: ALL SUBSYSTEMS NOMINAL",
  "TACTICAL DATA FEED // REALTIME ACTIVE",
  "ENCRYPTION KEY ROTATION SCHEDULED...",
  "MODULE MOD-06: ACCESS DENIED (LOCKED)",
  "OPERATOR MIKE: SESSION ACTIVE",
  "LOGGING SYSTEM METRICS...",
];

const SineWaveVisualizer = ({ readiness }: { readiness: number }) => {
  // Static path for a simple wave shape
  const pathD = "M0 50 C 10 30, 20 70, 30 50 S 50 30, 60 50 S 80 70, 90 50 S 100 30, 100 50";

  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
      <motion.path
        d={pathD}
        stroke="#00E5FF"
        strokeWidth="2"
        fill="none"
        className="drop-shadow-[0_0_5px_rgba(0,229,255,0.8)]"
        initial={{ scaleY: 0.8 }}
        animate={{ 
          scaleY: [0.8, 1.2, 0.8], // Pulsing effect
          x: [0, 5, 0] // Subtle horizontal shift
        }}
        transition={{ 
          duration: 2, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
        style={{ originY: '50%' }}
      />
    </svg>
  );
};

const GlobalReadinessHUD = () => {
  const [currentLogs, setCurrentLogs] = useState<string[]>(logs.slice(0, 5));
  const [readiness, setReadiness] = useState(94.2); // Dummy readiness metric

  useEffect(() => {
    const interval = setInterval(() => {
      const nextLogIndex = currentLogs.length % logs.length;
      setCurrentLogs(prev => {
        // Ensure the scrollable area updates by keeping a fixed number of logs
        const newLogs = [...prev, logs[nextLogIndex]].slice(-10); 
        return newLogs;
      });
    }, 1500);
    return () => clearInterval(interval);
  }, [currentLogs.length]);

  return (
    <div className="space-y-12">
      <div className="flex items-center gap-4">
        <Globe className="w-6 h-6 text-[#00E5FF]" />
        <h2 className="text-4xl font-black text-white uppercase tracking-tighter">GLOBAL <span className="font-light text-white/20">READINESS HUD</span></h2>
      </div>

      <div className="relative w-full aspect-[16/7] bg-black/40 border border-[#00E5FF]/20 rounded-[40px] p-8 overflow-hidden shadow-[0_0_50px_rgba(0,229,255,0.1)] backdrop-blur-xl">
        
        {/* Background Map Visual (Minimalist Tactical World Map) */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <svg viewBox="0 0 1000 500" className="w-full h-full text-[#00E5FF]/20">
            {/* Simple geometric representation of continents/regions */}
            <path 
              d="M 50 150 L 150 100 L 250 150 L 300 250 L 200 350 L 100 300 Z" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="1" 
              className="animate-pulse duration-[5s]"
            />
            <path 
              d="M 400 100 C 500 50, 700 50, 800 150 L 750 300 L 600 400 L 450 350 Z" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="1" 
              className="animate-pulse duration-[7s]"
            />
            {/* Grid overlay */}
            <rect x="0" y="0" width="1000" height="500" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="50 50" opacity="0.3" />
          </svg>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 h-full gap-8 relative z-10">
          
          {/* Left Column: Terminal Feed */}
          <div className="col-span-2 bg-black/60 border border-white/10 rounded-3xl p-6 flex flex-col overflow-hidden group hover:border-[#00E5FF]/40 transition-all duration-500">
            <div className="flex items-center gap-3 mb-4">
              <Terminal className="w-4 h-4 text-[#00E5FF]" />
              <span className="text-[10px] font-mono font-black text-[#00E5FF] uppercase tracking-widest">Tactical Log Feed</span>
            </div>
            <div className="flex-1 overflow-y-auto space-y-2 text-xs font-mono text-white/70 custom-scrollbar">
              {currentLogs.map((log, index) => (
                <motion.p 
                  key={index} 
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`hover:text-[#00E5FF] transition-colors ${log.includes('SUCCESSFUL') ? 'text-green-400' : log.includes('DENIED') ? 'text-red-400' : ''}`}
                >
                  <span className="text-[#00E5FF]/40 mr-2">{'>'}</span> {log}
                </motion.p>
              ))}
            </div>
          </div>

          {/* Right Column: Pulse Metrics */}
          <div className="col-span-1 bg-black/60 border border-white/10 rounded-3xl p-6 flex flex-col justify-between group hover:border-[#00E5FF]/40 transition-all duration-500">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Activity className="w-4 h-4 text-[#00E5FF]" />
                <span className="text-[10px] font-mono font-black text-[#00E5FF] uppercase tracking-widest">Pulse Metrics</span>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Operational Readiness</span>
                <p className="text-5xl font-black text-white drop-shadow-[0_0_10px_rgba(0,229,255,0.5)]">{readiness}%</p>
              </div>
            </div>

            <div className="h-24 w-full relative">
              <SineWaveVisualizer readiness={readiness} />
            </div>

            <div className="flex justify-between text-[9px] font-mono text-white/40 uppercase pt-4 border-t border-white/5">
              <span>Signal Integrity</span>
              <span className="text-[#00E5FF]">NOMINAL</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlobalReadinessHUD;