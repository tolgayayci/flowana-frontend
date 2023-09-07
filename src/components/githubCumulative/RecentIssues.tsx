import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Tooltip } from "react-tooltip";

// Hooks
import useCumulativeRecentIssues from "@/models/githubCumulative/useCumulativeRecentIssues";

// Modules and Utils
import Layout from "@/modules/Card/Layout/Layout";
import CardHeader from "@/modules/Card/Header/Header";
import ListLoader from "@/modules/Loaders/github/ListLoader";
import NoListData from "@/modules/NoData/NoListData";
import { formatDistanceToNow } from "@/utils/functions";
import { formatBadgeStatsCount } from "@/utils/functions";

// Types
import { Interval } from "@/types/general";
import { FaReply } from "react-icons/fa";

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

export default function RecentIssues() {
  const [selectedInterval, setSelectedInterval] = useState(intervals[0]);

  const { recentIssues, isLoading } = useCumulativeRecentIssues(
    selectedInterval.value
  );

  if (isLoading)
    return (
      <ListLoader
        isLoading={isLoading}
        element={
          <CardHeader
            title="Latest Issues"
            tooltip="View the latest issues sorted by either creation time, or update time across all repositories of the protocol."
            selectedInterval={selectedInterval}
            setSelectedInterval={setSelectedInterval}
            intervals={intervals}
          />
        }
      />
    );

  if (!recentIssues)
    return (
      <NoListData
        element={
          <CardHeader
            title="Latest Issues"
            tooltip="View the latest issues sorted by either creation time, or update time across all repositories of the protocol."
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
        title="Latest Issues"
        tooltip="View the latest issues sorted by either creation time, or update time across all repositories of the protocol."
        selectedInterval={selectedInterval}
        setSelectedInterval={setSelectedInterval}
        intervals={intervals}
      />
      <div className="max-h-[calc(5*6.2rem)] overflow-y-auto scrollbar scrollbar-thumb-indigo-500 scrollbar-track-indigo-100 overflow-x-hidden">
        <ul className="space-y-3">
          {recentIssues.map((issue) => (
            <li
              key={issue.number}
              className="bg-white hover:bg-gray-200/80 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 p-4 border-2 border-side-500"
            >
              <Link
                href={issue.url}
                target="_blank"
                className="block hover:no-underline"
              >
                <div className="flex justify-between">
                  <div className="flex items-center space-x-2 w-1/2">
                    <Image
                      unoptimized
                      src={issue.author_avatar_url}
                      alt="Avatar"
                      width={52}
                      height={52}
                      className="rounded-full mr-5"
                    />
                    <div className="flex-grow min-w-0 max-w-xs">
                      <h3 className="text-base sm:text-md font-semibold truncate">
                        {issue.title}
                      </h3>
                      <p className="text-gray-500 text-xs sm:text-sm mt-1">
                        Issue #{issue.number}
                        <span
                          className={`ml-2 px-2 py-1 rounded-full ${
                            issue.state === "CLOSED"
                              ? "border-red-800 border-2 text-red-800 font-semibold"
                              : "border-green-700 border-2 text-green-800 font-semibold"
                          } text-xs sm:text-xs opacity-75`}
                        >
                          {issue.state === "CLOSED"
                            ? `Closed ${formatDistanceToNow(issue.updated_at)}`
                            : `Opened ${formatDistanceToNow(issue.created_at)}`}
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
                        count={issue.comments_count}
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
