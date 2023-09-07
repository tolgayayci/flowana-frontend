import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FaCode,
  FaCodeBranch,
  FaArchive,
  FaMedal,
  FaStar,
} from "react-icons/fa";

import { useProtocol } from "@/models/protocols/useProtocol";

const protocolInfos = {
  flow: {
    protocol_name: "Flow",
    image_url: "/flow-logo.png",
  },
  compound: {
    protocol_name: "Compound",
    image_url: "/compound-logo.png",
  },
  polkadot: {
    protocol_name: "Polkadot",
    image_url: "/polkadot-logo.jpg",
  },
  lens: {
    protocol_name: "Lens",
    image_url: "/lens-logo.jpg",
  },
};

export default function ProjectCard({ hit }: any) {
  const { protocol } = useProtocol();

  const protocolInfo = protocolInfos[protocol["protocol"]];

  return (
    <Link href={`/${protocol["protocol"]}/projects/${hit.owner}/${hit.repo}`}>
      <div className="bg-white h-full p-10 rounded-md w-full border border-[#3C4D6E] flex flex-col justify-between shadow-lg hover:shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Image
              unoptimized
              className="w-12 h-12 rounded-full"
              src={hit.avatar_url || protocolInfo.image_url}
              alt="Avatar"
              width={48}
              height={48}
            />
            <div>
              <div className="text-lg truncate font-semibold max-w-[220px]">
                {hit.repo}
              </div>
              <div className="text-sm text-gray-500 truncate font-semibold">
                {hit.owner}
              </div>
            </div>
          </div>
          <div className="px-3 py-1 text-sm bg-[#3C4D6E] border text-white rounded-md flex items-center">
            <FaStar className="mr-1" />
            {hit.stars}
          </div>
        </div>

        <div className="flex-grow flex items-center my-6">
          {hit.description ? (
            <p className="text-md font-normal truncate-2-lines leading-6">
              {hit.description}
            </p>
          ) : (
            <p className="text-md font-normal">
              Description not found for this project.
            </p>
          )}
        </div>

        <div className="flex space-x-2">
          {hit.is_closed && (
            <span className="px-2 py-1 bg-red-600 text-white text-sm rounded-md flex items-center">
              <FaCode className="mr-1" /> Closed
            </span>
          )}
          {hit.is_fork && (
            <span className="px-3 py-1 bg-green-500 text-white text-sm rounded-md flex items-center">
              <FaCodeBranch className="mr-1" /> Forked
            </span>
          )}
          {hit.is_archived && (
            <span className="px-2 py-1 bg-yellow-500 text-white text-sm rounded-md flex items-center">
              <FaArchive className="mr-1" /> Archived
            </span>
          )}
          {hit.health_score && (
            <span
              className={`px-3 py-1 text-sm rounded-md flex items-center ${
                hit.health_score.grade === "A"
                  ? "bg-green-500 text-white"
                  : hit.health_score.grade === "B"
                  ? "bg-blue-500 text-white"
                  : hit.health_score.grade === "C+"
                  ? "bg-yellow-500 text-white"
                  : "bg-gray-400 text-gray-800"
              }`}
            >
              <FaMedal className="mr-1" /> Grade: {hit.health_score.grade}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
