import { HCourseOfAction } from "@/app/Types/hedon";

interface ProgressHeaderProps {
  eventDescription: string;
  currentCourse: HCourseOfAction;
  coursesOfAction: HCourseOfAction[];
  isEventDescriptionComplete: boolean;
  step: number;
}

const ProgressHeader = ({
  eventDescription,
  currentCourse,
  coursesOfAction,
  isEventDescriptionComplete,
  step,
}: ProgressHeaderProps) => {
  if (!isEventDescriptionComplete) return null;

  return (
    <div className="mb-4">
      <div>
        <h2 className="text-lg font-semibold text-hpal-100 break-words">
          {eventDescription}
        </h2>
      </div>

      {currentCourse.description && step > 0 && (
        <p className="text-md text-hpal-100 ml-2 mb-1">
          {currentCourse.description}
        </p>
      )}

      {coursesOfAction.length > 0 && (
        <div className="mt-2 text-xs text-hpal-100">
          {coursesOfAction.length} course
          {coursesOfAction.length !== 1 ? "s" : ""} of action added
        </div>
      )}
    </div>
  );
};

export default ProgressHeader;
