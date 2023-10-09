import { useEffect, useState } from "react";
import "./App.css";
import Web3 from "web3";
import Layout from "./layout";
import { MetamaskContext } from "./context";

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

    return (
        <MetamaskContext.Provider
            value={{
                metamask: metamask,
                address: address,
                balance: balance,
                setters: {
                    setNetwork,
                    setAddress,
                    setBalance,
                    setIsConnected,
                },
            }}
        >
            <Layout>
                {metamask ? <div>Have Metamask</div> : <div>Don't Have Metamask</div>}
                {isConnected && network ? <div>Connected Metamask, network {network}</div> : <div>Not Connected Metamask</div>}
            </Layout>
        </MetamaskContext.Provider>
    );
}

export default App;
