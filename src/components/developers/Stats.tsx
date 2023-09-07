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
      <CardLoader
        element={
          <CardHeader
            title="Developer Overview"
            tooltip="Dive into the pulse of developer ecosystem. Displays key insights on developer and repository activities."
          />
        }
      />
    );

  if (!fullTime || !monthlyActiveDevs || !totalCommits || !totalRepos)
    return (
      <NoData
        element={
          <CardHeader
            title="Developer Overview"
            tooltip="Dive into the pulse of developer ecosystem. Displays key insights on developer and repository activities."
          />
        }
        message=""
      />
    );

  function StatItem({
    title,
    count,
    date,
  }: {
    title: string;
    count: number;
    date: string;
  }) {
    const formattedCount = new Intl.NumberFormat(undefined, {}).format(count);

    return (
      <div className="col-span-1">
        <div className="p-5 pl-6 border border-sfblack rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300">
          <div className="text-side-500 text-medium mb-5">{title}</div>
          <div className="text-5xl font-bold text-niceblack mb-3">
            {formattedCount}
          </div>
          <div className="inline-block bg-side border-2 border-main text-main text-xs font-semibold rounded-2xl px-2 py-0.5">
            Last Update: {date.split(" ")[2]}
          </div>
        </div>
      </div>
    );
  }

  return (
    <Layout>
      <CardHeader
        title="Developer Overview"
        tooltip="Dive into the pulse of developer ecosystem. Displays key insights on developer and repository activities."
      />{" "}
      <div className="grid grid-cols-4 gap-5">
        <StatItem
          title="Full Time Devs"
          count={fullTime.count}
          date={fullTime.subtitle}
        />
        <StatItem
          title="Monthly Active Devs"
          count={monthlyActiveDevs.count}
          date={monthlyActiveDevs.subtitle}
        />
        <StatItem
          title="Total Commits"
          count={totalCommits.count}
          date={totalCommits.subtitle}
        />
        <StatItem
          title="Total Repos"
          count={totalRepos.count}
          date={totalRepos.subtitle}
        />
      </div>
    </Layout>
  );
}
