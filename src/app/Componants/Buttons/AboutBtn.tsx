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
      <button className="bg-hpal-400" onClick={openAboutModal}>
        AboutBtn
      </button>
    </div>
  );
};

export default AboutBtn;
