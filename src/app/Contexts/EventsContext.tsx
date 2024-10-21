"use client";
import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { HEvent } from "@/app/Types/hedon";
import { useAuth } from "./AuthContext";

interface EventsContextType {
  events: HEvent[];
  removeEvent: (id: number) => Promise<boolean>;
  addEvent: (event: HEvent) => Promise<HEvent | null>;
  fetchEvents: () => Promise<void>;
}

const EventsContext = createContext<EventsContextType | undefined>(undefined);

export const EventsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [events, setEvents] = useState<HEvent[]>([]);
  const { sessionToken } = useAuth();

  const fetchEvents = async (): Promise<void> => {
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

  useEffect(() => {
    fetchEvents();
  }, [sessionToken]);

  const removeEvent = async (id: number): Promise<boolean> => {
    try {
      const response = await fetch(`http://localhost:8080/api/events/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${sessionToken}`,
        },
      });
      if (response.ok) {
        setEvents(events.filter((event) => event.id !== id));
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error removing event:", error);
      return false;
    }
  };

  const addEvent = async (event: HEvent): Promise<HEvent | null> => {
    try {
      const response = await fetch("http://localhost:8080/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionToken}`,
        },
        body: JSON.stringify(event),
      });
      if (response.ok) {
        const newEvent = await response.json();
        setEvents([...events, newEvent]);
        return newEvent;
      }
      return null;
    } catch (error) {
      console.error("Error adding event:", error);
      return null;
    }
  };

  return (
    <EventsContext.Provider
      value={{ events, removeEvent, addEvent, fetchEvents }}
    >
      {children}
    </EventsContext.Provider>
  );
};

export const useEvents = () => {
  const context = useContext(EventsContext);
  if (context === undefined) {
    throw new Error("useEvents must be used within an EventsProvider");
  }
  return context;
};
