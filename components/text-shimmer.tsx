"use client";

import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

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
  const { theme } = useTheme();

  return (
    <span
      className={cn(
        "text-transparent bg-clip-text animate-shimmer",
        "bg-gradient-to-r from-[#000] via-[#666] to-[#000]",
        "dark:from-[#fff] dark:via-[#888] dark:to-[#fff]",
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
