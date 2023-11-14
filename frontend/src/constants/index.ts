const enum EVENT {
    FundsDonated = "FundsDonated",
    CampaignStarted = "CampaignStarted",
    WithdrawFunds = "WithdrawFunds",
    CampaignEnded = "CampaignEnded",
}

const EVENT_TOPIC = {
    [EVENT.FundsDonated]: "FundsDonated(bytes32,address,uint256)",
    [EVENT.CampaignStarted]: "CampaignStarted(bytes32,address)",
    [EVENT.WithdrawFunds]: "WithdrawFunds(bytes32,address,uint256)",
    [EVENT.CampaignEnded]: "CampaignEnded(bytes32,address)",
};

const EVENT_ARGUMENT_TYPES = {
    [EVENT.FundsDonated]: ["bytes32", "address", "uint256"],
    [EVENT.CampaignStarted]: ["bytes32", "address"],
    [EVENT.WithdrawFunds]: ["bytes32", "address", "uint256"],
    [EVENT.CampaignEnded]: ["bytes32", "address"],
};

const EVENT_ARGUMENTS = {
    [EVENT.FundsDonated]: ["campaignId", "donor", "amount"],
    [EVENT.CampaignStarted]: ["campaignId", "initiator"],
    [EVENT.WithdrawFunds]: ["campaignId", "initiator", "amount"],
    [EVENT.CampaignEnded]: ["campaignId", "initiator"],
};

const enum MODAL_TYPE {
    History,
    Donate,
    End,
    Withdraw,
}

export { EVENT, EVENT_TOPIC, EVENT_ARGUMENT_TYPES, MODAL_TYPE, EVENT_ARGUMENTS };
