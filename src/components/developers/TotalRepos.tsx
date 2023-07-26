// Hooks
import useDevelopersTotalRepos from "@/models/developers/useDevelopersTotalRepos";

// Models and Utils
import Layout from "@/modules/Card/Layout/Layout";
import CardHeader from "@/modules/Card/Header/Header";

export default function TotalRepos() {
  const { totalRepos, isLoading } = useDevelopersTotalRepos();

  return (
    <Layout>
      <CardHeader title="Developers Total Repositories" />
      {JSON.stringify(totalRepos)}
    </Layout>
  );
}
