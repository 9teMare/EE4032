import { CONTRACT_ADDRESS, CONTRACT_ABI } from "../contracts/config";
import { Web3, HttpProvider, Contract } from "web3";
import { ethers } from "ethers";

//@ts-ignore
const provider = new ethers.BrowserProvider(window.ethereum);
const signer = await provider.getSigner();
const chainrityContract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

async function getCampaignCount(): Promise<number> {
    const balance: number = await chainrityContract.getCampaignCount();
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
    await chainrityContract
        .startCampaign(title, description, imgUrl, deadline)
        .then((tx) => {
            console.log(tx);
        })
        .catch((error) => {
            console.error(error);
        });
}

async function getCampaignsInBatch(batchNumber: number): Promise<any> {
    const campaigns = await chainrityContract.getCampaignsInBatch(batchNumber);
    return campaigns;
}

async function getCampaign(campaignId: string): Promise<any> {
    const campaign = await chainrityContract.getCampaign(campaignId);
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

async function donateToCampaign(campaignId: string, value: number) {
    try {
        chainrityContract
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

export { getCampaignCount, startCampaign, getCampaignsInBatch, getAllCampaign, donateToCampaign };
