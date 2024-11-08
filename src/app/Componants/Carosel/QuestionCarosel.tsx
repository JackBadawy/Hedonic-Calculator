import { useState, useEffect, useRef } from "react";
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
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [eventDescription, setEventDescription] = useState("");
  const contentRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({
    height: "auto",
    width: "auto",
  });

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

  useEffect(() => {
    if (contentRef.current) {
      const newHeight = contentRef.current.scrollHeight;
      const newWidth = contentRef.current.scrollWidth;
      setDimensions({
        height: `${newHeight}px`,
        width: `${newWidth}px`,
      });
    }
  }, [step, currentCourse, eventDescription]);

  const handleTransition = (nextStep: number) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setStep(nextStep);
      setIsTransitioning(false);
    }, 200);
  };

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
      handleTransition(1);
    } else {
      handleTransition(step + 1);
    }
  };

  const handleBack = () => {
    handleTransition(Math.max(0, step - 1));
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
    <div className="mx-auto">
      {coursesOfAction.length > 0 && (
        <div className="text-sm text-violet-600 mb-4">
          {coursesOfAction.length} course
          {coursesOfAction.length !== 1 ? "s" : ""} of action added
        </div>
      )}

      <div
        style={{
          height: dimensions.height,
          width: dimensions.width,
          minWidth: "320px", // Set a minimum width
          maxWidth: "100%", // Prevent overflow
        }}
        className="overflow-hidden transition-[height,width] duration-200 ease-in-out mx-auto"
      >
        <div
          ref={contentRef}
          className={`transform transition-opacity duration-200 ease-in-out ${
            isTransitioning ? "opacity-0" : "opacity-100"
          }`}
        >
          <QuestionCard
            question={currentQuestion.question}
            type={currentQuestion.type}
            value={currentQuestion.value}
            onChange={currentQuestion.onChange}
          />
        </div>
      </div>

      <div className="flex justify-between items-center mt-6">
        <button
          onClick={handleBack}
          className="font-bold px-4 py-2 text-hpal-100 hover:bg-hpal-100 hover:text-hpal-500 rounded"
          disabled={step === 0 || isTransitioning}
        >
          Back
        </button>

        <div className="text-sm text-hpal-100">
          Question {step + 1} of {questions.length}
        </div>

        <div className="flex gap-2">
          {coursesOfAction.length > 0 && step === 1 ? (
            <button
              onClick={handleComplete}
              className="px-4 py-2 bg-hpal-300 text-white rounded hover:bg-hpal-400"
              disabled={isTransitioning}
            >
              Complete
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="font-bold px-4 py-2 bg-hpal-100 text-hpal-500 rounded hover:bg-hpal-500 hover:text-hpal-100 hover:border-hpal-100 hover:border-solid border-2 border-hpal-100"
              disabled={!canProgress() || isTransitioning}
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
