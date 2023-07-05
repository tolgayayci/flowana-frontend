import useMostActiveIssues from "@/models/github/useMostActiveIssues";
export default function MostActiveIssues() {
  const { mostActiveIssues } = useMostActiveIssues("polkadot");

  return (
    <div>
      <h1>Most Active Issues</h1>
      {JSON.stringify(mostActiveIssues, null, 2)}
    </div>
  );
}
