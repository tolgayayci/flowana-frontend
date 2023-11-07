import { useState, useEffect } from "react";
import ReactECharts from "echarts-for-react";
// Hooks
import useCommitActivity from "@/models/github/useCommitActivity";

// Modules and Utils
import Layout from "@/modules/Card/Layout/Layout";
import CardHeader from "@/modules/Card/Header/Header";
import CardLoader from "@/modules/CardLoader/CardLoader";
import NoData from "@/modules/NoData/NoData";

import { ICommitActivity } from "@/types/githubTypes";
import { formatLargeNumber, formatChartDate } from "@/utils/functions";
import { useMobileDataZoomStart } from "@/utils/useMobileDataZoom";

export default function CommitActivity() {
  const { commitActivity, isLoading } = useCommitActivity();
  const dataZoomStart = useMobileDataZoomStart(0, 80);

  const [selectedWeek, setSelectedWeek] = useState<ICommitActivity | null>(
    null
  );

  useEffect(() => {
    if (commitActivity && commitActivity.length > 0) {
      setSelectedWeek(commitActivity[commitActivity.length - 1]);
    }
  }, [commitActivity]);

  if (isLoading)
    return (
      <CardLoader
        element={
          <CardHeader
            title="Commit Activity"
            tooltip="This chart displays the number of commits made to the repository over the last year, grouped by week. Click on a specific week to see a daily breakdown of commits for that week."
          />
        }
      />
    );
  if (!commitActivity || commitActivity[0] === undefined)
    return (
      <NoData
        element={
          <CardHeader
            title="Commit Activity"
            tooltip="This chart displays the number of commits made to the repository over the last year, grouped by week. Click on a specific week to see a daily breakdown of commits for that week."
          />
        }
        message=""
      />
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
        type: "cross",
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
      axisLabel: {
        formatter: function (value) {
          return formatLargeNumber(value.toString());
        },
      },
    },
    series: [
      {
        data: commitActivity.map((week) => week.total),
        type: "bar",
        name: "Commit Count",
        itemStyle: {
          emphasis: {
            barBorderRadius: [3, 3],
          },
          normal: {
            barBorderRadius: [5, 5, 0, 0],
          },
        },
      },
    ],
    dataZoom: [
      {
        type: "slider", // this is the default
        start: dataZoomStart, // default starting position is 0%
        end: 100, // default ending position is 100%
        xAxisIndex: [0], // Specifies that this dataZoom component controls the first xAxis, which is the category axis in this case
      },
      // Optionally, you can add the inside type of dataZoom, which allows for zooming by scrolling the mouse wheel over the chart
      {
        type: "inside",
        xAxisIndex: [0],
        start: 0,
        end: 100,
      },
    ],
    grid: {
      left: "1%",
      right: "1%",
      top: "10%",
      bottom: "20%",
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
          color: "#999", // sfblue.DEFAULT
        },
      },
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: days,
      axisLine: {
        lineStyle: {
          color: "#3b4e6e", // sfblue.DEFAULT
        },
      },
    },
    yAxis: {
      type: "value",
      axisLine: {
        lineStyle: {
          color: "#3b4e6e", // sfblue.DEFAULT
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
        // remove area color
        areaStyle: null,

        itemStyle: {
          color: "#778dd1", // sfred.900
        },
        lineStyle: {
          color: "#778dd1", // sfblue.900
          width: 2.5,
        },
      },
    ],
    grid: {
      left: "2%",
      right: "5%",
      top: "10%",
      bottom: "0%",
      containLabel: true,
    },
  };
  return (
    <Layout>
      <CardHeader
        title="Commit Activity"
        tooltip="This chart displays the number of commits made to the repository over the last year, grouped by week. Click on a specific week to see a daily breakdown of commits for that week."
      />{" "}
      <ReactECharts
        option={option}
        style={{ minHeight: "150px" }}
        onEvents={{ click: handleClick }}
      />
      {selectedWeek && (
        <div className="border-sfblue-700 border-2 md:py-12 md:px-8 py-8 px-4 rounded-lg mt-6 mb-2">
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
