import useRecentStargazingActivity from "@/models/github/useRecentStargazingActivity";
export default function RecentStargazingActivity() {
  const { recentStargazingActivity } = useRecentStargazingActivity("polkadot");

  return (
    <div>
      <h1>StargazinActivity Info</h1>
      {JSON.stringify(recentStargazingActivity, null, 2)}
    </div>
  );
}
