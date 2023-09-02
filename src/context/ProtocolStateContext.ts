import { createContext, Dispatch, SetStateAction } from 'react';
import { IProtocol } from '@/types/general';

function getLocalStorage(key, initialValue) {
  try {
    const value = window.localStorage.getItem(key);
    return value ? JSON.parse(value) : initialValue;
  } catch (e) {
    // if error, return initial value
    return initialValue;
  }
}

type ProtocolContextType = {
    protocol: IProtocol;
    setProtocol: Dispatch<SetStateAction<IProtocol>>;
}

export const ProtocolContext = createContext<ProtocolContextType>({ 
    protocol: ({ protocol: 'flow' }),
    setProtocol: () => {},
});
