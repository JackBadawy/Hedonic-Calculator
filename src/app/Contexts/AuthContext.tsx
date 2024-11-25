"use client";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { loginUser } from "../Utilities/AuthUtils";

interface AuthContextType {
  isAuthenticated: boolean;
  sessionToken: string | null;
  loading: boolean;
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("sessionToken");
    if (storedToken) {
      setSessionToken(storedToken);
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const login = async (username: string, password: string) => {
    const result = await loginUser(username, password);
    if (result.success && result.token) {
      localStorage.setItem("sessionToken", result.token);
      setSessionToken(result.token);
      setIsAuthenticated(true);
    }
    return result;
  };

  const logout = () => {
    localStorage.removeItem("sessionToken");
    setSessionToken(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, sessionToken, loading, login, logout }}
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
