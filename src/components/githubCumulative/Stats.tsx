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
      <div className="p-5 pl-6 border-2 border-sfgreen-800 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
        <div className="text-sfgreen-800 text-medium mb-5">{title}</div>
        <div className="text-5xl font-bold text-sfblue-800 mb-3">
          <div>{formattedCount}</div>
        </div>
        {/* <div className="inline-block text-sfblack text-xs font-semibold bg-sfred-500 border-2 border-sfred-800 rounded-2xl px-2 py-0.5">
          {count}
        </div> */}
      </div>
    </div>
  );
}

export default function Stats() {
  const { stats, isLoading } = useCumulativeStats();

  if (isLoading) return <CardLoader element={<CardHeader title="Stats" />} />;

  if (!stats)
    return <NoData element={<CardHeader title="Stats" />} message="" />;

  return (
    <Layout>
      <CardHeader title="Stats" />
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
