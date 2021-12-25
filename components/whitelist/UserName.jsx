import React from "react";
import useSWR from "swr";
import { fetcher } from "../../lib/fetcher";

export default function UserName({ UUID }) {
  const { data: playerProfile, error } = useSWR(
    () => `https://mc-heads.net/minecraft/profile/${UUID}`,
    fetcher
  );
  const isLoading = !playerProfile && !error;

  if (isLoading) return <span className="h-8 w-12 "></span>;
  if (error)
    return <span className="text-red-600">Unable to resolve username!</span>;

  return <span>{playerProfile.name}</span>;
}
