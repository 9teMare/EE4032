import { useEffect, useMemo, useState } from "react";
import { EVENT, EVENT_ARGUMENTS } from "../../constants";
import { getCampaignLogs } from "../../api/interact";
import { Log } from "ethers";
import Loading from "../Loading";
import { decodeData } from "../../utils";
import { Result } from "ethers";

export default function TabContent({ selectedTab, campaignId }: { selectedTab: EVENT; campaignId: string }) {
    const [logs, setLogs] = useState<Log[]>([]);
    const [decodedData, setDecodedData] = useState<Result[]>([]);

    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        if (campaignId === null) return;
        setIsLoading(true);
        getCampaignLogs(campaignId, selectedTab)
            .then((logs) => {
                setLogs(logs);
                setDecodedData(logs.map((log) => decodeData(selectedTab, log.data)));
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [selectedTab, campaignId]);

    return (
        <div className="flex justify-between flex-col w-full h-full">
            {isLoading ? (
                <Loading />
            ) : logs.length > 0 ? (
                <div className="overflow-x-hidden">
                    <table className="table table-xs table-pin-rows table-pin-cols w-full">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Address</th>
                                <th>Block Hash</th>
                                <th>Block Number</th>
                                <th>Data</th>
                                <th>Index</th>
                                <th>Topics</th>
                                <th>Transaction Hash</th>
                                <th>Transaction Index</th>
                            </tr>
                        </thead>

                        <tbody>
                            {logs.map((log, i) => {
                                const { address, blockHash, blockNumber, index, topics, transactionHash, transactionIndex } = log;
                                return (
                                    <tr key={i}>
                                        <th>{i + 1}</th>
                                        <td className="break-all">{address}</td>
                                        <td className="break-all">{blockHash}</td>
                                        <td className="break-all">{blockNumber}</td>
                                        <td className="min-w-[250px] break-all flex flex-col gap-2">
                                            {decodedData[i].map((row, j) => {
                                                return (
                                                    <div key={j} className="flex flex-col gap-[2px]">
                                                        <p className="font-semibold">{EVENT_ARGUMENTS[selectedTab][j]}</p>
                                                        {EVENT_ARGUMENTS[selectedTab][j] === "amount" ? (
                                                            <p>{Number(row.toString()) / 10 ** 18} ETH</p>
                                                        ) : (
                                                            <p>{row}</p>
                                                        )}
                                                    </div>
                                                );
                                            })}
                                        </td>
                                        <td className="break-all">{index}</td>
                                        <td className="break-all">{topics.join(", ")}</td>
                                        <td className="break-all">{transactionHash}</td>
                                        <td className="break-all">{transactionIndex}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            ) : selectedTab === EVENT.CampaignEnded ? (
                <div className="h-full w-full flex justify-center items-center">
                    No Data Found onchain. If the campaign deadline has passed, maybe the initiator has not manually end the campaign yet.
                </div>
            ) : (
                <div className="h-full w-full flex justify-center items-center">No Data Found onchain</div>
            )}
        </div>
    );
}
