'use client';

import { createContext, ReactNode, useContext, useState } from 'react';

interface ResearchDataProviderProps {
  children: ReactNode;
}
interface ResearchDataContextType {
  researchName: string | null;
  getResearchName: (research: string) => void;
}

const ResearchDataContext = createContext<ResearchDataContextType | null>(null);

export const ResearchDataProvider: React.FC<ResearchDataProviderProps> = ({
  children,
}) => {
  const [researchName, setResearchName] = useState<string | null>(null);

  const getResearchName = (research: string | null) => {
    setResearchName(research);
  };

  return (
    <ResearchDataContext.Provider value={{ researchName, getResearchName }}>
      {children}
    </ResearchDataContext.Provider>
  );
};

export const useResearchData = (): ResearchDataContextType => {
  const context = useContext(ResearchDataContext);

  if (!context) {
    throw new Error(
      'useResearchsData must be used within an ResearchDataProvider',
    );
  }

  return context;
};
