import { useState } from "react";
import { HCourseOfAction } from "@/app/Types/hedon";
import { getEventQuestions } from "@/app/Utilities/Questions";
import QuestionCard from "../Cards/QuestionCard";

interface QuestionCarouselProps {
  onComplete: (event: {
    description: string;
    coursesOfAction: HCourseOfAction[];
  }) => void;
  onCancel: () => void;
}

const QuestionCarousel = ({ onComplete, onCancel }: QuestionCarouselProps) => {
  const [step, setStep] = useState(0);
  const [eventDescription, setEventDescription] = useState("");
  const [currentCourse, setCurrentCourse] = useState<HCourseOfAction>({
    description: "",
    intensity: 5,
    duration: 5,
    certainty: 5,
    propinquity: 5,
    fecundity: 5,
    purity: 5,
    extent: 5,
    isPublic: false,
  });
  const [coursesOfAction, setCoursesOfAction] = useState<HCourseOfAction[]>([]);

  const questions = getEventQuestions({
    eventDescription,
    currentCourse,
    setEventDescription,
    setCurrentCourse,
  });

  const handleNext = () => {
    if (step === questions.length - 1) {
      setCoursesOfAction([...coursesOfAction, { ...currentCourse }]);
      setCurrentCourse({
        description: "",
        intensity: 5,
        duration: 5,
        certainty: 5,
        propinquity: 5,
        fecundity: 5,
        purity: 5,
        extent: 5,
        isPublic: false,
      });
      setStep(1);
    } else {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    setStep(Math.max(0, step - 1));
  };

  const handleComplete = () => {
    onComplete({
      description: eventDescription,
      coursesOfAction: coursesOfAction,
    });
  };

  const canProgress = () => {
    if (step === 0) return eventDescription.trim() !== "";
    if (step === 1) return currentCourse.description.trim() !== "";
    return true;
  };

  const currentQuestion = questions[step];

  return (
    <div className="space-y-6">
      {coursesOfAction.length > 0 && (
        <div className="text-sm text-violet-600">
          {coursesOfAction.length} course
          {coursesOfAction.length !== 1 ? "s" : ""} of action added
        </div>
      )}

      <QuestionCard
        question={currentQuestion.question}
        type={currentQuestion.type}
        value={currentQuestion.value}
        onChange={currentQuestion.onChange}
      />

      <div className="flex justify-between items-center">
        <button
          onClick={handleBack}
          className="px-4 py-2 text-violet-600 hover:bg-violet-50 rounded"
          disabled={step === 0}
        >
          Back
        </button>

        <div className="text-sm text-violet-600">
          Question {step + 1} of {questions.length}
        </div>

        <div className="flex gap-2">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded"
          >
            Cancel
          </button>

          {coursesOfAction.length > 0 && step === 1 ? (
            <button
              onClick={handleComplete}
              className="px-4 py-2 bg-violet-600 text-white rounded hover:bg-violet-700"
            >
              Complete
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="px-4 py-2 bg-violet-600 text-white rounded hover:bg-violet-700"
              disabled={!canProgress()}
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuestionCarousel;
