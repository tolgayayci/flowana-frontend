import ReactECharts from "echarts-for-react";
import { useState } from "react";

// Hooks
import useVotingPowerChart from "@/models/governance/useVotingPowerChart";

// Components and Utils
import Layout from "@/modules/Card/Layout/Layout";
import CardLoader from "@/modules/CardLoader/CardLoader";
import CardHeader from "@/modules/Card/Header/Header";
import NoData from "@/modules/NoData/NoData";

import { Interval } from "@/types/general";
import { formatChartDate, formatLargeNumber } from "@/utils/functions";

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

  if (isLoading) {
    return (
      <CardLoader
        element={
          <CardHeader
            title="Voting Power Activity"
            tooltip="Visualizes the voting power distribution in the protocol's governance system. Monitor key stakeholders, their voting balances, and track changes in their influence over time."
            intervals={intervals}
            selectedInterval={selectedInterval}
            setSelectedInterval={setSelectedInterval}
          />
        }
      />
    );
  }

  if (
    !votingPowerChart ||
    !votingPowerChart.series ||
    !votingPowerChart.series[0].data
  ) {
    return (
      <NoData
        element={
          <CardHeader
            title="Voting Power Activity"
            tooltip="Visualizes the voting power distribution in the protocol's governance system. Monitor key stakeholders, their voting balances, and track changes in their influence over time."
            intervals={intervals}
            selectedInterval={selectedInterval}
            setSelectedInterval={setSelectedInterval}
          />
        }
        message=""
      />
    );
  }

  // Extract and sort timestamps from the series
  const sortedTimestamps = votingPowerChart?.series[0].data
    .map((item) => item.timestamp)
    .sort((a, b) => new Date(a).valueOf() - new Date(b).valueOf())
    .map(formatChartDate);

  // Sort series by their data length and slice top 5 for legends
  const sortedSeries = votingPowerChart?.series
    .sort((a, b) => b.data.length - a.data.length)
    .slice(0, 5);

  const option = {
    tooltip: {
      trigger: "axis",
    },
    xAxis: {
      type: "category",
      data: sortedTimestamps,
      // ... the rest of your xAxis options ...
    },
    yAxis: {
      type: "value",
      axisLabel: {
        textStyle: {
          color: "#666",
          fontSize: 12,
        },
        formatter: function (value) {
          return formatLargeNumber(value.toString());
        },
      },
    },
    legend: {
      data: sortedSeries?.map((item) => item.name),
      textStyle: {
        color: "#666",
        fontSize: 14,
      },
    },
    series: sortedSeries?.map((item, index) => ({
      name: item.name,
      type: "line",
      showSymbol: false,
      data: item.data.map((point) => point.balance),
      lineStyle: {
        width: 4, // Adjust this value for the desired line width
      },
    })),
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
      top: "18%",
      bottom: "18%",
      containLabel: true,
    },
  };

  return (
    <Layout>
      <CardHeader
        title="Voting Power Activity"
        tooltip="Visualizes the voting power distribution in the protocol's governance system. Monitor key stakeholders, their voting balances, and track changes in their influence over time."
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
