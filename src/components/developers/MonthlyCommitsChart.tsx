import ReactECharts from "echarts-for-react";

// Hooks
import useDevelopersMonthlyCommitsChart from "@/models/developers/useDevelopersMonthlyCommitsChart";

// Models and Utils
import Layout from "@/modules/Card/Layout/Layout";
import CardLoader from "@/modules/CardLoader/CardLoader";
import CardHeader from "@/modules/Card/Header/Header";
import NoData from "@/modules/NoData/NoData";

import { formatChartDate } from "@/utils/functions";

export default function MonthlyCommitsChart() {
  const { monthlyCommitsChart, isLoading } = useDevelopersMonthlyCommitsChart();

  if (isLoading) {
    return (
      <CardLoader element={<CardHeader title="Monthly Commits Chart" />} />
    );
  }

  if (!monthlyCommitsChart || !monthlyCommitsChart.xAxis) {
    return (
      <NoData
        element={<CardHeader title="Monthly Commits Chart" />}
        message=""
      />
    );
  }

  // Convert the data into the format required by ECharts
  const seriesData = monthlyCommitsChart?.series.map((series) =>
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
    },
    yAxis: {
      type: "value",
    },
    series: monthlyCommitsChart?.series.map((series, index) => ({
      name: series.name,
      type: "line",
      showSymbol: false,
      data: seriesData?.[index]?.map((point) => point.value),
      smooth: true,
      areaStyle: {
        color: `rgba(152, 83, 150, ${(index + 1) * 0.2})`, // Varying opacity for each series
      },
      itemStyle: {
        shadowBlur: 10,
        shadowColor: "rgba(0, 0, 0, 0.3)",
      },
      lineStyle: {
        shadowBlur: 5,
        shadowColor: "rgba(0, 0, 0, 0.1)",
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
      top: "10%",
      bottom: "17%",
      containLabel: true,
    },
  };

  return (
    <Layout>
      <CardHeader title="Monthly Commits Chart" />
      <ReactECharts
        option={option}
        showLoading={isLoading}
        style={{ minHeight: "350px", width: "100%" }}
        notMerge={true}
      />
    </Layout>
  );
}
