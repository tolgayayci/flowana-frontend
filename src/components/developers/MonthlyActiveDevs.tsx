// Hooks
import useDevelopersMonthlyActiveDevs from "@/models/developers/useDevelopersMonthlyActiveDevs";

// Models and Utils
import Layout from "@/modules/Card/Layout/Layout";
import InfoCardLoader from "@/modules/Loaders/developers/InfoCardLoader";

export default function MonthlyActiveDevs() {
  const { monthlyActiveDevs, isLoading } = useDevelopersMonthlyActiveDevs();

  if (isLoading) {
    return <InfoCardLoader isLoading={isLoading} element={null} />;
  }

  return (
    <Layout>
      <div className="text-xl font-bold text-black-500 mb-2 truncate">
        Monthly Active Devs
      </div>
      <div className="text-3xl font-bold text-blue-500 mb-2">
        {monthlyActiveDevs?.count}
      </div>
      <div className="text-gray-600 text-xs">{monthlyActiveDevs?.subtitle}</div>
    </Layout>
  );
}
