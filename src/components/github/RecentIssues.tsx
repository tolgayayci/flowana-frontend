import useRecentIssues from "@/models/github/useRecentIssues";
import { useState } from "react";
import CardLoader from "@/modules/CardLoader/CardLoader";
import Link from "next/link";

export default function RecentIssues() {
  const { recentIssues, isLoading } = useRecentIssues("polkadot");
  const [showAll, setShowAll] = useState(false);

  if (isLoading) return <CardLoader />;
  if (!recentIssues) return;

  const displayedIssues = showAll ? recentIssues : recentIssues.slice(0, 5);

  const handleLoadMore = () => {
    setShowAll(true);
  };

  const formatDistanceToNow = (dateString) => {
    const currentDate = new Date();
    const inputDate = new Date(dateString);
    const timeDiff = currentDate.getTime() - inputDate.getTime();
    const seconds = Math.floor(timeDiff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);

    if (weeks > 0) {
      return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
    } else if (days > 0) {
      return `${days} day${days > 1 ? "s" : ""} ago`;
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    } else if (minutes > 0) {
      return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    } else {
      return `${seconds} second${seconds !== 1 ? "s" : ""} ago`;
    }
  };

  return (
    <div className="border-2 border-indigo-300 rounded-lg py-12">
      <h1 className="ml-12 mb-8">Recent Issues</h1>
      <ul className="space-y-3 px-12">
        {displayedIssues.map((issue) => (
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
                <div className="flex items-center space-x-2">
                  <img
                    className="w-12 h-12 rounded-full mr-5"
                    src={issue.author_avatar_url}
                    alt="Avatar"
                  />
                  <div>
                    <h3 className="text-base sm:text-md font-semibold">
                      {issue.title}
                    </h3>
                    <p className="text-gray-500 text-xs sm:text-sm mt-1">
                      Issue #{issue.number}
                      <span
                        className={`ml-2 px-2 py-1 rounded-full ${
                          issue.state === "CLOSED"
                            ? "bg-red-500"
                            : "bg-green-500"
                        } text-white text-xxs sm:text-xs opacity-75`}
                      >
                        {issue.state === "CLOSED" ? "Closed" : "Open"}
                      </span>
                    </p>
                  </div>
                </div>
                <div className="flex items-center text-xs sm:text-sm">
                  <div className="flex items-center space-x-2">
                    {issue.state === "CLOSED" ? (
                      <div className="mr-2 px-2 py-1 bg-orange-200 border-2 border-orange-400 text-orange-700 rounded-md text-xs">
                        Closed {formatDistanceToNow(issue.updated_at)}
                      </div>
                    ) : (
                      <div className="mr-2 px-2 py-1 bg-blue-200 border-2 border-blue-400 text-blue-700 rounded-md text-xs">
                        Last Update: {formatDistanceToNow(issue.updated_at)}
                      </div>
                    )}
                    <div className="px-2 py-1 bg-indigo-200 border-2 border-indigo-400 text-indigo-700 rounded-md text-xs">
                      {issue.comments_count} comment
                      {issue.comments_count !== 1 && "s"}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      {!showAll && (
        <div className="flex justify-center">
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded-full mt-6"
            onClick={handleLoadMore}
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
}
