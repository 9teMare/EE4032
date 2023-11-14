import React, { createContext } from "react";

export const MetamaskContext = createContext<{
    metamask: any;
    wallet: { accounts: string[] };
    balance: string;
    network: string | undefined;
    isConnected: boolean;
    setters: {
        setNetwork: React.Dispatch<React.SetStateAction<string | undefined>>;
        setWallet: React.Dispatch<React.SetStateAction<{ accounts: string[] }>>;
        setBalance: React.Dispatch<React.SetStateAction<string>>;
        setIsConnected: React.Dispatch<React.SetStateAction<boolean>>;
    };
    refreshBalance: () => Promise<void>;
} | null>(null);

export const LoadingContext = createContext<{
    refresh: () => Promise<void>;
} | null>(null);
