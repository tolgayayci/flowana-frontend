import ReactECharts from "echarts-for-react";

// Hooks
import useCumulativePullRequestCount from "@/models/githubCumulative/useCumulativePullRequestCount";

// Modules and Utils
import Layout from "@/modules/Card/Layout/Layout";
import CardHeader from "@/modules/Card/Header/Header";
import CardLoader from "@/modules/CardLoader/CardLoader";
import NoData from "@/modules/NoData/NoData";

export default function PullRequestCount() {
  const { pullRequestCount, isLoading } = useCumulativePullRequestCount();

  if (isLoading)
    return (
      <CardLoader
        element={
          <CardHeader
            title="Pull Request Distribution"
            tooltip="Shows the distribution of open and closed pull requests across all repositories in a pie chart."
          />
        }
      />
    );

  if (!pullRequestCount)
    return (
      <NoData
        element={
          <CardHeader
            title="Pull Request Distribution"
            tooltip="Shows the distribution of open and closed pull requests across all repositories in a pie chart."
          />
        }
        message=""
      />
    );

  const option = {
    tooltip: {
      trigger: "item",
    },
    legend: {
      top: "0%",
      left: "center",
    },
    series: [
      {
        name: "Pull Request Count",
        type: "pie",
        radius: ["40%", "70%"],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: "#fff",
          borderWidth: 2,
        },
        label: {
          show: false,
          position: "center",
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 20,
            fontWeight: "bold",
          },
        },
        labelLine: {
          show: false,
        },
        data: [
          { value: pullRequestCount?.closed, name: "Closed" },
          { value: pullRequestCount?.open, name: "Open" },
        ],
      },
    ],
  };

  return (
    <Layout>
      <CardHeader
        title="Pull Request Distribution"
        tooltip="Shows the distribution of open and closed pull requests across all repositories in a pie chart."
      />
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
