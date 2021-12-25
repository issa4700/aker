import React, { Fragment } from "react";
import { UserRemoveIcon } from "@heroicons/react/outline";
import { Popover, Transition } from "@headlessui/react";
import { mutate } from "swr";

export default function DeleteUserBtn({ UUID }) {
  async function handleDelete() {
    try {
      const delPlayer = await fetch("/api/players", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ uuid: UUID }),
      });
      if (!delPlayer.ok) {
        throw "Unable to remove player!";
      }
    } catch (e) {
      alert(e);
    } finally {
      await mutate("/api/players");
    }
  }

  return (
    <Popover className="relative">
      <Popover.Button className="text-red-600 hover:text-red-700 p-2">
        <UserRemoveIcon className="h-4 w-4" />
      </Popover.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-0"
        enterFrom="opacity-0 translate-x-1"
        enterTo="opacity-100 translate-x-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-x-0"
        leaveTo="opacity-0 translate-x-1"
      >
        <Popover.Panel className="absolute right-0 top-0">
          <button
            onClick={handleDelete}
            className="bg-red-100 text-red-500 px-3 py-2 border border-red-300 rounded hover:text-red-700 hover:bg-red-200 font-semibold uppercase text-xs"
          >
            Confirm
          </button>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}
