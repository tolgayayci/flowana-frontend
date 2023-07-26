import Categories from "@/components/discourse/Categories";
import TopicActivity from "@/components/discourse/TopicActivity";
import TopicMetrics from "@/components/discourse/TopicMetrics";
import UserMetrics from "@/components/discourse/UserMetrics";
import Tags from "@/components/discourse/Tags";
import TopTopics from "@/components/discourse/TopTopics";
import LatestTopics from "@/components/discourse/LatestTopics";
import LatestPosts from "@/components/discourse/LatestPosts";
import TopUsers from "@/components/discourse/TopUsers";

export default function Discourse() {
  return (
    <section className="container mx-auto my-12 max-w-7xl px-4 sm:px-6 lg:px-8 py-1">
      <TopicActivity />
      <TopicMetrics />
      <UserMetrics />
      <Categories />
      <Tags />
      <TopTopics />
      <LatestTopics />
      <LatestPosts />
      <TopUsers />
    </section>
  );
}
