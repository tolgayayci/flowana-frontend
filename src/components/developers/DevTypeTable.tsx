import Image from "next/image";

// Hooks
import useDevelopersDevTypeTable from "@/models/developers/useDevelopersDevTypeTable";

// Models and Utils
import Layout from "@/modules/Card/Layout/Layout";
import CardLoader from "@/modules/CardLoader/CardLoader";
import CardHeader from "@/modules/Card/Header/Header";
import NoData from "@/modules/NoData/NoData";

import { FaArrowUp, FaArrowDown } from "react-icons/fa";

export default function DevTypeTable() {
  const { devTypeTable, isLoading } = useDevelopersDevTypeTable();

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
        <div className="bg-gradient-to-r from-[#3C4D6E] to-[#4D5E7E] p-1 rounded-lg shadow-md flex">
          {/* First item */}
          {devTypeTable?.header.slice(0, 1).map((item, index) => (
            <div
              key={index}
              className="py-1.5 px-4 text-left text-md font-semibold text-white tracking-wider w-2/3 flex items-center justify-start"
            >
              {item.title}
            </div>
          ))}

          {/* Other items in a container */}
          <div className="w-1/3 flex">
            {devTypeTable?.header.slice(1).map((item, index) => (
              <div
                key={index + 1}
                className="py-1.5 px-4 text-left text-md font-semibold text-white tracking-wider w-1/4 flex items-center justify-end"
              >
                {item.title}
              </div>
            ))}
          </div>
        </div>

        {/* Rows */}
        <div className="bg-white divide-y divide-sfblue-500 w-full">
          {devTypeTable?.rows.map((row, index) => (
            <div key={index} className="flex justify-between">
              <div className="py-4 px-4 w-2/3 flex items-center">
                <div className="w-12 h-12 overflow-hidden rounded">
                  <Image
                    unoptimized
                    src={"/compound-logo.png"}
                    alt="Proposal"
                    className="w-full h-full object-cover"
                    width={50}
                    height={50}
                  />
                </div>
                <div className="font-semibold text-gray-700 ml-4">
                  {row.developer_type[0]}
                  <div className="text-xs text-gray-500 mt-1 font-medium">
                    {row.developer_type[1]}
                  </div>
                </div>
              </div>
              <div className="flex space-x-6 w-1/3">
                <div className="w-1/4 px-4  flex flex-col justify-center items-end">
                  {row["jun-01_2023"]}
                </div>
                <div
                  className={`w-1/4 px-4 flex flex-col justify-center items-end ${
                    row["1y_%"] < 0 ? "text-red-500" : "text-green-500"
                  }`}
                >
                  {Math.abs(row["1y_%"])}%
                </div>
                <div
                  className={`w-1/4 px-4  flex flex-col justify-center items-end ${
                    row["2y_%"] < 0 ? "text-red-500" : "text-green-500"
                  }`}
                >
                  {Math.abs(row["2y_%"])}%
                </div>
                <div
                  className={`w-1/4 px-4  flex flex-col justify-center items-end ${
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
