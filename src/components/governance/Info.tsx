// Hooks
import useInfo from "@/models/governance/useInfo";

// Models and Utils
import Layout from "@/modules/Card/Layout/Layout";
import CardHeader from "@/modules/Card/Header/Header";

export default function Info() {
  const { info, isLoading } = useInfo();

  return (
    <Layout>
      <div className="bg-white rounded-lg p-6">
        <div className="flex items-center justify-start">
          <img
            src={info?.organization.visual.icon}
            alt={info?.organization.name}
            className="w-16 h-16 mr-4 rounded-full"
          />
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">
              {info?.organization.name}
            </h2>
            <p className="text-gray-600 text-sm">
              {info?.organization.description}
            </p>
          </div>
        </div>
        <hr className="my-4" />
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center">
            <span className="bg-green-500 text-white px-3 py-1 rounded-md mr-2">
              {info?.stats.tokens.delegatedVotingPower.toFixed(2)}
            </span>
            <p className="text-gray-800">Delegated Voting Power</p>
          </div>
          <div className="flex items-center">
            <span className="bg-blue-500 text-white px-3 py-1 rounded-md mr-2">
              {info?.stats.proposals.active}
            </span>
            <p className="text-gray-800">Active Proposals</p>
          </div>
          <div className="flex items-center">
            <span className="bg-yellow-500 text-white px-3 py-1 rounded-md mr-2">
              {info?.stats.tokens.voters}
            </span>
            <p className="text-gray-800">Total Voters</p>
          </div>
          <div className="flex items-center">
            <span className="bg-red-500 text-white px-3 py-1 rounded-md mr-2">
              {info?.stats.proposals.total}
            </span>
            <p className="text-gray-800">Total Proposals</p>
          </div>
        </div>
        <div className="flex justify-between mt-4">
          <a
            href={info?.organization.website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            Learn More
          </a>
          <a
            href={info?.organization.tally_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            Tally Governance
          </a>
        </div>
      </div>
    </Layout>
  );
}
