import { HEvent } from "@/app/Types/hedon";
import TTable from "../EventComps/TTable";
import CourseCarousel from "../EventComps/CourseCarousel";

interface EventCardProps {
  event: HEvent;
  onRemove: () => void;
}

const EventCard: React.FC<EventCardProps> = ({ event, onRemove }) => {
  return (
    <div className="w-[560px] bg-hpal-400 p-4 overflow-hidden rounded-lg shadow-md mb-4 text-hpal-100 flex flex-col">
      <div className="bg-hpal-500 m-[-16px] mb-0 p-4 pb-0">
        <h3 className="text-lg font-semibold mb-2">{event.description}</h3>
        <div className="flex justify-between">
          <p className="text-sm mb-1 text-hpal-200">
            Ideal Course: {event.idealCourse && event.idealCourse.description}
          </p>
          <p className="text-sm mb-2 text-hpal-200">
            Actions: {event.coursesOfAction.length}
          </p>
        </div>
      </div>
      <CourseCarousel event={event} />
      <div>
        <button
          onClick={onRemove}
          className="font-bold mt-4 px-2 py-1 bg-hpal-300 hover:bg-hpal-100 text-hpal-100 hover:text-hpal-500 rounded-md text-sm transition-colors"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default EventCard;
