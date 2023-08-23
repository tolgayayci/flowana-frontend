import Image from "next/image";

// Hooks
import useDiscourseTopicMetrics from "@/models/discourse/useDiscourseTopicMetrics";

// Components
import Layout from "@/modules/Card/Layout/Layout";

export default function TopicMetrics() {
  const { topicMetrics, isLoading } = useDiscourseTopicMetrics();

  return (
    <>
      <div className="grid gap-6">
        <div className="grid grid-cols-4 gap-4">
          <div className="p-5 pl-6 border-2 border-sfgreen-800 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="text-sfgreen-800 text-medium mb-3 ">
              Total Replies
            </div>
            <div className="text-5xl font-bold text-sfblue-800 mb-3">
              {topicMetrics?.total_replies}
            </div>
            <div className="inline-block text-sfblack text-xs font-semibold bg-sfred-500 border-2 border-sfred-800 rounded-2xl px-2 py-0.5">
              {topicMetrics?.total_replies}
            </div>
          </div>
          <div className="p-5 pl-6 border-2 border-sfgreen-800 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="text-sfgreen-800 text-medium mb-3">Total Posts</div>
            <div className="text-5xl font-bold text-sfblue-800 mb-3">
              {topicMetrics?.total_posts}
            </div>
            <div className="inline-block text-sfblack text-xs font-semibold bg-sfred-500 border-2 border-sfred-800 rounded-2xl px-2 py-0.5">
              {topicMetrics?.total_posts}
            </div>
          </div>
          <div className="p-5 pl-6 border-2 border-sfgreen-800 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="text-sfgreen-800 text-medium mb-3">
              Average Post per Topic
            </div>
            <div className="text-5xl font-bold text-sfblue-800 mb-3">
              {topicMetrics?.average_post_per_topic}
            </div>
            <div className="inline-block text-sfblack text-xs font-semibold bg-sfred-500 border-2 border-sfred-800 rounded-2xl px-2 py-0.5">
              {topicMetrics?.average_post_per_topic}
            </div>
          </div>
          <div className="p-5 pl-6 border-2 border-sfgreen-800 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="text-sfgreen-800 text-medium mb-3">
              Average Views per Topic
            </div>
            <div className="text-5xl font-bold text-sfblue-800 mb-3">
              {topicMetrics?.average_views_per_topic}
            </div>
            <div className="inline-block text-sfblack text-xs font-semibold bg-sfred-500 border-2 border-sfred-800 rounded-2xl px-2 py-0.5">
              {topicMetrics?.average_views_per_topic}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-4">
          <div className="p-5 pl-6 border-2 border-sfgreen-800 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="text-sfgreen-800 text-medium mb-3">
              Average Replies per Topic
            </div>
            <div className="text-5xl font-bold text-sfblue-800 mb-3">
              {topicMetrics?.average_replies_per_topic}
            </div>
            <div className="inline-block text-sfblack text-xs font-semibold bg-sfred-500 border-2 border-sfred-800 rounded-2xl px-2 py-0.5">
              {topicMetrics?.average_replies_per_topic}
            </div>
          </div>
          <div className="p-5 pl-6 border-2 border-sfgreen-800 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="text-sfgreen-800 text-medium mb-3">Total Views</div>
            <div className="text-5xl font-bold text-sfblue-800 mb-3">
              {topicMetrics?.total_views}
            </div>
            <div className="inline-block text-sfblack text-xs font-semibold bg-sfred-500 border-2 border-sfred-800 rounded-2xl px-2 py-0.5">
              {topicMetrics?.total_views}
            </div>
          </div>
          <div className="p-5 pl-6 border-2 border-sfgreen-800 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="text-sfgreen-800 text-medium mb-3">
              Total Topics
            </div>
            <div className="text-5xl font-bold text-sfblue-800 mb-3">
              {topicMetrics?.total_topics}
            </div>
            <div className="inline-block text-sfblack text-xs font-semibold bg-sfred-500 border-2 border-sfred-800 rounded-2xl px-2 py-0.5">
              {topicMetrics?.total_topics}
            </div>
          </div>
          <div className="p-5 pl-6 border-2 border-sfgreen-800 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="text-sfgreen-800 text-medium mb-3">Total Likes</div>
            <div className="text-5xl font-bold text-sfblue-800 mb-3">
              {topicMetrics?.total_likes}
            </div>
            <div className="inline-block text-sfblack text-xs font-semibold bg-sfred-500 border-2 border-sfred-800 rounded-2xl px-2 py-0.5">
              {topicMetrics?.total_likes}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
