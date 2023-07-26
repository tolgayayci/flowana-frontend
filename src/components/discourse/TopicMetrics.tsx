// Hooks
import useDiscourseTopicMetrics from "@/models/discourse/useDiscourseTopicMetrics";

// Models and Utils
import Layout from "@/modules/Card/Layout/Layout";
import CardHeader from "@/modules/Card/Header/Header";

export default function TopicMetrics() {
  const { discourseTopicMetrics, isLoading } = useDiscourseTopicMetrics();

  return (
    <Layout>
      <CardHeader title="Discourse Topic Metrics" />
      {JSON.stringify(discourseTopicMetrics)}
    </Layout>
  );
}
