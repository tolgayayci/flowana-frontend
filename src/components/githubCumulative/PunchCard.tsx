import { useState, useEffect } from "react";
import ReactECharts from "echarts-for-react";

//Hooks
import useCumulativePunchCard from "@/models/githubCumulative/useCumulativePunchCard";

//Modules and Utils
import Layout from "@/modules/Card/Layout/Layout";
import CardHeader from "@/modules/Card/Header/Header";
import CardLoader from "@/modules/CardLoader/CardLoader";
import NoData from "@/modules/NoData/NoData";

export default function PunchCard() {
  const { punchCard, isLoading } = useCumulativePunchCard();
  const [chartSize, setChartSize] = useState({
    maxSymbolSize: 40,
    minSymbolSize: 5,
  });

  // Responsive design for symbol sizes based on screen width
  useEffect(() => {
    const updateSize = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth < 768) {
        // Adjust these values as needed for different breakpoints
        setChartSize({ maxSymbolSize: 10, minSymbolSize: 2 });
      } else {
        setChartSize({ maxSymbolSize: 40, minSymbolSize: 5 });
      }
    };
    window.addEventListener("resize", updateSize);
    updateSize(); // Initialize size on first render
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  if (isLoading)
    return (
      <CardLoader
        element={
          <CardHeader
            title="Cumulative Punch Card"
            tooltip="Analyze when commits occur across all repositories of the protocol throughout the week. Dots represent the number of commits, enabling you to identify peak contribution times."
          />
        }
      />
    );

  if (!punchCard)
    return (
      <NoData
        element={
          <CardHeader
            title="Cumulative Punch Card"
            tooltip="Analyze when commits occur across all repositories of the protocol throughout the week. Dots represent the number of commits, enabling you to identify peak contribution times."
          />
        }
        message=""
      />
    );

  const hours = [
    "12 am",
    "1 am",
    "2 am",
    "3 am",
    "4 am",
    "5 am",
    "6 am",
    "7 am",
    "8 am",
    "9 am",
    "10 am",
    "11 am",
    "12 pm",
    "1 pm",
    "2 pm",
    "3 pm",
    "4 pm",
    "5 pm",
    "6 pm",
    "7 pm",
    "8 pm",
    "9 pm",
    "10 pm",
    "11 pm",
  ];

  const days = ["Sat", "Fri", "Thu", "Wed", "Tue", "Mon", "Sun"];

  const data = punchCard.map((item) => {
    return [item.hour, item.day, item.commits];
  });

  const maxCommitCount = Math.max(...data.map((item) => item[2])); // Find the maximum commit count in your data

  const option = {
    tooltip: {
      position: "top",
      formatter: function (params: any) {
        return (
          params.value[2] +
          " commits in " +
          hours[params.value[0]] +
          " of " +
          days[params.value[1]]
        );
      },
    },
    grid: {
      left: "3%",
      top: "5%",
      bottom: "10%",
      right: "1%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      data: hours,
      boundaryGap: false,
      splitLine: {
        show: true,
      },
      axisLine: {
        show: false,
      },
    },
    yAxis: {
      type: "category",
      data: days,
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      splitLine: {
        show: false,
      },
      axisLabel: {
        padding: 10, // Add a margin to the right of the y-axis labels
      },
    },
    series: [
      {
        name: "Punch Card",
        type: "scatter",
        symbolSize: function (val) {
          const normalizedSize =
            (val[2] / maxCommitCount) *
              (chartSize.maxSymbolSize - chartSize.minSymbolSize) +
            chartSize.minSymbolSize;
          return normalizedSize;
        },
        data: data,
        animationDelay: function (idx: any) {
          return idx * 5;
        },
      },
    ],
  };

  return (
    <Layout>
      <CardHeader
        title="Cumulative Punch Card"
        tooltip="Analyze when commits occur across all repositories of the protocol throughout the week. Dots represent the number of commits, enabling you to identify peak contribution times."
      />
      <ReactECharts
        option={option}
        showLoading={isLoading}
        style={{ minHeight: "450px", width: "100%" }}
        notMerge={true}
      />
    </Layout>
  );
}
