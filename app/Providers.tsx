'use client';

import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';

import { ResearchDataProvider } from './context/ResearchData';

type ProviderProps = {
  children: ReactNode;
};

export default function Provider({ children }: ProviderProps) {
  return (
    <SessionProvider>
      <ResearchDataProvider>{children}</ResearchDataProvider>
    </SessionProvider>
  );
}
