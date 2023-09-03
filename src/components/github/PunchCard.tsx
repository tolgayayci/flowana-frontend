import ReactECharts from "echarts-for-react";

//Hooks
import usePunchCard from "@/models/github/usePunchCard";

//Modules and Utils
import Layout from "@/modules/Card/Layout/Layout";
import CardHeader from "@/modules/Card/Header/Header";
import CardLoader from "@/modules/CardLoader/CardLoader";
import NoData from "@/modules/NoData/NoData";

export default function PunchCard() {
  const { punchCard, isLoading } = usePunchCard();

  if (isLoading)
    return (
      <CardLoader
        element={
          <CardHeader
            title="Punch Card"
            tooltip="Analyze when commits happen throughout the week with this punch card. Dots represent the number of commits, allowing you to spot peak contribution times."
          />
        }
      />
    );
  if (!punchCard)
    return (
      <NoData
        element={
          <CardHeader
            title="Punch Card"
            tooltip="Analyze when commits happen throughout the week with this punch card. Dots represent the number of commits, allowing you to spot peak contribution times."
          />
        }
        message=""
      />
    );

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

  const hoursFormatted = hours.map((hour) => {
    if (hour === 0) {
      return "12 am"; // Special case for midnight
    } else if (hour < 12) {
      return `${hour} am`; // Morning hours
    } else if (hour === 12) {
      return "12 pm"; // Special case for noon
    } else {
      return `${hour - 12} pm`; // Afternoon and evening hours
    }
  });

  const option = {
    tooltip: {
      position: "top",
      formatter: (params: any) => {
        const day = punchCard.map((d) => [d.day, d.hour, d.commits]);
        return `Number of commits on ${day[0]}, ${day[1]} ${day[2]}`;
      },
    },
    legend: {
      data: ["Number of Commits"], // add your legend title
      align: "right",
      textStyle: {
        color: "#333333", // Using sfblack color
      },
    },
    grid: {
      left: "1%",
      right: "5%",
      top: "3%",
      bottom: "5%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      data: hoursFormatted,
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
      orient: "vertical",
      left: "95%",
      bottom: "center",
      inRange: {
        color: ["#C9DBE5", "#2F5061"],
      },
    },
    series: [
      {
        type: "heatmap",
        data: punchCard.map((d) => [d.hour, d.day, d.commits]),
        label: {
          show: true,
          color: "#000",
          formatter: (params: any) => params.value[2],
        },
        emphasis: {
          itemStyle: {
            borderColor: "#333333", // Using sfblack color for emphasis
            borderWidth: 2,
          },
        },
      },
    ],
  };

  return (
    <Layout>
      <CardHeader
        title="Punch Card"
        tooltip="Analyze when commits happen throughout the week with this punch card. Dots represent the number of commits, allowing you to spot peak contribution times."
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
