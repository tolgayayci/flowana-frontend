import ReactEcharts from "echarts-for-react";

import CardLoader from "@/modules/CardLoader/CardLoader";
import useCommunityProfile from "@/models/github/useCommunityProfile";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";

export default function CommunityProfile() {
  const { communityProfile, isLoading } = useCommunityProfile("polkadot");

  if (isLoading) return <CardLoader />;
  if (!communityProfile) return;

  const {
    health_percentage,
    updated_at,
    documentation,
    description,
    files,
    content_reports_enabled,
  } = communityProfile;

  const healthPercentageOptions = {
    series: [
      {
        type: "gauge",
        startAngle: 180,
        endAngle: 0,
        axisLine: {
          lineStyle: {
            color: [
              [health_percentage / 100, "#00CC66"],
              [1, "#FF4444"],
            ],
            width: 8,
          },
        },
        axisLabel: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: false,
        },
        pointer: {
          show: false,
        },
        detail: {
          show: true,
          formatter: "{value}%",
          offsetCenter: [0, "60%"],
          textStyle: {
            color: "auto",
            fontSize: 20,
            fontWeight: "bold",
          },
        },
        data: [{ value: health_percentage, name: "Health" }],
      },
    ],
  };

  return (
    <div className="border-2 border-indigo-300 rounded-lg py-12 px-8 flex flex-col md:flex-row">
      <div className="md:w-1/3 p-8 flex flex-col items-center">
        <div className="w-24 h-24 relative">
          <ReactEcharts
            option={healthPercentageOptions}
            style={{ height: "100%", width: "100%" }}
            opts={{ renderer: "svg" }}
          />
          <div
            className="w-full h-full absolute top-0 left-0 flex items-center justify-center"
            style={{ animation: "spin 1.5s infinite linear" }}
          >
            <p className="text-2xl font-bold">{health_percentage}%</p>
          </div>
        </div>
        <div className="mt-6">
          <p className="text-gray-800 text-center text-sm">Health Percentage</p>
        </div>
      </div>
      <div className="md:w-2/3 p-8">
        <h1 className="text-xl font-bold mb-4">Repository Data</h1>
        <div className="flex justify-between mb-4">
          <p className="text-sm font-bold">Last Updated:</p>
          <p>{updated_at}</p>
        </div>
        <div className="flex justify-between mb-4">
          <p className="text-sm font-bold">Documentation:</p>
          <a
            href={documentation}
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-500 hover:underline"
          >
            View Documentation
          </a>
        </div>
        <div className="mb-4">
          <p className="text-sm font-bold">Description:</p>
          <p>{description}</p>
        </div>
        <div className="mb-4">
          <p className="text-sm font-bold">Files:</p>
          {files.issue_template && (
            <a
              href={files.issue_template.html_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              Issue Template
            </a>
          )}
          {files.license && (
            <a
              href={files.license.html_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              License: {files.license.name}
            </a>
          )}
          {files.code_of_conduct_file && (
            <a
              href={files.code_of_conduct_file.html_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              Code of Conduct
            </a>
          )}
          {files.contributing && (
            <a
              href={files.contributing.html_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              Contributing Guidelines
            </a>
          )}
          {files.pull_request_template && (
            <a
              href={files.pull_request_template.html_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              Pull Request Template
            </a>
          )}
          {files.readme && (
            <a
              href={files.readme.html_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              Readme
            </a>
          )}
          {files.code_of_conduct && (
            <a
              href={files.code_of_conduct.html_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              Code of Conduct: {files.code_of_conduct.name}
            </a>
          )}
        </div>
        <div className="flex justify-between">
          <p className="text-sm font-bold">Content Reports Enabled:</p>
          {content_reports_enabled ? (
            <CheckCircleIcon className="h-5 w-5 text-green-500" />
          ) : (
            <XCircleIcon className="h-5 w-5 text-red-500" />
          )}
        </div>
      </div>
    </div>
  );
}
