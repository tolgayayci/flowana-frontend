import ReactECharts from "echarts-for-react";

// Hooks
import useCumulativeIssueCount from "@/models/githubCumulative/useCumulativeIssueCount";

// Modules and Utils
import Layout from "@/modules/Card/Layout/Layout";
import CardHeader from "@/modules/Card/Header/Header";
import CardLoader from "@/modules/CardLoader/CardLoader";
import NoData from "@/modules/NoData/NoData";

export default function IssueCount() {
  const { issueCount, isLoading } = useCumulativeIssueCount();

  if (isLoading)
    return (
      <CardLoader
        element={
          <CardHeader
            title="Issue Distribution"
            tooltip="Shows the distribution of open and closed issues across all repositories in a pie chart."
          />
        }
      />
    );

  if (!issueCount)
    return (
      <NoData
        element={
          <CardHeader
            title="Issue Distribution"
            tooltip="Shows the distribution of open and closed issues across all repositories in a pie chart."
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
    color: ["#e28d9b", "#778dd1"],
    series: [
      {
        name: "Issue Count",
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
          },
        },
        labelLine: {
          show: false,
        },
        data: [
          { value: issueCount?.closed, name: "Closed" },
          { value: issueCount?.open, name: "Open" },
        ],
      },
    ],
  };

  return (
    <Layout>
      <CardHeader
        title="Issue Distribution"
        tooltip="Shows the distribution of open and closed issues across all repositories in a pie chart."
      />
      <div className="h-full flex items-center md:-mt-8">
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
