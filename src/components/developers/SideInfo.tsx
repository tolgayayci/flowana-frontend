import Image from "next/image";

// Hooks
import { useProtocol } from "@/models/protocols/useProtocol";

const protocolInfos = {
  flow: {
    protocol_name: "Flow",
    image_url: "/flow-logo.png",
    resource_link: "https://www.developerreport.com/ecosystems/flow",
  },
  compound: {
    protocol_name: "Compound",
    image_url: "/compound-logo.png",
    resource_link: "https://www.developerreport.com/ecosystems/compound",
  },
  polkadot: {
    protocol_name: "Polkadot",
    image_url: "/polkadot-logo.jpg",
    resource_link: "https://www.developerreport.com/ecosystems/polkadot",
  },
  lens: {
    protocol_name: "Lens",
    image_url: "/lens-logo.jpg",
    resource_link: "#",
  },
  balancer: {
    protocol_name: "Balancer",
    image_url: "/balancer-logo.png",
    resource_link: "https://www.developerreport.com/ecosystems/balancer",
  },
  aave: {
    protocol_name: "Aave",
    image_url: "/aave-logo.png",
    resource_link: "https://www.developerreport.com/ecosystems/aave",
  },
  proton: {
    protocol_name: "Proton",
    image_url: "/proton-logo.jpg",
    resource_link: "#",
  },
  osmosis: {
    protocol_name: "Osmosis",
    image_url: "/osmosis-logo.jpg",
    resource_link: "https://www.developerreport.com/ecosystems/osmosis",
  },
  "the-graph": {
    protocol_name: "The Graph",
    image_url: "/the-graph-logo.png",
    resource_link: "https://www.developerreport.com/ecosystems/the-graph",
  },
  ton: {
    protocol_name: "TON",
    image_url: "/ton-logo.png",
    resource_link: "https://www.developerreport.com/ecosystems/ton",
  },
  ocean: {
    protocol_name: "Ocean",
    image_url: "/ocean-logo.jpg",
    resource_link: "#",
  },
  eos: {
    protocol_name: "EOS",
    image_url: "/eos-logo.jpg",
    resource_link: "https://www.developerreport.com/ecosystems/eos",
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
          <p className="text-gray-500">Developer Report</p>
          <a
            href={protocolInfo.resource_link}
            target="_blank"
            rel="noopener noreferrer"
            className="items-center mt-2.5 bg-side border-2 border-main text-main px-3 py-0.5 rounded-xl text-sm font-semibold inline-block"
          >
            Data: Electric Capital
          </a>
        </div>
      </div>
    </div>
  );
}
