type hEvent = {
  eventDescription: string;
  coursesOfAction: hCourse[];
};

type hCourse = {
  intensity: number;
  duration: number;
  certainty: number;
  propinquity: number;
  fecundity: number;
  purity: number;
  extent: number;
};
