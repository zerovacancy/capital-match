/**
 * Interactive Element Standardization for Capital Match AI Platform
 * Provides consistent styles, behaviors, and accessibility features
 */

import { cn } from "./utils";

/**
 * Standard color palette for interactive elements
 * Follows the LG Development design system
 */
export const interactiveColors = {
  // Primary colors
  primary: {
    base: "#275E91", // Primary Blue
    hover: "#1A4D80",
    active: "#134770",
    focus: "#5B7B9C",
    light: "rgba(39, 94, 145, 0.1)"
  },
  secondary: {
    base: "#7A8D79", // Secondary Green
    hover: "#697B68",
    active: "#586957",
    focus: "#7A8D79",
    light: "rgba(122, 141, 121, 0.1)"
  },
  success: {
    base: "#2E7D32", // Strong/Success Green
    hover: "#246A29",
    active: "#1B5720",
    focus: "#2E7D32",
    light: "rgba(46, 125, 50, 0.1)"
  },
  highlight: {
    base: "#C9D4DC", // Section Highlight
    hover: "#B8C6D1",
    active: "#A7B8C5",
    focus: "#C9D4DC",
    light: "rgba(201, 212, 220, 0.2)"
  },
  text: {
    base: "#1C1C1C", // Text
    muted: "rgba(28, 28, 28, 0.7)",
    subtle: "rgba(28, 28, 28, 0.5)",
  },
  background: {
    base: "#ECEDE3", // Background
    footer: "#F5F5EF" // Footer Background
  }
};

/**
 * Standardized button styles with consistent behaviors
 * 
 * @param {Object} options - Button configuration
 * @param {string} options.variant - Button variant (primary, secondary, tertiary, outline, ghost, link)
 * @param {boolean} options.isActive - Whether the button is in active state
 * @param {boolean} options.isDisabled - Whether the button is disabled
 * @returns {string} - Tailwind CSS classes for the button
 */
export function getButtonStyles({ 
  variant = "primary", 
  isActive = false,
  isDisabled = false 
}: {
  variant?: "primary" | "secondary" | "tertiary" | "outline" | "ghost" | "link";
  isActive?: boolean;
  isDisabled?: boolean;
}) {
  const baseStyles = "inline-flex items-center justify-center gap-2 rounded-md font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";
  
  // Disabled state overrides other variants
  if (isDisabled) {
    return cn(baseStyles, "opacity-50 cursor-not-allowed bg-[#C9D4DC]/50 text-[#1C1C1C]/50 border border-[#C9D4DC]/20");
  }
  
  // Active state for each variant
  if (isActive) {
    switch (variant) {
      case "primary":
        return cn(baseStyles, "bg-[#134770] text-white border-transparent focus-visible:ring-[#5B7B9C]");
      case "secondary":
        return cn(baseStyles, "bg-[#586957] text-white border-transparent focus-visible:ring-[#7A8D79]");
      case "tertiary":
        return cn(baseStyles, "bg-[#A7B8C5] text-[#1C1C1C] border-transparent focus-visible:ring-[#C9D4DC]");
      case "outline":
        return cn(baseStyles, "bg-[#275E91]/10 text-[#275E91] border border-[#275E91] focus-visible:ring-[#275E91]");
      case "ghost":
        return cn(baseStyles, "bg-[#275E91]/10 text-[#275E91] border-transparent focus-visible:ring-[#275E91]");
      case "link":
        return cn(baseStyles, "bg-transparent text-[#275E91] underline border-transparent focus-visible:ring-[#275E91]");
      default:
        return cn(baseStyles, "bg-[#134770] text-white border-transparent focus-visible:ring-[#5B7B9C]");
    }
  }
  
  // Default state for each variant
  switch (variant) {
    case "primary":
      return cn(baseStyles, "bg-[#275E91] text-white hover:bg-[#1A4D80] hover:-translate-y-0.5 active:translate-y-0 active:bg-[#134770] border-transparent focus-visible:ring-[#5B7B9C]");
    case "secondary":
      return cn(baseStyles, "bg-[#7A8D79] text-white hover:bg-[#697B68] hover:-translate-y-0.5 active:translate-y-0 active:bg-[#586957] border-transparent focus-visible:ring-[#7A8D79]");
    case "tertiary":
      return cn(baseStyles, "bg-[#C9D4DC] text-[#1C1C1C] hover:bg-[#B8C6D1] hover:-translate-y-0.5 active:translate-y-0 active:bg-[#A7B8C5] border-transparent focus-visible:ring-[#275E91]");
    case "outline":
      return cn(baseStyles, "bg-white text-[#275E91] hover:bg-[#275E91]/5 hover:-translate-y-0.5 active:translate-y-0 active:bg-[#275E91]/10 border border-[#275E91] focus-visible:ring-[#275E91]");
    case "ghost":
      return cn(baseStyles, "bg-transparent text-[#275E91] hover:bg-[#275E91]/5 active:bg-[#275E91]/10 border-transparent focus-visible:ring-[#275E91]");
    case "link":
      return cn(baseStyles, "bg-transparent text-[#275E91] hover:underline active:text-[#134770] border-transparent focus-visible:ring-[#275E91] p-0 shadow-none");
    default:
      return cn(baseStyles, "bg-[#275E91] text-white hover:bg-[#1A4D80] hover:-translate-y-0.5 active:translate-y-0 active:bg-[#134770] border-transparent focus-visible:ring-[#5B7B9C]");
  }
}

