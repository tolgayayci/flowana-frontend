import useParticipation from "@/models/github/useParticipation";

import ReactECharts from "echarts-for-react";

import CardLoader from "@/modules/CardLoader/CardLoader";

export default function Participation() {
  const { participation, isLoading } = useParticipation("polkadot");

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
    <div className="border-2 border-indigo-300 rounded-lg py-12">
      <h1 className="ml-12 mb-8">Participation</h1>
      <ReactECharts
        option={option}
        showLoading={isLoading}
        style={{ minHeight: "350px", width: "100%" }}
        notMerge={true}
      />
    </div>
  );
}
