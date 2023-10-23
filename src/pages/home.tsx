import { useContext } from "react";
import { MetamaskContext } from "../context";
import Layout from "../layout";

export default function Home() {
    const { metamask, address, isConnected, network } = useContext(MetamaskContext)!;

    return (
        <Layout>
            <div>
                {metamask ? <div>Have Metamask</div> : <div>Don't Have Metamask</div>}
                {isConnected && network ? <div>Connected Metamask, network {network}</div> : <div>Not Connected Metamask</div>}
            </div>
        </Layout>
    );
}
