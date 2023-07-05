import useCommitActivity from "@/models/github/useCommitActivity";

export default function CommitActivity() {
  const { commitActivity } = useCommitActivity("polkadot");

  return (
    <div>
      <h1>Commit Activity</h1>
      {JSON.stringify(commitActivity, null, 2)}
    </div>
  );
}
