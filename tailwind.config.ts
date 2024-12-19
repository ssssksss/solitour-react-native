import { PluginAPI } from 'tailwindcss/types/config';

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      fontFamily: {
        samliphopangche: ['SDSamliphopangcheTTFOutline', 'sans-serif'],
        pretendard: ['PretendardVariable', 'sans-serif'],
      },
      colors: {
        black: '#111111',
        white: '#ffffff',
        gray: {
          100: '#111111',
          90: '#282828',
          80: '#404040',
          70: '#575757',
          60: '#6F6F6F',
          50: '#868686',
          40: '#9D9D9D',
          30: '#B5B5B5',
          20: '#CCCCCC',
          10: '#E5E8EB',
        },
        bg: {
          white: '#ffffff',
          gray: '#f5f5f5',
          green: '#ECF4E2',
          light: {
            green: '#F2F6EC',
            gray: '#F8F8F8',
          },
        },
        text: {
          1: '#000817',
          2: '#404040',
          3: '#666666',
          disabled: '#B5B5B5',
        },
        primary: '#26B888',
        error: '#DA1E28',
      },
    },
  },
  plugins: [
    function ({addUtilities}: PluginAPI) {
      addUtilities({
        '.default-flex': {
          display: 'flex',
          'justify-content': 'center',
          'align-items': 'center',
          'font-family': 'SDSamliphopangcheTTFOutline',
        },
        '.title-heading-7': {
          fontSize: '56px',
          lineHeight: '130%',
          letterSpacing: 'calc(-0.003 * 56px)',
          fontWeight: '700',
        },
        '.title-heading-6': {
          fontSize: '48px',
          lineHeight: '130%',
          letterSpacing: 'calc(-0.003 * 48px)',
          fontWeight: '700',
        },
        '.title-heading-5': {
          fontSize: '40px',
          lineHeight: '130%',
          letterSpacing: 'calc(-0.003 * 40px)',
          fontWeight: '700',
        },
        '.title-heading-4': {
          fontSize: '32px',
          lineHeight: '130%',
          letterSpacing: 'calc(-0.003 * 32px)',
          fontWeight: '700',
        },
        '.title-heading-3': {
          fontSize: '28px',
          lineHeight: '140%',
          letterSpacing: 'calc(-0.003 * 28px)',
          fontWeight: '700',
        },
        '.title-heading-2': {
          fontSize: '24px',
          lineHeight: '140%',
          letterSpacing: 'calc(-0.003 * 24px)',
          fontWeight: '700',
        },
        '.title-heading-1': {
          fontSize: '20px',
          lineHeight: '140%',
          letterSpacing: 'calc(-0.003 * 20px)',
          fontWeight: '600',
        },
        '.title-sub-head-3': {
          fontSize: '18px',
          lineHeight: '140%',
          letterSpacing: 'calc(-0.003 * 18px)',
          fontWeight: '700',
        },
        '.title-sub-head-2': {
          fontSize: '16px',
          lineHeight: '140%',
          letterSpacing: 'calc(-0.003 * 16px)',
          fontWeight: '700',
        },
        '.title-sub-head-1': {
          fontSize: '14px',
          lineHeight: '140%',
          letterSpacing: 'calc(-0.003 * 14px)',
          fontWeight: '700',
        },
        '.body-3': {
          fontSize: '18px',
          lineHeight: '150%',
          letterSpacing: 'calc(-0.003 * 14px)',
          fontWeight: '400',
        },
        '.body-2': {
          fontSize: '16px',
          lineHeight: '150%',
          letterSpacing: 'calc(-0.003 * 14px)',
          fontWeight: '400',
        },
        '.body-1': {
          fontSize: '14px',
          lineHeight: '150%',
          letterSpacing: 'calc(-0.003 * 14px)',
          fontWeight: '400',
        },
        '.text-caption': {
          fontSize: '12px',
          lineHeight: '140%',
          letterSpacing: '0',
          fontWeight: '400',
        },
      });
    },
  ],
};
