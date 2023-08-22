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
    return <CardLoader element={<CardHeader title="Participation Count" />} />;
  if (!participationCount)
    return (
      <NoData element={<CardHeader title="Participation Count" />} message="" />
    );

  const option = {
    tooltip: {
      trigger: "item",
      formatter: "{b}: {c} ({d}%)",
    },
    legend: {
      orient: "horizontal",
      top: "top",
      left: "center",
      textStyle: {
        color: "#2F5061", // sfblue.DEFAULT
      },
    },
    series: [
      {
        name: "Status",
        type: "pie",
        radius: "60%",
        center: ["50%", "50%"], // Update the center property to center the pie chart
        data: [
          { value: participationCount.others, name: "Others" },
          { value: participationCount.owner, name: "Owner" },
        ],
        color: ["#5B93AF", "#ECA1A5"], // sfblue.500 for "Others" and sfgreen.500 for "Owner"
        label: {
          formatter: "{b}: {d}%",
        },
        emphasis: {
          label: {
            show: true,
            fontWeight: "bold",
          },
        },
      },
    ],
  };

  return (
    <Layout>
      {" "}
      <CardHeader title="Participation Count" />
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
