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
    return <CardLoader element={<CardHeader title="Tags" />} />;
  }

  if (!discourseTags || discourseTags.length === 0) {
    return <NoData element={<CardHeader title="Tags" />} message="" />;
  }

  // Sort the tags by count in descending order
  const sortedTags = [...discourseTags].sort((a, b) => b.count - a.count);

  // Get the top 6 tags for the legends
  const topTags = sortedTags.slice(0, 4);

  const option = {
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b}: {c} ({d}%)",
    },
    legend: {
      orient: "horizontal",
      top: "top",
      data: topTags.map((tag) => tag.text),
    },
    series: [
      {
        name: "Tags",
        type: "pie",
        radius: "50%",
        data: sortedTags.map((tag) => ({
          value: tag.count,
          name: tag.text,
        })),
        label: {
          formatter: "{b}: {c} ({d}%)",
        },
      },
    ],
  };

  return (
    <Layout>
      <CardHeader title="Tags" />
      <div className="h-full flex items-center -mt-16">
        <ReactECharts
          option={option}
          showLoading={isLoading}
          style={{ minHeight: "350px", width: "100%" }}
          notMerge={true}
        />
      </div>
    </Layout>
  );
}
