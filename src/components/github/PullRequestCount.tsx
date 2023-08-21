import ReactECharts from "echarts-for-react";

// Hooks
import usePullRequestCount from "@/models/github/usePullRequestCount";

// Modules and Utils
import Layout from "@/modules/Card/Layout/Layout";
import CardHeader from "@/modules/Card/Header/Header";
import CardLoader from "@/modules/CardLoader/CardLoader";
import NoData from "@/modules/NoData/NoData";

export default function PullRequestCount() {
  const { pullRequestCount, isLoading } = usePullRequestCount();

  if (isLoading) return <CardLoader />;
  if (!pullRequestCount)
    return <NoData element={<CardHeader title="Pull Request Count" />} />;

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
        color: ["#5B93AF", "#ECA1A5"], // sfblue.500 for "Others" and sfgreen.500 for "Owner"
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
    <Layout>
      <CardHeader title="Pull Request Count" />
      <div className="h-full flex items-center -mt-8">
        <ReactECharts
          option={option}
          showLoading={isLoading}
          style={{ minHeight: "350px", width: "100%" }}
          notMerge={true}
        />
      </div>
    </Layout>
  );
}
