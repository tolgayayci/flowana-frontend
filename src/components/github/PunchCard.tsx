import ReactECharts from "echarts-for-react";

//Hooks
import usePunchCard from "@/models/github/usePunchCard";

//Modules and Utils
import Layout from "@/modules/Card/Layout/Layout";
import CardHeader from "@/modules/Card/Header/Header";
import CardLoader from "@/modules/CardLoader/CardLoader";

export default function PunchCard() {
  const { punchCard, isLoading } = usePunchCard();

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
          formatter: (params: any) => params.value[2],
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
    <Layout>
      <CardHeader title="Punch Card" />
      <ReactECharts
        option={option}
        showLoading={isLoading}
        style={{ minHeight: "350px", width: "100%" }}
        notMerge={true}
      />
    </Layout>
  );
}
