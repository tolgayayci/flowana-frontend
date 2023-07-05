import useRecentPullRequests from "@/models/github/useRecentPullRequests";
export default function RecentPullRequests() {
  const { recentPullRequests } = useRecentPullRequests("polkadot");

  return (
    <div>
      <h1>Recent Pull Requests</h1>
      {JSON.stringify(recentPullRequests, null, 2)}
    </div>
  );
}
