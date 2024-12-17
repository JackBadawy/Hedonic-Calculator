import { useModal } from "@/app/Contexts/ModalContext";
import AboutHcalc from "../Modals/AboutHcalc";

const AboutBtn = () => {
  const { ModalBuilder } = useModal();

  const openAboutModal = () => {
    new ModalBuilder()
      .setMessage("About the Hedonic Calculator")
      .displayContent(<AboutHcalc />)
      .removeConfirmButton()
      .open();
  };
  return (
    <div className="flex justify-center self-center justify-self-center">
      <div className="bg-hpal-500 p-1 rounded-lg ">
        <button
          className="rounded-md px-3 transition-colors bg-hpal-400 hover:bg-hpal-300 p-2 text-hpal-200 hover:text-hpal-100 font-bold"
          onClick={openAboutModal}
        >
          ?
        </button>
      </div>
    </div>
  );
};

export default AboutBtn;
