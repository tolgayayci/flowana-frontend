import ReactECharts from "echarts-for-react";

// Hooks
import useCumulativeLanguageBreakdown from "@/models/githubCumulative/useCumulativeLanguageBreakdown";

// Modules and Utils
import Layout from "@/modules/Card/Layout/Layout";
import CardLoader from "@/modules/CardLoader/CardLoader";
import CardHeader from "@/modules/Card/Header/Header";
import NoData from "@/modules/NoData/NoData";

export default function LanguageBreakdown() {
  const { languageBreakdown, isLoading } = useCumulativeLanguageBreakdown();

  if (isLoading)
    return <CardLoader element={<CardHeader title="Language Breakdown" />} />;

  if (!languageBreakdown)
    return (
      <NoData element={<CardHeader title="Language Breakdown" />} message="" />
    );

  // Color palette based on the provided styles
  const colorPalette = [
    "#2F5061",
    "#5B93AF",
    "#4A7D98", // sfblue
    "#4297A0",
    "#8DC9D0",
    "#70BCC4", // sfgreen
    "#FAE5E6",
    "#ECA1A5",
    "#E57F84", // sfred
  ];

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

  const topLegends = legendData.slice(0, 4);

  // Configure the chart options
  var option = {
    tooltip: {
      trigger: "item",
      formatter: "{b}: {c} ({d}%)",
    },
    legend: {
      orient: "vertical",
      right: "top",
      data: topLegends, // Use the top 4 legends
    },
    series: [
      {
        name: "File Size",
        type: "pie",
        radius: "55%",
        center: ["50%", "60%"],
        data: seriesData,
        color: colorPalette, // Using the defined color palette
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
      <div className="h-full flex items-center -mt-8">
        <ReactECharts
          option={option}
          showLoading={isLoading}
          style={{ minHeight: "450px", width: "100%" }}
          notMerge={true}
        />
      </div>
    </Layout>
  );
}
