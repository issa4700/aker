import React from "react";
import { XCircleIcon } from "@heroicons/react/outline";

export default function Error({ children, id, handleToggle }) {
  function handleClose() {
    handleToggle(id);
  }

  return (
    <div
      className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
      role="alert"
    >
      <div className="flex items-center justify-between">
        <strong className="font-bold">Error!</strong>
        <button onClick={handleClose}>
          <XCircleIcon className="h-5 w-5 transform-gpu hover:scale-110 rounded-full transition ease-in-out duration-150" />
        </button>
      </div>
      <span className="block sm:inline">{children}</span>
    </div>
  );
}
