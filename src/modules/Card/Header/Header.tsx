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
    <div
      className={`flex justify-between items-center mb-6 bg-main-700 rounded-md px-4 ${
        !intervals ? "h-10" : "h-14 md:h-10"
      }`}
    >
      {" "}
      {/* 1. Set a fixed height */}{" "}
      <h1
        className={`${
          !intervals ? "w-full" : "w-1/2 line-clamp-2"
        } font-semibold md:text-md text-sm text-white tracking-wider uppercase`}
      >
        {title}
      </h1>
      {intervals && intervals.length > 0 && (
        <Listbox value={selectedInterval} onChange={setSelectedInterval}>
          {({ open }) => (
            <>
              <div className="relative md:w-1/4 w-1/2">
                <Listbox.Button className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-2 md:pr-10 py-1.5 md:py-1 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 text-xs md:text-sm">
                  <span className="block truncate">
                    {selectedInterval?.name}
                  </span>
                  <span className="absolute inset-y-0 right-0 flex items-center pr-1 md:pr-2 pointer-events-none">
                    <ChevronDownIcon
                      className="w-4 h-4 md:w-5 md:h-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </span>
                </Listbox.Button>
                {open && (
                  <div className="absolute mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg z-2">
                    <Listbox.Options
                      static
                      className="py-0.5 text-xs md:text-base overflow-auto max-h-60 focus:outline-none"
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
                            } cursor-default select-none relative py-2`
                          }
                        >
                          {({ selected, active }) => (
                            <>
                              <span
                                className={`block truncate pl-3 ${
                                  selected ? "font-medium" : "font-normal"
                                }`}
                              >
                                {interval.name}
                              </span>
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
          <a data-tooltip-id={title}>
            <FaInfoCircle className="ml-2 text-white cursor-pointer info-icon text-xl" />
            <Tooltip id={title} place="top" className="max-w-lg">
              {tooltip}
            </Tooltip>
          </a>
        </>
      )}
    </div>
  );
};

export default CardHeader;
