import ReactECharts from "echarts-for-react";

// Hooks
import useCumulativeParticipation from "@/models/githubCumulative/useCumulativeParticipation";

// Modules and Utils
import Layout from "@/modules/Card/Layout/Layout";
import CardHeader from "@/modules/Card/Header/Header";
import CardLoader from "@/modules/CardLoader/CardLoader";
import NoData from "@/modules/NoData/NoData";

import { formatChartDate } from "@/utils/functions";
import { useMobileDataZoomStart } from "@/utils/useMobileDataZoom";
import { formatLargeNumber } from "@/utils/functions";

export default function Participation() {
  const { participation, isLoading } = useCumulativeParticipation();
  const dataZoomStart = useMobileDataZoomStart(0, 80);

  if (isLoading)
    return (
      <CardLoader
        element={
          <CardHeader
            title="Participation Trend"
            tooltip="View the weekly commit trend across all repositories of the protocol for the past year, highlighting contributions from all, owners, and others. Displays how development participation has evolved over the past year for the protocol.  "
          />
        }
      />
    );

  if (
    !participation ||
    !participation.xAxis ||
    !participation.yAxis ||
    !participation.series
  ) {
    return (
      <NoData
        element={
          <CardHeader
            title="Participation Trend"
            tooltip="View the weekly commit trend across all repositories of the protocol for the past year, highlighting contributions from all, owners, and others. Displays how development participation has evolved over the past year for the protocol.  "
          />
        }
        message=""
      />
    );
  }

  const option = {
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
      data: participation.series.map((series) => series.name),
      textStyle: {
        color: "#3b4e6e", // sfblue.DEFAULT
      },
      top: "0%",
      left: "center",
    },
    xAxis: {
      type: "category",
      data: participation["xAxis"]["data"].map((date) => formatChartDate(date)),
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
    series: participation.series.map((series, index) => {
      let startColor,
        endColor = "#FFFFFF"; // The gradient will end with white color for all lines

      switch (index) {
        case 0:
          startColor = "#e28d9b"; // blue
          endColor = "#F7DFE3"; // light blue
          break;
        case 1:
          startColor = "#64A490"; // green
          endColor = "#F2E3D8"; // light blue
          break;
        default: // For third line or any additional lines
          startColor = "#778dd1"; // red
          endColor = "#E2E7F5"; // light blue
          break;
      }

      return {
        name: series.name,
        type: "line",
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
                color: startColor, // color at 0% position
              },
              {
                offset: 0.9,
                color: endColor, // color at 100% position, which is white
              },
              {
                offset: 1,
                color: "#FFFF", // color at 100% position, which is white
              },
            ],
            global: false,
          },
        },
        showSymbol: false,
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
    renderer: "svg",
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
      top: "13%",
      bottom: "20%",
      containLabel: true,
    },
  };

  return (
    <Layout>
      <CardHeader
        title="Participation Trend"
        tooltip="View the weekly commit trend across all repositories of the protocol for the past year, highlighting contributions from all, owners, and others. Displays how development participation has evolved over the past year for the protocol.  "
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
