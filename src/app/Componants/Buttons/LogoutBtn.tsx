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
      className="bg-violet-600 text-white px-4 py-2 rounded hover:bg-violet-700 transition-colors"
      onClick={handleLogout}
    >
      Logout
    </button>
  );
};

export default LogoutBtn;
