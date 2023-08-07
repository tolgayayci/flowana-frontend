import ReactECharts from "echarts-for-react";
import { useState } from "react";

// Hooks
import useVotingPowerChart from "@/models/governance/useVotingPowerChart";

// Models and Utils
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

  const option = {
    tooltip: {
      trigger: "axis",
      formatter: "{b}<br/>{a0}: {c0}<br/>{a1}: {c1}",
    },
    legend: {
      data: votingPowerChart?.series.map((item) => item.name),
      textStyle: {
        color: "#666",
        fontSize: 14,
      },
    },
    xAxis: {
      type: "category",
      data: votingPowerChart?.series[0].data.map((item) => item.timestamp),
      axisLabel: {
        textStyle: {
          color: "#666",
          fontSize: 12,
        },
      },
    },
    yAxis: {
      type: "value",
      axisLabel: {
        textStyle: {
          color: "#666",
          fontSize: 12,
        },
      },
    },
    series: votingPowerChart?.series.map((item) => ({
      name: item.name,
      type: "line",
      data: item.data.map((point) => point.balance),
    })),
    color: ["#FF6A4D", "#0066CC", "#44AD52", "#FFC107", "#FF5722"], // Custom color scheme
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
        style={{ minHeight: "350px", width: "100%" }}
        notMerge={true}
      />
    </Layout>
  );
}
