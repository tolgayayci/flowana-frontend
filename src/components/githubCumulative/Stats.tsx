//Hooks
import useCumulativeStats from "@/models/githubCumulative/useCumulativeStats";

// Models and Utils
import Layout from "@/modules/Card/Layout/Layout";
import CardHeader from "@/modules/Card/Header/Header";
import CardLoader from "@/modules/CardLoader/CardLoader";
import NoData from "@/modules/NoData/NoData";

export default function Stats() {
  const { stats, isLoading } = useCumulativeStats();

  if (isLoading)
    return (
      <CardLoader
        element={
          <CardHeader
            title="Protocol Overview"
            tooltip="Provides comprehensive overview of various cumulative statistics related to the protocol."
          />
        }
      />
    );

  if (!stats)
    return (
      <NoData
        element={
          <CardHeader
            title="Protocol Overview"
            tooltip="Provides comprehensive overview of various cumulative statistics related to the protocol."
          />
        }
        message=""
      />
    );

  function StatItem({ title, count }: { title: string; count: number }) {
    const formattedCount = new Intl.NumberFormat(undefined, {}).format(count);

    return (
      <div className="col-span-1">
        <div className="md:p-5 p-4 pl-6 border border-sfblack rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300">
          <div className="text-side-500 text-medium md:mb-5 mb-2 truncate">
            {title}
          </div>
          <div className="xl:text-3xl 2xl:text-4xl text-xl font-bold text-niceblack md:mb-3">
            <div>{formattedCount}</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Layout>
      <CardHeader
        title="Protocol Overview"
        tooltip="Provides comprehensive overview of various cumulative statistics related to the protocol."
      />
      <div className="max-h-[calc(5*5.6rem)] md:max-h-[calc(5*6.4rem)] grid grid-cols-1 md:grid-cols-4 gap-5 pr-0.5 md:pr-0 overflow-y-auto scrollbar scrollbar-thumb-indigo-500 scrollbar-track-indigo-100 overflow-x-hidden">
        {" "}
        <StatItem
          title="Branch Commits"
          count={stats.default_branch_commit_count}
        />
        <StatItem title="Comment Commits" count={stats.commit_comment_count} />
        <StatItem title="Pull Requests" count={stats.pull_request_count} />
        <StatItem title="Stargazers" count={stats.stargazers_count} />
        <StatItem title="Issues" count={stats.issue_count} />
        <StatItem title="Watchers" count={stats.watcher_count} />
        <StatItem title="Environments" count={stats.environment_count} />
        <StatItem title="Forks" count={stats.fork_count} />
      </div>
    </Layout>
  );
}
