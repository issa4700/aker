import React from "react";
import { Transition } from "@headlessui/react";
import { signOut } from "next-auth/react";
import { Transitions } from "../../lib/utils/animations";

export default function LogoutButton() {
  return (
    <button
      href="#"
      onClick={() => signOut()}
      className={`text-left w-full py-1 text-blue-600 hover:text-blue-700 font-semibold ${Transitions}`}
    >
      Logout
    </button>
  );
}
