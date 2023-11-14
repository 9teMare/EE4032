import { Dispatch, SetStateAction } from "react";
import { EVENT } from "../../constants";

export default function Tabs({
    children,
    selectedTab,
    setSelectedTab,
}: {
    children: React.ReactNode;
    selectedTab: EVENT;
    setSelectedTab: Dispatch<SetStateAction<EVENT>>;
}) {
    return (
        <div className="flex flex-col h-full">
            <div>
                <div className="flex w-fit tabs tabs-lifted float-left">
                    <div
                        className={`tab tab-lifted ${selectedTab == EVENT.FundsDonated && "tab-active"}`}
                        onClick={() => setSelectedTab(EVENT.FundsDonated)}
                    >
                        {EVENT.FundsDonated}
                    </div>
                    <div
                        className={`tab tab-lifted ${selectedTab == EVENT.CampaignStarted && "tab-active"}`}
                        onClick={() => setSelectedTab(EVENT.CampaignStarted)}
                    >
                        {EVENT.CampaignStarted}
                    </div>
                    <div
                        className={`tab tab-lifted ${selectedTab == EVENT.CampaignEnded && "tab-active"}`}
                        onClick={() => setSelectedTab(EVENT.CampaignEnded)}
                    >
                        {EVENT.CampaignEnded}
                    </div>

                    <div
                        className={`tab tab-lifted ${selectedTab == EVENT.WithdrawFunds && "tab-active"}`}
                        onClick={() => setSelectedTab(EVENT.WithdrawFunds)}
                    >
                        {EVENT.WithdrawFunds}
                    </div>
                </div>

                <div className="flex border-b-[1px] border-base-300 h-full" />
            </div>
            {children}
        </div>
    );
}
