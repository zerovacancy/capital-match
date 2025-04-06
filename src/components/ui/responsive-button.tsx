import React from 'react';
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { createAriaLabel, createAccessibleId } from "@/lib/accessibility"

/**
 * Enhanced Button Component with:
 * - Better mobile touch targets
 * - Consistent focus states
 * - ARIA support
 * - Standardized color scheme
 */

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-md transition-all duration-300 focus-outline click-effect",
  {
    variants: {
      variant: {
        primary: "bg-[#275E91] text-white hover:bg-[#1A4D80] shadow-sm hover:shadow hover:-translate-y-0.5 active:translate-y-0 border border-transparent",
        secondary: "bg-[#7A8D79] text-white hover:bg-[#697B68] shadow-sm hover:shadow hover:-translate-y-0.5 active:translate-y-0 border border-transparent",
        tertiary: "bg-[#C9D4DC] text-[#1C1C1C] hover:bg-[#B8C6D1] shadow-sm hover:shadow hover:-translate-y-0.5 active:translate-y-0 border border-transparent",
        outline: "bg-white text-[#275E91] border border-[#275E91] hover:bg-[#275E91]/5 hover:-translate-y-0.5 active:translate-y-0",
        ghost: "bg-transparent text-[#275E91] hover:bg-[#275E91]/5 border border-transparent",
        link: "bg-transparent text-[#275E91] hover:underline p-0 shadow-none border-none"
      },
      size: {
        sm: "text-sm h-9 px-3 py-2 min-h-[36px]",
        md: "text-base h-11 px-4 py-2 min-h-[44px]",
        lg: "text-lg h-12 px-6 py-3 min-h-[48px]",
        icon: "w-11 h-11 p-2.5"
      },
      fullWidth: {
        true: "w-full",
        false: "w-auto"
      },
      responsive: {
        true: "w-full sm:w-auto",
        false: "w-auto"
      }
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      fullWidth: false,
      responsive: true
    }
  }
)

export interface ResponsiveButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  label?: string;
  description?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  loading?: boolean;
}

const ResponsiveButton = React.forwardRef<HTMLButtonElement, ResponsiveButtonProps>(
  ({ 
    className, 
    variant, 
    size, 
    fullWidth, 
    responsive,
    children, 
    label,
    description,
    icon,
    iconPosition = 'left',
    loading = false,
    ...props 
  }, ref) => {
    
    // Generate accessible attributes
    const ariaAttributes = label ? 
      createAriaLabel({ 
        label: label, 
        description: description 
      }) : {};
    
    // Generate unique ID if needed
    const buttonId = label ? createAccessibleId('btn', label) : undefined;
    
    return (
      <button
        id={buttonId}
        className={cn(
          buttonVariants({ 
            variant, 
            size, 
            fullWidth, 
            responsive,
            className 
          }),
          loading && "opacity-70 cursor-wait"
        )}
        disabled={loading || props.disabled}
        ref={ref}
        {...ariaAttributes}
        {...props}
      >
        {loading && (
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        )}
        
        {!loading && icon && iconPosition === 'left' && (
          <span className="flex-shrink-0">{icon}</span>
        )}
        
        <span>{children}</span>
        
        {!loading && icon && iconPosition === 'right' && (
          <span className="flex-shrink-0">{icon}</span>
        )}
      </button>
    )
  }
)

ResponsiveButton.displayName = "ResponsiveButton"

export { ResponsiveButton, buttonVariants }