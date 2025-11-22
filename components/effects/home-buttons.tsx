"use client"

import { Button } from "@/components/ui/button"
import { Link } from "@/i18n/routing"
import { ArrowRight, Github, MessageCircle } from "lucide-react"
import { MagneticButton } from "@/components/visuals/magnetic-button"
import confetti from "canvas-confetti"

export function HomeButtons({ 
  viewPostsText, 
}: { 
  viewPostsText: string 
}) {
  
  const handleConfetti = () => {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => {
      return Math.random() * (max - min) + min;
    }

    const interval: NodeJS.Timeout = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }


      const particleCount = 50 * (timeLeft / duration);
      
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      });
    }, 250);
  }

  return (
    <div className="flex flex-wrap items-center justify-center gap-4 py-4">
      <MagneticButton>
        <Button asChild size="lg" onClick={handleConfetti}>
          <Link href="/posts">
            {viewPostsText} <ArrowRight className="ml-2 size-4" />
          </Link>
        </Button>
      </MagneticButton>
      <MagneticButton>
        <Button variant="outline" size="lg" asChild onClick={handleConfetti}>
          <Link href="https://github.com/zhemmmzh" target="_blank" rel="noreferrer">
            <Github className="mr-2 size-4" /> GitHub
          </Link>
        </Button>
      </MagneticButton>
      <MagneticButton>
        <Button variant="outline" size="lg" asChild onClick={handleConfetti}>
          <Link href="https://qm.qq.com/cgi-bin/qm/qr?k=GJV7-av-NF7gsXV13umV8RqQC0Cum5zo" target="_blank" rel="noreferrer">
            <MessageCircle className="mr-2 size-4" /> QQ
          </Link>
        </Button>
      </MagneticButton>
    </div>
  )
}
