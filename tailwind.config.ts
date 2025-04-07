
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				lg: {
					// Primary Colors - Reduced palette
					blue: {
						DEFAULT: '#275E91',
						50: '#EEF4FF',
						100: '#D1E0FF',
						200: '#A3C1F8',
						300: '#75A2F0',
						400: '#4783E7',
						500: '#275E91',
						600: '#1A4D80',
						700: '#134770',
						800: '#0C3A61',
						900: '#062C52'
					},
					green: {
						DEFAULT: '#7A8D79',
						50: '#EEF6F0',
						100: '#D1E6D9',
						200: '#A3CCB3',
						300: '#75B38D',
						400: '#569A67',
						500: '#7A8D79',
						600: '#697B68',
						700: '#586957',
						800: '#476945',
						900: '#365A34'
					},
					
					// Text and UI Colors - Simplified scale
					gray: {
						50: '#F9FAFB',
						100: '#F3F4F6',
						200: '#E5E7EB',
						300: '#D1D5DB',
						400: '#9CA3AF',
						500: '#6B7280',
						600: '#4B5563',
						700: '#374151',
						800: '#1F2937',
						900: '#111827'
					},
					
					// Status Colors - Consistent system
					success: {
						DEFAULT: '#2E7D32',
						50: '#F3FAEE',
						100: '#E8F5E9',
						500: '#2E7D32'
					},
					warning: {
						DEFAULT: '#F57C00',
						50: '#FFF8E6',
						100: '#FFF3E0',
						500: '#F57C00'
					},
					error: {
						DEFAULT: '#C62828',
						50: '#FFEAED',
						100: '#FFEBEE',
						500: '#C62828'
					},
					
					// Background Variations
					background: '#F0F5FF',
					paper: '#FFFFFF',
					footer: '#F5F7FA',
					
					// Backward compatibility
					highlight: '#C9D4DC',
					text: '#1C1C1C',
					border: '#E5E7EB',
					disabled: 'rgba(28, 28, 28, 0.4)',
					accent: '#275E91'
				}
			},
			fontFamily: {
				sans: ['Inter', 'system-ui', 'sans-serif'],
				display: ['Space Grotesk', 'sans-serif'],
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'fade-in': {
					'0%': { opacity: '0', transform: 'translateY(10px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'slide-in-right': {
					'0%': { transform: 'translateX(100%)' },
					'100%': { transform: 'translateX(0)' }
				},
				'shine': {
					'0%': { transform: 'rotate(-45deg) translateY(100%)' },
					'30%': { transform: 'rotate(-45deg) translateY(-100%)' },
					'100%': { transform: 'rotate(-45deg) translateY(100%)' }
				},
				'grow': {
					'0%': { width: '0%' },
					'100%': { width: '100%' }
				},
				'grow-reverse': {
					'0%': { width: '0%', right: '0', left: 'auto' },
					'100%': { width: '100%', right: '0', left: 'auto' }
				},
				'pulse-slow': {
					'0%, 100%': { opacity: '0.6' },
					'50%': { opacity: '0.3' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.5s ease-out',
				'slide-in-right': 'slide-in-right 0.5s ease-out',
				'shine': 'shine 3s ease-in-out infinite',
				'grow': 'grow 3s ease-in-out infinite',
				'grow-reverse': 'grow-reverse 3s ease-in-out infinite',
				'pulse-slow': 'pulse-slow 3s ease-in-out infinite'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
