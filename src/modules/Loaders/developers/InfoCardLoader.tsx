import React from "react";
import { CSSTransition } from "react-transition-group";
import Layout from "@/modules/Card/Layout/Layout";

const Loader = () => {
  return (
    <>
      <div className="text-xl font-bold text-gray-800 mb-2"></div>
      <div className="bg-gray-300 text-3xl font-bold text-blue-500 mb-2"></div>
      <div className="text-gray-600 text-xs"></div>
    </>
  );
};

const InfoCardLoader = ({
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
        <Loader />
      </Layout>
    </CSSTransition>
  );
};

export default InfoCardLoader;
