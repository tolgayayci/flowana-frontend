import useContributors from "@/models/github/useContributors";
import CardLoader from "@/modules/CardLoader/CardLoader";

export default function Contributors() {
  const { contributors, isLoading } = useContributors();

  if (isLoading) return <CardLoader />;
  if (!contributors) return;

  return (
    <div className="border-2 border-indigo-300 rounded-lg py-12 flex flex-col items-center md:flex-row"></div>
  );
}
