import { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
// import Web3 from "web3";
import { MetamaskContext } from "./context";
import Profile from "./pages/profile";
import Home from "./pages/home";

function App() {
    const [metamask, setMetamask] = useState<any>(null); // window.ethereum
    const [network, setNetwork] = useState<string>();
    const [isConnected, setIsConnected] = useState(false);
    const [balance, setBalance] = useState<string>();
    const [address, setAddress] = useState<string>();

    const isMetaMaskInstalled = () => {
        //@ts-ignore
        const { ethereum } = window;
        setMetamask(ethereum);
    };

    useEffect(() => {
        isMetaMaskInstalled();
    }, []);

    const router = createBrowserRouter([
        {
            path: "/",
            element: <Home />,
        },
        {
            path: "/home",
            element: <Home />,
        },
        {
            path: "/profile",
            element: <Profile />,
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
            }}
        >
            <RouterProvider router={router} />
        </MetamaskContext.Provider>
    );
}

export default App;
