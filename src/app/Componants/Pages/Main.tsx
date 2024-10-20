"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/app/Contexts/AuthContext";
import { useEvents } from "@/app/Contexts/EventsContext";
import AddEvent from "../Buttons/AddEvent";
import EventListContainerClient from "../Containers/EventList/EventListContainerClient";
import { HEvent } from "@/app/Types/hedon";

const Main = () => {
  const [events, setEvents] = useState<HEvent[]>([]);
  const { sessionToken } = useAuth();
  const { removeEvent, addEvent } = useEvents();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/events", {
          headers: {
            Authorization: `Bearer ${sessionToken}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setEvents(data);
        } else {
          console.error("Failed to fetch events");
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    if (sessionToken) {
      fetchEvents();
    }
  }, [sessionToken]);

  const handleRemoveEvent = async (id: number) => {
    const success = await removeEvent(id);
    if (success) {
      setEvents(events.filter((event) => event.id !== id));
    }
  };

  const handleAddEvent = async (newEvent: HEvent) => {
    const addedEvent = await addEvent(newEvent);
    if (addedEvent) {
      setEvents([...events, addedEvent]);
    }
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
