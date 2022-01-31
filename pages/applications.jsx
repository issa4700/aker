import Head from "next/head";
import Layout from "../components/Layout";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.png" />
        <title>Whitelist Applications</title>
      </Head>
      <Layout>
        <div className="grid grid-cols-1 lg:grid-cols-3 space-y-6 lg:space-y-0">
          <section className="lg:col-span-2">
            <div>
              <h1 className="font-bold text-4xl">Applications</h1>
              <p>Nothing here ... 😭</p>
            </div>
          </section>
          <aside>
            <div>
              <h1 className="text-lg font-semibold">Recent Activity</h1>
              <p>Nothing here ... 😭</p>
            </div>
          </aside>
        </div>
      </Layout>
    </>
  );
}

Home.auth = true;
