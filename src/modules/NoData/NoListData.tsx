import React from "react";
import Layout from "../Card/Layout/Layout";
import { DocumentChartBarIcon } from "@heroicons/react/24/outline";

export default function NoListData({ element }: { element: React.ReactNode }) {
  return (
    <Layout>
      <div>{element}</div>
      <div className="flex flex-col items-center justify-center h-full text-center -mt-16 min-h-[calc(5*5rem)]">
        <DocumentChartBarIcon className="w-16 h-16 mb-6 text-sfgreen-700" />
        <h2 className="text-lg md:text-xl text-sfgreen-900 font-semibold mb-4">
          No Data Available
        </h2>
        <p className="text-md text-sfgreen-800">
          We could not find any data for this component, try to change interval!
        </p>
      </div>
    </Layout>
  );
}
