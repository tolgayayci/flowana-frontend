import Image from "next/image";

import useRepositoryInfoModel from "@/models/github/useRepositoryInfo";
import CardLoader from "@/modules/CardLoader/CardLoader";

export default function RepositoryInfo() {
  const { repositoryInfo, isLoading } = useRepositoryInfoModel();

  if (isLoading) return <CardLoader />;
  if (!repositoryInfo) return;

  const {
    fork_count,
    watcher_count,
    stargazer_count,
    commit_comment_count,
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
    <div className="border-2 border-indigo-300 rounded-lg py-12 flex flex-col items-center md:flex-row">
      <div className="md:w-1/3 p-8 flex flex-col items-center">
        <Image
          src={owner_avatar_url}
          alt="Repository Owner Avatar"
          className="rounded-full mb-4"
          width={64}
          height={64}
        />
        <div className="text-gray-800 text-center">
          <p className="font-bold text-lg">{repo}</p>
          <p className="text-sm text-gray-500">{owner}</p>
        </div>
        <div className="flex justify-around mt-6 w-full">
          <div className="flex items-center flex-col">
            <p className="text-lg font-bold">{watcher_count}</p>
            <p className="text-sm text-gray-500">Watchers</p>
          </div>
          <div className="flex items-center flex-col">
            <p className="text-lg font-bold">{fork_count}</p>
            <p className="text-sm text-gray-500">Forks</p>
          </div>
          <div className="flex items-center flex-col">
            <p className="text-lg font-bold">{stargazer_count}</p>
            <p className="text-sm text-gray-500">Stargazers</p>
          </div>
        </div>
      </div>
      <div className="md:w-2/3 p-8">
        <h1 className="text-xl font-bold mb-4">Repository Info</h1>
        <div className="flex flex-wrap">
          <div className="w-1/2 mb-4">
            <p className="text-sm font-bold mb-1">Commit Comments</p>
            <p>{commit_comment_count}</p>
          </div>
          <div className="w-1/2 mb-4">
            <p className="text-sm font-bold mb-1">Pull Requests</p>
            <p>{pull_request_count}</p>
          </div>
          <div className="w-1/2 mb-4">
            <p className="text-sm font-bold mb-1">Issues</p>
            <p>{issue_count}</p>
          </div>
          <div className="w-1/2 mb-4">
            <p className="text-sm font-bold mb-1">Releases</p>
            <p>{release_count}</p>
          </div>
          <div className="w-full mb-4">
            <p className="text-sm font-bold mb-3">Topics</p>
            <div className="flex flex-wrap">
              {categories.map((topic: string, index: number) => (
                <span
                  key={index}
                  className="bg-gray-200 text-gray-800 px-2 py-1 rounded mr-2 mb-2 text-sm"
                >
                  {topic}
                </span>
              ))}
            </div>
          </div>
        </div>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-indigo-500 hover:underline"
        >
          View on GitHub
        </a>
      </div>
    </div>
  );
}
