import ReactECharts from "echarts-for-react";

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
      {/* <ReactECharts
        option={option}
        showLoading={isLoading}
        style={{ minHeight: "350px", width: "100%" }}
        notMerge={true}
      /> */}
    </Layout>
  );
}
