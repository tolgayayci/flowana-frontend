// Hooks
import useDiscourseTopicMetrics from "@/models/discourse/useDiscourseTopicMetrics";

// Components
import Layout from "@/modules/Card/Layout/Layout";
import CardHeader from "@/modules/Card/Header/Header";
import CardLoader from "@/modules/CardLoader/CardLoader";
import NoData from "@/modules/NoData/NoData";

export default function TopicMetrics() {
  const { topicMetrics, isLoading } = useDiscourseTopicMetrics();

  if (isLoading) return <CardLoader element={<CardHeader title="Stats" />} />;

  if (!topicMetrics)
    return <NoData element={<CardHeader title="Stats" />} message="" />;

  function StatItem({ title, count }: { title: string; count: number }) {
    const formattedCount = new Intl.NumberFormat(undefined, {
      maximumFractionDigits: 2,
      minimumFractionDigits: 0,
    }).format(count);

    return (
      <div className="col-span-1">
        <div className="p-5 pl-6 border-2 border-sfblack rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
          <div className="text-sfgreen-800 text-medium mb-5">{title}</div>
          <div className="text-5xl font-bold text-[#333333] mb-3">
            {formattedCount}
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Layout>
        <CardHeader title="Topic Metrics" />
        <div className="grid grid-cols-4 gap-5">
          <StatItem title="Total Replies" count={topicMetrics.total_replies} />
          <StatItem title="Total Posts" count={topicMetrics.total_posts} />
          <StatItem title="Total Views" count={topicMetrics.total_views} />
          <StatItem title="Total Likes" count={topicMetrics.total_likes} />
          <StatItem
            title="Average Replies Per Topic"
            count={topicMetrics.average_replies_per_topic}
          />
          <StatItem
            title="Average Post Per Topic"
            count={topicMetrics.average_post_per_topic}
          />
          <StatItem
            title="Average Views Per Topic"
            count={topicMetrics.average_views_per_topic}
          />
          <StatItem
            title="Average Likes Per Topic"
            count={topicMetrics.average_likes_per_topic}
          />
        </div>
      </Layout>
    </>
  );
}
