"use client";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  SetStateAction,
  Dispatch,
} from "react";
import { loginUser } from "../Utilities/AuthUtils";

interface AuthContextType {
  isAuthenticated: boolean;
  sessionToken: string | null;
  loading: boolean;
  username: string;
  login: (
    username: string,
    password: string,
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
  const [username, setUsername] = useState("");
  useEffect(() => {
    const storedToken = sessionStorage.getItem("sessionToken");
    const storedName = sessionStorage.getItem("userName");
    if (storedToken) {
      setSessionToken(storedToken);
      setIsAuthenticated(true);
    }
    if (storedName) {
      setUsername(storedName);
    }
    setLoading(false);
  }, []);

  const login = async (username: string, password: string) => {
    const result = await loginUser(username, password);
    if (result.success && result.token) {
      sessionStorage.setItem("sessionToken", result.token);
      sessionStorage.setItem("userName", username);
      setSessionToken(result.token);
      setUsername(username);
      setIsAuthenticated(true);
    }
    return result;
  };

  const logout = () => {
    sessionStorage.removeItem("sessionToken");
    sessionStorage.removeItem("userName");
    setSessionToken(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        sessionToken,
        loading,
        login,
        logout,
        username,
      }}
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
