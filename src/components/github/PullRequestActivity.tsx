import usePullRequestActivity from "@/models/github/usePullRequestActivity";
export default function PullRequestActivity() {
  const { pullRequestActivity } = usePullRequestActivity("polkadot");

  return (
    <div>
      <h1>Pull Request Activity</h1>
      {JSON.stringify(pullRequestActivity, null, 2)}
    </div>
  );
}
