import React from "react";

export default function NavMenu({ children }) {
  return (
    <nav>
      <ul className="text-sm space-y-1 md:text-base md:space-y-2">
        {children}
      </ul>
    </nav>
  );
}
