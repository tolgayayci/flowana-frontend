import ReactECharts from "echarts-for-react";

// Hooks
import useDevelopersMonthlyCommitsByDevTypeChart from "@/models/developers/useDevelopersMonthlyCommitsByDevTypeChart";

// Models and Utils
import Layout from "@/modules/Card/Layout/Layout";
import CardLoader from "@/modules/CardLoader/CardLoader";
import CardHeader from "@/modules/Card/Header/Header";
import NoData from "@/modules/NoData/NoData";

import { formatChartDate } from "@/utils/functions";

export default function MonthlyCommitsByDevTypeChart() {
  const { monthlyCommitsByDevTypeChart, isLoading } =
    useDevelopersMonthlyCommitsByDevTypeChart();

  if (isLoading) {
    return (
      <CardLoader
        element={
          <CardHeader
            title="Commit Trends by Devs"
            tooltip="Displays monthly commits segmented by developer categories. See how Full-Time, Part-Time, and One-Time Developers contribute over time, revealing the protocol's developer engagement diversity."
          />
        }
      />
    );
  }

  if (!monthlyCommitsByDevTypeChart || !monthlyCommitsByDevTypeChart.xAxis) {
    return (
      <NoData
        element={
          <CardHeader
            title="Commit Trends by Devs"
            tooltip="Displays monthly commits segmented by developer categories. See how Full-Time, Part-Time, and One-Time Developers contribute over time, revealing the protocol's developer engagement diversity."
          />
        }
        message=""
      />
    );
  }

  // Convert the data into the format required by ECharts
  const seriesData = monthlyCommitsByDevTypeChart?.series.map((series) =>
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
      data: seriesData?.[0]?.map((point) => point.name),
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
      data: monthlyCommitsByDevTypeChart.series.map((series) => series.name),
      textStyle: {
        color: "#2F5061", // sfblue.DEFAULT
      },
      top: "0%",
      left: "center",
    },
    series: monthlyCommitsByDevTypeChart?.series.map((series, index) => ({
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
      top: "13%",
      bottom: "20%",
      containLabel: true,
    },
  };

  return (
    <Layout>
      <CardHeader
        title="Commit Trends by Devs"
        tooltip="Displays monthly commits segmented by developer categories. See how Full-Time, Part-Time, and One-Time Developers contribute over time, revealing the protocol's developer engagement diversity."
      />{" "}
      <ReactECharts
        option={option}
        showLoading={isLoading}
        style={{ minHeight: "400px", width: "100%" }}
        notMerge={true}
      />
    </Layout>
  );
}
