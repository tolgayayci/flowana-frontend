import useIssueActivity from "@/models/github/useIssueActivity";
export default function IssueActivity() {
  const { issueActivity } = useIssueActivity("polkadot");

  return (
    <div>
      <h1>Issue Activity</h1>
      {JSON.stringify(issueActivity, null, 2)}
    </div>
  );
}
