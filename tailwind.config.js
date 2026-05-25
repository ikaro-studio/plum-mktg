const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class', '[data-theme="dark"]'],
  content: [
    'app/**/*.{ts,tsx}',
    'components/**/*.{ts,tsx}',
    'pages/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', 'Sora', ...fontFamily.sans],
        soft: ['var(--font-soft)', 'Quicksand', ...fontFamily.sans]
      },
      colors: {
        plum: {
          900: '#351B30',
          800: '#4A1B3B',
          700: '#5B235A'
        },
        rose: {
          500: '#AA5476',
          400: '#95416A',
          300: '#C8A9AF'
        },
        peach: {
          400: '#F8BC9F',
          300: '#F7BB9E'
        },
        sage: {
          300: '#C7D4BB'
        },
        cream: {
          100: '#F1EDEE',
          200: '#EAE3E4'
        },
        ink: {
          1: '#4A1B3B',
          2: '#6B4A5C',
          3: '#9B8189'
        },
        line: {
          DEFAULT: '#E5DBDD',
          strong: '#D2C2C5'
        }
      },
      borderRadius: {
        md: '12px',
        lg: '18px',
        xl: '24px',
        '2xl': '32px'
      },
      boxShadow: {
        xs: '0 1px 2px rgba(74, 27, 59, 0.06)',
        sm: '0 2px 8px rgba(74, 27, 59, 0.06), 0 1px 2px rgba(74, 27, 59, 0.04)',
        md: '0 8px 24px -8px rgba(74, 27, 59, 0.16), 0 2px 6px rgba(74, 27, 59, 0.05)',
        lg: '0 24px 56px -20px rgba(74, 27, 59, 0.28), 0 6px 12px rgba(74, 27, 59, 0.06)',
        focus: '0 0 0 4px rgba(248, 188, 159, 0.55)'
      },
      backgroundImage: {
        'gradient-bloom':
          'linear-gradient(180deg, #F1EDEE 7%, #F8BC9F 28%, #AA5476 61%, #4A1B3B 100%)',
        'gradient-feng': 'linear-gradient(135deg, #C7D4BB 0%, #F8BC9F 100%)',
        'gradient-peach-veil':
          'linear-gradient(180deg, #F7BB9E 0%, rgba(255,255,255,0) 100%)'
      },
      transitionTimingFunction: {
        soft: 'cubic-bezier(0.32, 0.72, 0.24, 1.0)'
      },
      letterSpacing: {
        display: '-0.04em',
        eyebrow: '0.12em'
      }
    }
  },
  plugins: []
};
