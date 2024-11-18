"use client";
import { useState } from "react";
import { useAuth } from "@/app/Contexts/AuthContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { handleAuthSubmit, registerUser } from "@/app/Utilities/AuthUtils";

interface AuthFormProps {
  mode: "login" | "register";
}

const AuthForm: React.FC<AuthFormProps> = ({ mode }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const result = await handleAuthSubmit(mode, username, password);
    if (result.success) {
      if (result.token) {
        await login(username, password);
        router.push("/main");
      }
    } else {
      setError(result.message);
    }
  };

  const title = mode === "login" ? "Login" : "Register";
  const linkText =
    mode === "login"
      ? "Don't have an account? Register"
      : "Already have an account? Login";
  const linkHref = mode === "login" ? "/register" : "/login";

  return (
    <div className="text-hpal-500 min-h-screen flex items-center justify-center bg-hpal-200">
      <div className="bg-hpal-100 p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <form onSubmit={handleSubmit} className="" autoComplete="off">
          <div className="mb-4 text-2xl">
            <label htmlFor="username" className="block text-sm font-medium">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="text-sm font-semibold p-0.5 px-1 bg-hpal-200 outline-none mt-1 block w-full rounded-md shadow-sm"
              autoComplete="off"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="text-sm font-semibold p-0.5 px-1 bg-hpal-200 outline-none mt-1 block w-full rounded-md shadow-sm"
              required
            />
          </div>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <button
            type="submit"
            className="w-full bg-hpal-300 text-hpal-100 rounded-md py-2 px-4 hover:bg-hpal-400 transition-colors"
          >
            {title}
          </button>
        </form>
        <div className="mt-4 text-center">
          <Link href={linkHref} className="text-hpal-300 hover:text-hpal-400">
            {linkText}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
