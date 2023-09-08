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
import type {
  IRecentPullRequests,
  PullRequestState,
} from "@/types/githubTypes";
import { Interval } from "@/types/general";
import { FaReply } from "react-icons/fa";
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
      <div className="max-h-[calc(5*6.2rem)] overflow-y-auto scrollbar scrollbar-thumb-indigo-500 scrollbar-track-indigo-100 overflow-x-hidden">
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
                          )} text-xs sm:text-xs opacity-75`}
                        >
                          {getStatusText(pullRequest)}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center text-xs sm:text-sm w-1/2 justify-end space-x-2 overflow-x-auto">
                    <span
                      className="bg-orange-200/70 border-2 border-orange-300 text-orange-800 text-xs font-semibold px-2 py-1 rounded"
                      data-tooltip-id="comments_count"
                    >
                      <CountIcon
                        id="comments_count"
                        icon={<FaReply className="inline" />}
                        count={pullRequest.comments_count}
                        tooltip="Comments Count"
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
