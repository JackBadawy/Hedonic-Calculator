import { useAuth } from "@/app/Contexts/AuthContext";
import { useRouter } from "next/navigation";
import { logoutUser } from "@/app/Utilities/AuthUtils";

const LogoutBtn = () => {
  const { logout, sessionToken } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    if (sessionToken) {
      const success = await logoutUser(sessionToken);
      if (success) {
        logout();
        router.push("/login");
      } else {
        console.error("Failed to logout");
      }
    }
  };

  return (
    <button
      className="bg-hpal-500 text-hpal-200 hover:text-hpal-100 font-bold px-4 py-2 rounded hover:bg-hpal-400 transition-colors"
      onClick={handleLogout}
    >
      Logout
    </button>
  );
};

export default LogoutBtn;
