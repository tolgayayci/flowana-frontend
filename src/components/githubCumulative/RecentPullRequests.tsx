import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

// Hooks
import useCumulativeRecentPullRequests from "@/models/githubCumulative/useCumulativeRecentPullRequests";

// Modules and Utils
import Layout from "@/modules/Card/Layout/Layout";
import CardHeader from "@/modules/Card/Header/Header";
import ListLoader from "@/modules/Loaders/github/ListLoader";
import NoListData from "@/modules/NoData/NoListData";
import { formatDistanceToNow } from "@/utils/functions";

// Types
import type { PullRequestState } from "@/types/githubTypes";
import { Interval } from "@/types/general";

const intervals: Interval[] = [
  { name: "By Created Time", value: "created_at" },
  { name: "By Updated Time", value: "updated_at" },
];

export default function RecentPullRequests() {
  const [selectedInterval, setSelectedInterval] = useState(intervals[1]);

  const { recentPullRequests, isLoading } = useCumulativeRecentPullRequests(
    selectedInterval.value
  );

  if (isLoading)
    return (
      <ListLoader
        isLoading={isLoading}
        element={
          <CardHeader
            title="Latest Pull Requests"
            tooltip="View the latest pull requests sorted by either creation time, or update time across all repositories of the protocol."
            selectedInterval={selectedInterval}
            setSelectedInterval={setSelectedInterval}
            intervals={intervals}
          />
        }
      />
    );

  if (!recentPullRequests)
    return (
      <NoListData
        element={
          <CardHeader
            title="Latest Pull Requests"
            tooltip="View the latest pull requests sorted by either creation time, or update time across all repositories of the protocol."
            selectedInterval={selectedInterval}
            setSelectedInterval={setSelectedInterval}
            intervals={intervals}
          />
        }
      />
    );

  const getStatusBadgeColor = (state: PullRequestState) => {
    if (state === "OPEN") {
      return "bg-green-500";
    } else if (state === "CLOSED") {
      return "bg-red-500";
    } else if (state === "MERGED") {
      return "bg-indigo-500";
    }
    return "";
  };

  const getStatusBadgeText = (state: PullRequestState) => {
    if (state === "OPEN") {
      return "Open";
    } else if (state === "CLOSED") {
      return "Closed";
    } else if (state === "MERGED") {
      return "Merged";
    }
    return "";
  };

  return (
    <Layout>
      <CardHeader
        title="Latest Pull Requests"
        tooltip="View the latest pull requests sorted by either creation time, or update time across all repositories of the protocol."
        selectedInterval={selectedInterval}
        setSelectedInterval={setSelectedInterval}
        intervals={intervals}
      />
      <div className="max-h-[calc(5*6.2rem)] overflow-y-auto scrollbar scrollbar-thumb-indigo-500 scrollbar-track-indigo-100 overflow-x-hidden">
        <ul className="space-y-3">
          {recentPullRequests.map((pullRequest) => (
            <li
              key={pullRequest.number}
              className="bg-white hover:bg-gray-200/80 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 p-4 border-2 border-sfblue-600"
            >
              <Link
                href={pullRequest.url}
                target="_blank"
                className="block hover:no-underline"
              >
                <div className="flex justify-between">
                  <div className="flex items-center space-x-2 w-1/2">
                    <Image
                      unoptimized
                      src={pullRequest.author_avatar_url}
                      alt="Avatar"
                      width={52}
                      height={52}
                      className="rounded-full mr-5"
                    />
                    <div className="flex-grow min-w-0 max-w-xs">
                      <h3 className="text-base sm:text-md font-semibold truncate">
                        {pullRequest.title}
                      </h3>
                      <p className="text-gray-500 text-xs sm:text-sm mt-1">
                        Pull Request #{pullRequest.number}
                        <span
                          className={`ml-2 px-2 py-1 rounded-full ${getStatusBadgeColor(
                            pullRequest.state
                          )} text-white text-xxs sm:text-xs opacity-75`}
                        >
                          {getStatusBadgeText(pullRequest.state)}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center text-xs sm:text-sm w-1/2 justify-end">
                    <div className="flex items-center space-x-2">
                      {pullRequest.state === "CLOSED" ? (
                        <div className="mr-2 px-2 py-1 bg-orange-200 border-2 border-orange-400 text-orange-700 rounded-md text-xs">
                          Closed {formatDistanceToNow(pullRequest.updated_at)}
                        </div>
                      ) : (
                        <div className="mr-2 px-2 py-1 bg-blue-200 border-2 border-blue-400 text-blue-700 rounded-md text-xs">
                          Last Update:{" "}
                          {formatDistanceToNow(pullRequest.updated_at)}
                        </div>
                      )}
                      <div className="px-2 py-1 bg-indigo-200 border-2 border-indigo-400 text-indigo-700 rounded-md text-xs">
                        {pullRequest.comments_count} comment
                        {pullRequest.comments_count !== 1 && "s"}
                      </div>
                    </div>
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
