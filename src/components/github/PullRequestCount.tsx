import usePullRequestCount from "@/models/github/usePullRequestCount";
export default function PullRequestCount() {
  const { pullRequestCount } = usePullRequestCount("polkadot");

  return (
    <div>
      <h1>Pull Request Count</h1>
      {JSON.stringify(pullRequestCount, null, 2)}
    </div>
  );
}
