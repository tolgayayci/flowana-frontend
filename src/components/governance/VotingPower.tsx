import ReactECharts from "echarts-for-react";
import { useState } from "react";

// Hooks
import useVotingPowerChart from "@/models/governance/useVotingPowerChart";

// Components and Utils
import Layout from "@/modules/Card/Layout/Layout";
import CardHeader from "@/modules/Card/Header/Header";

import { Interval } from "@/types/general";

const intervals: Interval[] = [
  { name: "Week", value: "WEEK" },
  { name: "Month", value: "MONTH" },
  { name: "Year", value: "YEAR" },
];

export default function VotingPower() {
  const [selectedInterval, setSelectedInterval] = useState(intervals[0]);
  const { votingPowerChart, isLoading } = useVotingPowerChart(
    selectedInterval.value
  );

  // Convert timestamp to date
  const convertTimestampToDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  };

  // Extract and sort timestamps from the series
  const sortedTimestamps = votingPowerChart?.series[0].data
    .map((item) => item.timestamp)
    .sort((a, b) => new Date(a) - new Date(b))
    .map(convertTimestampToDate);

  // Sort series by their data length and slice top 5 for legends
  const sortedSeries = votingPowerChart?.series
    .sort((a, b) => b.data.length - a.data.length)
    .slice(0, 5);

  const distinctColors = [
    "#FF4500",
    "#228B22",
    "#4B0082",
    "#FFD700",
    "#1E90FF",
  ];

  const option = {
    tooltip: {
      trigger: "axis",
      formatter: "{b}<br/>{a0}: {c0}<br/>{a1}: {c1}",
    },
    legend: {
      data: sortedSeries?.map((item) => item.name),
      textStyle: {
        color: "#666",
        fontSize: 14,
      },
    },
    xAxis: {
      type: "category",
      data: sortedTimestamps,
      // ... the rest of your xAxis options ...
    },
    series: sortedSeries?.map((item, index) => ({
      name: item.name,
      type: "line",
      data: item.data.map((point) => point.balance),
      itemStyle: {
        color: distinctColors[index],
      },
    })),
    yAxis: {
      type: "value",
      axisLabel: {
        textStyle: {
          color: "#666",
          fontSize: 12,
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
      top: "14%",
      bottom: "20%",
      containLabel: true,
    },
  };

  return (
    <Layout>
      <CardHeader
        title="Voting Power"
        intervals={intervals}
        selectedInterval={selectedInterval}
        setSelectedInterval={setSelectedInterval}
      />
      <ReactECharts
        option={option}
        showLoading={isLoading}
        style={{ minHeight: "400px", width: "100%" }}
        notMerge={true}
      />
    </Layout>
  );
}
