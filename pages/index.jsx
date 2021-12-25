import Head from "next/head";
import Layout from "../components/Layout";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.png" />
        <title>Dashboard</title>
      </Head>
      <Layout>
        <p className="italic text-gray-600">
          {"{{ "}Content goes here{" }}"}
        </p>
      </Layout>
    </>
  );
}

Home.auth = true;
