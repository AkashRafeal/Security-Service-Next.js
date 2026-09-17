/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#F8FAFC', // Base Background Canvas (ultra-clean light slate)
          900: '#FFFFFF', // Clean White Card & Panel Surface
          850: '#F8FAFC', // Soft blend surface
          800: '#F1F5F9', // Elevated card / Soft pill background
          700: '#E2E8F0', // Structural card borders & dividers
          600: '#CBD5E1', // Secondary borders
          500: '#64748B', // Muted slate text
          400: '#D97706', // Primary Amber Accent
          100: '#1E293B', // Dark charcoal text
          50: '#0F172A'   // Deep midnight heading text
        },

        slate: {
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1E293B',
          900: '#0F172A',
          950: '#020617',
        },

        gold: {
          700: '#92400E',
          600: '#B45309', // Deep Rich Bronze Gold
          500: '#D97706', // High-Contrast Security Amber Gold
          400: '#D97706', // High-Contrast Gold Accent
          300: '#F59E0B',
          200: '#FDE68A',
          100: '#FEF3C7',
          50: '#FFFBEB'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px -1px rgba(0, 0, 0, 0.04)',
        'elevated': '0 10px 25px -3px rgba(0, 0, 0, 0.07), 0 4px 6px -4px rgba(0, 0, 0, 0.03)',
        'gold-glow': '0 4px 14px 0 rgba(217, 119, 6, 0.25)',
      }
    },
  },
  plugins: [],
}
