import { HCourseOfAction } from "@/app/Types/hedon";

interface QuestionConfig {
  eventDescription: string;
  currentCourse: HCourseOfAction;
  setEventDescription: (value: string) => void;
  setCurrentCourse: (course: HCourseOfAction) => void;
}

export const getEventQuestions = ({
  eventDescription,
  currentCourse,
  setEventDescription,
  setCurrentCourse,
}: QuestionConfig) => [
  {
    key: "eventDescription",
    question: "What situation are you trying to evaluate?",
    example: "eg: 'I am considering buying a car'",
    type: "text" as const,
    value: eventDescription,
    onChange: setEventDescription,
  },
  {
    key: "courseDescription",
    question: "What is a possible course of action you could take?",
    example: "eg: 'I could not buy a car'",
    type: "text" as const,
    value: currentCourse.description,
    onChange: (value: string) =>
      setCurrentCourse({ ...currentCourse, description: value }),
  },
  {
    key: "intensity",
    question: "This action would bring intense pleasure or satisfaction",
    type: "agreement" as const,
    value: currentCourse.intensity,
    onChange: (value: number) =>
      setCurrentCourse({ ...currentCourse, intensity: value }),
  },
  {
    key: "duration",
    question: "The effects of this action would last for a long time",
    type: "agreement" as const,
    value: currentCourse.duration,
    onChange: (value: number) =>
      setCurrentCourse({ ...currentCourse, duration: value }),
  },
  {
    key: "certainty",
    question: "I am certain this action would have the intended effect",
    type: "agreement" as const,
    value: currentCourse.certainty,
    onChange: (value: number) =>
      setCurrentCourse({ ...currentCourse, certainty: value }),
  },
  {
    key: "propinquity",
    question: "The benefits of this action would be felt immediately",
    type: "agreement" as const,
    value: currentCourse.propinquity,
    onChange: (value: number) =>
      setCurrentCourse({ ...currentCourse, propinquity: value }),
  },
  {
    key: "fecundity",
    question:
      "This action would likely lead to more positive outcomes in the future",
    type: "agreement" as const,
    value: currentCourse.fecundity,
    onChange: (value: number) =>
      setCurrentCourse({ ...currentCourse, fecundity: value }),
  },
  {
    key: "purity",
    question: "This action is unlikely to cause any negative effects",
    type: "agreement" as const,
    value: currentCourse.purity,
    onChange: (value: number) =>
      setCurrentCourse({ ...currentCourse, purity: value }),
  },
  {
    key: "extent",
    question: "This action would benefit many people",
    type: "agreement" as const,
    value: currentCourse.extent,
    onChange: (value: number) =>
      setCurrentCourse({ ...currentCourse, extent: value }),
  },
  {
    key: "isPublic",
    question: "Would this action be visible to others?",
    type: "boolean" as const,
    value: currentCourse.isPublic,
    onChange: (value: boolean) =>
      setCurrentCourse({ ...currentCourse, isPublic: value }),
  },
];
