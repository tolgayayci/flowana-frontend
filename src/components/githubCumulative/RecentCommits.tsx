import Link from "next/link";
import Image from "next/image";

// Hooks
import useCumulativeRecentCommits from "@/models/githubCumulative/useCumulativeRecentCommits";

// Modules and Utils
import Layout from "@/modules/Card/Layout/Layout";
import CardHeader from "@/modules/Card/Header/Header";
import ListLoader from "@/modules/Loaders/github/ListLoader";
import NoListData from "@/modules/NoData/NoListData";
import { formatDistanceToNow } from "@/utils/functions";

import { FaCode } from "react-icons/fa";

export default function RecentCommits() {
  const { recentCommits, isLoading } = useCumulativeRecentCommits();

  if (isLoading)
    return (
      <ListLoader
        isLoading={isLoading}
        element={
          <CardHeader
            title="Latest Commits"
            tooltip="View the latest commits across all repositories of the protocol."
          />
        }
      />
    );

  if (!recentCommits)
    return (
      <NoListData
        element={
          <CardHeader
            title="Latest Commits"
            tooltip="View the latest commits across all repositories of the protocol."
          />
        }
      />
    );

  return (
    <Layout>
      <CardHeader
        title="Latest Commits"
        tooltip="View the latest commits across all repositories of the protocol."
      />
      <div className="max-h-[calc(5*6.4rem)] md:max-h-[calc(5*6.2rem)] overflow-y-auto scrollbar scrollbar-thumb-indigo-500 scrollbar-track-indigo-100 overflow-x-hidden">
        <ul className="space-y-3">
          {recentCommits.map((commit) => (
            <li
              key={commit.url}
              className="bg-white hover:bg-gray-200/80 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 p-4 border-2 border-side-500"
            >
              <Link
                href={commit.url}
                target="_blank"
                className="block hover:no-underline"
              >
                <div className="flex flex-col md:flex-row justify-between">
                  <div className="flex items-center space-x-2 w-2/3">
                    <Image
                      unoptimized
                      src={commit.author_avatar_url}
                      className="rounded-full mr-2 md:mr-5"
                      alt="Avatar"
                      width={52}
                      height={52}
                    />
                    <div>
                      <h3 className="text-base sm:text-md font-semibold truncate max-w-[calc(12*1rem)] md:max-w-md">
                        {commit.message}
                      </h3>
                      <p className="text-gray-500 text-xs sm:text-sm mt-1 truncate">
                        Committed {formatDistanceToNow(commit.committed_date)}
                      </p>
                      {/* For small screens, the author div will show under the commit date */}
                      <div className="md:hidden px-2 py-1 bg-side border-2 border-main text-niceblack-800 font-semibold rounded-md text-xs inline-flex items-center mt-2">
                        <FaCode className="mr-1" />
                        {commit.author_login}
                      </div>
                    </div>
                  </div>
                  {/* This div is for medium screens and up */}
                  <div className="hidden md:flex md:flex-1 md:justify-end md:items-center">
                    <div className="px-2 py-1 bg-side border-2 border-main text-niceblack-800 font-semibold rounded-md text-xs flex items-center">
                      <FaCode className="mr-1" />
                      {commit.author_login}
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
