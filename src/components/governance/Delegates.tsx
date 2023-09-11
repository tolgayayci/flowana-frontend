import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Tooltip } from "react-tooltip";

// Hooks
import useDelegates from "@/models/governance/useDelegates";

// Models and Utils
import Layout from "@/modules/Card/Layout/Layout";
import CardHeader from "@/modules/Card/Header/Header";
import ListLoader from "@/modules/Loaders/github/ListLoader";
import NoListData from "@/modules/NoData/NoListData";

import { FaWallet } from "react-icons/fa";

const sortBy = [
  { name: "Created", value: "CREATED" },
  { name: "Updated", value: "UPDATED" },
  { name: "Tokens Owned", value: "TOKENS_OWNED" },
  { name: "Voting Weight", value: "VOTING_WEIGHT" },
  { name: "Delegations", value: "DELEGATIONS" },
  { name: "Has ENS", value: "HAS_ENS" },
  { name: "Has Delegate Statement", value: "HAS_DELEGATE_STATEMENT" },
  { name: "Proposals Created", value: "PROPOSALS_CREATED" },
  { name: "Votes Cast", value: "VOTES_CAST" },
];

export default function Delegates() {
  const [selectedInterval, setSelectedInterval] = useState(sortBy[3]);

  const { delegates, isLoading } = useDelegates(selectedInterval.value);

  if (isLoading)
    return (
      <ListLoader
        isLoading={isLoading}
        element={
          <CardHeader
            title="Delegates"
            tooltip="Displays a comprehensive list of delegate profiles within the protocol's governance system. Each delegate's data showcases their participation metrics, voting power, and associated account details."
            selectedInterval={selectedInterval}
            setSelectedInterval={setSelectedInterval}
            intervals={sortBy}
          />
        }
      />
    );

  if (!delegates)
    return (
      <NoListData
        element={
          <CardHeader
            title="Delegates"
            tooltip="Displays a comprehensive list of delegate profiles within the protocol's governance system. Each delegate's data showcases their participation metrics, voting power, and associated account details."
            selectedInterval={selectedInterval}
            setSelectedInterval={setSelectedInterval}
            intervals={sortBy}
          />
        }
      />
    );

  function shortenAddress(address: string) {
    if (!address || address.length < 10) {
      return "Invalid address";
    }
    const start = address.substring(0, 6);
    const end = address.substring(address.length - 4);
    return `${start}...${end}`;
  }

  function getDelegateName(name) {
    if (!name || name.startsWith("0x")) {
      return "Unknown Name";
    }
    return name;
  }

  function DelegateCard({ delegate }) {
    return (
      <Link href={delegate.account.tally_url || "#"} target="_blank">
        <div className="col-span-1 border p-4 rounded-md h-full">
          {" "}
          <div className="flex items-center mb-4 flex-col space-y-1">
            <Image
              unoptimized
              src={delegate.account.picture || "/compound-logo.png"}
              alt="Delegate"
              className="rounded-full w-20 h-20 mb-2"
              width={35}
              height={35}
            />
            <h3 className="text-lg font-bold">
              {getDelegateName(delegate.account.name)}
            </h3>
            <p className="text-sm font-semibold border border-indigo-500 text-indigo-800 bg-indigo-300 py-0.5 px-2 rounded-xl inline-flex items-center">
              <FaWallet className="mr-2" />
              {shortenAddress(delegate.account.address)}
            </p>
          </div>
          {/* <div className="flex justify-between space-x-2">
            <BadgeWithTooltip
              text={`Vote Count: ${delegate.participation.stats.voteCount}`}
              tooltipId="vote-count"
              tooltipContent="Vote Count"
              tooltipPlace="top"
              icon={<FaWallet className="mr-2" />}
            />
            <BadgeWithTooltip
              text={`Delegations: ${delegate.participation.stats.delegations.total}`}
              tooltipId="delegations"
              tooltipContent="Delegations"
              tooltipPlace="top"
              icon={<FaWallet className="mr-2" />}
            />
            <BadgeWithTooltip
              text={`Votes Cast: ${delegate.participation.stats.voteCount}`}
              tooltipId="votes-cast"
              tooltipContent="Votes Cast"
              tooltipPlace="top"
              icon={<FaWallet className="mr-2" />}
            />
          </div> */}
        </div>
      </Link>
    );
  }

  function BadgeWithTooltip({
    text,
    tooltipId,
    tooltipContent,
    tooltipPlace,
    icon,
  }) {
    return (
      <>
        <a
          data-tooltip-id={tooltipId}
          data-tooltip-content={tooltipContent}
          data-tooltip-place={tooltipPlace}
          className="items-center justify-between mt-1 bg-side border-2 border-main text-main px-3 py-0.5 rounded-xl text-sm font-semibold inline-flex w-1/2"
        >
          {icon}
          {text}
        </a>
        <Tooltip id={tooltipId} place={tooltipPlace}>
          {tooltipContent}
        </Tooltip>
      </>
    );
  }

  return (
    <Layout>
      <CardHeader
        title="Delegates"
        tooltip="Displays a comprehensive list of delegate profiles within the protocol's governance system. Each delegate's data showcases their participation metrics, voting power, and associated account details."
        selectedInterval={selectedInterval}
        setSelectedInterval={setSelectedInterval}
        intervals={sortBy}
      />
      <div className="grid grid-cols-3 gap-4">
        {delegates.slice(0, 6).map((delegate) => (
          <DelegateCard key={delegate.account.id} delegate={delegate} />
        ))}
      </div>
    </Layout>
  );
}
