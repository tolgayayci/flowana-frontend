import useHealthScore from "@/models/github/useHealthScore";
import CardLoader from "@/modules/CardLoader/CardLoader";

export default function HealthScore() {
  const { healthScore, isLoading } = useHealthScore("polkadot");

  // if (isLoading) return <CardLoader />;
  // if (!healthScore) return;

  return (
    <div className="border-2 border-indigo-300 rounded-lg py-12 flex flex-col items-center md:flex-row"></div>
  );
}