/**
 * Standardized form input styles
 * 
 * @param {Object} options - Input configuration
 * @param {string} options.state - Input state (default, hover, focus, error, disabled)
 * @param {boolean} options.isRequired - Whether the input is required
 * @returns {string} - Tailwind CSS classes for the input
 */
export function getInputStyles({
  state = "default",
  isRequired = false
}: {
  state?: "default" | "hover" | "focus" | "error" | "disabled";
  isRequired?: boolean;
}) {
  const baseStyles = "rounded-md px-3 py-2 text-[#1C1C1C] transition-all duration-300";
  
  // Add required indicator if needed
  const requiredStyles = isRequired ? "required:after:content-['*'] required:after:ml-0.5 required:after:text-red-500" : "";
  
  switch (state) {
    case "hover":
      return cn(baseStyles, requiredStyles, "border border-[#275E91] bg-white");
    case "focus":
      return cn(baseStyles, requiredStyles, "border border-[#275E91] outline-none ring-2 ring-[#275E91]/30 ring-offset-2 bg-white");
    case "error":
      return cn(baseStyles, requiredStyles, "border border-red-500 bg-white focus:ring-2 focus:ring-red-500/30 focus:ring-offset-2");
    case "disabled":
      return cn(baseStyles, requiredStyles, "border border-[#C9D4DC]/50 bg-[#ECEDE3]/50 text-[#1C1C1C]/50 cursor-not-allowed");
    default:
      return cn(baseStyles, requiredStyles, "border border-[#C9D4DC] bg-white hover:border-[#275E91] focus:border-[#275E91] focus:outline-none focus:ring-2 focus:ring-[#275E91]/30 focus:ring-offset-2");
  }
}

/**
 * Standardized interactive card styles
 * 
 * @param {Object} options - Card configuration
 * @param {boolean} options.isHoverable - Whether the card should have hover effects
 * @param {boolean} options.isSelectable - Whether the card is selectable
 * @param {boolean} options.isSelected - Whether the card is currently selected
 * @returns {string} - Tailwind CSS classes for the card
 */
export function getCardStyles({
  isHoverable = true,
  isSelectable = false,
  isSelected = false
}: {
  isHoverable?: boolean;
  isSelectable?: boolean;
  isSelected?: boolean;
}) {
  const baseStyles = "rounded-lg border border-[#C9D4DC]/20 bg-white transition-all duration-300";
  
  if (isSelected) {
    return cn(baseStyles, "border-[#275E91] ring-2 ring-[#275E91]/20 shadow-md");
  }
  
  if (isSelectable) {
    return cn(baseStyles, "cursor-pointer hover:border-[#275E91]/40 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 focus-visible:border-[#275E91] focus-visible:ring-2 focus-visible:ring-[#275E91]/20 focus-visible:outline-none");
  }
  
  if (isHoverable) {
    return cn(baseStyles, "hover:shadow-md hover:-translate-y-0.5 transition-all duration-300");
  }
  
  return baseStyles;
}

/**
 * Hover effect utilities that maintain the design system
 */
export const hoverEffects = {
  subtle: "hover:bg-[#275E91]/5 transition-colors duration-200",
  lift: "hover:-translate-y-0.5 hover:shadow-md transition-all duration-300",
  highlight: "hover:border-[#275E91] transition-colors duration-200",
  grow: "hover:scale-105 transition-transform duration-200",
  accent: "hover:text-[#275E91] transition-colors duration-200"
};

/**
 * Accessibility-focused interactive styles
 */
export const a11yStyles = {
  focusVisible: "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#275E91] focus-visible:ring-offset-2",
  screenReaderOnly: "sr-only",
  clickable: "cursor-pointer",
  interactive: "select-none touch-manipulation"
};