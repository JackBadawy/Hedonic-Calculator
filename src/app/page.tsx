"use client";
import { useEffect } from "react";
import { useAuth } from "./Contexts/AuthContext";
import { useRouter } from "next/navigation";
import LoadingFallback from "./LoadingFallback";

export default function Home() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/main");
    } else {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  return <LoadingFallback />;
}
