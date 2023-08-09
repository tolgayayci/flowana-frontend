// Hooks
import useSafes from "@/models/governance/useSafes";

// Models and Utils
import Layout from "@/modules/Card/Layout/Layout";
import CardHeader from "@/modules/Card/Header/Header";

export default function Safes() {
  const { safes, isLoading } = useSafes();

  return (
    <Layout>
      <CardHeader title="Safes" />
      {JSON.stringify(safes)}
    </Layout>
  );
}
