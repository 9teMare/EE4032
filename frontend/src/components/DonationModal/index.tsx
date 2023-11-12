import { Dispatch, SetStateAction, useContext, useState } from "react";
import { MetamaskContext } from "../../context";
import { donateToCampaign } from "../../api/interact";

export default function DonationModal({
    campaignId,
    campaignInfo,
    onCloseModal,
}: {
    campaignId: string | null;
    campaignInfo: null | any[];
    onCloseModal: Dispatch<SetStateAction<number | null>>;
}) {
    const [title, imgUrl, description, isLive, initiator, deadline, _value] = campaignInfo ?? Array(7).fill(null);

    const { balance } = useContext(MetamaskContext)!;

    const [isRevealId, setIsRevealId] = useState(false);
    const [amount, setAmount] = useState(0);
    const [isValidAmount, setIsValidAmount] = useState(false);

    const validate = (value: number) => {
        setIsValidAmount(value > 0 && value <= Number(balance));
    };

    const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        validate(Number(e.target.value));
        if (!isValidAmount) {
            setAmount(0);
        } else {
            setAmount(Number(e.target.value));
        }
    };

    const closeModal = () => {
        // @ts-ignore
        document.getElementById("donation_modal").close();
        onCloseModal(null);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        donateToCampaign(campaignId!, amount).then(() => {
            onCloseModal(null);
        });
    };

    return (
        <dialog id="donation_modal" className="modal">
            <div className="modal-box h-[320px] w-11/12 max-w-sm">
                <div className="flex flex-col h-14">
                    <div className="flex items-center justify-between">
                        <h3 className="font-bold text-lg">Donating to </h3>
                        <button
                            className="badge badge-accent badge-outline hover:bg-accent hover:text-white"
                            onClick={() => setIsRevealId(!isRevealId)}
                        >
                            {isRevealId ? "Hide" : "Review"} Initiator
                        </button>
                    </div>

                    {isRevealId ? <p className="text-sm break-all">{initiator}</p> : <p>{title}</p>}
                </div>

                <div className="flex flex-col">
                    <div className="flex flex-col gap-4 mt-4">
                        <div className="w-full flex flex-col gap-1">
                            <p className="font-semibold">Wallet Balance</p>
                            <p>{Number(balance).toFixed(4)} ETH</p>
                        </div>

                        <div className="w-full flex flex-col gap-1">
                            <p className="font-semibold">Amount to Donate</p>
                            <div className="flex items-center gap-2">
                                <input
                                    type="number"
                                    placeholder="Type here"
                                    className="input input-sm input-bordered w-full max-w-xs"
                                    onChange={handleChangeInput}
                                />
                                <p>ETH</p>
                            </div>
                        </div>
                    </div>

                    <div className="modal-action">
                        <button className="btn" onClick={closeModal}>
                            Cancel
                        </button>
                        <form method="dialog" onSubmit={handleSubmit}>
                            <button className="btn btn-accent" type="submit" disabled={!isValidAmount}>
                                Donate
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </dialog>
    );
}
