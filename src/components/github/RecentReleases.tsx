import useRecentReleases from "@/models/github/useRecentReleases";
export default function RecentReleases() {
  const { recentReleases } = useRecentReleases("polkadot");

  return (
    <div>
      <h1>Recent Releases</h1>
      {JSON.stringify(recentReleases, null, 2)}
    </div>
  );
}
