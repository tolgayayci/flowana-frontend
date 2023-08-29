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
      <CardLoader element={<CardHeader title="Monthly Active Dev Chart" />} />
    );
  }

  if (!monthlyActiveDevChart || !monthlyActiveDevChart.xAxis) {
    return (
      <NoData
        element={<CardHeader title="Monthly Active Dev Chart" />}
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
    series: monthlyActiveDevChart?.series.map((series, index) => ({
      name: series.name,
      type: "line",
      smooth: true,
      showSymbol: false,
      areaStyle: {}, // Area style can give a better visual presentation for issue activities
      emphasis: {
        focus: "series",
      },
      data: series.data,
      lineStyle: {
        color: index === 0 ? "#28A745" : index === 1 ? "#ECA1A5" : "#5B93AF",
        width: 2,
      },
      itemStyle: {
        color: index === 0 ? "#28A745" : index === 1 ? "#ECA1A5" : "#5B93AF",
      },
    })),
    dataZoom: [
      // Slider
      {
        type: "slider",
        start: 75,
        end: 100,
        handleStyle: {
          color: "#E57F84", // styling applied
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
      top: "13%", // updated values from component
      bottom: "20%", // updated values from component
      containLabel: true,
    },
  };

  return (
    <Layout>
      <CardHeader title="Monthly Active Dev Chart" />
      <ReactECharts
        option={option}
        showLoading={isLoading}
        style={{ minHeight: "400px", width: "100%" }}
        notMerge={true}
      />
    </Layout>
  );
}
