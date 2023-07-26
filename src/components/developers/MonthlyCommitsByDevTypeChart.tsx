// Hooks
import useDevelopersMonthlyCommitsByDevTypeChart from "@/models/developers/useDevelopersMonthlyCommitsByDevTypeChart";

// Models and Utils
import Layout from "@/modules/Card/Layout/Layout";
import CardHeader from "@/modules/Card/Header/Header";

export default function MonthlyCommitsByDevTypeChart() {
  const { monthlyCommitsByDevTypeChart, isLoading } =
    useDevelopersMonthlyCommitsByDevTypeChart();

  return (
    <Layout>
      <CardHeader title="Developers Monthly Commits By Dev Type Chart" />
      {JSON.stringify(monthlyCommitsByDevTypeChart)}
    </Layout>
  );
}
