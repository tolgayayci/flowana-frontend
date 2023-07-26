import { useState } from "react";

// Hooks
import useDiscourseTopTopics from "@/models/discourse/useDiscourseTopTopics";

// Models and Utils
import Layout from "@/modules/Card/Layout/Layout";
import CardHeader from "@/modules/Card/Header/Header";

// Types
import { Interval } from "@/types/general";

const intervals: Interval[] = [
  { name: "Day", value: "daily" },
  { name: "Week", value: "weekly" },
  { name: "Month", value: "monthly" },
  { name: "Quarterly", value: "quarterly" },
  { name: "Year", value: "yearly" },
  { name: "All", value: "all" },
];

export default function TopTopics() {
  const [selectedInterval, setSelectedInterval] = useState(intervals[1]);
  const { discourseTopTopics, isLoading } = useDiscourseTopTopics(
    selectedInterval.value
  );

  return (
    <Layout>
      <CardHeader
        title="Discourse Top Topics"
        selectedInterval={selectedInterval}
        setSelectedInterval={setSelectedInterval}
        intervals={intervals}
      />
      {JSON.stringify(discourseTopTopics)}
    </Layout>
  );
}
