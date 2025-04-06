import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-[#C9D4DC] bg-white px-3 py-2 text-base text-[#1C1C1C] transition-all duration-300 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-[#275E91] placeholder:text-[#1C1C1C]/50 hover:border-[#275E91] focus-visible:outline-none focus-visible:border-[#275E91] focus-visible:ring-2 focus-visible:ring-[#275E91]/30 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
