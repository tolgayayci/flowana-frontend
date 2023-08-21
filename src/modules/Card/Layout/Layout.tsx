import React, { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="border-2 border-sfblue-700 rounded-2xl px-10 py-10 h-full shadow-xl justify-center">
      {children}
    </div>
  );
};

export default Layout;
