// Hooks
import useDiscourseTopicMetrics from "@/models/discourse/useDiscourseTopicMetrics";

// Components
import Layout from "@/modules/Card/Layout/Layout";
import CardHeader from "@/modules/Card/Header/Header";
import CardLoader from "@/modules/CardLoader/CardLoader";
import NoData from "@/modules/NoData/NoData";

export default function TopicMetrics() {
  const { topicMetrics, isLoading } = useDiscourseTopicMetrics();

  if (isLoading)
    return (
      <CardLoader
        element={
          <CardHeader
            title="Forum Overview"
            tooltip="View a summary of forum engagement, showcasing the total number of topics, posts, replies, views, likes, and their respective averages."
          />
        }
      />
    );

  if (!topicMetrics)
    return (
      <NoData
        element={
          <CardHeader
            title="Forum Overview"
            tooltip="View a summary of forum engagement, showcasing the total number of topics, posts, replies, views, likes, and their respective averages."
          />
        }
        message=""
      />
    );

  function StatItem({ title, count }: { title: string; count: number }) {
    const formattedCount = new Intl.NumberFormat(undefined, {
      maximumFractionDigits: 2,
      minimumFractionDigits: 0,
    }).format(count);

    return (
      <div className="col-span-1">
        <div className="md:p-5 p-4 pl-6 border border-sfblack rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300">
          <div className="text-side-500 text-medium md:mb-5 mb-2 truncate">
            {title}
          </div>
          <div className="xl:text-3xl 2xl:text-4xl text-xl font-bold text-niceblack md:mb-3">
            {formattedCount}
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Layout>
        <CardHeader
          title="Forum Overview"
          tooltip="View a summary of forum engagement, showcasing the total number of topics, posts, replies, views, likes, and their respective averages."
        />
        <div className="max-h-[calc(5*5.6rem)] md:max-h-[calc(5*6.4rem)] grid grid-cols-1 md:grid-cols-4 gap-5 pr-0.5 md:pr-0 overflow-y-auto scrollbar scrollbar-thumb-indigo-500 scrollbar-track-indigo-100 overflow-x-hidden">
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
