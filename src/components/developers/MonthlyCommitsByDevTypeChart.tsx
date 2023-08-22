import ReactECharts from "echarts-for-react";

// Hooks
import useDevelopersMonthlyCommitsByDevTypeChart from "@/models/developers/useDevelopersMonthlyCommitsByDevTypeChart";

// Models and Utils
import Layout from "@/modules/Card/Layout/Layout";
import CardLoader from "@/modules/CardLoader/CardLoader";
import CardHeader from "@/modules/Card/Header/Header";
import NoData from "@/modules/NoData/NoData";

export default function MonthlyCommitsByDevTypeChart() {
  const { monthlyCommitsByDevTypeChart, isLoading } =
    useDevelopersMonthlyCommitsByDevTypeChart();

  if (isLoading) {
    return (
      <CardLoader
        element={<CardHeader title="Monthly Commits By Dev Type Chart" />}
      />
    );
  }

  if (!monthlyCommitsByDevTypeChart || !monthlyCommitsByDevTypeChart.xAxis) {
    return (
      <NoData
        element={<CardHeader title="Monthly Commits By Dev Type Chart" />}
        message=""
      />
    );
  }

  // Convert the data into the format required by ECharts
  const seriesData = monthlyCommitsByDevTypeChart?.series.map((series) =>
    series.data.map((point) => ({
      name: new Date(point.date).toISOString().slice(0, 10),
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
    series: monthlyCommitsByDevTypeChart?.series.map((series, index) => ({
      name: series.name,
      type: "line",
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
      top: "10%",
      bottom: "17%",
      containLabel: true,
    },
  };

  return (
    <Layout>
      <CardHeader title="Monthly Commits By Dev Type Chart" />
      <ReactECharts
        option={option}
        showLoading={isLoading}
        style={{ minHeight: "350px", width: "100%" }}
        notMerge={true}
      />
    </Layout>
  );
}
