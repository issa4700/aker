import React, { Fragment } from "react";
import { useSession } from "next-auth/react";
import { Popover, Transition } from "@headlessui/react";
import LogoutButton from "./LogoutButton";
import { ChevronDownIcon } from "@heroicons/react/outline";

export default function UserProfile() {
  const { data: session } = useSession();

  return (
    <>
      {session && (
        <Popover className="relative">
          <Popover.Button className="flex items-center space-x-2  p-1 md:pr-2 rounded-full text-gray-400">
            <img
              className="h-8 w-8 rounded-full bg-gray-200"
              src={session?.user?.image}
              alt={`${session?.user?.name}'s profile photo`}
            />
            <span className="hidden md:block text-gray-600 text-sm">
              {session?.user?.name}
            </span>
            <ChevronDownIcon className="hidden md:block h-4 w-4" />
          </Popover.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Popover.Panel className="absolute right-0 top-11 w-44 overflow-hidden bg-white border border-slate-200 shadow-lg rounded-md">
              <div className="flex flex-col px-4 py-3 text-gray-700 text-left text-sm space-y-2">
                <div className="flex flex-col">
                  <span className="font-semibold">{session?.user?.name}</span>
                  <span className="text-xs text-gray-600 italic">
                    Moderator
                  </span>
                </div>
                <hr className="w-full" />
                <LogoutButton />
              </div>
            </Popover.Panel>
          </Transition>
        </Popover>
      )}
    </>
  );
}
