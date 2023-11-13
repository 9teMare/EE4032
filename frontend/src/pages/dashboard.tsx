import Layout from "../layout";
import { useContext } from "react";
import { MetamaskContext } from "../context";

import CampaignList from "../components/CampaignList";

import Error from "../components/Error";

export default function Dashboard() {
    const { metamask } = useContext(MetamaskContext)!;

    return (
        <>
            {metamask ? (
                <Layout>
                    <div className="flex flex-col justify-center p-2 h-full">
                        <CampaignList />
                    </div>
                </Layout>
            ) : (
                <Error />
            )}
        </>
    );
}
