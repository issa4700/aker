import React from "react";
import UserName from "./whitelist/UserName";

export const LinkedAccount = ({ UUID }) => {
  return (
    <div className="w-full border border-indigo-200 p-2 flex flex-row justify-between items-center">
      <div className="flex flex-col px-1 lg:px-3 ">
        <div className="font-semibold -mt-1 text-gray-700">
          <UserName UUID={UUID} />
        </div>
        <span className="text-sm text-gray-600">{UUID}</span>
      </div>
      <figure className="w-16 h-16 bg-gray-200">
        <img className="" src={`https://mc-heads.net/avatar/${UUID}`} alt="" />
      </figure>
    </div>
  );
};

export const LinkAccSkeleton = ({ animate }) => {
  const isAnimated = animate ? "animate-pulse" : "";
  return (
    <div
      className={`w-full border border-indigo-200 p-2 flex flex-row justify-between items-center ${isAnimated}`}
    >
      <div className="flex flex-col px-1 lg:px-3 space-y-2">
        <div>
          <div className="w-20 h-4 bg-gray-200" />
        </div>
        <div className="w-36 h-4 bg-gray-200" />
      </div>
      <div className="w-16 h-16 bg-gray-200" />
    </div>
  );
};
