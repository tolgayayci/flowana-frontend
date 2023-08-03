// Hooks
import useDevelopersTotalRepos from "@/models/developers/useDevelopersTotalRepos";

// Models and Utils
import Layout from "@/modules/Card/Layout/Layout";
import InfoCardLoader from "@/modules/Loaders/developers/InfoCardLoader";

export default function TotalRepos() {
  const { totalRepos, isLoading } = useDevelopersTotalRepos();

  if (isLoading) {
    return <InfoCardLoader isLoading={isLoading} element={null} />;
  }

  return (
    <Layout>
      <div className="text-xl font-bold text-black-500 mb-2 truncate">
        Total Repositories
      </div>
      <div className="text-3xl font-bold text-blue-500 mb-2">
        {totalRepos?.count}
      </div>
      <div className="text-gray-600 text-xs">{totalRepos?.subtitle}</div>
    </Layout>
  );
}
