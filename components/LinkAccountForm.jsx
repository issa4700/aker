import _ from "lodash";
import { LinkedAccount, LinkAccSkeleton } from "../components/LinkedAccount";
import { useState, useEffect, useCallback, Fragment } from "react";
import { formatUUID } from "../lib/uuid";
import { Dialog, Transition } from "@headlessui/react";
import { signOut } from "next-auth/react";

export default function LinkAccForm() {
  const [agreeTOS, setAgreeTOS] = useState(false);
  const [username, setUsername] = useState("");
  const [profile, setProfile] = useState(null);
  const [loadingAPI, setLoadingAPI] = useState(false);
  const [isLinking, setIsLinking] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (profile && agreeTOS) setEnabled(true);
    else setEnabled(false);
  }, [agreeTOS, profile]);

  // Function to get Profile
  const getProfile = async (query) => {
    //const apiResp = await uuidForName(query);

    try {
      setProfile(null);
      setAgreeTOS(false);

      // Check if empty
      if (!query || query == null) throw `Username cannot be empty!`;

      // Check username length
      if (query.length < 3 || query.length > 16) throw `Invalid username`;

      // Send request to API
      setLoadingAPI(true);
      const player = await fetch(
        `https://mc-heads.net/minecraft/profile/${query}`,
        {
          method: "GET",
        }
      )
        .then((response) => response.json())
        .catch((error) => {
          console.error("Error:", error);
        });

      if (player) {
        setProfile(formatUUID(player?.id));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingAPI(false);
    }
  };

  // Debounced callback
  const delayedQuery = useCallback(
    _.debounce((q) => getProfile(q), 500),
    []
  );

  // Use debounce on input field to reduce API calls
  const onChange = (e) => {
    setUsername(e.target.value);
    delayedQuery(e.target.value);
  };

  // Handle form submission
  async function handleSubmit(e) {
    e.preventDefault();
    const account = profile;

    try {
      setEnabled(false);
      setIsLinking(true);
      // Implement code to handle linking user accounts here

      // Send request to API
      const linkAcc = await fetch("/api/link", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ uuid: account }),
      });

      // Check if errors were returned
      if (!linkAcc.ok) {
        throw `Unable to add ${username.current.value} to whitelist.`;
      }

      // Show modal if successful
      setIsOpen(true);
    } catch (error) {
      console.log(error);
      setError(true);
    } finally {
      setIsLinking(false);
    }
  }

  // Placeholder
  const Placeholder = () => {
    if (username.length >= 3)
      return (
        <span className="text-red-600">
          No account found with that username!
        </span>
      );
    return <LinkedAccount UUID="069a79f4-44e9-4726-a5be-fca90e38aaf5" />;
  };

  //   if (!success) return <div></div>;

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={() => signOut()}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Account linked successfully
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    You will need to log out and log back in to see changes in
                    your account.
                  </p>
                </div>

                <div className="mt-4 space-x-2">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={() => signOut()}
                  >
                    Got it, log me out!
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-6 mb-auto">
        <div className="space-y-2">
          {error && (
            <div className="bg-red-200 px-4 py-3 rounded-sm text-red-700">
              Something went wrong! Please try again.
            </div>
          )}

          <h2 className="text-lg text-gray-900 font-semibold">
            Search for Minecraft Account
          </h2>
          <input
            type="text"
            value={username}
            onChange={onChange}
            minLength={1}
            maxLength={16}
            className="px-3 py-2 w-full outline outline-1 outline-slate-200 focus:outline-blue-300"
            placeholder="Username"
          />

          {/* Show skeleton whilst waiting for reponse from API */}
          {loadingAPI && <LinkAccSkeleton animate={true} />}

          {/* Show placeholder profile when field is empty */}
          {!profile && !loadingAPI && <Placeholder />}

          {/* Show profile if a valid player is found */}
          {profile && <LinkedAccount UUID={profile} />}
        </div>
        <div>
          <span className="text-lg text-gray-900 font-semibold">
            Declaration
          </span>
          <div className="space-x-2">
            <input
              type="checkbox"
              name="agreeTOS"
              checked={agreeTOS}
              onChange={() => setAgreeTOS(!agreeTOS)}
              disabled={!profile}
            />
            <label htmlFor="agreeTOS" className="text-gray-700">
              I confirm that the account above is mine and it cannot be changed
              later.
            </label>
          </div>
        </div>

        <button
          type="submit"
          disabled={!enabled && !success}
          className={`py-3 px-4 w-full ${
            enabled && !success
              ? "bg-blue-50 hover:bg-blue-100 text-blue-600"
              : "bg-gray-50 cursor-not-allowed text-gray-400"
          }`}
        >
          {isLinking && !enabled ? "Linking..." : "Link Account"}
        </button>
      </form>
    </>
  );
}
