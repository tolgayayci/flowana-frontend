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
        selectedInterval={selectedInterval}
        setSelectedInterval={setSelectedInterval}
        intervals={intervals}
      />
      <div className="max-h-[calc(6*6.2rem)] overflow-y-auto scrollbar scrollbar-thumb-indigo-500 scrollbar-track-indigo-100 overflow-x-hidden">
        <ul className="space-y-3">
          {topUsers.map((user) => (
            <li
              key={user.id}
              className="bg-white rounded-lg shadow-md p-4 transition-transform duration-300 transform border-2 border-sfblue-600"
            >
              <Link
                href={forumInfo.forum_url + "u/" + user.username}
                target="_blank"
                className="block hover:no-underline"
              >
                <div className="flex justify-between">
                  <div className="flex items-center space-x-2 w-2/3">
                    <Image
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
                  <div className="flex items-center text-xs sm:text-sm w-1/3 justify-end">
                    <span className="mr-2 px-2 py-1 bg-red-200 border-2 border-red-400 text-red-700 rounded-md text-xs">
                      Likes Given: {user.likes_received}
                    </span>
                    <span className="px-2 py-1 bg-indigo-200 border-2 border-indigo-400 text-indigo-700 rounded-md text-xs">
                      {user.post_count}{" "}
                      {user.post_count !== 1 ? "posts" : "post"}
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
