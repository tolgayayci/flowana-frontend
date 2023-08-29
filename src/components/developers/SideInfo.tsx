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
};

export default function SideInfo() {
  const { protocol } = useProtocol();

  const protocolInfo = protocolInfos[protocol["protocol"]];

  return (
    <div className="border-2 border-sfblue-800 text-sfblue-900 rounded-2xl p-5 h-full shadow-xl bg-white-100">
      <div className="flex items-center">
        <Image
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
            className="inline-block items-center mt-2.5 bg-sfred-500 border-2 border-sfred-800 text-[#333333] px-3 py-0.5 rounded-xl text-sm font-semibold"
          >
            Data: Electric Capital
          </a>
        </div>
      </div>
    </div>
  );
}
