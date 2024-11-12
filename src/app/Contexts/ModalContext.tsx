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
  const [isClosing, setIsClosing] = useState(false);
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
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
      setModalOptions({ showConfirmButton: true });
    }, 400);
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
          <div
            className={`z-0 fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center ${
              isClosing ? "fade-out" : "fade-in"
            }`}
            onClick={closeModal}
          >
            <div
              className={`bg-hpal-500 text-hpal-100 rounded-lg mx-8
                ${isClosing ? "slide-up" : "slide-down"}
                ${modalOptions.className || ""}
                grid transition-[grid-template-rows] duration-1000 ease-in-out
              `}
              style={{
                width: modalOptions.width || "auto",
                minWidth: "320px",
                maxWidth: "90vw",
                maxHeight: "90vh",
                gridTemplateRows: "auto 1fr auto",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {modalOptions.message && (
                <div className="p-6 pb-0">
                  <h2 className="text-xl font-bold">{modalOptions.message}</h2>
                </div>
              )}

              <div className="min-h-0 p-6 overflow-auto">
                <div className="transition-all duration-300 ease-in-out">
                  {modalOptions.content}
                </div>
              </div>

              <div className="p-4 flex justify-end gap-2 border-t border-hpal-400">
                <button
                  onClick={closeModal}
                  className="font-bold px-4 py-2 text-hpal-100 hover:bg-hpal-500 hover:text-hpal-100 hover:border-hpal-100 hover:border-solid border-2 border-hpal-500 rounded"
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
