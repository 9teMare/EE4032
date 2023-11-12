import { Suspense, useEffect, useMemo, useState } from "react";
import { getAllCampaign, getCampaignCount, getCampaignsInBatch } from "../../api/interact";
import Pagination from "./Pagination";
import { isValidCampaignId } from "../../utils";
import CampaignCard from "./CampaignCard";
import Loading from "../Loading";
import CampaignRegistration from "../CampaignRegistration";
import Footer from "../Footer";
import DonationModal from "../DonationModal";

export default function CampaignList() {
    const [campaignCount, setCampaignCount] = useState<number>(0);

    const [currentPage, setCurrentPage] = useState<number>(1);

    const [campaignIds, setCampaignIds] = useState<string[]>([]);
    const [campaignsInfo, setCampaignsInfo] = useState<any[]>([]);

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [selectedCampaignIndex, setSelectedCampaignIndex] = useState<number | null>(null);

    const selectedCampaignId = useMemo(() => {
        if (selectedCampaignIndex === null) return null;
        return campaignIds[selectedCampaignIndex];
    }, [selectedCampaignIndex]);

    useEffect(() => {
        getCampaignCount().then((count) => {
            setCampaignCount(Number(count));
        });
    }, []);

    useEffect(() => {
        setIsLoading(true);
        getCampaignsInBatch(currentPage - 1)
            .then((campaignIds: string[]) => {
                setCampaignIds(campaignIds.filter((campaign) => isValidCampaignId(campaign)));
            })
            .finally(() => {
                setIsLoading(false);
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
            // @ts-ignore
            document.getElementById("donation_modal").showModal();
        }
    }, [selectedCampaignIndex]);

    return (
        <div className="flex h-full">
            {isLoading ? (
                <Loading />
            ) : (
                <div className="flex justify-between flex-col h-full">
                    <div className="gap-4 mt-2 grid grid-cols-3">
                        <div className="col-span-2">
                            <div className="grid grid-cols-2 gap-4">
                                {campaignsInfo.slice(0, 4).map((info, index) => (
                                    <CampaignCard key={index} campaignInfo={info} onDonate={() => setSelectedCampaignIndex(index)} />
                                ))}
                            </div>
                        </div>
                        <div className="col-span-1">
                            {campaignsInfo.length === 5 &&
                                campaignsInfo
                                    .slice(-1)
                                    .map((info, index) => (
                                        <CampaignCard key={index} campaignInfo={info} isLast onDonate={() => setSelectedCampaignIndex(4)} />
                                    ))}
                        </div>
                    </div>

                    <DonationModal
                        campaignId={selectedCampaignId}
                        campaignInfo={selectedCampaignIndex !== null ? campaignsInfo[selectedCampaignIndex] : null}
                        onCloseModal={setSelectedCampaignIndex}
                    />

                    <div className="flex justify-between items-center mt-2">
                        <Pagination
                            pageCount={Math.ceil(campaignCount / 5)}
                            currentPage={currentPage}
                            onChangePage={(page: number) => {
                                setCurrentPage(page);
                                setSelectedCampaignIndex(null);
                            }}
                        />
                        <Footer />
                        <CampaignRegistration />
                    </div>
                </div>
            )}
        </div>
    );
}
