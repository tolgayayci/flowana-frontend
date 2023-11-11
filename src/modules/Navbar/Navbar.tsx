// React Imports
import { Fragment, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

// Visual Components
import { Disclosure, Listbox, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  XMarkIcon,
  ChevronUpDownIcon,
} from "@heroicons/react/24/outline";

// Hooks
import { useProtocol } from "@/models/protocols/useProtocol";
import { protocols } from "@/utils/protocols";
import { pages } from "@/utils/pages";

// Custom Components
import SearchBar from "../SearchBar/SearchBar";
import {
  IProtocol,
  IProtocols,
  NavigationItem,
  PageFlags,
} from "@/types/general";

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const router = useRouter();

  const { protocol, setProtocol } = useProtocol();

  const selectedProtocol = protocols.find(
    (p) => p.value === protocol["protocol"]
  );

  useEffect(() => {
    const selectedProtocol = protocols.find(
      (p) => p.value === protocol["protocol"]
    );
    setSelected(selectedProtocol);
  }, [protocol]);

  const initialNavigation: NavigationItem[] = [
    {
      name: "Projects",
      href: `/${protocol["protocol"]}/projects`,
      current: false,
      key: "projects",
    },
    {
      name: "GitHub",
      href: `/${protocol["protocol"]}/github`,
      current: false,
      key: "github",
    },
    {
      name: "Forum",
      href: `/${protocol["protocol"]}/discourse`,
      current: false,
      key: "forum",
    },
    {
      name: "Governance",
      href: `/${protocol["protocol"]}/governance`,
      current: false,
      key: "governance",
    },
    {
      name: "Developers",
      href: `/${protocol["protocol"]}/developers`,
      current: false,
      key: "developers",
    },
    {
      name: "Leaderboard",
      href: `/${protocol["protocol"]}/leaderboard`,
      current: false,
      key: "leaderboard",
    },
  ];

  const filteredNavItems = initialNavigation.filter((item) => {
    const protocolName = selectedProtocol.value as IProtocol["protocol"];
    return pages[protocolName]?.[item.key];
  });

  const [selected, setSelected] = useState<IProtocols>(selectedProtocol);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [navigation, setNavigation] = useState(filteredNavItems);

  useEffect(() => {
    const newNavItems = filterNavigationItems(protocol["protocol"]);
    setNavigation(newNavItems);
  }, [protocol]);

  function filterNavigationItems(currentProtocol) {
    return initialNavigation.filter((item) => {
      return pages[currentProtocol]?.[item.key];
    });
  }

  const handleProtocolChange = (protocol: IProtocols) => {
    // Extract the current page from the router's path
    const currentPage = router.asPath.split("/")[2] as keyof PageFlags;

    // Check if the current page exists for the newly selected protocol
    if (!pages[protocol.value][currentPage]) {
      // If it doesn't exist, navigate to the default page for the selected protocol
      router.push(`/${protocol.value}/`);
    } else {
      // If it does, reload the page for the new protocol
      router.push(`/${protocol.value}/${currentPage}`);
    }

    setProtocol({ protocol: protocol.value });
    setSelected(protocol);
  };

  useEffect(() => {
    const currentHref =
      "/" + router.asPath.split("/")[1] + "/" + router.asPath.split("/")[2];

    const updatedNavigation = navigation.map((item) => ({
      ...item,
      current: item.href === currentHref,
    }));

    setNavigation(updatedNavigation);
  }, [router.asPath]);

  return (
    <>
      <div className="sticky top-0 left-0 right-0 z-10">
        <Disclosure as="nav" className="bg-main">
          {({ open }) => (
            <>
              <div className="mx-auto px-4 sm:px-6 lg:px-8 py-1 max-w-[90%]">
                <div className="flex h-12 items-center justify-between my-2">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <Link href="/">
                        <Image
                          unoptimized
                          src="/logo.svg"
                          width="60"
                          height="60"
                          alt="Logo"
                        />
                      </Link>
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <div className="flex items-center md:ml-6">
                      {/* Protocol Select */}
                      <Listbox
                        value={selected}
                        onChange={(e) => handleProtocolChange(e)}
                      >
                        <div className="relative">
                          <Listbox.Button className="relative w-[10rem] cursor-default rounded-lg bg-white py-2 pl-3 pr-3 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm flex items-center justify-between">
                            <span className="mr-2">
                              <Image
                                unoptimized
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
                              {protocols.map((protocol, protocolIdx) => (
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
                                          unoptimized
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
                <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3 max-w-[90%] mx-auto">
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
                <div className="border-t border-indigo-700 pb-3 pt-4 max-w-[90%] mx-auto flex space-x-2 items-stretch">
                  <div className="flex flex-col w-2/3">
                    {" "}
                    <SearchBar
                      open={isSearchOpen}
                      setOpen={setIsSearchOpen}
                      protocol={protocol["protocol"]}
                    />
                    <button
                      type="button"
                      className="text-[#333333] md:text-[15px] w-full bg-white hover:bg-gray-100 border-[3px] border-indigo-900 font-bold rounded-xl text-sm px-5 py-2.5 text-center inline-flex items-center"
                      onClick={() => setIsSearchOpen(true)}
                    >
                      Search on {protocol["protocol"]}
                    </button>
                  </div>
                  <div className="flex flex-col justify-center">
                    {" "}
                    {/* Protocol Select */}
                    <Listbox
                      value={selected}
                      onChange={(e) => handleProtocolChange(e)}
                    >
                      <div className="relative">
                        <Listbox.Button className="relative w-[10rem] cursor-default rounded-lg bg-white py-2 px-3 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm flex items-center justify-between">
                          <Image
                            unoptimized
                            src={selected.logo}
                            width="20"
                            height="20"
                            alt={selected.name}
                            className="rounded-full mr-1 md:mr-0"
                          />
                          <span className="mr-1 text-md font-medium truncate">
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
                            {protocols.map((protocol, protocolIdx) => (
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
                                        unoptimized
                                        src={protocol.logo}
                                        width="20"
                                        height="20"
                                        alt={protocol.name}
                                        className="rounded-full"
                                      />
                                    </span>
                                    <span
                                      className={`truncate ${
                                        selected ? "font-medium" : "font-normal"
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
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

        <header className="bg-side shadow-sm hidden md:block mb-16">
          <div className="mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center max-w-[90%]">
            <div className="flex items-baseline space-x-4 w-3/4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-[#3C4D6E] text-white"
                      : "text-sfblue hover:bg-[#3C4D6E] hover:text-white",
                    "rounded-md px-3 py-2 text-sm font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Link>
              ))}
            </div>
            <div className="w-1/4">
              <SearchBar
                open={isSearchOpen}
                setOpen={setIsSearchOpen}
                protocol={protocol["protocol"]}
              />
              <button
                type="button"
                className="text-[#333333] text-[15px] w-full bg-white hover:bg-gray-100 border-[3px] border-main font-bold rounded-xl text-sm px-5 py-2.5 text-center inline-flex items-center"
                onClick={() => setIsSearchOpen(true)}
              >
                Search on {selected?.name}
              </button>
            </div>
          </div>
        </header>
      </div>
    </>
  );
}
