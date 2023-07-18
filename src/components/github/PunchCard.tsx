import usePunchCard from "@/models/github/usePunchCard";

import ReactECharts from "echarts-for-react";

import CardLoader from "@/modules/CardLoader/CardLoader";

export default function PunchCard() {
  const { punchCard, isLoading } = usePunchCard("polkadot");

  if (isLoading) return <CardLoader />;
  if (!punchCard) return;

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const hours = Array.from(Array(24).keys());

  const option = {
    tooltip: {
      position: "top",
      formatter: (params) => {
        const { day, hour, commits } = params.data;
        return `Number of commits on ${days[day]}, ${hour}:00: ${commits}`;
      },
    },
    grid: {
      left: "5%",
      right: "5%",
      bottom: "5%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      data: hours,
      boundaryGap: true,
      splitArea: { show: true },
      axisTick: { alignWithLabel: true },
    },
    yAxis: {
      type: "category",
      data: days,
      splitArea: { show: true },
    },
    visualMap: {
      min: 0,
      max: Math.max(...punchCard.map((d) => d.commits)),
      calculable: true,
      orient: "horizontal",
      left: "center",
      bottom: "5%",
      inRange: {
        color: ["#f5f5f5", "steelblue"],
      },
    },
    series: [
      {
        type: "heatmap",
        data: punchCard.map((d) => [d.hour, d.day, d.commits]),
        label: {
          show: true,
          color: "#000",
          formatter: (params) => params.value[2],
        },
        emphasis: {
          itemStyle: {
            borderColor: "#000",
            borderWidth: 2,
          },
        },
      },
    ],
  };

  return (
    <div className="border-2 border-indigo-300 rounded-lg py-12">
      <h1 className="ml-12 mb-8">Punch Card</h1>
      <ReactECharts
        option={option}
        showLoading={isLoading}
        style={{ minHeight: "350px", width: "100%" }}
        notMerge={true}
      />
    </div>
  );
}
