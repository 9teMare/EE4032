import { Suspense, useContext, useEffect, useMemo, useState } from "react";
import { getAllCampaign, getCampaignCount, getCampaignsInBatch } from "../../api/interact";
import Pagination from "./Pagination";
import { isValidCampaignId } from "../../utils";
import CampaignCard from "./CampaignCard";
import Loading from "../Loading";
import CampaignRegistration from "../CampaignRegistration";
import Footer from "../Footer";
import DonationModal from "../DonationModal";
import { LoadingContext, MetamaskContext } from "../../context";
import { End as EndConfirmation, Withdraw as WithdrawConfirmation } from "../Confirmation";

export default function CampaignList() {
    const [campaignCount, setCampaignCount] = useState<number>(0);

    const [currentPage, setCurrentPage] = useState<number>(1);

    const [campaignIds, setCampaignIds] = useState<string[]>([]);
    const [campaignsInfo, setCampaignsInfo] = useState<any[]>([]);

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [selectedCampaignIndex, setSelectedCampaignIndex] = useState<{ index: number; type: "end" | "donate" | "withdraw" } | null>(null);

    const { refreshBalance } = useContext(MetamaskContext)!;

    const selectedCampaignId = useMemo(() => {
        if (selectedCampaignIndex === null) return null;
        return campaignIds[selectedCampaignIndex.index];
    }, [selectedCampaignIndex]);

    useEffect(() => {
        getCampaignCount().then((count) => {
            setCampaignCount(Number(count));
        });
    }, []);

    useEffect(() => {
        setIsLoading(true);
        getCampaignsInBatch(currentPage - 1).then((campaignIds: string[]) => {
            setCampaignIds(campaignIds.filter((campaign) => isValidCampaignId(campaign)));
        });
    }, [currentPage]);

    useEffect(() => {
        setIsLoading(true);
        getAllCampaign(campaignIds)
            .then((campaignInfo: any[]) => {
                setCampaignsInfo(campaignInfo);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [campaignIds]);

    useEffect(() => {
        if (selectedCampaignIndex !== null) {
            if (selectedCampaignIndex.type === "end") {
                // @ts-ignore
                document.getElementById("end-confirmation-modal").showModal();
            } else if (selectedCampaignIndex.type === "donate") {
                // @ts-ignore
                document.getElementById("donation_modal").showModal();
            } else if (selectedCampaignIndex.type === "withdraw") {
                // @ts-ignore
                document.getElementById("withdrawal-confirmation-modal").showModal();
            }
        }
    }, [selectedCampaignIndex]);

    const refresh = async () => {
        setIsLoading(true);
        getCampaignCount().then((count) => {
            setCampaignCount(Number(count));
        });
        getCampaignsInBatch(currentPage - 1)
            .then((campaignIds: string[]) => {
                setCampaignIds(campaignIds.filter((campaign) => isValidCampaignId(campaign)));
            })
            .finally(() => {
                setIsLoading(false);
            });
        refreshBalance();
    };

    return (
        <LoadingContext.Provider value={{ refresh }}>
            <div className="flex h-full">
                <div className="flex justify-between flex-col w-full h-full">
                    {isLoading ? (
                        <Loading />
                    ) : (
                        <div className="gap-4 grid grid-cols-3">
                            <div className="col-span-2">
                                <div className="grid grid-cols-2 gap-4">
                                    {campaignsInfo.slice(0, 4).map((info, index) => (
                                        <CampaignCard
                                            key={index}
                                            campaignId={campaignIds[index]}
                                            campaignInfo={info}
                                            onDonate={() => setSelectedCampaignIndex({ index, type: "donate" })}
                                            onEndCampaign={() => setSelectedCampaignIndex({ index, type: "end" })}
                                            onWithdraw={() => setSelectedCampaignIndex({ index, type: "withdraw" })}
                                        />
                                    ))}
                                </div>
                            </div>
                            <div className="col-span-1">
                                {campaignsInfo.length === 5 &&
                                    campaignsInfo
                                        .slice(-1)
                                        .map((info) => (
                                            <CampaignCard
                                                key={4}
                                                campaignId={campaignIds[4]}
                                                campaignInfo={info}
                                                isLast
                                                onDonate={() => setSelectedCampaignIndex({ index: 4, type: "donate" })}
                                                onEndCampaign={() => setSelectedCampaignIndex({ index: 4, type: "end" })}
                                                onWithdraw={() => setSelectedCampaignIndex({ index: 4, type: "withdraw" })}
                                            />
                                        ))}
                            </div>
                        </div>
                    )}

                    <DonationModal
                        campaignId={selectedCampaignId}
                        campaignInfo={selectedCampaignIndex !== null ? campaignsInfo[selectedCampaignIndex.index] : null}
                        onCloseModal={setSelectedCampaignIndex}
                    />

                    <EndConfirmation
                        campaignId={selectedCampaignId}
                        title={selectedCampaignIndex !== null ? campaignsInfo[selectedCampaignIndex.index][0] : null}
                        onCloseModal={setSelectedCampaignIndex}
                    />

                    <WithdrawConfirmation
                        campaignId={selectedCampaignId}
                        title={selectedCampaignIndex !== null ? campaignsInfo[selectedCampaignIndex.index][0] : null}
                        amount={selectedCampaignIndex !== null ? campaignsInfo[selectedCampaignIndex.index][6] : null}
                        onCloseModal={setSelectedCampaignIndex}
                    />

                    <div className="flex justify-between items-center mt-2">
                        <div className="flex gap-2">
                            <Pagination
                                pageCount={Math.ceil(campaignCount / 5)}
                                currentPage={currentPage}
                                onChangePage={(page: number) => {
                                    setCurrentPage(page);
                                    setSelectedCampaignIndex(null);
                                }}
                            />
                            <div className="join">
                                <button className="join-item btn" onClick={refresh}>
                                    <svg className="dark:fill-neutral-content" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
                                        <path d="M105.1 202.6c7.7-21.8 20.2-42.3 37.8-59.8c62.5-62.5 163.8-62.5 226.3 0L386.3 160H336c-17.7 0-32 14.3-32 32s14.3 32 32 32H463.5c0 0 0 0 0 0h.4c17.7 0 32-14.3 32-32V64c0-17.7-14.3-32-32-32s-32 14.3-32 32v51.2L414.4 97.6c-87.5-87.5-229.3-87.5-316.8 0C73.2 122 55.6 150.7 44.8 181.4c-5.9 16.7 2.9 34.9 19.5 40.8s34.9-2.9 40.8-19.5zM39 289.3c-5 1.5-9.8 4.2-13.7 8.2c-4 4-6.7 8.8-8.1 14c-.3 1.2-.6 2.5-.8 3.8c-.3 1.7-.4 3.4-.4 5.1V448c0 17.7 14.3 32 32 32s32-14.3 32-32V396.9l17.6 17.5 0 0c87.5 87.4 229.3 87.4 316.7 0c24.4-24.4 42.1-53.1 52.9-83.7c5.9-16.7-2.9-34.9-19.5-40.8s-34.9 2.9-40.8 19.5c-7.7 21.8-20.2 42.3-37.8 59.8c-62.5 62.5-163.8 62.5-226.3 0l-.1-.1L125.6 352H176c17.7 0 32-14.3 32-32s-14.3-32-32-32H48.4c-1.6 0-3.2 .1-4.8 .3s-3.1 .5-4.6 1z" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <Footer />
                        <CampaignRegistration />
                    </div>
                </div>
            </div>
        </LoadingContext.Provider>
    );
}
