import "../styles/globals.css";
import Router from "next/router";
import { useEffect } from "react";
import { SessionProvider, useSession } from "next-auth/react";

import { HashLoader } from "react-spinners";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      {Component.auth ? (
        <Auth requireAdmin={Component.requireAdmin}>
          <Component {...pageProps} />
        </Auth>
      ) : (
        <Component {...pageProps} />
      )}
    </SessionProvider>
  );
}

function Auth({ children, requireAdmin }) {
  const { data: session, status } = useSession();
  const isUser = !!session?.user;
  const isAdmin = !!session?.isAdmin;

  useEffect(() => {
    if (status === "loading")
      return (
        <div className="grid place-items-center h-screen">
          <HashLoader />
        </div>
      ); // Do nothing while loading
    if (!isUser) Router.push("/login"); // If not authenticated, force log in
    if (requireAdmin && !isAdmin) Router.push("/");
  }, [isUser, status]);

  if (isUser) {
    return children;
  }

  // Session is being fetched, or no user.
  // If no user, useEffect() will redirect.
  return (
    <div className="grid place-items-center h-screen">
      <HashLoader />
    </div>
  );
}
