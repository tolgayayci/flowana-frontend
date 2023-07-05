import useParticipation from "@/models/github/useParticipation";
export default function Participation() {
  const { participation } = useParticipation("polkadot");

  return (
    <div>
      <h1>Participation</h1>
      {JSON.stringify(participation, null, 2)}
    </div>
  );
}
