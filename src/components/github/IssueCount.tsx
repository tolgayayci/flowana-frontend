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
          { value: issueCount?.closed, name: "Closed" },
          { value: issueCount?.open, name: "Open" },
        ],
        color: ["#5B93AF", "#ECA1A5"], // sfblue.500 for "Others" and sfgreen.500 for "Owner"
        label: {
          formatter: "{b}: {d}%",
        },
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
    <Layout>
      <CardHeader
        title="Issue Distribution"
        tooltip="Shows the distribution of open and closed issues in a pie chart. Quickly understand the current status of issues in the repository at a glance."
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
