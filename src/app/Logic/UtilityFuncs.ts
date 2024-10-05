import { HCourseOfAction } from "../Types/hedon";

export function calculateUtility(course: HCourseOfAction): number {
  return (
    course.intensity *
    course.duration *
    course.certainty *
    course.propinquity *
    course.fecundity *
    course.purity *
    course.extent
  );
}
