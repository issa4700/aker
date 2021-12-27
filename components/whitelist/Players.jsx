import React from "react";
import useSWR from "swr";
import { fetcher } from "../../lib/fetcher";
import ScaleLoader from "react-spinners/ScaleLoader";
import UserName from "./UserName";
import DeleteUserBtn from "./DeleteUserBtn";

export default function Players({ props }) {
  // const { players, error, isLoading } = props;
  const { data: players, error } = useSWR("/api/players", fetcher);
  const isLoading = !players && !error;

  if (isLoading)
    return (
      <tr>
        <td colSpan={2} className="text-center text-gray-700 px-4 py-3">
          <ScaleLoader size={16} />
        </td>
      </tr>
    );

  if (error)
    return (
      <tr>
        <td colSpan={2} className="text-center text-gray-700 px-4 py-3">
          Error loading players!
        </td>
      </tr>
    );

  if (!players?.length > 0)
    return (
      <tr>
        <td className="px-4 py-3 text-center" colSpan={2}>
          No players in whitelist 😢
        </td>
      </tr>
    );

  return (
    <>
      {players.map((player) => (
        <tr key={player}>
          <td className="whitespace-nowrap">
            <div className="px-4 py-3 flex items-center">
              <div className="flex-shrink-0 h-10 w-10">
                <img
                  className="h-10 w-10 rounded"
                  src={`https://mc-heads.net/avatar/${player}`}
                  alt=""
                />
              </div>
              <div className="ml-4  ">
                <div className="text-sm font-medium text-gray-900">
                  <UserName UUID={player} />
                </div>
                <div className="hidden lg:block text-sm text-gray-500">
                  {player}
                </div>
                <div className="text-sm lg:hidden text-gray-500">
                  ####{player.slice(-8)}
                </div>
              </div>
            </div>
          </td>

          <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
            <DeleteUserBtn UUID={player} />
          </td>
        </tr>
      ))}
    </>
  );
}
