import React, { createContext } from "react";

export const MetamaskContext = createContext<{
    metamask: any;
    address: string | undefined;
    balance: string | undefined;
    network: string | undefined;
    isConnected: boolean;
    setters: {
        setNetwork: React.Dispatch<React.SetStateAction<string | undefined>>;
        setAddress: React.Dispatch<React.SetStateAction<string | undefined>>;
        setBalance: React.Dispatch<React.SetStateAction<string | undefined>>;
        setIsConnected: React.Dispatch<React.SetStateAction<boolean>>;
    };
    refreshBalance: () => Promise<void>;
} | null>(null);

export const LoadingContext = createContext<{
    refresh: () => Promise<void>;
} | null>(null);
