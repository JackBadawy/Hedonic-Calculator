import { HEvent } from "@/app/Types/hedon";
import TTable from "../EventComps/TTable";

interface EventCardProps {
  event: HEvent;
  onRemove: () => void;
}

const EventCard: React.FC<EventCardProps> = ({ event, onRemove }) => {
  return (
    <div className="bg-hpal-400 p-4 rounded-lg shadow-md mb-4 text-hpal-200 flex flex-col">
      <h3 className="text-lg font-semibold mb-2">{event.description}</h3>
      <p className="text-sm mb-1">
        Ideal Course of Action:{" "}
        {event.idealCourse && event.idealCourse.description}
      </p>
      <p className="text-sm mb-2">
        Courses of Action: {event.coursesOfAction.length}
      </p>
      <div className="flex flex-wrap gap-2 text-hpal-200">
        {event.coursesOfAction.map((course, index) => (
          <div
            key={index}
            className="mt-2 p-2 bg-hpal-500 rounded flex flex-col"
          >
            <p className="font-medium">{course.description}</p>
            <TTable course={course} />
            <div className="mt-4 border-t border-hpal-300 pt-4">
              <p className="text-sm font-semibold">
                Hedonic Value: {course.hedonicValue} Hedons
              </p>
              <p className="text-sm">
                Public Impact: {course.isPublic ? "Yes" : "No"}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div>
        <button
          onClick={onRemove}
          className="font-bold mt-4 px-2 py-1 bg-hpal-300 hover:bg-hpal-100 text-hpal-200 hover:text-hpal-500 rounded-md text-sm transition-colors"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default EventCard;
