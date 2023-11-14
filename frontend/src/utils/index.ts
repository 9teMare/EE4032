import { ethers } from "ethers";
import { EVENT, EVENT_ARGUMENT_TYPES } from "../constants";

function isValidCampaignId(campaignId: string) {
    return (
        campaignId.length === 66 && campaignId.startsWith("0x") && campaignId !== "0x0000000000000000000000000000000000000000000000000000000000000000"
    );
}

function decodeData(event: EVENT, data: string) {
    return ethers.AbiCoder.defaultAbiCoder().decode(EVENT_ARGUMENT_TYPES[event], data);
}

export { isValidCampaignId, decodeData };
