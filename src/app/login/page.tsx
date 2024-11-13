"use client";
import { useState } from "react";
import { useAuth } from "@/app/Contexts/AuthContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AddEvent from "../Componants/Buttons/AddEvent";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const result = await login(username, password);
    if (result.success) {
      router.push("/main");
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="text-hpal-500 min-h-screen flex items-center justify-center bg-hpal-200">
      <div className="bg-hpal-100 p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4 ">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="font-semibold p-0.5 px-1 bg-hpal-200 outline-none mt-1 block w-full rounded-md shadow-sm"
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
              className="p-0.5 px-1 bg-hpal-200 mt-1 block w-full rounded-md outline-none shadow-sm"
              required
            />
          </div>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <button
            type="submit"
            className="w-full bg-hpal-300 text-white rounded-md py-2 px-4 hover:bg-hpal-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-opacity-50"
          >
            Login
          </button>
        </form>
        <div className="mt-4 text-center">
          <Link href="/register" className="text-hpal-300 hover:text-hpal-400">
            Don&apos;t have an account? Register
          </Link>
        </div>
      </div>
    </div>
  );
}
