import { useState } from "react";
import Image from "next/image";
import {
  FaEthereum,
  FaGlobe,
  FaChevronDown,
  FaChevronRight,
} from "react-icons/fa"; // Assuming you're using Ethereum's symbol for "chain" and a globe icon for the website

// Hooks
import useInfo from "@/models/governance/useInfo";

// Models and Utils
import Layout from "@/modules/Card/Layout/Layout";
import CardHeader from "@/modules/Card/Header/Header";
import CardLoader from "@/modules/CardLoader/CardLoader";
import NoData from "@/modules/NoData/NoData";

export default function Info() {
  const { info, isLoading } = useInfo();
  const [accordionOpen, setAccordionOpen] = useState(false);

  function toggleAccordion() {
    setAccordionOpen((prev) => !prev);
  }

  if (isLoading) {
    return <CardLoader element />;
  }

  if (!info) {
    return <NoData element message="" />;
  }

  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <Image
            unoptimized
            src={info.organization.visual.icon}
            alt={`${info.organization.name} Icon`}
            width={40}
            height={40}
            className="mr-2"
          />
          <span className="font-bold text-2xl">{info.organization.name}</span>
        </div>
        <a
          href={info.organization.tally_url}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#3C4D6E] text-white font-bold py-2 px-3 rounded text-md"
        >
          View on Tally
        </a>
      </div>

      <div className="flex items-center mb-6 max-w-2xl">
        <p className="line-clamp-2">{info.organization.description}</p>
      </div>

      <div className="inline-flex items-center mb-8 rounded-md">
        <FaGlobe className="mr-2 text-indigo-600" />
        <a
          href={info.organization.website}
          target="_blank"
          rel="noopener noreferrer"
          className="text-black hover:underline font-semibold"
        >
          {new URL(info.organization.website).hostname}
        </a>
      </div>

      <div className="flex space-x-4">
        <span className="inline-flex items-center px-2 py-1 rounded-lg bg-gray-300 text-black text-sm font-semibold">
          <FaEthereum className="mr-1 text-black" /> Ethereum
        </span>
        <span className="inline-flex items-center px-2 py-1 rounded-lg bg-indigo-300 text-indigo-700 text-sm font-semibold">
          {info.tokens[0].type}
        </span>
        <span className="inline-flex items-center px-2 py-1 rounded-lg bg-indigo-300 text-indigo-700 text-sm font-semibold">
          {Intl.NumberFormat().format(info.stats.tokens.supply)} Supply
        </span>
      </div>

      <div
        className="border-t mt-6 cursor-pointer flex justify-between items-center py-6 -mb-8"
        onClick={toggleAccordion}
      >
        <div className="font-semibold text-gray-800">Contract Parameters</div>
        <div className="pr-2">
          {accordionOpen ? (
            <FaChevronDown className="text-[#3C4D6E]" />
          ) : (
            <FaChevronRight className="text-[#3C4D6E]" />
          )}
        </div>
      </div>

      <div className={`${accordionOpen ? "block" : "hidden"}`}>
        <div className="grid grid-cols-3 gap-4 pt-8">
          <div className="col-span-1">
            <div className="bg-gray-200/50 pl-2 py-1.5 text-indigo-700 font-semibold text-md mb-2">
              Parameters
            </div>
            <div className="flex flex-col space-y-2">
              <div className="flex justify-between items-center px-2 bg-gray-200/50 py-0.5 text-md">
                <span className="font-normal text-[#333333]">
                  Proposal Threshold
                </span>
                <span className="">{info.proposalThreshold}</span>
              </div>
              <div className="flex justify-between items-center px-2 bg-gray-200/50 py-0.5 text-md">
                <span className="font-normal text-[#333333]">
                  Quorum needed
                </span>
                <span className="">
                  {info.organization.votingParameters.quorum}
                </span>
              </div>

              <div className="flex justify-between items-center px-2 bg-gray-200/50 py-0.5 text-md">
                <span className="font-normal text-[#333333]">
                  Voting Period
                </span>
                <span className="">
                  {info.organization.votingParameters.votingPeriod}
                </span>
              </div>
            </div>
          </div>
          <div className="col-span-2">
            <div className="bg-gray-200/50 pl-2 py-1.5 text-indigo-700 font-semibold text-md mb-2">
              Contract Addresses
            </div>
            <div className="flex flex-col space-y-2 h-ful">
              <div className="flex justify-between items-center px-2 bg-gray-200/50 py-0.5 text-md">
                <span className="font-semibold text-[#333333]">Governor</span>
                <span className="">{info.contracts.governor.address}</span>
              </div>
              <div className="flex justify-between items-center px-2 bg-gray-200/50 py-0.5 text-md">
                <span className="font-semibold text-[#333333]">Token</span>
                <span className="">{info.contracts.tokens[0].address}</span>
              </div>
              <div className="flex justify-between items-center px-2 bg-gray-200/50 py-0.5 text-md">
                <span className="font-semibold text-[#333333]">Timelock</span>
                <span className="">{info.contracts.timelock.address}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
