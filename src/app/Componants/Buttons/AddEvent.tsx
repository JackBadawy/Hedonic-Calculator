"use client";
import { useModal } from "@/app/Contexts/ModalContext";
import React from "react";
import NewEventForm from "../Modals/NewEventForm";

const AddEvent = () => {
  const { ModalBuilder } = useModal();

  const openEventModal = () => {
    new ModalBuilder()
      .setMessage("Add New Event")
      .displayContent(<NewEventForm />)
      .setOnConfirm(() => {
        console.log("Event added");
      })
      .open();
  };

  return (
    <button
      className="rounded m-2 px-2 py-1 bg-violet-950 text-violet-400"
      onClick={openEventModal}
    >
      Add Event
    </button>
  );
};

export default AddEvent;
