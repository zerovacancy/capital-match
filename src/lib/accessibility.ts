/**
 * Accessibility helpers for LG Development Capital Match AI Platform
 * Provides utilities for ARIA attributes, focus management, and screen reader support
 */

import { useEffect, useRef } from 'react';

/**
 * Function to create ARIA label attributes with consistent organization
 * 
 * @param {Object} options - Label configuration options
 * @param {string} options.label - Primary label text
 * @param {string} [options.description] - Optional additional description
 * @param {boolean} [options.required] - Whether the element is required
 * @param {string} [options.status] - Element status (error, warning, success)
 * @returns {Object} - ARIA attribute object
 */
export function createAriaLabel({ 
  label, 
  description, 
  required = false, 
  status
}: {
  label: string;
  description?: string;
  required?: boolean;
  status?: 'error' | 'warning' | 'success';
}) {
  const ariaLabel = label + (required ? ' (required)' : '');
  const ariaDescription = description || '';
  
  return {
    'aria-label': ariaLabel,
    ...(description ? { 'aria-describedby': `${label.replace(/\s+/g, '-').toLowerCase()}-description` } : {}),
    ...(required ? { 'aria-required': 'true' } : {}),
    ...(status ? { 'aria-invalid': status === 'error' } : {}),
  };
}

/**
 * Hook to trap focus within a component (for modals, dialogs, etc.)
 * 
 * @param {boolean} isActive - Whether focus trapping is active
 * @returns {React.RefObject} - Ref to attach to the containing element
 */
export function useFocusTrap(isActive: boolean) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!isActive || !containerRef.current) return;
    
    const container = containerRef.current;
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    if (focusableElements.length === 0) return;
    
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;
    
    // Focus the first element when the trap becomes active
    firstElement.focus();
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      
      // Shift + Tab
      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } 
      // Tab
      else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };
    
    container.addEventListener('keydown', handleKeyDown);
    return () => {
      container.removeEventListener('keydown', handleKeyDown);
    };
  }, [isActive]);
  
  return containerRef;
}

/**
 * Creates a predictable ID for ARIA relationships
 * 
 * @param {string} prefix - Prefix for the ID
 * @param {string} value - Unique value to append
 * @returns {string} - Generated ID
 */
export function createAccessibleId(prefix: string, value: string): string {
  return `${prefix}-${value.replace(/\s+/g, '-').toLowerCase()}`;
}

/**
 * Color contrast checking utility to ensure WCAG compliance
 * 
 * @param {string} foreground - Foreground color in hex format (#RRGGBB) 
 * @param {string} background - Background color in hex format (#RRGGBB)
 * @returns {Object} - Contrast ratio information
 */
export function checkColorContrast(foreground: string, background: string) {
  // Convert hex to RGB
  const hexToRgb = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return [r, g, b];
  };
  
  // Calculate relative luminance
  const getLuminance = (rgb: number[]) => {
    const [r, g, b] = rgb.map(c => {
      c = c / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };
  
  const foregroundRgb = hexToRgb(foreground);
  const backgroundRgb = hexToRgb(background);
  
  const foregroundLuminance = getLuminance(foregroundRgb);
  const backgroundLuminance = getLuminance(backgroundRgb);
  
  // Calculate contrast ratio
  const contrastRatio = 
    (Math.max(foregroundLuminance, backgroundLuminance) + 0.05) / 
    (Math.min(foregroundLuminance, backgroundLuminance) + 0.05);
  
  // Check against WCAG standards
  return {
    ratio: contrastRatio.toFixed(2),
    wcagAA: contrastRatio >= 4.5,
    wcagAAA: contrastRatio >= 7,
    wcagAALarge: contrastRatio >= 3 // For large text (18pt or 14pt bold)
  };
}

/**
 * LG Development color palette constant with accessible combinations
 * Each color has a "on" property that specifies what text colors are accessible on top of it
 */
export const LG_COLORS = {
  blue: {
    value: '#275E91', // Primary Blue
    on: ['#FFFFFF', '#F5F5EF'] // Text colors that are accessible on this background
  },
  green: {
    value: '#7A8D79', // Secondary Green
    on: ['#FFFFFF', '#1C1C1C'] // Text colors that are accessible on this background
  },
  success: {
    value: '#2E7D32', // Success Green
    on: ['#FFFFFF', '#F5F5EF'] // Text colors that are accessible on this background
  },
  highlight: {
    value: '#C9D4DC', // Section Highlight
    on: ['#1C1C1C', '#275E91'] // Text colors that are accessible on this background
  },
  text: {
    value: '#1C1C1C', // Text
    on: ['#FFFFFF', '#ECEDE3', '#F5F5EF', '#C9D4DC'] // Text colors that are accessible on this background
  },
  background: {
    value: '#ECEDE3', // Background
    on: ['#1C1C1C', '#275E91'] // Text colors that are accessible on this background 
  },
  footer: {
    value: '#F5F5EF', // Footer Background
    on: ['#1C1C1C', '#275E91'] // Text colors that are accessible on this background
  }
};