import React from "react";

const UserLayout = ({ children }) => {
  return (
    <div className="relative h-screen flex overflow-hidden">
      <div className="flex flex-col sm:flex-row items-center md:items-start sm:justify-center md:justify-start flex-auto min-w-0 bg-white">
        <div className="sm:w-1/2 xl:w-3/5 h-full hidden md:flex flex-auto items-center justify-center p-10 overflow-hidden bg-purple-900 text-white bg-no-repeat bg-cover relative">
          <div className="absolute bg-gradient-to-b from-indigo-600 to-blue-500 opacity-75 inset-0 z-0">
            <img
              src={process.env.NEXT_PUBLIC_SPLASH || "/splash.jpg"}
              className="object-cover h-full w-full"
            />
          </div>
        </div>
        <div className="md:flex md:items-center md:justify-center w-full sm:w-auto md:h-full md:w-2/5 xl:w-2/5 p-8  md:p-10 lg:p-14 sm:rounded-lg md:rounded-none bg-white overflow-y-scroll">
          <div className="max-w-md w-full space-y-12 h-full flex flex-col">
            <div className="text-center">
              <img src="/aker_logo.svg" className="h-20 w-full" />
            </div>
            <div className="flex-grow grid place-items-center h-full">
              <div className="w-full space-y-8 my-4">{children}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLayout;
