import useIssueCount from "@/models/github/useIssueCount";
export default function IssueCount() {
  const { issueCount } = useIssueCount("polkadot");

  return (
    <div>
      <h1>Issue Count</h1>
      {JSON.stringify(useIssueCount, null, 2)}
    </div>
  );
}
