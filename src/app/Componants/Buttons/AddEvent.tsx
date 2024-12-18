import { useModal } from "@/app/Contexts/ModalContext";
import NewEventForm from "../Modals/NewEventForm";
import { Fascinate_Inline } from "next/font/google";

const fascinateInline = Fascinate_Inline({
  subsets: ["latin"],
  weight: ["400"],
});

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
    <div className="flex">
      <span className="flex border-[4px] border-hpal-500 rounded-full p-[2px] bg-hpal-200 z-10">
        <span className="flex border-[4px] border-hpal-500 rounded-full p-[2px]">
          <span className="flex border-[4px] border-hpal-500 rounded-full p-[2px]">
            <button
              className={
                fascinateInline.className +
                " rounded-full h-24 w-24 bg-hpal-500 hover:bg-hpal-200 text-hpal-200 text-wrap text-xl font-extrabold hover:text-hpal-500 transition-colors"
              }
              onClick={openEventModal}
            >
              Add Event
            </button>
          </span>
        </span>
      </span>
    </div>
  );
};

export default AddEvent;
