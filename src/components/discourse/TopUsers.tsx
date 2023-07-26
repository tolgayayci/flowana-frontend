import { useState } from "react";

// Hooks
import useDiscourseTopUsers from "@/models/discourse/useDiscourseTopUsers";

// Models and Utils
import Layout from "@/modules/Card/Layout/Layout";
import CardHeader from "@/modules/Card/Header/Header";

// Types
import { Interval, Order } from "@/types/general";

const intervals: Interval[] = [
  { name: "Day", value: "daily" },
  { name: "Week", value: "weekly" },
  { name: "Month", value: "monthly" },
  { name: "Quarterly", value: "quarterly" },
  { name: "Year", value: "yearly" },
  { name: "All", value: "all" },
];

const orders: Order[] = [
  { name: "Likes Received", value: "likes_received" },
  { name: "Likes Given", value: "likes_given" },
  { name: "Topic Count", value: "topic_count" },
  { name: "Post Count", value: "post_count" },
  { name: "Topic Entered", value: "topic_entered" },
  { name: "Posts Read", value: "posts_read" },
  { name: "Days Visited", value: "days_visited" },
];

export default function TopUsers() {
  const [selectedInterval, setSelectedInterval] = useState(intervals[1]);
  const [selectedOrder, setSelectedOrder] = useState(orders[0]);
  const { topUsers, isLoading } = useDiscourseTopUsers(selectedInterval.value);

  return (
    <Layout>
      <CardHeader
        title="Discourse Top Users"
        selectedInterval={selectedInterval}
        setSelectedInterval={setSelectedInterval}
        intervals={intervals}
      />
      {JSON.stringify(topUsers)}
    </Layout>
  );
}
