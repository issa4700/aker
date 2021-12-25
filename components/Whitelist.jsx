import React from "react";
import Players from "./whitelist/Players";

export default function Whitelist({ props }) {
  return (
    <table className="w-full divide-y divide-gray-200 shadow rounded outline-1 outline-slate-100">
      <thead className="bg-gray-100">
        <tr>
          <th
            scope="col"
            className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Player Name / UUID
          </th>
          <th
            scope="col"
            className="relative px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Actions
            <span className="sr-only">Remove player</span>
          </th>
        </tr>
      </thead>

      <tbody className="bg-white divide-y divide-gray-200">
        <Players props={props} />
      </tbody>
      <tfoot>
        <tr className="h-2">
          <td></td>
        </tr>
      </tfoot>
    </table>
  );
}
