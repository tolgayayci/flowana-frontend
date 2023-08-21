import { useState, useEffect } from "react";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";
// Hooks
import useCommitActivity from "@/models/github/useCommitActivity";

// Modules and Utils
import Layout from "@/modules/Card/Layout/Layout";
import CardHeader from "@/modules/Card/Header/Header";
import CardLoader from "@/modules/CardLoader/CardLoader";
import NoData from "@/modules/NoData/NoData";

import { ICommitActivity } from "@/types/githubTypes";

export default function CommitActivity() {
  const { commitActivity, isLoading } = useCommitActivity();

  const [selectedWeek, setSelectedWeek] = useState<ICommitActivity | null>(
    null
  );

  useEffect(() => {
    if (commitActivity && commitActivity.length > 0) {
      setSelectedWeek(commitActivity[commitActivity.length - 1]);
    }
  }, [commitActivity]);

  if (isLoading) return <CardLoader />;
  if (!commitActivity)
    return <NoData element={<CardHeader title="Commit Activity" />} />;

  const handleClick = (params: any) => {
    const weekIndex = params.dataIndex;
    const clickedWeek = commitActivity[weekIndex];
    setSelectedWeek(clickedWeek);
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
      data: selectedWeek
        ? Array.from({ length: 7 }).map((_, i) => {
            const date = new Date(selectedWeek.week * 1000 + i * 86400000); // 86400000 milliseconds = 1 day
            return `${date.getDate()} ${date.toLocaleString("default", {
              month: "short",
            })} ${date.getFullYear()}`; // Format: "dd MMM yyyy"
          })
        : [],
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
            title={`Week ${commitActivity.indexOf(selectedWeek) + 1} Details`}
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
