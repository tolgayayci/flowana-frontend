import ReactECharts from "echarts-for-react";

// Hooks
import useParticipation from "@/models/github/useParticipation";

// Modules and Utils
import Layout from "@/modules/Card/Layout/Layout";
import CardHeader from "@/modules/Card/Header/Header";
import CardLoader from "@/modules/CardLoader/CardLoader";
import NoData from "@/modules/NoData/NoData";

export default function Participation() {
  const { participation, isLoading } = useParticipation();

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
    xAxis: {
      type: "category",
      data: participation["xAxis"]["data"],
    },
    yAxis: {
      type: "value",
    },
    series: participation.series.map((series) => ({
      name: series.name,
      type: "line",
      areaStyle: {}, // Area style can give a better visual presentation for issue activities
      emphasis: {
        focus: "series",
      },
      data: series.data,
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
      top: "5%",
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
        style={{ minHeight: "350px", width: "100%" }}
        notMerge={true}
      />
    </Layout>
  );
}
