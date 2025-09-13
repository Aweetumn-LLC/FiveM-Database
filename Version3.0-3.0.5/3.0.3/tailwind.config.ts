
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
			padding: {
				DEFAULT: '1rem',
				sm: '1.5rem',
				lg: '2rem',
				xl: '2.5rem',
				'2xl': '3rem',
			},
			screens: {
				sm: '640px',
				md: '768px',
				lg: '1024px',
				xl: '1280px',
				'2xl': '1536px',
				'3xl': '1920px',
			}
		},
		extend: {
			screens: {
				'xs': '475px',
				'3xl': '1920px',
				'4xl': '2560px',
				'pride-theme': { 'raw': '.pride-theme' },
			},
			fontFamily: {
				sans: ['Inter', 'system-ui', 'sans-serif'],
				display: ['Manrope', 'system-ui', 'sans-serif'],
			},
			colors: {
				border: 'rgba(255, 255, 255, 0.1)',
				input: 'rgba(255, 255, 255, 0.1)',
				ring: '#FFFFFF',
				background: 'var(--theme-background)',
				foreground: '#FFFFFF',
				primary: {
					DEFAULT: 'var(--theme-accent)',
					foreground: '#FFFFFF'
				},
				secondary: {
					DEFAULT: 'var(--theme-background-secondary)',
					foreground: '#FFFFFF'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'var(--theme-background-secondary)',
					foreground: 'rgba(255, 255, 255, 0.7)'
				},
				accent: {
					DEFAULT: 'var(--theme-accent)',
					foreground: '#FFFFFF'
				},
				popover: {
					DEFAULT: 'var(--theme-background)',
					foreground: '#FFFFFF'
				},
				card: {
					DEFAULT: 'var(--theme-background-secondary)',
					foreground: '#FFFFFF'
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
        blue: {
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
        },
        indigo: {
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
        },
        purple: {
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
        },
        teal: {
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0d9488',
        },
        pink: {
          400: '#f472b6',
          500: '#ec4899',
          600: '#db2777',
        },
        green: {
          400: '#4ade80',
          500: '#22c55e',
        },
        red: {
          400: '#f87171',
          500: '#ef4444',
        },
        orange: {
          400: '#fb923c',
          500: '#f97316',
        },
        yellow: {
          400: '#facc15',
          500: '#eab308',
        }
			},
			spacing: {
				'18': '4.5rem',
				'88': '22rem',
				'112': '28rem',
				'128': '32rem',
			},
			maxWidth: {
				'8xl': '88rem',
				'9xl': '96rem',
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'fade-in': {
					from: {
						opacity: '0',
						transform: 'translateY(10px)'
					},
					to: {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'slide-in': {
					from: {
						transform: 'translateX(-10px)',
						opacity: '0'
					},
					to: {
						transform: 'translateX(0)',
						opacity: '1'
					}
				},
				'glow': {
					'0%, 100%': {
						opacity: '0.8'
					},
					'50%': {
						opacity: '1'
					}
				},
        'float': {
          '0%, 100%': {
            transform: 'translateY(0)'
          },
          '50%': {
            transform: 'translateY(-10px)'
          }
        },
        'pulse-ring': {
          '0%': {
            transform: 'scale(0.8)',
            opacity: '0.8'
          },
          '70%': {
            transform: 'scale(1.2)',
            opacity: '0'
          },
          '100%': {
            transform: 'scale(1.2)',
            opacity: '0'
          }
        },
        'shimmer': {
          '0%': {
            backgroundPosition: '-40rem 0',
          },
          '100%': {
            backgroundPosition: '40rem 0',
          },
        },
        'color-cycle': {
          '0%': {
            'background-position': '0% 50%'
          },
          '25%': {
            'background-position': '25% 50%'
          },
          '50%': {
            'background-position': '50% 50%'
          },
          '75%': {
            'background-position': '75% 50%'
          },
          '100%': {
            'background-position': '100% 50%'
          }
        },
        'bounce-subtle': {
          '0%, 100%': {
            transform: 'translateY(0)'
          },
          '50%': {
            transform: 'translateY(-3px)'
          }
        },
        'rainbow-gradient': {
          '0%': {
            'background-position': '0% 50%'
          },
          '50%': {
            'background-position': '100% 50%'
          },
          '100%': {
            'background-position': '0% 50%'
          }
        }
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.5s ease-out',
				'slide-in': 'slide-in 0.3s ease-out',
				'glow': 'glow 2s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-ring': 'pulse-ring 1.5s cubic-bezier(0.215, 0.61, 0.355, 1) infinite',
        'shimmer': 'shimmer 2.5s infinite linear',
        'color-cycle': 'color-cycle 8s ease-in-out infinite',
        'bounce-subtle': 'bounce-subtle 2s ease-in-out infinite',
        'rainbow-gradient': 'rainbow-gradient 3s ease-in-out infinite',
			},
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-radial-to-tr': 'radial-gradient(farthest-corner at top right, var(--tw-gradient-stops))',
        'gradient-radial-to-tl': 'radial-gradient(farthest-corner at top left, var(--tw-gradient-stops))',
        'gradient-radial-to-br': 'radial-gradient(farthest-corner at bottom right, var(--tw-gradient-stops))',
        'gradient-radial-to-bl': 'radial-gradient(farthest-corner at bottom left, var(--tw-gradient-stops))',
        'pride-gradient': 'linear-gradient(45deg, #e40303, #ff8c00, #ffed00, #008018, #004cff, #732982)',
        'rainbow-gradient': 'linear-gradient(90deg, #ff0000, #ff8000, #ffff00, #80ff00, #00ff00, #00ff80, #00ffff, #0080ff, #0000ff, #8000ff, #ff00ff, #ff0080)',
      },
      boxShadow: {
        'glow': '0 0 15px rgba(99, 102, 241, 0.5)',
        'glow-purple': '0 0 15px rgba(139, 92, 246, 0.5)',
        'glow-pink': '0 0 15px rgba(236, 72, 153, 0.5)',
        'glow-sm': '0 0 10px rgba(99, 102, 241, 0.3)',
        'glow-pride': '0 0 20px rgba(236, 72, 153, 0.6)',
      }
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
