import React, { Children } from "react";

export default function NavHeading({ children }) {
  return (
    <div className="text-xs md:text-sm uppercase text-gray-500 w-full">
      {children}
    </div>
  );
}
