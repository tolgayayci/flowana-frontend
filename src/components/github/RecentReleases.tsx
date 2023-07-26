import Link from "next/link";

//Hooks
import useRecentReleases from "@/models/github/useRecentReleases";

// Models and Utils
import Layout from "@/modules/Card/Layout/Layout";
import CardHeader from "@/modules/Card/Header/Header";
import ReleasesLoader from "@/modules/Loaders/github/ReleasesLoader";
import NoListData from "@/modules/NoData/NoListData";

export default function RecentReleases() {
  const { recentReleases, isLoading } = useRecentReleases();

  if (isLoading)
    return (
      <ReleasesLoader
        isLoading={isLoading}
        element={<CardHeader title="Recent Releases" />}
      />
    );

  if (!recentReleases)
    return <NoListData element={<CardHeader title="Recent Releases" />} />;

  const latestRelease = recentReleases[0];

  return (
    <Layout>
      <CardHeader title="Recent Releases" />
      <div className="max-h-[calc(5*6.2rem)] h-full">
        <ul className="flex flex-col h-full space-y-3">
          {recentReleases.slice(0, 5).map((release, index) => (
            <li
              key={release.tag_name}
              className={`border border-gray-200 rounded-lg p-4 flex justify-between items-center ${
                release === latestRelease ? "bg-indigo-100" : ""
              }`}
              style={{ flex: 1 }} // Added style to make the item fill available height
            >
              <Link
                href={release.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col w-full"
              >
                <div className="flex flex-col">
                  <span
                    className={`text-indigo-600 font-semibold truncate ${
                      release === latestRelease ? "text-indigo-800" : ""
                    }`}
                  >
                    {release.name}
                    {index === 0 && (
                      <span className="bg-green-500 text-white text-xs font-semibold px-2 py-1 ml-2 rounded">
                        Latest
                      </span>
                    )}
                  </span>
                  <p className="text-gray-500 text-sm truncate">
                    Published: {new Date(release.published_at).toDateString()}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
}
