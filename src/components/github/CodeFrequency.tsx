import useCodeFrequency from "@/models/github/useCodeFrequency";

import ReactECharts from "echarts-for-react";

import CardLoader from "@/modules/CardLoader/CardLoader";

export default function CodeFrequency() {
  const { codeFrequency, isLoading } = useCodeFrequency("polkadot");

  if (isLoading) return <CardLoader />;
  if (!codeFrequency) return;

  const option = {
    xAxis: {
      type: "category",
      data: codeFrequency["xAxis"]["data"],
    },
    yAxis: {
      type: "value",
    },
    series: codeFrequency["series"],
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
    dataZoom: [
      {
        type: "slider", // Use a slider type of dataZoom
        show: true, // Show the zoom slider
        start: 60, // Initial start position (percentage)
        end: 100, // Initial end position (percentage)
        handleSize: 12, // Size of the slider handle
        handleStyle: {
          color: "#666", // Color of the slider handle
        },
        textStyle: {
          color: "#666", // Color of the dataZoom text
        },
        borderColor: "#EEE", // Color of the dataZoom border
        fillerColor: "rgba(0, 0, 0, 0.1)", // Color of the filled area inside the dataZoom
        backgroundColor: "#F5F5F5", // Background color of the dataZoom
        filterMode: "filter", // Specify the filtering mode
      },
    ],
  };

  return (
    <div className="border-2 border-indigo-300 rounded-lg py-12">
      <h1 className="ml-12 mb-8">Code Frequency</h1>
      <ReactECharts
        option={option}
        showLoading={isLoading}
        style={{ minHeight: "350px", width: "100%" }}
        notMerge={true}
      />
    </div>
  );
}
