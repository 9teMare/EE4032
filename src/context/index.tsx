import React, { createContext } from "react";

export const MetamaskContext = createContext<{
    metamask: any;
    address: string | undefined;
    balance: string | undefined;
    setters: {
        setNetwork: React.Dispatch<React.SetStateAction<string | undefined>>;
        setAddress: React.Dispatch<React.SetStateAction<string | undefined>>;
        setBalance: React.Dispatch<React.SetStateAction<string | undefined>>;
        setIsConnected: React.Dispatch<React.SetStateAction<boolean>>;
    };
} | null>(null);
