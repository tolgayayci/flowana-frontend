import { useState, useEffect, ReactNode } from "react";
import { IProtocol } from "@/types/general";
import { ProtocolContext } from "./ProtocolStateContext";

export function ProtocolStateProvider({ children }: { children: ReactNode }) {
  const [protocol, setProtocol] = useState<IProtocol>({ protocol: "flow" });

  // Load protocol from localStorage on mount, since useEffect runs only on the client.
  useEffect(() => {
    const savedProtocol = localStorage.getItem("protocol");
    if (savedProtocol) {
      setProtocol(JSON.parse(savedProtocol));
    }
  }, []);

  // This effect runs whenever protocol changes. It's used to save the updated protocol to local storage.
  useEffect(() => {
    localStorage.setItem("protocol", JSON.stringify(protocol));
  }, [protocol]);

  return (
    <ProtocolContext.Provider value={{ protocol, setProtocol }}>
      {children}
    </ProtocolContext.Provider>
  );
}
