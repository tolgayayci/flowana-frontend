// Hooks
import useDiscourseUserMetrics from "@/models/discourse/useDiscourseUserMetrics";

// Models and Utils
import Layout from "@/modules/Card/Layout/Layout";
import CardHeader from "@/modules/Card/Header/Header";
import CardLoader from "@/modules/CardLoader/CardLoader";
import NoData from "@/modules/NoData/NoData";

import {
  FaThumbsUp,
  FaRegNewspaper,
  FaRegEye,
  FaRegComment,
} from "react-icons/fa";

export default function UserMetrics() {
  const { discourseUserMetrics, isLoading } = useDiscourseUserMetrics();

  if (isLoading) {
    return (
      <CardLoader
        element={
          <CardHeader
            title="User Metrics"
            tooltip=" Explore insights into the behavior of active users. Displays average and total actions of community members, from likes to reads. Note: Metrics might not represent all users, as only those with significant activity are included."
          />
        }
      />
    );
  }

  if (!discourseUserMetrics) {
    return (
      <NoData
        element={
          <CardHeader
            title="User Metrics"
            tooltip=" Explore insights into the behavior of active users. Displays average and total actions of community members, from likes to reads. Note: Metrics might not represent all users, as only those with significant activity are included."
          />
        }
        message=""
      />
    );
  }

  return (
    <Layout>
      <CardHeader
        title="User Metrics"
        tooltip="Explore insights into the behavior of active users. Displays average and total actions of community members, from likes to reads. Note: Metrics might not represent all users, as only those with significant activity are included."
      />
      <div className="space-y-4">
        {/* Likes Section */}
        <div className="shadow-lg hover:shadow-xl transition-shadow duration-200 bg-white border-side border-2 p-6 rounded-lg flex items-center">
          <FaThumbsUp size={28} className="text-yellow-600 mr-6" />
          <div className="flex-1">
            <p className="font-medium mb-2">Total Likes Received</p>
            <p className="font-medium mb-2">Total Likes Given</p>
            <p className="font-medium">Average Likes Received</p>
          </div>
          <div className="flex flex-col space-y-1 justify-between">
            <span className="bg-yellow-200/70 border-2 border-yellow-300 text-yellow-800 px-4 py-0.5 rounded-full text-sm font-semibold">
              {discourseUserMetrics.users_total_likes_received}
            </span>
            <span className="bg-yellow-200/70 border-2 border-yellow-300 text-yellow-800 px-4 py-0.5 rounded-full text-sm font-semibold">
              {discourseUserMetrics.users_total_likes_received}
            </span>
            <span className="bg-yellow-200/70 border-2 border-yellow-300 text-yellow-800 px-4 py-0.5 rounded-full text-sm font-semibold text-center">
              {discourseUserMetrics.users_average_likes_received.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Posts Section */}
        <div className="shadow-lg hover:shadow-xl transition-shadow duration-200 bg-white border-side border-2 p-6 rounded-lg flex items-center">
          <FaRegNewspaper size={28} className="text-green-600 mr-6" />
          <div className="flex-1 flex flex-col space-y-1">
            <div className="flex justify-between items-center">
              <p className="font-medium">Total Posts Count</p>
              <span className="bg-green-200/70 border-2 border-green-300 text-green-800 px-4 py-0.5 rounded-full text-sm font-semibold">
                {discourseUserMetrics.users_total_post_count}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <p className="font-medium">Average Post Read</p>
              <span className="bg-green-200/70 border-2 border-green-300 text-green-800 px-4 py-0.5 rounded-full text-sm font-semibold">
                {discourseUserMetrics.users_average_posts_read.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <p className="font-medium">Average Post Count</p>
              <span className="bg-green-200/70 border-2 border-green-300 text-green-800 px-4 py-0.5 rounded-full text-sm font-semibold">
                {discourseUserMetrics.users_average_post_count.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* Visits Section */}
        <div className="shadow-lg hover:shadow-xl transition-shadow duration-200 bg-white border-side border-2 p-6 rounded-lg flex items-center">
          <FaRegEye size={28} className="text-red-600 mr-6" />
          <div className="flex-1 flex flex-col space-y-1">
            <div className="flex justify-between items-center">
              <p className="font-medium">Total Days Visited</p>
              <span className="bg-red-200/70 border-2 border-red-300 text-red-800 px-4 py-0.5 rounded-full text-sm font-semibold">
                {discourseUserMetrics.users_total_days_visited}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <p className="font-medium">Average Days Visited</p>
              <span className="bg-red-200/70 border-2 border-red-300 text-red-800 px-4 py-0.5 rounded-full text-sm font-semibold">
                {discourseUserMetrics.users_average_days_visited.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* Topics Section */}
        <div className="shadow-lg hover:shadow-xl transition-shadow duration-200 bg-white border-side border-2 p-6 rounded-lg flex items-center">
          <FaRegComment size={28} className="text-blue-600 mr-6" />
          <div className="flex-1 flex flex-col space-y-1">
            <div className="flex justify-between items-center">
              <p className="font-medium">Total Topics Count</p>
              <span className="bg-sky-200/70 border-2 border-sky-300 text-sky-800 px-4 py-0.5 rounded-full text-sm font-semibold">
                {discourseUserMetrics.users_total_topic_count.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <p className="font-medium">Average Topics Entered</p>
              <span className="bg-sky-200/70 border-2 border-sky-300 text-sky-800 px-4 py-0.5 rounded-full text-sm font-semibold">
                {discourseUserMetrics.users_average_topics_entered.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <p className="font-medium">Total Topics Entered</p>
              <span className="bg-sky-200/70 border-2 border-sky-300 text-sky-800 px-4 py-0.5 rounded-full text-sm font-semibold">
                {discourseUserMetrics.users_total_topics_entered}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
