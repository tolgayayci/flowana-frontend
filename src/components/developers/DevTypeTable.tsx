import Image from "next/image";

// Hooks
import useDevelopersDevTypeTable from "@/models/developers/useDevelopersDevTypeTable";
import { useProtocol } from "@/models/protocols/useProtocol";

// Models and Utils
import Layout from "@/modules/Card/Layout/Layout";
import CardLoader from "@/modules/CardLoader/CardLoader";
import CardHeader from "@/modules/Card/Header/Header";
import NoData from "@/modules/NoData/NoData";

export default function DevTypeTable() {
  const { devTypeTable, isLoading } = useDevelopersDevTypeTable();

  const { protocol } = useProtocol();

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
    balancer: {
      protocol_name: "Balancer",
      image_url: "/balancer-logo.png",
    },
    aave: {
      protocol_name: "Aave",
      image_url: "/aave-logo.png",
    },
    proton: {
      protocol_name: "Proton",
      image_url: "/proton-logo.jpg",
    },
    osmosis: {
      protocol_name: "Osmosis",
      image_url: "/osmosis-logo.jpg",
    },
    "the-graph": {
      protocol_name: "The Graph",
      image_url: "/the-graph-logo.png",
    },
    ton: {
      protocol_name: "TON",
      image_url: "/ton-logo.png",
    },
    ocean: {
      protocol_name: "Ocean",
      image_url: "/ocean-logo.jpg",
      resource_link: "#",
    },
    eos: {
      protocol_name: "EOS",
      image_url: "/eos-logo.jpg",
    },
  };

  if (isLoading) {
    return (
      <CardLoader
        element={
          <CardHeader
            title="Developer Types"
            tooltip="Explore the diversity of the developer community by type and monitor their activity trends over time. Table lists different developer categories and displays relevant metrics, such as activity counts for specific dates and growth percentages over different year intervals."
          />
        }
      />
    );
  }

  if (!devTypeTable) {
    return (
      <NoData
        element={
          <CardHeader
            title="Developer Types"
            tooltip="Explore the diversity of the developer community by type and monitor their activity trends over time. Table lists different developer categories and displays relevant metrics, such as activity counts for specific dates and growth percentages over different year intervals."
          />
        }
        message=""
      />
    );
  }

  return (
    <Layout>
      <div className="min-w-full mt-2">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#3C4D6E] to-[#4D5E7E] p-1 rounded-lg shadow-md flex flex-col md:flex-row">
          {/* First item */}
          {devTypeTable?.header.slice(0, 1).map((item, index) => (
            <div
              key={index}
              className="hidden py-1.5 px-4 text-left text-md font-semibold text-white tracking-wider md:w-2/3 md:flex items-center justify-start"
            >
              {item.title}
            </div>
          ))}

          {/* Other items in a container */}
          <div className="w-full md:w-1/3 flex flex-row flex-wrap md:flex-nowrap">
            {devTypeTable?.header.slice(1).map((item, index) => (
              <div
                key={index + 1}
                className="py-1.5 px-4 text-left text-md font-semibold text-white tracking-wider w-1/4 md:w-1/4 flex items-center md:justify-end"
              >
                {index === 0 ? item.title.substring(0, 3) : item.title}{" "}
              </div>
            ))}
          </div>
        </div>

        {/* Rows */}
        <div className="bg-white divide-y divide-sfblue-500 w-full">
          {devTypeTable?.rows.map((row, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row justify-between"
            >
              <div className="py-4 px-4 md:w-2/3 flex items-center">
                <div className="w-12 h-12 overflow-hidden rounded hidden md:flex">
                  <Image
                    unoptimized
                    src={
                      protocolInfos[protocol["protocol"]].image_url ||
                      "/flow-logo.png"
                    }
                    alt="Proposal"
                    className="w-full h-full object-cover object-center"
                    width={50}
                    height={50}
                  />
                </div>
                <div className="font-semibold text-gray-700 md:ml-4">
                  {row.developer_type[0]}
                  <div className="text-xs text-gray-500 mt-1 font-medium">
                    {row.developer_type[1]}
                  </div>
                </div>
              </div>
              <div className="flex space-x-1 md:space-x-6 w-full md:w-1/3">
                <div className="w-1/2 md:w-1/4 px-4 py-2 md:py-0 flex flex-col md:justify-center md:items-end">
                  {row["oct-01_2023"]}
                </div>
                <div
                  className={`w-1/2 md:w-1/4 px-4 py-2 md:py-0 flex flex-col md:justify-center md:items-end ${
                    row["1y_%"] < 0 ? "text-red-500" : "text-green-500"
                  }`}
                >
                  {Math.abs(row["1y_%"])}%
                </div>
                <div
                  className={`w-1/2 md:w-1/4 px-4 py-2 md:py-0 flex flex-col md:justify-center md:items-end ${
                    row["2y_%"] < 0 ? "text-red-500" : "text-green-500"
                  }`}
                >
                  {Math.abs(row["2y_%"])}%
                </div>
                <div
                  className={`w-1/2 md:w-1/4 px-4 py-2 md:py-0 flex flex-col md:justify-center md:items-end ${
                    row["3y_%"] < 0 ? "text-red-500" : "text-green-500"
                  }`}
                >
                  {Math.abs(row["3y_%"])}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
