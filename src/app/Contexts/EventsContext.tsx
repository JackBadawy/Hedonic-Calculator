"use client";
import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useCallback,
} from "react";
import { HEvent } from "@/app/Types/hedon";
import { useAuth } from "./AuthContext";
import { fetchEvents, removeEvent, addEvent } from "../Utilities/EventUtils";

interface EventsContextType {
  events: HEvent[];
  fetchEvents: () => Promise<void>;
  removeEvent: (id: number) => Promise<boolean>;
  addEvent: (event: HEvent) => Promise<HEvent | null>;
}

const EventsContext = createContext<EventsContextType | undefined>(undefined);

export const EventsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [events, setEvents] = useState<HEvent[]>([]);
  const { sessionToken } = useAuth();

  const fetchEventsHandler = useCallback(async () => {
    if (sessionToken) {
      const fetchedEvents = await fetchEvents(sessionToken);
      setEvents(fetchedEvents);
    }
  }, [sessionToken]);

  const removeEventHandler = useCallback(
    async (id: number): Promise<boolean> => {
      if (sessionToken) {
        const success = await removeEvent(id, sessionToken);
        if (success) {
          setEvents(events.filter((event) => event.id !== id));
        }
        return success;
      }
      return false;
    },
    [sessionToken, events]
  );

  const addEventHandler = useCallback(
    async (event: HEvent): Promise<HEvent | null> => {
      if (sessionToken) {
        const newEvent = await addEvent(event, sessionToken);
        if (newEvent) {
          setEvents([...events, newEvent]);
        }
        return newEvent;
      }
      return null;
    },
    [sessionToken, events]
  );

  return (
    <EventsContext.Provider
      value={{
        events,
        fetchEvents: fetchEventsHandler,
        removeEvent: removeEventHandler,
        addEvent: addEventHandler,
      }}
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
