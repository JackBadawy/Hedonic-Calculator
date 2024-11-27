"use client";
import AuthContainer from "../Componants/Auth/AuthContainer";
import AuthForm from "../Componants/Auth/AuthForm";
import HNav from "../Componants/Nav/HNav";

export default function Login() {
  return (
    <AuthContainer>
      <AuthForm mode="login" />
    </AuthContainer>
  );
}
