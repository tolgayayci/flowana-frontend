import Link from "next/link";

//Hooks
import useRecentReleases from "@/models/github/useRecentReleases";

// Models and Utils
import Layout from "@/modules/Card/Layout/Layout";
import CardHeader from "@/modules/Card/Header/Header";
import CardLoader from "@/modules/CardLoader/CardLoader";
import NoData from "@/modules/NoData/NoData";

import { AiFillGithub, AiFillCalendar, AiFillRocket } from "react-icons/ai";
import { formatChartDate } from "@/utils/functions";
export default function RecentReleases() {
  const { recentReleases, isLoading } = useRecentReleases();

  if (isLoading)
    return (
      <CardLoader
        element={
          <CardHeader
            title="Latest Releases"
            tooltip="View the latest releases created by the repository."
          />
        }
      />
    );

  if (!recentReleases)
    return (
      <NoData
        element={
          <CardHeader
            title="Latest Releases"
            tooltip="View the latest releases created by the repository."
          />
        }
        message=""
      />
    );

  const latestRelease = recentReleases[0];

  return (
    <Layout>
      <CardHeader
        title="Latest Releases"
        tooltip="View the latest releases created by the repository."
      />
      <div className="max-h-[calc(5*6.2rem)] h-full">
        <ul className="flex flex-col h-full space-y-3">
          {recentReleases.slice(0, 5).map((release, index) => (
            <li
              key={release.tag_name}
              className={`border border-gray-200 rounded-lg p-4 flex justify-between items-center shadow-sm hover:shadow-xl transition-shadow duration-300`}
              style={{ flex: 1 }}
            >
              <Link
                href={release.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col w-full"
              >
                <div className="flex flex-col items-start">
                  <span className="text-sfblue-800 font-semibold mb-2">
                    <AiFillRocket className="inline mr-1" />

                    {release.tag_name}
                  </span>
                  <div className="flex space-x-2 items-center">
                    <span className="bg-indigo-200 border border-indigo-300 text-indigo-800 text-xs font-semibold px-2 py-0.5 rounded">
                      <AiFillGithub className="inline mr-1 xl:hidden 2xl:inline" />
                      {release.repo}
                    </span>
                    <span className="bg-blue-200 border border-blue-300 text-blue-800 text-xs font-semibold px-2 py-0.5 rounded">
                      <AiFillCalendar className="inline mr-1" />
                      {formatChartDate(release.published_at)}
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
