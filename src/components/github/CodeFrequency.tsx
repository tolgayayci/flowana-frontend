import ReactECharts from "echarts-for-react";

// Hooks
import useCodeFrequency from "@/models/github/useCodeFrequency";

// Modules and Utils
import Layout from "@/modules/Card/Layout/Layout";
import CardHeader from "@/modules/Card/Header/Header";
import CardLoader from "@/modules/CardLoader/CardLoader";
import NoData from "@/modules/NoData/NoData";

export default function CodeFrequency() {
  const { codeFrequency, isLoading } = useCodeFrequency();

  if (isLoading)
    return (
      <CardLoader
        element={
          <CardHeader
            title="Code Frequency"
            tooltip="Shows the weekly activity of code additions and deletions in the repository over time in last year."
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
            tooltip="Shows the weekly activity of code additions and deletions in the repository over time in last year."
          />
        }
        message=""
      />
    );

  const option = {
    xAxis: {
      type: "category",
      data: codeFrequency["xAxis"]["data"],
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
    series: codeFrequency["series"].map((s, index) => {
      let color, name;

      if (index === 0) {
        color = "#28A745"; // Green for additions
        name = "Additions";
      } else {
        color = "#DC5057"; // Red for deletions
        name = "Deletions";
      }

      return {
        ...s,
        name: name, // Setting name for series
        smooth: true,
        itemStyle: {
          color: color,
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowOffsetY: 3,
          shadowColor: "rgba(0, 0, 0, 0.3)",
        },
        lineStyle: {
          color: color,
        },
        areaStyle: {
          color: "#2F5061", // sfblue.DEFAULT for area under the line
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
        color: "#2F5061", // sfblue.DEFAULT
      },
      selectedMode: "multiple", // Allows multiple selection (default behavior)
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
      top: "12%",
      bottom: "20%",
      containLabel: true,
    },
  };

  return (
    <Layout>
      <CardHeader
        title="Code Frequency"
        tooltip="Shows the weekly activity of code additions and deletions in the repository over time in last year."
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
