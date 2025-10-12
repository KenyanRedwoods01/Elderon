/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}', '../../packages/ui/src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'enterprise-blue': '#1E40AF',
        'enterprise-dark': '#0F172A',
        'enterprise-green': '#059669',
        'enterprise-purple': '#7C3AED',
      },
    },
  },
  plugins: [],
};
