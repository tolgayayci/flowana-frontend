import { useState } from "react";
import ReactECharts from "echarts-for-react";

// Hooks
import useDiscourseTopicActivity from "@/models/discourse/useDiscourseTopicActivity";

// Models and Utils
import Layout from "@/modules/Card/Layout/Layout";
import CardHeader from "@/modules/Card/Header/Header";
import CardLoader from "@/modules/CardLoader/CardLoader";
import NoData from "@/modules/NoData/NoData";

// Types
import { Interval } from "@/types/general";
import { formatChartDate } from "@/utils/functions";

const intervals: Interval[] = [
  { name: "Day", value: "daily" },
  { name: "Week", value: "weekly" },
  { name: "Month", value: "monthly" },
  { name: "Year", value: "yearly" },
];

export default function TopicActivity() {
  const [selectedInterval, setSelectedInterval] = useState(intervals[2]);
  const { discourseTopicActivity, isLoading } = useDiscourseTopicActivity(
    selectedInterval.value
  );

  if (isLoading) {
    return (
      <CardLoader
        element={
          <CardHeader
            title="Topic Activity"
            selectedInterval={selectedInterval}
            setSelectedInterval={setSelectedInterval}
            intervals={intervals}
          />
        }
      />
    );
  }

  if (!discourseTopicActivity) {
    <NoData
      element={
        <CardHeader
          title="Topic Activity"
          selectedInterval={selectedInterval}
          setSelectedInterval={setSelectedInterval}
          intervals={intervals}
        />
      }
      message=""
    />;
  }

  const option = {
    color: "#1890FF", // Line color
    xAxis: {
      type: "category",
      data: discourseTopicActivity?.xAxis.data.map((date) =>
        formatChartDate(date)
      ),
    },
    yAxis: {
      type: "value",
    },
    series: discourseTopicActivity!["series"].map((s) => ({
      ...s,
      name: "Topic Activity",
      smooth: true, // This makes the lines smooth
      showSymbol: false, // This removes the dots on the line
      itemStyle: {
        color: "#DC5057", // sfred.900
        shadowBlur: 10,
        shadowOffsetX: 0,
        shadowOffsetY: 3,
        shadowColor: "rgba(0, 0, 0, 0.3)",
      },
      lineStyle: {
        color: "#1D313B", // sfblue.900
        width: 3,
      },
    })),
    renderer: "svg",
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
        crossStyle: {
          color: "#999",
        },
      },
    },
    dataZoom: [
      // Slider
      {
        type: "slider",
        start: 0,
        end: 100,
        handleStyle: {
          color: "#E57F84", // sfred.800
          shadowBlur: 3,
          shadowColor: "rgba(0, 0, 0, 0.6)",
          shadowOffsetX: 2,
          shadowOffsetY: 2,
        },
      },
      {
        type: "inside",
      },
    ],
    grid: {
      left: "1%",
      right: "1%",
      top: "5%",
      bottom: "20%",
      containLabel: true,
    },
  };

  return (
    <Layout>
      <CardHeader
        title="Topic Activity"
        selectedInterval={selectedInterval}
        setSelectedInterval={setSelectedInterval}
        intervals={intervals}
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
