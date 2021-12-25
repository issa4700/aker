import React, { useRef } from "react";
import { mutate } from "swr";

export default function AddPlayer() {
  const username = useRef("");

  async function handleAdd() {
    try {
      const addPlayer = await fetch("/api/players", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: username.current.value }),
      });

      if (!addPlayer.ok) {
        throw "Unable to add player! Check if the username is correct.";
      }

      username.current.value = "";
    } catch (e) {
      alert(e);
    } finally {
      await mutate("/api/players");
    }
  }

  return (
    <div className="flex flex-col space-y-1">
      <span className="uppercase text-xs font-semibold text-gray-600">
        Username
      </span>
      <div className="flex flex-row space-x-2">
        <input
          type="text"
          ref={username}
          className="px-2 py-1 w-full rounded-sm outline outline-1 outline-slate-200 focus:outline-blue-300"
        />
        <button
          onClick={handleAdd}
          className="bg-blue-50 px-4 py-1 text-blue-600 rounded-sm outline outline-1 outline-blue-300 hover:bg-blue-100 hover:outline-blue-600 focus:outline-blue-700"
        >
          Add
        </button>
      </div>
    </div>
  );
}
