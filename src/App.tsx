import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Web3 from "web3";
import { ethers } from "ethers";

function App() {
    const [metamask, setMetamask] = useState<any>(null); // window.ethereum
    const [network, setNetwork] = useState<string | null>(null);
    const [isConnected, setIsConnected] = useState(false);
    const [balance, setBalance] = useState<string | null>(null);
    const [address, setAddress] = useState(null);

    const provider = new ethers.BrowserProvider(metamask);

    const isMetaMaskInstalled = () => {
        //@ts-ignore
        const { ethereum } = window;
        setMetamask(ethereum);
    };

    const connectWallet = async () => {
        try {
            const accounts = await metamask.request({
                method: "eth_requestAccounts",
            });

            const chainId = await metamask.request({
                method: "eth_chainId",
            });

            let balanceVal: ethers.BigNumberish = await provider.getBalance(accounts[0]);
            console.log(balanceVal);

            //@ts-ignore
            let bal = ethers.formatEther(balanceVal);

            console.log(bal);
            if (chainId === "0x3") {
                setNetwork("Ropsten Test Network");
            } else if (chainId === "0x5") {
                setNetwork("Goerli Test Network");
            } else if (chainId === "0xaa36a7") {
                setNetwork("Sepolia Test Network");
            } else {
                setNetwork("Other Test Network");
            }
            setAddress(accounts[0]);
            setBalance(bal);
            setIsConnected(true);

            // navigate('/InterfaceDemo/profile');
        } catch (error) {
            setIsConnected(false);
            console.log(error);
        }
    };

    useEffect(() => {
        isMetaMaskInstalled();
    }, []);

    useEffect(() => {
        if (metamask) {
            connectWallet();
        }
    }, [metamask]);

    return (
        <>
            <button onClick={async () => await connectWallet()}>Connect</button>
            {metamask ? <div>Have Metamask</div> : <div>Don't Have Metamask</div>}
            {isConnected && network ? <div>Connected Metamask, network {network}</div> : <div>Not Connected Metamask</div>}
        </>
    );
}

export default App;
