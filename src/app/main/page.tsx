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
import AboutBtn from "../Componants/Buttons/AboutBtn";
import MainNav from "./MainNav";

export default function Main() {
  const { events, removeEvent, addEvent, fetchEvents } = useEvents();
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

  const handleAddEvent = async (newEvent: HEvent) => {
    await addEvent(newEvent);
  };

  if (!sessionToken) {
    return null;
  }

  return (
    <div className="bg-hpal-200 min-h-screen p-4">
      <MainNav />
      <AboutBtn />
      <IdleTimer />
      <AddEvent />
      <EventListContainerClient
        events={events}
        onRemoveEvent={handleRemoveEvent}
      />
    </div>
  );
}
