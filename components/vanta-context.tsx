"use client"

import React, { createContext, useContext, useState, useEffect } from 'react';

type VantaEffectType = 'none' | 'birds' | 'fog' | 'waves' | 'clouds' | 'net';

interface VantaContextType {
  effect: VantaEffectType;
  setEffect: (effect: VantaEffectType) => void;
  nextEffect: () => void;
}

const VantaContext = createContext<VantaContextType | undefined>(undefined);

export function VantaProvider({ children }: { children: React.ReactNode }) {
  const [effect, setEffect] = useState<VantaEffectType>('clouds');

  // Load saved effect from local storage
  useEffect(() => {
    const saved = localStorage.getItem('vanta-effect');
    if (saved) {
      setEffect(saved as VantaEffectType);
    }
  }, []);

  const saveEffect = (newEffect: VantaEffectType) => {
    setEffect(newEffect);
    localStorage.setItem('vanta-effect', newEffect);
  };

  const nextEffect = () => {
    const effects: VantaEffectType[] = ['none', 'birds', 'fog', 'waves', 'clouds', 'net'];
    const currentIndex = effects.indexOf(effect);
    const nextIndex = (currentIndex + 1) % effects.length;
    saveEffect(effects[nextIndex]);
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
