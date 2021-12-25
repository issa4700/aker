import React from "react";

export default function Logo() {
  return (
    <a href="/" className="text-left focus:outline-none">
      <h2
        className="block
                    p-2
                    text-xl
                    font-medium
                    tracking-tighter
                    text-gray-900
                    transition
                    duration-500
                    ease-in-out
                    transform
                    cursor-pointer
                    hover:text-gray-900"
      >
        <img className="h-16" src="/aker_logo.svg" alt="Aker Logo" />
      </h2>
    </a>
  );
}
