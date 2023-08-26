import React from "react";
import Image from "next/image";
import Link from "next/link";

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
      <div className="bg-white h-full p-8 rounded-md w-full border-[3px] border-sfblue-700 flex flex-col justify-between shadow-xl hover:shadow-2xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Image
              className="w-12 h-12 rounded-full"
              src={hit.avatar_url || protocolInfo.image_url}
              alt="Avatar"
              width={48}
              height={48}
            />
            <div>
              <div className="text-lg truncate font-semibold max-w-[170px]">
                {hit.repo}
              </div>
              <div className="text-sm text-gray-500 truncate font-semibold">
                {hit.owner}
              </div>
            </div>
          </div>
          <div className="px-3 py-1 text-sm bg-orange-300 border border-orange-800 text-orange-700 rounded-full">
            {hit.stars} ⭐
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
          {hit.health_score && (
            <span className="px-3 py-1 bg-blue-500 text-white text-sm rounded-full">
              Grade: {hit.health_score.grade}
            </span>
          )}
          {hit.is_fork && (
            <span className="px-3 py-1 bg-green-500 text-white text-sm rounded-full">
              Forked
            </span>
          )}
          {hit.is_closed && (
            <span className="px-2 py-1 bg-red-500 text-white text-sm rounded-full">
              Closed
            </span>
          )}
          {new Date(hit.created_at).toString() !== "Invalid Date" && (
            <span className="px-2 py-1 bg-green-300 text-green-800 text-sm rounded-full">
              Created: {new Date(hit.created_at).toLocaleDateString()}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
