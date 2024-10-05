"use client";
import { useEvents } from "@/app/Contexts/EventsContext";
import EventListContainer from "./EventListContainer";
import EventCard from "../../Cards/EventCard";
import { useModal } from "@/app/Contexts/ModalContext";
import NewEventForm from "../../Modals/NewEventForm";

const EventListContainerClient: React.FC = () => {
  const { events, removeEvent } = useEvents();
  const { ModalBuilder } = useModal();

  const handleAddEvent = () => {
    new ModalBuilder()
      .setMessage("Add New Event")
      .displayContent(<NewEventForm />)
      .open();
  };

  return (
    <div>
      <EventListContainer events={events}>
        {events.length === 0 ? (
          <p>No events added yet.</p>
        ) : (
          events.map((event, index) => (
            <EventCard
              key={index}
              event={event}
              onRemove={() => removeEvent(index)}
            />
          ))
        )}
      </EventListContainer>
    </div>
  );
};

export default EventListContainerClient;
