
/**
 * Focus management utilities for accessible component interactions
 * Used to enhance keyboard navigation and focus management across the application
 */

import { useState, useEffect, useRef } from 'react';
import React from 'react';

/**
 * Hook to trap focus within a container (for modals, dialogs, etc.)
 * 
 * @param {boolean} isActive - Whether the focus trap is active
 * @returns {React.RefObject<HTMLElement>} - Reference to attach to the container
 */
export function useFocusTrap(isActive: boolean = true) {
  const containerRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    if (!isActive || !containerRef.current) return;
    
    const container = containerRef.current;
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    ) as NodeListOf<HTMLElement>;
    
    if (focusableElements.length === 0) return;
    
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    
    // Focus the first element when activated
    firstElement.focus();
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      
      // Shift+Tab navigation
      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } 
      // Tab navigation
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
 * Hook to create a skip-to-content link for accessibility
 * 
 * @param {string} contentId - ID of the main content element
 * @returns {() => JSX.Element} - Function that returns a skip to content link component
 */
export function useSkipToContent(contentId: string): () => JSX.Element {
  return () => {
    return React.createElement(
      'a',
      {
        href: `#${contentId}`,
        className: 'skip-to-content'
      },
      'Skip to main content'
    );
  };
}

/**
 * Hook to manage focus when a component mounts/unmounts
 * Restores focus to previous element when component unmounts
 * 
 * @returns {React.RefObject<HTMLElement>} - Ref to attach to the element that should receive focus
 */
export function useFocusReturn() {
  const elementRef = useRef<HTMLElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);
  
  useEffect(() => {
    previousFocus.current = document.activeElement as HTMLElement;
    
    // Focus the new element if it exists
    if (elementRef.current) {
      elementRef.current.focus();
    }
    
    // Return focus when unmounting
    return () => {
      if (previousFocus.current) {
        previousFocus.current.focus();
      }
    };
  }, []);
  
  return elementRef;
}

/**
 * Utility to check if a component is being interacted with via keyboard
 * Helps apply different styles for keyboard vs. mouse interactions
 */
export function useKeyboardNavigation() {
  const [isKeyboard, setIsKeyboard] = useState(false);
  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        setIsKeyboard(true);
      }
    };
    
    const handleMouseMove = () => {
      setIsKeyboard(false);
    };
    
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  return isKeyboard;
}

/**
 * Available focus styles with Capital Match AI Platform design system
 * Maps to Tailwind CSS classes for consistent styling
 */
export const focusStyles = {
  primary: "focus:outline-none focus:ring-2 focus:ring-[#275E91] focus:ring-offset-2",
  secondary: "focus:outline-none focus:ring-2 focus:ring-[#7A8D79] focus:ring-offset-2",
  tertiary: "focus:outline-none focus:ring-2 focus:ring-[#C9D4DC] focus:ring-offset-2",
  subtle: "focus:outline-none focus:ring-1 focus:ring-[#275E91]",
  outline: "focus:outline-2 focus:outline-[#275E91] focus:outline-offset-2"
};
