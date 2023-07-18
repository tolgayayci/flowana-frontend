import useRecentReleases from "@/models/github/useRecentReleases";

import CardLoader from "@/modules/CardLoader/CardLoader";

export default function RecentReleases() {
  const { recentReleases, isLoading } = useRecentReleases("polkadot");

  if (isLoading) return <CardLoader />;
  if (!recentReleases) return;

  const latestRelease = recentReleases[0];

  return (
    <div className="border-2 border-indigo-300 rounded-lg py-12">
      <h1 className="ml-12 mb-8">Recent Releases</h1>
      <ul className="space-y-4 px-12">
        {recentReleases.slice(0, 5).map((release) => (
          <li
            key={release.tag_name}
            className={`border border-gray-200 rounded-lg p-4 flex justify-between items-center ${
              release === latestRelease ? "bg-indigo-100" : ""
            }`}
          >
            <div>
              <a
                href={release.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-indigo-600 font-semibold ${
                  release === latestRelease ? "text-indigo-800" : ""
                }`}
              >
                {release.name}
              </a>
              <p className="text-gray-500 text-sm">
                Published at: {new Date(release.published_at).toDateString()}
              </p>
            </div>
            {release === latestRelease && (
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-green-500 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M14.243 5.757a1 1 0 0 1 0 1.414L8.414 12l5.829 5.829a1 1 0 1 1-1.414 1.414L7 13.414l-5.829 5.829a1 1 0 1 1-1.414-1.414L5.586 12 .757 6.171A1 1 0 0 1 2.171 4.757L7 9.586l5.829-5.829a1 1 0 0 1 1.414 0z"
                  />
                </svg>
                <span className="text-xs text-gray-600">Latest</span>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
