import { useContext } from "react";
import { MetamaskContext } from "../../context";
import { ethers } from "ethers";

export default function ConnectButton() {
    const { metamask, setters } = useContext(MetamaskContext)!;

    const { setNetwork, setBalance, setWallet, setIsConnected } = setters;

    const provider = new ethers.BrowserProvider(metamask);

    const connectWallet = async () => {
        try {
            const accounts = await metamask.request({
                method: "eth_requestAccounts",
            });
            const chainId = await metamask.request({
                method: "eth_chainId",
            });

            const balanceVal: ethers.BigNumberish = await provider.getBalance(accounts[0]);

            const bal = ethers.formatEther(balanceVal);

            if (chainId === "0x3") {
                setNetwork("Ropsten Test Network");
            } else if (chainId === "0x5") {
                setNetwork("Goerli Test Network");
            } else if (chainId === "0xaa36a7") {
                setNetwork("Sepolia Test Network");
            } else {
                setNetwork("Unknown Test Network");
            }
            setWallet({ accounts: accounts });
            setBalance(bal);
            setIsConnected(true);
        } catch (error) {
            setIsConnected(false);
            console.log(error);
        }
    };

    return (
        <button className="btn btn-accent" onClick={async () => await connectWallet()}>
            Connect
        </button>
    );
}
