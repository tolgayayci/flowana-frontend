import Link from "next/link";
import Image from "next/image";

// Hooks
import useRecentCommits from "@/models/github/useRecentCommits";

// Modules and Utils
import Layout from "@/modules/Card/Layout/Layout";
import CardHeader from "@/modules/Card/Header/Header";
import ListLoader from "@/modules/Loaders/github/ListLoader";
import NoListData from "@/modules/NoData/NoListData";
import { formatDistanceToNow } from "@/utils/functions";

export default function RecentCommits() {
  const { recentCommits, isLoading } = useRecentCommits();

  if (isLoading)
    return (
      <ListLoader
        isLoading={isLoading}
        element={<CardHeader title="Recent Commits" />}
      />
    );

  if (!recentCommits)
    return <NoListData element={<CardHeader title="Recent Commits" />} />;

  return (
    <Layout>
      <CardHeader title="Recent Commits" />
      <div className="max-h-[calc(5*6.2rem)] overflow-y-auto scrollbar scrollbar-thumb-indigo-500 scrollbar-track-indigo-100 overflow-x-hidden">
        <ul className="space-y-3">
          {recentCommits.map((commit) => (
            <li
              key={commit.url}
              className="bg-white rounded-lg shadow-md p-4 transition-transform duration-300 transform border-2 border-sfblue-600"
            >
              <Link
                href={commit.url}
                target="_blank"
                className="block hover:no-underline"
              >
                <div className="flex justify-between">
                  <div className="flex items-center space-x-2 w-1/2">
                    <Image
                      unoptimized
                      src={commit.author_avatar_url}
                      className="rounded-full mr-5"
                      alt="Avatar"
                      width={52}
                      height={52}
                    />
                    <div className="flex-grow min-w-0 max-w-xs">
                      <h3 className="text-base sm:text-md font-semibold truncate">
                        {commit.message}
                      </h3>
                      <p className="text-gray-500 text-xs sm:text-sm mt-1">
                        Commit by{" "}
                        <span className="bg-sfgreen-600 border-2 border-sfgreen-800 text-white rounded-lg px-1 py-0.5">
                          {commit.author_login}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center text-xs sm:text-sm w-1/2 justify-end">
                    <div className="px-2 py-1 bg-sfred-500 border-2 border-sfred-700 text-sfblue-800 rounded-md text-xs">
                      Committed Date:{" "}
                      {formatDistanceToNow(commit.committed_date)}
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
