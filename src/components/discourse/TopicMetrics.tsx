import Image from "next/image";

// Hooks
import useDiscourseTopicMetrics from "@/models/discourse/useDiscourseTopicMetrics";

// Components
import Layout from "@/modules/Card/Layout/Layout";

export default function TopicMetrics() {
  const { topicMetrics, isLoading } = useDiscourseTopicMetrics();

  return (
    <Layout>
      <div className="flex items-center justify-between mb-4">
        <Image
          className="h-12 w-12 mr-2"
          src="/compound-logo.png"
          alt="[Discourse Name]"
          width={48}
          height={48}
        />
        <a
          className="text-blue-500 underline text-sm"
          href="[Discourse Link]" // Replace with the actual discourse link
          target="_blank"
          rel="noopener noreferrer"
        >
          [Discourse Name]
        </a>
      </div>
      <hr className="mb-4" />
      <div>
        <div className="flex justify-between mb-1">
          <p>Total Replies:</p>
          <p>{topicMetrics?.total_replies}</p>
        </div>
        <div className="flex justify-between mb-1">
          <p>Total Posts:</p>
          <p>{topicMetrics?.total_posts}</p>
        </div>
        <div className="flex justify-between mb-1">
          <p>Average Posts per Topic:</p>
          <p>{topicMetrics?.average_post_per_topic}</p>
        </div>
        <div className="flex justify-between mb-1">
          <p>Average Views per Topic:</p>
          <p>{topicMetrics?.average_views_per_topic}</p>
        </div>
        <div className="flex justify-between mb-1">
          <p>Average Replies per Topic:</p>
          <p>{topicMetrics?.average_replies_per_topic}</p>
        </div>
        <div className="flex justify-between mb-1">
          <p>Total Views:</p>
          <p>{topicMetrics?.total_views}</p>
        </div>
        <div className="flex justify-between mb-1">
          <p>Total Topics:</p>
          <p>{topicMetrics?.total_topics}</p>
        </div>
        <div className="flex justify-between mb-1">
          <p>Total Likes:</p>
          <p>{topicMetrics?.total_likes}</p>
        </div>
        <div className="flex justify-between mb-1">
          <p>Average Likes per Topic:</p>
          <p>{topicMetrics?.average_likes_per_topic}</p>
        </div>
      </div>
    </Layout>
  );
}
