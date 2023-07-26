import ReactECharts from "echarts-for-react";

// Hooks
import useRecentStargazingActivity from "@/models/github/useRecentStargazingActivity";

// Modules and Utils
import Layout from "@/modules/Card/Layout/Layout";
import CardHeader from "@/modules/Card/Header/Header";

export default function RecentStargazingActivity() {
  const { recentStargazingActivity, isLoading } = useRecentStargazingActivity();

  if (!recentStargazingActivity) return;

  const option = {
    xAxis: {
      type: "category",
      data: recentStargazingActivity["xAxis"]["data"],
    },
    yAxis: {
      type: "value",
    },
    series: recentStargazingActivity["series"],
    renderer: "svg",
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
        crossStyle: {
          color: "#999",
        },
      },
    },
  };

  return (
    <Layout>
      <CardHeader title="Recent Stargazing Activity" />
      <ReactECharts
        option={option}
        showLoading={isLoading}
        style={{ minHeight: "350px", width: "100%" }}
        notMerge={true}
      />
    </Layout>
  );
}
