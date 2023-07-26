import ReactECharts from "echarts-for-react";

// Hooks
import useCodeFrequency from "@/models/github/useCodeFrequency";

// Modules and Utils
import Layout from "@/modules/Card/Layout/Layout";
import CardHeader from "@/modules/Card/Header/Header";
import CardLoader from "@/modules/CardLoader/CardLoader";

export default function CodeFrequency() {
  const { codeFrequency, isLoading } = useCodeFrequency();

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
        type: "slider",
        show: true,
        start: 60,
        end: 100,
        handleSize: 12,
        handleStyle: {
          color: "#666",
        },
        textStyle: {
          color: "#666",
        },
        borderColor: "#EEE",
        fillerColor: "rgba(0, 0, 0, 0.1)",
        backgroundColor: "#F5F5F5",
        filterMode: "filter",
      },
    ],
  };

  return (
    <Layout>
      <CardHeader title="Code Frequency" />
      <ReactECharts
        option={option}
        showLoading={isLoading}
        style={{ minHeight: "350px", width: "100%" }}
        notMerge={true}
      />
    </Layout>
  );
}
