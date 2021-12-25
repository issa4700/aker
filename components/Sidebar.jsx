import React from "react";
import Logo from "./sidebar/Logo";
import NavItem from "./sidebar/NavItem";
import NavMenu from "./sidebar/NavMenu";
import NavHeading from "./sidebar/NavHeading";
import { Navigation } from "../navigation";

export default function Sidebar() {
  return (
    <div className="hidden md:flex md:flex-shrink-0">
      <div className="flex flex-col w-72 ">
        <div className="flex flex-col flex-grow px-5 py-5 space-y-8 overflow-y-auto bg-gray-100 border-r border-gray-200">
          <div className="flex flex-col items-center flex-shrink-0 px-4">
            <Logo />
          </div>

          {/* Nav Menu */}
          <div className="flex flex-col flex-grow space-y-6">
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

          {/* Logout button */}
          <div className="flex flex-col flex-shrink-0 text-xs text-slate-400">
            <p>Aker Player Management v0.1</p>
          </div>
        </div>
      </div>
    </div>
  );
}
