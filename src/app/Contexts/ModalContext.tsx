"use client";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { createPortal } from "react-dom";

interface ModalOptions {
  message?: string;
  onConfirm?: (content?: string[]) => void;
  content?: React.ReactNode;
  width?: string;
  height?: string;
  className?: string;
  showConfirmButton: boolean;
}

export class ModalBuilder {
  private options: ModalOptions = {
    showConfirmButton: true,
  };
  private openModalFunction: ((options: ModalOptions) => void) | null = null;

  constructor(openModal: (options: ModalOptions) => void) {
    this.openModalFunction = openModal;
  }

  setMessage(message: string): ModalBuilder {
    this.options.message = message;
    return this;
  }

  setOnConfirm(onConfirm: (content?: string[]) => void): ModalBuilder {
    this.options.onConfirm = onConfirm;
    return this;
  }

  displayContent(content: React.ReactNode): ModalBuilder {
    this.options.content = content;
    return this;
  }

  setWidth(width: string): ModalBuilder {
    this.options.width = width;
    return this;
  }

  setHeight(height: string): ModalBuilder {
    this.options.height = height;
    return this;
  }

  setClassName(className: string): ModalBuilder {
    this.options.className = className;
    return this;
  }

  removeConfirmButton(): ModalBuilder {
    this.options.showConfirmButton = false;
    return this;
  }

  build(): ModalOptions {
    return this.options;
  }

  open(): void {
    if (this.openModalFunction) {
      this.openModalFunction(this.build());
    } else {
      console.error("openModal function is not set");
    }
  }
}

interface ModalContextProps {
  ModalBuilder: new () => ModalBuilder;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextProps | undefined>(undefined);

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};

export const ModalProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalOptions, setModalOptions] = useState<ModalOptions>({
    showConfirmButton: true,
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const openModal = (options: ModalOptions) => {
    setModalOptions(options);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setModalOptions({ showConfirmButton: true });
  };

  const handleConfirm = (content?: string[]) => {
    if (modalOptions.onConfirm) {
      modalOptions.onConfirm(content);
    }
    closeModal();
  };

  const contextValue: ModalContextProps = {
    ModalBuilder: class extends ModalBuilder {
      constructor() {
        super(openModal);
      }
    },
    closeModal,
  };

  const modalContent =
    isOpen && mounted
      ? createPortal(
          <div className="text-hpal-100 fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center fade-in">
            <div
              className={`bg-hpal-500 p-6 rounded-lg slide-down mx-8 ${
                modalOptions.className || ""
              }`}
              style={{ width: modalOptions.width, height: modalOptions.height }}
            >
              {modalOptions.message && (
                <h2 className="text-xl font-bold mb-4">
                  {modalOptions.message}
                </h2>
              )}
              {modalOptions.content}
              <div className="mt-4 flex justify-end">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 bg-hpal-100 text-hpal-400 rounded mr-2"
                >
                  Cancel
                </button>
                {modalOptions.showConfirmButton && (
                  <button
                    onClick={() => handleConfirm()}
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                  >
                    Confirm
                  </button>
                )}
              </div>
            </div>
          </div>,
          document.body
        )
      : null;

  return (
    <ModalContext.Provider value={contextValue}>
      {children}
      {modalContent}
    </ModalContext.Provider>
  );
};
