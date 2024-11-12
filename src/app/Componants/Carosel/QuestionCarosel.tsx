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
  const [isEventDescriptionComplete, setIsEventDescriptionComplete] =
    useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({
    height: "auto",
    width: "auto",
  });
  const [showDecisionCard, setShowDecisionCard] = useState(false);

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

  const courseQuestions = questions.slice(1);

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

  useEffect(() => {
    const timer = setTimeout(() => {
      if (contentRef.current) {
        const newHeight = contentRef.current.scrollHeight;
        const newWidth = contentRef.current.scrollWidth;
        setDimensions({
          height: `${newHeight}px`,
          width: `${newWidth}px`,
        });
      }
    }, 50);

    return () => clearTimeout(timer);
  }, [isEventDescriptionComplete]);

  const handleTransition = (nextStep: number) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setStep(nextStep);
      setIsTransitioning(false);
    }, 200);
  };

  const handleNext = () => {
    if (!isEventDescriptionComplete && eventDescription.trim() !== "") {
      setIsTransitioning(true);
      setTimeout(() => {
        setIsEventDescriptionComplete(true);
        setStep(0);
        setIsTransitioning(false);
      }, 200);
      return;
    }

    if (step === courseQuestions.length - 1) {
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
      handleTransition(0);
    } else {
      handleTransition(step + 1);
    }
  };

  const handleBack = () => {
    if (step === 0 && isEventDescriptionComplete) {
      setIsTransitioning(true);
      setTimeout(() => {
        setIsEventDescriptionComplete(false);
        setStep(0);
        setIsTransitioning(false);
      }, 200);
    } else {
      handleTransition(Math.max(0, step - 1));
    }
  };

  const canProgress = () => {
    if (!isEventDescriptionComplete) return eventDescription.trim() !== "";
    if (step === 0) return currentCourse.description.trim() !== "";
    return true;
  };

  const currentQuestion = !isEventDescriptionComplete
    ? questions[0]
    : courseQuestions[step];

  const handleComplete = () => {
    const finalEvent = {
      description: eventDescription,
      coursesOfAction: coursesOfAction,
    };
    onComplete(finalEvent);
  };

  return (
    <div className="mx-auto">
      {isEventDescriptionComplete && (
        <div className="space-y-2 mb-4">
          <div>
            <h2 className="text-xl font-semibold text-hpal-100 break-words">
              {eventDescription}
            </h2>
          </div>

          {currentCourse.description && (
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-hpal-100 rounded-full" />
              <p className="text-md text-hpal-100 break-words">
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
      )}

      <div
        style={{
          height: dimensions.height,
          width: dimensions.width,
          minWidth: "320px",
          maxWidth: "100%",
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

      <div className="flex flex-col gap-4 mt-6">
        <div className="flex justify-between items-center">
          <button
            onClick={handleBack}
            className="font-bold px-4 py-2 text-hpal-100 hover:bg-hpal-500 hover:text-hpal-100 hover:border-hpal-100 hover:border-solid border-2 border-hpal-500 rounded"
            disabled={
              (!isEventDescriptionComplete && step === 0) || isTransitioning
            }
          >
            Back
          </button>

          {isEventDescriptionComplete && (
            <div className="text-sm text-hpal-100">
              Question {step + 1} of {courseQuestions.length}
            </div>
          )}

          <button
            onClick={handleNext}
            className="font-bold px-4 py-2 bg-hpal-100 text-hpal-500 rounded hover:bg-hpal-500 hover:text-hpal-100 hover:border-hpal-100 hover:border-solid border-2 border-hpal-100"
            disabled={!canProgress() || isTransitioning}
          >
            Next
          </button>
        </div>

        {coursesOfAction.length > 0 &&
          isEventDescriptionComplete &&
          step === 0 && (
            <div className="flex justify-center">
              <button
                onClick={handleComplete}
                className="font-bold px-4 py-2 bg-hpal-300 text-white rounded hover:bg-hpal-100 hover:text-hpal-500 w-full max-w-xs"
              >
                Submit ({coursesOfAction.length} Course
                {coursesOfAction.length !== 1 ? "s" : ""})
              </button>
            </div>
          )}
      </div>
    </div>
  );
};

export default QuestionCarousel;
