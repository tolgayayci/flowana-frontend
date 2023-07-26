import React from "react";
import { CSSTransition } from "react-transition-group";
import Layout from "@/modules/Card/Layout/Layout";

const Loader = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 transition-transform duration-300 transform border-2 border-indigo-600 mb-3">
      <div className="flex justify-between">
        <div className="flex items-center space-x-2 w-1/2">
          <div
            className="rounded-full bg-gray-300 mr-5"
            style={{ width: 52, height: 52 }}
          ></div>
          <div className="flex-grow min-w-0 max-w-xs">
            <div className="text-base sm:text-md font-semibold truncate bg-gray-300 w-3/4 h-4 mb-2"></div>
            <div className="text-gray-500 text-xs sm:text-sm mt-1 bg-gray-300 w-1/2 h-4"></div>
          </div>
        </div>
        <div className="flex items-center text-xs sm:text-sm w-1/2 justify-end">
          <div className="mr-2 px-2 py-1 rounded-md text-xs bg-gray-300 w-1/3 h-4"></div>
          <div className="px-2 py-1 rounded-md text-xs bg-gray-300 w-1/3 h-4"></div>
        </div>
      </div>
    </div>
  );
};

const ListLoader = ({
  isLoading,
  element,
}: {
  isLoading: boolean;
  element: React.ReactNode;
}) => {
  return (
    <CSSTransition in={isLoading} timeout={500} classNames="fade" unmountOnExit>
      <Layout>
        {element}
        <div>
          {Array(5)
            .fill(0)
            .map((_, index) => (
              <Loader key={index} />
            ))}
        </div>
      </Layout>
    </CSSTransition>
  );
};

export default ListLoader;
