import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Tooltip } from "react-tooltip";

// Hooks
import useCumulativeRecentPullRequests from "@/models/githubCumulative/useCumulativeRecentPullRequests";

// Modules and Utils
import Layout from "@/modules/Card/Layout/Layout";
import CardHeader from "@/modules/Card/Header/Header";
import ListLoader from "@/modules/Loaders/github/ListLoader";
import NoListData from "@/modules/NoData/NoListData";
import { formatDistanceToNow } from "@/utils/functions";
import { formatBadgeStatsCount } from "@/utils/functions";

// Types
import type { PullRequestState } from "@/types/githubTypes";
import { Interval } from "@/types/general";
import { ICumulativeRecentPullRequests } from "@/types/githubCumulativeTypes";

const intervals: Interval[] = [
  { name: "By Created Time", value: "created_at" },
  { name: "By Updated Time", value: "updated_at" },
];

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
      return "border-green-700 border-2 text-green-800 font-semibold";
    } else if (state === "CLOSED") {
      return "border-red-800 border-2 text-red-800 font-semibold";
    } else if (state === "MERGED") {
      return "border-indigo-700 border-2 text-indigo-800 font-semibold";
    }
    return "";
  };

  const getStatusText = (pull: ICumulativeRecentPullRequests) => {
    if (pull.state === "MERGED") {
      return `Merged ${formatDistanceToNow(pull.updated_at)}`;
    } else if (pull.state === "CLOSED") {
      return `Closed ${formatDistanceToNow(pull.updated_at)}`;
    } else {
      return `Opened ${formatDistanceToNow(pull.created_at)}`;
    }
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
      <div className="max-h-[calc(5*6.4rem)] md:max-h-[calc(5*6.2rem)] overflow-y-auto scrollbar scrollbar-thumb-indigo-500 scrollbar-track-indigo-100 overflow-x-hidden">
        <ul className="space-y-3">
          {recentPullRequests.map((pullRequest) => (
            <li
              key={pullRequest.number}
              className="bg-white hover:bg-gray-200/80 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 p-4 border-2 border-side-500"
            >
              <Link
                href={pullRequest.url}
                target="_blank"
                className="block hover:no-underline"
              >
                <div className="flex flex-col md:flex-row justify-between">
                  <div className="flex items-center space-x-2 w-full md:w-2/3">
                    <Image
                      unoptimized
                      src={pullRequest.author_avatar_url}
                      alt="Avatar"
                      width={52}
                      height={52}
                      className="rounded-full mr-2 md:mr-5"
                    />
                    <div className="flex-grow">
                      <h3 className="text-base sm:text-md font-semibold truncate max-w-[calc(12*1rem)] md:max-w-md">
                        {pullRequest.title}
                      </h3>
                      <p className="text-gray-500 text-xs sm:text-sm mt-1 truncate">
                        Pull Request #{pullRequest.number}
                      </p>
                      <span
                        className={`md:hidden inline-block md:ml-2 px-1.5 py-0.5 rounded-full ${getStatusBadgeColor(
                          pullRequest.state
                        )} text-[10px] opacity-75 mt-2 truncate`}
                      >
                        {getStatusText(pullRequest)}
                      </span>
                    </div>
                  </div>
                  <div className="hidden md:flex md:flex-1 md:justify-end md:items-center">
                    <span
                      className={`px-2 py-1 rounded-full ${getStatusBadgeColor(
                        pullRequest.state
                      )} text-xs sm:text-xs opacity-75`}
                    >
                      {getStatusText(pullRequest)}
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
