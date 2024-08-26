import AddEvent from "./Componants/Buttons/AddEvent";
import { ModalProvider } from "./Contexts/ModalContext";

export default function Home() {
  return (
    <ModalProvider>
      <div className="bg-violet-100 min-h-screen">
        <AddEvent />
      </div>
    </ModalProvider>
  );
}
