import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-[#275E91] text-white hover:bg-[#1A4D80] focus:ring-[#275E91]",
        secondary:
          "border-transparent bg-[#7A8D79] text-white hover:bg-[#697B68] focus:ring-[#7A8D79]",
        success:
          "border-transparent bg-[#2E7D32] text-white hover:bg-[#2E7D32]/90 focus:ring-[#2E7D32]",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80 focus:ring-destructive",
        highlight:
          "border-transparent bg-[#C9D4DC] text-[#1C1C1C] hover:bg-[#C9D4DC]/80 focus:ring-[#C9D4DC]",
        outline: 
          "border-[#275E91]/50 text-[#275E91] hover:bg-[#275E91]/5 hover:border-[#275E91] focus:ring-[#275E91]",
        subtle:
          "border-transparent bg-[#275E91]/10 text-[#275E91] hover:bg-[#275E91]/20 focus:ring-[#275E91]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
