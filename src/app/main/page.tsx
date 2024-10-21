"use client";
import { useEvents } from "@/app/Contexts/EventsContext";
import AddEvent from "../Componants/Buttons/AddEvent";
import EventListContainerClient from "../Componants/Containers/EventList/EventListContainerClient";
import { HEvent } from "@/app/Types/hedon";
import { useEffect } from "react";

export default function Main() {
  const { events, removeEvent, addEvent, fetchEvents } = useEvents();

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const handleRemoveEvent = async (id: number) => {
    await removeEvent(id);
  };

  const handleAddEvent = async (newEvent: HEvent) => {
    await addEvent(newEvent);
  };

  return (
    <div className="bg-violet-100 min-h-screen p-4">
      <AddEvent onAddEvent={handleAddEvent} />
      <EventListContainerClient
        events={events}
        onRemoveEvent={handleRemoveEvent}
      />
    </div>
  );
}
