import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

// Hooks
import useDiscourseTopTopics from "@/models/discourse/useDiscourseTopTopics";
import { useProtocol } from "@/models/protocols/useProtocol";

// Models and Utils
import Layout from "@/modules/Card/Layout/Layout";
import CardHeader from "@/modules/Card/Header/Header";
import ListLoader from "@/modules/Loaders/github/ListLoader";
import NoListData from "@/modules/NoData/NoListData";
import { formatDistanceToNow } from "@/utils/functions";

// Types
import { Interval } from "@/types/general";

const intervals: Interval[] = [
  { name: "Day", value: "daily" },
  { name: "Week", value: "weekly" },
  { name: "Month", value: "monthly" },
  { name: "Quarterly", value: "quarterly" },
  { name: "Year", value: "yearly" },
  { name: "All", value: "all" },
];

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

export default function TopTopics() {
  const [selectedInterval, setSelectedInterval] = useState(intervals[2]);
  const { discourseTopTopics, isLoading } = useDiscourseTopTopics(
    selectedInterval.value
  );

  const { protocol } = useProtocol();

  const forumInfo = forumInfos[protocol["protocol"]];

  if (isLoading)
    return (
      <ListLoader
        isLoading={isLoading}
        element={
          <CardHeader
            title="Top Topics"
            selectedInterval={selectedInterval}
            setSelectedInterval={setSelectedInterval}
            intervals={intervals}
          />
        }
      />
    );

  if (!discourseTopTopics)
    return (
      <NoListData
        element={
          <CardHeader
            title="Top Topics"
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
        title="Top Topics"
        selectedInterval={selectedInterval}
        setSelectedInterval={setSelectedInterval}
        intervals={intervals}
      />
      <div className="max-h-[calc(5*6.1rem)] overflow-y-auto scrollbar scrollbar-thumb-indigo-500 scrollbar-track-indigo-100 overflow-x-hidden">
        <ul className="space-y-3">
          {discourseTopTopics.map((topic) => (
            <li
              key={topic.id}
              className="bg-white rounded-lg shadow-md p-4 transition-transform duration-300 transform border-2 border-sfblue-600"
            >
              <Link
                href={forumInfo.forum_url + topic.slug}
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
                        {topic.title}
                      </h3>
                      <p className="text-gray-500 text-xs sm:text-sm mt-1">
                        {formatDistanceToNow(topic.created_at)}
                        <span
                          className={`ml-2 px-2 py-1 rounded-full bg-indigo-500 text-white text-xxs sm:text-xs opacity-75`}
                        >
                          Open
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center text-xs sm:text-sm w-1/3 justify-end">
                    <span className="mr-2 px-2 py-1 bg-blue-200 border-2 border-blue-400 text-blue-700 rounded-md text-xs">
                      Last Update: {formatDistanceToNow(topic.last_posted_at)}
                    </span>
                    <span className="px-2 py-1 bg-indigo-200 border-2 border-indigo-400 text-indigo-700 rounded-md text-xs">
                      {topic.posts_count}{" "}
                      {topic.posts_count !== 1 ? "posts" : "post"}
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
