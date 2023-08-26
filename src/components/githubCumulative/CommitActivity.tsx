import { useState, useEffect } from "react";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";
// Hooks
import useCumulativeCommitActivity from "@/models/githubCumulative/useCumulativeCommitActivity";

// Modules and Utils
import Layout from "@/modules/Card/Layout/Layout";
import CardHeader from "@/modules/Card/Header/Header";
import CardLoader from "@/modules/CardLoader/CardLoader";
import NoData from "@/modules/NoData/NoData";

import { ICommitActivity } from "@/types/githubTypes";

export default function CommitActivity() {
  const { commitActivity, isLoading } = useCumulativeCommitActivity();

  const [selectedWeek, setSelectedWeek] = useState<ICommitActivity | null>(
    null
  );

  useEffect(() => {
    if (commitActivity && commitActivity.length > 0) {
      setSelectedWeek(commitActivity[commitActivity.length - 1]);
    }
  }, [commitActivity]);

  if (isLoading)
    return <CardLoader element={<CardHeader title="Commit Activity" />} />;

  if (!commitActivity || !commitActivity[0].total)
    return (
      <NoData element={<CardHeader title="Commit Activity" />} message="" />
    );

  const handleClick = (params: any) => {
    const weekIndex = params.dataIndex;
    const clickedWeek = commitActivity[weekIndex];
    setSelectedWeek(clickedWeek);
  };

  const formatDateRange = (timestamp: number) => {
    const startDate = new Date(timestamp * 1000); // start of the week
    const endDate = new Date(timestamp * 1000 + 6 * 86400000); // end of the week

    return `${startDate.getDate()} ${startDate.toLocaleString("default", {
      month: "short",
    })} ${startDate.getFullYear()} - ${endDate.getDate()} ${endDate.toLocaleString(
      "default",
      { month: "short" }
    )} ${endDate.getFullYear()}`;
  };

  const option = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    xAxis: {
      type: "category",
      data: commitActivity.map((week) => {
        const date = new Date(week.week * 1000); // UNIX timestamp is in seconds, JS expects milliseconds
        return `${date.getDate()} ${date.toLocaleString("default", {
          month: "short",
        })} ${date.getFullYear()}`; // Format: "dd MMM yyyy"
      }),
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: commitActivity.map((week) => week.total),
        type: "bar",
        name: "Commit Count",
        itemStyle: {
          color: "#3C677C", // using sfblue.500 for a solid color
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowOffsetY: 3,
          shadowColor: "rgba(0, 0, 0, 0.3)",
        },
      },
    ],
    grid: {
      left: "1%",
      right: "1%",
      top: "10%",
      bottom: "17%",
      containLabel: true,
    },
  };

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const selectedWeekOption = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "line",
        lineStyle: {
          color: "#2F5061", // sfblue.DEFAULT
        },
      },
    },
    xAxis: {
      type: "category",
      data: days,
      axisLine: {
        lineStyle: {
          color: "#2F5061", // sfblue.DEFAULT
        },
      },
    },
    yAxis: {
      type: "value",
      axisLine: {
        lineStyle: {
          color: "#2F5061", // sfblue.DEFAULT
        },
      },
    },
    series: [
      {
        data: selectedWeek ? selectedWeek.days : [],
        type: "line",
        name: "Commit Count",
        smooth: true, // To make the line chart smooth
        showSymbol: false, // To hide the dots on the line chart
        itemStyle: {
          color: "#DC5057", // sfred.900
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowOffsetY: 3,
          shadowColor: "rgba(0, 0, 0, 0.3)",
        },
        lineStyle: {
          color: "#1D313B", // sfblue.900
        },
        areaStyle: {
          color: "#2F5061", // sfblue.DEFAULT
        },
      },
    ],
    grid: {
      left: "1%",
      right: "1%",
      top: "10%",
      bottom: "17%",
      containLabel: true,
    },
  };

  return (
    <Layout>
      <CardHeader title="Commit Activity" />
      <ReactECharts
        option={option}
        style={{ minHeight: "150px" }}
        onEvents={{ click: handleClick }}
      />
      {selectedWeek && (
        <div className="border-sfblue-700 border-2 py-12 px-8 rounded-lg mt-4 mb-2">
          <CardHeader
            title={`${formatDateRange(selectedWeek.week)} - Commit Activity`}
          />
          <ReactECharts
            option={selectedWeekOption}
            style={{ height: "200px" }}
          />
        </div>
      )}
    </Layout>
  );
}
