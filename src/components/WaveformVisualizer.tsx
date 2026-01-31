"use client";

import React from 'react';
import { motion } from 'framer-motion';

const WaveformVisualizer = ({ active = false }: { active?: boolean }) => {
  return (
    <div className="flex items-end gap-[2px] h-8 w-12">
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          animate={active ? {
            height: [4, 20, 8, 24, 6],
          } : { height: 4 }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            delay: i * 0.1,
            ease: "easeInOut"
          }}
          className="w-1 bg-[#00E5FF] rounded-full shadow-[0_0_8px_rgba(0,229,255,0.5)]"
        />
      ))}
    </div>
  );
};

export default WaveformVisualizer;