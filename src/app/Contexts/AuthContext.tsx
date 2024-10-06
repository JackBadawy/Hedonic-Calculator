"use client";
import { createContext, useContext, useState, ReactNode } from "react";

interface AuthContextType {
  sessionToken: string | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [sessionToken, setSessionToken] = useState<string | null>(null);

  const login = async (username: string, password: string) => {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `username=${encodeURIComponent(
          username
        )}&password=${encodeURIComponent(password)}`,
      });
      if (response.ok) {
        const token = await response.text();
        setSessionToken(token);
        return true;
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
    return false;
  };

  const logout = async () => {
    if (sessionToken) {
      try {
        await fetch(`/api/auth/logout?sessionToken=${sessionToken}`, {
          method: "POST",
        });
      } catch (error) {
        console.error("Logout failed:", error);
      }
    }
    setSessionToken(null);
  };

  return (
    <AuthContext.Provider value={{ sessionToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
