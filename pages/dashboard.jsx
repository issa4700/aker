import React, { useState } from "react";
import Head from "next/head";
import Layout from "../components/Layout";
import UserProfile from "../components/header/UserProfile";

export default function Home() {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.png" />
        <title>Dashboard</title>
      </Head>
      <Layout heading="Profile"></Layout>
    </>
  );
}
