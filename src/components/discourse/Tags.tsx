import ReactECharts from "echarts-for-react";

// Hooks
import useDiscourseTags from "@/models/discourse/useDiscourseTags";

// Models and Utils
import Layout from "@/modules/Card/Layout/Layout";
import CardHeader from "@/modules/Card/Header/Header";
import CardLoader from "@/modules/CardLoader/CardLoader";
import NoData from "@/modules/NoData/NoData";

export default function Tags() {
  const { discourseTags, isLoading } = useDiscourseTags();

  if (isLoading) {
    return (
      <CardLoader
        element={
          <CardHeader
            title="Tags"
            tooltip="Shows the distribution of tags in a pie chart, reflecting the most frequently used topics in discussions."
          />
        }
      />
    );
  }

  if (!discourseTags || discourseTags.length === 0) {
    return (
      <NoData
        element={
          <CardHeader
            title="Tags"
            tooltip="Shows the distribution of tags in a pie chart, reflecting the most frequently used topics in discussions."
          />
        }
        message=""
      />
    );
  }

  // Sort the tags by count in descending order
  const sortedTags = [...discourseTags].sort((a, b) => b.count - a.count);

  // Get the top 6 tags for the legends
  const topTags = sortedTags.slice(0, 4);

  // Configure the chart options
  var option = {
    tooltip: {
      trigger: "item",
      formatter: "{b}: {c} ({d}%)",
    },
    legend: {
      top: "0%",
      left: "center",
      data: topTags.map((tag) => tag.text),
    },
    series: [
      {
        name: "Tags",
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
            fontSize: 20,
            fontWeight: "bold",
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
        data: sortedTags.map((tag) => ({
          value: tag.count,
          name: tag.text,
        })),
      },
    ],
  };

  return (
    <Layout>
      <CardHeader
        title="Tags"
        tooltip="Shows the distribution of tags in a pie chart, reflecting the most frequently used topics in discussions."
      />
      <div className="h-full flex items-center">
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
