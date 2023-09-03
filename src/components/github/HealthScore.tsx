import Layout from "@/modules/Card/Layout/Layout";
import CardHeader from "@/modules/Card/Header/Header";
import CardLoader from "@/modules/CardLoader/CardLoader";
import NoData from "@/modules/NoData/NoData";

// Hooks
import useHealthScore from "@/models/github/useHealthScore";

export default function HealthScore() {
  const { healthScore, isLoading } = useHealthScore();

  if (isLoading)
    return (
      <CardLoader
        element={
          <CardHeader
            title="Flowana Health Score"
            tooltip="Provides an overall health score of the protocol based on various metrics such as commit activity, issue resolution, pull request engagement, release consistency, and contributor involvement. A comprehensive glimpse into the ongoing development and maintenance status of the project."
          />
        }
      />
    );

  if (!healthScore)
    return (
      <NoData
        element={
          <CardHeader
            title="Flowana Health Score"
            tooltip="Provides an overall health score of the protocol based on various metrics such as commit activity, issue resolution, pull request engagement, release consistency, and contributor involvement. A comprehensive glimpse into the ongoing development and maintenance status of the project."
          />
        }
        message=""
      />
    );

  function ProgressBar({ label, value }: { label: string; value: number }) {
    return (
      <div className="flex flex-col">
        <p className="text-sm font-bold mb-3">{label}</p>
        <div className="w-full bg-gray-300 rounded h-4">
          <div
            className="bg-sfred-700 text-xs leading-none py-1 text-center text-white rounded h-4"
            style={{ width: `${value}%` }}
          >
            {value}%
          </div>
        </div>
      </div>
    );
  }

  return (
    <Layout>
      <CardHeader
        title="Flowana Health Score"
        tooltip="Provides an overall health score of the protocol based on various metrics such as commit activity, issue resolution, pull request engagement, release consistency, and contributor involvement. A comprehensive glimpse into the ongoing development and maintenance status of the project."
      />
      <div className="flex items-center space-x-12 mt-12">
        <div className="flex flex-col items-center justify-center w-2/5 bg-gradient-to-br p-6 rounded-lg transition-shadow duration-300 ease-in-out">
          <p className="text-8xl font-extrabold text-sfgreen-800 mb-4">
            {healthScore?.grade}
          </p>
          <p className="text-2xl text-white bg-sfgreen-700 py-2 px-6 rounded-2xl">
            {healthScore?.total.toFixed(2)} %
          </p>
        </div>

        <div className="flex flex-col space-y-4 w-3/5">
          <ProgressBar
            label="Pull Requests"
            value={healthScore?.pull_request_activity as number}
          />
          <ProgressBar
            label="Commit Activity"
            value={healthScore?.commit_activity as number}
          />
          <ProgressBar
            label="Contribution Activity"
            value={healthScore?.contribution_activity as number}
          />
          <ProgressBar
            label="Issue Activity"
            value={healthScore?.issue_activity as number}
          />
          <ProgressBar
            label="Release Activity"
            value={healthScore?.release_activity as number}
          />
        </div>
      </div>
    </Layout>
  );
}
