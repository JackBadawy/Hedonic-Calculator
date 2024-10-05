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
};

export type HEvent = {
  description: string;
  coursesOfAction: HCourseOfAction[];
};
