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

  if (isLoading)
    return (
      <CardLoader
        element={
          <CardHeader
            title="Pull Request Count"
            tooltip="Shows the distribution of open and closed pull requests in a pie chart. Quickly understand the current status of pull requests in the repository at a glance."
          />
        }
      />
    );
  if (!pullRequestCount)
    return (
      <NoData
        element={
          <CardHeader
            title="Pull Request Count"
            tooltip="Shows the distribution of open and closed pull requests in a pie chart. Quickly understand the current status of pull requests in the repository at a glance."
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
      color:["#e28d9b", "#778dd1"],
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
              fontSize: 15,
              fontWeight: "bold",
            },
            itemStyle: {
              shadowBlur: 2,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.30)",
            }
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
        title="Pull Request Count"
        tooltip="Shows the distribution of open and closed pull requests in a pie chart. Quickly understand the current status of pull requests in the repository at a glance."
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
