import containerQueries from '@tailwindcss/container-queries';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],

  theme: {
    extend: {
      colors: {
        'cs-bg': '#0b1020',
        'cs-panel': 'rgba(18, 25, 50, 0.88)',
        'cs-panel-2': 'rgba(255, 255, 255, 0.04)',
        'cs-text': '#eef2ff',
        'cs-muted': '#b8c1ec',
        'cs-accent': '#7c9cff',
        'cs-accent-2': '#9cc2ff',
        'cs-border': 'rgba(255,255,255,0.12)',
        'cs-ok': '#cfe3ff'
      },
      boxShadow: {
        cs: '0 14px 40px rgba(0,0,0,0.35)'
      }
    },
    screens: {
      'phone': '425px',
    },
  },

  plugins: [typography, forms, containerQueries]
} satisfies Config;
