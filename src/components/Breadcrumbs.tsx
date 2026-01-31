"use client";

import React from 'react';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbsProps {
  view: string;
}

const Breadcrumbs = ({ view }: BreadcrumbsProps) => {
  const getLabel = () => {
    switch (view) {
      case 'dashboard': return 'GLOBAL_OVERVIEW';
      case 'missions': return 'TACTICAL_MODULES';
      case 'audio': return 'AURAL_INTELLIGENCE';
      case 'docs': return 'TECHNICAL_RESOURCES';
      default: return 'TERMINAL';
    }
  };

  return (
    <div className="flex items-center gap-3 px-2 mb-8 select-none">
      <span className="text-[10px] font-mono font-black text-white/20 uppercase tracking-widest">MISSION_CONTROL</span>
      <ChevronRight className="w-3 h-3 text-white/10" />
      <span className="text-[10px] font-mono font-black text-[#00E5FF] uppercase tracking-[0.3em] drop-shadow-[0_0_8px_rgba(0,229,255,0.4)]">
        {getLabel()}
      </span>
    </div>
  );
};

export default Breadcrumbs;