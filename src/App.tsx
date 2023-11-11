import { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
// import Web3 from "web3";
import { MetamaskContext } from "./context";
import Profile from "./pages/profile";
import Home from "./pages/home";
import ErrorPage from "./pages/error";
import AboutUs from "./pages/AboutUsPage";
import MissionPage from "./pages/MissionPage";
import Approach from "./pages/Approach";

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
            errorElement: <ErrorPage />,
        },
        {
            path: "/profile",
            element: <Profile />,
        },
        {
            path: "/AboutUsPage",
            element: <AboutUs />,
        },
        {
            path: "/MissionPage",
            element: <MissionPage />,
        },
        {
            path: "/Approach",
            element: <Approach />,
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
