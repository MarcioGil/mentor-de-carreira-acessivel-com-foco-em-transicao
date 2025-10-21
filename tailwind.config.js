/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      // Cores personalizadas para acessibilidade
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        secondary: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
        accent: {
          50: '#fef3c7',
          100: '#fde68a',
          200: '#fcd34d',
          300: '#fbbf24',
          400: '#f59e0b',
          500: '#d97706',
          600: '#b45309',
          700: '#92400e',
          800: '#78350f',
          900: '#451a03',
        },
        voice: {
          inactive: '#6b7280',
          listening: '#ef4444',
          processing: '#f59e0b',
          active: '#10b981',
        },
        mobile: {
          thumb: '#3b82f6', // Cor para thumb zone
          safe: '#10b981',   // Cor para safe area
          danger: '#ef4444', // Cor para danger area
        }
      },
      
      // Fonts otimizadas para mobile
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Consolas', 'monospace'],
      },
      
      // Spacing para mobile (thumb-friendly)
      spacing: {
        'thumb': '44px',     // Tamanho mínimo para touch targets
        'safe-top': '44px',  // iOS safe area top
        'safe-bottom': '34px', // iOS safe area bottom
        '18': '4.5rem',
        '88': '22rem',
      },
      
      // Tamanhos específicos para mobile
      width: {
        'thumb': '44px',
        'mobile-sm': '320px',
        'mobile-md': '375px',
        'mobile-lg': '414px',
      },
      
      height: {
        'thumb': '44px',
        'screen-safe': 'calc(100vh - 88px)', // Considerando safe areas
        'mobile-content': 'calc(100vh - 140px)', // Header + bottom nav
      },
      
      // Border radius para elementos mobile
      borderRadius: {
        'mobile': '12px',
        'card': '16px',
        'button': '8px',
      },
      
      // Shadows otimizadas para mobile
      boxShadow: {
        'mobile': '0 2px 8px rgba(0, 0, 0, 0.1)',
        'card': '0 4px 16px rgba(0, 0, 0, 0.12)',
        'voice-active': '0 0 20px rgba(16, 185, 129, 0.4)',
        'voice-listening': '0 0 20px rgba(239, 68, 68, 0.4)',
      },
      
      // Animations para feedback tátil
      animation: {
        'voice-pulse': 'voice-pulse 2s infinite',
        'listening-pulse': 'listening-pulse 1s infinite',
        'button-press': 'button-press 0.1s ease-out',
        'slide-up': 'slide-up 0.3s ease-out',
        'slide-down': 'slide-down 0.3s ease-out',
        'fade-in': 'fade-in 0.2s ease-out',
        'scale-in': 'scale-in 0.2s ease-out',
      },
      
      keyframes: {
        'voice-pulse': {
          '0%, 100%': { 
            transform: 'scale(1)',
            boxShadow: '0 0 0 0 rgba(16, 185, 129, 0.7)'
          },
          '50%': { 
            transform: 'scale(1.05)',
            boxShadow: '0 0 0 10px rgba(16, 185, 129, 0)'
          },
        },
        'listening-pulse': {
          '0%, 100%': { 
            transform: 'scale(1)',
            backgroundColor: 'rgb(239, 68, 68)'
          },
          '50%': { 
            transform: 'scale(1.1)',
            backgroundColor: 'rgb(220, 38, 38)'
          },
        },
        'button-press': {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(0.95)' },
          '100%': { transform: 'scale(1)' },
        },
        'slide-up': {
          '0%': { 
            transform: 'translateY(100%)',
            opacity: '0'
          },
          '100%': { 
            transform: 'translateY(0)',
            opacity: '1'
          },
        },
        'slide-down': {
          '0%': { 
            transform: 'translateY(-100%)',
            opacity: '0'
          },
          '100%': { 
            transform: 'translateY(0)',
            opacity: '1'
          },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'scale-in': {
          '0%': { 
            transform: 'scale(0.9)',
            opacity: '0'
          },
          '100%': { 
            transform: 'scale(1)',
            opacity: '1'
          },
        },
      },
      
      // Breakpoints customizados para mobile-first
      screens: {
        'xs': '320px',
        'sm': '375px',
        'md': '414px',
        'lg': '768px',
        'xl': '1024px',
        '2xl': '1280px',
        // Orientações
        'landscape': {'raw': '(orientation: landscape)'},
        'portrait': {'raw': '(orientation: portrait)'},
        // Densidade de tela
        'retina': {'raw': '(-webkit-min-device-pixel-ratio: 2)'},
      },
      
      // Z-index layers
      zIndex: {
        'modal': '1000',
        'dropdown': '500',
        'voice-button': '100',
        'bottom-nav': '50',
        'header': '40',
      },
      
      // Transitions otimizadas para mobile
      transitionDuration: {
        '150': '150ms',
        '250': '250ms',
      },
      
      // Backdrop blur para glassmorphism
      backdropBlur: {
        'xs': '2px',
        'mobile': '8px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms')({
      strategy: 'class', // Para não conflitar com componentes customizados
    }),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
    
    // Plugin customizado para utilidades mobile
    function({ addUtilities, theme }) {
      const newUtilities = {
        // Utilidades para thumb zone (área acessível do polegar)
        '.thumb-zone': {
          minHeight: '44px',
          minWidth: '44px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        },
        
        // Scroll suave para mobile
        '.scroll-smooth-mobile': {
          scrollBehavior: 'smooth',
          '-webkit-overflow-scrolling': 'touch',
        },
        
        // Tap highlights removidos
        '.no-tap-highlight': {
          '-webkit-tap-highlight-color': 'transparent',
          '-webkit-touch-callout': 'none',
          '-webkit-user-select': 'none',
          userSelect: 'none',
        },
        
        // Safe area para iOS
        '.safe-area-inset-top': {
          paddingTop: 'env(safe-area-inset-top)',
        },
        '.safe-area-inset-bottom': {
          paddingBottom: 'env(safe-area-inset-bottom)',
        },
        '.safe-area-inset-left': {
          paddingLeft: 'env(safe-area-inset-left)',
        },
        '.safe-area-inset-right': {
          paddingRight: 'env(safe-area-inset-right)',
        },
        
        // Glassmorphism
        '.glass': {
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
        },
        
        // Voice feedback visual
        '.voice-recording': {
          animation: 'listening-pulse 1s infinite',
          boxShadow: '0 0 20px rgba(239, 68, 68, 0.4)',
        },
        
        // Mobile focus states
        '.mobile-focus': {
          '&:focus': {
            outline: '2px solid theme(colors.primary.500)',
            outlineOffset: '2px',
          },
        },
      }
      
      addUtilities(newUtilities, ['responsive', 'hover'])
    },
  ],
}