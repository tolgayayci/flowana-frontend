import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

// Hooks
import useDiscourseTopUsers from "@/models/discourse/useDiscourseTopUsers";
import { useProtocol } from "@/models/protocols/useProtocol";

// Models and Utils
import Layout from "@/modules/Card/Layout/Layout";
import CardHeader from "@/modules/Card/Header/Header";
import ListLoader from "@/modules/Loaders/github/ListLoader";
import NoListData from "@/modules/NoData/NoListData";

// Types
import { Interval, Order } from "@/types/general";

import {
  FaComments,
  FaReply,
  FaEye,
  FaHeart,
  FaThumbsUp,
  FaBook,
} from "react-icons/fa";
import { formatBadgeStatsCount } from "@/utils/functions";

const intervals: Interval[] = [
  { name: "Day", value: "daily" },
  { name: "Week", value: "weekly" },
  { name: "Month", value: "monthly" },
  { name: "Quarterly", value: "quarterly" },
  { name: "Year", value: "yearly" },
  { name: "All", value: "all" },
];

const orders: Order[] = [
  { name: "Likes Received", value: "likes_received" },
  { name: "Likes Given", value: "likes_given" },
  { name: "Topic Count", value: "topic_count" },
  { name: "Post Count", value: "post_count" },
  { name: "Topic Entered", value: "topic_entered" },
  { name: "Posts Read", value: "posts_read" },
  { name: "Days Visited", value: "days_visited" },
];

const forumInfos = {
  flow: {
    forum_url: "https://forum.onflow.org/",
    logo: "/flow-logo.png",
  },
  compound: {
    forum_url: "https://www.comp.xyz/",
    logo: "/compound-logo.png",
  },
  polkadot: {
    forum_url: "https://forum.polkadot.network/",
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

export default function TopUsers() {
  const [selectedInterval, setSelectedInterval] = useState(intervals[4]);
  const [selectedOrder, setSelectedOrder] = useState(orders[0]);
  const { topUsers, isLoading } = useDiscourseTopUsers(selectedInterval.value);

  const { protocol } = useProtocol();
  const forumInfo = forumInfos[protocol["protocol"]];

  if (isLoading)
    return (
      <ListLoader
        isLoading={isLoading}
        element={
          <CardHeader
            title="Top Users"
            tooltip="Discover the standout members of our community across different time frames. This widget highlights users who have made the most impact in terms of likes, posts, topics, and more. Filter by daily, weekly, monthly, and other intervals to see who's leading the way."
            selectedInterval={selectedInterval}
            setSelectedInterval={setSelectedInterval}
            intervals={intervals}
          />
        }
      />
    );

  if (!topUsers)
    return (
      <NoListData
        element={
          <CardHeader
            title="Top Users"
            tooltip="Discover the standout members of our community across different time frames. This widget highlights users who have made the most impact in terms of likes, posts, topics, and more. Filter by daily, weekly, monthly, and other intervals to see who's leading the way."
            selectedInterval={selectedInterval}
            setSelectedInterval={setSelectedInterval}
            intervals={intervals}
          />
        }
      />
    );

  return (
    <Layout>
      <CardHeader
        title="Top Users"
        tooltip="Discover the standout members of our community across different time frames. This widget highlights users who have made the most impact in terms of likes, posts, topics, and more. Filter by daily, weekly, monthly, and other intervals to see who's leading the way."
        selectedInterval={selectedInterval}
        setSelectedInterval={setSelectedInterval}
        intervals={intervals}
      />
      <div className="max-h-[calc(6*6.2rem)] overflow-y-auto scrollbar scrollbar-thumb-indigo-500 scrollbar-track-indigo-100 overflow-x-hidden">
        <ul className="space-y-3">
          {topUsers.map((user) => (
            <li
              key={user.id}
              className="bg-white hover:bg-gray-200/80 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 p-4 border-2 border-sfblue-600"
            >
              <Link
                href={forumInfo.forum_url + "u/" + user.username}
                target="_blank"
                className="block hover:no-underline"
              >
                <div className="flex justify-between">
                  <div className="flex items-center space-x-2 w-1/2">
                    <Image
                      unoptimized
                      src={
                        forumInfo.forum_url +
                          user.avatar_template.replace("{size}", "120") ||
                        forumInfo.logo
                      }
                      alt="Avatar"
                      width={52}
                      height={52}
                      className="rounded-full mr-5"
                    />
                    <div className="flex-grow min-w-0 max-w-lg">
                      <h3 className="text-base sm:text-md font-semibold truncate">
                        {user.name ? user.name : "No Name"}
                      </h3>
                      <p className="text-gray-500 text-xs sm:text-sm mt-1">
                        {user.username}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center text-xs sm:text-sm w-1/2 justify-end space-x-2 overflow-x-auto">
                    <span className="bg-pink-300 border border-pink-500 text-pink-800 text-xs font-semibold px-2 py-1 rounded relative group">
                      <CountIcon
                        icon={<FaThumbsUp className="inline" />}
                        count={user.likes_given}
                        tooltip="Given likes"
                      />
                    </span>
                    <span className="bg-red-300 border border-red-500 text-red-800 text-xs font-semibold px-2 py-1 rounded relative group">
                      <CountIcon
                        icon={<FaHeart className="inline" />}
                        count={user.likes_received}
                        tooltip="Received likes"
                      />
                    </span>
                    <span className="bg-green-300 border border-green-500 text-green-800 text-xs font-semibold px-2 py-1 rounded">
                      <CountIcon
                        icon={<FaBook className="inline" />}
                        count={user.topic_count}
                        tooltip="Topic count"
                      />
                    </span>
                    <span className="bg-purple-300 border border-purple-500 text-purple-800 text-xs font-semibold px-2 py-1 rounded">
                      <CountIcon
                        icon={<FaEye className="inline" />}
                        count={user.posts_read}
                        tooltip="Posts read"
                      />
                    </span>
                    <span className="bg-orange-300 border border-orange-500 text-orange-800 text-xs font-semibold px-2 py-1 rounded">
                      <CountIcon
                        icon={<FaComments className="inline" />}
                        count={user.topics_entered}
                        tooltip="Number of posts"
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
