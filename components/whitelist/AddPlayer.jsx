import React, { useRef, useState } from "react";
import { mutate } from "swr";
import { useHotkeys } from "react-hotkeys-hook";

export default function AddPlayer({ onError }) {
  const username = useRef("");
  const [enabled, setEnabled] = useState(true);

  // Hotkey
  useHotkeys("alt+a", () => username.current.focus());

  // Function to handle adding players
  async function handleAdd(e) {
    e.preventDefault();
    const player = username.current.value;

    try {
      // Disable textbox and button
      setEnabled(false);

      // Check if empty
      if (!player || player == null) throw `Username cannot be empty!`;

      // Check username length
      if (player.length > 16) throw `Invalid username`;

      // Send request to API
      const addPlayer = await fetch("/api/players", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: username.current.value }),
      });

      // Check if errors were returned
      if (!addPlayer.ok) {
        throw `Unable to add ${username.current.value} to whitelist.`;
      }

      // Refresh list
      await mutate("/api/players");
    } catch (e) {
      onError(e);
    } finally {
      // Reset input fields
      username.current.value = "";
      setEnabled(true);
    }
  }

  return (
    <div className="flex flex-col space-y-2">
      <span className="uppercase text-xs font-semibold text-gray-600">
        Username
      </span>
      <form onSubmit={handleAdd} className="flex flex-row space-x-2">
        <input
          type="text"
          ref={username}
          minLength={1}
          maxLength={16}
          className="px-2 py-1 w-full rounded-sm outline outline-1 outline-slate-200 focus:outline-blue-300"
          disabled={!enabled}
        />
        <button
          type="submit"
          className="bg-blue-50 px-4 py-1 text-blue-600 rounded-sm outline outline-1 outline-blue-300 hover:bg-blue-100 hover:outline-blue-600 focus:outline-blue-700 transition ease-in-out duration-75"
          disabled={!enabled}
          aria-required={true}
        >
          {enabled ? "Add" : "Adding..."}
        </button>
      </form>
    </div>
  );
}
