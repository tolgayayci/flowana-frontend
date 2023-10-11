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
  
    const days = [
      "Saturday",
      "Friday",
      "Thursday",
      "Wednesday",
      "Tuesday",
      "Monday",
      "Sunday",
    ];
  
    const data = punchCard.map((item) => {
      return [item.hour, item.day, item.commits];
    });
  
    const maxSymbolSize = 40;
    const minSymbolSize = 5;
  
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
        left: "1%",
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
              (val[2] / maxCommitCount) * (maxSymbolSize - minSymbolSize) +
              minSymbolSize;
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
