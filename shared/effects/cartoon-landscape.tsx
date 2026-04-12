'use client';

import { motion } from 'framer-motion';

export function CartoonLandscape() {
  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
      {/* 动画笔记本网格背景，营造随时可以涂鸦的纸张感 */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]" style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      
      {/* 手绘感流动线条 1 (顶部) */}
      <div className="absolute top-[15%] left-0 w-[200%] h-32 opacity-20 dark:opacity-10 animate-[slide_30s_linear_infinite]">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-full">
          <motion.path 
            d="M 0,60 Q 150,-20 300,60 T 600,60 T 900,60 T 1200,60" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="4" 
            strokeDasharray="20 10" 
            strokeLinecap="round" 
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 5, ease: "easeInOut", repeat: Infinity, repeatType: "mirror" }}
          />
        </svg>
      </div>

      {/* 动态卡通云朵 (左飘) */}
      <div className="absolute top-[25%] left-0 w-64 h-32 animate-[slide_40s_linear_infinite]">
        <svg viewBox="0 0 200 100" className="w-full h-full text-slate-200 dark:text-slate-800">
          <path d="M 50,50 a 20,20 0 0,1 15,-18 a 30,30 0 0,1 50,0 a 20,20 0 0,1 15,18 q 20,5 20,25 q 0,20 -20,20 l -80,0 q -20,0 -20,-20 q 0,-20 20,-25" fill="currentColor" />
          {/* Cloud hand-drawn outline */}
          <path d="M 50,50 a 20,20 0 0,1 15,-18 a 30,30 0 0,1 50,0 a 20,20 0 0,1 15,18 q 20,5 20,25 q 0,20 -20,20 l -80,0 q -20,0 -20,-20 q 0,-20 20,-25" fill="none" stroke="#64748b" strokeWidth="3" strokeDasharray="10 5" opacity="0.5" />
        </svg>
      </div>

      {/* 动态卡通云朵 2 (右上方更慢地飘动) */}
      <div className="absolute top-[10%] right-[-20%] w-48 h-24 animate-[slide-reverse_50s_linear_infinite]">
        <svg viewBox="0 0 200 100" className="w-full h-full text-slate-200 dark:text-slate-800 opacity-60">
          <path d="M 50,60 a 15,15 0 0,1 10,-15 a 25,25 0 0,1 40,0 a 15,15 0 0,1 10,15 q 15,5 15,20 q 0,15 -15,15 l -60,0 q -15,0 -15,-15 q 0,-15 15,-20" fill="currentColor" />
          <path d="M 50,60 a 15,15 0 0,1 10,-15 a 25,25 0 0,1 40,0 a 15,15 0 0,1 10,15 q 15,5 15,20 q 0,15 -15,15 l -60,0 q -15,0 -15,-15 q 0,-15 15,-20" fill="none" stroke="#64748b" strokeWidth="2" opacity="0.4" />
        </svg>
      </div>

      {/* 底部融合动画涂鸦波浪 (海洋/草地感) */}
      <div className="absolute bottom-0 left-0 w-[200%] h-48 md:h-64 opacity-80 dark:opacity-40 animate-[slide_20s_linear_infinite]">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="absolute bottom-0 w-full h-full">
          <path d="M0,40 C200,80 400,-20 600,40 C800,100 1000,0 1200,40 L1200,120 L0,120 Z" className="fill-emerald-100/50 dark:fill-emerald-900/30" />
          {/* Animated SVG line acting as handdrawn contour */}
          <motion.path 
            d="M0,40 C200,80 400,-20 600,40 C800,100 1000,0 1200,40" 
            fill="none" 
            className="stroke-emerald-400 dark:stroke-emerald-600"
            strokeWidth="3"
            strokeDasharray="15 15"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 10, ease: "linear", repeat: Infinity }}
          />
        </svg>
      </div>
      
      <div className="absolute bottom-0 left-0 md:left-[-50%] w-[200%] h-32 md:h-48 opacity-90 dark:opacity-50 animate-[slide-reverse_25s_linear_infinite]">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="absolute bottom-0 w-full h-full">
          <path d="M0,60 C300,10 400,120 700,50 C1000,-20 1100,90 1200,60 L1200,120 L0,120 Z" className="fill-sky-100/60 dark:fill-sky-900/40" />
          {/* Handdrawn contour */}
          <motion.path 
            d="M0,60 C300,10 400,120 700,50 C1000,-20 1100,90 1200,60" 
            fill="none" 
            className="stroke-sky-400 dark:stroke-sky-600"
            strokeWidth="4"
            strokeDasharray="25 25"
            strokeLinecap="round"
            initial={{ strokeDashoffset: 100 }}
            animate={{ strokeDashoffset: 0 }}
            transition={{ duration: 3, ease: "linear", repeat: Infinity }}
          />
        </svg>
      </div>

      <style jsx>{`
        @keyframes slide {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes slide-reverse {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}
