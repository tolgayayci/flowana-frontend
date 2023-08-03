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
      <div className="flex flex-wrap space-y-3">
        <div className="w-full">
          <TopicActivity />
        </div>
        <div className="w-full">
          <TopicMetrics />
        </div>
        <div className="w-full">
          <UserMetrics />
        </div>
        <div className="w-full">
          <Categories />
        </div>
        <div className="w-full">
          <Tags />
        </div>
        <div className="w-full">
          <TopTopics />
        </div>
        <div className="w-full">
          <LatestTopics />
        </div>
        <div className="w-full">
          <LatestPosts />
        </div>
        <div className="w-full">
          <TopUsers />
        </div>
      </div>
    </section>
  );
}
