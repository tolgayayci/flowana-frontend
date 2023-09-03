import Layout from "@/modules/Card/Layout/Layout";
import CardHeader from "@/modules/Card/Header/Header";
import CardLoader from "@/modules/CardLoader/CardLoader";
import NoData from "@/modules/NoData/NoData";

// Hooks
import useContributors from "@/models/github/useContributors";

export default function Contributors() {
  const { contributors, isLoading } = useContributors();

  if (isLoading)
    return (
      <CardLoader
        element={
          <CardHeader
            title="Top Contributors"
            tooltip="Discover the most active contributors to the repository."
          />
        }
      />
    );

  if (!contributors)
    return (
      <NoData
        element={
          <CardHeader
            title="Top Contributors"
            tooltip="Discover the most active contributors to the repository."
          />
        }
        message=""
      />
    );

  return (
    <Layout>
      <CardHeader
        title="Top Contributors"
        tooltip="Discover the most active contributors to the repository."
      />
    </Layout>
  );
}
