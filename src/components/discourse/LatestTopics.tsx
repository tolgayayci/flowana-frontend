import { useState } from "react";
import Link from "next/link";

// Hooks
import useDiscourseLatestTopics from "@/models/discourse/useDiscourseLatestTopics";

// Models and Utils
import Layout from "@/modules/Card/Layout/Layout";
import CardHeader from "@/modules/Card/Header/Header";
import ListLoader from "@/modules/Loaders/github/ListLoader";
import NoListData from "@/modules/NoData/NoListData";
import { formatDistanceToNow } from "@/utils/functions";

// Types
import { Interval } from "@/types/general";

const intervals: Interval[] = [
  { name: "Default", value: "default" },
  { name: "Created", value: "created" },
  { name: "Activity", value: "activity" },
  { name: "Views", value: "views" },
  { name: "Posts", value: "posts" },
  { name: "Likes", value: "likes" },
  { name: "Op Likes", value: "op_likes" },
];

export default function LatestTopics() {
  const [selectedInterval, setSelectedInterval] = useState(intervals[0]);
  const { discourseLatestTopics, isLoading } = useDiscourseLatestTopics(
    selectedInterval.value
  );

  if (isLoading)
    return (
      <ListLoader
        isLoading={isLoading}
        element={
          <CardHeader
            title="Latest Topics"
            selectedInterval={selectedInterval}
            setSelectedInterval={setSelectedInterval}
            intervals={intervals}
          />
        }
      />
    );

  if (!discourseLatestTopics)
    return (
      <NoListData
        element={
          <CardHeader
            title="Latest Topics"
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
        title="Latest Topics"
        selectedInterval={selectedInterval}
        setSelectedInterval={setSelectedInterval}
        intervals={intervals}
      />
      <div className="max-h-[calc(5*6rem)] overflow-y-auto scrollbar scrollbar-thumb-indigo-500 scrollbar-track-indigo-100 overflow-x-hidden">
        <ul className="space-y-3">
          {discourseLatestTopics.map((topic) => (
            <li
              key={topic.id}
              className="bg-white rounded-lg shadow-md p-4 transition-transform duration-300 transform hover:scale-105 border-2 border-indigo-600"
            >
              <Link
                href={topic.slug}
                target="_blank"
                className="block hover:no-underline"
              >
                <div className="flex justify-between">
                  <div className="flex items-center space-x-2 w-1/2">
                    {/* <Image
                      src={topic.author_avatar_url}
                      alt="Avatar"
                      width={52}
                      height={52}
                      className="rounded-full mr-5"
                    /> */}
                    <div className="flex-grow min-w-0 max-w-xs">
                      <h3 className="text-base sm:text-md font-semibold truncate">
                        {topic.title}
                      </h3>
                      <p className="text-gray-500 text-xs sm:text-sm mt-1">
                        {formatDistanceToNow(topic.created_at)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center text-xs sm:text-sm w-1/2 justify-end">
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
