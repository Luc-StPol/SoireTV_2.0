'use client';

import { ReactNode } from 'react';

import { AuthProvider } from './context/Authorization';
import { ResearchDataProvider } from './context/ResearchData';

type ProviderProps = {
  children: ReactNode;
};

export default function Provider({ children }: ProviderProps) {
  return (
    <AuthProvider>
      <ResearchDataProvider>{children}</ResearchDataProvider>
    </AuthProvider>
  );
}
