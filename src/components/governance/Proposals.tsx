import Link from "next/link";
import Image from "next/image";

// Hooks
import useProposals from "@/models/governance/useProposals";

// Models and Utils
import Layout from "@/modules/Card/Layout/Layout";
import CardHeader from "@/modules/Card/Header/Header";
import ListLoader from "@/modules/Loaders/github/ListLoader";
import NoData from "@/modules/NoData/NoData";

export default function Proposals() {
  const { proposals, isLoading } = useProposals();

  if (isLoading)
    return (
      <ListLoader
        isLoading={isLoading}
        element={<CardHeader title="Proposals" />}
      />
    );

  if (!proposals || !proposals?.length) {
    return <NoData element={<CardHeader title="Proposals" />} message="" />;
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
      <tr className="hover:bg-gray-100/50">
        <td className="py-4 whitespace-nowrap">
          <div className="flex items-center">
            {/* Displaying the image on the left */}
            <div className="w-12 h-12 overflow-hidden rounded">
              <Image
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
                  {title}
                </div>
                <div className="flex items-center space-x-2 mt-2">
                  <div
                    className={`text-xs ${statusColors.textColor} ${statusColors.bgColor} p-1 rounded inline-block`}
                  >
                    {statusChanges[statusChanges.length - 1].type}
                  </div>
                  <div className="text-sm text-sfblue-800">
                    Proposed On:{" "}
                    {new Date(start.timestamp).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="flex items-center space-x-4">
            <div className="text-sm text-green-500">{votesFor.weight}</div>
            <div className="relative w-full">
              <div className="overflow-hidden h-2 text-xs flex rounded bg-green-200">
                <div
                  style={{ width: `${percentageFor}%` }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"
                ></div>
              </div>
            </div>
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="flex items-center space-x-4">
            <div className="text-sm text-red-500">{votesAgainst.weight}</div>
            <div className="relative w-full">
              <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                <div
                  style={{ width: `${percentageAgainst}%` }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-red-500"
                ></div>
              </div>
            </div>
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap flex flex-col justify-end items-end">
          <div className="text-md font-semibold text-gray-900 text-right">
            {totalVotes}
          </div>
          <div className="text-xs text-gray-500 text-right">
            {totalAddresses} addresses
          </div>
        </td>
      </tr>
    );
  }

  return (
    <Layout>
      <CardHeader title="Proposals" />
      <table className="min-w-full divide-y divide-sfblue-500 mx-2 -mt-4">
        <thead>
          <tr>
            <th className="py-3 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider">
              Proposal
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider">
              Votes for
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider">
              Votes against
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider flex flex-col justify-end items-end">
              Total votes
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-sfblue-500">
          {proposals.slice(0, 5).map((proposal) => (
            <ProposalRow key={proposal.id} proposal={proposal} />
          ))}
        </tbody>
      </table>
    </Layout>
  );
}
