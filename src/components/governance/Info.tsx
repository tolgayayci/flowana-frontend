import Image from "next/image";

// Hooks
import useInfo from "@/models/governance/useInfo";

// Models and Utils
import Layout from "@/modules/Card/Layout/Layout";
import CardHeader from "@/modules/Card/Header/Header";
import CardLoader from "@/modules/CardLoader/CardLoader";
import NoData from "@/modules/NoData/NoData";

export default function Info() {
  const { info, isLoading } = useInfo();

  if (isLoading) {
    return <CardLoader element />;
  }

  if (!info) {
    return <NoData element message="" />;
  }

  function StatItem({ title, count }: { title: string; count: number }) {
    const formattedCount = new Intl.NumberFormat(undefined, {}).format(count);

    return (
      <div className="col-span-1">
        <div className="p-5 pl-6 border-2 border-sfgreen-800 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
          <div className="text-sfgreen-800 text-medium mb-3">{title}</div>
          <div className="text-5xl font-bold text-sfblue-800 mb-3">
            {formattedCount}
          </div>
          <div className="inline-block text-sfblack text-xs font-semibold bg-sfred-500 border-2 border-sfred-800 rounded-2xl px-2 py-0.5">
            {count}
          </div>
        </div>
      </div>
    );
  }

  return (
    <Layout>
      <CardHeader title={info.organization.name + " Governance"} />
      <div className="bg-white rounded flex items-center justify-between">
        {/* First row: Image and organization name */}
        <div className="flex items-center justify-center mb-4">
          <Image
            src={info.organization.visual.icon}
            alt={info.organization.name}
            className="w-16 h-16 mr-4 rounded-full"
            width={50}
            height={50}
          />
          <h1 className="text-2xl font-semibold">{info.organization.name}</h1>
        </div>

        {/* Second row: Description */}
        <p className="mb-4 ml-24 line-clamp-2 text-md max-w-2xl">
          {info.organization.description}
        </p>

        {/* Third row: Web svg icon and website name */}
        <div className="flex items-center mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M10 2a8 8 0 100 16 8 8 0 000-16zM8.6 14.6a7 7 0 01-1.2-1.8A16.03 16.03 0 014 10c0-.6.1-1.2.3-1.7.07-.2.15-.4.2-.7a7 7 0 011.4-2.4 7 7 0 012.4-1.4 6.96 6.96 0 011.4-.2c.3.05.6.1.8.2.5.2 1 .4 1.4.7.4.3.8.6 1.1 1 .4.3.7.7 1 1.1.3.4.6.8.8 1.3.2.4.4.9.5 1.3.1.4.2.9.2 1.3 0 .5 0 .9-.1 1.4a7 7 0 01-1.7 2.9 7 7 0 01-2.9 1.8zm-.6-10c-.2.2-.5.4-.7.6a5.96 5.96 0 00-1.1 1.2 6 6 0 00-.7 1.5 15.04 15.04 0 00-.2 1.7c0 .6.07 1.2.2 1.7.1.5.3 1 .5 1.5.2.4.4.9.7 1.3a6 6 0 002.4 2.4 5.98 5.98 0 001.3.7 5.94 5.94 0 001.5.5c.5.1 1 .2 1.5.2.6 0 1.2-.07 1.7-.2a5.96 5.96 0 002.8-1.7 5.98 5.98 0 001.5-1.7 6 6 0 001.1-2.2 6.1 6.1 0 00.2-1.7 6.07 6.07 0 00-.2-1.7 6 6 0 00-.7-1.6 6 6 0 00-1.1-1.2 6 6 0 00-1.6-.7 5.94 5.94 0 00-1.7-.2 6.07 6.07 0 00-1.7.2 5.96 5.96 0 00-1.6.7 6 6 0 00-1.2 1.1zM10 12a2 2 0 100-4 2 2 0 000 4z"
              clipRule="evenodd"
            />
          </svg>
          <a
            href={info.organization.website}
            className="text-blue-500 hover:underline"
          >
            {new URL(info.organization.website).hostname}
          </a>
        </div>
      </div>
      <div>
        {/* Fourth row: Chain name, token name and total supply */}
        <div className="flex mb-4 space-x-4">
          <StatItem title="Chain" count={info.chainId} />
          <span className="px-2 py-1 bg-gray-200 rounded-full text-xs">
            {info.chainId}
          </span>
          <StatItem title="Token" count={info.tokens[0].symbol} />
          <span className="px-2 py-1 bg-gray-200 rounded-full text-xs">
            {info.tokens[0].symbol}
          </span>
          <StatItem title="Total Supply" count={info.stats.tokens.supply} />
          <span className="px-2 py-1 bg-gray-200 rounded-full text-xs">
            Supply: {info.stats.tokens.supply}
          </span>
        </div>

        {/* Fifth row: Proposals, holders, and voters */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col items-center">
            <span className="font-bold text-xl">
              {info.stats.proposals.total}
            </span>{" "}
            Proposals
          </div>
          <div className="flex flex-col items-center">
            <span className="font-bold">{info.stats.tokens.owners}</span>{" "}
            Holders
          </div>
          <div className="flex flex-col items-center">
            <span className="font-bold">{info.stats.tokens.voters}</span> Voters
          </div>
        </div>
      </div>
    </Layout>
  );
}
