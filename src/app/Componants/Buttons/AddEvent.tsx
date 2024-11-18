import { useModal } from "@/app/Contexts/ModalContext";
import NewEventForm from "../Modals/NewEventForm";

const AddEvent: React.FC = () => {
  const { ModalBuilder } = useModal();

  const openEventModal = () => {
    new ModalBuilder()
      .setMessage("Add New Event")
      .displayContent(<NewEventForm />)
      .removeConfirmButton()
      .open();
  };

  return (
    <button
      className="rounded px-2 py-1 bg-hpal-500 hover:bg-hpal-400 text-hpal-200 font-bold hover:text-hpal-100 transition-colors"
      onClick={openEventModal}
    >
      Add Event
    </button>
  );
};

export default AddEvent;
