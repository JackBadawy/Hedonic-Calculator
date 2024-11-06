"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import { loginUser } from "../Utilities/AuthUtils";

interface AuthContextType {
  isAuthenticated: boolean;
  sessionToken: string | null;
  login: (
    username: string,
    password: string
  ) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [sessionToken, setSessionToken] = useState<string | null>(null);

  const login = async (username: string, password: string) => {
    const result = await loginUser(username, password);
    if (result.success && result.token) {
      setSessionToken(result.token);
      setIsAuthenticated(true);
    }
    return result;
  };

  const logout = () => {
    setSessionToken(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, sessionToken, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
