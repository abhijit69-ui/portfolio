import type { Config } from 'tailwindcss';

import defaultTheme from 'tailwindcss/defaultTheme';
const { fontFamily } = defaultTheme;

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        dark: '#1b1b1b',
        light: '#f5f5f5',
        primary: '#B63E96', // 240,86,199
        primaryDark: '#58E6D9', // 80,230,217
      },
      fontFamily: {
        mont: ['var(--font-mont)', ...fontFamily.sans],
      },
    },
  },
  plugins: [],
};
export default config;
