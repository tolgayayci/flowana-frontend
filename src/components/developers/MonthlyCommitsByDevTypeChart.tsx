import ReactECharts from "echarts-for-react";

// Hooks
import useDevelopersMonthlyCommitsByDevTypeChart from "@/models/developers/useDevelopersMonthlyCommitsByDevTypeChart";

// Models and Utils
import Layout from "@/modules/Card/Layout/Layout";
import CardLoader from "@/modules/CardLoader/CardLoader";
import CardHeader from "@/modules/Card/Header/Header";
import NoData from "@/modules/NoData/NoData";

import { formatChartDate, formatLargeNumber } from "@/utils/functions";
import { useMobileDataZoomStart } from "@/utils/useMobileDataZoom";

export default function MonthlyCommitsByDevTypeChart() {
  const { monthlyCommitsByDevTypeChart, isLoading } =
    useDevelopersMonthlyCommitsByDevTypeChart();

  const dataZoomStart = useMobileDataZoomStart(60, 80);

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
    legend: {
      data: monthlyCommitsByDevTypeChart.series.map((series) => series.name),
      textStyle: {
        color: "#3b4e6e", // sfblue.DEFAULT
      },
      top: "0%",
      left: "center",
    },
    series: monthlyCommitsByDevTypeChart?.series.map((series, index) => {
      let startColor,
        endColor = "#FFFFFF"; // The gradient will end with white color for all lines

      switch (index) {
        case 0:
          startColor = "#657ECA"; // red
          endColor = "#98A9DC"; // light blue
          break;
        case 1:
          startColor = "#DC7989"; // blue
          endColor = "#EEBEC6"; // light blue
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
        showSymbol: false,
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
                offset: 1,
                color: endColor, // color at 100% position, which is white
              },
            ],
            global: false,
          },
        },
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
    animation: false,
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
      bottom: "15%",
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
