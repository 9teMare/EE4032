export const CONTRACT_ADDRESS = "0x829C3CB74C867aA96a3932A7bCD0906D1D44BA41";
// export const CONTRACT_ADDRESS = "0x9a550b1A9e425C12d47374Ae8483AD7b61BC787A";

export const CONTRACT_ABI = [
    { inputs: [], stateMutability: "nonpayable", type: "constructor" },
    {
        anonymous: false,
        inputs: [
            { indexed: false, internalType: "bytes32", name: "campaignId", type: "bytes32" },
            { indexed: false, internalType: "address", name: "initiator", type: "address" },
        ],
        name: "CampaignEnded",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            { indexed: false, internalType: "bytes32", name: "campaignId", type: "bytes32" },
            { indexed: false, internalType: "address", name: "initiator", type: "address" },
        ],
        name: "CampaignStarted",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            { indexed: false, internalType: "bytes32", name: "campaignId", type: "bytes32" },
            { indexed: false, internalType: "address", name: "donor", type: "address" },
            { indexed: false, internalType: "uint256", name: "amount", type: "uint256" },
        ],
        name: "FundsDonated",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            { indexed: false, internalType: "bytes32", name: "campaignId", type: "bytes32" },
            { indexed: false, internalType: "address", name: "initiator", type: "address" },
            { indexed: false, internalType: "uint256", name: "amount", type: "uint256" },
        ],
        name: "WithdrawFunds",
        type: "event",
    },
    {
        inputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
        name: "_campaigns",
        outputs: [
            { internalType: "string", name: "title", type: "string" },
            { internalType: "string", name: "imgUrl", type: "string" },
            { internalType: "string", name: "description", type: "string" },
            { internalType: "bool", name: "isLive", type: "bool" },
            { internalType: "address", name: "initiator", type: "address" },
            { internalType: "uint256", name: "deadline", type: "uint256" },
            { internalType: "uint256", name: "balance", type: "uint256" },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        name: "_campaignsList",
        outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [{ internalType: "bytes32", name: "campaignId", type: "bytes32" }],
        name: "donateToCampaign",
        outputs: [],
        stateMutability: "payable",
        type: "function",
    },
    {
        inputs: [{ internalType: "bytes32", name: "campaignId", type: "bytes32" }],
        name: "endCampaign",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            { internalType: "address", name: "initiator", type: "address" },
            { internalType: "string", name: "title", type: "string" },
            { internalType: "string", name: "description", type: "string" },
        ],
        name: "generateCampaignId",
        outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
        stateMutability: "pure",
        type: "function",
    },
    {
        inputs: [{ internalType: "bytes32", name: "campaignId", type: "bytes32" }],
        name: "getCampaign",
        outputs: [
            {
                components: [
                    { internalType: "string", name: "title", type: "string" },
                    { internalType: "string", name: "imgUrl", type: "string" },
                    { internalType: "string", name: "description", type: "string" },
                    { internalType: "bool", name: "isLive", type: "bool" },
                    { internalType: "address", name: "initiator", type: "address" },
                    { internalType: "uint256", name: "deadline", type: "uint256" },
                    { internalType: "uint256", name: "balance", type: "uint256" },
                ],
                internalType: "struct Chainrity.Campaign",
                name: "",
                type: "tuple",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "getCampaignCount",
        outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [{ internalType: "uint256", name: "_batchNumber", type: "uint256" }],
        name: "getCampaignsInBatch",
        outputs: [{ internalType: "bytes32[]", name: "", type: "bytes32[]" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            { internalType: "string", name: "title", type: "string" },
            { internalType: "string", name: "description", type: "string" },
            { internalType: "string", name: "imgUrl", type: "string" },
            { internalType: "uint256", name: "deadline", type: "uint256" },
        ],
        name: "startCampaign",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            { internalType: "address", name: "", type: "address" },
            { internalType: "bytes32", name: "", type: "bytes32" },
        ],
        name: "userCampaignDonations",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [{ internalType: "bytes32", name: "campaignId", type: "bytes32" }],
        name: "withdrawCampaignFunds",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
];
