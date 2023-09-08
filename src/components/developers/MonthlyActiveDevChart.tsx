import ReactECharts from "echarts-for-react";

// Hooks
import useDevelopersMonthlyActiveDevChart from "@/models/developers/useDevelopersMonthlyActiveDevChart";

// Models and Utils
import Layout from "@/modules/Card/Layout/Layout";
import CardLoader from "@/modules/CardLoader/CardLoader";
import CardHeader from "@/modules/Card/Header/Header";
import NoData from "@/modules/NoData/NoData";

import { formatChartDate } from "@/utils/functions";

export default function MonthlyActiveDevChart() {
  const { monthlyActiveDevChart, isLoading } =
    useDevelopersMonthlyActiveDevChart();

  if (isLoading) {
    return (
      <CardLoader
        element={
          <CardHeader
            title="Monthly Active Devs"
            tooltip="Visualizes the monthly engagement of developers in different categories. Track the activity of Full-Time, Part-Time, and One-Time Developers to understand the protocol's developer engagement depth and breadth."
          />
        }
      />
    );
  }

  if (!monthlyActiveDevChart || !monthlyActiveDevChart.xAxis) {
    return (
      <NoData
        element={
          <CardHeader
            title="Monthly Active Devs"
            tooltip="Visualizes the monthly engagement of developers in different categories. Track the activity of Full-Time, Part-Time, and One-Time Developers to understand the protocol's developer engagement depth and breadth."
          />
        }
        message=""
      />
    );
  }

  // Convert the data into the format required by ECharts
  const seriesData = monthlyActiveDevChart?.series.map((series) =>
    series.data.map((point) => ({
      name: formatChartDate(point.date),
      value: point.value,
    }))
  );

  const option = {
    tooltip: {
      trigger: "axis",
    },
    xAxis: {
      type: "category",
      data: seriesData?.[0]?.map((point) => point.name), // Assuming all series have the same data points
      axisLine: {
        lineStyle: {
          color: "#2F5061",
        },
      },
      axisTick: {
        alignWithLabel: true,
        lineStyle: {
          color: "#2F5061",
        },
      },
    },
    yAxis: {
      type: "value",
      axisLine: {
        lineStyle: {
          color: "#2F5061",
        },
      },
      axisTick: {
        lineStyle: {
          color: "#2F5061",
        },
      },
    },
    legend: {
      data: monthlyActiveDevChart?.series.map((series) => series.name), // Legend data
      textStyle: {
        color: "#2F5061", // sfblue.DEFAULT
      },
      top: "0%",
      left: "center",
    },
    series: monthlyActiveDevChart?.series.map((series, index) => {
      let startColor,
        endColor = "#FFFFFF"; // The gradient will end with white color for all lines

      switch (index) {
        case 0:
          startColor = "#657ECA"; // red
          endColor = "#98A9DC"; // light blue
          break;
        case 1:
          startColor = "#DC7989"; // blue
          endColor = "#EEBEC6"; // light blue
          break;

        default: // For third line or any additional lines
          startColor = "#64A490"; // green
          endColor = "#A1C8BC"; // light blue
          break;
      }
      return {
        name: series.name,
        type: "line",
        smooth: true,
        showSymbol: false,
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
                offset: 1,
                color: endColor, // color at 100% position, which is white
              },
            ],
            global: false,
          },
        },
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
    dataZoom: [
      // Slider
      {
        type: "slider",
        start: 60,
        end: 100,
        handleStyle: {
          color: "#e8efff", // styling applied
        },
      },
      {
        type: "inside",
      },
    ],
    grid: {
      left: "1%",
      right: "1%",
      top: "13%", // updated values from component
      bottom: "20%", // updated values from component
      containLabel: true,
    },
  };

  return (
    <Layout>
      <CardHeader
        title="Monthly Active Devs"
        tooltip="Visualizes the monthly engagement of developers in different categories. Track the activity of Full-Time, Part-Time, and One-Time Developers to understand the protocol's developer engagement depth and breadth."
      />
      <ReactECharts
        option={option}
        showLoading={isLoading}
        style={{ minHeight: "400px", width: "100%" }}
        notMerge={true}
      />
    </Layout>
  );
}
