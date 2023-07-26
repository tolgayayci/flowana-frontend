import { useState } from "react";
import ReactECharts from "echarts-for-react";

// Hooks
import usePullRequestActivity from "@/models/github/usePullRequestActivity";

// Modules and Utils
import Layout from "@/modules/Card/Layout/Layout";
import CardHeader from "@/modules/Card/Header/Header";
import CardLoader from "@/modules/CardLoader/CardLoader";

const intervals = [
  { name: "Week", value: "week" },
  { name: "Month", value: "month" },
  { name: "Year", value: "year" },
];

export default function PullRequestActivity() {
  const [selectedInterval, setSelectedInterval] = useState(intervals[1]);
  const { pullRequestActivity, isLoading } = usePullRequestActivity(
    selectedInterval.value
  );

  if (isLoading) return <CardLoader />;
  if (!pullRequestActivity) return;

  const option = {
    tooltip: {
      trigger: "axis",
    },
    legend: {
      data: ["Opened", "Closed"],
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: pullRequestActivity?.xAxis.data,
    },
    yAxis: {
      type: "value",
    },
    series: pullRequestActivity?.series.map((series) => ({
      name: series.name,
      type: "line",
      stack: "total",
      data: series.data,
    })),
  };

  return (
    <Layout>
      <CardHeader
        title="Pull Request Activity"
        selectedInterval={selectedInterval}
        setSelectedInterval={setSelectedInterval}
        intervals={intervals}
      />
      <ReactECharts
        option={option}
        showLoading={isLoading}
        style={{ minHeight: "350px", width: "100%" }}
        notMerge={true}
      />
    </Layout>
  );
}
