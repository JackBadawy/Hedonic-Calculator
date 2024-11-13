import { useState, useEffect, useRef } from "react";
import { HCourseOfAction } from "@/app/Types/hedon";
import { getEventQuestions } from "@/app/Utilities/Questions";
import QuestionCard from "../Cards/QuestionCard";
import QuestionContainer from "../QuestionComps/QuestionContainer";
import NavigationControls from "../QuestionComps/NavigationControls";
import ProgressHeader from "../QuestionComps/ProgressHeader";

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

  const [currentCourse, setCurrentCourse] = useState<HCourseOfAction>({
    description: "",
    intensity: NaN,
    duration: NaN,
    certainty: NaN,
    propinquity: NaN,
    fecundity: NaN,
    purity: NaN,
    extent: NaN,
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
        intensity: NaN,
        duration: NaN,
        certainty: NaN,
        propinquity: NaN,
        fecundity: NaN,
        purity: NaN,
        extent: NaN,
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

    const currentQuestion = courseQuestions[step];
    const value = currentCourse[currentQuestion.key as keyof HCourseOfAction];

    if (currentQuestion.type === "text") {
      return value?.toString().trim() !== "";
    }

    if (currentQuestion.type === "agreement") {
      return typeof value === "number" && !isNaN(value);
    }

    if (currentQuestion.type === "boolean") {
      return true;
    }

    return false;
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
      <ProgressHeader
        eventDescription={eventDescription}
        currentCourse={currentCourse}
        coursesOfAction={coursesOfAction}
        isEventDescriptionComplete={isEventDescriptionComplete}
        step={step}
      />

      <QuestionContainer
        dimensions={dimensions}
        isTransitioning={isTransitioning}
        contentRef={contentRef}
      >
        <QuestionCard
          question={currentQuestion.question}
          example={currentQuestion.example}
          type={currentQuestion.type}
          value={currentQuestion.value}
          onChange={currentQuestion.onChange}
        />
      </QuestionContainer>

      <NavigationControls
        step={step}
        isEventDescriptionComplete={isEventDescriptionComplete}
        isTransitioning={isTransitioning}
        coursesOfAction={coursesOfAction}
        questionCount={courseQuestions.length}
        canProgress={canProgress()}
        onBack={handleBack}
        onNext={handleNext}
        onComplete={handleComplete}
      />
    </div>
  );
};

export default QuestionCarousel;
