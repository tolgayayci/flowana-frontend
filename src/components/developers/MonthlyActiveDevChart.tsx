// Hooks
import useDevelopersMonthlyActiveDevChart from "@/models/developers/useDevelopersMonthlyActiveDevChart";

// Models and Utils
import Layout from "@/modules/Card/Layout/Layout";
import CardHeader from "@/modules/Card/Header/Header";

export default function MonthlyActiveDevChart() {
  const { monthlyActiveDevChart, isLoading } =
    useDevelopersMonthlyActiveDevChart();

  return (
    <Layout>
      <CardHeader title="Developers Monthly Active Dev Chart" />
      {JSON.stringify(monthlyActiveDevChart)}
    </Layout>
  );
}
