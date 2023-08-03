import ReactECharts from "echarts-for-react";

// Hooks
import useDevelopersMonthlyActiveDevChart from "@/models/developers/useDevelopersMonthlyActiveDevChart";

// Models and Utils
import Layout from "@/modules/Card/Layout/Layout";
import CardHeader from "@/modules/Card/Header/Header";

export default function MonthlyActiveDevChart() {
  const { monthlyActiveDevChart, isLoading } =
    useDevelopersMonthlyActiveDevChart();

  // Convert the data into the format required by ECharts
  const seriesData = monthlyActiveDevChart?.series.map((series) =>
    series.data.map((point) => ({
      name: new Date(point.date).toISOString().slice(0, 10),
      value: point.value,
    }))
  );

  const option = {
    tooltip: {
      trigger: "axis",
    },
    xAxis: {
      type: "category",
      data: seriesData?.[0]?.map((point) => point.name), // Assuming all series have the same data points
    },
    yAxis: {
      type: "value",
    },
    series: monthlyActiveDevChart?.series.map((series, index) => ({
      name: series.name,
      type: "line",
      data: seriesData?.[index]?.map((point) => point.value),
      smooth: true,
      areaStyle: {
        color: `rgba(152, 83, 150, ${(index + 1) * 0.2})`, // Varying opacity for each series
      },
      itemStyle: {
        shadowBlur: 10,
        shadowColor: "rgba(0, 0, 0, 0.3)",
      },
      lineStyle: {
        shadowBlur: 5,
        shadowColor: "rgba(0, 0, 0, 0.1)",
      },
    })),
  };

  return (
    <Layout>
      <CardHeader title="Monthly Active Dev Chart" />
      <ReactECharts
        option={option}
        showLoading={isLoading}
        style={{ minHeight: "350px", width: "100%" }}
        notMerge={true}
      />
    </Layout>
  );
}
