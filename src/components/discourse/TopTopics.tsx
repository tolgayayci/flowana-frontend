import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Tooltip } from "react-tooltip";

// Hooks
import useDiscourseTopTopics from "@/models/discourse/useDiscourseTopTopics";
import { useProtocol } from "@/models/protocols/useProtocol";

// Models and Utils
import Layout from "@/modules/Card/Layout/Layout";
import CardHeader from "@/modules/Card/Header/Header";
import ListLoader from "@/modules/Loaders/github/ListLoader";
import NoListData from "@/modules/NoData/NoListData";
import { formatDistanceToNow } from "@/utils/functions";

// Types
import { Interval } from "@/types/general";
import { FaComments, FaReply, FaEye, FaHeart } from "react-icons/fa";
import { formatBadgeStatsCount } from "@/utils/functions";

const intervals: Interval[] = [
  { name: "Day", value: "daily" },
  { name: "Week", value: "weekly" },
  { name: "Month", value: "monthly" },
  { name: "Quarterly", value: "quarterly" },
  { name: "Year", value: "yearly" },
  { name: "All", value: "all" },
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
    <span className="w-12 justify-center items-center inline-flex z-50">
      {icon}
      <span className="ml-1">{formatBadgeStatsCount(count)}</span>

      {/* Tooltip */}
      <Tooltip id={id} place="top">
        {tooltip}
      </Tooltip>
    </span>
  );
}

export default function TopTopics() {
  const [selectedInterval, setSelectedInterval] = useState(intervals[2]);
  const { discourseTopTopics, isLoading } = useDiscourseTopTopics(
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
            title="Top Topics"
            tooltip="Discover the leading topics on the platform sorted by your chosen interval, be it daily, weekly, monthly, quarterly, yearly, or of all time. Dive into what's trending during specific periods or overall."
            selectedInterval={selectedInterval}
            setSelectedInterval={setSelectedInterval}
            intervals={intervals}
          />
        }
      />
    );

  if (!discourseTopTopics || discourseTopTopics[0] === undefined)
    return (
      <NoListData
        element={
          <CardHeader
            title="Top Topics"
            tooltip="Discover the leading topics on the platform sorted by your chosen interval, be it daily, weekly, monthly, quarterly, yearly, or of all time. Dive into what's trending during specific periods or overall."
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
        title="Top Topics"
        tooltip="Discover the leading topics on the platform sorted by your chosen interval, be it daily, weekly, monthly, quarterly, yearly, or of all time. Dive into what's trending during specific periods or overall."
        selectedInterval={selectedInterval}
        setSelectedInterval={setSelectedInterval}
        intervals={intervals}
      />
      <div className="max-h-[calc(5*6.1rem)] overflow-y-auto scrollbar scrollbar-thumb-indigo-500 scrollbar-track-indigo-100 overflow-x-hidden">
        <ul className="space-y-3">
          {discourseTopTopics.map((topic) => (
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
                      className="rounded-full mr-5"
                    />
                    <div className="flex-grow min-w-0 max-w-lg">
                      <h3 className="text-base sm:text-md font-semibold truncate">
                        {topic.title}
                      </h3>
                      <p className="text-gray-500 text-xs sm:text-sm mt-1">
                        Opened {formatDistanceToNow(topic.created_at)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center text-xs sm:text-sm w-1/2 justify-end space-x-2 overflow-x-auto">
                    <span
                      className="bg-red-200/70 border-2 border-red-300 text-red-800 text-xs font-semibold px-2 py-1 rounded"
                      data-tooltip-id="likes"
                    >
                      <CountIcon
                        id="likes"
                        icon={<FaHeart className="inline" />}
                        count={topic.like_count}
                        tooltip="Number of likes"
                      />
                    </span>
                    <span
                      className="bg-green-200/70 border-2 border-green-300 text-green-800 text-xs font-semibold px-2 py-1 rounded"
                      title="Number of replies"
                      data-tooltip-id="replies"
                    >
                      <CountIcon
                        id="replies"
                        icon={<FaReply className="inline" />}
                        count={topic.reply_count}
                        tooltip="Number of replies"
                      />
                    </span>
                    <span
                      className="bg-purple-200/70 border-2 border-purple-300 text-purple-800 text-xs font-semibold px-2 py-1 rounded"
                      title="Number of views"
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
                      title="Number of posts"
                      data-tooltip-id="posts"
                    >
                      <CountIcon
                        id="posts"
                        icon={<FaComments className="inline" />}
                        count={topic.posts_count}
                        tooltip="Number of posts"
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
