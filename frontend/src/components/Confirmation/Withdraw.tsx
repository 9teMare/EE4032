import { Dispatch, SetStateAction, useContext } from "react";
import { LoadingContext } from "../../context";
import { endCampaign, withdrawCampaignFunds } from "../../api/interact";
import { BigNumberish, ethers } from "ethers";

export default function Confirmation({
    campaignId,
    title,
    amount,
    onCloseModal,
}: {
    campaignId: string | null;
    title: string;
    amount: BigNumberish;
    onCloseModal: Dispatch<SetStateAction<{ index: number; type: "donate" | "end" | "withdraw" } | null>>;
}) {
    const closeModal = () => {
        // @ts-ignore
        document.getElementById("withdrawal-confirmation-modal").close();
        onCloseModal(null);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await withdrawCampaignFunds(campaignId!).finally(() => {
            closeModal();
            refresh();
        });
    };

    const { refresh } = useContext(LoadingContext)!;

    return (
        <dialog id="withdrawal-confirmation-modal" className="modal">
            <div className="modal-box w-[340px]">
                <h3 className="font-bold text-lg">Withdraw Fund from Campaign</h3>
                <p className="py-4">Are you sure you want to withdraw fund collected from {title} campaign?</p>

                <div className="flex flex-col gap-4 mt-4">
                    <div className="w-full flex flex-col gap-1">
                        <p className="font-semibold">Amount to withdraw</p>
                        <p>{(Number(amount) / 10 ** 18).toFixed(4)} ETH</p>
                    </div>
                </div>
                <div className="modal-action gap-2">
                    <button className="btn" onClick={closeModal}>
                        Cancel
                    </button>
                    <form method="dialog" onSubmit={handleSubmit}>
                        <button type="submit" className="btn btn-warning" disabled={Number(amount) === 0}>
                            Withdraw
                        </button>
                    </form>
                </div>
            </div>
        </dialog>
    );
}
