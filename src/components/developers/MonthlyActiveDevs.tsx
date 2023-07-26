// Hooks
import useDevelopersMonthlyActiveDevs from "@/models/developers/useDevelopersMonthlyActiveDevs";

// Models and Utils
import Layout from "@/modules/Card/Layout/Layout";
import CardHeader from "@/modules/Card/Header/Header";

export default function MonthlyActiveDevs() {
  const { monthlyActiveDevs, isLoading } = useDevelopersMonthlyActiveDevs();

  return (
    <Layout>
      <CardHeader title="Developers Monthly Active Devs" />
      {JSON.stringify(monthlyActiveDevs)}
    </Layout>
  );
}
