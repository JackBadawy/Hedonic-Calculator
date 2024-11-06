"use client";
import { useState } from "react";
import { useAuth } from "@/app/Contexts/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch(`${process.env.API_URL}/api/auth/register`, {
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
        const loginResult = await login(username, password);
        if (loginResult.success) {
          router.push("/main");
        } else {
          setError(loginResult.message);
        }
      } else {
        const errorText = await response.text();
        setError(`Registration failed: ${errorText}`);
      }
    } catch (error) {
      setError(`Registration error: ${error}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-violet-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4 text-violet-800">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-violet-700"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="text-violet-700 mt-1 block w-full rounded-md border-violet-300 shadow-sm focus:border-violet-500 focus:ring focus:ring-violet-200"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-violet-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="text-violet-700 mt-1 block w-full rounded-md border-violet-300 shadow-sm focus:border-violet-500 focus:ring focus:ring-violet-200"
              required
            />
          </div>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <button
            type="submit"
            className="w-full bg-violet-600 text-white rounded-md py-2 px-4 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-opacity-50"
          >
            Register
          </button>
        </form>
        <div className="mt-4 text-center">
          <Link href="/" className="text-violet-600 hover:text-violet-800">
            Already have an account? Login
          </Link>
        </div>
      </div>
    </div>
  );
}
