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
                " flex justify-center sm:items-center rounded-full h-12 w-12 sm:h-24 sm:w-24 bg-hpal-500 hover:bg-hpal-200 text-hpal-200 text-wrap text-xl font-extrabold hover:text-hpal-500 transition-colors"
              }
              onClick={openEventModal}
            >
              <p className="hidden sm:block">Add Event</p>
              <p className="sm:hidden text-4xl text-center">+</p>
            </button>
          </span>
        </span>
      </span>
    </div>
  );
};

export default AddEvent;
