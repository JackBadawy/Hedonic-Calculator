import { useModal } from "@/app/Contexts/ModalContext";
import NewEventForm from "../Modals/NewEventForm";

const AltAddEvent: React.FC = () => {
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
      className={
        "rounded-3xl border-4 border-hpal-500 h-14 w-36 bg-hpal-500 hover:bg-hpal-200 text-hpal-200 text-wrap text-xl font-extrabold hover:text-hpal-500 transition-colors"
      }
      onClick={openEventModal}
    >
      Add Event
    </button>
  );
};

export default AltAddEvent;
