import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "sketch-ui file:text-foreground placeholder:text-muted-foreground/70 selection:bg-primary selection:text-primary-foreground border-2 border-foreground/20 focus-visible:border-foreground/60 h-10 w-full min-w-0 rounded-xl bg-background/50 backdrop-blur-md px-4 py-2 text-base font-medium shadow-[3px_3px_0_0_rgba(0,0,0,0.05)] dark:shadow-[3px_3px_0_0_rgba(255,255,255,0.05)] transition-all hover:bg-background outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:ring-0 focus-visible:translate-y-[-1px] focus-visible:shadow-[4px_4px_0_0_rgba(0,0,0,0.1)] dark:focus-visible:shadow-[4px_4px_0_0_rgba(255,255,255,0.1)]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      )}
      {...props}
    />
  )
}

export { Input }
