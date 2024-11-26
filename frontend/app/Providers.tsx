'use client'

import { AuthProvider } from "./context/Authorization";
import { ResearchDataProvider } from "./context/ResearchData";
import { ReactNode } from "react";

type ProviderProps = {
    children: ReactNode
}

export default function Provider({children}: ProviderProps) {
    return (
        <AuthProvider>
          <ResearchDataProvider>
            {children}
          </ResearchDataProvider>
        </AuthProvider>
    )
}