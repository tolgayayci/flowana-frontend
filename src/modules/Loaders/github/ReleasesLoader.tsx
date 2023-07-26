import React from "react";
import { CSSTransition } from "react-transition-group";
import Layout from "@/modules/Card/Layout/Layout";

const Loader = () => {
  return (
    <li
      className="border border-gray-200 rounded-lg p-4 flex justify-between items-center"
      style={{ flex: 1 }}
    >
      {/* Rest of your code */}
    </li>
  );
};

const ReleasesLoader = ({
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

export default ReleasesLoader;
