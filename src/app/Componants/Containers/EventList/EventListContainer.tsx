import { ReactNode } from "react";
import { HEvent } from "@/app/Types/hedon";
import SubHeading from "./SubHeading";
import AddEvent from "../../Buttons/AddEvent";
import AddEventLoadEffect from "../../Loading/AddEventLoadEffect";
import { useEvents } from "@/app/Contexts/EventsContext";

interface EventListContainerProps {
  events: HEvent[];
  children?: ReactNode;
}

const EventListContainer: React.FC<EventListContainerProps> = ({
  events,
  children,
}) => {
  const { isUpdating } = useEvents();
  return (
    <div>
      <div className="relative flex flex-wrap gap-3">
        {isUpdating ? <AddEventLoadEffect /> : null}
        {children ||
          events.map((event, index) => (
            <div key={index} className="bg-violet-100 p-4 rounded-lg shadow">
              <h3 className="text-lg font-medium">{event.description}</h3>
              <p className="text-sm text-gray-600">
                Courses of Action: {event.coursesOfAction.length}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default EventListContainer;
