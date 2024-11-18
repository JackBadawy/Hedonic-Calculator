import { useAuth } from "@/app/Contexts/AuthContext";
import { handleAuthSubmit } from "@/app/Utilities/AuthUtils";
import { useRouter } from "next/router";
import { useState } from "react";
import AuthButton from "./AuthButton";
import AuthErrorMessage from "./AuthErrorMessage";
import AuthFormInput from "./AuthFormInput";
import AuthLink from "./AuthLink";
import AuthContainer from "./AuthContainer";

interface AuthFormProps {
  mode: "login" | "register";
}

const AuthForm: React.FC<AuthFormProps> = ({ mode }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const router = useRouter();
  const title = mode === "login" ? "Login" : "Register";
  const linkText =
    mode === "login"
      ? "Don't have an account? Register"
      : "Already have an account? Login";
  const linkHref = mode === "login" ? "/register" : "/login";

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

  return (
    <AuthContainer>
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <form onSubmit={handleSubmit} autoComplete="off">
        <AuthFormInput
          id="username"
          label="Username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <AuthFormInput
          id="password"
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <AuthErrorMessage message={error} />
        <AuthButton text={title} />
      </form>
      <AuthLink href={linkHref} text={linkText} />
    </AuthContainer>
  );
};

export default AuthForm;
