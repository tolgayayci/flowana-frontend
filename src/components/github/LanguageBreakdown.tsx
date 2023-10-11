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

    // Sort the data by size in descending order
const sortedData = [...languageBreakdown].sort((a, b) => b.size - a.size);
  
// Define a threshold for the minimum percentage a language must have to get its own slice
const thresholdPercentage = 3; // for instance, 5%
const totalSize = sortedData.reduce((sum, language) => sum + language.size, 0);

let othersSize = 0;
const thresholdData = sortedData.filter(language => {
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

  const topLanguageName = thresholdData[0].name; // Get the name of the top language

  // Generate series data for all languages
  const allSeriesData = thresholdData.map((item) => {
    let isSelected = item.name === topLanguageName;
    return {
      name: item.name,
      value: item.size,
      // selected: isSelected,
      // itemStyle: isSelected ? { borderWidth: 2 } : {}, // Optional: Highlight selected item with a border
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
  // // Generate legend data
  // const legendData = languageBreakdown.map(function (item) {
  //   return item.name;
  // });

  // // Generate series data
  // const seriesData = languageBreakdown.map(function (item) {
  //   return {
  //     name: item.name,
  //     value: item.size,
  //   };
  // });

  // // Configure the chart options
  // var option = {
  //   tooltip: {
  //     trigger: "item",
  //     formatter: "{b}: {c} ({d}%)",
  //   },
  //   legend: {
  //     orient: "horizontal",
  //     top: "5%", // Adjust this value if needed for vertical positioning
  //     left: "center",
  //     data: legendData,
  //   },
  //   series: [
  //     {
  //       name: "File Size",
  //       type: "pie",
  //       radius: "55%",
  //       center: ["50%", "60%"],
  //       data: seriesData,
  //       color: colorPalette, // Using the defined color palette
  //       emphasis: {
  //         itemStyle: {
  //           shadowBlur: 10,
  //           shadowOffsetX: 0,
  //           shadowColor: "rgba(0, 0, 0, 0.5)",
  //         },
  //       },
  //     },
  //   ],
  // };

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
