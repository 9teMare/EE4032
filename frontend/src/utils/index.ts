function isValidCampaignId(campaignId: string) {
    return (
        campaignId.length === 66 && campaignId.startsWith("0x") && campaignId !== "0x0000000000000000000000000000000000000000000000000000000000000000"
    );
}

export { isValidCampaignId };
