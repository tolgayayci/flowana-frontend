// Sidebar
import Sidebar from "@/modules/Sidebar/Sidebar";

// Discourse Components
import Categories from "@/components/discourse/Categories";
import TopicActivity from "@/components/discourse/TopicActivity";
import TopicMetrics from "@/components/discourse/TopicMetrics";
import UserMetrics from "@/components/discourse/UserMetrics";
import Tags from "@/components/discourse/Tags";
import TopTopics from "@/components/discourse/TopTopics";
import LatestTopics from "@/components/discourse/LatestTopics";
import LatestPosts from "@/components/discourse/LatestPosts";
import TopUsers from "@/components/discourse/TopUsers";

// Heroicons
import { ChartPieIcon, HomeIcon } from "@heroicons/react/24/outline";

export default function Discourse() {
  const navigation = [
    {
      name: "Topic Activity",
      href: "#topic-activity",
      icon: HomeIcon,
      count: "5",
      current: true,
    },
    {
      name: "Top Topics",
      href: "#top-topics",
      icon: ChartPieIcon,
      current: false,
    },
    {
      name: "Categories",
      href: "#categories",
      icon: ChartPieIcon,
      count: "12",
      current: false,
    },
    {
      name: "Tags",
      href: "#tags",
      icon: ChartPieIcon,
      count: "20+",
      current: false,
    },
    {
      name: "Latest Posts",
      href: "#latest-posts",
      icon: ChartPieIcon,
      current: false,
    },
    {
      name: "Top Users",
      href: "#top-users",
      icon: ChartPieIcon,
      current: false,
    },
    {
      name: "User Metrics",
      href: "#user-metrics",
      icon: ChartPieIcon,
      current: false,
    },
    {
      name: "Latest Topics",
      href: "#latest-topics",
      icon: ChartPieIcon,
      current: false,
    },
  ];

  return (
    <section className="max-w-[90%] mx-auto my-12 px-4 sm:px-6 lg:px-8 py-1">
      <div className="grid grid-cols-4 gap-8">
        <div className="col-span-1">
          <Sidebar navigation={navigation} element={<TopicMetrics />} />
        </div>
        <div className="col-span-3">
          <div className="flex flex-wrap space-y-6">
            <div id="topic-activity" className="w-full">
              <TopicActivity />
            </div>
            <div id="top-topics" className="w-full">
              <TopTopics />
            </div>
            <div id="categories" className="w-full">
              <Categories />
            </div>
            <div id="tags" className="w-full">
              <Tags />
            </div>
            <div id="latest-posts" className="w-full">
              <LatestPosts />
            </div>
            <div className="flex space-x-6 w-full">
              <div id="top-users" className="w-full sm:w-2/3 md:w-2/3">
                <TopUsers />
              </div>
              <div id="user-metrics" className="w-full sm:w-1/3 md:w-1/3">
                <UserMetrics />
              </div>
            </div>
            <div id="latest-topics" className="w-full">
              <LatestTopics />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
