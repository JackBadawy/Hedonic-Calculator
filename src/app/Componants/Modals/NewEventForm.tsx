import { useEvents } from "@/app/Contexts/EventsContext";
import QuestionCarousel from "../Carosel/QuestionCarosel";
import { useModal } from "@/app/Contexts/ModalContext";
import { HCourseOfAction } from "@/app/Types/hedon";

const NewEventForm: React.FC = () => {
  const { addEvent } = useEvents();
  const { closeModal } = useModal();

  const handleComplete = (event: {
    description: string;
    coursesOfAction: HCourseOfAction[];
  }) => {
    addEvent(event);
    closeModal();
  };

  return <QuestionCarousel onComplete={handleComplete} onCancel={closeModal} />;
};

export default NewEventForm;
