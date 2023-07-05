import useRecentCommits from "@/models/github/useRecentCommits";
export default function RecentCommits() {
  const { recentCommits } = useRecentCommits("polkadot");

  return (
    <div>
      <h1>Recent Commits</h1>
      {JSON.stringify(recentCommits, null, 2)}
    </div>
  );
}
