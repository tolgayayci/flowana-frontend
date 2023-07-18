import useIssueCount from "@/models/github/useIssueCount";

import ReactECharts from "echarts-for-react";

import CardLoader from "@/modules/CardLoader/CardLoader";

export default function IssueCount() {
  const { issueCount, isLoading } = useIssueCount("polkadot");

  if (isLoading) return <CardLoader />;
  if (!issueCount) return;

  const option = {
    tooltip: {
      trigger: "item",
      formatter: "{b}: {c} ({d}%)",
    },
    legend: {
      orient: "horizontal",
      top: "top",
      left: "center",
      data: ["Open", "Closed"], // Add legend data
    },
    series: [
      {
        name: "Status",
        type: "pie",
        radius: "55%",
        center: ["50%", "50%"], // Update the center property to center the pie chart
        data: [
          { value: issueCount.closed, name: "Closed" },
          { value: issueCount.open, name: "Open" },
        ],
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  };

  return (
    <div className="border-2 border-indigo-300 rounded-lg py-12">
      <h1 className="ml-12 mb-8">Issue Count</h1>
      <ReactECharts
        option={option}
        showLoading={isLoading}
        style={{ minHeight: "350px", width: "100%" }}
        notMerge={true}
      />
    </div>
  );
}
