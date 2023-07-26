import ReactECharts from "echarts-for-react";

// Hooks
import useIssueCount from "@/models/github/useIssueCount";

// Modules and Utils
import Layout from "@/modules/Card/Layout/Layout";
import CardHeader from "@/modules/Card/Header/Header";
import CardLoader from "@/modules/CardLoader/CardLoader";

export default function IssueCount() {
  const { issueCount, isLoading } = useIssueCount();

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
    <Layout>
      <CardHeader title="Issue Count" />
      <ReactECharts
        option={option}
        showLoading={isLoading}
        style={{ minHeight: "350px", width: "100%" }}
        notMerge={true}
      />
    </Layout>
  );
}
