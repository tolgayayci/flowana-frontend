import React, { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="border-2 border-blue-500 rounded-lg px-10 py-10 h-full shadow-xl bg-white-100">
      {children}
    </div>
  );
};

export default Layout;
