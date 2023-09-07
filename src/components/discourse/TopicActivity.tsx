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
            tooltip="Track the creation of topics on a chart, broken down by daily, weekly, monthly, or yearly intervals. This allows you to observe activity patterns and trends on the platform across different time frames."
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
          tooltip="Track the creation of topics on a chart, broken down by daily, weekly, monthly, or yearly intervals. This allows you to observe activity patterns and trends on the platform across different time frames."
          selectedInterval={selectedInterval}
          setSelectedInterval={setSelectedInterval}
          intervals={intervals}
        />
      }
      message=""
    />;
  }

  const option = {
    color: "#778dd1", // Line color
    xAxis: {
      type: "category",
      boundaryGap: false,
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
        color: "#778dd1", // sfred.900
      },
      lineStyle: {
        color: "#778dd1", // sfblue.900
      }
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
        start: 60,
        end: 100,
        handleStyle: {
          color: "#e8efff", // sfred.800
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
        tooltip="Track the creation of topics on a chart, broken down by daily, weekly, monthly, or yearly intervals. This allows you to observe activity patterns and trends on the platform across different time frames."
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
