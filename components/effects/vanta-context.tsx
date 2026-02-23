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

const normalizeEffect = (value: string | null): VantaEffectType | null => {
  if (!value) return null;
  if (value === 'global') return 'globe';
  return VANTA_EFFECTS.includes(value as VantaEffectType) ? (value as VantaEffectType) : null;
};

const getDeviceDefaultEffect = (): VantaEffectType => {
  if (typeof window === 'undefined') return 'halo';

  const ua = navigator.userAgent || '';
  const isMobileUA = /Mobi|Android|iPhone|iPad|iPod/i.test(ua);
  const isSmallScreen = window.innerWidth < 768;
  const isMobile = isMobileUA || isSmallScreen;

  return isMobile ? 'globe' : 'halo';
};

export function VantaProvider({ children }: { children: React.ReactNode }) {

  const [effect, setEffect] = useState<VantaEffectType>(() => {
    if (typeof window === 'undefined') return 'halo';

    const savedEffect = normalizeEffect(localStorage.getItem('vanta-effect'));
    return savedEffect ?? getDeviceDefaultEffect();
  });

  // Load saved effect from local storage or decide default by device type
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const saved = normalizeEffect(localStorage.getItem('vanta-effect'));
    if (saved) {
      setEffect(saved);
      localStorage.setItem('vanta-effect', saved);
      return;
    }

    const defaultEffect = getDeviceDefaultEffect();
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
