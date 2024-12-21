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
    setLogoutHS(false);
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
    <div className="w-24 h-16 flex justify-center items-center">
      <button
        className={`${logoutLoading && "pointer-events-none"} transition-all border-none p-0.5 text-nowrap w-24 text-center bg-hpal-200 ${!logoutHoverState ? "text-hpal-500 border-hpal-500" : "w-[90px] text-hpal-200 border-hpal-200"} font-bold`}
        onClick={handleLogout}
        onMouseEnter={() => setLogoutHS(true)}
        onMouseLeave={() => setLogoutHS(false)}
      >
        <div
          className={`p-1 ${!logoutHoverState ? "border-4 border-hpal-500 bg-hpal-200" : "bg-hpal-500"}`}
        >
          <div
            className={`border-4  ${!logoutHoverState ? "border-hpal-500 bg-hpal-200" : "border-hpal-200 bg-hpal-500"} p-1`}
          >
            <div className="flex justify-center gap-2 text-inherit">
              {!logoutLoading ? "Logout" : "wait"}
              {logoutLoading && (
                <LoadingSpinner noText fillClass="fill-hpal-500" />
              )}
            </div>
          </div>
        </div>
      </button>
    </div>
  );
};

export default LogoutBtn;
