import React from "react";
import LogIn from "../components/LogIn";
import { HashLoader } from "react-spinners";
import { useSession } from "next-auth/react";
import Router from "next/router";
import Head from "next/head";

export default function LoginPage() {
  const { data: session } = useSession();

  // Redirect user if already logged in
  if (session) {
    Router.push("/");
  }

  // Display log in page otherwise
  if (!session)
    return (
      <>
        <Head>
          <title>Portal Login</title>
        </Head>
        <LogIn />
      </>
    );

  // Display loader whilst getting session info
  return (
    <div className="grid place-items-center h-screen">
      <Head>
        <title>Loading ...</title>
      </Head>
      <HashLoader />
    </div>
  );
}
