// Hooks
import useDiscourseUserMetrics from "@/models/discourse/useDiscourseUserMetrics";

// Models and Utils
import Layout from "@/modules/Card/Layout/Layout";
import CardHeader from "@/modules/Card/Header/Header";
import CardLoader from "@/modules/CardLoader/CardLoader";
import NoData from "@/modules/NoData/NoData";

export default function UserMetrics() {
  const { discourseUserMetrics, isLoading } = useDiscourseUserMetrics();

  if (isLoading) {
    return <CardLoader element={<CardHeader title="User Metrics" />} />;
  }

  if (!discourseUserMetrics) {
    return <NoData element={<CardHeader title="User Metrics" />} message="" />;
  }

  return (
    <Layout>
      <CardHeader title="User Metrics" />
      <div className="space-y-6 mt-4">
        <div className="flex justify-between items-center border p-4 rounded">
          <div>
            <h3 className="font-semibold mb-2 text-sfgreen-800">Likes</h3>
            <p className="font-medium">Total Likes Received</p>
            <p>Total Likes Given</p>
            <p>Average Likes Received</p>
          </div>
          <div className="flex flex-col space-y-1">
            <span className="bg-yellow-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
              {discourseUserMetrics.users_total_likes_received}
            </span>
            <span className="bg-yellow-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
              {discourseUserMetrics.users_total_likes_received}
            </span>
            <span className="bg-yellow-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
              {discourseUserMetrics.users_average_likes_received.toFixed(2)}
            </span>
          </div>
        </div>

        <div className="flex justify-between items-center border p-4 rounded">
          <div>
            <h3 className="font-semibold mb-2 text-sfgreen-800">Posts</h3>
            <p className="font-medium">Total Posts Count</p>
            <p>Average Post Read</p>
            <p>Average Post Count</p>
          </div>
          <div className="flex flex-col space-y-1">
            <span className="bg-green-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
              {discourseUserMetrics.users_total_post_count}
            </span>
            <span className="bg-green-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
              {discourseUserMetrics.users_average_posts_read.toFixed(2)}
            </span>
            <span className="bg-green-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
              {discourseUserMetrics.users_average_post_count.toFixed(2)}
            </span>
          </div>
        </div>

        <div className="flex justify-between items-center border p-4 rounded">
          <div>
            <h3 className="font-semibold mb-2 text-sfgreen-800">Visits</h3>
            <p className="font-medium">Total Days Visited</p>
            <p>Average Days Visited</p>
          </div>
          <div className="flex flex-col space-y-1">
            <span className="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
              {discourseUserMetrics.users_total_days_visited}
            </span>
            <span className="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
              {discourseUserMetrics.users_average_days_visited.toFixed(2)}
            </span>
          </div>
        </div>

        <div className="flex justify-between items-center border p-4 rounded">
          <div>
            <h3 className="font-semibold mb-2 text-sfgreen-800">Topics</h3>
            <p className="font-medium">Total Topics Count</p>
            <p>Average Topics Entered</p>
            <p>Total Topics Entered</p>
          </div>
          <div className="flex flex-col space-y-1">
            <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
              {discourseUserMetrics.users_total_topic_count.toFixed(2)}
            </span>
            <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
              {discourseUserMetrics.users_average_topics_entered.toFixed(2)}
            </span>
            <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
              {discourseUserMetrics.users_total_topics_entered}
            </span>
          </div>
        </div>
      </div>
    </Layout>
  );
}
