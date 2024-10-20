"use client";

import { useAuth } from "@/app/Contexts/AuthContext";
import Login from "./Componants/Pages/Login";
import Main from "./Componants/Pages/Main";

const AuthWrapper = () => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <Main /> : <Login />;
};

export default AuthWrapper;
