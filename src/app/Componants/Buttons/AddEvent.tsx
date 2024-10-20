import { useModal } from "@/app/Contexts/ModalContext";
import NewEventForm from "../Modals/NewEventForm";
import { HEvent } from "@/app/Types/hedon";

interface AddEventProps {
  onAddEvent: (event: HEvent) => Promise<void>;
}

const AddEvent: React.FC<AddEventProps> = ({ onAddEvent }) => {
  const { ModalBuilder } = useModal();

  const openEventModal = () => {
    new ModalBuilder()
      .setMessage("Add New Event")
      .displayContent(<NewEventForm onSubmit={onAddEvent} />)
      .removeConfirmButton()
      .open();
  };

  return (
    <button
      className="rounded m-2 px-2 py-1 bg-violet-950 text-violet-400"
      onClick={openEventModal}
    >
      Add Event
    </button>
  );
};

export default AddEvent;
