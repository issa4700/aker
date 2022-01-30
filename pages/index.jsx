import Head from "next/head";
import UserLayout from "../components/UserLayout";
import { useSession } from "next-auth/react";
import UserName from "../components/whitelist/UserName";
import { signOut } from "next-auth/react";
import { LinkBtn } from "../components/LinkBtn";
import { Pill } from "../components/Pill";
import useSWR from "swr";
import { fetcher } from "../lib/fetcher";
import { ClimbingBoxLoader } from "react-spinners";

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
            {isWhitelisted ? (
              <Pill type="SUCCESS" label="WHITELISTED" />
            ) : (
              <Pill type="ERROR" label="NOT WHITELISTED" />
            )}
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
                <p>You do not have any whitelist applications at the moment.</p>
                {!isWhitelisted && (
                  <LinkBtn href="/apply" label="Start Whitelist Application" />
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

function LinkedAccount({ UUID }) {
  return (
    <div className="w-full border border-indigo-200 p-2 flex flex-row justify-between items-center">
      <div className="flex flex-col px-1 lg:px-3 ">
        <div className="font-semibold -mt-1 text-gray-700">
          <UserName UUID={UUID} />
        </div>
        <span className="text-sm text-gray-600">{UUID}</span>
      </div>
      <figure className="w-16 h-16 bg-gray-200">
        <img className="" src={`https://mc-heads.net/avatar/${UUID}`} alt="" />
      </figure>
    </div>
  );
}

Home.auth = true;
