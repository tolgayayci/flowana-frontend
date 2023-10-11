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

  if (isLoading)
    return (
      <CardLoader
        element={
          <CardHeader
            title="Pull Request Activity"
            tooltip="Displays a timeline of opened and issues pull requests in distinct time intervals. Note: This chart represents the counts of pull requests opened and closed within each interval, not the cumulative totals."
            intervals={intervals}
            selectedInterval={selectedInterval}
            setSelectedInterval={setSelectedInterval}
          />
        }
      />
    );
  if (!pullRequestActivity || !pullRequestActivity.xAxis) {
    return (
      <NoData
        element={
          <CardHeader
            title="Pull Request Activity"
            tooltip="Displays a timeline of opened and issues pull requests in distinct time intervals. Note: This chart represents the counts of pull requests opened and closed within each interval, not the cumulative totals."
            intervals={intervals}
            selectedInterval={selectedInterval}
            setSelectedInterval={setSelectedInterval}
          />
        }
        message=""
      />
    );
  }

  const option = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
        crossStyle: {
          color: "#999",
        },
      },
    },
    legend: {
      data: pullRequestActivity.series.map((series) => series.name),
      textStyle: {
        color: "#3b4e6e", // sfblue.DEFAULT
      },
      top: "0%",
      left: "center",
    },
    xAxis: {
      type: "category",
      data: pullRequestActivity["xAxis"]["data"],
      axisLine: {
        lineStyle: {
          color: "#3b4e6e",
        },
      },
      axisTick: {
        alignWithLabel: true,
        lineStyle: {
          color: "#3b4e6e",
        },
      },
    },
    yAxis: {
      type: "value",
      axisLine: {
        lineStyle: {
          color: "#3b4e6e",
        },
      },
      axisTick: {
        lineStyle: {
          color: "#3b4e6e",
        },
      },
    },
    series: pullRequestActivity.series.map((series, index) => {
      let startColor,
        endColor = "#FFFFFF"; // The gradient will end with white color for all lines

      switch (index) {
        case 0:
          startColor = "#778dd1"; // red
          endColor = "#E2E7F5"; // light blue
          break;
          case 1:
          startColor = "#e28d9b"; // blue
          endColor = "#F7DFE3"; // light blue
          break;
        default: // For third line or any additional lines
          startColor = "#64A490"; // green
          endColor = "#F2E3D8"; // light blue
          break;
      }

      return {
        name: series.name,
        type: "line",
        smooth: true,
        areaStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: startColor, // color at 0% position
              },
              {
                offset: 0.9,
                color: endColor, // color at 100% position, which is white
              },
              {
                offset: 1,
                color: "#FFFF", // color at 100% position, which is white
              },
            ],
            global: false,
          },
        },
        showSymbol: false,
        emphasis: {
          focus: "series",
        },
        data: series.data,
        lineStyle: {
          color: startColor,
          width: 2,
        },
        itemStyle: {
          color: startColor,
        },
      };
    }),
    renderer: "svg",
    dataZoom: [
      // Slider
      {
        type: "slider",
        start: 0,
        end: 100,
        handleStyle: {
          color: "#e8efff", // sfred.800
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
        tooltip="Displays a timeline of opened and issues pull requests in distinct time intervals. Note: This chart represents the counts of pull requests opened and closed within each interval, not the cumulative totals."
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
