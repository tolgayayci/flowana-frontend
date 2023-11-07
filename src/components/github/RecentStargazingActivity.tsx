import ReactECharts from "echarts-for-react";

// Hooks
import useRecentStargazingActivity from "@/models/github/useRecentStargazingActivity";

// Modules and Utils
import Layout from "@/modules/Card/Layout/Layout";
import CardHeader from "@/modules/Card/Header/Header";
import CardLoader from "@/modules/CardLoader/CardLoader";
import NoData from "@/modules/NoData/NoData";

import { formatLargeNumber, formatChartDate } from "@/utils/functions";
import { useMobileDataZoomStart } from "@/utils/useMobileDataZoom";

export default function RecentStargazingActivity() {
  const { recentStargazingActivity, isLoading } = useRecentStargazingActivity();

  const dataZoomStart = useMobileDataZoomStart(0, 0);

  if (isLoading) {
    return (
      <CardLoader
        element={
          <CardHeader
            title="Stargazing Trend"
            tooltip="Displays the recent trend of user 'starring' activity for the repository, giving a glimpse into its growing popularity over time."
          />
        }
      />
    );
  }

  if (!recentStargazingActivity || !recentStargazingActivity.xAxis)
    return (
      <NoData
        element={
          <CardHeader
            title="Stargazing Trend"
            tooltip="Displays the recent trend of user 'starring' activity for the repository, giving a glimpse into its growing popularity over time."
          />
        }
        message=""
      />
    );

  const option = {
    xAxis: {
      type: "category",
      data: recentStargazingActivity["xAxis"]["data"],
      boundaryGap: false,
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
      axisLabel: {
        formatter: function (value) {
          return formatLargeNumber(value.toString());
        },
      },
    },
    series: recentStargazingActivity["series"].map((s) => ({
      ...s,
      name: "Stars",
      smooth: true, // To make the line chart smooth
      showSymbol: false, // To hide the dots on the line chart
      itemStyle: {
        color: "#778dd1", // sfred.900
      },
      lineStyle: {
        color: "#778dd1", // sfblue.900
      },
      areaStyle: {
        color: "#778dd1", // sfblue.DEFAULT
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
        color: "#3b4e6e", // sfblue.DEFAULT
      },
    },
    dataZoom: [
      // Slider
      {
        type: "slider",
        start: dataZoomStart,
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
      top: "14%",
      bottom: "17%",
      containLabel: true,
    },
  };

  return (
    <Layout>
      <CardHeader
        title="Stargazing Trend"
        tooltip="Displays the recent trend of user 'starring' activity for the repository, giving a glimpse into its growing popularity over time."
      />{" "}
      <ReactECharts option={option} style={{ minHeight: "350px" }} />
    </Layout>
  );
}
