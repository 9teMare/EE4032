import { useContext } from "react";
import { MetamaskContext } from "../context";
import Layout from "../layout";

function ProfileInfo({ address, network, balance }: { address: string; network: string; balance: string }) {
    return (
        <div className="flex flex-col">
            <div>Address: {address}</div>
            <div>Network: {network}</div>
            <div>Account Balance: {balance}</div>
        </div>
    );
}

export default function Profile() {
    const { address, balance, isConnected, network } = useContext(MetamaskContext)!;

    return (
        //<Layout>
            <div>
                {isConnected && network ? (
                    <ProfileInfo address={address!} network={network} balance={balance!} />
                ) : (
                    <div>You are not connected to Metamask</div>
                )}
            </div>
       // </Layout>
    );
}
