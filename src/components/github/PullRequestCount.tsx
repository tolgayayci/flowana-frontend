import usePullRequestCount from "@/models/github/usePullRequestCount";

import ReactECharts from "echarts-for-react";

import CardLoader from "@/modules/CardLoader/CardLoader";

export default function PullRequestCount() {
  const { pullRequestCount, isLoading } = usePullRequestCount("polkadot");

  if (isLoading) return <CardLoader />;
  if (!pullRequestCount) return;

  const option = {
    tooltip: {
      trigger: "item",
      formatter: "{b}: {c} ({d}%)",
    },
    legend: {
      orient: "horizontal",
      top: "top",
      x: "center",
      data: ["Closed", "Open"],
    },
    series: [
      {
        name: "Issue Status",
        type: "pie",
        radius: "55%",
        center: ["50%", "50%"],
        data: [
          { value: pullRequestCount.closed, name: "Closed" },
          { value: pullRequestCount.open, name: "Open" },
        ],
        label: {
          formatter: "{b}: {d}%",
        },
        emphasis: {
          label: {
            show: true,
            fontWeight: "bold",
          },
        },
      },
    ],
  };

  return (
    <div className="border-2 border-indigo-300 rounded-lg py-12">
      <h1 className="ml-12 mb-8">Pull Request Count</h1>
      <ReactECharts
        option={option}
        showLoading={isLoading}
        style={{ minHeight: "350px", width: "100%" }}
        notMerge={true}
      />
    </div>
  );
}
