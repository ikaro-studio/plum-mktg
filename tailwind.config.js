const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    'app/**/*.{ts,tsx}',
    'components/**/*.{ts,tsx}',
    'pages/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', ...fontFamily.sans],
        soft: ['var(--font-soft)', ...fontFamily.sans],
        avio: ['var(--font-avio)', ...fontFamily.sans]
      },
      colors: {
        // ---- Brand colors — constant across modes ----
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

        // ---- Semantic tokens — flip with .dark on <html> ----
        surface: {
          DEFAULT: 'var(--bg)',
          elevated: 'var(--bg-elevated)',
          sunken: 'var(--bg-sunken)',
          inverse: 'var(--bg-inverse)'
        },
        fg: {
          DEFAULT: 'var(--fg1)',
          strong: 'var(--fg-strong)',
          muted: 'var(--fg2)',
          subtle: 'var(--fg3)',
          inverse: 'var(--fg-inverse)',
          accent: 'var(--fg-accent)'
        },
        // Legacy aliases — kept so existing components keep working;
        // both map to semantic vars and auto-switch with dark mode.
        ink: {
          1: 'var(--fg1)',
          2: 'var(--fg2)',
          3: 'var(--fg3)'
        },
        line: {
          DEFAULT: 'var(--line)',
          strong: 'var(--line-strong)'
        },
        accent: {
          DEFAULT: 'var(--accent)',
          hover: 'var(--accent-hover)'
        },
        action: {
          DEFAULT: 'var(--action)',
          fg: 'var(--action-fg)',
          hover: 'var(--action-hover)',
          press: 'var(--action-press)'
        }
      },
      borderRadius: {
        md: '12px',
        lg: '18px',
        xl: '24px',
        '2xl': '32px'
      },
      boxShadow: {
        xs: 'var(--shadow-xs)',
        sm: 'var(--shadow-sm)',
        md: 'var(--shadow-md)',
        lg: 'var(--shadow-lg)',
        focus: 'var(--shadow-focus)'
      },
      backgroundImage: {
        'gradient-bloom':
          'linear-gradient(180deg, #F1EDEE 7%, #F8BC9F 28%, #AA5476 61%, #4A1B3B 100%)',
        'gradient-feng': 'linear-gradient(135deg, #C7D4BB 0%, #F8BC9F 100%)',
        'gradient-peach-veil':
          'linear-gradient(180deg, #F7BB9E 0%, rgba(247,187,158,0.85) 40%, rgba(247,187,158,0) 100%)'
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
