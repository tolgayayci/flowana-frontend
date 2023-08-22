import Link from "next/link";

//Hooks
import useCumulativeStats from "@/models/githubCumulative/useCumulativeStats";

// Models and Utils
import Layout from "@/modules/Card/Layout/Layout";
import CardHeader from "@/modules/Card/Header/Header";
import CardLoader from "@/modules/CardLoader/CardLoader";
import NoData from "@/modules/NoData/NoData";

export default function Stats() {
  const { stats, isLoading } = useCumulativeStats();

  if (isLoading) return <CardLoader element={<CardHeader title="Stats" />} />;

  if (!stats)
    return <NoData element={<CardHeader title="Stats" />} message="" />;

  return (
    <Layout>
      <CardHeader title="Stats" />
      {JSON.stringify(stats)}
    </Layout>
  );
}
