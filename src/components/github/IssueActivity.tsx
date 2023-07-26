import { useState } from "react";
import ReactECharts from "echarts-for-react";

// Hooks
import useIssueActivity from "@/models/github/useIssueActivity";

// Modules and Utils
import Layout from "@/modules/Card/Layout/Layout";
import CardHeader from "@/modules/Card/Header/Header";
import CardLoader from "@/modules/CardLoader/CardLoader";

// Types
import { Interval } from "@/types/general";

const intervals: Interval[] = [
  { name: "Week", value: "week" },
  { name: "Month", value: "month" },
  { name: "Year", value: "year" },
];

export default function IssueActivity() {
  const [selectedInterval, setSelectedInterval] = useState(intervals[1]);
  const { issueActivity, isLoading } = useIssueActivity(selectedInterval.value);

  if (isLoading) return <CardLoader />;
  if (!issueActivity) return;

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
      data: issueActivity.xAxis.data,
    },
    yAxis: {
      type: "value",
    },
    series: issueActivity.series.map((series) => ({
      name: series.name,
      type: "line",
      stack: "total",
      areaStyle: {}, // Area style can give a better visual presentation for issue activities
      emphasis: {
        focus: "series",
      },
      data: series.data,
    })),
  };

  return (
    <Layout>
      <CardHeader
        title="Issue Activity"
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
