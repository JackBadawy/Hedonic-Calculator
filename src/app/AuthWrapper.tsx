"use client";
import { useEffect, useState, ReactNode } from "react";
import { useAuth } from "@/app/Contexts/AuthContext";
import LoadingFallback from "@/app/LoadingFallback";
import { useRouter } from "next/navigation";

interface AuthWrapperProps {
  children: ReactNode;
}

const AuthWrapper: React.FC<AuthWrapperProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    } else {
      setIsLoading(false);
    }
  }, [isAuthenticated, router]);

  if (isLoading) {
    return <LoadingFallback />;
  }

  return <>{children}</>;
};

export default AuthWrapper;
