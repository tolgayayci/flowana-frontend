import { createContext, Dispatch, SetStateAction } from 'react';
import { IProtocol } from '@/types/general';

type ProtocolContextType = {
    protocol: IProtocol;
    setProtocol: Dispatch<SetStateAction<IProtocol>>;
    isInitialised: boolean;
}

export const ProtocolContext = createContext<ProtocolContextType>({ 
    protocol: ({ protocol: 'flow' }),
    setProtocol: () => {},
    isInitialised: false,
});
