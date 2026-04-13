"use client";

import { useEffect, useState } from "react";

interface TypewriterEffectProps {
  text: string;
  speed?: number;
  waitBeforeDelete?: number;
  waitBeforeRestart?: number;
  cursor?: boolean;
  loop?: boolean;
  className?: string;
}

export function TypewriterEffect({
  text,
  speed = 100,
  waitBeforeDelete = 2000,
  waitBeforeRestart = 500,
  cursor = true,
  loop = true,
  className = "",
}: TypewriterEffectProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const handleTyping = () => {
      const currentLength = displayedText.length;
      const fullLength = text.length;

      if (!isDeleting) {
        // Typing
        if (currentLength < fullLength) {
          setDisplayedText(text.slice(0, currentLength + 1));
          timeout = setTimeout(handleTyping, speed);
        } else {
          // Finished typing
          if (loop) {
            timeout = setTimeout(() => setIsDeleting(true), waitBeforeDelete);
          }
        }
      } else {
        // Clearing phase
        if (currentLength > 0) {
          // Clear immediately
          setDisplayedText("");
          // The effect will re-run because of state change
        } else {
          // Text is cleared, wait before restarting
          timeout = setTimeout(() => setIsDeleting(false), waitBeforeRestart);
        }
      }
    };

    // Start the typing loop
    timeout = setTimeout(handleTyping, speed);

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, text, speed, waitBeforeDelete, waitBeforeRestart, loop]);

  return (
    <span className={`inline-block relative min-h-[1.5em] break-words align-top ${className}`}>
      {displayedText}
      {cursor && (
        <span className="animate-pulse font-bold text-emerald-500 ml-0.5 inline-block -translate-y-0.5 select-none">|</span>
      )}
    </span>
  );
}
