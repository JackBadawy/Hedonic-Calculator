import { HEvent, HCourseOfAction } from "@/app/Types/hedon";
import { calculateUtility } from "@/app/Utilities/UtilityFuncs";

interface EventCardProps {
  event: HEvent;
  onRemove: () => void;
}

const EventCard: React.FC<EventCardProps> = ({ event, onRemove }) => {
  const findIdealCourse = (courses: HCourseOfAction[]): HCourseOfAction => {
    return courses.reduce((ideal, current) =>
      calculateUtility(current) > calculateUtility(ideal) ? current : ideal
    );
  };

  const idealCourse = findIdealCourse(event.coursesOfAction);

  return (
    <div className="bg-violet-200 p-4 rounded-lg shadow-md mb-4 text-violet-900 flex flex-col">
      <h3 className="text-lg font-semibold mb-2">{event.description}</h3>
      <p className="text-sm mb-1">
        Ideal Course of Action: {idealCourse.description}
      </p>
      <p className="text-sm mb-2">
        Courses of Action: {event.coursesOfAction.length}
      </p>
      <div className="flex flex-wrap gap-2">
        {event.coursesOfAction.map((course, index) => (
          <div
            key={index}
            className="mt-2 p-2 bg-violet-300 rounded flex flex-col"
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
              Overall Utility: {calculateUtility(course)}
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
          className="mt-4 px-2 py-1 bg-red-500 text-white rounded-md text-sm"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default EventCard;
