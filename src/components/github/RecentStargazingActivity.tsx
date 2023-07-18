import ReactECharts from "echarts-for-react";

import useRecentStargazingActivity from "@/models/github/useRecentStargazingActivity";
import CardLoader from "@/modules/CardLoader/CardLoader";

export default function RecentStargazingActivity() {
  const { recentStargazingActivity, isLoading } =
    useRecentStargazingActivity("polkadot");

  if (isLoading) return <CardLoader />;
  if (!recentStargazingActivity) return;

  const option = {
    xAxis: {
      type: "category",
      data: recentStargazingActivity["xAxis"]["data"],
    },
    yAxis: {
      type: "value",
    },
    series: recentStargazingActivity["series"],
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
  };

  return (
    <div className="border-2 border-indigo-300 rounded-lg py-12">
      <h1 className="ml-12 mb-8">Stargazing Activity Info</h1>
      <ReactECharts
        option={option}
        showLoading={isLoading}
        style={{ minHeight: "350px", width: "100%" }}
        notMerge={true}
      />
    </div>
  );
}
