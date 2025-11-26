"use client"

import React, { createContext, useContext, useState, useEffect } from 'react';

type VantaEffectType = 'none' | 'birds' | 'waves' | 'globe' | 'topology' | 'rings' | 'dots' | 'halo';

export const VANTA_EFFECTS: VantaEffectType[] = [
  'none',
  'birds', 
  'waves', 
  'globe', 
  'topology', 
  'rings', 
  'dots', 
  'halo'
];

interface VantaContextType {
  effect: VantaEffectType;
  setEffect: (effect: VantaEffectType) => void;
  nextEffect: () => void;
}

const VantaContext = createContext<VantaContextType | undefined>(undefined);

export function VantaProvider({ children }: { children: React.ReactNode }) {

  // Default to desktop preference during SSR / first render
  const [effect, setEffect] = useState<VantaEffectType>('rings');

  // Load saved effect from local storage or decide default by device type
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const saved = localStorage.getItem('vanta-effect');
    if (saved) {
      setEffect(saved as VantaEffectType);
      return;
    }

    // Simple mobile detection: userAgent + viewport width
    const ua = navigator.userAgent || '';
    const isMobileUA = /Mobi|Android|iPhone|iPad|iPod/i.test(ua);
    const isSmallScreen = window.innerWidth < 768;
    const isMobile = isMobileUA || isSmallScreen;

    const defaultEffect: VantaEffectType = isMobile ? 'globe' : 'rings';
    setEffect(defaultEffect);
    localStorage.setItem('vanta-effect', defaultEffect);
  }, []);

  const saveEffect = (newEffect: VantaEffectType) => {
    setEffect(newEffect);
    localStorage.setItem('vanta-effect', newEffect);
  };

  const nextEffect = () => {
    const currentIndex = VANTA_EFFECTS.indexOf(effect);
    const nextIndex = (currentIndex + 1) % VANTA_EFFECTS.length;
    saveEffect(VANTA_EFFECTS[nextIndex]);
  };

  return (
    <VantaContext.Provider value={{ effect, setEffect: saveEffect, nextEffect }}>
      {children}
    </VantaContext.Provider>
  );
}

export function useVanta() {
  const context = useContext(VantaContext);
  if (context === undefined) {
    throw new Error('useVanta must be used within a VantaProvider');
  }
  return context;
}
