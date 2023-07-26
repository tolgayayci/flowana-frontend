// Hooks
import useDevelopersDevTypeTable from "@/models/developers/useDevelopersDevTypeTable";

// Models and Utils
import Layout from "@/modules/Card/Layout/Layout";
import CardHeader from "@/modules/Card/Header/Header";

export default function DevTypeTable() {
  const { devTypeTable, isLoading } = useDevelopersDevTypeTable();

  return (
    <Layout>
      <CardHeader title="Developer Type Table" />
      {JSON.stringify(devTypeTable)}
    </Layout>
  );
}
