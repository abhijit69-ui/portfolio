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
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
      fontFamily: {
        mont: ['var(--font-mont)', ...fontFamily.sans],
      },
    },
  },
  plugins: [],
};
export default config;
