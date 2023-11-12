import dayjs from "dayjs";
import { useContext } from "react";
import { MetamaskContext } from "../../../context";

export default function CampaignCard({ campaignInfo, isLast, onDonate }: { campaignInfo: any[]; isLast?: boolean; onDonate: () => void }) {
    const [title, imgUrl, description, isLive, initiator, deadline, _value] = campaignInfo;
    const { isConnected } = useContext(MetamaskContext)!;

    return (
        <div className={`card w-full h-full bg-base-100 shadow-xl`}>
            <figure className="lg:h-40 2xl:h-52">
                <img className="lg:object-fill" src={imgUrl} alt="Campaign Image" />
                <div className={`absolute right-2 top-[8px] badge ${deadline > dayjs().unix() ? "badge-accent" : "badge-neutral"}`}>
                    {deadline > dayjs().unix() ? "In progress" : "Ended"}
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
                        <button
                            className={`btn btn-neutral btn-sm ${isConnected ? " hover:btn-accent " : "btn-disabled"}`}
                            onClick={() => onDonate()}
                        >
                            Donate
                        </button>
                    </div>
                </div>
                <div className={`w-full overflow-auto ${isLast ? "lg:h-[25rem] 2xl:h-full" : "md:h-22 lg:h-24 2xl:h-60"}`}>
                    <p className="overflow-ellipsis text-sm">{description}</p>
                </div>
            </div>
        </div>
    );
}