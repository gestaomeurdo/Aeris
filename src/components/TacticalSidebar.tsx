"use client";

import React from 'react';
import { LayoutGrid, Target, Headphones, FileText, User, LogOut } from 'lucide-react';
import AerisLogo from './AerisLogo';
import { useIsMobile } from '@/hooks/use-mobile';

interface TacticalSidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
  isMaster: boolean;
  onUserClick: () => void;
}

const TacticalSidebar = ({ activeView, onViewChange, isMaster, onUserClick }: TacticalSidebarProps) => {
  const isMobile = useIsMobile();
  const menuItems = [
    { id: 'dashboard', icon: LayoutGrid, label: 'OVERVIEW' },
    { id: 'missions', icon: Target, label: 'MISSIONS' },
    { id: 'audio', icon: Headphones, label: 'AUDIO HUB' },
    { id: 'docs', icon: FileText, label: 'RESOURCES' },
  ];

  if (isMobile) {
    return (
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] bg-black/80 backdrop-blur-2xl border border-white/10 rounded-full flex items-center justify-around py-3 px-6 z-[100] shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        {menuItems.map((item) => {
          const isActive = activeView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`p-3 rounded-full transition-all ${isActive ? 'text-[#00E5FF] bg-[#00E5FF]/10' : 'text-white/40'}`}
            >
              <item.icon size={20} />
            </button>
          );
        })}
        <div className="w-[1px] h-6 bg-white/10" />
        <button 
          onClick={onUserClick}
          className={`p-3 rounded-full transition-all ${isMaster ? 'text-green-500 bg-green-500/10' : 'text-white/40'}`}
        >
          {isMaster ? <LogOut size={20} /> : <User size={20} />}
        </button>
      </nav>
    );
  }

  return (
    <nav className="fixed left-6 top-1/2 -translate-y-1/2 w-24 bg-black/60 backdrop-blur-3xl border border-white/5 rounded-[32px] flex flex-col items-center py-10 gap-10 z-50 shadow-2xl">
      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#00E5FF] to-[#6366F1] flex items-center justify-center p-2.5">
        <AerisLogo size={64} />
      </div>
      
      <div className="flex flex-col gap-6">
        {menuItems.map((item) => {
          const isActive = activeView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`group relative p-4 transition-all duration-500 rounded-2xl ${
                isActive 
                ? 'text-[#00E5FF] bg-[#00E5FF]/5 shadow-[0_0_20px_rgba(0,229,255,0.15)] border border-[#00E5FF]/20' 
                : 'text-white/20 hover:text-white hover:bg-white/5'
              }`}
            >
              <item.icon className={`w-6 h-6 transition-all ${isActive ? 'drop-shadow-[0_0_8px_rgba(0,229,255,0.8)] scale-110' : ''}`} />
              <div className="absolute left-full ml-6 px-4 py-2 bg-[#00E5FF] text-black text-[9px] font-black uppercase tracking-widest rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-all translate-x-[-10px] group-hover:translate-x-0 shadow-[0_0_30px_rgba(0,229,255,0.4)] whitespace-nowrap z-50">
                {item.label}
              </div>
              {isActive && (
                <div className="absolute left-0 top-1/4 bottom-1/4 w-[3px] bg-[#00E5FF] rounded-full shadow-[0_0_15px_#00E5FF]" />
              )}
            </button>
          );
        })}
      </div>

      <div className="mt-auto">
        <button 
          onClick={onUserClick}
          className={`group relative p-4 transition-all duration-500 rounded-2xl ${
            isMaster 
            ? 'text-green-500 bg-green-500/5 shadow-[0_0_20px_rgba(34,197,94,0.3)] border border-green-500/30' 
            : 'text-white/20 hover:text-white hover:bg-white/5'
          }`}
        >
          {isMaster ? <LogOut className="w-6 h-6 drop-shadow-[0_0_10px_rgba(34,197,94,0.8)] scale-110" /> : <User className="w-6 h-6 transition-all" />}
          <div className={`absolute left-full ml-6 px-4 py-2 ${isMaster ? 'bg-red-500' : 'bg-white'} text-black text-[9px] font-black uppercase tracking-widest rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-all translate-x-[-10px] group-hover:translate-x-0 shadow-2xl whitespace-nowrap z-50`}>
            {isMaster ? 'TERMINATE MASTER SESSION' : 'IDENTIFY OPERATOR'}
          </div>
        </button>
      </div>
    </nav>
  );
};

export default TacticalSidebar;