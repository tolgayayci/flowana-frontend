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
    <div className="p-5 pl-6 border-2 border-sfgreen-800 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="text-sfgreen-800 text-medium mb-3">Total Commits</div>
      <div className="text-5xl font-bold text-sfblue-800 mb-3">
        {totalCommits?.count}
      </div>
      <div className="inline-block text-sfblack text-xs font-semibold bg-sfred-500 border-2 border-sfred-800 rounded-2xl px-2 py-0.5">
        {totalCommits?.subtitle}
      </div>
    </div>
  );
}
