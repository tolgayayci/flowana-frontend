import Head from "next/head";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRange, UseRangeProps } from "react-instantsearch-hooks-web";

import {
  InstantSearch,
  SearchBox,
  InfiniteHits,
  Configure,
  HierarchicalMenu,
  RefinementList,
} from "react-instantsearch-hooks-web";

import ProjectCard from "@/components/projects/ProjectCard";
import { searchClient } from "@/utils/searchClient";
import { useProtocol } from "@/models/protocols/useProtocol";
import { getSearchIndexForProtocol } from "@/utils/functions";

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
};

export function RangeSlider(props: UseRangeProps) {
  const { start, range, canRefine, refine } = useRange(props);
  const { min, max } = range;
  const [value, setValue] = useState({ start: min, end: max });

  const from = Math.max(min, Number.isFinite(start[0]) ? start[0] : min);
  const to = Math.min(max, Number.isFinite(start[1]) ? start[1] : max);

  useEffect(() => {
    setValue({ start: from, end: to });
  }, [from, to]);

  const handleChange = (e) => {
    const newValue = parseFloat(e.target.value);
    setValue((prev) => ({ ...prev, end: newValue }));
    refine([value.start, newValue]);
  };

  return (
    <div className="w-full">
      <div className="relative">
        <div className="flex justify-between text-sm">
          <span className="flex-1">{min}</span>
          <span className="flex-1 text-right">{max}</span>
        </div>
        <input
          type="range"
          min={min}
          max={max}
          value={value.end}
          onChange={handleChange}
          className="w-full cursor-pointer accent-main"
          disabled={!canRefine}
        />
      </div>
    </div>
  );
}

