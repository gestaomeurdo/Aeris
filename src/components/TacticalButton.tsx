"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface TacticalButtonProps {
  icon: React.ElementType;
  label: string;
  onClick?: () => void;
  className?: string;
}

const TacticalButton = ({ icon: Icon, label, onClick, className }: TacticalButtonProps) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={cn(
        "group relative flex flex-col items-center justify-center gap-3 py-4 px-2",
        "bg-[#020B1A] border border-[#00E5FF]/10 rounded-sm",
        "transition-all duration-300 hover:border-[#00E5FF]/50 hover:bg-[#0A192F]",
        "hover:shadow-[0_0_15px_rgba(0,229,255,0.15)]",
        className
      )}
    >
      {/* Neon Glow on Hover */}
      <div className="absolute inset-0 bg-[#00E5FF]/0 group-hover:bg-[#00E5FF]/5 transition-colors duration-500 rounded-sm" />
      
      <Icon className="w-5 h-5 text-[#B0BEC5] group-hover:text-[#00E5FF] transition-colors duration-300 drop-shadow-[0_0_8px_rgba(0,229,255,0)] group-hover:drop-shadow-[0_0_10px_rgba(0,229,255,0.5)]" />
      
      <span className="text-[9px] font-mono font-bold uppercase tracking-[0.2em] text-[#B0BEC5]/60 group-hover:text-[#00E5FF] transition-colors duration-300">
        {label}
      </span>
    </motion.button>
  );
};

export default TacticalButton;