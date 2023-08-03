// Hooks
import useDevelopersTotalCommits from "@/models/developers/useDevelopersTotalCommits";

// Models and Utils
import Layout from "@/modules/Card/Layout/Layout";
import InfoCardLoader from "@/modules/Loaders/developers/InfoCardLoader";

export default function TotalCommits() {
  const { totalCommits, isLoading } = useDevelopersTotalCommits();

  if (isLoading) {
    return <InfoCardLoader isLoading={isLoading} element={null} />;
  }

  return (
    <Layout>
      <div className="text-xl font-bold text-black-500 mb-2 truncate">
        Total Commits
      </div>
      <div className="text-3xl font-bold text-blue-500 mb-2">
        {totalCommits?.count}
      </div>
      <div className="text-gray-600 text-xs">{totalCommits?.subtitle}</div>
    </Layout>
  );
}
