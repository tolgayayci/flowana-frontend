import React, { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="border-2 border-sfblue-700 rounded-2xl px-8 py-8 h-full shadow-xl bg-white-100 justify-center">
      {children}
    </div>
  );
};

export default Layout;
