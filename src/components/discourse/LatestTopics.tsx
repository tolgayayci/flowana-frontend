import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Tooltip } from "react-tooltip";

// Hooks
import useDiscourseLatestTopics from "@/models/discourse/useDiscourseLatestTopics";
import { useProtocol } from "@/models/protocols/useProtocol";

// Models and Utils
import Layout from "@/modules/Card/Layout/Layout";
import CardHeader from "@/modules/Card/Header/Header";
import ListLoader from "@/modules/Loaders/github/ListLoader";
import NoListData from "@/modules/NoData/NoListData";

import {
  FaComments,
  FaReply,
  FaEye,
  FaHeart,
  FaPeopleArrows,
} from "react-icons/fa";
import { formatDistanceToNow } from "@/utils/functions";
import { formatBadgeStatsCount } from "@/utils/functions";

// Types
import { Interval } from "@/types/general";

const intervals: Interval[] = [
  { name: "Default", value: "default" },
  { name: "Created", value: "created" },
  { name: "Activity", value: "activity" },
  { name: "Views", value: "views" },
  { name: "Posts", value: "posts" },
  { name: "Likes", value: "likes" },
  { name: "Op Likes", value: "op_likes" },
];

const forumInfos = {
  flow: {
    protocol_name: "Flow",
    logo: "/flow-logo.png",
    forum_url: "https://forum.onflow.org/t/",
  },
  compound: {
    protocol_name: "Compound",
    logo: "/compound-logo.png",
    forum_url: "https://www.comp.xyz/t/",
  },
  polkadot: {
    protocol_name: "Polkadot",
    logo: "/polkadot-logo.jpg",
    forum_url: "https://forum.polkadot.network/t/",
  },
  lens: {
    protocol_name: "Lens",
    logo: "/lens-logo.jpg",
    forum_url: "#",
  },
  balancer: {
    protocol_name: "Balancer",
    logo: "/balancer-logo.png",
    forum_url: "https://forum.balancer.fi/t/",
  },
  aave: {
    protocol_name: "Aave",
    logo: "/aave-logo.png",
    forum_url: "https://governance.aave.com/t/",
  },
  proton: {
    protocol_name: "Proton",
    logo: "/proton-logo.jpg",
    forum_url: "#",
  },
  osmosis: {
    protocol_name: "Osmosis",
    logo: "/osmosis-logo.jpg",
    forum_url: "#",
  },
  "the-graph": {
    protocol_name: "The Graph",
    logo: "/the-graph-logo.png",
    forum_url: "https://forum.thegraph.com/t/",
  },
  ton: {
    protocol_name: "TON",
    logo: "/ton-logo.png",
    forum_url: "#",
  },
  ocean: {
    protocol_name: "Ocean",
    logo: "/ocean-logo.jpg",
    forum_url: "#",
  },
  eos: {
    protocol_name: "EOS",
    logo: "/eos-logo.jpg",
    forum_url: "https://forums.eoscommunity.org/t/",
  },
};

function CountIcon({ icon, count, tooltip, id }) {
  return (
    <span className="w-7 md:w-12 justify-center items-center inline-flex z-50">
      {icon}
      <span className="ml-1">{formatBadgeStatsCount(count)}</span>

      {/* Tooltip */}
      <Tooltip id={id} place="top">
        {tooltip}
      </Tooltip>
    </span>
  );
}

