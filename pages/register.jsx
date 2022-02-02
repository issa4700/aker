import Head from "next/head";
import UserLayout from "../components/UserLayout";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { LinkBtn } from "../components/LinkBtn";
import { LinkedAccount } from "../components/LinkedAccount";

export default function Home() {
  const { data: session } = useSession();

  const UUID = session?.mcUUID;
  const isAdmin = session?.isAdmin;

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.png" />
        <title>Link Accounts</title>
      </Head>
      <UserLayout>
        {/* Overview */}
        <div className="space-y-6 text-gray-800">
          <div>
            <h1 className="text-3xl font-semibold">Link Account</h1>
            <span className="text-gray-600">Link your Minecraft account</span>
          </div>
        </div>

        {/* Show linked MC account */}
        {UUID ? (
          <div className="space-y-2">
            <p className="text-gray-700">
              Looks like you already linked your Minecraft account!
            </p>

            <div className="flex flex-row justify-between items-center">
              {UUID ? (
                <LinkedAccount UUID={UUID} />
              ) : (
                <div className="flex flex-col space-y-2 text-gray-700 w-full">
                  <p>No Minecraft account linked!</p>
                  <LinkBtn href="/link-account" label="Link Account" />
                </div>
              )}
            </div>
          </div>
        ) : (
          <div>Form to link Minecraft Account here...</div>
        )}

        <div className="flex">
          <LinkBtn href="/" label="Back to Profile" />
        </div>

        <hr />

        <div className="flex flex-col space-y-2">
          {/* Show Admin btn if admin */}
          {isAdmin && (
            <LinkBtn href="/dashboard" label="Administration Console" />
          )}

          <button
            className="bg-blue-50 py-3 px-4 w-full hover:bg-blue-100 text-blue-600"
            onClick={() => signOut()}
          >
            Log Out
          </button>
        </div>
      </UserLayout>
    </>
  );
}

Home.auth = true;
