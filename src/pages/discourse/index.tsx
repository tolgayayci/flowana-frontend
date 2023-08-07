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
      <div className="flex flex-wrap space-y-6">
        <div className="w-full">
          <TopicMetrics />
        </div>
        <div className="w-full">
          <TopicActivity />
        </div>
        <div className="w-full">
          <TopTopics />
        </div>
        <div className="w-full">
          <Categories />
        </div>
        <div className="w-full">
          <Tags />
        </div>
        <div className="w-full">
          <LatestPosts />
        </div>
        <div className="flex space-x-6 w-full">
          <div className="w-full sm:w-2/3 md:w-2/3">
            <TopUsers />
          </div>
          <div className="w-full sm:w-1/3 md:w-1/3">
            <UserMetrics />
          </div>
        </div>
        <div className="w-full">
          <LatestTopics />
        </div>
      </div>
    </section>
  );
}
