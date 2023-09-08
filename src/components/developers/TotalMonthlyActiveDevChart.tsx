import ReactECharts from "echarts-for-react";

// Hooks
import useDevelopersTotalMonthlyActiveDevChart from "@/models/developers/useDevelopersTotalMonthlyActiveDevChart";

// Models and Utils
import Layout from "@/modules/Card/Layout/Layout";
import CardLoader from "@/modules/CardLoader/CardLoader";
import CardHeader from "@/modules/Card/Header/Header";
import NoData from "@/modules/NoData/NoData";

import { formatChartDate } from "@/utils/functions";

export default function TotalMonthlyActiveDevChart() {
  const { totalMonthlyActiveDevChart, isLoading } =
    useDevelopersTotalMonthlyActiveDevChart();

  if (isLoading) {
    return (
      <CardLoader
        element={
          <CardHeader
            title="Total Active Devs"
            tooltip="Track the protocol's growth with monthly active developers. Each data point shows developer engagement for a specific month, highlighting trends and adoption rates."
          />
        }
      />
    );
  }

  if (!totalMonthlyActiveDevChart || !totalMonthlyActiveDevChart.xAxis) {
    return (
      <NoData
        element={
          <CardHeader
            title="Total Active Devs"
            tooltip="Track the protocol's growth with monthly active developers. Each data point shows developer engagement for a specific month, highlighting trends and adoption rates."
          />
        }
        message=""
      />
    );
  }

  const seriesData = totalMonthlyActiveDevChart?.series[0].data.map(
    (point) => ({
      name: formatChartDate(point.date),
      value: point.value,
    })
  );

  const option = {
    tooltip: {
      trigger: "axis",
    },
    xAxis: {
      type: "category",
      data: seriesData?.map((point) => point.name),
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

    series: [
      {
        type: "line",
        name: "Total Monthly Active Devs",
        showSymbol: false,
        data: seriesData?.map((point) => point.value),
        smooth: true, // This makes the lines smooth
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
                color: "#657ECA", // color at 0% position
              },
              {
                offset: 1,
                color: "#98A9DC", // color at 100% position, which is white
              },
            ],
            global: false,
          },
        },
        emphasis: {
          focus: "series",
        },
        lineStyle: {
          color: "#657ECA",
          width: 2,
        },
        itemStyle: {
          color: "#657ECA",
        },
      },
    ],
    dataZoom: [
      // Slider
      {
        type: "slider",
        start: 60,
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
      top: "10%",
      bottom: "17%",
      containLabel: true,
    },
  };

  return (
    <Layout>
      <CardHeader
        title="Total Active Devs"
        tooltip="Track the protocol's growth with monthly active developers. Each data point shows developer engagement for a specific month, highlighting trends and adoption rates."
      />{" "}
      <ReactECharts
        option={option}
        showLoading={isLoading}
        style={{ minHeight: "350px", width: "100%" }}
        notMerge={true}
      />
    </Layout>
  );
}
