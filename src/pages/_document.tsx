import { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';

export default function Document() {
  return (
    <Html lang='en'>
      <Head>
        {/* Favicon links */}
        <link
          rel='apple-touch-icon'
          sizes='180x180'
          href='/apple-touch-icon.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='32x32'
          href='/favicon-32x32.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='16x16'
          href='/favicon-16x16.png'
        />
        <link rel='manifest' href='/site.webmanifest' />
        <link rel='shortcut icon' href='/favicon.ico' />
        <meta name='theme-color' content='#ffffff' />
      </Head>
      <body className='antialiased'>
        <Script id='theme-switcher' strategy='beforeInteractive'>
          {`
            document.documentElement.classList.toggle(
              'dark',
              localStorage.theme === 'dark' ||
                (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
            );
          `}
        </Script>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
