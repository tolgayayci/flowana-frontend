import ReactECharts from "echarts-for-react";

import useLanguageBreakdown from "@/models/github/useLanguageBreakdown";
import CardLoader from "@/modules/CardLoader/CardLoader";

export default function LanguageBreakdown() {
  const { languageBreakdown, isLoading } = useLanguageBreakdown("polkadot");

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
    <div className="border-2 border-indigo-300 rounded-lg py-12">
      <h1 className="ml-12 mb-8">Language Breakdown</h1>
      <ReactECharts
        option={option}
        showLoading={isLoading}
        style={{ minHeight: "350px", width: "100%" }}
        notMerge={true}
      />
    </div>
  );
}
