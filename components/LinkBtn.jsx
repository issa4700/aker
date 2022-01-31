import React from "react";
import Link from "next/link";

export const LinkBtn = ({ href, label }) => {
  return (
    <Link href={href}>
      <a className="bg-gray-100 py-3 px-4 w-full hover:bg-gray-200 text-gray-600 text-center">
        {label}
      </a>
    </Link>
  );
};
