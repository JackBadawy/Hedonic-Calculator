"use client";
import { createContext, useContext, useState, ReactNode } from "react";

interface ModalOptions {
  message?: string;
  onConfirm?: (content?: string[]) => void;
  content?: React.ReactNode;
  width?: string;
  height?: string;
  className?: string;
}

export class ModalBuilder {
  private options: ModalOptions = {};
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
  const [modalOptions, setModalOptions] = useState<ModalOptions>({});

  const openModal = (options: ModalOptions) => {
    setModalOptions(options);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setModalOptions({});
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

  const modalStyle: React.CSSProperties = {
    width: modalOptions.width || "auto",
    height: modalOptions.height || "auto",
  };

  return (
    <ModalContext.Provider value={contextValue}>
      {children}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 fade-in">
          <div
            className={`bg-violet-800 p-6 rounded-lg shadow-md ${
              modalOptions.className || ""
            }`}
            style={modalStyle}
          >
            {modalOptions.message && (
              <h2 className="text-lg font-semibold mb-2">
                {modalOptions.message}
              </h2>
            )}
            {modalOptions.content}
            <div className="mt-4 flex justify-end">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-800 rounded-md mr-2"
              >
                Close
              </button>
              <button
                onClick={() => handleConfirm()}
                className="px-4 py-2 bg-blue-500 text-white rounded-md"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </ModalContext.Provider>
  );
};
