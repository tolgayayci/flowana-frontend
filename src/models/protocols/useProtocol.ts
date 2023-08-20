import { useContext } from "react";
import { ProtocolContext } from "@/context/ProtocolStateContext";

export function useProtocol() {
    const context = useContext(ProtocolContext);

    if (context === undefined) {
      throw new Error('useProtocol must be used within a ProtocolProvider');
    }
    
    return context;
}