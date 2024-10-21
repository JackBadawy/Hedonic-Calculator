"use client";
import { useEvents } from "@/app/Contexts/EventsContext";
import { useAuth } from "@/app/Contexts/AuthContext";
import { useRouter } from "next/navigation";
import AddEvent from "../Componants/Buttons/AddEvent";
import EventListContainerClient from "../Componants/Containers/EventList/EventListContainerClient";
import { HEvent } from "@/app/Types/hedon";
import { useEffect } from "react";
import LogoutBtn from "../Componants/Buttons/LogoutBtn";
import IdleTimer from "../Componants/Auth/IdleTimer";

export default function Main() {
  const { events, removeEvent, addEvent, fetchEvents } = useEvents();
  const { sessionToken } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!sessionToken) {
      router.push("/login");
    } else {
      fetchEvents();
    }
  }, [sessionToken, router, fetchEvents]);

  const handleRemoveEvent = async (id: number) => {
    await removeEvent(id);
  };

  const handleAddEvent = async (newEvent: HEvent) => {
    await addEvent(newEvent);
  };

  if (!sessionToken) {
    return null;
  }

  return (
    <div className="bg-violet-100 min-h-screen p-4">
      <IdleTimer />
      <LogoutBtn />
      <AddEvent onAddEvent={handleAddEvent} />
      <EventListContainerClient
        events={events}
        onRemoveEvent={handleRemoveEvent}
      />
    </div>
  );
}
