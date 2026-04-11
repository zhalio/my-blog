import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "sketch-ui inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-bold transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive active:translate-y-[2px] active:shadow-none",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground border-2 border-primary/20 shadow-[3px_3px_0_0_rgba(0,0,0,0.1)] dark:shadow-[3px_3px_0_0_rgba(255,255,255,0.1)] hover:bg-primary/90 hover:-translate-y-0.5",
        destructive:
          "bg-destructive text-white border-2 border-destructive/20 shadow-[3px_3px_0_0_rgba(0,0,0,0.1)] hover:bg-destructive/90",
        outline:
          "border-2 border-foreground/20 bg-background shadow-[3px_3px_0_0_rgba(0,0,0,0.05)] dark:shadow-[3px_3px_0_0_rgba(255,255,255,0.05)] hover:border-foreground/40 hover:-translate-y-0.5",
        secondary:
          "bg-secondary/40 text-secondary-foreground border-2 border-secondary/50 shadow-[3px_3px_0_0_rgba(0,0,0,0.05)] dark:shadow-[3px_3px_0_0_rgba(255,255,255,0.05)] hover:bg-secondary/60 hover:-translate-y-0.5",
        ghost:
          "border-transparent bg-transparent shadow-none hover:bg-muted/80 font-bold text-foreground/80 hover:text-foreground active:translate-y-1 !border-none !shadow-none hover:!shadow-none hover:!transform-none",
        link: "text-primary underline-offset-4 hover:underline shadow-none border-transparent !border-none !shadow-none hover:!shadow-none hover:!transform-none",
      },
      size: {
        default: "h-10 px-5 py-2 has-[>svg]:px-4",
        sm: "h-9 rounded-xl gap-1.5 px-4 has-[>svg]:px-3",
        lg: "h-12 rounded-2xl px-8 text-base has-[>svg]:px-5",
        icon: "size-10",
        "icon-sm": "size-9",
        "icon-lg": "size-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
