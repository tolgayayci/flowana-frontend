import ReactECharts from "echarts-for-react";

// Hooks
import useParticipation from "@/models/github/useParticipation";

// Modules and Utils
import Layout from "@/modules/Card/Layout/Layout";
import CardHeader from "@/modules/Card/Header/Header";
import CardLoader from "@/modules/CardLoader/CardLoader";

export default function Participation() {
  const { participation, isLoading } = useParticipation();

  if (isLoading) return <CardLoader />;
  if (!participation) return;

  const option = {
    xAxis: {
      type: "category",
      data: participation["xAxis"]["data"],
    },
    yAxis: {
      type: "value",
    },
    series: participation["series"],
    renderer: "svg",
    grid: {
      left: "10%",
      right: "6%",
      top: "3%",
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
        crossStyle: {
          color: "#999",
        },
      },
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
