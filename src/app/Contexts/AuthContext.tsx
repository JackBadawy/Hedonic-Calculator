"use client";
import { createContext, useContext, useState, ReactNode } from "react";

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
    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          username,
          password,
        }),
      });

      if (response.ok) {
        const token = await response.text();
        const cleanToken = token.replace(/^"|"$/g, "");
        setSessionToken(cleanToken);
        setIsAuthenticated(true);
        return { success: true, message: "Login successful" };
      } else {
        const errorText = await response.text();
        console.error("Login failed:", errorText);
        return { success: false, message: `Login failed: ${errorText}` };
      }
    } catch (error) {
      console.error("Login error:", error);
      return { success: false, message: `Login error: ${error}` };
    }
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
