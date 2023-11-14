import { Dispatch, SetStateAction, useContext, useState } from "react";
import { LoadingContext } from "../../context";
import { EVENT, MODAL_TYPE } from "../../constants";
import Tabs from "./Tabs";
import TabContent from "./TabContent";

export default function HistoryModal({
    campaignId,
    title,
    onCloseModal,
}: {
    campaignId: string | null;
    title: string;
    onCloseModal: Dispatch<SetStateAction<{ index: number; type: MODAL_TYPE } | null>>;
}) {
    const closeModal = () => {
        // @ts-ignore
        document.getElementById("history-modal").close();
        onCloseModal(null);
        setSelectedTab(EVENT.FundsDonated);
    };

    const [selectedTab, setSelectedTab] = useState<EVENT>(EVENT.FundsDonated);

    return (
        <dialog id="history-modal" className="modal">
            <div className="modal-box w-11/12 max-w-7xl h-screen flex flex-col justify-between">
                <div className="flex flex-col gap-4 h-[66vh]">
                    <div className="flex justify-between items-center ">
                        <h3 className="font-bold text-lg">Transaction History for {title}</h3>
                    </div>

                    <Tabs selectedTab={selectedTab} setSelectedTab={setSelectedTab}>
                        <TabContent selectedTab={selectedTab} campaignId={campaignId!} />
                    </Tabs>
                </div>

                <div className="modal-action gap-2">
                    <button className="btn" onClick={closeModal}>
                        Close
                    </button>
                </div>
            </div>
        </dialog>
    );
}
