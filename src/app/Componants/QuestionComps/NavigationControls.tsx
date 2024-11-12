import { HCourseOfAction } from "@/app/Types/hedon";

interface NavigationControlsProps {
  step: number;
  isEventDescriptionComplete: boolean;
  isTransitioning: boolean;
  coursesOfAction: HCourseOfAction[];
  questionCount: number;
  canProgress: boolean;
  onBack: () => void;
  onNext: () => void;
  onComplete: () => void;
}

const NavigationControls = ({
  step,
  isEventDescriptionComplete,
  isTransitioning,
  coursesOfAction,
  questionCount,
  canProgress,
  onBack,
  onNext,
  onComplete,
}: NavigationControlsProps) => {
  const isQuestionCard = isEventDescriptionComplete && step > 0;

  return (
    <div className="flex flex-col gap-4 mt-6">
      <div className="flex justify-between items-center">
        <button
          onClick={onBack}
          className="font-bold px-4 py-2 text-hpal-100 hover:bg-hpal-500 hover:text-hpal-100 hover:border-hpal-100 hover:border-solid border-2 border-hpal-500 rounded"
          disabled={
            (!isEventDescriptionComplete && step === 0) || isTransitioning
          }
        >
          Back
        </button>

        {isQuestionCard && (
          <div className="text-sm text-hpal-100">
            Question {step} of {questionCount - 1}
          </div>
        )}

        <button
          onClick={onNext}
          className="font-bold px-4 py-2 bg-hpal-100 text-hpal-500 rounded hover:bg-hpal-500 hover:text-hpal-100 hover:border-hpal-100 hover:border-solid border-2 border-hpal-100"
          disabled={!canProgress || isTransitioning}
        >
          Next
        </button>
      </div>

      {coursesOfAction.length > 0 &&
        isEventDescriptionComplete &&
        step === 0 && (
          <div className="flex justify-center">
            <button
              onClick={onComplete}
              className="font-bold px-4 py-2 bg-hpal-300 text-white rounded hover:bg-hpal-100 hover:text-hpal-500 w-full max-w-xs"
            >
              Submit
            </button>
          </div>
        )}
    </div>
  );
};

export default NavigationControls;
