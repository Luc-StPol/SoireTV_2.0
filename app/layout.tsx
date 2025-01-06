import { useSession } from 'next-auth/react';
import { Roboto_Mono } from 'next/font/google';
import localFont from 'next/font/local';
import { ReactNode } from 'react';

import Header from './_components/navigation/Header';
import LayerLeft from './_components/navigation/LayerLeft';
import Provider from './Providers';

type LayoutType = {
  children: ReactNode;
};

const RobotoMono = Roboto_Mono({
  subsets: ['latin'],
  variable: '--font-caption',
});

const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export default function RootLayout({ children }: LayoutType) {
  // Use useSession to get session data
  const { data: session } = useSession();

  return (
    <div className={`${RobotoMono.variable} ${geistMono.variable} antialiased`}>
      <Provider>
        {/* Show Header if session exists */}
        {session && <Header />}
        {/* Show LayerLeft if session exists, otherwise show children directly */}
        {session ? <LayerLeft>{children}</LayerLeft> : children}
      </Provider>
    </div>
  );
}
