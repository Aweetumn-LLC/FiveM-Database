
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
        blue: {
          400: 'hsl(213, 93%, 68%)',
          500: 'hsl(217, 91%, 60%)',
          600: 'hsl(221, 83%, 53%)',
        },
        indigo: {
          400: 'hsl(238, 80%, 76%)',
          500: 'hsl(239, 84%, 67%)',
          600: 'hsl(243, 75%, 59%)',
        },
        purple: {
          400: 'hsl(258, 90%, 66%)',
          500: 'hsl(258, 90%, 66%)',
          600: 'hsl(262, 83%, 58%)',
        },
        teal: {
          400: 'hsl(172, 66%, 50%)',
          500: 'hsl(173, 80%, 40%)',
          600: 'hsl(175, 84%, 32%)',
        },
        pink: {
          400: 'hsl(329, 86%, 70%)',
          500: 'hsl(330, 81%, 60%)',
          600: 'hsl(333, 71%, 51%)',
        },
        green: {
          400: 'hsl(142, 76%, 73%)',
          500: 'hsl(142, 71%, 45%)',
        },
        red: {
          400: 'hsl(0, 84%, 70%)',
          500: 'hsl(0, 84%, 60%)',
        },
        orange: {
          400: 'hsl(20, 95%, 64%)',
          500: 'hsl(20, 91%, 48%)',
        },
        yellow: {
          400: 'hsl(54, 96%, 53%)',
          500: 'hsl(45, 93%, 47%)',
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
        'fivem-gradient': 'linear-gradient(135deg, hsl(217, 91%, 60%), hsl(217, 91%, 50%))',
        'fivem-hero': 'linear-gradient(135deg, hsl(218, 27%, 6%) 0%, hsl(218, 20%, 8%) 50%, hsl(218, 27%, 6%) 100%)',
        'fivem-card': 'linear-gradient(145deg, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.01))',
      },
      boxShadow: {
        'glow': '0 0 20px hsl(217, 91%, 60%, 0.4)',
        'glow-blue': '0 0 20px hsl(217, 91%, 60%, 0.3)',
        'glow-purple': '0 0 15px rgba(139, 92, 246, 0.5)',
        'glow-pink': '0 0 15px rgba(236, 72, 153, 0.5)',
        'glow-sm': '0 0 10px hsl(217, 91%, 60%, 0.2)',
        'fivem-card': '0 8px 32px rgba(0, 0, 0, 0.12), 0 4px 16px rgba(0, 0, 0, 0.08)',
        'fivem-hover': '0 12px 40px rgba(0, 0, 0, 0.15), 0 6px 20px rgba(0, 0, 0, 0.1)',
      }
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
