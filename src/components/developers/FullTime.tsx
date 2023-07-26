// Hooks
import useDevelopersFullTime from "@/models/developers/useDevelopersFullTime";

// Models and Utils
import Layout from "@/modules/Card/Layout/Layout";
import CardHeader from "@/modules/Card/Header/Header";

export default function FullTime() {
  const { fullTime, isLoading } = useDevelopersFullTime();

  return (
    <Layout>
      <CardHeader title="Developers Full Time" />
      {JSON.stringify(fullTime)}
    </Layout>
  );
}
