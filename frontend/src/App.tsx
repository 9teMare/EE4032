import { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { MetamaskContext } from "./context";
import Home from "./pages/home";
import ErrorPage from "./pages/error";
import Dashboard from "./pages/dashboard";
import { ethers } from "ethers";

function App() {
    const [metamask, setMetamask] = useState<any>(null); // window.ethereum
    const [network, setNetwork] = useState<string>();
    const [isConnected, setIsConnected] = useState(false);
    const [balance, setBalance] = useState<string>("0");
    const initialState: { accounts: string[] } = { accounts: [] };
    const [wallet, setWallet] = useState(initialState);

    useEffect(() => {
        //@ts-ignore
        const { ethereum } = window;
        setMetamask(ethereum);

        const refreshAccounts = (accounts: any) => {
            if (accounts.length > 0) {
                setWallet({ accounts });
                setIsConnected(true);
            } else {
                setWallet(initialState);
            }
        };

        const onDisconnect = () => {
            setWallet(initialState);
            setIsConnected(false);
            setBalance("0");
            setNetwork(undefined);
            setMetamask(null);
        };

        const getProvider = async () => {
            const provider = new ethers.BrowserProvider(metamask);

            if (provider) {
                const accounts = await ethereum.request({ method: "eth_accounts" });
                refreshAccounts(accounts);
                ethereum.on("accountsChanged", refreshAccounts);
                ethereum.on("disconnect", onDisconnect);
            }
        };

        getProvider();
        return () => {
            ethereum?.removeListener("accountsChanged", refreshAccounts);
            ethereum?.removeListener("disconnect", onDisconnect);
        };
    }, []);

    useEffect(() => {
        const refreshBalance = async () => {
            const provider = new ethers.BrowserProvider(metamask);
            const balanceVal = await provider.getBalance(wallet.accounts[0]);
            const bal = ethers.formatEther(balanceVal);
            setBalance(bal);
        };

        if (isConnected) {
            refreshBalance();
        }
    }, [isConnected, wallet]);

    const refreshBalance = async () => {
        const accounts = await metamask.request({
            method: "eth_requestAccounts",
        });

        const provider = new ethers.BrowserProvider(metamask);
        const balanceVal: ethers.BigNumberish = await provider.getBalance(accounts[0]);
        setBalance(ethers.formatEther(balanceVal));
    };

    const router = createBrowserRouter([
        {
            path: "/",
            element: <Home />,
            errorElement: <ErrorPage />,
        },
        {
            path: "/dashboard",
            element: <Dashboard />,
        },
        {
            path: "/error",
            element: <ErrorPage />,
        },
    ]);

    return (
        <MetamaskContext.Provider
            value={{
                metamask: metamask,
                wallet: wallet,
                balance: balance,
                network: network,
                isConnected: isConnected,
                setters: {
                    setNetwork,
                    setWallet,
                    setBalance,
                    setIsConnected,
                },
                refreshBalance,
            }}
        >
            <RouterProvider router={router} />
        </MetamaskContext.Provider>
    );
}

export default App;
