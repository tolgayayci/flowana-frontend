import ReactECharts from "echarts-for-react";

// Hooks
import useIssueCount from "@/models/github/useIssueCount";

// Modules and Utils
import Layout from "@/modules/Card/Layout/Layout";
import CardHeader from "@/modules/Card/Header/Header";
import CardLoader from "@/modules/CardLoader/CardLoader";
import NoData from "@/modules/NoData/NoData";

export default function IssueCount() {
  const { issueCount, isLoading } = useIssueCount();

  if (isLoading)
    return (
      <CardLoader
        element={
          <CardHeader
            title="Issue Distribution"
            tooltip="Shows the distribution of open and closed issues in a pie chart. Quickly understand the current status of issues in the repository at a glance."
          />
        }
      />
    );

  if (!IssueCount)
    return (
      <NoData
        element={
          <CardHeader
            title="Issue Distribution"
            tooltip="Shows the distribution of open and closed issues in a pie chart. Quickly understand the current status of issues in the repository at a glance."
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
      top: "2%",
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
        tooltip="Shows the distribution of open and closed issues in a pie chart. Quickly understand the current status of issues in the repository at a glance."
      />
      <ReactECharts
        option={option}
        showLoading={isLoading}
        style={{ minHeight: "350px", width: "100%" }}
        notMerge={true}
      />
    </Layout>
  );
}
