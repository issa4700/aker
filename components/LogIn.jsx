import React from "react";
import Head from "next/head";
import { signIn } from "next-auth/react";

export default function LogIn({ error }) {
  return (
    <div className="relative min-h-screen flex ">
      <div className="flex flex-col sm:flex-row items-center md:items-start sm:justify-center md:justify-start flex-auto min-w-0 bg-white">
        <div className="sm:w-1/2 xl:w-3/5 h-full hidden md:flex flex-auto items-center justify-center p-10 overflow-hidden bg-purple-900 text-white bg-no-repeat bg-cover relative">
          <div className="absolute bg-gradient-to-b from-indigo-600 to-blue-500 opacity-75 inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1621360841013-c7683c659ec6"
              className="object-cover h-full w-full"
            />
          </div>
          <div className="w-full  max-w-md z-10">
            {/* <div className="sm:text-3xl xl:text-4xl font-bold leading-tight mb-6">
              Savoy Player Managment System
            </div>
            <div className="sm:text-sm xl:text-md text-gray-200 font-normal">
              What is Lorem Ipsum Lorem Ipsum is simply dummy text of the
              printing and typesetting industry Lorem Ipsum has been the
              industry's standard dummy text ever since the 1500s when an
              unknown printer took a galley of type and scrambled it to make a
              type specimen book it has?
            </div> */}
          </div>
        </div>
        <div className="md:flex md:items-center md:justify-center w-full sm:w-auto md:h-full md:w-2/5 xl:w-2/5 p-8  md:p-10 lg:p-14 sm:rounded-lg md:rounded-none bg-white">
          <div className="max-w-md w-full space-y-8">
            <div className="text-center">
              <h2 className="mt-6 text-3xl font-bold text-gray-900">
                Welcome Back!
              </h2>
              <p className="mt-2 text-sm text-gray-500">
                Please sign in to your account
              </p>
            </div>

            {error && (
              <div className="w-full bg-pink-100 text-red-700 py-5 px-6 rounded">
                <h2 className="font-bold">Ooops!</h2>
                You need to be logged in to view that page!
              </div>
            )}
            <button
              className="bg-gray-100 py-3 px-4 w-full hover:bg-gray-200"
              onClick={() => signIn("discord")}
            >
              Log In with Discord
            </button>
            <div className="flex flex-col items-start space-y-2">
              <h2>New player?</h2>
              <p className="text-gray-600 font-normal">
                Please use the button above if you are a new player and want to
                apply for the whitelist. You'll be automatically redirected to
                the application page once your account is setup.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
