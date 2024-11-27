"use client";
import AuthContainer from "../Componants/Auth/AuthContainer";
import AuthForm from "../Componants/Auth/AuthForm";

export default function Login() {
  return (
    <AuthContainer>
      <AuthForm mode="login" />
    </AuthContainer>
  );
}
