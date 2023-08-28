import ReactECharts from "echarts-for-react";

// Hooks
import useCumulativeParticipation from "@/models/githubCumulative/useCumulativeParticipation";

// Modules and Utils
import Layout from "@/modules/Card/Layout/Layout";
import CardHeader from "@/modules/Card/Header/Header";
import CardLoader from "@/modules/CardLoader/CardLoader";
import NoData from "@/modules/NoData/NoData";

export default function Participation() {
  const { participation, isLoading } = useCumulativeParticipation();

  if (isLoading)
    return <CardLoader element={<CardHeader title="Participation" />} />;

  if (
    !participation ||
    !participation.xAxis ||
    !participation.yAxis ||
    !participation.series
  ) {
    return <NoData element={<CardHeader title="Participation" />} message="" />;
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
        color: "#2F5061", // sfblue.DEFAULT
      },
      top: "0%",
      left: "center",
    },
    xAxis: {
      type: "category",
      data: participation["xAxis"]["data"],
      axisLine: {
        lineStyle: {
          color: "#2F5061",
        },
      },
      axisTick: {
        alignWithLabel: true,
        lineStyle: {
          color: "#2F5061",
        },
      },
    },
    yAxis: {
      type: "value",
      axisLine: {
        lineStyle: {
          color: "#2F5061",
        },
      },
      axisTick: {
        lineStyle: {
          color: "#2F5061",
        },
      },
    },
    series: participation.series.map((series, index) => ({
      name: series.name,
      type: "line",
      smooth: true,
      areaStyle: {}, // Area style can give a better visual presentation for issue activities
      emphasis: {
        focus: "series",
      },
      data: series.data,
      lineStyle: {
        color: index === 0 ? "#28A745" : index === 1 ? "#ECA1A5" : "#5B93AF",
        width: 2,
      },
      itemStyle: {
        color: index === 0 ? "#28A745" : index === 1 ? "#ECA1A5" : "#5B93AF",
      },
    })),
    renderer: "svg",
    dataZoom: [
      // Slider
      {
        type: "slider",
        start: 0,
        end: 100,
        handleStyle: {
          color: "#E57F84", // sfred.800
          shadowBlur: 3,
          shadowColor: "rgba(0, 0, 0, 1)",
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
      top: "13%",
      bottom: "20%",
      containLabel: true,
    },
  };

  return (
    <Layout>
      <CardHeader title="Participation" />
      <ReactECharts
        option={option}
        showLoading={isLoading}
        style={{ minHeight: "400px", width: "100%" }}
        notMerge={true}
      />
    </Layout>
  );
}
