import { useEffect, useState } from "react";
import { createBrowserRouter, redirect, RouterProvider } from "react-router-dom";
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
    const [balance, setBalance] = useState<string>();
    const [address, setAddress] = useState<string>();

    useEffect(() => {
        //@ts-ignore
        const { ethereum } = window;
        setMetamask(ethereum);
    }, []);

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
                address: address,
                balance: balance,
                network: network,
                isConnected: isConnected,
                setters: {
                    setNetwork,
                    setAddress,
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
