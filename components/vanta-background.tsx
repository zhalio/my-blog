"use client"

import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { useTheme } from 'next-themes'
import { usePathname } from 'next/navigation'
import { useVanta } from './vanta-context'

export function VantaBackground() {
  const vantaRef = useRef<HTMLDivElement>(null)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [vantaEffect, setVantaEffect] = useState<any>(null)
  const { theme } = useTheme()
  const { effect } = useVanta()
  const pathname = usePathname()

  const isArticlePage = pathname && /\/posts\/.+/.test(pathname)
  const isAboutPage = pathname && /\/about$/.test(pathname)
  const shouldDisableEffect = isArticlePage || isAboutPage

  useEffect(() => {
    if (!vantaRef.current) return

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
          case 'fog':
            // @ts-expect-error - vanta types are missing
            effectModule = (await import('vanta/dist/vanta.fog.min')).default
            if (!isMounted) return
            newEffect = effectModule({
              ...options,
              highlightColor: isDark ? 0x666666 : 0x888888, // Brighter highlight in dark mode
              midtoneColor: isDark ? 0x0 : 0xeeeeee,
              lowlightColor: isDark ? 0x0 : 0xffffff,
              baseColor: isDark ? 0x0 : 0xffffff,
              blurFactor: 0.6,
              speed: 1.2,
              zoom: 1.0
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
          case 'clouds':
            // @ts-expect-error - vanta types are missing
            effectModule = (await import('vanta/dist/vanta.clouds.min')).default
            if (!isMounted) return
            newEffect = effectModule({
              ...options,
              backgroundColor: isDark ? 0x0 : 0xffffff,
              skyColor: isDark ? 0x0 : 0xaaaaaa,
              cloudColor: isDark ? 0x444444 : 0x888888, // Brighter clouds in dark mode
              cloudShadowColor: isDark ? 0x0 : 0x555555,
              sunColor: isDark ? 0x555555 : 0xffffff, // Brighter sun in dark mode
              sunGlareColor: isDark ? 0x333333 : 0xffffff,
              sunlightColor: isDark ? 0x333333 : 0xffffff,
              speed: 0.8
            })
            break
          case 'net':
            // @ts-expect-error - vanta types are missing
            effectModule = (await import('vanta/dist/vanta.net.min')).default
            if (!isMounted) return
            newEffect = effectModule({
              ...options,
              color: isDark ? 0x888888 : 0xcccccc, // Brighter in dark mode, lighter in light mode
              backgroundColor: isDark ? 0x0 : 0xffffff,
              points: 12.00,
              maxDistance: 22.00,
              spacing: 16.00,
              showDots: true
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
  }, [effect, theme, shouldDisableEffect])

  if (effect === 'none' || shouldDisableEffect) return null

  return (
    <div 
      ref={vantaRef} 
      className="fixed inset-0 -z-10 w-full h-full pointer-events-none opacity-50"
    />
  )
}
