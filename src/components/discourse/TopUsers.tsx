import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Tooltip } from "react-tooltip";

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

function CountIcon({ icon, count, tooltip, id }) {
  return (
    <span className="w-12 justify-center items-center inline-flex z-50">
      {icon}
      <span className="ml-1">{formatBadgeStatsCount(count)}</span>

      {/* Tooltip */}
      <Tooltip id={id} place="top">
        {tooltip}
      </Tooltip>
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
              className="bg-white hover:bg-gray-200/80 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 p-4 border-2 border-side-500"
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
                        user.avatar_template.startsWith(
                          "https://avatars.discourse-cdn.com/v4/letter/"
                        )
                          ? user.avatar_template.replace("{size}", "120")
                          : forumInfo.forum_url +
                            user.avatar_template.replace("{size}", "120")
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
                    <span
                      className="border-side border-2 text-xs font-semibold px-2 py-1 rounded"
                      data-tooltip-id="likes_given"
                    >
                      <CountIcon
                        id="likes_given"
                        icon={<FaThumbsUp className="inline" />}
                        count={user.likes_given}
                        tooltip="Given likes"
                      />
                    </span>
                    <span
                      className="bg-red-200/70 border-2 border-red-300 text-red-800 text-xs font-semibold px-2 py-1 rounded"
                      data-tooltip-id="likes_received"
                    >
                      <CountIcon
                        id="likes_received"
                        icon={<FaHeart className="inline" />}
                        count={user.likes_received}
                        tooltip="Received likes"
                      />
                    </span>
                    <span
                      className="bg-green-200/70 border-2 border-green-300 text-green-800 text-xs font-semibold px-2 py-1 rounded"
                      data-tooltip-id="topic_count"
                    >
                      <CountIcon
                        id="topic_count"
                        icon={<FaBook className="inline" />}
                        count={user.topic_count}
                        tooltip="Topic count"
                      />
                    </span>
                    <span
                      className="bg-purple-200/70 border-2 border-purple-300 text-purple-800 text-xs font-semibold px-2 py-1 rounded"
                      data-tooltip-id="posts_read"
                    >
                      <CountIcon
                        id="posts_read"
                        icon={<FaEye className="inline" />}
                        count={user.posts_read}
                        tooltip="Posts read"
                      />
                    </span>
                    <span
                      className="bg-orange-200/70 border-2 border-orange-300 text-orange-800 text-xs font-semibold px-2 py-1 rounded"
                      data-tooltip-id="topics_entered"
                    >
                      <CountIcon
                        id="topics_entered"
                        icon={<FaComments className="inline" />}
                        count={user.topics_entered}
                        tooltip="Topics Entered"
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
