import { Fragment, useState, useEffect } from "react";
import { Popover, Transition } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";

import { foodMojis } from "../../constData";
import Tooltip from "../tooltip/tooltip";

export default function Navigation() {
  const [emoji, setEmoji] = useState({});

  function callMe() {
    const randomEmoji = foodMojis[Math.floor(Math.random() * foodMojis.length)];
    setEmoji(randomEmoji);
  }

  useEffect(() => {
    callMe();
  }, []);

  return (
    <Popover className="relative bg-s">
      <div className="max-w mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <a href="/">
              <span className="h-8 w-auto sm:h-10 text-2xl sm:text-4xl group font-sans font-medium">
                {emoji.emoji} Foodie
                {emoji.easterEgg !== "" ? (
                  <span className="group-hover">
                    <Tooltip text={emoji.easterEgg} />
                  </span>
                ) : (
                  ""
                )}
              </span>
            </a>
          </div>
          <div className="-mr-2 -my-2 md:hidden">
            <Popover.Button className="bg-white p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-3xl hover:rounded-xl transition-all duration-100 ease-linear">
              <span className="sr-only">Open menu</span>
              <MenuIcon className="h-6 w-6" aria-hidden="true" />
            </Popover.Button>
          </div>
          <Popover.Group
            as="nav"
            className="hidden md:flex space-x-10"
          ></Popover.Group>
          <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
            <a
              href="/login"
              className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent shadow-sm text-base font-medium text-gray-900 bg-stone-50 hover:bg-stone-100 hover:text-gray-400 rounded-3xl hover:rounded-xl transition-all duration-100 ease-linear"
            >
              Login
            </a>
            <a
              href="/register"
              className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent shadow-sm text-base font-medium text-white bg-orange-500 hover:bg-orange-400 rounded-3xl hover:rounded-xl transition-all duration-100 ease-linear"
            >
              Register
            </a>
          </div>
        </div>
      </div>

      <Transition
        as={Fragment}
        enter="duration-200 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="duration-100 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Popover.Panel
          focus
          className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden "
        >
          <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50 ">
            <div className="pt-5 pb-6 px-5">
              <div className="flex items-center justify-between">
                <div className="sm:h-10 text-2xl sm:text-4xl group font-sans font-medium">
                  Menu 😎
                </div>
                <div className="-mr-2">
                  <Popover.Button className="bg-white p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-3xl hover:rounded-xl transition-all duration-100 ease-linear">
                    <span className="sr-only">Close menu</span>
                    <XIcon className="h-6 w-6 " aria-hidden="true" />
                  </Popover.Button>
                </div>
              </div>
            </div>
            <div className="py-6 px-5 space-y-6">
              <div>
                <a
                  href="/register"
                  className="w-full flex items-center justify-center px-4 py-2 border border-transparent shadow-sm text-base font-medium text-white bg-orange-500 hover:bg-orange-400 rounded-3xl hover:rounded-xl transition-all duration-100 ease-linear"
                >
                  Register
                </a>
                <p className="mt-6 text-center text-base font-medium text-gray-500">
                  You already have a profile?{" "}
                  <a
                    href="/login"
                    className="text-orange-500 hover:text-orange-200"
                  >
                    Login
                  </a>
                </p>
              </div>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}
