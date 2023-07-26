// Hooks
import useDevelopersTotalCommits from "@/models/developers/useDevelopersTotalCommits";

// Models and Utils
import Layout from "@/modules/Card/Layout/Layout";
import CardHeader from "@/modules/Card/Header/Header";

export default function TotalCommits() {
  const { totalCommits, isLoading } = useDevelopersTotalCommits();

  return (
    <Layout>
      <CardHeader title="Developers Total Commits" />
      {JSON.stringify(totalCommits)}
    </Layout>
  );
}
