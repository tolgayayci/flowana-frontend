import Link from "next/link";
import Image from "next/image";

// Hooks
import useDiscourseLatestPosts from "@/models/discourse/useDiscourseLatestPosts";
import { useProtocol } from "@/models/protocols/useProtocol";

// Models and Utils
import Layout from "@/modules/Card/Layout/Layout";
import CardHeader from "@/modules/Card/Header/Header";
import ListLoader from "@/modules/Loaders/github/ListLoader";
import NoListData from "@/modules/NoData/NoListData";
import { formatDistanceToNow } from "@/utils/functions";

const forumInfos = {
  flow: {
    forum_url: "https://forum.onflow.org/t/",
    logo: "/flow-logo.png",
  },
  compound: {
    forum_url: "https://www.comp.xyz/t/",
    logo: "/compound-logo.png",
  },
  polkadot: {
    forum_url: "https://forum.polkadot.network/t/",
    logo: "/polkadot-logo.jpg",
  },
  lens: {
    forum_url: "#",
    logo: "/lens-logo.jpg",
  },
};

export default function LatestPosts() {
  const { latestPosts, isLoading } = useDiscourseLatestPosts();

  const { protocol } = useProtocol();

  const forumInfo = forumInfos[protocol["protocol"]];

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
      <div className="max-h-[calc(5*6.1rem)] overflow-y-auto scrollbar scrollbar-thumb-indigo-500 scrollbar-track-indigo-100 overflow-x-hidden">
        <ul className="space-y-3">
          {latestPosts.map((post) => (
            <li
              key={post.id}
              className="bg-white rounded-lg shadow-md p-4 transition-transform duration-300 transform  border-2 border-sfblue-600"
            >
              <Link
                href={
                  forumInfo.forum_url +
                  `${post.topic_slug}/${post.topic_id}/${post.id}`
                }
                target="_blank"
                className="block hover:no-underline"
              >
                <div className="flex justify-between">
                  <div className="flex items-center space-x-2 w-2/3">
                    <Image
                      src={forumInfo.logo}
                      alt="Avatar"
                      width={52}
                      height={52}
                      className="rounded-full mr-5"
                    />
                    <div className="flex-grow min-w-0 max-w-lg">
                      <h3 className="text-base sm:text-md font-semibold truncate">
                        {post.topic_title}
                      </h3>
                      <p className="text-gray-500 text-xs sm:text-sm mt-1">
                        {formatDistanceToNow(post.created_at)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center text-xs sm:text-sm w-1/3 justify-end">
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
