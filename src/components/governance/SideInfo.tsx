import Image from "next/image";

// Hooks
import { useProtocol } from "@/models/protocols/useProtocol";

const protocolInfos = {
  flow: {
    protocol_name: "Flow",
    image_url: "/flow-logo.png",
    forum_url: "#",
  },
  compound: {
    protocol_name: "Compound",
    image_url: "/compound-logo.png",
    forum_url: "https://www.tally.xyz/gov/compound",
  },
  polkadot: {
    protocol_name: "Polkadot",
    image_url: "/polkadot-logo.jpg",
    forum_url: "#",
  },
  lens: {
    protocol_name: "Lens",
    image_url: "/lens-logo.jpg",
    forum_url: "#",
  },
  balancer: {
    protocol_name: "Balancer",
    image_url: "/balancer-logo.png",
    forum_url: "#",
  },
  aave: {
    protocol_name: "Aave",
    image_url: "/aave-logo.png",
    forum_url: "https://www.tally.xyz/gov/aave",
  },
  proton: {
    protocol_name: "Proton",
    image_url: "/proton-logo.jpg",
    forum_url: "#",
  },
  osmosis: {
    protocol_name: "Osmosis",
    image_url: "/osmosis-logo.jpg",
    forum_url: "#",
  },
  "the-graph": {
    protocol_name: "The Graph",
    image_url: "/the-graph-logo.png",
    forum_url: "#",
  },
  ton: {
    protocol_name: "TON",
    image_url: "/ton-logo.png",
    forum_url: "#",
  },
  ocean: {
    protocol_name: "Ocean",
    image_url: "/ocean-logo.jpg",
    forum_url: "#",
  },
  eos: {
    protocol_name: "EOS",
    image_url: "/eos-logo.jpg",
    forum_url: "#",
  },
};

export default function SideInfo() {
  const { protocol } = useProtocol();

  const protocolInfo = protocolInfos[protocol["protocol"]];

  return (
    <div className="border-2 border-sfblue-800 text-sfblue-900 rounded-2xl p-5 h-full shadow-xl bg-white-100">
      <div className="flex items-center">
        <Image
          unoptimized
          src={protocolInfo.image_url}
          alt={`${protocolInfo.protocol_name} Avatar`}
          className="rounded-lg mr-6"
          width={64}
          height={64}
        />
        <div>
          <p className="text-xl font-semibold truncate w-full mb-1">
            {protocolInfo.protocol_name}
          </p>
          <p className="text-gray-500">Governance Analysis</p>
          <a
            href={protocolInfo.forum_url}
            target="_blank"
            rel="noopener noreferrer"
            className="items-center mt-2.5 bg-side border-2 border-main text-main px-3 py-0.5 rounded-xl text-sm font-semibold inline-block"
          >
            Data: Tally
          </a>
        </div>
      </div>
    </div>
  );
}
