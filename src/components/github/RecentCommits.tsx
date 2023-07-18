import useRecentCommits from "@/models/github/useRecentCommits";
import { useState } from "react";
import Link from "next/link";

import CardLoader from "@/modules/CardLoader/CardLoader";

export default function RecentCommits() {
  const { recentCommits, isLoading } = useRecentCommits("polkadot");
  const [showAll, setShowAll] = useState(false);

  if (isLoading) return <CardLoader />;
  if (!recentCommits) return;

  const displayedCommits = showAll ? recentCommits : recentCommits.slice(0, 5);

  const handleLoadMore = () => {
    setShowAll(true);
  };

  const formatDistanceToNow = (dateString) => {
    const date = new Date(dateString);
    return date.toDateString();
  };

  return (
    <div className="border-2 border-indigo-300 rounded-lg py-12">
      <h1 className="ml-12 mb-8">Recent Commits</h1>
      <ul className="space-y-3 px-12">
        {displayedCommits.map((commit) => (
          <li
            key={commit.url}
            className="bg-white rounded-lg shadow-md p-4 transition-transform duration-300 transform hover:scale-105 border-2 border-indigo-600"
          >
            <Link
              href={commit.url}
              target="_blank"
              className="block hover:no-underline"
            >
              <div className="flex items-center space-x-2">
                <img
                  className="w-12 h-12 rounded-full mr-5"
                  src={commit.author_avatar_url}
                  alt="Avatar"
                />
                <div className="flex-grow">
                  <h3 className="text-base sm:text-md font-semibold">
                    {commit.message}
                  </h3>
                  <p className="text-gray-500 text-xs sm:text-sm mt-1">
                    Commit by {commit.author_login}
                  </p>
                </div>
                <div className="px-2 py-1 bg-indigo-200 border-2 border-indigo-400 text-indigo-700 rounded-md text-xs">
                  Committed Date: {formatDistanceToNow(commit.committed_date)}
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      {!showAll && recentCommits.length > 5 && (
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
