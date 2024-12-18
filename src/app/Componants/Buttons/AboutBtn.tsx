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
    <div className="h-32 w-32 flex items-center justify-center">
      <div className="z-10 border-4 rounded-2xl bg-hpal-200 border-hpal-500 p-px mr-8">
        <div className="border-4 border-hpal-500 p-px rounded-xl flex items-center justify-center">
          <button
            className="rounded-lg px-3 py-1 hover:px-6 hover:py-4 transition-all bg-hpal-500 hover:bg-hpal-200 text-xl hover:text-3xl text-hpal-200 hover:text-hpal-500 font-extrabold"
            onClick={openAboutModal}
          >
            ?
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutBtn;
