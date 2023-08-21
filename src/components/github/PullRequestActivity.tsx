import { useState } from "react";
import ReactECharts from "echarts-for-react";

// Hooks
import usePullRequestActivity from "@/models/github/usePullRequestActivity";

// Modules and Utils
import Layout from "@/modules/Card/Layout/Layout";
import CardHeader from "@/modules/Card/Header/Header";
import CardLoader from "@/modules/CardLoader/CardLoader";
import NoData from "@/modules/NoData/NoData";

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
  if (
    !pullRequestActivity ||
    !pullRequestActivity.xAxis ||
    pullRequestActivity.series
  ) {
    return (
      <NoData
        element={
          <CardHeader
            title="Pull Request Activity"
            intervals={intervals}
            selectedInterval={selectedInterval}
            setSelectedInterval={setSelectedInterval}
          />
        }
      />
    );
  }

  const option = {
    tooltip: {
      trigger: "axis",
    },
    legend: {
      show: true,
      data: ["Opened", "Closed"],
      textStyle: {
        color: "#2F5061", // sfblue.DEFAULT
      },
      selectedMode: "multiple",
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: pullRequestActivity?.xAxis.data,
    },
    yAxis: {
      type: "value",
    },
    series: pullRequestActivity.series.map((series) => ({
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
