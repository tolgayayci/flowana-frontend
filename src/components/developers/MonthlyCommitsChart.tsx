// Hooks
import useDevelopersMonthlyCommitsChart from "@/models/developers/useDevelopersMonthlyCommitsChart";

// Models and Utils
import Layout from "@/modules/Card/Layout/Layout";
import CardHeader from "@/modules/Card/Header/Header";

export default function MonthlyCommitsChart() {
  const { monthlyCommitsChart, isLoading } = useDevelopersMonthlyCommitsChart();

  return (
    <Layout>
      <CardHeader title="Developers Monthly Commits Chart" />
      {JSON.stringify(monthlyCommitsChart)}
    </Layout>
  );
}
