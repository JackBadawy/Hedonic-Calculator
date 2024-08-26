"use client";
import { useModal } from "@/app/Contexts/ModalContext";
import React from "react";

const AddEvent = () => {
  const { openModal, closeModal } = useModal();

  const openEventModal = () => {
    openModal("test");
  };
  return (
    <button
      className="rounded m-2 px-2 py-1 bg-violet-950 text-violet-400"
      onClick={openEventModal}
    >
      AddEvent
    </button>
  );
};

export default AddEvent;
