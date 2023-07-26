import React, { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="border-2 border-indigo-300 rounded-lg p-12 h-full">
      {children}
    </div>
  );
};

export default Layout;
