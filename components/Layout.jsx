import React, { useState } from "react";
import Header from "./Header";
import Sidebar from "../components/Sidebar";

export default function Layout({ children, heading }) {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <Sidebar />

      {/* Content */}
      <div className="flex flex-col flex-1 w-0 overflow-hidden text-gray-700">
        <main className="relative flex-1 overflow-y-auto focus:outline-none">
          <Header heading={heading} />
          <div className="py-6">
            <div className="px-4 py-4 mx-auto max-w-screen-2xl sm:px-6 md:px-8">
              {children}
              {/* <!-- Do not cross the closing tag underneath this coment--> */}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
