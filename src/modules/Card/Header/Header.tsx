import { Listbox } from "@headlessui/react";
import React from "react";
import { Tooltip } from "react-tooltip";

import { CheckIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { FaInfoCircle } from "react-icons/fa";

import { ICardHeader } from "@/types/general";

const CardHeader: React.FC<ICardHeader> = ({
  title,
  tooltip,
  selectedInterval,
  setSelectedInterval,
  intervals,
}) => {
  return (
    <div className="flex justify-between items-center mb-6 bg-[#3C4D6E] rounded-md px-4 h-10">
      {" "}
      {/* 1. Set a fixed height */}{" "}
      <h1
        className={`${
          !intervals ? "w-full" : "w-3/4"
        } font-semibold text-md text-white tracking-wider uppercase ${
          !intervals ? "py-1" : ""
        }`}
      >
        {title}
      </h1>
      {intervals && intervals.length > 0 && (
        <Listbox value={selectedInterval} onChange={setSelectedInterval}>
          {({ open }) => (
            <>
              <div className="relative w-1/4 max-w-xs">
                <Listbox.Button className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 py-1.5 my-1 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                  <span className="block truncate">
                    {selectedInterval?.name}
                  </span>
                  <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <ChevronDownIcon
                      className="w-5 h-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </span>
                </Listbox.Button>
                {open && (
                  <div className="absolute mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg z-50">
                    <Listbox.Options
                      static
                      className="py-1 overflow-auto text-base max-h-60 focus:outline-none"
                    >
                      {intervals.map((interval) => (
                        <Listbox.Option
                          key={interval.value}
                          value={interval}
                          className={({ active }) =>
                            `${
                              active
                                ? "text-white bg-indigo-600"
                                : "text-gray-900"
                            } cursor-default select-none relative py-2 pl-8 pr-4`
                          }
                        >
                          {({ active }) => (
                            <>
                              <span
                                className={`${
                                  active ? "font-medium" : "font-normal"
                                } block truncate`}
                              >
                                {interval.name}
                              </span>
                              {active && (
                                <span
                                  className={`${
                                    interval.value === selectedInterval?.value
                                      ? "text-white"
                                      : "text-indigo-600"
                                  } absolute inset-y-0 left-0 flex items-center pl-3`}
                                >
                                  <CheckIcon
                                    className="w-5 h-5"
                                    aria-hidden="true"
                                  />
                                </span>
                              )}
                            </>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </div>
                )}
              </div>
            </>
          )}
        </Listbox>
      )}
      {tooltip && (
        <>
          <FaInfoCircle className="ml-2 text-white cursor-pointer info-icon text-xl" />
          <Tooltip anchorSelect=".info-icon" place="top">
            {tooltip}
          </Tooltip>
        </>
      )}
    </div>
  );
};

export default CardHeader;
