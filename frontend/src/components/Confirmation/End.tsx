import { Dispatch, SetStateAction, useContext } from "react";
import { LoadingContext } from "../../context";
import { endCampaign } from "../../api/interact";

export default function Confirmation({
    campaignId,
    title,
    onCloseModal,
}: {
    campaignId: string | null;
    title: string;
    onCloseModal: Dispatch<SetStateAction<{ index: number; type: "donate" | "end" | "withdraw" } | null>>;
}) {
    const closeModal = () => {
        // @ts-ignore
        document.getElementById("end-confirmation-modal").close();
        onCloseModal(null);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await endCampaign(campaignId!).finally(() => {
            closeModal();
            refresh();
        });
    };

    const { refresh } = useContext(LoadingContext)!;

    return (
        <dialog id="end-confirmation-modal" className="modal">
            <div className="modal-box w-[340px]">
                <h3 className="font-bold text-lg">End Campaign</h3>
                <p className="py-4">Are you sure you want to end {title} campaign now?</p>
                <div className="modal-action gap-2">
                    <button className="btn" onClick={closeModal}>
                        Cancel
                    </button>
                    <form method="dialog" onSubmit={handleSubmit}>
                        <button type="submit" className="btn btn-error">
                            End Campaign
                        </button>
                    </form>
                </div>
            </div>
        </dialog>
    );
}
