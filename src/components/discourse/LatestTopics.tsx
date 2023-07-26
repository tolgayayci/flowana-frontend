import { useState } from "react";

// Hooks
import useDiscourseLatestTopics from "@/models/discourse/useDiscourseLatestTopics";

// Models and Utils
import Layout from "@/modules/Card/Layout/Layout";
import CardHeader from "@/modules/Card/Header/Header";

// Types
import { Interval } from "@/types/general";

const intervals: Interval[] = [
  { name: "Default", value: "default" },
  { name: "Created", value: "created" },
  { name: "Activity", value: "activity" },
  { name: "Views", value: "views" },
  { name: "Posts", value: "posts" },
  { name: "Likes", value: "likes" },
  { name: "Op Likes", value: "op_likes" },
];

export default function LatestTopics() {
  const [selectedInterval, setSelectedInterval] = useState(intervals[0]);
  const { discourseLatestTopics, isLoading } = useDiscourseLatestTopics(
    selectedInterval.value
  );

  return (
    <Layout>
      <CardHeader
        title="Discourse Latest Topics"
        selectedInterval={selectedInterval}
        setSelectedInterval={setSelectedInterval}
        intervals={intervals}
      />
      {JSON.stringify(discourseLatestTopics)}
    </Layout>
  );
}
