// Hooks
import useDiscourseUserMetrics from "@/models/discourse/useDiscourseUserMetrics";

// Models and Utils
import Layout from "@/modules/Card/Layout/Layout";
import CardHeader from "@/modules/Card/Header/Header";

export default function UserMetrics() {
  const { discourseUserMetrics, isLoading } = useDiscourseUserMetrics();

  return (
    <Layout>
      <CardHeader title="Discourse User Metrics" />
      {JSON.stringify(discourseUserMetrics)}
    </Layout>
  );
}
