import _ from "lodash";
import Head from "next/head";
import UserLayout from "../components/UserLayout";
import { useSession } from "next-auth/react";
import { LinkBtn } from "../components/LinkBtn";
import { LinkedAccount } from "../components/LinkedAccount";
import LinkAccForm from "../components/LinkAccountForm";

export default function Home() {
  const { data: session } = useSession();
  const UUID = session?.mcUUID;

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.png" />
        <title>Link Minecraft Account</title>
      </Head>
      <UserLayout>
        {/* Overview */}
        <div className="space-y-6 text-gray-800">
          <div>
            <h1 className="text-3xl font-semibold">Link Account</h1>
            <span className="text-gray-600">
              You'll need to link your Minecraft account before you can start a
              whitelist application.
            </span>
          </div>
        </div>

        {/* Show linked MC account */}
        {UUID ? (
          <div className="space-y-2">
            <p className="text-gray-700">
              Looks like you already linked your Minecraft account!
            </p>

            <div className="flex flex-row justify-between items-center">
              <LinkedAccount UUID={UUID} />
            </div>
          </div>
        ) : (
          <div className="relative">
            <LinkAccForm />
          </div>
        )}

        <hr />
        <div className="flex">
          <LinkBtn href="/" label="Back to Profile" />
        </div>
      </UserLayout>
    </>
  );
}

Home.auth = true;
