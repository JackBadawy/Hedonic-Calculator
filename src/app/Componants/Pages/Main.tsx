"use client";
import { useEvents } from "@/app/Contexts/EventsContext";
import AddEvent from "../Buttons/AddEvent";
import EventListContainerClient from "../Containers/EventList/EventListContainerClient";
import { HEvent } from "@/app/Types/hedon";

const Main = () => {
  const { events, removeEvent, addEvent } = useEvents();

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
};

export default Main;
