"use client";
import AuthContainer from "../Componants/Auth/AuthContainer";
import AuthForm from "../Componants/Auth/AuthForm";
import DownloadEssayBtn from "../Componants/Buttons/DownloadEssayBtn";

export default function Login() {
  return (
    <AuthContainer>
      <AuthForm mode="login" />
      <DownloadEssayBtn />
    </AuthContainer>
  );
}
