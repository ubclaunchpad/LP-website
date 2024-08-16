"use client";
import { useState } from "react";
import Input from "../general/input";

export default function NewRoundModal() {
  const [isOpen, setIsOpen] = useState(false);

  if (!isOpen) {
    return <button onClick={() => setIsOpen(true)}>New Round</button>;
  }

  return (
    <div className="flex flex-col items-center justify-center fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 z-50">
      <div className="bg-neutral-900 border border-neutral-800 rounded-lg w-full max-w-lg min-h-[200px]">
        <section className="flex p-4 justify-between border-b border-b-neutral-800">
          <h2>New Form</h2>
          <button onClick={() => setIsOpen(false)}>Close</button>
        </section>
        <section className="flex flex-col p-4 gap-2 justify-between">
          <NewRoundForm />
        </section>
      </div>
    </div>
  );
}

function NewRoundForm() {
  return (
    <form className="flex flex-col gap-2">
      <label className="flex flex-col py-2 gap-2">
        <span>Name</span>
        <Input type="text" />
      </label>
      <label className="flex flex-col py-2 gap-2">
        <span>Start Date</span>
        <Input type="date" />
      </label>
      <label className="flex flex-col py-2 gap-2">
        <span>End Date</span>
        <Input type="time" />
      </label>

      <label className="flex flex-col py-2 gap-2">
        <span>Target</span>
        <Input type="time" />
      </label>
      <div className="flex items-center pt-4 pb-2">
        <button
          disabled
          className="w-full bg-white text-black rounded text-lg px-4 p-2 disabled:opacity-50"
          type="submit"
        >
          Create
        </button>
      </div>
    </form>
  );
}
