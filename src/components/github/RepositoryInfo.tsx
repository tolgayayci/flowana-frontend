import Image from "next/image";

import useRepositoryInfoModel from "@/models/github/useRepositoryInfo";

import Layout from "@/modules/Card/Layout/Layout";
import CardLoader from "@/modules/CardLoader/CardLoader";
import NoData from "@/modules/NoData/NoData";

export default function RepositoryInfo() {
  const { repositoryInfo, isLoading } = useRepositoryInfoModel();

  if (isLoading) return <CardLoader element />;
  if (!repositoryInfo) return null;

  const {
    fork_count,
    watcher_count,
    stargazer_count,
    commit_comment_count,
    description,
    pull_request_count,
    issue_count,
    release_count,
    owner_avatar_url,
    ["categories.lvl0"]: categories,
    url,
    owner,
    repo,
  } = repositoryInfo;

  return (
    <Layout>
      <div className="flex flex-col -my-3">
        {/* First Row - Image, Repo Info, and Badges */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Image
              unoptimized
              src={owner_avatar_url}
              alt="Repository Owner Avatar"
              className="rounded-full"
              width={64}
              height={64}
            />
            <div className="text-gray-800">
              <p className="font-bold text-lg">
                {owner}/{repo}
              </p>
              {/* <p className="text-sm text-gray-500"></p> */}
              <p className="text-sm text-gray-500">{description}</p>
            </div>
          </div>

          {/* Badges */}
          <div className="hidden md:flex items-center space-x-6">
            <div
              className="flex items-center px-3 py-1 rounded-md shadow-md space-x-4"
              style={{ backgroundColor: "#455e8d" }}
            >
              <span>👀</span>
              <p className="text-sm text-white inline-block font-semibold">
                Watchers
              </p>
              <p className="text-xs inline-block mr-2 px-3 py-1 rounded-xl font-semibold text-black bg-white">
                {watcher_count}
              </p>
            </div>

            <div
              className="flex items-center px-3 py-1 rounded-md shadow-md space-x-4"
              style={{ backgroundColor: "#455e8d", color: "white" }}
            >
              <span>Y</span>
              <p className="text-sm text-white inline-block font-semibold">
                Forks
              </p>
              <p className="text-xs inline-block mr-2 bg-white px-3 py-1 rounded-xl font-semibold text-black">
                {fork_count}
              </p>
            </div>

            <div
              className="flex items-center px-3 py-1 rounded-md shadow-md space-x-4"
              style={{ backgroundColor: "#455e8d", color: "white" }}
            >
              <span>★</span>
              <p className="text-sm text-white inline-block font-semibold">
                Stargazers
              </p>
              <p className="text-xs inline-block mr-2 bg-white px-3 py-1 rounded-xl font-semibold text-black">
                {/* IF stargazer_count is 0 then show as 0 */}
                {stargazer_count ? stargazer_count : 0}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
