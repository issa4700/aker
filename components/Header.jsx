import React, { useState } from "react";
import UserProfile from "./header/UserProfile";
import MobileNav from "./mobilenav/MobileNav";
import Logo from "./sidebar/Logo";

function Header({ heading }) {
  return (
    <header className="sticky top-0 border-b px-4 bg-white border-gray-200 z-30">
      <div className="">
        <div className="flex items-center justify-between h-16 -mb-px">
          {/* Header: Left side */}
          <div className="flex items-center space-x-2">
            <MobileNav />
            <figure className="md:hidden">
              <img className="h-9" src="/aker_logo.svg" alt="Aker Logo" />
            </figure>
          </div>

          {/* Header: Right side */}
          <div className="flex items-center">
            {/*  Divider */}

            {/* <hr className="w-px h-6 bg-gray-200 mx-3" /> */}
            <UserProfile />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
