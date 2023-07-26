// Hooks
import useDevelopersTotalMonthlyActiveDevChart from "@/models/developers/useDevelopersTotalMonthlyActiveDevChart";

// Models and Utils
import Layout from "@/modules/Card/Layout/Layout";
import CardHeader from "@/modules/Card/Header/Header";

export default function TotalMonthlyActiveDevChart() {
  const { totalMonthlyActiveDevChart, isLoading } =
    useDevelopersTotalMonthlyActiveDevChart();

  return (
    <Layout>
      <CardHeader title="Developers Total Monthly Active Dev Chart" />
      {JSON.stringify(totalMonthlyActiveDevChart)}
    </Layout>
  );
}
