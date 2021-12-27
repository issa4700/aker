import React, { useState } from "react";
import useSWR from "swr";
import { nanoid } from "nanoid";
import { fetcher } from "../lib/fetcher";

import Head from "next/head";
import Error from "../components/misc/Error";
import Layout from "../components/Layout";
import Whitelist from "../components/Whitelist";
import AddPlayer from "../components/whitelist/AddPlayer";

export default function WhitelistPage() {
  const { data: players, error } = useSWR("/api/players", fetcher);

  const isLoading = !players && !error;
  const props = {
    players,
    error,
    isLoading,
  };

  const [errors, setErrors] = useState([]);

  function handleToggle(id) {
    const updatedErrorList = errors.filter((e) => e.id !== id);
    setErrors(updatedErrorList);
  }

  function onError(e) {
    const error = { id: nanoid(5), error: e };
    setErrors([...errors, error]);
  }

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
              <AddPlayer onError={onError} />
            </div>
            <Whitelist onError={onError} props={props} />
          </div>
          <div className="w-full xl:w-1/3  flex flex-col space-y-3 p-1">
            <h2 className="text-lg font-semibold">Add player</h2>
            <AddPlayer onError={onError} />
            {errors.length > 0 &&
              errors.map((error) => {
                const { id, error: desc } = error;
                return (
                  <Error key={id} id={id} handleToggle={handleToggle}>
                    {desc}
                  </Error>
                );
              })}
          </div>
        </div>
      </Layout>
    </>
  );
}

WhitelistPage.auth = true;
