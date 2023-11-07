import ReactECharts from "echarts-for-react";

// Hooks
import useDevelopersMonthlyCommitsChart from "@/models/developers/useDevelopersMonthlyCommitsChart";

// Models and Utils
import Layout from "@/modules/Card/Layout/Layout";
import CardLoader from "@/modules/CardLoader/CardLoader";
import CardHeader from "@/modules/Card/Header/Header";
import NoData from "@/modules/NoData/NoData";

import { formatChartDate, formatLargeNumber } from "@/utils/functions";
import { useMobileDataZoomStart } from "@/utils/useMobileDataZoom";

export default function MonthlyCommitsChart() {
  const { monthlyCommitsChart, isLoading } = useDevelopersMonthlyCommitsChart();

  const dataZoomStart = useMobileDataZoomStart(60, 80);

  if (isLoading) {
    return (
      <CardLoader
        element={
          <CardHeader
            title="Monthly Commits"
            tooltip="Displays the monthly commits for the protocol. Track the protocol's momentum and gauge the development activity over time."
          />
        }
      />
    );
  }

  if (!monthlyCommitsChart || !monthlyCommitsChart.xAxis) {
    return (
      <NoData
        element={
          <CardHeader
            title="Monthly Commits"
            tooltip="Displays the monthly commits for the protocol. Track the protocol's momentum and gauge the development activity over time."
          />
        }
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
      data: seriesData?.[0]?.map((point) => point.name),
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
      axisLabel: {
        formatter: function (value) {
          return formatLargeNumber(value.toString());
        },
      },
    },

    series: monthlyCommitsChart?.series.map((series, index) => ({
      name: series.name,
      type: "line",
      showSymbol: false,
      data: seriesData?.[index]?.map((point) => point.value),
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
              color: "#DC7989", // color at 0% position
            },
            {
              offset: 1,
              color: "#EEBEC6", // color at 100% position, which is white
            },
          ],
          global: false,
        },
      },
      emphasis: {
        focus: "series",
      },
      lineStyle: {
        color: "#DC7989",
        width: 2,
      },
      itemStyle: {
        color: "#DC7989",
      },
    })),
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
      top: "5%",
      bottom: "17%",
      containLabel: true,
    },
  };

  return (
    <Layout>
      <CardHeader
        title="Monthly Commits"
        tooltip="Displays the monthly commits for the protocol. Track the protocol's momentum and gauge the development activity over time."
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
