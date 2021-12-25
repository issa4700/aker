import React from "react";
import Dynamic from "next/dynamic";
import Link from "next/link";
import { Transitions } from "../../lib/utils/animations";

export default function NavItem({ icon, href, label }) {
  const Icon = Dynamic(() =>
    import("@heroicons/react/outline").then((mod) => mod[icon])
  );

  return (
    <li>
      <Link href={href}>
        <a
          className={`flex flex-row items-center text-gray-700 hover:bg-gray-200 p-2 md:p-3 rounded-md capitalize ${Transitions}`}
        >
          <Icon className="h-6 w-6" />
          <span className="ml-4"> {label}</span>
        </a>
      </Link>
    </li>
  );
}
