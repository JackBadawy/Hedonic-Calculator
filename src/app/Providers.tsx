import { ReactNode } from "react";
import { EventsProvider } from "./Contexts/EventsContext";
import { ModalProvider } from "./Contexts/ModalContext";

interface ProvidersProps {
  children: ReactNode;
}

const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <EventsProvider>
      <ModalProvider>{children}</ModalProvider>
    </EventsProvider>
  );
};

export default Providers;
