import dayjs from "dayjs";
import { useContext, useMemo, useState } from "react";
import { MetamaskContext } from "../../../context";
import HistoryModal from "../../HistoryModal";

export default function CampaignCard({
    campaignId,
    campaignInfo,
    isLast,
    onDonate,
    onEndCampaign,
    onWithdraw,
    onShowHistory,
}: {
    campaignId: string;
    campaignInfo: any[];
    isLast?: boolean;
    onDonate: () => void;
    onEndCampaign: () => void;
    onWithdraw: () => void;
    onShowHistory: () => void;
}) {
    const [title, imgUrl, description, isLive, initiator, deadline, amount] = campaignInfo;
    const { isConnected } = useContext(MetamaskContext)!;

    const [isHover, setIsHover] = useState<boolean>(false);

    const { wallet } = useContext(MetamaskContext)!;

    const isInitiator = useMemo(() => {
        return initiator.toUpperCase() === wallet.accounts[0].toUpperCase();
    }, [initiator, wallet]);

    return (
        <div className={`card w-full h-full bg-base-100 shadow-xl`}>
            <figure className="lg:h-40 2xl:h-52" onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
                <img className="lg:object-fill" src={imgUrl} alt="Campaign Image" />

                {isHover && (
                    <div className="absolute left-2 top-[6px]">
                        <button
                            className="join-item btn dark:btn-neutral tooltip tooltip-right"
                            data-tip="View History"
                            onClick={() => onShowHistory()}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512" className="dark:fill-neutral-content">
                                <path d="M75 75L41 41C25.9 25.9 0 36.6 0 57.9V168c0 13.3 10.7 24 24 24H134.1c21.4 0 32.1-25.9 17-41l-30.8-30.8C155 85.5 203 64 256 64c106 0 192 86 192 192s-86 192-192 192c-40.8 0-78.6-12.7-109.7-34.4c-14.5-10.1-34.4-6.6-44.6 7.9s-6.6 34.4 7.9 44.6C151.2 495 201.7 512 256 512c141.4 0 256-114.6 256-256S397.4 0 256 0C185.3 0 121.3 28.7 75 75zm181 53c-13.3 0-24 10.7-24 24V256c0 6.4 2.5 12.5 7 17l72 72c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-65-65V152c0-13.3-10.7-24-24-24z" />
                            </svg>
                        </button>
                    </div>
                )}

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
                                    }}
                                >
                                    End Now
                                </button>
                            )}
                        </ul>
                    )}
                </div>

                <div className="absolute right-2 lg:top-[130px] 2xl:top-[178px] badge badge-neutral">
                    Raised: {(Number(amount) / 10 ** 18).toFixed(4)} ETH
                </div>
            </figure>
            <div className="card-body p-4">
                <div className="card-title flex justify-between">
                    <h2 className="whitespace-nowrap overflow-auto">{title}</h2>

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
