import React from "react";
import useSWR from "swr";
import { fetcher } from "../lib/fetcher";
import { useSession } from "next-auth/react";

import Head from "next/head";
import Layout from "../components/Layout";
import Whitelist from "../components/Whitelist";
import AddPlayer from "../components/whitelist/AddPlayer";

export default function WhitelistPage() {
  const { data: session } = useSession();

  const { data: players, error } = useSWR("/api/players", fetcher);
  const isLoading = !players && !error;
  const props = {
    players,
    error,
    isLoading,
  };

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.png" />
        <title>Server Whitelist</title>
      </Head>
      <Layout>
        <div className="flex flex-col xl:flex-row space-y-4 xl:space-y-0 xl:space-x-4 justify-between">
          <div className="w-full xl:w-2/3 flex flex-col md:px-4 space-y-3 p-1 overflow-x-auto">
            <h1 className="text-2xl font-semibold">Whitelist</h1>
            <div className="xl:hidden">
              <AddPlayer />
            </div>
            <Whitelist props={props} />
          </div>
          <div className="w-full xl:w-1/3  flex flex-col space-y-3 p-1">
            <h2 className="text-lg font-semibold">Add player</h2>
            <AddPlayer />
          </div>
        </div>
      </Layout>
    </>
  );
}

WhitelistPage.auth = true;
