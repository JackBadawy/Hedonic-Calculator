export type HCourseOfAction = {
  id?: number;
  description: string;
  intensity: number | null;
  duration: number | null;
  certainty: number | null;
  propinquity: number | null;
  fecundity: number | null;
  purity: number | null;
  extent: number | null;
  isPublic: boolean | null;
  hedonicValue?: number | null;
};

export type HEvent = {
  id?: number;
  description: string;
  coursesOfAction: HCourseOfAction[];
  idealCourse?: HCourseOfAction;
  createdBy?: string;
};
