"use client"

import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { useTheme } from 'next-themes'
import { usePathname } from 'next/navigation'
import { useVanta } from './vanta-context'

// Extend Window interface to include THREE
declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    THREE: any;
  }
}

export function VantaBackground() {
  const vantaRef = useRef<HTMLDivElement>(null)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [vantaEffect, setVantaEffect] = useState<any>(null)
  const { theme } = useTheme()
  const { effect } = useVanta()
  const pathname = usePathname()
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setHasMounted(true)
  }, [])

  const isArticlePage = pathname && /\/posts\/.+/.test(pathname)
  const isAboutPage = pathname && /\/about$/.test(pathname)
  const shouldDisableEffect = isArticlePage || isAboutPage

  useEffect(() => {
    if (!vantaRef.current) return

    // Ensure THREE is available globally for Vanta
    if (typeof window !== 'undefined' && !window.THREE) {
      window.THREE = THREE
    }

    // Destroy previous effect
    if (vantaEffect) {
      vantaEffect.destroy()
      setVantaEffect(null)
    }

    if (effect === 'none' || shouldDisableEffect) return

    const isDark = theme === 'dark'
    
    // Common options
    const options = {
      el: vantaRef.current,
      THREE: THREE,
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.00,
      minWidth: 200.00,
      scale: 1.00,
      scaleMobile: 1.00,
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let newEffect: any = null
    let isMounted = true

    const loadEffect = async () => {
      try {
        // Ensure THREE is available
        if (!THREE) {
          console.error("THREE is not defined");
          return;
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let effectModule: any;

        switch (effect) {
          case 'birds':
            // @ts-expect-error - vanta types are missing
            effectModule = (await import('vanta/dist/vanta.birds.min')).default
            if (!isMounted) return
            newEffect = effectModule({
              ...options,
              backgroundColor: isDark ? 0x0 : 0xffffff,
              color1: isDark ? 0x888888 : 0x444444, // Brighter in dark mode
              color2: isDark ? 0x555555 : 0x666666,
              colorMode: "lerpGradient",
              birdSize: 1,
              wingSpan: 30.00,
              speedLimit: 4.00,
              separation: 20.00,
              alignment: 20.00,
              cohesion: 20.00,
              quantity: 3.00,
              backgroundAlpha: isDark ? 1 : 0
            })
            break
          case 'waves':
            // @ts-expect-error - vanta types are missing
            effectModule = (await import('vanta/dist/vanta.waves.min')).default
            if (!isMounted) return
            newEffect = effectModule({
              ...options,
              color: isDark ? 0x333333 : 0x666666, // Brighter in dark mode
              shininess: 30.00,
              waveHeight: 20.00,
              waveSpeed: 0.8,
              zoom: 0.8
            })
            break
          case 'globe':
            // @ts-expect-error - vanta types are missing
            effectModule = (await import('vanta/dist/vanta.globe.min')).default
            if (!isMounted) return
            newEffect = effectModule({
              ...options,
              color: isDark ? 0x888888 : 0x555555,
              color2: isDark ? 0xcccccc : 0xaaaaaa,
              size: 1.00,
              backgroundColor: isDark ? 0x0 : 0xffffff,
            })
            break
          case 'topology':
            // @ts-expect-error - vanta types are missing
            effectModule = (await import('vanta/dist/vanta.topology.min')).default
            if (!isMounted) return
            newEffect = effectModule({
              ...options,
              color: isDark ? 0x888888 : 0x555555,
              backgroundColor: isDark ? 0x0 : 0xffffff,
            })
            break
          case 'rings':
            // @ts-expect-error - vanta types are missing
            effectModule = (await import('vanta/dist/vanta.rings.min')).default
            if (!isMounted) return
            newEffect = effectModule({
              ...options,
              color: isDark ? 0x888888 : 0x555555,
              backgroundColor: isDark ? 0x0 : 0xffffff,
            })
            break
          case 'dots':
            // @ts-expect-error - vanta types are missing
            effectModule = (await import('vanta/dist/vanta.dots.min')).default
            if (!isMounted) return
            newEffect = effectModule({
              ...options,
              color: isDark ? 0x888888 : 0x555555,
              color2: isDark ? 0xcccccc : 0xaaaaaa,
              backgroundColor: isDark ? 0x0 : 0xffffff,
            })
            break
          case 'halo':
            // @ts-expect-error - vanta types are missing
            effectModule = (await import('vanta/dist/vanta.halo.min')).default
            if (!isMounted) return
            newEffect = effectModule({
              ...options,
              backgroundColor: isDark ? 0x0 : 0xffffff,
              baseColor: isDark ? 0x444444 : 0x222222,
              size: 1.5,
            })
            break
        }

        
        if (isMounted && newEffect) {
          setVantaEffect(newEffect)
        }
      } catch (error) {
        console.error("Failed to initialize Vanta effect:", error)
      }
    }

    loadEffect()

    return () => {
      isMounted = false
      if (newEffect) newEffect.destroy()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [effect, theme, shouldDisableEffect, hasMounted])

  if (!hasMounted || effect === 'none' || shouldDisableEffect) return null

  return (
    <div 
      ref={vantaRef} 
      className="fixed inset-0 -z-10 w-full h-full pointer-events-none opacity-50"
    />
  )
}
