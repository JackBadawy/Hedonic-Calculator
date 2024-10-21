import { useEffect, useState } from "react";
import { useAuth } from "@/app/Contexts/AuthContext";
import { useRouter } from "next/navigation";

const IDLE_TIMEOUT = 2 * 60 * 60 * 1000; // 2 hours

const IdleTimer: React.FC = () => {
  const [lastActivity, setLastActivity] = useState(Date.now());
  const { logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const handleActivity = () => setLastActivity(Date.now());
    const events = ["mousedown", "keydown", "touchstart", "scroll"];

    events.forEach((event) => window.addEventListener(event, handleActivity));

    const intervalId = setInterval(() => {
      if (Date.now() - lastActivity > IDLE_TIMEOUT) {
        logout();
        router.push("/login");
      }
    }, 60000);

    return () => {
      events.forEach((event) =>
        window.removeEventListener(event, handleActivity)
      );
      clearInterval(intervalId);
    };
  }, [lastActivity, logout, router]);

  return null;
};

export default IdleTimer;
