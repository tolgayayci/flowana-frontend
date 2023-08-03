import Link from "next/link";

// Hooks
import useDiscourseLatestPosts from "@/models/discourse/useDiscourseLatestPosts";

// Models and Utils
import Layout from "@/modules/Card/Layout/Layout";
import CardHeader from "@/modules/Card/Header/Header";
import ListLoader from "@/modules/Loaders/github/ListLoader";
import NoListData from "@/modules/NoData/NoListData";
import { formatDistanceToNow } from "@/utils/functions";

export default function LatestPosts() {
  const { latestPosts, isLoading } = useDiscourseLatestPosts();

  if (isLoading)
    return (
      <ListLoader
        isLoading={isLoading}
        element={<CardHeader title="Latest Posts" />}
      />
    );

  if (!latestPosts)
    return <NoListData element={<CardHeader title="Latest Posts" />} />;

  return (
    <Layout>
      <CardHeader title="Latest Posts" />
      <div className="max-h-[calc(5*6rem)] overflow-y-auto scrollbar scrollbar-thumb-indigo-500 scrollbar-track-indigo-100 overflow-x-hidden">
        <ul className="space-y-3">
          {latestPosts.map((post) => (
            <li
              key={post.id}
              className="bg-white rounded-lg shadow-md p-4 transition-transform duration-300 transform hover:scale-105 border-2 border-indigo-600"
            >
              <Link
                href={`/topic/${post.topic_slug}/${post.topic_id}/${post.id}`}
                target="_blank"
                className="block hover:no-underline"
              >
                <div className="flex justify-between">
                  <div className="flex items-center space-x-2 w-1/2">
                    {/* <Image
                      src={post.avatar_template}
                      alt="Avatar"
                      width={52}
                      height={52}
                      className="rounded-full mr-5"
                    /> */}
                    <div className="flex-grow min-w-0 max-w-xs">
                      <h3 className="text-base sm:text-md font-semibold truncate">
                        {post.topic_title}
                      </h3>
                      <p className="text-gray-500 text-xs sm:text-sm mt-1">
                        {post.created_at}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center text-xs sm:text-sm w-1/2 justify-end">
                    <span className="mr-2 px-2 py-1 bg-blue-200 border-2 border-blue-400 text-blue-700 rounded-md text-xs">
                      Last Update: {formatDistanceToNow(post.updated_at)}
                    </span>
                    <span className="px-2 py-1 bg-indigo-200 border-2 border-indigo-400 text-indigo-700 rounded-md text-xs">
                      {post.reads} {post.reads !== 1 ? "reads" : "read"}
                    </span>
                    {/* Additional badges can be added here... */}
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
}
