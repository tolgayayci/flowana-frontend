import ReactECharts from "echarts-for-react";

// Hooks
import useRecentStargazingActivity from "@/models/github/useRecentStargazingActivity";

// Modules and Utils
import Layout from "@/modules/Card/Layout/Layout";
import CardHeader from "@/modules/Card/Header/Header";
import NoData from "@/modules/NoData/NoData";

export default function RecentStargazingActivity() {
  const { recentStargazingActivity, isLoading } = useRecentStargazingActivity();

  if (!recentStargazingActivity)
    return (
      <NoData element={<CardHeader title="Recent Stargazing Activity" />} />
    );

  const option = {
    xAxis: {
      type: "category",
      data: recentStargazingActivity["xAxis"]["data"],
      axisLine: {
        lineStyle: {
          color: "#2F5061", // sfblue.DEFAULT
        },
      },
    },
    yAxis: {
      type: "value",
      axisLine: {
        lineStyle: {
          color: "#2F5061", // sfblue.DEFAULT
        },
      },
    },
    series: recentStargazingActivity["series"].map((s) => ({
      ...s,
      name: "Stars",
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
        color: "#2F5061", // sfblue.DEFAULT
      },
    })),
    renderer: "svg",
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
      show: true,
      textStyle: {
        color: "#2F5061", // sfblue.DEFAULT
      },
    },
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
      top: "14%",
      bottom: "17%",
      containLabel: true,
    },
  };

  return (
    <Layout>
      <CardHeader title="Recent Stargazing Activity" />
      <ReactECharts option={option} style={{ minHeight: "350px" }} />
    </Layout>
  );
}
