// Hooks
import useDiscourseTopicMetrics from "@/models/discourse/useDiscourseTopicMetrics";

export default function TopicMetrics() {
  const { discourseTopicMetrics, isLoading } = useDiscourseTopicMetrics();

  const Card = ({
    title,
    value,
  }: {
    title: string;
    value: number | undefined;
  }) => (
    <div className="w-1/4 border-indigo-300 border-2 p-4 rounded-lg">
      <div className="text-lg font-bold text-black-500 mb-2 truncate">
        {title}
      </div>
      <div className="w-1/4 h-0.5 bg-indigo-500"></div>
      <div className="text-xl font-bold text-blue-500 my-2">{value}</div>
    </div>
  );

  return (
    <>
      <div className="flex flex-wrap w-full space-y-4">
        <div className="flex space-x-6 w-full">
          <Card
            title="Total Replies"
            value={discourseTopicMetrics?.total_replies}
          />
          <Card
            title="Total Posts"
            value={discourseTopicMetrics?.total_posts}
          />
          <Card
            title="Average Posts per Topic"
            value={discourseTopicMetrics?.average_post_per_topic}
          />
          <Card
            title="Average Views per Topic"
            value={discourseTopicMetrics?.average_views_per_topic}
          />
        </div>
        <div className="flex space-x-6 w-full">
          <Card
            title="Average Replies per Topic"
            value={discourseTopicMetrics?.average_replies_per_topic}
          />
          <Card
            title="Total Views"
            value={discourseTopicMetrics?.total_views}
          />
          <Card
            title="Total Topics"
            value={discourseTopicMetrics?.total_topics}
          />
          <Card
            title="Total Likes"
            value={discourseTopicMetrics?.total_likes}
          />
        </div>
      </div>
    </>
  );
}
