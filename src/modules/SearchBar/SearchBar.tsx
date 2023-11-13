import { Fragment, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { Combobox, Dialog, Transition } from "@headlessui/react";
import { ChevronRightIcon } from "@heroicons/react/20/solid";

//** Algolia Imports */
import {
  InstantSearch,
  Hits,
  Configure,
  SearchBox,
} from "react-instantsearch-hooks-web";

import { searchClient } from "@/utils/searchClient";
import { getSearchIndexForProtocol } from "@/utils/functions";
import { useProtocol } from "@/models/protocols/useProtocol";

//** Types */
import { IHitProps } from "@/types/general";
import { IProtocol } from "@/types/general";

interface SearchBarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  protocol: IProtocol["protocol"];
}

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

const protocolInfos = {
  flow: {
    protocol_name: "Flow",
    image_url: "/flow-logo.png",
  },
  compound: {
    protocol_name: "Compound",
    image_url: "/compound-logo.png",
  },
  polkadot: {
    protocol_name: "Polkadot",
    image_url: "/polkadot-logo.jpg",
  },
  lens: {
    protocol_name: "Lens",
    image_url: "/lens-logo.jpg",
  },
  balancer: {
    protocol_name: "Balancer",
    image_url: "/balancer-logo.png",
  },
  aave: {
    protocol_name: "Aave",
    image_url: "/aave-logo.png",
  },
  proton: {
    protocol_name: "Proton",
    image_url: "/proton-logo.jpg",
  },
  osmosis: {
    protocol_name: "Osmosis",
    image_url: "/osmosis-logo.jpg",
  },
  "the-graph": {
    protocol_name: "The Graph",
    image_url: "/the-graph-logo.png",
  },
  ton: {
    protocol_name: "TON",
    image_url: "/ton-logo.png",
  },
  ocean: {
    protocol_name: "Ocean",
    image_url: "/ocean-logo.jpg",
  },
  eos: {
    protocol_name: "EOS",
    image_url: "/eos-logo.jpg",
  },
};

export default function SearchBar(props: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [selectedProject, setSelectedProject] = useState<IHitProps | null>(
    null
  );

  const { protocol } = useProtocol();

  const protocolInfo = protocolInfos[protocol["protocol"]];

  function ProjectHit(hits: any) {
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
              unoptimized
              src={hits?.avatar_url || protocolInfo.image_url}
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
      key={protocol["protocol"]}
      searchClient={searchClient(protocol["protocol"])}
      indexName={getSearchIndexForProtocol(protocol["protocol"])}
      routing={true}
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
            <div className="fixed inset-0 bg-sfblue-500 bg-opacity-80 transition-opacity" />
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
              <Dialog.Panel className="mx-auto max-w-5xl transform divide-y divide-gray-200 overflow-hidden rounded-xl bg-white shadow-2xl transition-all md:mt-60 border-sfblue-800 border-[3px]">
                <Combobox value={selectedProject}>
                  <>
                    <SearchBox
                      searchAsYouType={false}
                      placeholder={`Search on ${protocolInfo.protocol_name} projects`}
                      autoFocus={false}
                      onSubmit={() => setSelectedProject(null)}
                      onClick={(e) => e.stopPropagation()}
                      classNames={{
                        root: "w-full bg-transparent text-gray-800 placeholder-gray-400 ssm:text-sm pl-6",
                        form: "w-full focus:rounded-none",
                        input:
                          "border-0 outline-none focus:border-none focus:ring-0 w-full py-2",
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
                              unoptimized
                              src={
                                selectedProject.avatar_url ||
                                protocolInfo.image_url
                              }
                              alt=""
                              width={24}
                              height={24}
                              className="mx-auto h-16 w-16 rounded-full"
                            />
                            <h2 className="mt-3 font-semibold text-gray-900">
                              {selectedProject.repo}
                            </h2>
                            {selectedProject["categories.lvl0"] && (
                              <span className="inline-flex ml-3 mt-3 h-6 items-center justify-center text-xs font-extrabold px-2 text-indigo-900 rounded border-2 border-indigo-900 bg-green-200 uppercase shadow-sm">
                                {selectedProject["categories.lvl0"][0]}
                              </span>
                            )}
                            {selectedProject.health_score?.grade && (
                              <span className="inline-flex ml-3 mt-3 h-6 items-center justify-center text-xs font-extrabold px-2 text-indigo-900 rounded border-2 border-indigo-900 bg-orange-200 uppercase shadow-sm">
                                Health Score:{" "}
                                {selectedProject.health_score.grade}
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
                              href={`/${protocol["protocol"]}/projects/${selectedProject.owner}/${selectedProject.repo}`}
                            >
                              <button
                                type="button"
                                className="w-full rounded-md -mt-1 border border-transparent bg-[#2A3855] py-2 px-4 text-sm font-medium text-white shadow-sm"
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
