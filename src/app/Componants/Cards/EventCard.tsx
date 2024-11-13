import { HEvent, HCourseOfAction } from "@/app/Types/hedon";
import { calculateUtility } from "@/app/Utilities/UtilityFuncs";

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
            <div className="flex flex-wrap w-80 gap-4">
              <p className="text-sm">Intensity: {course.intensity}</p>
              <p className="text-sm">Duration: {course.duration}</p>
              <p className="text-sm">Certainty: {course.certainty}</p>
              <p className="text-sm">Propinquity: {course.propinquity}</p>
              <p className="text-sm">Fecundity: {course.fecundity}</p>
              <p className="text-sm">Purity: {course.purity}</p>
              <p className="text-sm">Extent: {course.extent}</p>
            </div>
            <p className="text-sm font-semibold mt-2">
              Hedonic Value: {course.hedonicValue} Hedons
            </p>
            <p className="text-sm">
              Public Impact: {course.isPublic ? "Yes" : "No"}
            </p>
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
