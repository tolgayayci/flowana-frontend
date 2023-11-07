import ReactECharts from "echarts-for-react";

// Hooks
import useCumulativeCodeFrequency from "@/models/githubCumulative/useCumulativeCodeFrequency";

// Modules and Utils
import Layout from "@/modules/Card/Layout/Layout";
import CardHeader from "@/modules/Card/Header/Header";
import CardLoader from "@/modules/CardLoader/CardLoader";
import NoData from "@/modules/NoData/NoData";

import { formatChartDate, formatLargeNumber } from "@/utils/functions";
import { useMobileDataZoomStart } from "@/utils/useMobileDataZoom";
import React from "react";

export default function CodeFrequency() {
  const { codeFrequency, isLoading } = useCumulativeCodeFrequency();
  const dataZoomStart = useMobileDataZoomStart(60, 90);

  if (isLoading)
    return (
      <CardLoader
        element={
          <CardHeader
            title="Code Frequency"
            tooltip="Shows the aggregated weekly activity of code additions and deletions across all protocol repositories over the past year."
          />
        }
      />
    );

  if (!codeFrequency)
    return (
      <NoData
        element={
          <CardHeader
            title="Code Frequency"
            tooltip="Shows the aggregated weekly activity of code additions and deletions across all protocol repositories over the past year."
          />
        }
        message=""
      />
    );

  const option = {
    xAxis: {
      type: "category",
      data: codeFrequency["xAxis"]["data"].map((date) => formatChartDate(date)),
      axisLine: {
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
      axisLabel: {
        formatter: function (value) {
          return formatLargeNumber(value.toString());
        },
      },
    },
    series: codeFrequency["series"].map((s, index) => {
      let color, name;

      if (index === 0) {
        color = "#778dd1"; // Green for additions
        name = "Additions";
      } else {
        color = "#e28d9b"; // Red for deletions
        name = "Deletions";
      }

      return {
        ...s,
        name: name, // Setting name for series
        smooth: true,
        showSymbol: false,
        itemStyle: {
          color: color,
        },
        lineStyle: {
          color: color,
          width: 2.5,
        },
      };
    }),
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
      data: ["Additions", "Deletions"],
      textStyle: {
        color: "#3b4e6e",
      },
      selectedMode: "multiple", // Allows multiple selection (default behavior)
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
      bottom: "20%",
      containLabel: true,
    },
  };

  return (
    <Layout>
      <CardHeader
        title="Code Frequency"
        tooltip="Shows the aggregated weekly activity of code additions and deletions across all protocol repositories over the past year."
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
