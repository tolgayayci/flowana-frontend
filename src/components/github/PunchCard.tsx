import usePunchCard from "@/models/github/usePunchCard";
export default function PunchCard() {
  const { punchCard } = usePunchCard("polkadot");

  return (
    <div>
      <h1>Punch Card</h1>
      {JSON.stringify(punchCard, null, 2)}
    </div>
  );
}
