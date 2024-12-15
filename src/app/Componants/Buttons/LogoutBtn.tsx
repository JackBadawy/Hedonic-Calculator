import { useAuth } from "@/app/Contexts/AuthContext";
import { useRouter } from "next/navigation";
import { logoutUser } from "@/app/Utilities/AuthUtils";
import LoadingSpinner from "../Auth/LoadingSpinner";
import { useState } from "react";

const LogoutBtn = () => {
  const { logout, sessionToken } = useAuth();
  const router = useRouter();
  const [logoutLoading, setLogoutLoading] = useState<Boolean>(false);

  const handleLogout = async () => {
    if (sessionToken) {
      setLogoutLoading(true);
      const success = await logoutUser(sessionToken);
      if (success) {
        logout();
        router.push("/");
      } else {
        setLogoutLoading(false);
        console.error("Failed to logout");
      }
    }
  };

  return (
    <button
      className={`${logoutLoading && "pointer-events-none"} w-24 text-center flex justify-center gap-2 bg-hpal-400 text-hpal-200 hover:text-hpal-100 font-bold px-4 py-2 rounded hover:bg-hpal-300 transition-colors"`}
      onClick={handleLogout}
    >
      {!logoutLoading ? "Logout" : "wait"}
      {logoutLoading && <LoadingSpinner noText fillClass="fill-hpal-200" />}
    </button>
  );
};

export default LogoutBtn;
