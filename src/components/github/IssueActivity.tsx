import { useState } from "react";
import ReactECharts from "echarts-for-react";

// Hooks
import useIssueActivity from "@/models/github/useIssueActivity";

// Modules and Utils
import Layout from "@/modules/Card/Layout/Layout";
import CardHeader from "@/modules/Card/Header/Header";
import CardLoader from "@/modules/CardLoader/CardLoader";
import NoData from "@/modules/NoData/NoData";

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

  if (isLoading)
    return (
      <CardLoader
        element={
          <CardHeader
            title="Issue Activity"
            tooltip="Displays a timeline of opened and closed issues in distinct time intervals. Note: This chart represents the counts of issues opened and closed within each interval, not the cumulative totals."
            intervals={intervals}
            selectedInterval={selectedInterval}
            setSelectedInterval={setSelectedInterval}
          />
        }
      />
    );

  if (!issueActivity || !issueActivity.xAxis || !issueActivity.series)
    return (
      <NoData
        element={
          <CardHeader
            title="Issue Activity"
            tooltip="Displays a timeline of opened and closed issues in distinct time intervals. Note: This chart represents the counts of issues opened and closed within each interval, not the cumulative totals."
            intervals={intervals}
            selectedInterval={selectedInterval}
            setSelectedInterval={setSelectedInterval}
          />
        }
        message=""
      />
    );

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
      areaStyle: {}, // Area style can give a better visual presentation for issue activities
      emphasis: {
        focus: "series",
      },
      data: series.data,
    })),
    dataZoom: [
      // Slider
      {
        type: "slider",
        start: 0,
        end: 100,
        handleStyle: {
          color: "#E57F84", // sfred.800
          shadowBlur: 3,
          shadowColor: "rgba(0, 0, 0, 0.6)",
          shadowOffsetX: 2,
          shadowOffsetY: 2,
        },
      },
      {
        type: "inside",
      },
    ],
    grid: {
      left: "1%",
      right: "1%",
      top: "17%",
      bottom: "20%",
      containLabel: true,
    },
  };

  return (
    <Layout>
      <CardHeader
        title="Issue Activity"
        tooltip="Displays a timeline of opened and closed issues in distinct time intervals. Note: This chart represents the counts of issues opened and closed within each interval, not the cumulative totals."
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
