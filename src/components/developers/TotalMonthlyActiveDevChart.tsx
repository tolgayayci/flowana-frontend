import ReactECharts from "echarts-for-react";

// Hooks
import useDevelopersTotalMonthlyActiveDevChart from "@/models/developers/useDevelopersTotalMonthlyActiveDevChart";

// Models and Utils
import Layout from "@/modules/Card/Layout/Layout";
import CardLoader from "@/modules/CardLoader/CardLoader";
import CardHeader from "@/modules/Card/Header/Header";
import NoData from "@/modules/NoData/NoData";

export default function TotalMonthlyActiveDevChart() {
  const { totalMonthlyActiveDevChart, isLoading } =
    useDevelopersTotalMonthlyActiveDevChart();

  if (isLoading) {
    return (
      <CardLoader
        element={<CardHeader title="Total Monthly Active Dev Chart" />}
      />
    );
  }

  if (!totalMonthlyActiveDevChart || !totalMonthlyActiveDevChart.xAxis) {
    return (
      <NoData
        element={<CardHeader title="Total Monthly Active Dev Chart" />}
        message=""
      />
    );
  }

  const seriesData = totalMonthlyActiveDevChart?.series[0].data.map(
    (point) => ({
      name: new Date(point.date).toISOString().slice(0, 10), // Convert date to ISO format
      value: point.value,
    })
  );

  const option = {
    tooltip: {
      trigger: "axis", // Show tooltips when hovering on data points
    },
    xAxis: {
      type: "category",
      data: seriesData?.map((point) => point.name),
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        type: "line",
        name: "Total Monthly Active Devs",
        data: seriesData?.map((point) => point.value),
        smooth: true, // This makes the lines smooth
        itemStyle: {
          color: "#DC5057", // sfred.900
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowOffsetY: 3,
          shadowColor: "rgba(0, 0, 0, 0.3)",
        },
        lineStyle: {
          color: "#1D313B", // sfblue.900
        },
        areaStyle: {
          color: "#92B7CA", // sfblue.DEFAULT
        },
      },
    ],
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
      <CardHeader title="Total Monthly Active Dev Chart" />
      <ReactECharts
        option={option}
        showLoading={isLoading}
        style={{ minHeight: "350px", width: "100%" }}
        notMerge={true}
      />
    </Layout>
  );
}
