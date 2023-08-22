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
      <CardHeader title="Developer Type Table" />
      <div className="overflow-x-auto">
        <table className="w-full border-collapse table-auto">
          <thead>
            <tr className="bg-gray-200 text-gray-600 text-left">
              {devTypeTable?.header.map((item) => (
                <th key={item.index} className="py-2 px-4 font-semibold">
                  {item.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {devTypeTable?.rows.map((row, index) => (
              <tr
                key={index}
                className={(index + 1) % 2 === 0 ? "bg-gray-100" : ""}
              >
                {row.developer_type.map((type, typeIndex) => (
                  <td key={typeIndex} className="py-2 px-4">
                    {type}
                  </td>
                ))}
                <td className="py-2 px-4">{row["jun-01_2023"]}</td>
                <td className="py-2 px-4">{row["1y_%"]}%</td>
                <td className="py-2 px-4">{row["2y_%"]}%</td>
                <td className="py-2 px-4">{row["3y_%"]}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}
