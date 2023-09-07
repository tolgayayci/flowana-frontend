//Hooks
import useCumulativeStats from "@/models/githubCumulative/useCumulativeStats";

// Models and Utils
import Layout from "@/modules/Card/Layout/Layout";
import CardHeader from "@/modules/Card/Header/Header";
import CardLoader from "@/modules/CardLoader/CardLoader";
import NoData from "@/modules/NoData/NoData";

function StatItem({ title, count }: { title: string; count: number }) {
  const formattedCount = new Intl.NumberFormat(undefined, {}).format(count);

  return (
    <div className="col-span-1">
      <div className="p-5 pl-6 border border-sfblack rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300">
        <div className="text-sfgreen-800 text-medium mb-5">{title}</div>
        <div className="text-5xl font-bold text-[#333333] mb-3">
          <div>{formattedCount}</div>
        </div>
      </div>
    </div>
  );
}

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

  return (
    <Layout>
      <CardHeader
        title="Protocol Overview"
        tooltip="Provides comprehensive overview of various cumulative statistics related to the protocol."
      />
      <div className="grid grid-cols-4 gap-5">
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
