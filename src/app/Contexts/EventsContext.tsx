"use client";
import { createContext, useContext, ReactNode } from "react";
import { HEvent } from "@/app/Types/hedon";
import { useAuth } from "./AuthContext";

interface EventsContextType {
  removeEvent: (id: number) => Promise<boolean>;
  addEvent: (event: HEvent) => Promise<HEvent | null>;
}

const EventsContext = createContext<EventsContextType | undefined>(undefined);

export const EventsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { sessionToken } = useAuth();

  const removeEvent = async (id: number): Promise<boolean> => {
    try {
      const response = await fetch(`http://localhost:8080/api/events/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${sessionToken}`,
        },
      });
      return response.ok;
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
        return await response.json();
      }
      return null;
    } catch (error) {
      console.error("Error adding event:", error);
      return null;
    }
  };

  return (
    <EventsContext.Provider value={{ removeEvent, addEvent }}>
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
