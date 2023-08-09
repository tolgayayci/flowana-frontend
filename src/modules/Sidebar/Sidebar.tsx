import React from "react";
import { INavigationItem } from "@/types/general";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Sidebar({
  navigation,
  element,
}: {
  navigation: INavigationItem[];
  element: React.ReactNode | null;
}) {
  return (
    <>
      <div className="sticky top-[180px]">
        <div className="w-full mb-6">{element}</div>
        <div className=" h-auto bg-white-200 shadow-xl p-12 border-2 border-indigo-400 rounded-lg">
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {navigation.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className={classNames(
                          item.current
                            ? "bg-indigo-700 text-white"
                            : "text-indigo-800 hover:text-white hover:bg-indigo-700",
                          "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                        )}
                      >
                        <item.icon
                          className={classNames(
                            item.current
                              ? "text-white"
                              : "text-indigo-200 group-hover:text-white",
                            "h-6 w-6 shrink-0"
                          )}
                          aria-hidden="true"
                        />
                        <span className="ml-4">{item.name}</span>
                        {item.count ? (
                          <span
                            className="ml-auto w-9 min-w-max whitespace-nowrap rounded-full bg-indigo-600 px-2.5 py-0.5 text-center text-xs font-medium leading-5 text-white ring-1 ring-inset ring-indigo-500"
                            aria-hidden="true"
                          >
                            {item.count}
                          </span>
                        ) : null}
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}
