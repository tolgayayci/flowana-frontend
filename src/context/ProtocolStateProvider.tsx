import { useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/router";
import { IProtocol } from "@/types/general";
import { ProtocolContext } from "./ProtocolStateContext";

import { protocols } from "@/utils/protocols";

export function ProtocolStateProvider({ children }: { children: ReactNode }) {
  const [protocol, setProtocol] = useState<IProtocol>({ protocol: "flow" });
  const [isInitialised, setIsInitialised] = useState(false); // New state variable

  const router = useRouter();

  useEffect(() => {
    const updateProtocol = (pathname: string) => {
      const protocol = protocols.find(
        (p) => p.value === pathname.split("/")[1]
      );

      if (protocol) {
        setProtocol({ protocol: protocol.value });
        localStorage.setItem("protocol", protocol.value);
        setIsInitialised(true); // Set initialized to true once protocol is set
      }
    };

    // Update protocol initially based on the current path
    updateProtocol(router.asPath);

    // Update protocol on route changes
    const handleRouteChange = (url: string) => {
      updateProtocol(url);
    };

    // const storedHref = localStorage.getItem("protocol");

    // if (storedHref && storedHref !== router.asPath.split("/")[1]) {
    //   console.log("storedHref", storedHref);
    //   router.push(storedHref + "/projects");
    // } else {
    //   updateProtocol(router.asPath); // Update protocol initially based on the current path
    // }

    // Listen to route changes
    router.events.on("routeChangeStart", handleRouteChange);

    // Cleanup
    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, [router.asPath]);

  return (
    <ProtocolContext.Provider value={{ protocol, setProtocol, isInitialised }}>
      {children}
    </ProtocolContext.Provider>
  );
}
