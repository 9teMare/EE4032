import { CONTRACT_ADDRESS, CONTRACT_ABI } from "../contracts/config";
import { ethers } from "ethers";
import { BigNumberish } from "ethers";
import { EVENT, EVENT_ARGUMENT_TYPES, EVENT_TOPIC } from "../constants";
import { decodeData } from "../utils";

//@ts-ignore
const provider = new ethers.BrowserProvider(window.ethereum);
const etherscanProvider = new ethers.EtherscanProvider("sepolia", import.meta.env.VITE_ETHERSCAN_API_KEY);
let chainrityContract: null | ethers.Contract = null;

async function getContract() {
    if (chainrityContract === null) {
        const signer = await provider.getSigner();
        chainrityContract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
    }
    return chainrityContract;
}

async function getCampaignCount(): Promise<number> {
    const contract = await getContract();
    const balance: number = await contract.getCampaignCount();
    return balance;
}

async function startCampaign({
    title,
    description,
    imgUrl,
    deadline,
}: {
    account: string;
    title: string;
    description: string;
    imgUrl: string;
    deadline: number;
}): Promise<void> {
    const contract = await getContract();
    await contract
        .startCampaign(title, description, imgUrl, deadline)
        .then((tx) => {
            console.log(tx);
        })
        .catch((error) => {
            console.error(error);
        });
}

async function getCampaignsInBatch(batchNumber: number): Promise<any> {
    const contract = await getContract();
    const campaigns = await contract.getCampaignsInBatch(batchNumber);
    return campaigns;
}

async function getCampaign(campaignId: string): Promise<any> {
    const contract = await getContract();
    const campaign = await contract.getCampaign(campaignId);
    return campaign;
}

async function getAllCampaign(campaignIds: string[]): Promise<any[]> {
    try {
        const allPromises = campaignIds.map(async (campaignId) => {
            return await getCampaign(campaignId);
        });
        return Promise.all(allPromises);
    } catch (error) {
        console.error(error);
        return [];
    }
}

async function donateToCampaign(campaignId: string, value: BigNumberish) {
    try {
        const contract = await getContract();
        contract
            .donateToCampaign(campaignId, {
                value: ethers.parseEther(value.toString()),
            })
            .then((tx) => {
                console.log(tx);
            })
            .catch((error) => {
                console.error(error);
            });
    } catch (error) {
        console.error(error);
    }
}

async function endCampaign(campaignId: string) {
    try {
        const contract = await getContract();
        contract
            .endCampaign(campaignId)
            .then((tx) => {
                console.log(tx);
            })
            .catch((error) => {
                console.error(error);
            });
    } catch (error) {
        console.error(error);
    }
}

async function withdrawCampaignFunds(campaignId: string) {
    try {
        const contract = await getContract();
        contract
            .withdrawCampaignFunds(campaignId)
            .then((tx) => {
                console.log(tx);
            })
            .catch((error) => {
                console.error(error);
            });
    } catch (error) {
        console.error(error);
    }
}

async function getCampaignLogs(campaignId: string, event?: EVENT) {
    const currentBlock = await provider.getBlockNumber();
    const filter = {
        address: CONTRACT_ADDRESS,
        fromBlock: 0,
        toBlock: currentBlock,
        topics: event ? [ethers.id(EVENT_TOPIC[event])] : [],
    };
    const logs = await provider.getLogs(filter);

    if (!event) {
        return logs;
    }
    return logs.filter((log) => {
        const decodedLog = decodeData(event, log.data);
        return decodedLog[0] === campaignId;
    });
}

export {
    getCampaignCount,
    startCampaign,
    getCampaignsInBatch,
    getAllCampaign,
    donateToCampaign,
    endCampaign,
    withdrawCampaignFunds,
    getCampaignLogs,
};
