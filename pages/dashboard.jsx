import Head from "next/head";
import Layout from "../components/Layout";
import { useSession } from "next-auth/react";

function Card({ heading, children }) {
  return (
    <div className="bg-white py-3 px-4 border border-blue-100 flex flex-col">
      <h2 className="font-thin uppercase text-sm">{heading}</h2>
      <div className="ml-auto font-semibold text-lg">{children}</div>
    </div>
  );
}

export default function AdminDashboard() {
  const { data: session } = useSession();

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.png" />
        <title>Administration Dashboard</title>
      </Head>
      <Layout>
        <h1 className="font-bold text-3xl lg:text-4xl pb-2">
          Administration Console
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 space-y-6">
          {/* Overview */}
          <section className="lg:col-span-2">
            <div>
              <h1 className="text-lg font-semibold">Overview</h1>
              <div className="grid grid-cols-1 lg:grid-cols-3 space-y-2 lg:space-y-0 lg:space-x-4 py-2">
                <Card heading="Active Players">3</Card>
                <Card heading="Pending Applications">2</Card>
                <Card heading="Acceptance Rate">100%</Card>
              </div>
            </div>
          </section>

          {/* Audit Log */}
          <aside className="lg:col-span-1 lg:pl-12">
            <div>
              <h1 className="text-lg font-semibold">Audit Log</h1>
              <p className="text-gray-500">Nothing here ... 😭</p>
            </div>
          </aside>

          {/* Recent Applications */}
          <section className="lg:col-span-3 mt-4">
            <h1 className="text-lg font-semibold">Recent Applications</h1>
            <p className="text-gray-500">Nothing here ... 😭</p>
          </section>
        </div>
      </Layout>
    </>
  );
}

AdminDashboard.auth = true;
