export type HCourseOfAction = {
  description: string;
  intensity: number;
  duration: number;
  certainty: number;
  propinquity: number;
  fecundity: number;
  purity: number;
  extent: number;
  isPublic: boolean;
  HedonicValue?: number;
};

export type HEvent = {
  id?: number;
  description: string;
  coursesOfAction: HCourseOfAction[];
  idealCourse?: HCourseOfAction;
};
