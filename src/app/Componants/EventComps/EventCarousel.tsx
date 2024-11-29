import { HEvent } from "@/app/Types/hedon";
import TTable from "./TTable";

interface EventCaroselProps {
  event: HEvent;
}

const EventCarousel: React.FC<EventCaroselProps> = ({ event }) => {
  return (
    <div className="mt-4 flex flex-col flex-wrap gap-2 ">
      {event.coursesOfAction.map((course, index) => (
        <>
          <div className="flex justify-end">
            <button>lft</button>
            <button>rgt</button>
          </div>

          <div
            key={index}
            className="w-[508px] mt-2 h-72 p-2 bg-hpal-500 rounded flex flex-col "
          >
            <p className="font-medium">{course.description}</p>
            <TTable course={course} />
            <div className="px-2 mt-4 border-t border-hpal-400 pt-4 flex justify-between">
              <p className="text-sm font-semibold">
                {course.hedonicValue && Math.abs(course.hedonicValue)}{" "}
                {course.hedonicValue && course.hedonicValue < 0
                  ? "Dolors"
                  : "Hedons"}
              </p>
              <p className="text-sm">
                {course.isPublic ? "Public " : "Private "}Impact
              </p>
            </div>
          </div>
        </>
      ))}
    </div>
  );
};

export default EventCarousel;
