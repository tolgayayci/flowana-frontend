// Hooks
import useDevelopersDevTypeTable from "@/models/developers/useDevelopersDevTypeTable";

// Models and Utils
import Layout from "@/modules/Card/Layout/Layout";
import CardLoader from "@/modules/CardLoader/CardLoader";
import CardHeader from "@/modules/Card/Header/Header";
import NoData from "@/modules/NoData/NoData";

export default function DevTypeTable() {
  const { devTypeTable, isLoading } = useDevelopersDevTypeTable();

  if (isLoading) {
    return <CardLoader element={<CardHeader title="Developer Type Table" />} />;
  }

  if (!devTypeTable) {
    return (
      <NoData
        element={<CardHeader title="Developer Type Table" />}
        message=""
      />
    );
  }

  return (
    <Layout>
      <div className="overflow-x-auto rounded-xl shadow-md -m-10">
        <table className="w-full border-collapse table-auto">
          <thead>
            <tr className="bg-sfblue-800 text-white rounded-t-2xl">
              {devTypeTable?.header.map((item) => (
                <th
                  key={item.index}
                  className="py-4 px-6 font-bold text-sm uppercase tracking-wider rounded-t-lg"
                >
                  {item.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white">
            {devTypeTable?.rows.map((row, index) => (
              <tr
                key={index}
                className={
                  index === 3
                    ? "bg-white"
                    : (index + 1) % 2 === 0
                    ? "bg-gray-50 border-sfblue-600 border-b-2"
                    : "bg-white border-sfblue-600 border-b-2"
                }
              >
                <td className="py-4 px-6 border-b font-semibold text-gray-700">
                  {row.developer_type[0]}
                  <div className="text-xs text-gray-500 mt-1 font-medium">
                    {row.developer_type[1]}
                  </div>
                </td>
                <td className="py-3 px-6 border-b">{row["jun-01_2023"]}</td>
                <td
                  className={`py-3 px-6 border-b ${
                    row["1y_%"] < 0 ? "text-red-500" : "text-green-500"
                  }`}
                >
                  {row["1y_%"] < 0 ? "↓" : "↑"} {Math.abs(row["1y_%"])}%
                </td>
                <td
                  className={`py-3 px-6 border-b ${
                    row["2y_%"] < 0 ? "text-red-500" : "text-green-500"
                  }`}
                >
                  {row["2y_%"] < 0 ? "↓" : "↑"} {Math.abs(row["2y_%"])}%
                </td>
                <td
                  className={`py-3 px-6 border-b ${
                    row["3y_%"] < 0 ? "text-red-500" : "text-green-500"
                  }`}
                >
                  {row["3y_%"] < 0 ? "↓" : "↑"} {Math.abs(row["3y_%"])}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}
