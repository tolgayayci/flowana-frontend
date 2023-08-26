import { useState } from "react";

// Hooks
import useDelegates from "@/models/governance/useDelegates";

// Models and Utils
import Layout from "@/modules/Card/Layout/Layout";
import CardHeader from "@/modules/Card/Header/Header";
import ListLoader from "@/modules/Loaders/github/ListLoader";
import NoListData from "@/modules/NoData/NoListData";
import { formatDistanceToNow } from "@/utils/functions";

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
            selectedInterval={selectedInterval}
            setSelectedInterval={setSelectedInterval}
            intervals={sortBy}
          />
        }
      />
    );

  return (
    <Layout>
      <CardHeader
        title="Delegates"
        selectedInterval={selectedInterval}
        setSelectedInterval={setSelectedInterval}
        intervals={sortBy}
      />
      {JSON.stringify(delegates)}
    </Layout>
  );
}
