import { ReactNode } from "react";
import { HEvent } from "@/app/Types/hedon";

interface EventListContainerProps {
  events: HEvent[];
  children?: ReactNode;
}

const EventListContainer: React.FC<EventListContainerProps> = ({
  events,
  children,
}) => {
  return (
    <div className="mt-4">
      <h2 className="text-2xl font-bold mb-4 text-hpal-500 underline">
        Events:
      </h2>
      {events.length === 0 ? (
        <p className="text-hpal-500">No events added yet.</p>
      ) : (
        <div className="flex flex-wrap gap-3">
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
      )}
    </div>
  );
};

export default EventListContainer;
