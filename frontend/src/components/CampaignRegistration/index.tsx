import { FormEventHandler, useContext, useEffect, useState } from "react";
import Datepicker, { DateValueType } from "react-tailwindcss-datepicker";
import { startCampaign } from "../../api/interact";
import dayjs from "dayjs";
import { LoadingContext, MetamaskContext } from "../../context";

function Field({
    attribute,
    inputStyle = "input",
    type = "text",
    state,
    handler,
}: {
    attribute: string;
    inputStyle?: "input" | "textarea";
    type?: "text" | "date";
    state: { value: any; setValue: React.Dispatch<React.SetStateAction<any>> };
    handler?: (value: DateValueType, e?: HTMLInputElement | null | undefined) => void;
}) {
    return (
        <div className="flex w-full items-center ">
            <label className="w-40" htmlFor="name">
                {attribute}
            </label>
            {inputStyle == "textarea" ? (
                <textarea
                    className="textarea textarea-bordered w-full"
                    placeholder="Type here"
                    value={state.value}
                    onChange={(e) => state.setValue(e.target.value)}
                />
            ) : type == "date" ? (
                <Datepicker value={state.value} onChange={handler!} useRange={false} asSingle={true} />
            ) : (
                <input
                    type="text"
                    placeholder="Type here"
                    className="input input-bordered w-full"
                    value={state.value}
                    onChange={(e) => state.setValue(e.target.value)}
                />
            )}
        </div>
    );
}

export default function CampaignRegistration() {
    const [campaignTitle, setCampaignTitle] = useState("");
    const [description, setDescription] = useState("");
    const [imgUrl, setImgUrl] = useState("");
    const [deadline, setDeadline] = useState<DateValueType>({
        startDate: new Date(),
        endDate: new Date(),
    });

    const { address, isConnected } = useContext(MetamaskContext)!;
    const { refresh } = useContext(LoadingContext)!;

    const handleValueChange = (newValue: DateValueType) => {
        // startDate and endDate are the same since we are using asSingle={true}
        setDeadline(newValue);
    };

    const [isAllowSubmit, setIsAllowSubmit] = useState(false);

    const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
        console.log("submit", campaignTitle, description, imgUrl, dayjs(deadline?.endDate).unix());
        e.preventDefault();

        startCampaign({
            account: address!,
            title: campaignTitle,
            description: description,
            imgUrl: imgUrl,
            deadline: dayjs(deadline?.endDate).unix(),
        }).finally(() => {
            //@ts-ignore
            document.getElementById("register_campaign").close();
            refresh();
        });
    };

    function isValidUrl(url: string) {
        try {
            new URL(url);
            return true;
        } catch (err) {
            return false;
        }
    }

    useEffect(() => {
        if (campaignTitle && description && isValidUrl(imgUrl) && dayjs(deadline?.endDate).unix() > dayjs().unix()) {
            setIsAllowSubmit(true);
        } else {
            setIsAllowSubmit(false);
        }
    }, [campaignTitle, description, imgUrl, deadline]);

    return (
        <div>
            <div className="w-full flex justify-end">
                <div
                    className="tooltip tooltip-left"
                    {...(!isConnected && {
                        "data-tip": "Please connect your Metamask wallet first before starting a campaign",
                    })}
                >
                    <button
                        className="btn btn-accent"
                        // @ts-ignore
                        onClick={() => document.getElementById("register_campaign").showModal()}
                        disabled={!isConnected}
                    >
                        Start a Campaign
                    </button>
                </div>
            </div>

            <dialog id="register_campaign" className="modal">
                <div className="modal-box w-11/12 max-w-2xl">
                    <h3 className="font-bold text-lg">Start a new Campaign on chain!</h3>
                    <p>Please fill in the following information</p>

                    <div className="flex flex-col gap-12 mt-10 h-[400px]">
                        <Field attribute="Campaign Title" state={{ value: campaignTitle, setValue: setCampaignTitle }} />
                        <Field attribute="Description" inputStyle="textarea" state={{ value: description, setValue: setDescription }} />
                        <Field attribute="Image URL" state={{ value: imgUrl, setValue: setImgUrl }} />
                        <Field attribute="Deadline" type="date" state={{ value: deadline, setValue: setDeadline }} handler={handleValueChange} />
                    </div>
                    <div className="modal-action flex gap-2">
                        <form method="dialog">
                            <button className="btn">Close</button>
                        </form>
                        <form method="dialog" onSubmit={handleSubmit}>
                            <button className="btn btn-accent" type="submit" disabled={!isAllowSubmit}>
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
}
