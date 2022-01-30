import React from "react";
import Head from "next/head";
import Layout from "../components/Layout";
import { useSession } from "next-auth/react";

export default function Custom404() {
  return (
    <>
      <Head>
        <title>Oops!</title>
      </Head>
      <div className="grid place-items-center h-screen">
        <div className="text-gray-700">
          <h1 className="text-5xl mb-4">Error 404</h1>
          <p>Oops, looks like something went wrong! </p>
          <p className="text-gray-500">
            We couldn't find what you're looking for 😥.
          </p>
        </div>
      </div>
    </>
  );
}
