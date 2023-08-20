// Hooks
import useParticipationCount from "@/models/github/useParticipationCount";

// Modules and Utils
import Layout from "@/modules/Card/Layout/Layout";
import CardHeader from "@/modules/Card/Header/Header";
import CardLoader from "@/modules/CardLoader/CardLoader";

export default function ParticipationCount() {
  const { participationCount, isLoading } = useParticipationCount();

  if (isLoading) return <CardLoader />;
  if (!participationCount) return;

  return (
    <Layout>
      <CardHeader title="Participation Count" />
      {JSON.stringify(participationCount)}
    </Layout>
  );
}
