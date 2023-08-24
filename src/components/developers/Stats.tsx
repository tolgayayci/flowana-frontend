// Hooks
import useDevelopersFullTime from "@/models/developers/useDevelopersFullTime";
import useDevelopersMonthlyActiveDevs from "@/models/developers/useDevelopersMonthlyActiveDevs";
import useDevelopersTotalCommits from "@/models/developers/useDevelopersTotalCommits";
import useDevelopersTotalRepos from "@/models/developers/useDevelopersTotalRepos";

// Models and Utils
import Layout from "@/modules/Card/Layout/Layout";
import CardHeader from "@/modules/Card/Header/Header";
import CardLoader from "@/modules/CardLoader/CardLoader";
import NoData from "@/modules/NoData/NoData";

export default function Stats() {
  const { fullTime, isLoading: isLoadingFullTime } = useDevelopersFullTime();
  const { monthlyActiveDevs, isLoading: isLoadingMonthlyActiveDevs } =
    useDevelopersMonthlyActiveDevs();
  const { totalCommits, isLoading: isLoadingTotalCommits } =
    useDevelopersTotalCommits();
  const { totalRepos, isLoading: isLoadingTotalRepos } =
    useDevelopersTotalRepos();

  if (
    isLoadingFullTime ||
    isLoadingMonthlyActiveDevs ||
    isLoadingTotalCommits ||
    isLoadingTotalRepos
  )
    return (
      <CardLoader element={<CardHeader title="Developer Report Stats" />} />
    );

  if (!fullTime || !monthlyActiveDevs || !totalCommits || !totalRepos)
    return (
      <NoData
        element={<CardHeader title="Developer Report Stats" />}
        message=""
      />
    );

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
      <CardHeader title="Developer Report Stats" />
      <div className="grid grid-cols-4 gap-5">
        <StatItem title="Full Time Devs" count={fullTime.count} />
        <StatItem title="Monthly Active Devs" count={monthlyActiveDevs.count} />
        <StatItem title="Total Commits" count={totalCommits.count} />
        <StatItem title="Total Repos" count={totalRepos.count} />
      </div>
    </Layout>
  );
}
