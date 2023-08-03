import ReactECharts from "echarts-for-react";

// Hooks
import useDevelopersTotalMonthlyActiveDevChart from "@/models/developers/useDevelopersTotalMonthlyActiveDevChart";

// Models and Utils
import Layout from "@/modules/Card/Layout/Layout";
import CardHeader from "@/modules/Card/Header/Header";

export default function TotalMonthlyActiveDevChart() {
  const { totalMonthlyActiveDevChart, isLoading } =
    useDevelopersTotalMonthlyActiveDevChart();

  const seriesData = totalMonthlyActiveDevChart?.series[0].data.map(
    (point) => ({
      name: new Date(point.date).toISOString().slice(0, 10), // Convert date to ISO format
      value: point.value,
    })
  );

  const option = {
    tooltip: {
      trigger: "axis", // Show tooltips when hovering on data points
    },
    xAxis: {
      type: "category",
      data: seriesData?.map((point) => point.name),
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        type: "line",
        data: seriesData?.map((point) => point.value),
        smooth: true,
        // Add area shading below the line
        areaStyle: {
          color: "rgba(92, 151, 191, 0.3)",
        },
        // Add shadow for the line
        itemStyle: {
          shadowBlur: 10,
          shadowColor: "rgba(0, 0, 0, 0.3)",
        },
        lineStyle: {
          // Add shadow for the line
          shadowBlur: 5,
          shadowColor: "rgba(0, 0, 0, 0.1)",
        },
      },
    ],
  };

  return (
    <Layout>
      <CardHeader title="Total Monthly Active Dev Chart" />
      <ReactECharts
        option={option}
        showLoading={isLoading}
        style={{ minHeight: "350px", width: "100%" }}
        notMerge={true}
      />
    </Layout>
  );
}
