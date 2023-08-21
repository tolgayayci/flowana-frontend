import Layout from "@/modules/Card/Layout/Layout";
import CardHeader from "@/modules/Card/Header/Header";
import CardLoader from "@/modules/CardLoader/CardLoader";
import NoData from "@/modules/NoData/NoData";

// Hooks
import useContributors from "@/models/github/useContributors";

export default function Contributors() {
  const { contributors, isLoading } = useContributors();

  if (isLoading) return <CardLoader />;
  if (!contributors)
    return <NoData element={<CardHeader title="Contributors" />} />;

  return (
    <Layout>
      <CardHeader title="Contributors" />
    </Layout>
  );
}
