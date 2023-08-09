import { Fragment, useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Disclosure, Listbox, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  XMarkIcon,
  ChevronUpDownIcon,
} from "@heroicons/react/24/outline";

import SearchBar from "../SearchBar/SearchBar";

const initialNavigation = [
  { name: "Projects", href: "/projects", current: false },
  { name: "GitHub", href: "/github", current: false },
  { name: "Forum", href: "/discourse", current: false },
  { name: "Governance", href: "/governance", current: false },
  { name: "Developers", href: "/developers", current: false },
  { name: "Comet", href: "/projects/compound-finance/comet", current: false },
  { name: "Leaderboard", href: "#", current: false },
];

const protocol = [
  { name: "Flow", logo: "/flow-logo.png" },
  { name: "Polkadot", logo: "/polkadot-logo.jpg" },
  { name: "Compound", logo: "/compound-logo.png" },
  { name: "Lens Protocol", logo: "/lens-logo.jpg" },
];

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const router = useRouter();

  const [selected, setSelected] = useState(protocol[0]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [navigation, setNavigation] = useState(initialNavigation);

  useEffect(() => {
    const currentHref = router.asPath;

    const updatedNavigation = navigation.map((item) => ({
      ...item,
      current: item.href === currentHref,
    }));

    setNavigation(updatedNavigation);
  }, [router.asPath]);

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-10">
        <Disclosure as="nav" className="bg-sfblue">
          {({ open }) => (
            <>
              <div className="mx-auto px-4 sm:px-6 lg:px-8 py-1 max-w-[90%]">
                <div className="flex h-16 items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <Image
                        src="https://lenspulse.vercel.app/static/media/long_logo.93bc8d936fae22fee7e34bca834ca5a5.svg"
                        width="170"
                        height="80"
                        alt="Logo"
                      />
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <div className="flex items-center md:ml-6">
                      {/* Protocol Select */}
                      <Listbox value={selected} onChange={setSelected}>
                        <div className="relative mt-1">
                          <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-3 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm flex items-center">
                            <span className="mr-2">
                              <Image
                                src={selected.logo}
                                width="20"
                                height="20"
                                alt={selected.name}
                                className="rounded-full"
                              />
                            </span>
                            <span className="mr-2 text-md font-medium truncate">
                              {selected.name}
                            </span>
                            <span className="pointer-events-none">
                              <ChevronUpDownIcon
                                className="h-5 w-5 text-gray-400"
                                aria-hidden="true"
                              />
                            </span>
                          </Listbox.Button>
                          <Transition
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                          >
                            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                              {protocol.map((protocol, protocolIdx) => (
                                <Listbox.Option
                                  key={protocolIdx}
                                  className={({ active }) =>
                                    `relative cursor-default select-none py-2 pl-4 pr-4 ${
                                      active
                                        ? "bg-amber-100 text-amber-900"
                                        : "text-gray-900"
                                    }`
                                  }
                                  value={protocol}
                                >
                                  {({ selected }) => (
                                    <span className="flex items-center">
                                      <span className="mr-2">
                                        <Image
                                          src={protocol.logo}
                                          width="20"
                                          height="20"
                                          alt={protocol.name}
                                          className="rounded-full"
                                        />
                                      </span>
                                      <span
                                        className={`truncate ${
                                          selected
                                            ? "font-medium"
                                            : "font-normal"
                                        }`}
                                      >
                                        {protocol.name}
                                      </span>
                                    </span>
                                  )}
                                </Listbox.Option>
                              ))}
                            </Listbox.Options>
                          </Transition>
                        </div>
                      </Listbox>
                    </div>
                  </div>
                  <div className="-mr-2 flex md:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-indigo-600 p-2 text-indigo-200 hover:bg-indigo-500 hover:bg-opacity-75 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600">
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XMarkIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      ) : (
                        <Bars3Icon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="md:hidden">
                <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3 max-w-[90%]">
                  {navigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as="a"
                      href={item.href}
                      className={classNames(
                        item.current
                          ? "bg-indigo-700 text-white"
                          : "text-white hover:bg-indigo-500 hover:bg-opacity-75",
                        "block rounded-md px-3 py-2 text-base font-medium"
                      )}
                      aria-current={item.current ? "page" : undefined}
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                </div>
                <div className="border-t border-indigo-700 pb-3 pt-4">
                  <div className="w-full px-4">
                    <SearchBar open={isSearchOpen} setOpen={setIsSearchOpen} />
                    <button
                      type="button"
                      className="text-indigo-900 text-[15px] w-full bg-white hover:bg-gray-100 border-[3px] border-indigo-900 font-bold rounded-xl text-sm px-5 py-2.5 text-center inline-flex items-center"
                      onClick={() => setIsSearchOpen(true)}
                    >
                      Search on Flowana
                    </button>
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

        <header className="bg-sfblue-400 shadow-sm hidden md:block mb-16">
          <div className="mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center max-w-[90%]">
            <div className="flex items-baseline space-x-4 w-3/4">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-sfblue text-white"
                      : "text-sfblue hover:bg-sfblue hover:text-white",
                    "rounded-md px-3 py-2 text-sm font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </a>
              ))}
            </div>
            <div className="w-1/4">
              <SearchBar open={isSearchOpen} setOpen={setIsSearchOpen} />
              <button
                type="button"
                className="text-sfblack text-[15px] w-full bg-white hover:bg-gray-100 border-[3px] border-sfblue font-bold rounded-xl text-sm px-5 py-2.5 text-center inline-flex items-center"
                onClick={() => setIsSearchOpen(true)}
              >
                Search on Flowana
              </button>
            </div>
          </div>
        </header>
      </div>
    </>
  );
}
