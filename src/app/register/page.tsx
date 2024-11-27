"use client";
import AuthContainer from "../Componants/Auth/AuthContainer";
import AuthForm from "../Componants/Auth/AuthForm";

export default function Register() {
  return (
    <AuthContainer>
      <AuthForm mode="register" />
    </AuthContainer>
  );
}
