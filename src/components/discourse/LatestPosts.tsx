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

import { FaMedal, FaReply, FaEye } from "react-icons/fa";
import { formatDistanceToNow } from "@/utils/functions";
import { formatBadgeStatsCount } from "@/utils/functions";

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

function CountIcon({ icon, count, tooltip }) {
  return (
    <span className="w-12 flex justify-center items-center group relative">
      {icon}
      <span className="ml-1">{formatBadgeStatsCount(count)}</span>

      {/* Tooltip */}
      <span className="group-hover:opacity-100 opacity-0 bg-gray-800 text-white text-xs rounded py-1 px-2 absolute top-1/2 transform -translate-y-1/2 z-20">
        {" "}
        {tooltip}
      </span>
    </span>
  );
}

export default function LatestPosts() {
  const { latestPosts, isLoading } = useDiscourseLatestPosts();

  const { protocol } = useProtocol();

  const forumInfo = forumInfos[protocol["protocol"]];

  if (isLoading)
    return (
      <ListLoader
        isLoading={isLoading}
        element={
          <CardHeader
            title="Latest Posts"
            tooltip="View the latest posts on the forum."
          />
        }
      />
    );

  if (!latestPosts)
    return (
      <NoListData
        element={
          <CardHeader
            title="Latest Posts"
            tooltip="View the latest posts on the forum."
          />
        }
      />
    );

  return (
    <Layout>
      <CardHeader
        title="Latest Posts"
        tooltip="View the latest posts on the forum."
      />
      <div className="max-h-[calc(5*6.1rem)] overflow-y-auto scrollbar scrollbar-thumb-indigo-500 scrollbar-track-indigo-100 overflow-x-hidden">
        <ul className="space-y-3">
          {latestPosts.map((post) => (
            <li
              key={post.id}
              className="bg-white hover:bg-gray-200/80 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 p-4 border-2 border-sfblue-600"
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
                  <div className="flex items-center space-x-2 w-1/2">
                    <Image
                      unoptimized
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
                        Opened {formatDistanceToNow(post.created_at)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center text-xs sm:text-sm w-1/2 justify-end space-x-2 overflow-x-auto">
                    <span className="bg-red-300 border border-red-500 text-red-800 text-xs font-semibold px-2 py-1 rounded relative group">
                      <CountIcon
                        icon={<FaEye className="inline" />}
                        count={post.reads}
                        tooltip="Number of reads"
                      />
                    </span>
                    <span
                      className="bg-green-300 border border-green-500 text-green-800 text-xs font-semibold px-2 py-1 rounded"
                      title="Number of replies"
                    >
                      <CountIcon
                        icon={<FaReply className="inline" />}
                        count={post.reply_count}
                        tooltip="Number of replies"
                      />
                    </span>
                    <span
                      className="bg-purple-300 border border-purple-500 text-purple-800 text-xs font-semibold px-2 py-1 rounded"
                      title="Number of views"
                    >
                      <CountIcon
                        icon={<FaMedal className="inline" />}
                        count={post.score}
                        tooltip="Score"
                      />
                    </span>
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
