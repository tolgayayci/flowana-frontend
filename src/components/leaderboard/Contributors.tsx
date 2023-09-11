import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

// Hooks
import useContributors from "@/models/github/useContributors";

// Modules and Utils
import Layout from "@/modules/Card/Layout/Layout";
import ListLoader from "@/modules/Loaders/github/ListLoader";
import NoListData from "@/modules/NoData/NoListData";

import { FaMedal, FaStar, FaGithub, FaCode } from "react-icons/fa";

import { IContributor } from "@/types/githubLeaderboard";

export default function Contributors() {
  const [selectedContributor, setSelectedContributor] = useState(null);
  const { contributors, isLoading } = useContributors();

  useEffect(() => {
    if (contributors) {
      setSelectedContributor(contributors[0]);
    }
  }, [contributors]);

  if (isLoading) return <ListLoader isLoading={isLoading} element />;

  if (!contributors) return <NoListData element />;

  const selectedContributorRank = selectedContributor
    ? contributors.indexOf(selectedContributor) + 1
    : null;

  function ProjectDetails({
    contributor,
    rank,
  }: {
    contributor: IContributor;
    rank: number;
  }) {
    const sortedContributions = Object.values(contributor.contributions).sort(
      (a, b) => b.commits - a.commits
    );

    return (
      <div className="flex flex-col justify-between p-8 rounded-md border-gray-600/30 border-2 h-full relative">
        {" "}
        <div className="flex items-center mb-6">
          <Image
            unoptimized
            src={contributor.author.avatar_url}
            alt="Owner Avatar"
            className="w-16 h-16 rounded-full mr-4"
            width={40}
            height={40}
          />
          <div className="flex-grow">
            <h2 className="text-2xl font-bold">{contributor.author.login}</h2>
          </div>
          <span className="ml-auto p-3 bg-side-500 text-white text-lg font-semibold rounded flex items-center">
            #{rank}
          </span>
        </div>
        <div className="max-h-[calc(5*2.6rem)] overflow-y-auto">
          <div className="grid grid-cols-2 gap-4 mb-4">
            {sortedContributions.map((contribution, index) => (
              <div
                key={index}
                className="flex flex-col p-3 border rounded-md bg-white hover:shadow-md transition-shadow"
              >
                <Link
                  href={
                    contribution.html_url +
                    `/commits?author=${contributor.author.login}`
                  }
                  target="_blank"
                  className="text-indigo-600 hover:no-underline flex items-center justify-between"
                >
                  <div className="flex items-center">
                    <FaGithub size={30} className="mr-3 text-side-500" />
                    <div className="flex flex-col">
                      <span className="text-gray-700 font-medium max-w-[230px] truncate">
                        {contribution.owner + "/" + contribution.repo}
                      </span>
                    </div>
                  </div>
                  <span className="items-center bg-side border-2 border-main text-main px-3 py-0.5 rounded-xl text-sm font-semibold inline-flex">
                    <FaCode className="mr-2" />
                    {contribution.commits} commits
                  </span>
                </Link>
              </div>
            ))}
          </div>
        </div>
        <Link
          href={contributor.author.html_url}
          target="_blank"
          className="bg-side-500 text-white py-2 rounded-md w-full mt-4 text-center"
        >
          View User
        </Link>
      </div>
    );
  }

  return (
    <Layout>
      <div className="flex flex-row space-x-6">
        <div
          className={`max-h-[calc(5*6.2rem)] overflow-y-auto scrollbar scrollbar-thumb-indigo-500 scrollbar-track-indigo-100 overflow-x-hidden ${
            selectedContributor ? "w-1/2" : "w-full"
          }`}
        >
          {" "}
          <ul className="space-y-3">
            {contributors.slice(0, 15).map((contributor, index) => (
              <li
                key={contributor.author.login}
                onClick={() => setSelectedContributor(contributor)}
                className={`cursor-pointer hover:bg-gray-200/80 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 p-4 border-2 border-side-500 ${
                  selectedContributor &&
                  contributor.author.login === selectedContributor.author.login
                    ? "bg-gray-100"
                    : "bg-white"
                }`}
              >
                <div className="flex justify-between">
                  <div className="flex items-center space-x-4 w-2/3">
                    <Image
                      unoptimized
                      src={contributor.author.avatar_url}
                      alt="Avatar"
                      width={52}
                      height={52}
                      className="rounded-full mr-5"
                    />
                    <div className="flex-grow min-w-0 max-w-md space-y-2">
                      <h3 className="text-base sm:text-md font-semibold truncate">
                        {contributor.author.login}
                      </h3>

                      <p className="text-gray-500 text-xs sm:text-sm font-semibold">
                        Total Commit Count:{" "}
                        <span className="text-indigo-700">
                          {contributor.total_commits}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center sm:text-sm w-1/3 justify-end">
                    <div className="flex items-center space-x-2">
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
                          <FaStar className="text-side-500 text-2xl" />
                          <span className="font-bold text-side-500 text-2xl">
                            {index + 1}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        {/* Conditional rendering of details */}
        {selectedContributor && (
          <div className="w-1/2">
            <ProjectDetails
              contributor={selectedContributor}
              rank={selectedContributorRank}
            />
          </div>
        )}
      </div>
    </Layout>
  );
}
