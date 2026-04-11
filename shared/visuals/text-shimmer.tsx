"use client";

import { cn } from "@/lib/utils";

interface TextShimmerProps {
  children: React.ReactNode;
  className?: string;
  shimmerWidth?: number;
}

export const TextShimmer = ({
  children,
  className,
  shimmerWidth = 200,
}: TextShimmerProps) => {
  return (
    <span
      className={cn(
        "text-transparent bg-clip-text animate-shimmer",
        "bg-gradient-to-r from-pink-500 via-yellow-400 to-pink-500",
        className
      )}
      style={{
        backgroundSize: `${shimmerWidth}% 100%`,
      }}
    >
      {children}
    </span>
  );
};
