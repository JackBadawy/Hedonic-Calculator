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
import EventListFallback from "../Componants/Containers/EventList/EventListFallback";
import SubHeading from "../Componants/Containers/EventList/SubHeading";

export default function Main() {
  const { events, removeEvent, fetchEvents, eventsLoading } = useEvents();
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

  return (
    <div className="bg-hpal-200 min-h-screen">
      <HNav />

      <IdleTimer />
      <div className="p-4 overflow-hidden">
        <div></div>
        <div className="relative mb-5">
          <div className="grid grid-cols-3 auto-rows-fr justify-center items-center">
            <div className="relative bg-hpal-200">
              <SubHeading txt="Events" />
            </div>
            <div className="flex z-10 place-items-center">
              <AddEvent />
            </div>
            <div className="z-10 justify-self-end">
              <AboutBtn />
            </div>
          </div>
          <hr className="overflow-hidden absolute -ml-8 top-[50%] w-[200%] h-[6px] -translate-y-1/2 bg-hpal-500 border-none z-0" />
        </div>
        {eventsLoading ? (
          <EventListFallback />
        ) : (
          <EventListContainerClient
            events={events}
            onRemoveEvent={handleRemoveEvent}
          />
        )}
      </div>
    </div>
  );
}
