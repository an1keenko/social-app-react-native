import { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextType {
  user: User | null;
  setAuth: (user: User | null) => void;
  setUserData: (userData: User) => void;
}

interface User {
  id: string;
  name: string;
  email: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const setAuth = (user: User | null) => {
    setUser(user);
  };

  const setUserData = (userData: User) => {
    setUser({ ...userData });
  };

  return <AuthContext.Provider value={{ user, setAuth, setUserData }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
