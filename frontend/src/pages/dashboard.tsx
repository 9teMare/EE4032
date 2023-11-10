import Layout from "../layout";
import { useContext } from "react";
import { MetamaskContext } from "../context";

export default function Dashboard() {
    const { metamask, isConnected, network } = useContext(MetamaskContext)!;
    return (
        <Layout>
            <div>
                {metamask ? <div>Have Metamask</div> : <div>Don't Have Metamask</div>}
                {isConnected && network ? <div>Connected Metamask, network {network}</div> : <div>Not Connected Metamask</div>}
            </div>
        </Layout>
    );
}
