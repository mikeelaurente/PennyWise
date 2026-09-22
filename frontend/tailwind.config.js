/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Brand / Primary
        primary: {
          DEFAULT: '#16A34A',
          hover: '#15803D',
          light: '#DCFCE7',
        },
        // Neutral
        bg: {
          DEFAULT: '#F8FAF9',
        },
        surface: '#FFFFFF',
        border: '#E5E7EB',
        text: {
          DEFAULT: '#17201B',
          muted: '#6B746D',
        },
        // Semantic
        income: '#16A34A',
        expense: '#DC2626',
        transfer: '#2563EB',
        warning: '#D97706',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      fontSize: {
        'page-title': ['28px', { fontWeight: '600', lineHeight: '1.2' }],
        'section-title': ['20px', { fontWeight: '600', lineHeight: '1.2' }],
        'subsection-title': ['16px', { fontWeight: '600', lineHeight: '1.2' }],
        body: ['14px', { fontWeight: '400', lineHeight: '1.5' }],
        'body-emphasis': ['14px', { fontWeight: '500', lineHeight: '1.5' }],
        secondary: ['13px', { fontWeight: '400', lineHeight: '1.5' }],
        caption: ['12px', { fontWeight: '400', lineHeight: '1.5' }],
        'large-amount': ['28px', { fontWeight: '600', lineHeight: '1.2' }],
        'standard-amount': ['20px', { fontWeight: '600', lineHeight: '1.2' }],
        'small-amount': ['14px', { fontWeight: '500', lineHeight: '1.5' }],
      },
      spacing: {
        xs: '4px',
        sm: '8px',
        md: '12px',
        lg: '16px',
        xl: '24px',
        '2xl': '32px',
        '3xl': '40px',
        '4xl': '48px',
      },
      borderRadius: {
        xs: '6px',
        sm: '8px',
        md: '12px',
        lg: '16px',
      },
      boxShadow: {
        subtle: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      },
    },
  },
  plugins: [],
};
