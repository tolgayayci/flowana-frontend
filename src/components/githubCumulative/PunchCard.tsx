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

  if (isLoading)
    return <CardLoader element={<CardHeader title="Punch Card" />} />;
  if (!punchCard)
    return <NoData element={<CardHeader title="Punch Card" />} message="" />;

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
    },
    series: [
      {
        name: "Punch Card",
        type: "scatter",
        symbolSize: function (val: any) {
          return val[2] * 0.015; // Here, the dots will be one-tenth of their previous size.
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
      <CardHeader title="Punch Card" />
      <ReactECharts
        option={option}
        showLoading={isLoading}
        style={{ minHeight: "450px", width: "100%" }}
        notMerge={true}
      />
    </Layout>
  );
}
