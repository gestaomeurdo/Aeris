"use client";

import React from 'react';
import { LayoutGrid, Database, BarChart3, Shield, User } from 'lucide-react';
import AerisLogo from './AerisLogo';

interface TacticalSidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

const TacticalSidebar = ({ activeView, onViewChange }: TacticalSidebarProps) => {
  const menuItems = [
    { id: 'missions', icon: LayoutGrid, label: 'ACTIVE MISSIONS', desc: 'OPERATIONAL_THEATER' },
    { id: 'vault', icon: Database, label: 'INTELLIGENCE VAULT', desc: 'AURAL_DOC_ARCHIVE' },
    { id: 'readiness', icon: BarChart3, label: 'TROOP READINESS', desc: 'PERFORMANCE_METRICS' },
  ];

  return (
    <nav className="fixed left-6 top-1/2 -translate-y-1/2 w-20 bg-black/60 backdrop-blur-3xl border border-white/5 rounded-[32px] flex flex-col items-center py-10 gap-10 z-50 shadow-2xl">
      <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#00E5FF] to-[#6366F1] flex items-center justify-center p-2.5">
        <AerisLogo />
      </div>
      
      <div className="flex flex-col gap-6">
        {menuItems.map((item) => {
          const isActive = activeView === item.id;
          return (
            <div key={item.id} className="relative group">
              <button
                onClick={() => onViewChange(item.id)}
                className={`p-4 transition-all duration-500 rounded-2xl ${
                  isActive 
                  ? 'text-[#00E5FF] bg-[#00E5FF]/5 shadow-[0_0_20px_rgba(0,229,255,0.15)] border border-[#00E5FF]/20' 
                  : 'text-white/20 hover:text-white hover:bg-white/5'
                }`}
              >
                <item.icon className={`w-6 h-6 transition-all ${isActive ? 'drop-shadow-[0_0_8px_rgba(0,229,255,0.8)] scale-110' : ''}`} />
                
                {/* Active Indicator Bar */}
                {isActive && (
                  <div className="absolute left-0 top-1/4 bottom-1/4 w-[3px] bg-[#00E5FF] rounded-full shadow-[0_0_15px_#00E5FF]" />
                )}
              </button>

              {/* Technical Tooltip */}
              <div className="absolute left-full ml-6 top-1/2 -translate-y-1/2 px-4 py-3 bg-[#020B1A] border border-[#00E5FF]/20 text-white rounded-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-all translate-x-[-10px] group-hover:translate-x-0 shadow-2xl whitespace-nowrap z-50 min-w-[180px]">
                <p className="text-[10px] font-black uppercase tracking-widest text-[#00E5FF]">{item.label}</p>
                <p className="text-[8px] font-mono text-white/40 uppercase tracking-tighter mt-1">SYS_PATH: {item.desc}</p>
                <div className="absolute left-0 top-1/2 -translate-x-full -translate-y-1/2 border-8 border-transparent border-r-[#00E5FF]/20" />
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-auto space-y-4">
        <button className="p-4 text-white/20 hover:text-white transition-colors group relative">
          <Shield className="w-6 h-6" />
        </button>
        <button className="p-4 text-white/20 hover:text-white transition-colors">
          <User className="w-6 h-6" />
        </button>
      </div>
    </nav>
  );
};

export default TacticalSidebar;