export default function Projects() {
  const { protocol } = useProtocol();

  const protocolInfo = protocolInfos[protocol["protocol"]];

  return (
    <>
      <Head>
        <title>Projects - {protocol["protocol"]}</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <section className="max-w-[90%] mx-auto mb-16 -mt-6 px-4 sm:px-6 lg:px-8 py-1">
        <InstantSearch
          key={protocol["protocol"]}
          searchClient={searchClient(protocol["protocol"])}
          indexName={getSearchIndexForProtocol(protocol["protocol"])}
        >
          <div className="grid grid-cols-5 gap-12">
            <Configure analytics={false} hitsPerPage={16} />
            <div className="self-start col-span-5 md:col-span-1 hidden lg:block xl:block 2xl:block space-y-7 sticky top-[190px]">
              <div className="bg-white shadow-sm rounded-2xl p-6 border-2 border-main">
                <div className="flex items-center mb-6">
                  <Image
                    unoptimized
                    src={protocolInfo.image_url}
                    alt="Projects Icon"
                    className="w-12 h-12 mr-4 rounded-full"
                    width={48}
                    height={48}
                  />
                  <div className="flex flex-col justify-center ml-2">
                    <h1 className="text-xl font-bold">Projects Portal</h1>
                    <p className="text-gray-500 text-sm">
                      Find your project on {protocolInfo.protocol_name}
                    </p>
                  </div>
                </div>

                {/* Categories */}
                <div className="relative">
                  <SearchBox
                    searchAsYouType={false}
                    placeholder={`Search on ${protocolInfo.protocol_name} Ecosystem`}
                    autoFocus={true}
                    classNames={{
                      root: "w-full bg-transparent text-gray-800 placeholder-gray-400 sm:text-sm pl-3 border-2 border-sfblue rounded-lg",
                      form: "w-full focus:rounded-none",
                      input:
                        "border-0 outline-none focus:border-none focus:ring-0 w-full py-1.5 rounded-lg text-[14px]",
                      submitIcon: "hidden",
                    }}
                    submitIconComponent={() => null}
                    resetIconComponent={() => null}
                  />
                </div>
              </div>

              <div className="bg-white shadow-sm rounded-2xl p-6 border-2 border-main">
                <div className="flex items-center mb-3">
                  <div className="flex flex-col justify-center">
                    <h1 className="text-lg font-bold">Categories</h1>
                    <p className="text-gray-500 text-sm">
                      List projects for that category
                    </p>
                  </div>
                </div>

                {/* Filters Bar */}
                <div className="relative">
                  <HierarchicalMenu
                    attributes={[
                      "categories.lvl0",
                      "categories.lvl1",
                      "categories.lvl2",
                    ]}
                    showParentLevel={false}
                    showMore={true}
                    limit={8}
                    transformItems={(items) =>
                      items.filter((item) => item.count > 0)
                    }
                    classNames={{
                      root: "bg-transparent text-gray-800 placeholder-gray-400 sm:text-sm border-t-2 border-gray-100",
                      list: "w-full mt-2",
                      link: "flex justify-between items-center w-full py-1.5 px-2",
                      item: "hover:bg-gray-100",
                      label: "text-md font-semibold",
                      count:
                        "text-white text-sm font-normal bg-side-500 rounded-lg px-2",
                      selectedItemLink: "bg-sfblue-700 text-white rounded-lg",
                      showMore:
                        "w-full border-2 border-sfblue rounded-lg mt-2 py-1 text-[#333333]",
                      disabledShowMore: "mt-4",
                    }}
                  />
                </div>
              </div>

              <div className="bg-white shadow-sm rounded-2xl p-6 border-2 border-main mx-auto">
                <div className="flex items-center mb-2">
                  <div className="flex flex-col justify-center">
                    <h1 className="text-lg font-bold">Health Score</h1>
                  </div>
                </div>

                <div className="flex flex-col justify-center mb-3">
                  <p className="text-gray-500 text-sm border-b-2 border-gray-100 pb-1">
                    Grade
                  </p>
                  <div className="relative">
                    <RefinementList
                      attribute={"health_score.grade"}
                      limit={10}
                      showMore={true}
                      showMoreLimit={20}
                      classNames={{
                        root: "bg-transparent text-gray-800 placeholder-gray-400 sm:text-sm",
                        list: "w-full mt-2",
                        label: "w-full flex py-1",
                        labelText: "ml-2 text-md font-semibold",
                        count:
                          "text-white text-sm font-normal bg-side-500 rounded-lg px-2 ml-auto",
                        showMore: "hidden",
                      }}
                    />
                  </div>
                </div>

                <div className="flex flex-col justify-center space-y-2">
                  <p className="text-gray-500 text-sm border-b-2 border-gray-100 pb-1">
                    Total Score
                  </p>
                  <div className="h-12">
                    <RangeSlider attribute={"health_score.total"} />
                  </div>
                </div>

                <div className="flex flex-col justify-center space-y-2">
                  <p className="text-gray-500 text-sm border-b-2 border-gray-100 pb-1">
                    Commit Activity
                  </p>
                  <div className="h-12">
                    <RangeSlider attribute={"health_score.commit_activity"} />
                  </div>
                </div>

                <div className="flex flex-col justify-center space-y-2">
                  <p className="text-gray-500 text-sm border-b-2 border-gray-100 pb-1">
                    Contribution Activity
                  </p>
                  <div className="h-12">
                    <RangeSlider
                      attribute={"health_score.contribution_activity"}
                    />
                  </div>
                </div>

                <div className="flex flex-col justify-center space-y-2">
                  <p className="text-gray-500 text-sm border-b-2 border-gray-100 pb-1">
                    Issue Activity
                  </p>
                  <div className="h-12">
                    <RangeSlider attribute={"health_score.issue_activity"} />
                  </div>
                </div>

                <div className="flex flex-col justify-center space-y-2">
                  <p className="text-gray-500 text-sm border-b-2 border-gray-100 pb-1">
                    Pull Request Activity
                  </p>
                  <div className="h-12">
                    <RangeSlider
                      attribute={"health_score.pull_request_activity"}
                    />
                  </div>
                </div>

                <div className="flex flex-col justify-center space-y-2">
                  <p className="text-gray-500 text-sm border-b-2 border-gray-100 pb-1">
                    Release Activity
                  </p>
                  <div className="h-12">
                    <RangeSlider attribute={"health_score.release_activity"} />
                  </div>
                </div>
              </div>
            </div>

            <div className="col-span-5 md:col-span-4 mx-auto">
              <InfiniteHits
                showPrevious={false}
                hitComponent={(e) => <ProjectCard hit={e.hit} />}
                classNames={{
                  list: "grid grid-cols-4 gap-8",
                  item: "2xl:col-span-1 xl:col-span-1 col-span-3",
                  disabledLoadMore: "hidden",
                  loadMore:
                    "w-full mt-10 mx-auto text-center inline-block py-3 text-center leading-6 text-lg text-white font-extrabold bg-main hover:bg-side-500 border-3 border-indigo-900 shadow rounded transition duration-200",
                }}
              />
            </div>
          </div>
        </InstantSearch>
      </section>
    </>
  );
}
