import React from "react";
import { signIn } from "next-auth/react";
import UserLayout from "./UserLayout";

export default function LogIn({ error }) {
  return (
    <UserLayout>
      <div className="">
        <h1 className="text-4xl font-semibold">Login</h1>
        <p className="text-gray-600 mb-4">to access the player portal.</p>
        <button
          className="bg-blue-50 py-3 px-4 w-full hover:bg-blue-100 text-blue-600"
          onClick={() => signIn("discord")}
        >
          Log In
        </button>
      </div>
      <div className="flex flex-col items-start space-y-2">
        <h2 className="text-gray-800 text-lg">New player?</h2>
        <p className="text-gray-500 font-normal">
          Please use the button above if you are a new player and want to apply
          for the whitelist. You'll be automatically redirected to the
          application page once your account is setup.
        </p>
        <button
          className="bg-gray-100 py-3 px-4 w-full hover:bg-gray-200 text-gray-600 text-center"
          onClick={() => signIn("discord", { callbackUrl: `/register` })}
        >
          Register
        </button>
      </div>
    </UserLayout>
  );
}
