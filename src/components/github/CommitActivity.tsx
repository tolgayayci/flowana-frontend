import { useState, useEffect } from "react";
import useCommitActivity from "@/models/github/useCommitActivity";

import ReactECharts from "echarts-for-react";

import CardLoader from "@/modules/CardLoader/CardLoader";

export default function CommitActivity() {
  const [selectedWeek, setSelectedWeek] = useState(null);
  const { commitActivity, isLoading } = useCommitActivity("polkadot");

  if (isLoading) return <CardLoader />;
  if (!commitActivity) return;

  const handleClick = (params) => {
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
      data: commitActivity.map((week, index) => `Week ${index + 1}`),
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: commitActivity.map((week) => week.total),
        type: "bar",
      },
    ],
  };

  const selectedWeekOption = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "line",
      },
    },
    xAxis: {
      type: "category",
      data: selectedWeek
        ? ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"]
        : [],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: selectedWeek ? selectedWeek.days : [],
        type: "line",
      },
    ],
  };

  return (
    <div className="border-2 border-indigo-300 rounded-lg py-12">
      <h1 className="ml-12 mb-8">Commit Activity</h1>
      <ReactECharts
        option={option}
        showLoading={isLoading}
        style={{ minHeight: "350px", width: "100%" }}
        notMerge={true}
        onEvents={{ click: handleClick }}
      />
      {selectedWeek && (
        <div>
          <h2 className="ml-12 mb-8">
            Week {commitActivity.indexOf(selectedWeek) + 1} Details
          </h2>
          <ReactECharts
            option={selectedWeekOption}
            style={{ height: "300px" }}
          />
        </div>
      )}
    </div>
  );
}
