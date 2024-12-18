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
    <div className="z-10 border-4 rounded-2xl bg-hpal-200 border-hpal-500 p-px mr-1">
      <div className="border-4 border-hpal-500 p-px rounded-xl">
        <button
          className="rounded-lg px-3 py-1 transition-colors bg-hpal-500 hover:bg-hpal-200 text-xl text-hpal-200 hover:text-hpal-500 font-extrabold"
          onClick={openAboutModal}
        >
          ?
        </button>
      </div>
    </div>
  );
};

export default AboutBtn;
