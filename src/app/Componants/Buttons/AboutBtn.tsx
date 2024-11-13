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
    <div className="flex justify-center">
      <button
        className="transition-colors bg-hpal-500 hover:bg-hpal-400 p-2 rounded text-hpal-200 hover:text-hpal-100 font-bold"
        onClick={openAboutModal}
      >
        About
      </button>
    </div>
  );
};

export default AboutBtn;