export default function LatestTopics() {
  const [selectedInterval, setSelectedInterval] = useState(intervals[0]);
  const { discourseLatestTopics, isLoading } = useDiscourseLatestTopics(
    selectedInterval.value
  );

  const { protocol } = useProtocol();

  const forumInfo = forumInfos[protocol["protocol"]];

  if (isLoading)
    return (
      <ListLoader
        isLoading={isLoading}
        element={
          <CardHeader
            title="Latest Topics"
            tooltip="View the latest topics by interval on the forum."
            selectedInterval={selectedInterval}
            setSelectedInterval={setSelectedInterval}
            intervals={intervals}
          />
        }
      />
    );

  if (!discourseLatestTopics)
    return (
      <NoListData
        element={
          <CardHeader
            title="Latest Topics"
            tooltip="View the latest topics by interval on the forum."
            selectedInterval={selectedInterval}
            setSelectedInterval={setSelectedInterval}
            intervals={intervals}
          />
        }
      />
    );

  return (
    <Layout>
      <CardHeader
        title="Latest Topics"
        tooltip="View the latest topics by interval on the forum."
        selectedInterval={selectedInterval}
        setSelectedInterval={setSelectedInterval}
        intervals={intervals}
      />
      <div className="max-h-[calc(5*6.2rem)] md:max-h-[calc(5*6.1rem)] overflow-y-auto scrollbar scrollbar-thumb-indigo-500 scrollbar-track-indigo-100 overflow-x-hidden">
        <ul className="space-y-3">
          {discourseLatestTopics.map((topic) => (
            <li
              key={topic.id}
              className="bg-white hover:bg-gray-200/80 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 p-4 border-2 border-side-500"
            >
              <Link
                href={forumInfo.forum_url + topic.slug}
                target="_blank"
                className="block hover:no-underline"
              >
                <div className="flex justify-between">
                  <div className="flex items-center space-x-2 w-1/2">
                    <Image
                      unoptimized
                      src={forumInfo.logo}
                      alt="Avatar"
                      width={52}
                      height={52}
                      className="rounded-full mr-2 md:mr-5"
                    />
                    <div className="flex-grow space-y-2 md:space-y-1">
                      <h3 className="text-base sm:text-md font-semibold truncate max-w-[calc(12*1rem)] md:max-w-md -mb-1 md:mb-0">
                        {topic.title}
                      </h3>
                      <p className="text-gray-500 text-xs sm:text-sm truncate">
                        Opened {formatDistanceToNow(topic.created_at)}
                      </p>
                      <div className="flex md:hidden items-center text-xs sm:text-sm space-x-2 overflow-x-auto">
                        <span
                          className="bg-red-200/70 border-2 border-red-300 text-red-800 text-[11px] font-semibold px-1.5 py-0.5 rounded"
                          data-tooltip-id="like_count"
                        >
                          <CountIcon
                            id="like_count"
                            icon={<FaHeart className="inline" />}
                            count={topic.like_count}
                            tooltip="Number of likes"
                          />
                        </span>
                        <span
                          className="bg-green-200/70 border-2 border-green-300 text-green-800 text-[11px] font-semibold px-1.5 py-0.5 rounded"
                          data-tooltip-id="reply_count"
                        >
                          <CountIcon
                            id="reply_count"
                            icon={<FaReply className="inline" />}
                            count={topic.reply_count}
                            tooltip="Number of replies"
                          />
                        </span>
                        {/* <span
                          className="bg-purple-200/70 border-2 border-purple-300 text-purple-800 text-[11px] font-semibold px-1.5 py-0.5 rounded"
                          data-tooltip-id="views"
                        >
                          <CountIcon
                            id="views"
                            icon={<FaEye className="inline" />}
                            count={topic.views}
                            tooltip="Number of views"
                          />
                        </span> */}
                        <span
                          className="bg-orange-200/70 border-2 border-orange-300 text-orange-800 text-[11px] font-semibold px-1.5 py-0.5 rounded"
                          data-tooltip-id="posts_count"
                        >
                          <CountIcon
                            id="posts_count"
                            icon={<FaComments className="inline" />}
                            count={topic.posts_count}
                            tooltip="Number of posts"
                          />
                        </span>
                        <span
                          className="bg-sky-200/70 border-2 border-sky-300 text-sky-800 text-[11px] font-semibold px-1.5 py-0.5 rounded"
                          data-tooltip-id="posters_len"
                        >
                          <CountIcon
                            id="posters_len"
                            icon={<FaPeopleArrows className="inline" />}
                            count={topic.posters_len}
                            tooltip="Posters Length"
                          />
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:flex items-center text-xs sm:text-sm w-1/2 justify-end space-x-2 overflow-x-auto">
                    <span
                      className="bg-red-200/70 border-2 border-red-300 text-red-800 text-xs font-semibold px-2 py-1 rounded"
                      data-tooltip-id="like_count"
                    >
                      <CountIcon
                        id="like_count"
                        icon={<FaHeart className="inline" />}
                        count={topic.like_count}
                        tooltip="Number of likes"
                      />
                    </span>
                    <span
                      className="bg-green-200/70 border-2 border-green-300 text-green-800 text-xs font-semibold px-2 py-1 rounded"
                      data-tooltip-id="reply_count"
                    >
                      <CountIcon
                        id="reply_count"
                        icon={<FaReply className="inline" />}
                        count={topic.reply_count}
                        tooltip="Number of replies"
                      />
                    </span>
                    <span
                      className="bg-purple-200/70 border-2 border-purple-300 text-purple-800 text-xs font-semibold px-2 py-1 rounded"
                      data-tooltip-id="views"
                    >
                      <CountIcon
                        id="views"
                        icon={<FaEye className="inline" />}
                        count={topic.views}
                        tooltip="Number of views"
                      />
                    </span>
                    <span
                      className="bg-orange-200/70 border-2 border-orange-300 text-orange-800 text-xs font-semibold px-2 py-1 rounded"
                      data-tooltip-id="posts_count"
                    >
                      <CountIcon
                        id="posts_count"
                        icon={<FaComments className="inline" />}
                        count={topic.posts_count}
                        tooltip="Number of posts"
                      />
                    </span>
                    <span
                      className="bg-sky-200/70 border-2 border-sky-300 text-sky-800 text-xs font-semibold px-2 py-1 rounded"
                      data-tooltip-id="posters_len"
                    >
                      <CountIcon
                        id="posters_len"
                        icon={<FaPeopleArrows className="inline" />}
                        count={topic.posters_len}
                        tooltip="Posters Length"
                      />
                    </span>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
}
