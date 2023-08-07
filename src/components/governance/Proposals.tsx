import Image from "next/image";

// Hooks
import useProposals from "@/models/governance/useProposals";

// Models and Utils
import Layout from "@/modules/Card/Layout/Layout";
import CardHeader from "@/modules/Card/Header/Header";

export default function Proposals() {
  const { proposals, isLoading } = useProposals();

  const getStatusBadgeColor = (status: string) => {
    if (status === "Open") {
      return "bg-green-500";
    } else if (status === "Closed") {
      return "bg-red-500";
    } else if (status === "Merged") {
      return "bg-indigo-500";
    }
    return "";
  };

  return (
    <Layout>
      <CardHeader title="Proposals" />
      <ul className="space-y-3">
        {proposals?.map((proposal) => (
          <li
            key={proposal.id}
            className="bg-white rounded-lg shadow-md p-4 transition-transform duration-300 transform hover:scale-105 border-2 border-indigo-600"
          >
            <div className="flex justify-between">
              <div className="flex items-center space-x-2 w-1/2">
                {/* <Image
                    src={proposal.proposer.avatar_url}
                    alt="Avatar"
                    width={52}
                    height={52}
                    className="rounded-full mr-5"
                  /> */}
                <div className="flex-grow min-w-0 max-w-xs">
                  <h3 className="text-base sm:text-md font-semibold truncate">
                    {proposal.title}
                  </h3>
                  <p className="text-gray-500 text-xs sm:text-sm mt-1">
                    Proposer: {proposal.proposer.name} ( @
                    {proposal.proposer.twitter})
                    <span
                      className={`ml-2 px-2 py-1 rounded-full ${getStatusBadgeColor(
                        proposal.statusChanges[0].type
                      )} text-white text-xxs sm:text-xs opacity-75`}
                    >
                      {proposal.statusChanges[0].type}
                    </span>
                  </p>
                </div>
              </div>
              <div className="flex items-center text-xs sm:text-sm w-1/2 justify-end">
                <div className="flex items-center space-x-2">
                  <div className="mr-2 px-2 py-1 bg-blue-200 border-2 border-blue-400 text-blue-700 rounded-md text-xs">
                    Start: {proposal.start.timestamp}
                  </div>
                  <div className="px-2 py-1 bg-indigo-200 border-2 border-indigo-400 text-indigo-700 rounded-md text-xs">
                    End: {proposal.end.timestamp}
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </Layout>
  );
}
