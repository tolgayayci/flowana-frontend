import { useState } from "react";

// Hooks
import useDiscourseTopicActivity from "@/models/discourse/useDiscourseTopicActivity";

// Models and Utils
import Layout from "@/modules/Card/Layout/Layout";
import CardHeader from "@/modules/Card/Header/Header";

// Types
import { Interval } from "@/types/general";

const intervals: Interval[] = [
  { name: "Day", value: "daily" },
  { name: "Week", value: "weekly" },
  { name: "Month", value: "monthly" },
  { name: "Year", value: "yearly" },
];

export default function TopicActivity() {
  const [selectedInterval, setSelectedInterval] = useState(intervals[1]);
  const { discourseTopicActivity, isLoading } = useDiscourseTopicActivity(
    selectedInterval.value
  );

  return (
    <Layout>
      <CardHeader
        title="Discourse Topic Activity"
        selectedInterval={selectedInterval}
        setSelectedInterval={setSelectedInterval}
        intervals={intervals}
      />
      {JSON.stringify(discourseTopicActivity)}
    </Layout>
  );
}
