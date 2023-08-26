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

  // Sort the data by size in descending order
  const sortedData = [...languageBreakdown].sort((a, b) => b.size - a.size);

  // Generate legend data for top 5 languages
  const topLegends = sortedData.slice(0, 4).map((item) => item.name);

  const topLanguageName = sortedData[0].name; // Get the name of the top language

  // Generate series data for all languages
  const allSeriesData = languageBreakdown.map((item) => {
    let isSelected = item.name === topLanguageName;
    return {
      name: item.name,
      value: item.size,
      selected: isSelected,
      itemStyle: isSelected ? { borderWidth: 2 } : {}, // Optional: Highlight selected item with a border
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
          show: true,
          position: "center",
          formatter: function (params: any) {
            if (params.data.selected) {
              return params.name;
            } else {
              return "";
            }
          },
          fontSize: 20,
          fontWeight: "normal",
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 20,
            fontWeight: "normal",
          },
          itemStyle: {
            shadowBlur: 5,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.25)",
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
