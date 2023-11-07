import React, { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="border-2 border-sfblack rounded-2xl md:px-10 md:py-10 p-7 h-full shadow-s justify-center overflow-hidden">
      {children}
    </div>
  );
};

export default Layout;
