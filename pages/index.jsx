import Head from "next/head";
import UserLayout from "../components/UserLayout";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { LinkBtn } from "../components/LinkBtn";
import { Pill } from "../components/Pill";
import useSWR from "swr";
import { fetcher } from "../lib/fetcher";
import { ClimbingBoxLoader } from "react-spinners";
import { LinkedAccount } from "../components/LinkedAccount";

export default function Home() {
  const { data: session } = useSession();
  const { data, error } = useSWR("/api/profile", fetcher);
  const isLoading = !data && !error;

  if (isLoading)
    return (
      <>
        <Head>
          <link rel="icon" href="/favicon.png" />
          <title>Dashboard</title>
        </Head>
        <UserLayout>
          <div>
            <ClimbingBoxLoader />
          </div>
        </UserLayout>
      </>
    );

  const { isWhitelisted, application } = data;
  const UUID = session?.mcUUID;
  const isAdmin = session?.isAdmin;

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.png" />
        <title>Dashboard</title>
      </Head>
      <UserLayout>
        {/* Overview */}
        <div className="space-y-6 text-gray-800">
          <div>
            <h1 className="text-3xl font-semibold">
              Hello, {session?.user?.name}
            </h1>
            <span className="text-gray-600">Player Dashboard</span>
          </div>
        </div>

        {/* Show linked MC account */}
        <div className="space-y-1">
          <div className="flex flex-row justify-between items-center ">
            <h2 className="font-semibold capitalize text-xl text-gray-800">
              Linked account
            </h2>
            {isWhitelisted ? <Pill type="SUCCESS" label="WHITELISTED" /> : null}
          </div>

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

        {/* Server whitelist and applications */}
        <div className="space-y-1">
          <h2 className="font-semibold capitalize text-lg text-gray-800">
            Whitelist Applications
          </h2>
          <div>
            {application ? (
              <LinkedAccount UUID={UUID} />
            ) : (
              <div className="flex flex-col space-y-2 text-gray-700 w-full">
                <p>You have not started a whitelist application.</p>
                {!isWhitelisted && UUID ? (
                  <LinkBtn href="/apply" label="Start Whitelist Application" />
                ) : (
                  <p>
                    You'll need to link your Minecraft account before you start
                    an application!
                  </p>
                )}
              </div>
            )}
          </div>
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
