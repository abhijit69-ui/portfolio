import { useEffect, useState } from 'react';

const useThemeSwitch = () => {
  const preferDarkQuery = '(prefers-color-scheme: dark)';
  const [mode, setMode] = useState('');

  useEffect(() => {
    const mediaQuery = window.matchMedia(preferDarkQuery);

    const handleTheme = () => {
      const userPref = window.localStorage.getItem('theme');
      const check = userPref
        ? userPref === 'dark'
          ? 'dark'
          : 'light'
        : mediaQuery.matches
        ? 'dark'
        : 'light';

      setMode(check);

      if (check === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    };

    handleTheme(); // 💡 Run on mount
    mediaQuery.addEventListener('change', handleTheme);

    return () => mediaQuery.removeEventListener('change', handleTheme);
  }, []);

  useEffect(() => {
    if (mode === 'dark') {
      window.localStorage.setItem('theme', 'dark');
      document.documentElement.classList.add('dark');
    } else if (mode === 'light') {
      window.localStorage.setItem('theme', 'light');
      document.documentElement.classList.remove('dark');
    }
  }, [mode]);

  return { mode, setMode };
};

export default useThemeSwitch;
