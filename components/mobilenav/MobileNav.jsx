import React, { Fragment } from "react";
import { MenuIcon } from "@heroicons/react/outline";
import { Popover, Transition } from "@headlessui/react";
import NavMenu from "../sidebar/NavMenu";
import NavItem from "../sidebar/NavItem";
import NavHeading from "../sidebar/NavHeading";
import { Navigation } from "../../navigation";
import Logo from "../sidebar/Logo";

export default function MobileNav() {
  return (
    <Popover className="relative md:hidden">
      <Popover.Button className="text-gray-500 hover:text-gray-600  p-2">
        <span className="sr-only">Open sidebar</span>
        <MenuIcon className="w-6 h-6 text-gray-500" />
      </Popover.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <Popover.Panel className="absolute left-0 top-10 px-5 py-4 whitespace-nowrap bg-white rounded-md border border-slate-200 shadow-lg overflow-hidden">
          <div className="flex flex-col flex-grow space-y-6 ">
            <NavMenu>
              <NavHeading>Player profile</NavHeading>
              {Navigation.player.map((item, i) => (
                <NavItem
                  key={i}
                  label={item.label}
                  icon={item.icon}
                  href={item.href}
                />
              ))}
            </NavMenu>

            <NavMenu>
              <NavHeading>Admin Console</NavHeading>
              {Navigation.admin.map((item, i) => (
                <NavItem
                  key={i}
                  label={item.label}
                  icon={item.icon}
                  href={item.href}
                />
              ))}
            </NavMenu>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}
