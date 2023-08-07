import { useState } from "react";
import ReactECharts from "echarts-for-react";

// Hooks
import useDiscourseTopicActivity from "@/models/discourse/useDiscourseTopicActivity";

// Models and Utils
import Layout from "@/modules/Card/Layout/Layout";
import CardHeader from "@/modules/Card/Header/Header";

// Types
import { Interval } from "@/types/general";

const intervals: Interval[] = [
  { name: "Day", value: "daily" },
  { name: "Week", value: "weekly" },
  { name: "Month", value: "monthly" },
  { name: "Year", value: "yearly" },
];

export default function TopicActivity() {
  const [selectedInterval, setSelectedInterval] = useState(intervals[1]);
  const { discourseTopicActivity, isLoading } = useDiscourseTopicActivity(
    selectedInterval.value
  );

  if (isLoading) {
    return (
      <Layout>
        <CardHeader
          title="Topic Activity"
          selectedInterval={selectedInterval}
          setSelectedInterval={setSelectedInterval}
          intervals={intervals}
        />
        <div className="flex justify-center items-center h-96">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      </Layout>
    );
  }

  const option = {
    color: "#1890FF", // Line color
    xAxis: {
      type: "category",
      data: discourseTopicActivity?.xAxis.data,
      axisLabel: {
        rotate: 45, // Rotate x-axis labels for better visibility
      },
    },
    yAxis: {
      type: "value",
    },
    legend: {
      // Show the legend to display the series name
      data: [discourseTopicActivity?.series[0]],
    },
    series: [
      {
        data: discourseTopicActivity?.series[0].data,
        type: "line",
        lineStyle: {
          shadowColor: "rgba(0, 0, 0, 0.3)", // Shadow color
          shadowBlur: 10, // Shadow blur size
          shadowOffsetY: 8, // Shadow vertical offset
        },
      },
    ],
    grid: {
      top: "10%", // Adjust the top margin of the chart
      left: "3%", // Adjust the left margin of the chart
      right: "3%", // Adjust the right margin of the chart
      bottom: "3%", // Adjust the bottom margin of the chart
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
