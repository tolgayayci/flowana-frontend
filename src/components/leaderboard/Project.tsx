import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

// Hooks
import useProjects from "@/models/leaderboard/useProjects";
import { useProtocol } from "@/models/protocols/useProtocol";

// Modules and Utils
import Layout from "@/modules/Card/Layout/Layout";
import ListLoader from "@/modules/Loaders/github/ListLoader";
import NoListData from "@/modules/NoData/NoListData";

import {
  FaMedal,
  FaStar,
  FaHeartbeat,
  FaCode,
  FaUserFriends,
  FaCommentDots,
  FaTag,
} from "react-icons/fa";

import { IProjects } from "@/types/githubLeaderboard";

export default function Project() {
  const [selectedProject, setSelectedProject] = useState(null);
  const { projects, isLoading } = useProjects();

  const { protocol } = useProtocol();

  useEffect(() => {
    if (projects) {
      setSelectedProject(projects[0]);
    }
  }, [projects]);

  if (isLoading) return <ListLoader isLoading={isLoading} element />;

  if (!projects) return <NoListData element />;

  function ProgressBar({
    icon,
    label,
    value,
  }: {
    icon: JSX.Element;
    label: string;
    value: number;
  }) {
    return (
      <div className="border border-gray-600/20 p-2 rounded">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center space-x-2">
            {icon}
            <span className="font-semibold">{label}</span>
          </div>
          <span className="text-sm font-medium">
            {Intl.NumberFormat(undefined, {
              maximumFractionDigits: 2,
            }).format(value)}
            %
          </span>
        </div>
        <div className="relative rounded-full h-2 bg-gray-200">
          <div
            className="absolute rounded-full h-2 bg-[#3C4D6E]"
            style={{ width: `${value}%` }}
          ></div>
        </div>
      </div>
    );
  }

  function ProjectDetails({ project }: { project: IProjects }) {
    return (
      <div className="flex flex-col justify-between p-8 rounded-md border-gray-600/30 border-2 h-full relative">
        {" "}
        <div className="flex items-center mb-8">
          <Image
            unoptimized
            src={project.repository_info.owner_avatar_url}
            alt="Owner Avatar"
            className="w-16 h-16 rounded-full mr-4"
            width={40}
            height={40}
          />
          <div className="flex-grow">
            <h2 className="text-xl font-bold">
              {project.owner}/{project.repo}
            </h2>
            <p className="text-indigo-600 truncate max-w-lg">
              {project.repository_info.description}
            </p>
          </div>
          <span className="ml-auto p-3 bg-side-500 text-white text-lg font-semibold rounded flex items-center">
            {project.health_score.grade}
          </span>
        </div>
        <div className="mb-4">
          <ProgressBar
            icon={
              <FaHeartbeat className="bg-red-100 text-red-500 rounded-full p-2" />
            }
            label="Total Health Score"
            value={project.health_score.total}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <ProgressBar
            icon={
              <FaCode className="bg-blue-100 text-blue-500 rounded-full p-2" />
            }
            label="Commit Activity"
            value={project.health_score.commit_activity}
          />
          <ProgressBar
            icon={
              <FaUserFriends className="bg-green-100 text-green-500 rounded-full p-2" />
            }
            label="Contribution Activity"
            value={project.health_score.contribution_activity}
          />
          <ProgressBar
            icon={
              <FaCommentDots className="bg-yellow-100 text-yellow-500 rounded-full p-2" />
            }
            label="Issue Activity"
            value={project.health_score.issue_activity}
          />
          <ProgressBar
            icon={
              <FaTag className="bg-purple-100 text-purple-500 rounded-full p-2" />
            }
            label="Release Activity"
            value={project.health_score.release_activity}
          />
        </div>
        <Link
          href={`/${protocol["protocol"]}/projects/${project.owner}/${project.repo}`}
          className="bg-side-500 text-white py-2 rounded-md w-full mt-4 text-center"
        >
          View Project
        </Link>
      </div>
    );
  }

  return (
    <Layout>
      <div className="flex flex-row space-x-6">
        <div
          className={`max-h-[calc(5*6.2rem)] overflow-y-auto scrollbar scrollbar-thumb-indigo-500 scrollbar-track-indigo-100 overflow-x-hidden ${
            selectedProject ? "w-1/2" : "w-full"
          }`}
        >
          {" "}
          <ul className="space-y-3">
            {projects.slice(0, 15).map((project, index) => (
              <li
                key={project.owner + "/" + project.repo}
                onClick={() => setSelectedProject(project)}
                className={`cursor-pointer hover:bg-gray-200/80 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 p-4 border-2 border-side-500 ${
                  selectedProject &&
                  project.owner + "/" + project.repo ===
                    selectedProject.owner + "/" + selectedProject.repo
                    ? "bg-gray-100"
                    : "bg-white"
                }`}
              >
                <div className="flex justify-between">
                  <div className="flex items-center space-x-4 w-2/3">
                    <Image
                      unoptimized
                      src={project.repository_info.owner_avatar_url}
                      alt="Avatar"
                      width={52}
                      height={52}
                      className="rounded-full mr-5"
                    />
                    <div className="flex-grow min-w-0 max-w-md space-y-2">
                      <h3 className="text-base sm:text-md font-semibold truncate">
                        {project.owner + "/" + project.repo}
                      </h3>

                      <p className="text-gray-500 text-xs sm:text-sm font-semibold">
                        Health Score:{" "}
                        <span className="text-indigo-700">
                          {project.health_score.grade}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center sm:text-sm w-1/3 justify-end">
                    {index < 3 ? (
                      <>
                        <FaMedal
                          className={`${
                            index === 0
                              ? "text-white bg-gold rounded-md px-2 py-0.5"
                              : index === 1
                              ? "text-white bg-silver rounded-md p-2"
                              : "text-white bg-bronze rounded-md p-2"
                          } text-[42px]`}
                        />
                      </>
                    ) : (
                      <>
                        <FaStar className="text-side-500 text-2xl mr-2" />
                        <span className="font-bold text-side-500 text-2xl">
                          {index + 1}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        {/* Conditional rendering of details */}
        {selectedProject && (
          <div className="w-1/2">
            <ProjectDetails project={selectedProject} />
          </div>
        )}
      </div>
    </Layout>
  );
}
