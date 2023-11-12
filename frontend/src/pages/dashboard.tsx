import Layout from "../layout";
import { useContext } from "react";
import { MetamaskContext } from "../context";

import CampaignList from "../components/CampaignList";

export default function Dashboard() {
    return (
        <Layout>
            <div className="flex flex-col justify-center p-2 h-full">
                <CampaignList />
            </div>
        </Layout>
    );
}
