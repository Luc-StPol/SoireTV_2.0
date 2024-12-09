'use client';

import Cookies from 'js-cookie';
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';

interface AuthContextType {
  isAuthentificated: boolean;
  login: (token: string, userId: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthentificated, setIsAuthentificated] = useState<boolean>(false);

  useEffect(() => {
    const token = Cookies.get('token');
    setIsAuthentificated(!!token);
  }, []);

  const login = (token: string, userId: string) => {
    Cookies.set('token', token, { expires: 7, path: '/' });
    Cookies.set('userId', userId, { expires: 7, path: '/userId' });
    setIsAuthentificated(true);
  };

  const logout = () => {
    Cookies.remove('token', { path: '/' });
    Cookies.remove('userId', { path: '/userId' });
    setIsAuthentificated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthentificated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};
