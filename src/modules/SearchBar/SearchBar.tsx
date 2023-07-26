import { Fragment, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { Combobox, Dialog, Transition } from "@headlessui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { UsersIcon } from "@heroicons/react/24/outline";
import { ChevronRightIcon } from "@heroicons/react/20/solid";

//** Algolia Imports */
import algoliasearch from "algoliasearch";
import {
  InstantSearch,
  Hits,
  Configure,
  useSearchBox,
  UseSearchBoxProps,
  Index,
  HitsProps,
  SearchBox,
} from "react-instantsearch-hooks-web";

import { searchClient } from "@/utils/searchClient";

//** Types */
import { IHitProps } from "@/types/general";

interface SearchBarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

export default function SearchBar(props: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [selectedProject, setSelectedProject] = useState<IHitProps | null>(
    null
  );

  function ProjectHit(hits: any) {
    if (hits === undefined) return null;
    return (
      <>
        <div className="-mx-2 text-sm text-gray-700">
          <Combobox.Option
            as="div"
            key={hits.objectID}
            value={hits.repo}
            onClick={() => setSelectedProject(hits)}
            className={() =>
              classNames(
                "flex cursor-default select-none items-center rounded-md p-2",
                selectedProject?.repo === hits.repo &&
                  "bg-gray-100 text-gray-900"
              )
            }
          >
            <Image
              src={hits?.avatar_url}
              alt=""
              width={24}
              height={24}
              className="h-6 w-6 flex-none rounded-full"
            />
            <span className="ml-3 flex-auto truncate">{hits.repo}</span>
            <ChevronRightIcon
              className="ml-3 h-5 w-5 flex-none text-gray-400"
              aria-hidden="true"
            />
          </Combobox.Option>
        </div>
      </>
    );
  }

  return (
    <InstantSearch
      searchClient={searchClient}
      indexName={process.env.NEXT_PUBLIC_INDEX_NAME as string}
    >
      <Configure analytics={true} hitsPerPage={5} />
      <Transition.Root
        show={props.open}
        as={Fragment}
        afterLeave={() => setQuery("")}
        appear
      >
        <Dialog as="div" className="relative z-10" onClose={props.setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-indigo-900 bg-opacity-80 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto p-4 sm:p-6 md:p-20">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="mx-auto max-w-3xl transform divide-y divide-gray-200 overflow-hidden rounded-xl bg-white shadow-2xl transition-all mt-28 md:mt-60 border-indigo-600 border-[3px]">
                <Combobox
                  value={selectedProject}
                  onChange={() => console.log(selectedProject)}
                >
                  <>
                    <SearchBox
                      searchAsYouType={false}
                      placeholder="Search for Awesome Projects or Articles"
                      autoFocus={true}
                      onSubmit={() => setSelectedProject(null)}
                      classNames={{
                        root: "w-full bg-transparent text-gray-800 placeholder-gray-400 ssm:text-sm",
                        form: "w-full focus:rounded-none",
                        input:
                          "border-0 outline-none focus:border-none focus:ring-0",
                        submitIcon: "hidden",
                      }}
                      submitIconComponent={() => null}
                      resetIconComponent={() => null}
                    />

                    <Combobox.Options
                      as="div"
                      static
                      hold
                      className="flex divide-x divide-gray-100"
                    >
                      <div
                        className={classNames(
                          "max-h-92 min-w-0 flex-auto scroll-py-4 overflow-y-auto px-6 py-4",
                          selectedProject && "sm:h-92"
                        )}
                      >
                        <h2 className="mt-2 mb-4 text-xs font-semibold text-gray-500">
                          Projects
                        </h2>

                        <Hits hitComponent={(e) => ProjectHit(e.hit)} />
                      </div>

                      {selectedProject && (
                        <div className="hidden h-92 w-1/2 flex-none flex-col divide-y divide-gray-100 overflow-y-auto sm:flex">
                          <div className="flex-none p-6 text-center">
                            <Image
                              src={selectedProject.avatar_url}
                              alt=""
                              width={24}
                              height={24}
                              className="mx-auto h-16 w-16 rounded-full"
                            />
                            <h2 className="mt-3 font-semibold text-gray-900">
                              {selectedProject.repo}
                            </h2>
                            {selectedProject["categories.lvl0"][0] ? (
                              <span className="inline-flex ml-3 mt-3 h-6 items-center justify-center text-xs font-extrabold px-2 text-indigo-900 rounded border-2 border-indigo-900 bg-green-200 uppercase shadow-sm">
                                {selectedProject["categories.lvl0"][0]}
                              </span>
                            ) : (
                              <span className="inline-flex ml-3 mt-3 h-6 items-center justify-center text-xs font-extrabold px-2 text-indigo-900 rounded border-2 border-indigo-900 bg-green-200 uppercase shadow-sm">
                                No Category
                              </span>
                            )}
                          </div>
                          <div className="flex flex-auto flex-col justify-between p-6">
                            {selectedProject.description ? (
                              <p className="text-sm leading-6 text-center font-normal my-auto mb-8">
                                {selectedProject.description.substring(0, 150)}
                              </p>
                            ) : (
                              <p className="text-sm leading-6 text-center font-normal my-auto mb-8">
                                No Description Available
                              </p>
                            )}

                            <Link
                              href={`/projects/${selectedProject.repo}/${selectedProject.owner}`}
                            >
                              <button
                                type="button"
                                className="w-full rounded-md -mt-1 border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700"
                                onClick={() => {
                                  props.setOpen(false);
                                }}
                              >
                                Review Project
                              </button>
                            </Link>
                          </div>
                        </div>
                      )}
                    </Combobox.Options>
                  </>
                </Combobox>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </InstantSearch>
  );
}
