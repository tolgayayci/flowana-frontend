import { useState } from "react";
import ReactECharts from "echarts-for-react";

// Hooks
import useCommitActivity from "@/models/github/useCommitActivity";

// Modules and Utils
import Layout from "@/modules/Card/Layout/Layout";
import CardHeader from "@/modules/Card/Header/Header";
import CardLoader from "@/modules/CardLoader/CardLoader";

import { ICommitActivity } from "@/types/githubTypes";

export default function CommitActivity() {
  const [selectedWeek, setSelectedWeek] = useState<ICommitActivity | null>(
    null
  );
  const { commitActivity, isLoading } = useCommitActivity();

  if (isLoading) return <CardLoader />;
  if (!commitActivity) return;

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
    <Layout>
      <CardHeader title="Commit Activity" />
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
    </Layout>
  );
}
