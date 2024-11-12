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
    <div className="space-y-2 mb-4">
      <div>
        <h2 className="text-xl font-semibold text-hpal-100 break-words">
          {eventDescription}
        </h2>
      </div>

      {currentCourse.description && step > 0 && (
        <div className="flex items-center gap-2">
          <p className="text-md text-hpal-100 ml-2">
            {currentCourse.description}
          </p>
        </div>
      )}

      {coursesOfAction.length > 0 && (
        <div className="text-sm text-hpal-100">
          {coursesOfAction.length} course
          {coursesOfAction.length !== 1 ? "s" : ""} of action added
        </div>
      )}
    </div>
  );
};

export default ProgressHeader;
