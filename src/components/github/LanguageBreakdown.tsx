import ReactECharts from "echarts-for-react";

// Hooks
import useLanguageBreakdown from "@/models/github/useLanguageBreakdown";

// Modules and Utils
import Layout from "@/modules/Card/Layout/Layout";
import CardLoader from "@/modules/CardLoader/CardLoader";
import CardHeader from "@/modules/Card/Header/Header";

export default function LanguageBreakdown() {
  const { languageBreakdown, isLoading } = useLanguageBreakdown();

  if (isLoading) return <CardLoader />;
  if (!languageBreakdown) return;

  // Generate legend data
  const legendData = languageBreakdown.map(function (item) {
    return item.name;
  });

  // Generate series data
  const seriesData = languageBreakdown.map(function (item) {
    return {
      name: item.name,
      value: item.size,
    };
  });

  // Configure the chart options
  var option = {
    tooltip: {
      trigger: "item",
      formatter: "{b}: {c} ({d}%)",
    },
    legend: {
      orient: "horizontal",
      top: "top",
      left: "center",
      data: legendData,
    },
    series: [
      {
        name: "File Size",
        type: "pie",
        radius: "55%",
        center: ["50%", "60%"],
        data: seriesData,
        emphasis: {
          itemStyle: {
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
      <CardHeader title="Language Breakdown" />
      <ReactECharts
        option={option}
        showLoading={isLoading}
        style={{ minHeight: "350px", width: "100%" }}
        notMerge={true}
      />
    </Layout>
  );
}
