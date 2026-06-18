/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Base — midnight system
        ink: {
          DEFAULT: '#06070A', // page background
          800: '#0A0C11',
          700: '#0E1118',
          600: '#141823',
          500: '#1B2030',
        },
        // Accent journey: emerald -> cyan -> blue -> violet -> magenta -> pink
        accent: {
          emerald: '#10D9A3',
          cyan: '#2DD4FF',
          blue: '#4F7BFF',
          violet: '#8B5CF6',
          magenta: '#E0119D',
          pink: '#FF5C8A',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        // Display ramp tuned for premium marketing hierarchy
        'display-xl': ['clamp(2.75rem, 6vw, 5rem)', { lineHeight: '1.04', letterSpacing: '-0.02em' }],
        'display-lg': ['clamp(2.25rem, 4.5vw, 3.5rem)', { lineHeight: '1.06', letterSpacing: '-0.02em' }],
        'display-md': ['clamp(1.75rem, 3vw, 2.5rem)', { lineHeight: '1.1', letterSpacing: '-0.01em' }],
      },
      letterSpacing: {
        eyebrow: '0.3em',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        rest: '0 1px 3px rgba(0,0,0,0.06)',
        lift: '0 4px 12px rgba(0,0,0,0.08)',
        modal: '0 16px 48px rgba(0,0,0,0.16)',
        'glass': '0 8px 32px rgba(0,0,0,0.35)',
        'glow-cyan': '0 0 40px -8px rgba(45,212,255,0.45)',
        'glow-violet': '0 0 50px -10px rgba(139,92,246,0.5)',
      },
      transitionTimingFunction: {
        // GSAP-equivalent easing curves
        'expo-out': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'quart-in-out': 'cubic-bezier(0.76, 0, 0.24, 1)',
        back: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      transitionDuration: {
        // Motion token scale
        micro: '150ms',
        base: '250ms',
        medium: '400ms',
        large: '650ms',
        cinematic: '900ms',
      },
      keyframes: {
        floaty: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'floaty-slow': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        spinslow: {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        floaty: 'floaty 5s cubic-bezier(0.76,0,0.24,1) infinite',
        'floaty-slow': 'floaty-slow 6s cubic-bezier(0.76,0,0.24,1) infinite',
        spinslow: 'spinslow 40s linear infinite',
      },
    },
  },
  plugins: [],
}
