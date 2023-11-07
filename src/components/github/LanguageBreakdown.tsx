import ReactECharts from "echarts-for-react";

// Hooks
import useLanguageBreakdown from "@/models/github/useLanguageBreakdown";

// Modules and Utils
import Layout from "@/modules/Card/Layout/Layout";
import CardLoader from "@/modules/CardLoader/CardLoader";
import CardHeader from "@/modules/Card/Header/Header";
import NoData from "@/modules/NoData/NoData";

export default function LanguageBreakdown() {
  const { languageBreakdown, isLoading } = useLanguageBreakdown();

  if (isLoading)
    return (
      <CardLoader
        element={
          <CardHeader
            title="Language Breakdown"
            tooltip="Visualizes the distribution of programming languages used in the repository, highlighting the dominant languages by code size."
          />
        }
      />
    );

  if (!languageBreakdown)
    return (
      <NoData
        element={
          <CardHeader
            title="Language Breakdown"
            tooltip="Visualizes the distribution of programming languages used in the repository, highlighting the dominant languages by code size."
          />
        }
        message=""
      />
    );

  // Sort the data by size in descending order
  const sortedData = [...languageBreakdown].sort((a, b) => b.size - a.size);

  // Define a threshold for the minimum percentage a language must have to get its own slice
  const thresholdPercentage = 3; // for instance, 5%
  const totalSize = sortedData.reduce(
    (sum, language) => sum + language.size,
    0
  );

  let othersSize = 0;
  const thresholdData = sortedData.filter((language) => {
    if ((language.size / totalSize) * 100 < thresholdPercentage) {
      othersSize += language.size;
      return false;
    }
    return true;
  });

  if (othersSize > 0) {
    thresholdData.push({
      name: "Others",
      size: othersSize,
      percentage: (othersSize / totalSize) * 100,
    });
  }

  // Generate legend data for top 5 languages
  const topLegends = thresholdData.slice(0, 4).map((item) => item.name);

  // Generate series data for all languages
  const allSeriesData = thresholdData.map((item) => {
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
      top: "2%",
      left: "center",
      data: topLegends,
    },
    series: [
      {
        name: "Access From",
        type: "pie",
        radius: ["40%", "70%"],
        avoidLabelOverlap: false,
        selectedMode: "single", // This allows for only one slice to be selected at a time
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
        data: allSeriesData,
      },
    ],
  };

  return (
    <Layout>
      <CardHeader
        title="Language Breakdown"
        tooltip="Visualizes the distribution of programming languages used in the repository, highlighting the dominant languages by code size."
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
