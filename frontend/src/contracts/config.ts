export const CONTRACT_ADDRESS = "0x196E701c44bffaD183Cb7b44424F233DAaADBE7C";

export const CONTRACT_ABI = [
    {
        inputs: [],
        stateMutability: "payable",
        type: "constructor",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "address",
                name: "ownerAddress",
                type: "address",
            },
            {
                indexed: false,
                internalType: "address",
                name: "campaignAddress",
                type: "address",
            },
        ],
        name: "CampaignStarted",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "address",
                name: "campaignAddress",
                type: "address",
            },
            {
                indexed: false,
                internalType: "address",
                name: "donorAddress",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
        ],
        name: "Donate",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "address",
                name: "campaignAddress",
                type: "address",
            },
            {
                indexed: false,
                internalType: "address",
                name: "withdrawerAddress",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "address",
                name: "toAddress",
                type: "address",
            },
        ],
        name: "Withdraw",
        type: "event",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "donorAddress",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
        ],
        name: "emitDonateEvent",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "withdrawerAddress",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
            {
                internalType: "address",
                name: "beneficiaryAddress",
                type: "address",
            },
        ],
        name: "emitWithdrawEvent",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_reputationAddress",
                type: "address",
            },
        ],
        name: "setReputationAddress",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "string",
                name: "_campaignName",
                type: "string",
            },
            {
                internalType: "string",
                name: "_organisationUrl",
                type: "string",
            },
            {
                internalType: "uint64",
                name: "_endTimestamp",
                type: "uint64",
            },
            {
                internalType: "address payable",
                name: "_beneficiaryAddress",
                type: "address",
            },
            {
                internalType: "address",
                name: "_campaignOwnerAddress",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "_targetDonationAmount",
                type: "uint256",
            },
            {
                internalType: "string",
                name: "_campaignDescription",
                type: "string",
            },
        ],
        name: "startCampaign",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "beneficiaryAddress",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "value",
                type: "uint256",
            },
        ],
        name: "updateReputation",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
];
