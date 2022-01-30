import React from "react";

export const Pill = ({ type, label }) => {
  switch (type) {
    case "INFO":
      return (
        <span className="text-xs bg-blue-200 text-blue-700 py-1 px-3 rounded-full uppercase">
          {label}
        </span>
      );

    case "SUCCESS":
      return (
        <span className="text-xs bg-green-200 text-green-700 py-1 px-3 rounded-full uppercase">
          {label}
        </span>
      );

    case "ERROR":
      return (
        <span className="text-xs bg-red-200 text-red-700 py-1 px-3 rounded-full uppercase">
          {label}
        </span>
      );

    case "WARN":
      return (
        <span className="text-xs bg-yellow-200 text-yellow-700 py-1 px-3 rounded-full uppercase">
          {label}
        </span>
      );

    default:
      return (
        <span className="text-xs py-1 px-3 rounded-full uppercase">
          {label}
        </span>
      );
  }
};
