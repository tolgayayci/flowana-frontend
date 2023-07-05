import useRecentIssues from "@/models/github/useRecentIssues";
export default function RecentIssues() {
  const { recentIssues } = useRecentIssues("polkadot");

  return (
    <div>
      <h1>Recent Issues</h1>
      {JSON.stringify(recentIssues, null, 2)}
    </div>
  );
}
