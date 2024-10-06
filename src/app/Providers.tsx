import { ReactNode } from "react";
import { EventsProvider } from "./Contexts/EventsContext";
import { ModalProvider } from "./Contexts/ModalContext";
import { AuthProvider } from "./Contexts/AuthContext";

interface ProvidersProps {
  children: ReactNode;
}

const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <AuthProvider>
      <EventsProvider>
        <ModalProvider>{children}</ModalProvider>
      </EventsProvider>
    </AuthProvider>
  );
};

export default Providers;
