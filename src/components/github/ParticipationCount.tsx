import ReactECharts from "echarts-for-react";

// Hooks
import useParticipationCount from "@/models/github/useParticipationCount";

// Modules and Utils
import Layout from "@/modules/Card/Layout/Layout";
import CardHeader from "@/modules/Card/Header/Header";
import CardLoader from "@/modules/CardLoader/CardLoader";
import NoData from "@/modules/NoData/NoData";

export default function ParticipationCount() {
  const { participationCount, isLoading } = useParticipationCount();

  if (isLoading)
    return (
      <CardLoader
        element={
          <CardHeader
            title="Contribution Breakdown"
            tooltip="See the total commit contributions from owners and others over the past year."
          />
        }
      />
    );
  if (!participationCount || participationCount.others === undefined)
    return (
      <NoData
        element={
          <CardHeader
            title="Contribution Breakdown"
            tooltip="See the total commit contributions from owners and others over the past year."
          />
        }
        message=""
      />
    );

  const option = {
    tooltip: {
      trigger: "item",
    },
    legend: {
      top: "0%",
      left: "center",
    },
    color: ["#e28d9b", "#778dd1"],
    series: [
      {
        name: "Issue Count",
        type: "pie",
        radius: ["40%", "70%"],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: "#fff",
          borderWidth: 2,
        },
        label: {
          show: false,
          position: "center",
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 15,
            fontWeight: "bold",
          },
          itemStyle: {
            shadowBlur: 2,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.30)",
          },
        },
        labelLine: {
          show: false,
        },
        data: [
          { value: participationCount.others, name: "Others" },
          { value: participationCount.owner, name: "Owner" },
        ],
      },
    ],
  };

  return (
    <Layout>
      {" "}
      <CardHeader
        title="Contribution Breakdown"
        tooltip="See the total commit contributions from owners and others over the past year."
      />{" "}
      <div className="h-full flex items-center -mt-8">
        <ReactECharts
          option={option}
          showLoading={isLoading}
          style={{ minHeight: "350px", width: "100%" }}
        />
      </div>
    </Layout>
  );
}
