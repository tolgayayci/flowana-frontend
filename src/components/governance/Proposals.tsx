import Link from "next/link";
import Image from "next/image";

// Hooks
import useProposals from "@/models/governance/useProposals";

// Models and Utils
import Layout from "@/modules/Card/Layout/Layout";
import CardHeader from "@/modules/Card/Header/Header";
import ListLoader from "@/modules/Loaders/github/ListLoader";
import NoData from "@/modules/NoData/NoData";

import { formatChartDate } from "@/utils/functions";

export default function Proposals() {
  const { proposals, isLoading } = useProposals();

  if (isLoading)
    return (
      <ListLoader
        isLoading={isLoading}
        element={
          <CardHeader
            title="Proposals"
            tooltip="Displays a list of governance proposals within the specified protocol. Users can view information related to each proposal."
          />
        }
      />
    );

  if (!proposals || !proposals?.length) {
    return (
      <NoData
        element={
          <CardHeader
            title="Proposals"
            tooltip="Displays a list of governance proposals within the specified protocol. Users can view information related to each proposal."
          />
        }
        message=""
      />
    );
  }

  function ProposalRow({ proposal }: { proposal: any }) {
    // Destructuring the required data from the proposal object
    const { voteStats, statusChanges, start, title } = proposal;

    // Calculate the total votes for and against
    const votesFor = voteStats.find((v: any) => v.support === "FOR") || {
      weight: 0,
    };
    const votesAgainst = voteStats.find(
      (v: any) => v.support === "AGAINST"
    ) || {
      weight: 0,
    };
    const totalVotes = votesFor.weight + votesAgainst.weight;
    const totalAddresses = proposal.voteStats.reduce(
      (acc, curr) => acc + parseInt(curr.votes),
      0
    );
    const percentageFor = totalVotes ? (votesFor.weight / totalVotes) * 100 : 0;
    const percentageAgainst = totalVotes
      ? (votesAgainst.weight / totalVotes) * 100
      : 0;

    function getStatusColors(statusType: string) {
      switch (statusType) {
        case "PENDING":
          return { textColor: "text-yellow-700", bgColor: "bg-yellow-100" };
        case "QUEUED":
          return { textColor: "text-blue-700", bgColor: "bg-blue-100" };
        case "CANCELED":
          return { textColor: "text-red-700", bgColor: "bg-red-100" };
        case "EXECUTED":
          return { textColor: "text-green-700", bgColor: "bg-green-100" };
        case "ACTIVE":
          return { textColor: "text-indigo-700", bgColor: "bg-indigo-100" };
        case "DEFEATED":
          return { textColor: "text-gray-700", bgColor: "bg-gray-100" };
        default:
          return { textColor: "text-gray-500", bgColor: "bg-white" };
      }
    }

    const statusColors = getStatusColors(
      statusChanges[statusChanges.length - 1].type
    );

    return (
      <div className="hover:bg-gray-100/50 flex">
        <div className="py-4 px-4 w-1/2 flex items-center">
          {/* Displaying the image on the left */}
          <div className="w-12 h-12 overflow-hidden rounded">
            <Image
              unoptimized
              src={"/compound-logo.png"}
              alt="Proposal"
              className="w-full h-full object-cover"
              width={50}
              height={50}
            />
          </div>
          {/* Content to the right of the image */}
          <Link href={proposal.tally_url} target="_blank">
            <div className="ml-4">
              <div className="text-md font-semibold text-gray-900 truncate max-w-xl">
                {title.startsWith("#") ? title.slice(1).trim() : title}{" "}
              </div>
              <div className="flex items-center space-x-2 mt-2">
                <div
                  className={`text-xs ${statusColors.textColor} ${statusColors.bgColor} p-1 rounded inline-block`}
                >
                  {statusChanges[statusChanges.length - 1].type}
                </div>
                <div className="text-sm text-sfblue-800">
                  Proposed on: {formatChartDate(start.timestamp)}
                </div>
              </div>
            </div>
          </Link>
        </div>
        <div className="px-6 py-4 w-1/6 flex flex-col justify-center">
          {/* Votes For */}
          {/* Count */}
          <div className="text-sm font-semibold text-green-500">
            {votesFor.weight}
          </div>
          {/* Percentage Bar */}
          <div className="mt-2">
            <div className="overflow-hidden h-2 text-xs flex rounded bg-green-200">
              <div
                style={{ width: `${percentageFor}%` }}
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"
              ></div>
            </div>
          </div>
        </div>

        <div className="px-6 py-4 w-1/6 flex flex-col justify-center">
          {/* Votes Against */}
          {/* Count */}
          <div className="text-sm font-semibold text-red-500">
            {votesAgainst.weight}
          </div>
          {/* Percentage Bar */}
          <div className="mt-2">
            <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
              <div
                style={{ width: `${percentageAgainst}%` }}
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-red-500"
              ></div>
            </div>
          </div>
        </div>
        <div className="px-6 py-4 whitespace-nowrap flex flex-col justify-center items-end w-1/6">
          {/* Total Votes */}
          <div className="text-md font-semibold text-gray-900 text-right">
            {totalVotes}
          </div>
          <div className="text-xs text-gray-500 text-right">
            {totalAddresses} addresses
          </div>
        </div>
      </div>
    );
  }

  return (
    <Layout>
      <div className="min-w-full mt-2">
        <div className="bg-gradient-to-r from-[#3C4D6E] to-[#4D5E7E] p-1 rounded-lg shadow-md flex">
          {/* First div now has flex-2 to take up half the space */}
          <div className="py-1.5 px-4 text-left text-md font-semibold text-white tracking-wider w-1/2">
            Proposal
          </div>
          {/* Each of the following divs have flex-1 to share the remaining space equally */}
          <div className="py-1.5 px-4 text-left text-md font-semibold text-white tracking-wider w-1/6">
            Votes For
          </div>
          <div className="py-1.5 px-4 text-left text-md font-semibold text-white tracking-wider w-1/6">
            Votes Against
          </div>
          <div className="py-1.5 px-4 text-end text-md font-semibold text-white tracking-wider w-1/6 justify-end items-end">
            Total Votes
          </div>
        </div>

        <div className="bg-white divide-y divide-sfblue-500">
          {proposals.slice(0, 5).map((proposal) => (
            <ProposalRow key={proposal.id} proposal={proposal} />
          ))}
        </div>
      </div>
    </Layout>
  );
}
