import { useState } from "react";
import { HCourseOfAction } from "@/app/Types/hedon";

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

  const questions = [
    {
      title: "What's the situation or event you're evaluating?",
      component: (
        <div className="space-y-2">
          <input
            type="text"
            value={eventDescription}
            onChange={(e) => setEventDescription(e.target.value)}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-violet-500"
            placeholder="Describe the event..."
          />
        </div>
      ),
    },
    {
      title: "What's one possible course of action?",
      component: (
        <div className="space-y-2">
          <input
            type="text"
            value={currentCourse.description}
            onChange={(e) =>
              setCurrentCourse({
                ...currentCourse,
                description: e.target.value,
              })
            }
            className="w-full p-2 border rounded focus:ring-2 focus:ring-violet-500"
            placeholder="Describe this course of action..."
          />
        </div>
      ),
    },
    {
      title: "Rate the characteristics of this action",
      component: (
        <div className="space-y-4">
          {[
            { label: "Intensity", key: "intensity" },
            { label: "Duration", key: "duration" },
            { label: "Certainty", key: "certainty" },
            { label: "Propinquity", key: "propinquity" },
            { label: "Fecundity", key: "fecundity" },
            { label: "Purity", key: "purity" },
            { label: "Extent", key: "extent" },
          ].map(({ label, key }) => (
            <div key={key} className="flex items-center gap-4">
              <label className="w-24 text-sm">{label}</label>
              <input
                type="range"
                min="1"
                max="10"
                value={currentCourse[key as keyof HCourseOfAction] as number}
                onChange={(e) =>
                  setCurrentCourse({
                    ...currentCourse,
                    [key]: parseInt(e.target.value),
                  })
                }
                className="flex-1"
              />
              <span className="w-8 text-center">
                {currentCourse[key as keyof HCourseOfAction]}
              </span>
            </div>
          ))}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={currentCourse.isPublic}
              onChange={(e) =>
                setCurrentCourse({
                  ...currentCourse,
                  isPublic: e.target.checked,
                })
              }
              className="rounded"
            />
            <label>Is this action public?</label>
          </div>
        </div>
      ),
    },
  ];

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

  return (
    <div className="space-y-6">
      <div className="text-sm text-violet-600">
        {coursesOfAction.length} courses of action added
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-violet-900">
          {questions[step].title}
        </h3>
        {questions[step].component}
      </div>

      <div className="flex justify-between items-center">
        <button
          onClick={handleBack}
          className="px-4 py-2 text-violet-600 hover:bg-violet-50 rounded"
          disabled={step === 0}
        >
          Back
        </button>
        <div className="flex gap-2">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded"
          >
            Cancel
          </button>
          {coursesOfAction.length > 0 ? (
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
              disabled={
                (step === 0 && !eventDescription) ||
                (step === 1 && !currentCourse.description)
              }
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
