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

  const [logoutHoverState, setLogoutHS] = useState<boolean>(false);

  return (
    <button
      className={`${logoutLoading && "pointer-events-none"} transition-all border-none p-px text-nowrap w-24 text-center ${!logoutHoverState ? "bg-hpal-200 text-hpal-500 border-hpal-500" : "bg-hpal-500 text-hpal-200 border-hpal-200"} font-bold`}
      onClick={handleLogout}
      onMouseEnter={() => setLogoutHS(true)}
      onMouseLeave={() => setLogoutHS(false)}
    >
      <div
        className={`border-4 p-px ${!logoutHoverState ? "border-hpal-500" : "border-hpal-200"}`}
      >
        <div className="border-4 border-inherit p-px bg-transparent">
          <div className="flex justify-center gap-2 text-inherit">
            {!logoutLoading ? "Logout" : "wait"}
            {logoutLoading && (
              <LoadingSpinner noText fillClass="fill-hpal-200" />
            )}
          </div>
        </div>
      </div>
    </button>
  );
};

export default LogoutBtn;
