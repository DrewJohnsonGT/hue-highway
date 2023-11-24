import { Analytics } from '@vercel/analytics/react';
import { Baloo_2 } from 'next/font/google';
import { SITE_TITLE } from '~/constants';
import { AppContextProvider } from '~/context/provider';
import './index.css';

const font = Baloo_2({ subsets: ['latin'] });

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <head>
        <title>{SITE_TITLE}</title>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body className={font.className}>
        <AppContextProvider>{children}</AppContextProvider>
        <Analytics />
      </body>
    </html>
  );
};

export default RootLayout;
