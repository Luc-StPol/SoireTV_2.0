import type { AppProps } from 'next/app';

import RootLayout from '@/app/layout';
import Provider from '@/app/Providers';
import '../app/globals.css';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider>
      <RootLayout>
        <Component {...pageProps} />
      </RootLayout>
    </Provider>
  );
}
