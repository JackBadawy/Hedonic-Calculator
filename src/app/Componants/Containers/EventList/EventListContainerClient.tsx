import { HEvent } from "@/app/Types/hedon";
import EventListContainer from "./EventListContainer";
import EventListFallback from "./EventListFallback";
import EventCard from "../../Cards/EventCard";
import { useAuth } from "@/app/Contexts/AuthContext";

interface EventListContainerClientProps {
  events: HEvent[];
  onRemoveEvent: (id: number) => Promise<void>;
}

const EventListContainerClient: React.FC<EventListContainerClientProps> = ({
  events,
  onRemoveEvent,
}) => {
  const { sessionToken, loading } = useAuth();

  return (
    <>
      {loading ? (
        <EventListFallback />
      ) : (
        <EventListContainer events={events}>
          {events.length === 0 ? (
            <p className="text-hpal-500">No events added yet.</p>
          ) : (
            events.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onRemove={() => event.id && onRemoveEvent(event.id)}
              />
            ))
          )}
        </EventListContainer>
      )}
    </>
  );
};

export default EventListContainerClient;
