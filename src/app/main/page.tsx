"use client";
import { useEvents } from "@/app/Contexts/EventsContext";
import { useAuth } from "@/app/Contexts/AuthContext";
import { useRouter } from "next/navigation";
import AddEvent from "../Componants/Buttons/AddEvent";
import EventListContainerClient from "../Componants/Containers/EventList/EventListContainerClient";
import { useEffect } from "react";
import IdleTimer from "../Componants/Auth/IdleTimer";
import AboutBtn from "../Componants/Buttons/AboutBtn";
import HNav from "../Componants/Nav/HNav";

export default function Main() {
  const { events, removeEvent, fetchEvents } = useEvents();
  const { sessionToken, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !sessionToken) {
      router.push("/login");
    } else {
      fetchEvents();
    }
  }, [loading, sessionToken, router, fetchEvents]);

  const handleRemoveEvent = async (id: number) => {
    await removeEvent(id);
  };

  if (!sessionToken) {
    return null;
  }

  return (
    <div className="bg-hpal-200 min-h-screen">
      <HNav />
      <AboutBtn />
      <IdleTimer />
      <div className="p-4">
        <AddEvent />
        <EventListContainerClient
          events={events}
          onRemoveEvent={handleRemoveEvent}
        />
      </div>
    </div>
  );
}
