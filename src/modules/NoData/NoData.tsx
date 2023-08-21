import React from "react";
import Layout from "../Card/Layout/Layout";

export default function NoData({ element }: { element: React.ReactNode }) {
  return (
    <Layout>
      <div>{element}</div>
      <div className="flex flex-col items-center justify-center h-full text-center -mt-8">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-24 w-24 text-indigo-300 mb-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 011.946-.806 3.42 3.42 0 013.572 3.572 3.42 3.42 0 01-.8 1.94m-2.718 2.727a4.553 4.553 0 01-1.94.801 4.553 4.553 0 01-4.744-4.744 4.553 4.553 0 01.8-1.94m4.615-.604a4.553 4.553 0 011.94-.803 4.553 4.553 0 014.744 4.744 4.553 4.553 0 01-.8 1.94"
          />
        </svg>
        <h2 className="text-lg md:text-xl text-indigo-500 font-semibold mb-2">
          No Data Available
        </h2>
        <p className="text-md text-indigo-400">
          We could not find any data for your request. Please try again later.
        </p>
      </div>
    </Layout>
  );
}
