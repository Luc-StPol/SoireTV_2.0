
import localFont from "next/font/local";

import Header from "./_components/Navigation/Header";
import {Roboto_Mono} from 'next/font/google'
import LayerLeft from "./_components/Navigation/LayerLeft";
import Provider from "./Providers";
import { ReactNode } from "react";

type LayoutType = {
  children: ReactNode
}

const RobotoMono = Roboto_Mono({
  subsets: ['latin'],
  variable: '--font-caption'
});
 

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});



export default function RootLayout({children}: LayoutType) {

  return (
      <div
        className={`${RobotoMono.variable} ${geistMono.variable} antialiased`}
      >
        <Provider>
        <Header />
        <LayerLeft>
        {children}
        </LayerLeft>
        </Provider>
      </div>

  );
}
