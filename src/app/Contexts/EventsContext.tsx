"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import { HEvent, HCourseOfAction } from "../Types/hedon";

interface EventsContextType {
  events: HEvent[];
  addEvent: (event: HEvent) => void;
  removeEvent: (index: number) => void;
  addCourseOfAction: (eventIndex: number, course: HCourseOfAction) => void;
}

const EventsContext = createContext<EventsContextType | undefined>(undefined);

export const useEvents = () => {
  const context = useContext(EventsContext);
  if (!context) {
    throw new Error("useEvents must be used within an EventsProvider");
  }
  return context;
};

export const EventsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [events, setEvents] = useState<HEvent[]>([]);

  const addEvent = (event: HEvent) => {
    setEvents((prevEvents) => [...prevEvents, event]);
  };

  const removeEvent = (index: number) => {
    setEvents((prevEvents) => prevEvents.filter((_, i) => i !== index));
  };

  const addCourseOfAction = (eventIndex: number, course: HCourseOfAction) => {
    setEvents((prevEvents) => {
      const newEvents = [...prevEvents];
      if (newEvents[eventIndex]) {
        newEvents[eventIndex].coursesOfAction.push(course);
      }
      return newEvents;
    });
  };

  const contextValue: EventsContextType = {
    events,
    addEvent,
    removeEvent,
    addCourseOfAction,
  };

  return (
    <EventsContext.Provider value={contextValue}>
      {children}
    </EventsContext.Provider>
  );
};
