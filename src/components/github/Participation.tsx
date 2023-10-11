import ReactECharts from "echarts-for-react";

// Hooks
import useParticipation from "@/models/github/useParticipation";

// Modules and Utils
import Layout from "@/modules/Card/Layout/Layout";
import CardHeader from "@/modules/Card/Header/Header";
import CardLoader from "@/modules/CardLoader/CardLoader";
import NoData from "@/modules/NoData/NoData";
import { all } from "axios";

export default function Participation() {
  const { participation, isLoading } = useParticipation();

  if (isLoading)
    return (
      <CardLoader
        element={
          <CardHeader
            title="Participation Trend"
            tooltip="View the weekly commit activity chart for the past year, highlighting contributions from all, owners, and others."
          />
        }
      />
    );
  if (
    !participation ||
    !participation.xAxis ||
    !participation.yAxis ||
    !participation.series ||
    // check if all series values are 0
    participation.series
      .map((series) => series.data)
      .every((data) => data.every((value) => value === 0))
  ) {
    return (
      <NoData
        element={
          <CardHeader
            title="Participation Trend"
            tooltip="View the weekly commit activity chart for the past year, highlighting contributions from all, owners, and others."
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
      data: participation["xAxis"]["data"],
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
    series: participation.series.map((series, index) => {
      let startColor,
        endColor = "#FFFFFF"; // The gradient will end with white color for all lines

      switch (index) {
        case 0:
          startColor = "#778dd1"; // red
          endColor = "#E2E7F5"; // light blue
          break;
        case 1:
          startColor = "#e28d9b"; // blue
          endColor = "#F7DFE3"; // light blue
          break;
        default: // For third line or any additional lines
          startColor = "#64A490"; // green
          endColor = "#F2E3D8"; // light blue
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
        start: 0,
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
      bottom: "20%",
      containLabel: true,
    },
  };

  return (
    <Layout>
      <CardHeader
        title="Participation Trend"
        tooltip="View the weekly commit activity chart for the past year, highlighting contributions from all, owners, and others."
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
