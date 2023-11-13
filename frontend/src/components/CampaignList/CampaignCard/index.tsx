import dayjs from "dayjs";
import { useContext, useMemo } from "react";
import { MetamaskContext } from "../../../context";
import { ethers } from "ethers";
import { End, Withdraw } from "../../Confirmation";

export default function CampaignCard({
    campaignId,
    campaignInfo,
    isLast,
    onDonate,
    onEndCampaign,
    onWithdraw,
}: {
    campaignId: string;
    campaignInfo: any[];
    isLast?: boolean;
    onDonate: () => void;
    onEndCampaign: () => void;
    onWithdraw: () => void;
}) {
    const [title, imgUrl, description, isLive, initiator, deadline, amount] = campaignInfo;
    const { isConnected } = useContext(MetamaskContext)!;

    const { address } = useContext(MetamaskContext)!;

    const isInitiator = useMemo(() => {
        return initiator.toUpperCase() === address?.toUpperCase();
    }, [initiator, address]);

    const openEndCampaignModal = () => {
        // @ts-ignore
        document.getElementById("end-confirmation-modal").showModal();
    };

    return (
        <div className={`card w-full h-full bg-base-100 shadow-xl`}>
            <figure className="lg:h-40 2xl:h-52">
                <img className="lg:object-fill" src={imgUrl} alt="Campaign Image" />

                <div className="dropdown dropdown-hover dropdown-bottom dropdown-end absolute right-2 top-[6px] drop-shadow-lg">
                    <label tabIndex={0}>
                        <div className={`badge ${isLive ? "badge-accent" : "badge-neutral"}`}>{isLive ? "In progress" : "Ended"}</div>
                    </label>
                    {isLive && (
                        <ul
                            tabIndex={0}
                            className="dropdown-content z-[1] menu p-2 shadow bg-base-100 w-32 justify-center items-center rounded-lg gap-2"
                        >
                            <li className="text-center">{isLive ? `${dayjs.unix(deadline.toString()).diff(dayjs(), "days")} days left` : "Ended"}</li>
                            {isInitiator && (
                                <button
                                    className="btn btn-error btn-sm w-full"
                                    onClick={() => {
                                        onEndCampaign();
                                        openEndCampaignModal();
                                    }}
                                >
                                    End Now
                                </button>
                            )}
                        </ul>
                    )}
                </div>

                <div className="absolute right-2 lg:top-[130px] 2xl:top-[178px] badge badge-neutral">
                    Raised: {ethers.toNumber(amount) / 10 ** 18} ETH
                </div>
            </figure>
            <div className="card-body p-4">
                <div className="card-title flex justify-between">
                    <h2 className="max-w-[245px]">{title}</h2>

                    <div
                        className="tooltip tooltip-left"
                        {...(!isConnected && {
                            "data-tip": "Please connect your Metamask wallet first before donating",
                        })}
                    >
                        {!isLive && isInitiator ? (
                            <button
                                className={`btn btn-outline btn-warning btn-sm ${isConnected ? " hover:btn-warning " : "btn-disabled"}`}
                                onClick={() => onWithdraw()}
                            >
                                Withdraw
                            </button>
                        ) : (
                            <button
                                className={`btn btn-outline btn-accent btn-sm ${isConnected ? " hover:btn-accent " : "btn-disabled"}`}
                                onClick={() => onDonate()}
                                disabled={!isConnected || !isLive}
                            >
                                Donate
                            </button>
                        )}
                    </div>
                </div>
                <div className={`w-full overflow-auto ${isLast ? "lg:h-[25rem] 2xl:h-full" : "md:h-22 lg:h-24 2xl:h-60"}`}>
                    <p className="overflow-ellipsis text-sm">{description}</p>
                </div>
            </div>
        </div>
    );
}
