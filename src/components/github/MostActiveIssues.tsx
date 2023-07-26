import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

// Hooks
import useMostActiveIssues from "@/models/github/useMostActiveIssues";

// Modules and Utils
import Layout from "@/modules/Card/Layout/Layout";
import CardHeader from "@/modules/Card/Header/Header";
import ListLoader from "@/modules/Loaders/github/ListLoader";
import NoListData from "@/modules/NoData/NoListData";
import { formatDistanceToNow } from "@/utils/functions";

// Types
import { Interval } from "@/types/general";

const intervals: Interval[] = [
  { name: "Day", value: "day" },
  { name: "Week", value: "week" },
  { name: "Month", value: "month" },
  { name: "Year", value: "year" },
];

export default function MostActiveIssues() {
  const [selectedInterval, setSelectedInterval] = useState(intervals[2]);
  const { mostActiveIssues, isLoading } = useMostActiveIssues(
    selectedInterval.value
  );

  if (isLoading)
    return (
      <ListLoader
        isLoading={isLoading}
        element={
          <CardHeader
            title="Most Active Issues"
            selectedInterval={selectedInterval}
            setSelectedInterval={setSelectedInterval}
            intervals={intervals}
          />
        }
      />
    );

  if (!mostActiveIssues)
    return (
      <NoListData
        element={
          <CardHeader
            title="Most Active Issues"
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
        title="Most Active Issues"
        selectedInterval={selectedInterval}
        setSelectedInterval={setSelectedInterval}
        intervals={intervals}
      />
      <div className="max-h-[calc(5*6.2rem)] overflow-y-auto scrollbar scrollbar-thumb-indigo-500 scrollbar-track-indigo-100 overflow-x-hidden">
        <ul className="space-y-3">
          {mostActiveIssues?.map((issue) => (
            <li
              key={issue.number}
              className="bg-white rounded-lg shadow-md p-4 transition-transform duration-300 transform hover:scale-105 border-2 border-indigo-600"
            >
              <Link
                href={issue.url}
                target="_blank"
                className="block hover:no-underline"
              >
                <div className="flex justify-between">
                  <div className="flex items-center space-x-2 w-1/2">
                    <Image
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
                            issue.closed ? "bg-red-500" : "bg-green-500"
                          } text-white text-xxs sm:text-xs opacity-75`}
                        >
                          {issue.closed ? "Closed" : "Open"}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center text-xs sm:text-sm w-1/2 justify-end">
                    {issue.closed ? (
                      <span className="mr-2 px-2 py-1 bg-orange-200 border-2 border-orange-400 text-orange-700 rounded-md text-xs">
                        Closed{" "}
                        {formatDistanceToNow(
                          issue.closed_at ? issue.closed_at : ""
                        )}
                      </span>
                    ) : (
                      <span className="mr-2 px-2 py-1 bg-blue-200 border-2 border-blue-400 text-blue-700 rounded-md text-xs">
                        Last Update: {formatDistanceToNow(issue.updated_at)}
                      </span>
                    )}
                    <span className="px-2 py-1 bg-indigo-200 border-2 border-indigo-400 text-indigo-700 rounded-md text-xs">
                      {issue.comments_count} comment
                      {issue.comments_count !== 1 && "s"}
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
